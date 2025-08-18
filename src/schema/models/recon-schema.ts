import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { ENUMS } from "../../constants/enums";

extendZodWithOpenApi(z);

const BreakdownSchema = z
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
	});

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
		collector_id: z.string().openapi({
			description: "Collector ID",
			example: "collector123",
		}),
		receiver_id: z.string().openapi({
			description: "Receiver ID",
			example: "receiver123",
		}),
		recon_status: z.enum(Object.values(ENUMS.INTERNAL_RECON_STATUS)).openapi({
			description: "Recon status",
			example: "SENT_PENDING",
		}),
		settlement_id: z.string().openapi({
			description: "Settlement ID",
			example: "settlement123",
		}),
		payment_id: z.string().optional().nullable().openapi({
			description: "Payment ID",
			example: "payment123",
		}),
		transaction_db_ids: z.array(z.string()).openapi({
			description: "Transaction DB IDs",
			example: ["transaction1", "transaction2"],
		}),
		transaction_id: z.string().openapi({
			description: "Transaction ID",
			example: "txn123",
		}),
		recon_breakdown: BreakdownSchema.openapi({
			description: "Recon breakdown",
		}),
		on_recon_breakdown: BreakdownSchema.optional().nullable().openapi({
			description: "On recon breakdown",
		}),
		on_recon_error: z
			.any()
			.optional()
			.nullable()
			.openapi({
				description: "On recon error details",
				example: { error: "Some error occurred" },
			}),
		due_date: z.date().optional().nullable().openapi({
			description: "Due date",
			example: "2025-08-07T00:00:00.000Z",
		}),
		recon_date: z.date().openapi({
			description: "Recon date",
			example: "2025-08-07T00:00:00.000Z",
		}),
	})
	.strict()
	.openapi("ReconSchema");

export type BreakdownType = z.infer<typeof BreakdownSchema>;
export type ReconType = z.infer<typeof ReconSchema>;
