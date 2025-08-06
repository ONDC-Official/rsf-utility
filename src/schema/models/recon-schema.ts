import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

const BreakdownSchema = z
	.object({
		type: z
			.object({
				amount: z.number().openapi({
					description: "Amount",
					example: 1000,
				}),
				commission: z.number().openapi({
					description: "Commission",
					example: 50,
				}),
				withholding_amount: z.number().openapi({
					description: "Withholding amount",
					example: 200,
				}),
				tcs: z.number().openapi({
					description: "TCS",
					example: 100,
				}),
				tds: z.number().openapi({
					description: "TDS",
					example: 50,
				}),
			})
			.strict()
			.openapi({
				description: "Breakdown details",
			}),
	})
	.strict()
	.openapi("BreakdownSchema");

export const ReconSchema = z
	.object({
		user_id: z.string().openapi({
			description: "User ID",
			example: "user123",
		}),
		order_id: z.string().openapi({
			description: "Order ID",
			example: "order123",
		}),
		recon_status: z.string().openapi({
			description: "Recon status",
			example: "PENDING",
		}),
		settlement_id: z.string().openapi({
			description: "Settlement ID",
			example: "settlement123",
		}),
		transaction_db_ids: z.array(z.string()).openapi({
			description: "Transaction DB IDs",
			example: ["transaction1", "transaction2"],
		}),
		recon_breakdown: BreakdownSchema.openapi({
			description: "Recon breakdown",
		}),
		on_recon_breakdown: BreakdownSchema.optional().openapi({
			description: "On recon breakdown",
		}),
		due_date: z.date().openapi({
			description: "Due date",
			example: "2025-08-07T00:00:00.000Z",
		}),
	})
	.strict()
	.openapi("ReconSchema");

export type BreakdownType = z.infer<typeof BreakdownSchema>;
export type ReconType = z.infer<typeof ReconSchema>;
