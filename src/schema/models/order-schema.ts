import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

const QuoteSchema = z.object({
	total_order_value: z.number().openapi({
		description: "Total order value",
		example: 1000,
	}),
	breakup: z
		.array(
			z.object({
				title: z.string().openapi({
					description: "Title of the item",
					example: "Item A",
				}),
				price: z.number().openapi({
					description: "Price of the item",
					example: 100,
				}),
				id: z.string().openapi({
					description: "ID of the item",
					example: "item123",
				}),
			})
		)
		.openapi({
			description: "Breakup of the order",
		}),
});

export const OrderSchema = z
	.object({
		order_id: z.string().openapi({
			description: "Unique identifier for the order",
			example: "order123",
		}),
		user_id: z.string().openapi({
			description: "Unique identifier for the user",
			example: "user123",
		}),
		bap_id: z.string().openapi({
			description: "BAP identifier",
			example: "bap123",
		}),
		bpp_id: z.string().openapi({
			description: "BPP identifier",
			example: "bpp123",
		}),
		domain: z.string().openapi({
			description: "Domain of the order",
			example: "retail",
		}),
		provider_id: z.string().openapi({
			description: "Provider identifier",
			example: "provider123",
		}),
		state: z
			.enum(["Created", "Accepted", "In-Progress", "Completed", "Cancelled"])
			.openapi({
				description: "State of the order",
				example: "Created",
			}),
		created_at: z.date().openapi({
			description: "Creation date of the order",
			example: "2025-08-03T00:00:00.000Z",
		}),
		updated_at: z.date().openapi({
			description: "Last update date of the order",
			example: "2025-08-03T00:00:00.000Z",
		}),
		collected_by: z.enum(["BAP", "BPP"]).openapi({
			description: "Collector identifier",
			example: "BAP",
		}),
		settlement_counterparty: z.string().openapi({
			description: "Settlement counterparty",
			example: "counterparty123",
		}),
		buyer_finder_fee_amount: z.number().openapi({
			description: "Buyer finder fee amount",
			example: 50,
		}),
		buyer_finder_fee_type: z.string().openapi({
			description: "Buyer finder fee type",
			example: "percentage",
		}),
		settlement_basis: z.string().openapi({
			description: "Settlement basis",
			example: "basis123",
		}),
		settlement_window: z.string().openapi({
			description: "Settlement window",
			example: "window123",
		}),
		withholding_amount: z.number().openapi({
			description: "Withholding amount",
			example: 100,
		}),
		quote: QuoteSchema.openapi({
			description: "Quote details",
		}),
	})
	.strict()
	.openapi("OrderSchema");

export type OrderType = z.infer<typeof OrderSchema>;
