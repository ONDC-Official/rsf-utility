import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { SettleType } from "../schema/models/settle-schema";
import { OrderType } from "../schema/models/order-schema";

extendZodWithOpenApi(z);
export const GenReconOrderObj = z.object({
	order_id: z.string(),
	paymentDetails: z
		.object({
			settlement_amount: z.number().openapi({
				description: "Total settlement amount for the order",
				example: 1000,
			}),
			commission_amount: z.number().openapi({
				description: "Commission amount for the order",
				example: 100,
			}),
			withholding_amount: z.number().openapi({
				description: "Withholding amount for the order",
				example: 50,
			}),
			tds: z.number().positive().openapi({
				description: "TDS amount for the order",
				example: 10,
			}),
			tcs: z.number().positive().openapi({
				description: "TSC amount for the order",
				example: 5,
			}),
		})
		.optional(),
});

export const GenReconBody = z
	.object({
		recon_data: z.array(GenReconOrderObj).min(1).max(100).openapi({
			description: "Array of reconciliation order objects",
		}),
	})
	.refine(
		(body) => {
			const allHave = body.recon_data.every(
				(item) => item.paymentDetails != null,
			);
			const noneHave = body.recon_data.every(
				(item) => item.paymentDetails == null,
			);
			return allHave || noneHave;
		},
		{
			message: "If one item has paymentDetails, then all must have it.",
			path: ["recon_data"], // points the error to the array field
		},
	);
export type GenReconOrderObjType = z.infer<typeof GenReconOrderObj>;

export type GenReconBodyType = z.infer<typeof GenReconBody>;

export type ReconAggregateData = {
	reconData: GenReconOrderObjType;
	settleData: SettleType;
	orderData: OrderType;
}[];
