import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

const allowedStatuses = [
	"PREPARED",
	"PENDING",
	"SETTLED",
	"NOT_SETTLED",
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
		order_id: z
			.string()
			.openapi({
				param: {
					name: "order_id",
					in: "query",
				},
				description: "Filter by specific order ID",
				example: "order123",
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
			.preprocess(
				(val) => (Array.isArray(val) ? val : [val]),
				z.array(z.enum(allowedStatuses)).min(1),
			)
			.openapi({
				param: {
					name: "status",
					in: "query",
					style: "form", // Good practice to specify style for array params
					explode: true, // Allows for ?status=A&status=B format
				},
				description:
					"Settlement status to filter. Can be provided multiple times.",
				example: "PENDING", // Example can remain a single value
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
		due_date_from: z.coerce
			.string()
			.regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
			.transform((str) => new Date(str))
			.openapi({
				param: {
					name: "due_date_from",
					in: "query",
				},
				description: "Filter settlements due from this date (YYYY-MM-DD)",
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
				description: "Filter settlements due to this date",
				example: "2023-12-31",
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
			.max(1000)
			.openapi({
				description: "List of order IDs to prepare settlements for",
				example: ["order1", "order2"],
			}),
	})
	.strict()
	.openapi("PrepareSettlementsBody");

export const GenSettlementsBodyObject = z.object({
	order_id: z.string().openapi({
		description: "Order ID for the settlement",
		example: "order123",
	}),
	provider_value: z
		.number()
		.min(0)
		.positive()
		.openapi({
			description: "settlment value for the provider in the settlement",
			example: 800.0,
		})
		.optional(),
	self_value: z
		.number()
		.min(0)
		.positive()
		.openapi({
			description: "Self value in the settlement",
			example: 200.0,
		})
		.optional(),
});

export const GenerateSettlementsBody = z
	.object({
		settle_data: z
			.array(GenSettlementsBodyObject)
			.min(1)
			.max(100)
			.openapi({
				description: "List of settlements data to generate settlements for",
				example: [
					{ order_id: "order123", provider_value: 800.0, self_value: 200.0 },
				],
			}),
	})
	.strict()
	.openapi("GenerateSettlementsBody");

//For Misc Settlement

export const AmountSchema = z.object({
	currency: z.string().openapi({ example: "INR" }),
	value: z
		.string()
		.regex(/^\d+(\.\d{1,2})?$/)
		.openapi({ example: "800.00" }),
});

// Provider schema
export const ProviderSchema = z
	.object({
		id: z.string().openapi({ example: "prvdr-id-789" }),
		name: z.string().openapi({ example: "Kirana Pvt Ltd" }),
		bank_details: z.object({
			account_no: z.string().openapi({ example: "1234567890" }),
			ifsc_code: z.string().openapi({ example: "IFSC0001" }),
		}),
		amount: AmountSchema,
	})
	.openapi({ description: "Details of the provider receiving the settlement" });

// Self Schema
export const SelfSchema = z
	.object({
		amount: AmountSchema,
	})
	.openapi({ description: "Settlement amount for Self" });

export const MiscSettlementSchema = z
	.object({
		provider: ProviderSchema.optional(),
		self: SelfSchema.optional(),
	})
	.strict()
	.openapi({
		description: "Miscellaneous settlement payload structure",
	});

export const NilSettlementSchema = z
	.object({
		type: z.literal("NIL"),
	})
	.strict()
	.openapi({
		description: "Miscellaneous settlement payload structure",
	});
