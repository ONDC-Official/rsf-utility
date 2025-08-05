import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { ENUMS } from "../../constants/enums";

extendZodWithOpenApi(z);

export const ContextSchema = z
	.object({
		domain: z.string().openapi({
			description: "Domain of the context",
			example: "finance",
		}),
		location: z.object({
			country: z.object({
				code: z.string().openapi({
					description: "Country code",
					example: "IN",
				}),
			}),
			city: z.object({
				code: z.string().openapi({
					description: "City code",
					example: "DEL",
				}),
			}),
		}),
		version: z.string().openapi({
			description: "Version of the context",
			example: "2.0.0",
		}),
		action: z.string().openapi({
			description: "Action to be performed",
			example: "ONDC:NTS10",
		}),
		bap_id: z.string().openapi({
			description: "BAP ID",
			example: "bap123",
		}),
		bap_uri: z.string().openapi({
			description: "BAP URI",
			example: "https://bap.example.com",
		}),
		bpp_id: z.string().openapi({
			description: "BPP ID",
			example: "bpp123",
		}),
		bpp_uri: z.string().openapi({
			description: "BPP URI",
			example: "https://bpp.example.com",
		}),
		transaction_id: z.uuidv4().openapi({
			description: "Unique identifier for the transaction",
			example: "uuiasdfa-1234-5678-90ab-cdef12345678",
		}),
		message_id: z.uuidv4().openapi({
			description: "Unique identifier for the message",
			example: "uuiasdfa-1234-5678-90ab-cdef1werwer",
		}),
		timestamp: z.string().openapi({
			description: "Timestamp of the context",
			example: "2025-08-03T00:00:00.000Z",
		}),
		ttl: z.string().openapi({
			description: "Time to live for the context",
			example: "P1D",
		}),
	})
	.strict()
	.openapi("ContextSchema");

export type RsfContextType = z.infer<typeof ContextSchema>;

export const SettleSchema = z
	.object({
		order_id: z.string().openapi({
			description: "Unique identifier for the order",
			example: "order123",
		}),
		user_id: z.string().openapi({
			description: "Unique identifier for the user config",
			example: "user123",
		}),
		collector_id: z.string().openapi({
			description: "Collector identifier",
			example: "collector123",
		}),
		receiver_id: z.string().openapi({
			description: "Receiver identifier",
			example: "receiver123",
		}),
		settlement_id: z
			.string()
			.openapi({
				description: "Unique identifier for the settlement",
				example: "settlement123",
			})
			.optional(),
		total_order_value: z.number().openapi({
			description: "Total order value",
			example: 1000,
		}),
		commission: z.number().openapi({
			description: "Commission amount",
			example: 50,
		}),
		tax: z.number().openapi({
			description: "Tax amount",
			example: 100,
		}),
		withholding_amount: z.number().openapi({
			description: "Withholding amount",
			example: 200,
		}),
		inter_np_settlement: z.number().openapi({
			description: "Inter NP settlement amount",
			example: 300,
		}),
		provider_id: z.string().openapi({
			description: "Provider identifier",
			example: "provider123",
		}),
		due_date: z.date().openapi({
			description: "Due date for settlement",
			example: "2025-08-03T00:00:00.000Z",
		}),
		settlement_reference: z.string().nullable().optional().openapi({
			description: "Settlement reference",
			example: "reference123",
		}),
		error: z.string().optional().nullable().openapi({
			description: "Error details",
			example: "Error occurred",
		}),
		status: z.enum(Object.values(ENUMS.SETTLEMENT_STATUS)).openapi({
			description: "Settlement status",
			example: "PENDING",
		}),
		type: z.enum(Object.values(ENUMS.SETTLEMENT_TYPE)).openapi({
			description: "Type of settlement",
			example: "NP-NP",
		}),
		context: ContextSchema.optional().nullable().openapi({
			description: "Context information for the settlement",
		}),
	})
	.strict()
	.openapi("SettleSchema");

export type SettleType = z.infer<typeof SettleSchema>;
