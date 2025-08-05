import { subscriberConfig } from "../../config/rsf-utility-instance-config";
import { UserType } from "../../schema/models/user-schema";
import { ReconAggregateData } from "../../types/generate-recon-types";
import { v4 as uuidv4 } from "uuid";
export function reconBuilder(
	userConfig: UserType,
	reconData: ReconAggregateData,
) {
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
			bap_id: reconData[0].orderData.bap_id,
			bpp_id: reconData[0].orderData.bpp_id,
			bap_uri: reconData[0].orderData.bap_uri,
			bpp_uri: reconData[0].orderData.bpp_uri,
			transaction_id: uuidv4(),
			message_id: uuidv4(),
			timestamp: new Date().toISOString(),
			ttl: "P1D",
		},
		message: {
			orders: reconData.map((data) => {
				const settleData = data.settleData;
				const apiData = data.reconData;
				const totalAmount =
					apiData.paymentDetails?.settlement_amount ??
					settleData.inter_np_settlement;
				const commission =
					apiData.paymentDetails?.commission_amount ?? settleData.commission;
				const withholdingAmount =
					apiData.paymentDetails?.withholding_amount ??
					settleData.withholding_amount;
				const tcs = apiData.paymentDetails?.tcs ?? userConfig.tcs;
				const tds = apiData.paymentDetails?.tds ?? userConfig.tds;
				return {
					id: settleData.order_id,
					amount: {
						currency: "INR",
						value: totalAmount.toFixed(2),
					},
					settlements: [
						{
							id: uuidv4(),
							payment_id: "pymnt-1",
							status: "PENDING",
							amount: {
								currency: "INR",
								value: totalAmount.toFixed(2),
							},
							commission: {
								currency: "INR",
								value: commission.toFixed(2),
							},
							withholding_amount: {
								currency: "INR",
								value: withholdingAmount.toFixed(2),
							},
							tcs: {
								currency: "INR",
								value: tcs.toFixed(2),
							},
							tds: {
								currency: "INR",
								value: tds.toFixed(2),
							},
							updated_at: new Date().toISOString(),
						},
					],
				};
			}),
		},
	};
}
