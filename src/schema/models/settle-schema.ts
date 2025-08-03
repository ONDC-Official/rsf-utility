import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const SettleSchema = z
	.object({
		order_id: z.string().openapi({
			description: "Unique identifier for the order",
			example: "order123",
		}),
		user_id: z.string().openapi({
			description: "Unique identifier for the user config",
			example: "user123",
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
		tax: z.number().openapi({
			description: "Tax amount",
			example: 100,
		}),
		withholding_amount: z.number().openapi({
			description: "Withholding amount",
			example: 200,
		}),
		inter_np_settlement: z.number().openapi({
			description: "Inter NP settlement amount",
			example: 300,
		}),
		provider_id: z.string().openapi({
			description: "Provider identifier",
			example: "provider123",
		}),
		due_date: z.date().openapi({
			description: "Due date for settlement",
			example: "2025-08-03T00:00:00.000Z",
		}),
		settlement_reference: z.string().optional().openapi({
			description: "Settlement reference",
			example: "reference123",
		}),
		error: z.string().optional().openapi({
			description: "Error details",
			example: "Error occurred",
		}),
		status: z.enum(["PREPARED", "PENDING", "SETTLED", "NOT-SETTLED"]).openapi({
			description: "Settlement status",
			example: "PENDING",
		}),
		type: z.enum(["NP-NP", "NIL", "MISC"]).openapi({
			description: "Type of settlement",
			example: "NP-NP",
		}),
	})
	.strict()
	.openapi("SettleSchema");

export type SettleType = z.infer<typeof SettleSchema>;
