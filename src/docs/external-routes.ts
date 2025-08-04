import { registry } from "./open-api-registry";
import { z } from "zod";
// POST /api/:action
registry.registerPath({
	method: "post",
	path: "/api/{action}",
	request: {
		params: z.object({
			action: z
				.string()
				.openapi({ description: "ONDC network action", example: "on_confirm" }),
		}),
		body: {
			content: {
				"application/json": {
					schema: z.object({
						data: z.any().openapi({ description: "valid ondc payload" }),
					}),
				},
			},
		},
	},
	responses: {
		200: {
			description: "Action processed successfully.",
			content: {
				"application/json": {
					schema: z.object({
						message: z.string().openapi({ description: "ACK/NACK response" }),
					}),
				},
			},
		},
	},
});
