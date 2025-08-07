import { z } from "zod";
import { ENUMS } from "../../../constants/enums";

const statusList = [
	ENUMS.RECON_STATUS.NOT_SETTLED,
	ENUMS.RECON_STATUS.SETTLED,
	ENUMS.RECON_STATUS.PENDING,
	ENUMS.RECON_STATUS.TO_BE_INITIATED,
];

const reconStatusEnum = z.enum(statusList);

const currencyObject = z.object({
	currency: z.string(),
	value: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid currency format"), // Ensures value is a valid decimal string
});

// Main Recon Schema
const reconSchema = z
	.object({
		context: z.object({
			domain: z.literal("ONDC:NTS10"),
			location: z
				.object({
					country: z.object({
						code: z.string(),
					}),
					city: z.object({
						code: z.string(),
					}),
				})
				.optional()
				.nullable(),
			version: z.literal("2.0.0"),
			action: z.string(),
			bap_id: z.string(),
			bap_uri: z.url(),
			bpp_id: z.string(),
			bpp_uri: z.url(),
			transaction_id: z.string(),
			message_id: z.string(),
			timestamp: z.string(),
			ttl: z.string(), // Zod doesn't have a specific duration type, string is appropriate
		}),
		message: z.object({
			orders: z.array(
				z.object({
					id: z.string(),
					amount: currencyObject,
					settlements: z.array(
						z.object({
							id: z.string(),
							payment_id: z.string(),
							status: reconStatusEnum,
							amount: currencyObject,
							commission: currencyObject,
							withholding_amount: currencyObject,
							tcs: currencyObject,
							tds: currencyObject,
							settlement_ref_no: z.string().optional(), // Not in required array, so it's optional
							updated_at: z.string(),
						}),
					),
				}),
			),
		}),
	})
	.strict(); // Corresponds to "additionalProperties": false

export default reconSchema;

export type ReconPayload = z.infer<typeof reconSchema>;

export type ReconPayloadSettlement =
	ReconPayload["message"]["orders"][number]["settlements"][number];
