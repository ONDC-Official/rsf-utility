import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { APPLICABILITY_VALUES } from "../../constants/enums";
import { count } from "console";

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
		tcs_applicability: z.enum(Object.values(APPLICABILITY_VALUES)).openapi({
			description: "TCS applicability",
			example: "BOTH",
		}),
		tds_applicability: z.enum(Object.values(APPLICABILITY_VALUES)).openapi({
			description: "TDS applicability",
			example: "BOTH",
		}),
		msn: z.boolean().openapi({
			description: "MSN flag",
			example: true,
		}),
		provider_details: z.array(ProviderDetailsSchema).optional().openapi({
			description: "Details of providers",
		}),
		counterparty_infos: z
			.array(
				z.object({
					id: z.string().openapi({
						description: "Counterparty ID",
						example: "counterparty123",
					}),
					nickName: z.string().openapi({
						description: "Counterparty name",
						example: "Counterparty ABC",
					}),
				}),
			)
			.openapi({
				description: "List of counterparty information",
				example: [
					{ id: "counterparty123", name: "Counterparty ABC" },
					{ id: "counterparty456", name: "Counterparty XYZ" },
				],
			}),
		counterparty_ids: z
			.array(z.string())
			.optional()
			.nullable()
			.openapi({
				description:
					"DEPRECATED: List of counterparty IDs, USE counterparty_infos instead",
				example: ["counterparty123", "counterparty456"],
			}),
	})
	.strict()
	.openapi("UserSchema");

export type UserType = z.infer<typeof UserSchema>;
