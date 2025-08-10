import { UserType } from "../../schema/models/user-schema";
import { v4 as uuidv4 } from "uuid";
import logger from "../logger";
const miscGeneratorLogger = logger.child("generate-misc-payload");
import { z } from "zod";
import { MiscSettlementSchema } from "../../types/settle-params";
import { buildMiscSettlement } from "./build-misc-settlement";
import {
	SettleAgencyConfig,
	subscriberConfig,
} from "../../config/rsf-utility-instance-config";

type MiscSettlementSchema = z.infer<typeof MiscSettlementSchema>;
export function generateMiscFile(
	userConfig: UserType,
	miscData: MiscSettlementSchema,
) {
	miscGeneratorLogger.info("Generating Misc Settlement file payload");

	if (!userConfig) {
		throw new Error("Invalid user configuration or settlements data");
	}
	return {
		context: {
			domain: "ONDC:NTS10",
			location: {
				country: {
					code: "IND",
				},
				city: {
					code: "*",
				},
			},
			version: "2.0.0",
			action: "settle",
			bap_id: subscriberConfig.subscriberId,
			bap_uri: userConfig.subscriber_url,
			bpp_id: SettleAgencyConfig.agencyId,
			bpp_uri: SettleAgencyConfig.agencyUrl,
			transaction_id: uuidv4(),
			message_id: uuidv4(),
			timestamp: new Date().toISOString(),
			ttl: "P1D",
		},
		message: {
			settlement: {
				type: "MISC",
				id: uuidv4(),

				orders: buildMiscSettlement(miscData),
			},
		},
	};
}
