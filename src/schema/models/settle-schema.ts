import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { ENUMS } from "../../constants/enums";

extendZodWithOpenApi(z);

const statusEnum = Object.values(ENUMS.SETTLEMENT_STATUS);
const typeEnum = Object.values(ENUMS.SETTLEMENT_TYPE);
export const SettleSchema = z
	.object({
		order_id: z.string().openapi({
			description: "Unique identifier for the order",
			example: "order123",
		}),
		user_id: z.string().openapi({
			description: "Unique identifier for the user",
			example: "user123",
		}),
		settlement_id: z.string().openapi({
			description: "Unique identifier for the settlement",
			example: "settlement123",
		}),
		collector_id: z.string().openapi({
			description: "Collector identifier",
			example: "collector123",
		}),
		receiver_id: z.string().openapi({
			description: "Receiver identifier",
			example: "receiver123",
		}),
		total_order_value: z.number().openapi({
			description: "Total order value",
			example: 1000,
		}),
		commission: z.number().openapi({
			description: "Commission amount",
			example: 50,
		}),
		collector_settlement: z.number().openapi({
			description: "Collector settlement amount",
			example: 500,
		}),
		tds: z.number().openapi({
			description: "Tax Deducted at Source (TDS) amount",
			example: 100,
		}),
		tcs: z.number().openapi({
			description: "Tax Collected at Source (TCS) amount",
			example: 150,
		}),
		withholding_amount: z.number().openapi({
			description: "Withholding amount",
			example: 200,
		}),
		inter_np_settlement: z.number().openapi({
			description: "Inter NP settlement amount",
			example: 300,
		}),
		provider_id: z.string().optional().nullable().openapi({
			description: "Provider identifier",
			example: "provider123",
		}),
		due_date: z.date().optional().nullable().openapi({
			description: "Due date for settlement",
			example: "2025-08-07T00:00:00.000Z",
		}),
		type: z.enum(typeEnum).openapi({
			description: "Settlement type",
			example: "type123",
		}),
		settlement_reference: z.string().optional().nullable().openapi({
			description: "Settlement reference",
			example: "reference123",
		}),
		provider_settlement_reference: z.string().optional().nullable().openapi({
			description: "Provider settlement reference",
			example: "providerReference123",
		}),
		self_settlement_reference: z.string().optional().nullable().openapi({
			description: "Self settlement reference",
			example: "selfReference123",
		}),
		error: z.string().optional().nullable().openapi({
			description: "Error details",
			example: "Error occurred",
		}),
		status: z.enum(statusEnum).openapi({
			description: "Settlement status",
			example: "PENDING",
		}),
		provider_status: z.enum(statusEnum).optional().nullable().openapi({
			description: "Provider settlement status",
			example: "SETTLED",
		}),
		self_status: z.enum(statusEnum).optional().nullable().openapi({
			description: "Self settlement status",
			example: "NOT-SETTLED",
		}),
		transaction_db_ids: z.array(z.string()).openapi({
			description: "Array of transaction internal database IDs",
			example: ["txn123", "txn456"],
		}),
		initiated_date: z.date().optional().nullable().openapi({
			description: "Date when the settlement was initiated",
			example: "2025-08-07T00:00:00.000Z",
		}),
	})
	.strict()
	.openapi("SettleSchema");

export type SettleType = z.infer<typeof SettleSchema>;
