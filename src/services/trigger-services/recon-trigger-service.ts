import { ENUMS, INTERNAL_RECON_STATUS } from "../../constants/enums";
import { UserType } from "../../schema/models/user-schema";
import { ReconPayload } from "../../schema/rsf/zod/recon-schema";
import {
	TriggerActionType,
	TriggeringRequirements,
} from "../../types/trigger-types";
import { isPerfectAck } from "../../utils/ackUtils";
import { createHeader } from "../../utils/header-utils";
import logger from "../../utils/logger";
import { extractReconDetails } from "../../utils/recon-utils/extract-recon-details";
import { triggerRequest } from "../../utils/trigger-utils";
import { ReconDbService } from "../recon-service";
import { SettleDbManagementService } from "../settle-service";
import { TransactionService } from "../transaction-serivce";
import { UserService } from "../user-service";

const triggerLogger = logger.child("recon-trigger-service");
export class ReconTriggerService {
	constructor(
		private reconService: ReconDbService,
		private userService: UserService,
		private transactionService: TransactionService,
		private settleService: SettleDbManagementService,
	) {}

	async handleReconAction(userId: string, ondcReconPayload: ReconPayload) {
		triggerLogger.info("Handling recon action", {
			userId,
			data: ondcReconPayload,
		});
		const userConfig = await this.userService.getUserById(userId);
		await this.validateReconConditions(userId, userConfig, ondcReconPayload);
		const responseData = await this.signAndSendPayload(
			userConfig,
			ondcReconPayload,
		);
		await this.updateSettlementTable(
			ondcReconPayload,
			responseData.data,
			userId,
		);
		return responseData;
	}

	async validateReconConditions(
		userId: string,
		userConfig: UserType,
		ondcReconPayload: ReconPayload,
	) {
		const bapUri = ondcReconPayload.context.bap_uri;
		const bppUri = ondcReconPayload.context.bpp_uri;
		const userUri = userConfig.subscriber_url;
		if (userUri !== bapUri && userUri !== bppUri) {
			throw new Error(
				`User URI ${userUri} does not match BAP URI ${bapUri} or BPP URI ${bppUri}`,
			);
		}
		const orderIds: string[] = ondcReconPayload.message.orders.map((o) => o.id);
		if (orderIds.length === 0) {
			throw new Error("No order IDs provided for reconciliation check");
		}
		for (const orderId of orderIds) {
			const recon = await this.reconService.getReconById(userId, orderId);
			if (!recon) {
				logger.info("New reconciliation order found", {
					userId,
					orderId,
				});
				continue;
			}
			const reconStatus = recon.recon_status;
			if (this.illegalStatuses.includes(reconStatus)) {
				throw new Error(
					`CAN'T TRIGGER::Reconciliation for order ID ${orderId} is already ${reconStatus} for user ID: ${userId}`,
				);
			}
		}
		triggerLogger.info("Reconciliation conditions validated successfully", {
			userId,
			data: ondcReconPayload,
		});
	}

	async signAndSendPayload(userConfig: UserType, ondReconPayload: any) {
		triggerLogger.info("Signing and sending payload", {
			userConfig,
			action: "recon",
		});
		const requirements = this.getTriggerRequirements(
			userConfig,
			ondReconPayload,
			"recon",
		);
		const header = await createHeader(requirements);
		return await triggerRequest(requirements, header);
	}

	getTriggerRequirements(
		userConfig: UserType,
		ondcReconPayload: any,
		action: TriggerActionType,
	): TriggeringRequirements {
		const bapUri = ondcReconPayload.context.bap_uri;
		const bppUri = ondcReconPayload.context.bpp_uri;
		const userUri = userConfig.subscriber_url;
		return {
			action: action,
			data: ondcReconPayload,
			forwardingBaseUrl: userUri === bapUri ? bppUri : bapUri,
		};
	}

	async updateSettlementTable(
		ondcReconPayload: ReconPayload,
		syncResponse: any,
		userId: string,
	) {
		triggerLogger.info("Updating settlement table with recon data", {
			userId,
			data: ondcReconPayload,
			response: syncResponse,
		});
		if (!isPerfectAck(syncResponse)) {
			triggerLogger.warning(
				"Sync response is not a perfect ACK, skipping settlement update",
			);
			return;
		}
		const dbPayload =
			await this.transactionService.addReconPayload(ondcReconPayload);
		const orders = ondcReconPayload.message.orders;
		for (const orderData of orders) {
			try {
				const settlementPayload = orderData.settlements[0];
				const dbSettlement = await this.settleService.getSingleSettlement(
					userId,
					orderData.id,
				);
				if (!dbSettlement) {
					triggerLogger.error(
						`Settlement not found for order ID ${orderData.id} for user ${userId}`,
					);
					continue;
				}
				const reconData = extractReconDetails(
					dbSettlement,
					settlementPayload,
					userId,
					orderData.id,
					INTERNAL_RECON_STATUS.SENT_PENDING,
				);
				reconData.transaction_db_ids.push(dbPayload._id.toString());
				reconData.transaction_id = dbPayload.context.transaction_id;
				if (settlementPayload.payment_id) {
					reconData.payment_id = settlementPayload.payment_id;
				}
				await this.reconService.createReconOrOverride(reconData);
				await this.settleService.updateSettlementViaUser(userId, orderData.id, {
					status: ENUMS.SETTLEMENT_STATUS.IN_RECON,
				});
			} catch (error) {
				triggerLogger.error(
					`Error updating settlement for order ID ${orderData.id}`,
					{
						orderData: orderData,
						userId: userId,
					},
					error,
				);
			}
		}
		triggerLogger.info("Completed Settlement table update", {
			userId,
			data: ondcReconPayload,
		});
	}

	private illegalStatuses: string[] = [
		INTERNAL_RECON_STATUS.RECEIVED_PENDING,
		INTERNAL_RECON_STATUS.SENT_PENDING,
		INTERNAL_RECON_STATUS.SENT_ACCEPTED,
		INTERNAL_RECON_STATUS.RECEIVED_ACCEPTED,
	];
}
