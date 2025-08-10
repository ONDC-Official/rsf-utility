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
				z.array(z.enum(allowedStatuses)),
			)
			.openapi({
				description: "Settlement state to filter",
				example: "PENDING",
			})
			.optional(),
		settle_status: z
			.preprocess(
				(val) => (Array.isArray(val) ? val : [val]),
				z.array(z.enum(allowedSettlementStatuses)),
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
		due_date_from: z.coerce
			.string()
			.regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
			.transform((str) => new Date(str))
			.openapi({
				param: {
					name: "due_date_from",
					in: "query",
				},
				description: "Filter orders due from this date (YYYY-MM-DD)",
				example: "2025-08-01",
			})
			.optional(),
		due_date_to: z.coerce
			.string()
			.regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
			.transform((str) => new Date(str))
			.openapi({
				param: {
					name: "due_date_to",
					in: "query",
				},
				description: "Filter orders due to this date",
				example: "2023-12-31",
			})
			.optional(),
	})
	.strict();

export const PatchOrderBody = z
	.array(
		z.object({
			order_id: z.string(),
			due_date: z.coerce.date(), // or z.coerce.date() if you want strict date parsing
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
	due_date_from?: Date;
	due_date_to?: Date;
};
