import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

const ProviderDetailsSchema = z
	.object({
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
		tcs: z.number().openapi({
			description: "TCS",
			example: 2.5,
		}),
		tds: z.number().openapi({
			description: "TDS",
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
