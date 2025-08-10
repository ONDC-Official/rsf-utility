import { randomInt } from "crypto";
import { subscriberConfig } from "../../config/rsf-utility-instance-config";
import { UserType } from "../../schema/models/user-schema";
import { v4 as uuidv4 } from "uuid";

export const generateReconDUMMY = (
	order_ids: string[],
	userConfig: UserType,
) => {
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
			action: "recon",
			bap_id: subscriberConfig.subscriberId,
			bpp_id: "bpp.example.com",
			bap_uri: userConfig.subscriber_url,
			bpp_uri: "https://bpp.example.com/ondc",
			transaction_id: uuidv4(),
			message_id: uuidv4(),
			timestamp: new Date().toISOString(),
			ttl: "P1D",
		},
		message: {
			orders: order_ids.map((orderId, index) => {
				return {
					id: orderId,
					payment_id: `payment-${index + 1}`,
					amount: {
						currency: "INR",
						value: randomInt(1500, 5000).toFixed(2),
					},
					settlements: [
						{
							id: uuidv4(),
							payment_id: `payment-${index + 1}`,
							status: "PENDING",
							amount: {
								currency: "INR",
								value: randomInt(1500, 5000).toFixed(2),
							},
							commission: {
								currency: "INR",
								value: (randomInt(100, 500) / 100).toFixed(2),
							},
							withholding_amount: {
								currency: "INR",
								value: (randomInt(50, 200) / 100).toFixed(2),
							},
							tcs: {
								currency: "INR",
								value: (randomInt(20, 100) / 100).toFixed(2),
							},
							tds: {
								currency: "INR",
								value: (randomInt(30, 150) / 100).toFixed(2),
							},
							updated_at: new Date().toISOString(),
						},
					],
				};
			}),
		},
	};
};
