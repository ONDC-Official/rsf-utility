import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { SettleType } from "../schema/models/settle-schema";
import { OrderType } from "../schema/models/order-schema";

extendZodWithOpenApi(z);

export const ReconciliationDetailsSchema = z.object({
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
		description: "TCS amount for the order",
		example: 5,
	}),
});

export type ReconciliationDetailsType = z.infer<
	typeof ReconciliationDetailsSchema
>;

export const GenReconOrderObj = z.object({
	order_id: z.string(),
	recon_data: ReconciliationDetailsSchema.optional(),
});

export const GenReconBody = z
	.object({
		recon_data: z.array(GenReconOrderObj).min(1).max(100).openapi({
			description: "Array of reconciliation order objects",
		}),
	})
	.refine(
		(body) => {
			const allHave = body.recon_data.every((item) => item.recon_data != null);
			const noneHave = body.recon_data.every((item) => item.recon_data == null);
			return allHave || noneHave;
		},
		{
			message: "If one item has recon_data, then all must have it.",
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

// if recon_accord if false then on_recon_data is required
// if recon_accord is true then due_date is required
export const GenOnReconBodyObject = z
	.object({
		order_id: z.string().openapi({
			description: "Unique identifier for the order",
			example: "order123",
		}),
		recon_accord: z.boolean().openapi({
			description: "Indicates if the reconciliation is in accord",
			example: true,
		}),
		due_date: z.coerce.date().optional().openapi({
			description: "Due date for the reconciliation",
			example: "2023-10-01T00:00:00Z",
		}),
		on_recon_data: ReconciliationDetailsSchema.optional().openapi({
			description: "Details of the reconciliation if in accord",
		}),
	})
	.refine((data) => data.recon_accord || data.on_recon_data != null, {
		message: "on_recon_data is required if recon_accord is false",
		path: ["on_recon_data"],
	})
	.refine((data) => !data.recon_accord || data.due_date != null, {
		message: "due_date is required if recon_accord is true",
		path: ["due_date"],
	});

export const GenOnReconBody = z.object({
	on_recon_data: z.array(GenOnReconBodyObject).min(1).openapi({
		description: "Array of on-reconciliation order objects",
	}),
});

export type GenOnReconBodyType = z.infer<typeof GenOnReconBody>;
export type GenOnReconBodyObjectType = z.infer<typeof GenOnReconBodyObject>;
