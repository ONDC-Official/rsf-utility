import { SettleAgencyConfig } from "../../config/settle-agency-config";
import { SettleType } from "../../schema/models/settle-schema";
import { UserType } from "../../schema/models/user-schema";
import {
	TriggerActionType,
	TriggeringRequirements,
} from "../../types/trigger-types";
import { createHeader } from "../../utils/header-utils";
import logger from "../../utils/logger";
import { detectSettleType } from "../../utils/settle-utils/detect-settle";
import { triggerRequest } from "../../utils/trigger-utils";
import { SettleDbManagementService } from "../settle-service";
import { UserService } from "../user-service";

const triggerLogger = logger.child("settle-trigger-service");

export class SettleTriggerService {
	constructor(
		private settleService: SettleDbManagementService,
		private userService: UserService
	) {}

	async handleSettleAction(userId: string, data: any) {
		triggerLogger.info("Handling settle action", { userId, data });
		const userConfig = await this.getUserConfigData(userId);
		const settleType = detectSettleType(data);
		await this.performPreResponseActions(settleType)(userId, data);
		const responseData = await this.signAndSendPayload(
			userConfig,
			data,
			"settle"
		);
		await this.performPostRequestActions(settleType)(
			userId,
			data,
			responseData.data
		);
		return responseData;
	}
	async signAndSendPayload(
		userConfig: UserType,
		payload: any,
		action: TriggerActionType
	) {
		triggerLogger.info("Signing and sending payload", {
			userConfig,
			action,
		});
		const requirements = this.getTriggerRequirements(
			userConfig,
			payload,
			action
		);
		const header = await createHeader(requirements);
		return triggerRequest(requirements, header);
	}

	async getUserConfigData(userId: string) {
		return await this.userService.getUserById(userId);
	}

	getTriggerRequirements(
		userConfig: UserType,
		data: any,
		action: TriggerActionType
	): TriggeringRequirements {
		return {
			action: action,
			data: data,
			privateKey: userConfig.signing_private_key,
			subscriberId: userConfig.subscriber_id,
			subscriberUniqueKeyId: userConfig.subscriber_unique_key_id,
			forwardingBaseUrl: SettleAgencyConfig.agencyUrl,
		};
	}

	performPostRequestActions(settleType: SettleType["type"]) {
		triggerLogger.info("Performing trigger requirements", { settleType });
		switch (settleType) {
			case "NP-NP":
				return async (userId: string, data: any, responseData: any) => {
					await this.settleService.updateSettlementsViaResponse(
						userId,
						data,
						responseData
					);
				};
		}
		throw new Error(`Unsupported settle type: ${settleType}`);
	}
	performPreResponseActions(settleType: SettleType["type"]) {
		triggerLogger.info("Performing pre-response actions", { settleType });
		switch (settleType) {
			case "NP-NP":
				return async (userId: string, data: any) => {
					await this.settleService.checkSettlementsForUser(userId, data);
				};
		}
		throw new Error(`Unsupported settle type: ${settleType}`);
	}
}
