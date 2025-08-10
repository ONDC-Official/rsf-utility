import { z } from "zod";

export const envSchema = z.object({
	NODE_ENV: z
		.enum(["development", "production", "test"])
		.default("development"),
	SETTLEMENT_AGENCY_URL: z.url().describe("URL of the settlement agency"),
	SETTLEMENT_AGENCY_ID: z.string().describe("ID of the settlement agency"),
	SETTLEMENT_AGENCY_KEY: z
		.string()
		.describe("API key for the settlement agency"),
	SUBSCRIBER_ID: z.string().describe("ID of the subscriber"),
	SUBSCRIBER_UNIQUE_ID: z.string().describe("Unique ID for the subscriber"),
	SUBSCRIBER_PRIVATE_KEY: z.string().describe("Private key for the subscriber"),
	JWT_SECRET: z.string().describe("JWT Scret Token for signing Client ID"),
	CLIENT_ID: z.string().describe("Client Id for the application"),
});
