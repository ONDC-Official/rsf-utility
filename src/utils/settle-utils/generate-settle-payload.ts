import { SettleType } from "../../schema/models/settle-schema";
import { UserType } from "../../schema/models/user-schema";
import { v4 as uuidv4 } from "uuid";
import logger from "../logger";
import {
	SettleAgencyConfig,
	subscriberConfig,
} from "../../config/rsf-utility-instance-config";
import z from "zod";
import { GenSettlementsBodyObject } from "../../types/settle-params";
export function generateSettlePayload(
	userConfig: UserType,
	settlements: SettleType[],
	settlementData: z.infer<typeof GenSettlementsBodyObject>[],
) {
	if (!userConfig || !settlements || settlements.length === 0) {
		throw new Error("Invalid user configuration or settlements data");
	}

	const settleMap = new Map<string, SettleType>();
	for (const settle of settlements) {
		if (settleMap.has(settle.order_id)) {
			throw new Error(
				`Duplicate order_id found in settlements: ${settle.order_id}`,
			);
		}
		settleMap.set(settle.order_id, settle);
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
			collector_app_id: settlements[0].collector_id,
			receiver_app_id: settlements[0].receiver_id,
			settlement: {
				type: "NP-NP",
				id: uuidv4(),
				orders: settlementData.map((settle) => {
					const dbSettle = settleMap.get(settle.order_id);
					if (!dbSettle) {
						throw new Error(
							`Settlement not found for order_id: ${settle.order_id}`,
						);
					}
					let providerDetails = null;
					if (settle.provider_value) {
						providerDetails = userConfig.provider_details?.find(
							(provider) => provider.provider_id === dbSettle.provider_id,
						);

						if (!providerDetails) {
							// throw new Error(
							// 	`Provider details not found for provider ID: ${dbSettle.provider_id}`,
							// );
							providerDetails = null;
						}
					}

					const order: any = {
						id: settle.order_id,
						inter_participant: {
							amount: {
								currency: "INR",
								value: Math.abs(dbSettle.inter_np_settlement).toFixed(2),
							},
						},
						collector: {
							amount: {
								currency: "INR",
								value: dbSettle.commission.toFixed(2),
							},
						},
					};

					if (settle.provider_value && providerDetails) {
						order.provider = {
							id: dbSettle.provider_id,
							name: providerDetails.bank_name,
							bank_details: {
								account_no: providerDetails.account_number,
								ifsc_code: providerDetails.ifsc_code,
							},
							amount: {
								currency: "INR",
								value: settle.provider_value.toFixed(2),
							},
						};
					}
					if (settle.self_value) {
						order.self = {
							amount: {
								currency: "INR",
								value: settle.self_value.toFixed(2),
							},
						};
					}

					return order;
				}),
			},
		},
	};
}
