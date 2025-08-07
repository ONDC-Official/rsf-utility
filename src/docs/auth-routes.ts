import { registry } from "./open-api-registry";
import { z } from "zod";

const TokenRequestSchema = z
	.object({
		client_id: z.string().min(1, "client_id is required").openapi({
			description: "client_id for the client making the request",
			example: "client-id-123",
		}),
		expires: z
			.string()
			.regex(/^\d+(ms|s|m|h|d|w|y)$/i, {
				message: "Invalid expires format. Use durations like '10s', '5m', '3d'",
			})
			.optional()
			.default("7d")
			.openapi({
				description:
					"Expiration duration for the token (e.g., '3d', '15m', '1h')",
				example: "7d",
			}),
	})
	.strict();

// Define the response schema
const TokenResponseSchema = z
	.object({
		success: z.boolean().openapi({
			description: "Indicates if the request was successful",
			example: true,
		}),
		data: z.object({
			token: z.string().openapi({
				description: "The signed JWT token",
				example:
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiJjbGllbnQtaWQtMTIzNDUiLCJpYXQiOjE3NTQ1NjYwNTQsImV4cCI6MTcyNTI1NH0.R75MVzdx-TbfSxGHuKGp7hK5DjxBI7vO",
			}),
		}),
		message: z.string().openapi({
			description: "Human-readable message about the result",
			example: "Token issued successfully",
		}),
	})
	.strict();

// Register the path
registry.registerPath({
	method: "post",
	path: "/ui/auth/sign-token",
	description: "Signs and returns a JWT token for a given client.",
	request: {
		body: {
			content: { "application/json": { schema: TokenRequestSchema } },
		},
	},
	responses: {
		200: {
			description: "Token successfully signed and returned",
			content: {
				"application/json": {
					schema: TokenResponseSchema,
				},
			},
		},
		400: {
			description: "Invalid request format",
		},
	},
});
