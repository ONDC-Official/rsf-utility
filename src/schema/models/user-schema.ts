import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

const ProviderDetailsSchema = z
	.object({
		provider_name: z.string().openapi({
			description: "Name of the provider",
			example: "Provider ABC",
		}),
		provider_id: z.string().openapi({
			description: "Provider ID",
			example: "provider123",
		}),
		account_number: z.string().openapi({
			description: "Account number",
			example: "1234567890",
		}),
		ifsc_code: z.string().openapi({
			description: "IFSC code",
			example: "IFSC1234",
		}),
		bank_name: z.string().openapi({
			description: "Bank name",
			example: "Bank ABC",
		}),
	})
	.strict();

export const UserSchema = z
	.object({
		title: z.string().openapi({
			description: "Title of the user",
			example: "Retailer",
		}),
		role: z.enum(["BAP", "BPP"]).openapi({
			description: "Role of the user",
			example: "BAP",
		}),
		subscriber_url: z.url().openapi({
			description: "Subscriber URL",
			example: "https://subscriber.example.com",
		}),
		domain: z.string().openapi({
			description: "Domain",
			example: "retail",
		}),
		np_tcs: z.number().openapi({
			description: "TCS",
			example: 2.5,
		}),
		np_tds: z.number().openapi({
			description: "TDS",
			example: 10,
		}),
		pr_tcs: z.number().optional().nullable().openapi({
			description: "Provider TCS",
			example: 2.5,
		}),
		pr_tds: z.number().optional().nullable().openapi({
			description: "Provider TDS",
			example: 10,
		}),
		msn: z.boolean().openapi({
			description: "MSN flag",
			example: true,
		}),
		provider_details: z.array(ProviderDetailsSchema).optional().openapi({
			description: "Details of providers",
		}),
		counterparty_ids: z
			.array(z.string())
			.optional()
			.default([])
			.openapi({
				description: "List of counterparty IDs",
				example: ["counterparty1", "counterparty2"],
			}),
	})
	.strict()
	.openapi("UserSchema");

export type UserType = z.infer<typeof UserSchema>;
