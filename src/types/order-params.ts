import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

const allowedStatuses = ["In-progress", "Completed"] as const;

const allowedSettlementStatuses = ["true", "false"] as const;

export const GetOrdersQuerySchema = z
	.object({
		page: z.coerce
			.number()
			.positive()
			.openapi({
				param: {
					name: "page",
					in: "query",
				},
				description: "Page number for pagination",
				example: 1,
			})
			.optional(),

		limit: z.coerce
			.number()
			.positive()
			.openapi({
				param: {
					name: "limit",
					in: "query",
				},
				description: "Number of items per page",
				example: "10",
			})
			.optional(),

		status: z
			.enum(allowedStatuses)
			.openapi({
				description: "Settlement status to filter",
				example: "PENDING",
			})
			.optional(),
		settle_status: z
			.enum(allowedSettlementStatuses)
			.openapi({
				description: "Order status to filter",
				example: false,
			})
			.optional(),
		is_completed: z
			.string()
			.optional()
			.transform((val) => val === "true")
			.openapi({
				description: "Check for completed orders",
				example: false,
			})
			.optional()
			.default(false),
	})
	.strict();

export type GetOrderParamsType = {
	page: number;
	limit: number;
	status?: string;
	settle_status?: string;
	is_completed?: boolean;
};
