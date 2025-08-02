import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

const allowedStatuses = [
	"PREPARED",
	"PENDING",
	"SETTLED",
	"NOT-SETTLED",
] as const;

export const GetSettlementsQuerySchema = z
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
				param: {
					name: "status",
					in: "query",
				},
				description: "Settlement status to filter",
				example: "PENDING",
			})
			.optional(),
		order_id: z
			.string()
			.openapi({
				param: {
					name: "order_id",
					in: "query",
				},
				description: "Filter by order ID",
			})
			.optional(),
		counterparty_id: z
			.string()
			.openapi({
				param: {
					name: "counterparty_id",
					in: "query",
				},
				description: "Filter by counterparty ID",
				example: "example-counterparty-id",
			})
			.optional(),
	})
	.strict()
	.openapi("SettleQueryParams");

export const PrepareSettlementsBody = z
	.object({
		order_ids: z
			.array(z.string())
			.min(1)
			.openapi({
				description: "List of order IDs to prepare settlements for",
				example: ["order1", "order2"],
			}),
	})
	.strict()
	.openapi("PrepareSettlementsBody");
