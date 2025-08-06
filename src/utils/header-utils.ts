import {
	createAuthorizationHeader,
	isHeaderValid,
} from "ondc-crypto-sdk-nodejs";
import logger from "./logger";
import { TriggeringRequirements } from "../types/trigger-types";
import { subscriberConfig } from "../config/rsf-utility-instance-config";

const headerLogger = logger.child("header-utils");

export const createHeader = async (requirements: TriggeringRequirements) => {
	try {
		const header = await createAuthorizationHeader({
			body: JSON.stringify(requirements.data),
			privateKey: subscriberConfig.subscriberPrivateKey,
			subscriberId: subscriberConfig.subscriberId,
			subscriberUniqueKeyId: subscriberConfig.subscriberUniqueId,
		});
		headerLogger.info("Header created successfully", { header });
		return header;
	} catch (error) {
		headerLogger.error("Error creating header", {}, error);
	}
};

export const validateHeader = async (
	header: any,
	body: any,
	publicKey: string,
) => {
	try {
		const res = await isHeaderValid({
			header: JSON.stringify(header),
			body: JSON.stringify(body),
			publicKey: publicKey,
		});
		if (!res) {
			headerLogger.error("Invalid header", { header, body });
			return false;
		}
		headerLogger.info("Header is valid", { header, body });
		return res;
	} catch (error) {
		headerLogger.error("Error validating header", {}, error);
		return false;
	}
};
