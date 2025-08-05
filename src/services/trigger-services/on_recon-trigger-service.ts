import { UserType } from "../../schema/models/user-schema";
import {
	TriggerActionType,
	TriggeringRequirements,
} from "../../types/trigger-types";
import { checkPerfectAck } from "../../utils/ackUtils";
import { createHeader } from "../../utils/header-utils";
import logger from "../../utils/logger";
import { triggerRequest } from "../../utils/trigger-utils";
import { SettleDbManagementService } from "../settle-service";
import { UserService } from "../user-service";

const triggerLogger = logger.child("on_recon-trigger-service");

export class OnReconTriggerService {
	constructor(
		private settleService: SettleDbManagementService,
		private userService: UserService,
	) {}

	async handleOnReconAction(userId: string, ondcOnReconPayload: any) {
		triggerLogger.info("Handling on recon action", {
			userId,
			data: ondcOnReconPayload,
		});
		const userConfig = await this.userService.getUserById(userId);
		await this.validateOnReconConditions(
			userId,
			userConfig,
			ondcOnReconPayload,
		);
		const responseData = await this.signAndSendPayload(
			userConfig,
			ondcOnReconPayload,
		);
		await this.updateSettlementTable(
			ondcOnReconPayload,
			responseData.data,
			userId,
		);
		return responseData;
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

	async validateOnReconConditions(
		userId: string,
		userConfig: UserType,
		ondcOnReconPayload: any,
	) {
		const bapUri = ondcOnReconPayload.context.bap_uri;
		const bppUri = ondcOnReconPayload.context.bpp_uri;
		const userUri = userConfig.subscriber_url;
		if (userUri !== bapUri && userUri !== bppUri) {
			throw new Error(
				`User URI ${userUri} does not match BAP URI ${bapUri} or BPP URI ${bppUri}`,
			);
		}
		const orderIds: string[] = ondcOnReconPayload.message.orders.map(
			(order: any) => order.id,
		);
		if (orderIds.length === 0) {
			throw new Error("No order IDs provided for reconciliation check");
		}
		const { transactionId, messageId } = await this._getReconContext(
			userId,
			orderIds[0],
		);
		const dbSettlements = await this.settleService.getAllSettlementsForRecon(
			transactionId,
			messageId,
		);
		if (dbSettlements.length !== orderIds.length) {
			throw new Error(
				`Data mismatch: Expected ${dbSettlements.length} settlement records for this batch, but received ${orderIds.length}.`,
			);
		}
		for (const dbSettlement of dbSettlements) {
			const reconStatus = dbSettlement.reconInfo.recon_status;
			if (reconStatus != "RECEIVED_PENDING") {
				throw new Error(
					`CAN'T TRIGGER:: on_recon is not required for order ID ${dbSettlement.order_id} as it is already ${reconStatus} for user ID: ${userId}`,
				);
			}
			if (orderIds.includes(dbSettlement.order_id) === false) {
				throw new Error(
					`Order ID ${dbSettlement.order_id} is not provided, which is required for reconciliation for transaction ID: ${transactionId} and message ID: ${messageId}`,
				);
			}
		}
	}

	/**
	 * Fetches the initial settlement to establish the transaction context (transaction_id, message_id).
	 */
	private async _getReconContext(userId: string, orderId: string) {
		const firstSettlement = await this.settleService.getSingleSettlement(
			userId,
			orderId,
		);

		if (!firstSettlement) {
			throw new Error(
				`Settlement not found for order ID: ${orderId}. Cannot establish reconciliation context.`,
			);
		}

		const { context } = firstSettlement.reconInfo;
		const transactionId = context?.transaction_id;
		const messageId = context?.message_id;

		if (!transactionId || !messageId) {
			throw new Error(
				`Transaction ID or Message ID is missing in the settlement for order ID: ${orderId}.`,
			);
		}

		return { transactionId, messageId };
	}

	async updateSettlementTable(
		ondcReconPayload: any,
		syncResponse: any,
		userId: string,
	) {
		triggerLogger.info("Updating settlement table", {
			ondcReconPayload,
			syncResponse,
			userId,
		});
		// Implement the logic to update the settlement table
		// if accepted mark ACCEPTED in recon_status else if rejected
		if (!checkPerfectAck(syncResponse)) {
			triggerLogger.warning(
				"Sync response is not a perfect ACK, skipping settlement update",
			);
			return;
		}
		const orders = ondcReconPayload.message.orders;
		for (const order of orders) {
			const accord = order.recon_accord;
			const orderId = order.id;
			if (accord) {
				await this.settleService.updateReconData(userId, orderId, {
					recon_status: "RECEIVED_ACCEPTED",
				});
			} else {
				await this.settleService.updateReconData(userId, orderId, {
					recon_status: "RECEIVED_REJECTED",
				});
			}
		}
	}
}
