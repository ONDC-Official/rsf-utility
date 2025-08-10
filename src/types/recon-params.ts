import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { ENUMS } from "../constants/enums";

extendZodWithOpenApi(z);

// Enum values from ENUMS.INTERNAL_RECON_STATUS
const allowedReconStatuses = Object.values(ENUMS.INTERNAL_RECON_STATUS);

const allowedSortFields = [
	"createdAt",
	"updatedAt",
	"due_date",
	"order_id",
	"settlement_id",
	"recon_status",
] as const;

export const GetReconsQuerySchema = z
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
			.max(100)
			.openapi({
				param: {
					name: "limit",
					in: "query",
				},
				description: "Number of items per page (max 100)",
				example: 10,
			})
			.optional(),

		order_id: z
			.string()
			.trim()
			.min(1)
			.openapi({
				param: {
					name: "order_id",
					in: "query",
				},
				description: "Filter by order ID",
				example: "order123",
			})
			.optional(),

		settlement_id: z
			.string()
			.trim()
			.min(1)
			.openapi({
				param: {
					name: "settlement_id",
					in: "query",
				},
				description: "Filter by settlement ID",
				example: "settlement123",
			})
			.optional(),

		recon_status: z
			.preprocess(
				(val) => (Array.isArray(val) ? val : [val]),
				z.array(z.enum(allowedReconStatuses)),
			)
			.openapi({
				param: {
					name: "recon_status",
					in: "query",
				},
				description: "Filter by recon status",
				example: "SENT_PENDING",
			})
			.optional(),

		due_date_from: z
			.string()
			.regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
			.transform((str) => new Date(str))
			.openapi({
				param: {
					name: "due_date_from",
					in: "query",
				},
				description: "Filter recons due from this date (YYYY-MM-DD)",
				example: "2025-08-01",
			})
			.optional(),

		due_date_to: z
			.string()
			.regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
			.transform((str) => new Date(str))
			.openapi({
				param: {
					name: "due_date_to",
					in: "query",
				},
				description: "Filter recons due until this date (YYYY-MM-DD)",
				example: "2025-08-31",
			})
			.optional(),

		sort_by: z
			.enum(allowedSortFields)
			.openapi({
				param: {
					name: "sort_by",
					in: "query",
				},
				description: "Sort by field",
				example: "createdAt",
			})
			.optional(),

		sort_order: z
			.enum(["asc", "desc"])
			.openapi({
				param: {
					name: "sort_order",
					in: "query",
				},
				description: "Sort order",
				example: "desc",
			})
			.optional(),
		group_by_recon: z.coerce.boolean().optional(),
	})
	.strict()
	.refine(
		(data) => {
			if (data.due_date_from && data.due_date_to) {
				return data.due_date_from <= data.due_date_to;
			}
			return true;
		},
		{
			message: "due_date_from must be before or equal to due_date_to",
			path: ["due_date_from"],
		},
	)
	.openapi("GetReconsQueryParams");

export type GetReconsQuery = z.infer<typeof GetReconsQuerySchema>;

export const MoveReconsBodySchema = z.object({
	orders: z
		.array(
			z.object({
				order_id: z.string().openapi({
					description: "Order ID to move to ready state",
					example: "order123",
				}),
			}),
		)
		.openapi({
			description: "List of order IDs to move to ready state",
			example: JSON.stringify({
				orders: [{ order_id: "order123" }, { order_id: "order456" }],
			}),
		}),
});

export type MoveReconsBody = z.infer<typeof MoveReconsBodySchema>;
