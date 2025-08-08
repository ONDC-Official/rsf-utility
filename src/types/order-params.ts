import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { ENUMS } from "../constants/enums";

extendZodWithOpenApi(z);

const allowedStatuses = Object.values(ENUMS.ORDER_STATE);

const allowedSettlementStatuses = Object.values(
	ENUMS.INTERNAL_ORDER_SETTLE_STATUS,
);

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

		state: z
			.preprocess(
				(val) => (Array.isArray(val) ? val : [val]),
				z.array(z.enum(allowedStatuses)).min(1),
			)
			.openapi({
				description: "Settlement state to filter",
				example: "PENDING",
			})
			.optional(),
		settle_status: z
			.preprocess(
				(val) => (Array.isArray(val) ? val : [val]),
				z.array(z.enum(allowedSettlementStatuses)).min(1),
			)
			.openapi({
				description: "Order status to filter",
				example: false,
			})
			.optional(),
		counterparty_id: z
			.string()
			.openapi({
				description: "Counterparty ID to filter orders",
				example: "counterparty123",
			})
			.optional(),
	})
	.strict();

export const PatchOrderBody = z
	.array(
		z.object({
			order_id: z.string(),
			due_date: z.date(), // or z.coerce.date() if you want strict date parsing
		}),
	)
	.min(1)
	.max(1000)
	.openapi("PatchOrderBody");
export type PatchOrderBodyType = z.infer<typeof PatchOrderBody>;
export type GetOrderParamsType = {
	page: number;
	limit: number;
	state?: string[];
	settle_status?: string[];
	counterparty_id?: string;
};
