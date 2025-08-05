import { TriggerActionType } from "../../types/trigger-types";
import logger from "../../utils/logger";
import { RsfPayloadDbService } from "../rsf-payloadDb-service";
import { ReconTriggerService } from "./recon-trigger-service";
import { SettleTriggerService } from "./settle-trigger-service";

const triggerLogger = logger.child("trigger-service");

export class TriggerService {
	constructor(
		private settleTriggerService: SettleTriggerService,
		private reconTriggerService: ReconTriggerService,
	) {}

	async handleTrigger(action: TriggerActionType, userId: string, data: any) {
		triggerLogger.info("Handling trigger action", { action, userId, data });
		const response = await this.GetResponse(action, userId, data);
		return response;
	}

	private async GetResponse(action: string, userId: string, data: any) {
		switch (action) {
			case "settle":
				return await this.settleTriggerService.handleSettleAction(userId, data);
			case "recon":
				return await this.reconTriggerService.handleReconAction(userId, data);
			case "report":
				// Handle report action
				break;
		}
		throw new Error(`Unsupported action: ${action}`);
	}
}
