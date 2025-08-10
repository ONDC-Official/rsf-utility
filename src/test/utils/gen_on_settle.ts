import { SettleAgencyConfig } from "../../config/rsf-utility-instance-config";
import { SettlePayload } from "../../schema/rsf/zod/settle-schema";

export const genDummyOnSettle = (settlePayload: SettlePayload) => {
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
			action: "on_settle",
			bap_id: "receiverapp.com",
			bap_uri: "https://receiver-app.com/ondc/",
			bpp_id: SettleAgencyConfig.agencyId,
			bpp_uri: SettleAgencyConfig.agencyUrl,
			transaction_id: settlePayload.context.transaction_id,
			message_id: settlePayload.context.message_id,
			timestamp: new Date().toISOString(),
			ttl: "P1D",
		},
		message: {
			collector_app_id: settlePayload.message.collector_app_id,
			receiver_app_id: settlePayload.message.receiver_app_id,
			settlement: {
				type: settlePayload.message.settlement.type,
				id: settlePayload.message.settlement.id,
				orders: settlePayload.message.settlement?.orders?.map((order) => {
					return {
						id: order.id,
						inter_participant: {
							amount: {
								currency: "INR",
								value: order.inter_participant?.amount.value,
							},
							status: "NOT_SETTLED",
							error: {
								code: "01",
								message: "Account inactive",
							},
						},
						collector: {
							amount: {
								currency: "INR",
								value: order.collector?.amount.value,
							},
						},
						provider: {
							id: order.provider?.id,
							name: order.provider?.name,
							amount: {
								currency: "INR",
								value: order.provider?.amount.value,
							},
							status: "NOT_SETTLED",
							error: {
								code: "01",
								message: "Account inactive",
							},
						},
						self: {
							amount: {
								currency: "INR",
								value: order.self?.amount.value,
							},
							status: "NOT_SETTLED",
							error: {
								code: "01",
								message: "Account inactive",
							},
						},
					};
				}),
			},
		},
	};
};
