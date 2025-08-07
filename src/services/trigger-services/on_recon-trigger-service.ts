import { UserType } from "../../schema/models/user-schema";
import { OnReconPayload } from "../../schema/rsf/zod/on_recon-schema";
import {
	TriggerActionType,
	TriggeringRequirements,
} from "../../types/trigger-types";
import { checkPerfectAck } from "../../utils/ackUtils";
import { createHeader } from "../../utils/header-utils";
import logger from "../../utils/logger";
import { triggerRequest } from "../../utils/trigger-utils";
import { ReconDbService } from "../recon-service";
import { UserService } from "../user-service";

const triggerLogger = logger.child("on_recon-trigger-service");

export class OnReconTriggerService {
	constructor(
		private reconService: ReconDbService,
		private userService: UserService,
	) {}

	async handleOnReconAction(
		userId: string,
		ondcOnReconPayload: OnReconPayload,
	) {
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

	async signAndSendPayload(
		userConfig: UserType,
		ondReconPayload: OnReconPayload,
	) {
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
		ondcReconPayload: OnReconPayload,
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
		ondcOnReconPayload: OnReconPayload,
	) {
		const bapUri = ondcOnReconPayload.context.bap_uri;
		const bppUri = ondcOnReconPayload.context.bpp_uri;
		const userUri = userConfig.subscriber_url;
		if (userUri !== bapUri && userUri !== bppUri) {
			throw new Error(
				`User URI ${userUri} does not match BAP URI ${bapUri} or BPP URI ${bppUri}`,
			);
		}
		const orderIds = ondcOnReconPayload.message?.orders.map(
			(order) => order.id,
		);
		if (!orderIds || orderIds.length === 0) {
			throw new Error("No order IDs provided for reconciliation check");
		}

		// validate if recon accord is true then due date is present
		for (const order of ondcOnReconPayload.message?.orders || []) {
			if (order.recon_accord && !order.settlements[0].due_date) {
				throw new Error("Due date is required when recon accord is true");
			}
		}

		// const firstOrder = orderIds[0];
		// const getOrder = await this.reconService.getReconById(userId, firstOrder);
		triggerLogger.warning("Some Trigger Recon checks are missing!");
	}

	async updateSettlementTable(
		ondcReconPayload: OnReconPayload,
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
		const orders = ondcReconPayload.message?.orders;
		if (!orders || orders.length === 0) {
			triggerLogger.warning("No orders found in the payload");
			return;
		}
		for (const order of orders) {
			const accord = order.recon_accord;
			const orderId = order.id;
			const reconExists = await this.reconService.checkReconExists(
				userId,
				orderId,
			);
			if (!reconExists) {
				triggerLogger.warning(
					`Recon record does not exist for order ID: ${orderId}`,
				);
				continue;
			}
			if (accord) {
				const dueDate = order.settlements[0].due_date;
				if (!dueDate) {
					throw new Error("Due date is missing in the settlement data.");
				}
				await this.reconService.updateData(userId, orderId, {
					recon_status: "RECEIVED_ACCEPTED",
					due_date: new Date(dueDate),
				});
			} else {
				await this.reconService.updateData(userId, orderId, {
					recon_status: "RECEIVED_REJECTED",
					on_recon_breakdown: {
						amount: parseFloat(order.settlements[0].amount.value),
						commission: parseFloat(order.settlements[0].commission.value),
						withholding_amount: parseFloat(
							order.settlements[0].withholding_amount.value,
						),
						tcs: parseFloat(order.settlements[0].tcs.value),
						tds: parseFloat(order.settlements[0].tds.value),
					},
				});
			}
		}
	}
}
