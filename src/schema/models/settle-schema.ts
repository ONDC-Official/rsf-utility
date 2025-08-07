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

export const SubReconDataSchema = z
	.object({
		recon_status: z.enum(Object.values(ENUMS.INTERNAL_RECON_STATUS)).openapi({
			description: "Status of the reconciliation",
			example: "PENDING",
		}),
		settlement_id: z.string().optional().nullable().openapi({
			description: "Unique identifier for the settlement between NP-NP",
			example: "settlement123",
		}),
		recon_data: z
			.object({
				amount: z.number().optional().nullable().openapi({
					description: "Amount involved in the reconciliation",
					example: 100,
				}),
				commission: z.number().optional().nullable().openapi({
					description: "Commission amount for the reconciliation",
					example: 10,
				}),
				withholding_amount: z.number().optional().nullable().openapi({
					description: "Withholding amount for the reconciliation",
					example: 5,
				}),
				tcs: z.number().optional().nullable().openapi({
					description: "TCS amount for the reconciliation",
					example: 2,
				}),
				tds: z.number().optional().nullable().openapi({
					description: "TDS amount for the reconciliation",
					example: 3,
				}),
			})
			.optional()
			.nullable()
			.openapi({
				description: "Data related to the reconciliation",
			}),
		on_recon_data: z
			.object({
				settlement_amount: z.number().optional().nullable().openapi({
					description: "Settlement amount for the reconciliation",
					example: 1000,
				}),
				commission_amount: z.number().optional().nullable().openapi({
					description: "Commission amount for the reconciliation",
					example: 50,
				}),
				withholding_amount: z.number().optional().nullable().openapi({
					description: "Withholding amount for the reconciliation",
					example: 20,
				}),
				tcs: z.number().optional().nullable().openapi({
					description: "TCS amount for the reconciliation",
					example: 5,
				}),
				tds: z.number().optional().nullable().openapi({
					description: "TDS amount for the reconciliation",
					example: 10,
				}),
				due_date: z.date().optional().nullable().openapi({
					description: "Due date for the reconciliation",
					example: "2025-08-03T00:00:00.000Z",
				}),
			})
			.optional()
			.nullable()
			.openapi({
				description: "Data related to the reconciliation on the provider side",
			}),
		context: ContextSchema.optional().nullable().openapi({
			description: "Context information for the reconciliation",
		}),
	})
	.strict()
	.openapi("SubReconDataSchema");

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
			}),
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
		self_status: z.enum(Object.values(ENUMS.SETTLEMENT_STATUS)).openapi({
			description: "Self Settlement status",
			example: "PENDING",
		}),
		provider_status: z.enum(Object.values(ENUMS.SETTLEMENT_STATUS)).openapi({
			description: "Provider Settlement status",
			example: "PENDING",
		}),
		collector_settlement: z.number().openapi({
			description: "Collector settlement amount",
			example: 300,
		}),
		type: z.enum(Object.values(ENUMS.SETTLEMENT_TYPE)).openapi({
			description: "Type of settlement",
			example: "NP-NP",
		}),
		context: ContextSchema.optional().nullable().openapi({
			description: "Context information for the settlement",
		}),
		reconInfo: SubReconDataSchema.openapi({
			description: "Reconciliation information for the settlement",
			example: {
				recon_status: "PENDING",
				amount: 100,
				commission: 10,
				withholding_amount: 5,
				tcs: 2,
				tds: 3,
			},
		}),
	})
	.strict()
	.openapi("SettleSchema");

export type SettleType = z.infer<typeof SettleSchema>;

export type SubReconDataType = z.infer<typeof SubReconDataSchema>;
