import { z } from "zod";
import { ENUMS } from "../../../constants/enums";

const enumList = Object.values(ENUMS.RECON_STATUS);
// Assuming ENUMS.RECON_STATUS is an object with string values.
// Replace this with your actual enum values from `ENUMS.RECON_STATUS`
const reconStatusEnum = z.enum(enumList); // Example values

// Reusable schema for currency and value objects (without diff_value)
const currencyObject = z.object({
	currency: z.string(),
	value: z
		.string()
		.regex(/^\d+\.\d{2}$/, "Value must have exactly two decimal places"),
});

// Reusable schema for settlement currency objects (with optional diff_value)
const currencyObjectWithDiff = z.object({
	currency: z.string(),
	value: z
		.string()
		.regex(/^\d+\.\d{2}$/, "Value must have exactly two decimal places"),
	diff_value: z
		.string()
		.regex(/^\d+\.\d{2}$/, "diff_value must have exactly two decimal places")
		.optional(),
});

// Main on_recon Schema
const onReconSchema = z
	.object({
		context: z.object({
			domain: z.literal("ONDC:NTS10"),
			location: z.object({
				country: z.object({
					code: z.string(),
				}),
				city: z.object({
					code: z.string(),
				}),
			}),
			version: z.literal("2.0.0"),
			action: z.literal("on_recon"),
			bap_id: z.string(),
			bap_uri: z.url(),
			bpp_id: z.string(),
			bpp_uri: z.url(),
			transaction_id: z.string(),
			message_id: z.string(),
			timestamp: z.string(),
			ttl: z.string().optional(), // Not in required array, so it's optional
		}),
		message: z
			.object({
				orders: z.array(
					z.object({
						id: z.string(),
						amount: currencyObject,
						recon_accord: z.boolean(),
						settlements: z.array(
							z.object({
								id: z.string(),
								payment_id: z.string().optional(),
								due_date: z.string().optional(),
								status: reconStatusEnum,
								settlement_ref_no: z.string().optional(),
								amount: currencyObjectWithDiff,
								commission: currencyObjectWithDiff,
								withholding_amount: currencyObjectWithDiff,
								tcs: currencyObjectWithDiff,
								tds: currencyObjectWithDiff,
								updated_at: z.string(),
							}),
						),
					}),
				),
			})
			.strict()
			.nullable()
			.optional(),
		error: z
			.object({
				message: z.string(),
				code: z.string(),
			})
			.nullable()
			.optional(),
	})
	.strict(); // Corresponds to "additionalProperties": false

export default onReconSchema;

export type OnReconPayload = z.infer<typeof onReconSchema>;

// Extract the type of the non-nullable, non-optional message object
type MessageType = NonNullable<NonNullable<OnReconPayload["message"]>>;
export type OnReconPayloadOrders = MessageType["orders"][number];

export type OnReconPayloadSettlement =
	OnReconPayloadOrders["settlements"][number];
