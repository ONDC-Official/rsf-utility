import { TriggerActionType } from "../../types/trigger-types";
import logger from "../../utils/logger";
import { RsfPayloadDbService } from "../rsf-payloadDb-service";
import { SettleTriggerService } from "./settle-trigger-service";

const triggerLogger = logger.child("trigger-service");

export class TriggerService {
	constructor(private settleTriggerService: SettleTriggerService) {}

	async handleTrigger(action: TriggerActionType, userId: string, data: any) {
		triggerLogger.info("Handling trigger action", { action, userId, data });
		const response = await this.GetResponse(action, userId, data);
		// await this.rsfPayloadDbService.saveRsfPayload({
		// 	requestData: data,
		// 	responseData: {
		// 		statusCode: response.status,
		// 		body: response.data,
		// 	},
		// });
		return response;
	}

	private async GetResponse(action: string, userId: string, data: any) {
		switch (action) {
			case "settle":
				return await this.settleTriggerService.handleSettleAction(userId, data);
			case "recon":
				// Handle recon action
				break;
			case "report":
				// Handle report action
				break;
		}
		throw new Error(`Unsupported action: ${action}`);
	}
}
