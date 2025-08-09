import {
	createAuthorizationHeader,
	isHeaderValid,
} from "ondc-crypto-sdk-nodejs";
import logger from "./logger";
import { TriggeringRequirements } from "../types/trigger-types";
import { subscriberConfig } from "../config/rsf-utility-instance-config";
import axios from "axios";
import { getBaseUrl as getBaseRegistryUrl } from "../config/registry-config";

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

export const validateHeaderFromNp = async (
	headers: any,
	body: any,
	loggerMeta: any,
) => {
	const publicKey = await getPublicKeyFromHeaders(
		JSON.stringify(headers),
		loggerMeta,
	);
	return await validateHeader(headers, body, publicKey);
};

const getPublicKeyFromHeaders = async (
	headers: string,
	loggerMeta: any,
): Promise<string> => {
	const { subscriberId, ukId } =
		fetchSubscriberDetails(headers, loggerMeta) || {};
	if (!subscriberId || !ukId) {
		logger.error("Subscriber ID or UKID not found", {
			subscriberId,
			ukId,
		});
		throw new Error("Subscriber ID or UKID not found");
	}
	const response = await performLookup(subscriberId, ukId, loggerMeta);
	return response.signing_public_key;
};

const fetchSubscriberDetails = (header: string, loggingMeta: any) => {
	logger.info("Fetching subscriber details", loggingMeta);
	const keyId: string[] = extractSignatureKeyId(header, loggingMeta);

	if (keyId.length === 0) {
		logger.error("Key ID not found in header", loggingMeta);
		return null;
	}

	// Split the matched keyId value by '|' and destructure the parts if they exist
	const [subscriberId, ukId, _] = keyId[0].split("|");

	// Ensure both subscriberID and ukId are present
	return subscriberId && ukId ? { subscriberId, ukId } : null;
};

function extractSignatureKeyId(input: string, loggingMeta: any): string[] {
	const keyIdRegex = /keyId=\\"([^\\"]+)\\"/g;
	const matches: string[] = [];
	let match;

	while ((match = keyIdRegex.exec(input)) !== null) {
		matches.push(match[1]);
	}
	logger.info("Extracted keyId from header", {
		matches,
		...loggingMeta,
	});
	return matches;
}

async function performLookup(subId: string, ukId: string, loggingMeta: any) {
	logger.info("Performing lookup for subscriber details", {
		subscriberId: subId,
		ukId,
		...loggingMeta,
	});

	let baseUrl = getBaseRegistryUrl();
	const url = `${baseUrl}lookup`;
	const data = {
		subscriber_id: subId,
		ukId: ukId,
	};
	const header = await createAuthorizationHeader({
		body: JSON.stringify(data),
		privateKey: subscriberConfig.subscriberPrivateKey,
		subscriberId: subscriberConfig.subscriberId,
		subscriberUniqueKeyId: subscriberConfig.subscriberUniqueId,
	});

	try {
		logger.info("Lookup request URL is: " + url, loggingMeta);
		logger.info("Lookup request data", {
			data,
			...loggingMeta,
			header: header,
		});
		const response = await axios.post(url, data, {
			headers: {
				"Content-Type": "application/json",
				Authorization: header,
			},
		});
		logger.info("Lookup response received", {
			data: response.data,
			...loggingMeta,
		});
		return response.data[0];
	} catch (error: any) {
		logger.error(
			"Error while performing lookup",
			{
				subscriberId: subId,
				ukId,
				...loggingMeta,
			},
			error,
		);
		throw new Error("Error while performing lookup");
	}
}
