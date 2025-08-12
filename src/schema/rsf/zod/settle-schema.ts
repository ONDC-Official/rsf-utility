import { z } from "zod";
import { ENUMS } from "../../../constants/enums";

const currencyObject = z.object({
	currency: z.string(),
	value: z.string().regex(/^\d+(?:\.\d{2})?$/, "Invalid currency format"),
});

const settlePayloadZod = z
	.object({
		context: z.object({
			domain: z.string(),
			location: z.object({
				country: z.object({
					code: z.string(),
				}),
				city: z.object({
					code: z.string(),
				}),
			}),
			version: z.string(),
			action: z.string(),
			bap_id: z.string(),
			bap_uri: z.string().url(),
			bpp_id: z.string(),
			bpp_uri: z.string().url(),
			transaction_id: z.string(),
			message_id: z.string(),
			timestamp: z.string(),
			ttl: z.string(),
		}),
		message: z.object({
			collector_app_id: z.string().optional(),
			receiver_app_id: z.string().optional(),
			settlement: z.object({
				type: z.enum(
					Object.values(ENUMS.SETTLEMENT_TYPE) as [string, ...string[]],
				),
				id: z.string().optional(),
				orders: z
					.array(
						z.object({
							id: z.string().optional(),
							inter_participant: z
								.object({
									amount: currencyObject,
								})
								.optional(),
							collector: z
								.object({
									amount: currencyObject,
								})
								.optional(),
							provider: z
								.object({
									id: z.string(),
									name: z.string(),
									bank_details: z.object({
										account_no: z
											.string()
											.regex(/^\d+$/, "Account number must be digits only"),
										ifsc_code: z.string(),
									}),
									amount: currencyObject,
								})
								.optional(),
							self: z
								.object({
									amount: currencyObject,
								})
								.optional(),
						}),
					)
					.optional(),
			}),
		}),
	})
	.strict();

export default settlePayloadZod;

export type SettlePayload = z.infer<typeof settlePayloadZod>;
