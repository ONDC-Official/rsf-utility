import {
	SettleAgencyConfig,
	subscriberConfig,
} from "../../config/rsf-utility-instance-config";
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
		private userService: UserService,
	) {}

	async handleSettleAction(userId: string, ondcSettlePayload: any) {
		triggerLogger.info("Handling settle action", {
			userId,
			data: ondcSettlePayload,
		});
		const userConfig = await this.getUserConfigData(userId);
		this.validateUserConfigData(userConfig, ondcSettlePayload);
		const settleType = detectSettleType(ondcSettlePayload);
		await this.performPreResponseActions(settleType)(userId, ondcSettlePayload);
		const responseData = await this.signAndSendPayload(
			userConfig,
			ondcSettlePayload,
			"settle",
		);
		await this.performPostRequestActions(settleType)(
			userId,
			ondcSettlePayload,
			responseData.data,
		);
		return responseData;
	}
	async signAndSendPayload(
		userConfig: UserType,
		payload: any,
		action: TriggerActionType,
	) {
		triggerLogger.info("Signing and sending payload", {
			userConfig,
			action,
		});
		const requirements = this.getTriggerRequirements(
			userConfig,
			payload,
			action,
		);
		const header = await createHeader(requirements);
		return await triggerRequest(requirements, header);
	}

	async getUserConfigData(userId: string) {
		return await this.userService.getUserById(userId);
	}

	getTriggerRequirements(
		userConfig: UserType,
		data: any,
		action: TriggerActionType,
	): TriggeringRequirements {
		return {
			action: action,
			data: data,
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
						responseData,
					);
				};
		}
		throw new Error(`Unsupported settle type: ${settleType}`);
	}

	validateUserConfigData(userConfig: UserType, ondcSettlePayload: any) {
		triggerLogger.info("Validating user config data for settle trigger");
		const bapUri = ondcSettlePayload.context.bap_uri;
		const bppUri = ondcSettlePayload.context.bpp_uri;
		const userUri = userConfig.subscriber_url;
		if (!userUri) {
			throw new Error("User URI is not defined in user config");
		}
		if (userUri !== bapUri && userUri !== bppUri) {
			throw new Error(
				`User URI ${userUri} does not match BAP URI ${bapUri} or BPP URI ${bppUri}`,
			);
		}
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
