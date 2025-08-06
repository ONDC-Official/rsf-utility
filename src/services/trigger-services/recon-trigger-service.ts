import { subscriberConfig } from "../../config/rsf-utility-instance-config";
import { INTERNAL_RECON_STATUS } from "../../constants/enums";
import { SubReconDataType } from "../../schema/models/settle-schema";
import { UserType } from "../../schema/models/user-schema";
import {
	TriggerActionType,
	TriggeringRequirements,
} from "../../types/trigger-types";
import { checkPerfectAck } from "../../utils/ackUtils";
import { createHeader } from "../../utils/header-utils";
import logger from "../../utils/logger";
import { extractReconDetails } from "../../utils/recon-utils/extract-recon-details";
import { triggerRequest } from "../../utils/trigger-utils";
import { SettleDbManagementService } from "../settle-service";
import { UserService } from "../user-service";

const triggerLogger = logger.child("recon-trigger-service");
export class ReconTriggerService {
	constructor(
		private settleService: SettleDbManagementService,
		private userService: UserService,
	) {}

	async handleReconAction(userId: string, ondcReconPayload: any) {
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
		ondcReconPayload: any,
	) {
		const bapUri = ondcReconPayload.context.bap_uri;
		const bppUri = ondcReconPayload.context.bpp_uri;
		const userUri = userConfig.subscriber_url;
		if (userUri !== bapUri && userUri !== bppUri) {
			throw new Error(
				`User URI ${userUri} does not match BAP URI ${bapUri} or BPP URI ${bppUri}`,
			);
		}
		const orderIds: string[] = ondcReconPayload.message.orders.id.map(
			(order: any) => order.id,
		);
		if (orderIds.length === 0) {
			throw new Error("No order IDs provided for reconciliation check");
		}
		let constantReconId = "";
		for (const orderId of orderIds) {
			const settlements = await this.settleService.getSettlements(userId, {
				order_id: orderId,
			});
			if (settlements.length === 0) {
				throw new Error(
					`Settlement for order ID ${orderId} does not exist for user ID: ${userId}`,
				);
			}
			const settlement = settlements[0];
			const reconStatus = settlement.reconInfo.recon_status;
			if (this.illegalStatuses.includes(reconStatus)) {
				throw new Error(
					`CAN'T TRIGGER::Reconciliation for order ID ${orderId} is already ${reconStatus} for user ID: ${userId}`,
				);
			}
			const reconId = `${settlement.receiver_id}-${settlement.collector_id}`;
			if (constantReconId != "" && constantReconId !== reconId) {
				throw new Error(
					`collector_id & receiver_id do not match for all order IDs: ${orderIds.join(
						", ",
					)} for user-config ID: ${userId}`,
				);
			}
			constantReconId = reconId;
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
		ondcReconPayload: any,
		syncResponse: any,
		userId: string,
	) {
		triggerLogger.info("Updating settlement table with recon data", {
			userId,
			data: ondcReconPayload,
			response: syncResponse,
		});
		if (!checkPerfectAck(syncResponse)) {
			triggerLogger.warning(
				"Sync response is not a perfect ACK, skipping settlement update",
			);
			return;
		}
		for (const orderData of ondcReconPayload.message.orders.settlements) {
			try {
				const orderId = orderData.id;
				const settlement = orderData.settlements[0];
				const reconData = extractReconDetails(
					settlement,
					ondcReconPayload,
					INTERNAL_RECON_STATUS.SENT_PENDING,
				);
				await this.settleService.updateReconData(userId, orderId, reconData);
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
		triggerLogger.info("Settlement table updated successfully", {
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
