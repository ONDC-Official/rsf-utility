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
		// subscriber_id: z.string().openapi({
		// 	description: "Subscriber ID",
		// 	example: "subscriber123",
		// }),
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
		provider_details: z.array(ProviderDetailsSchema).openapi({
			description: "Details of providers",
		}),
		// signing_private_key: z.string().openapi({
		// 	description: "Signing private key",
		// 	example: "privateKey123",
		// }),
		// subscriber_unique_key_id: z.string().openapi({
		// 	description: "Unique Key ID or uKid",
		// 	example: "ukid123",
		// }),
		// settlement_agency_url: z.url().openapi({
		// 	description: "Settlement agency URL",
		// 	example: "https://settlement-agency.com",
		// }),
		// settlement_agency_api_key: z.string().openapi({
		// 	description: "Settlement agency API key",
		// 	example: "apiKey123",
		// }),
		// settlement_agency_id: z.string().openapi({
		// 	description: "Settlement agency ID",
		// 	example: "agency123",
		// }),
	})
	.strict()
	.openapi("UserSchema");

export type UserType = z.infer<typeof UserSchema>;
