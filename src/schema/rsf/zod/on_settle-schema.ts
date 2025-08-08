import { z } from "zod";
import { ENUMS } from "../../../constants/enums";

const currencyObject = z.object({
	currency: z.string(),
	value: z
		.string()
		.regex(/^(0|[1-9]\d*)(\.\d{1,2})?$/, "Invalid currency format"),
});

const errorObject = z.object({
	code: z.string(),
	message: z.string(),
});

const onSettleSchema = z
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
			action: z.enum(["on_settle"]),
			bap_id: z.string(),
			bap_uri: z.string().url(),
			bpp_id: z.string(),
			bpp_uri: z.string().url(),
			transaction_id: z.string(),
			message_id: z.string(),
			timestamp: z.string(),
			ttl: z.string().optional(),
		}),
		message: z
			.object({
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
										settled_amount: currencyObject,
										amount: currencyObject,
										status: z.enum(["SETTLED", "NOT_SETTLED", "PENDING"]),
										error: errorObject.optional(),
										reference_no: z.string().optional(),
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
										name: z.string().optional(),
										amount: currencyObject,
										status: z.enum(["SETTLED", "NOT_SETTLED", "PENDING"]),
										error: errorObject.optional(),
										reference_no: z.string().optional(),
									})
									.optional(),
								self: z.object({
									amount: currencyObject,
									status: z.enum(["SETTLED", "NOT_SETTLED", "PENDING"]),
									reference_no: z.string().optional(),
									error: errorObject.optional(),
								}),
							}),
						)
						.optional(),
				}),
			})
			.optional(),
		error: errorObject.optional(),
	})
	.strict();

export default onSettleSchema;

export type OnSettlePayload = z.infer<typeof onSettleSchema>;
