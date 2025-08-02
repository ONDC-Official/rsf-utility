// file: openapi-spec.ts
import {
	OpenAPIRegistry,
	OpenApiGeneratorV31,
} from "@asteasolutions/zod-to-openapi";

import { z } from "zod";
import { GetSettlementsQuerySchema } from "../types/settle-params";
import { UserSchema } from "../schema/models/user-schema";
// Create a registry to collect all our definitions
const registry = new OpenAPIRegistry();

registry.registerPath({
	method: "get",
	path: "/ui/settle/{userId}",
	summary: "Retrieve a list of settlements",
	request: {
		query: GetSettlementsQuerySchema,
		params: z.object({
			userId: z.string().openapi({ description: "The ID of the user config" }),
		}),
	},
	responses: {
		200: {
			description: "A list of settlements.",
			content: {
				"application/json": {
					// Define a schema for the response body
					schema: z.object({
						message: z.string().openapi({ example: "Success!" }),
					}),
				},
			},
		},
	},
});

registry.registerPath({
	method: "get",
	path: "/ui/user/",
	summary: "Retrieve a list of users configs",
	request: {},
	responses: {
		200: {
			description: "A list of user configs.",
			content: {
				"application/json": {
					schema: UserSchema.extend({
						_id: z.string().openapi({ description: "MongoDB Object ID" }),
					}).array(),
				},
			},
		},
	},
});

// Generate the OpenAPI document from the registry
const generator = new OpenApiGeneratorV31(registry.definitions);

export const openApiDocument = generator.generateDocument({
	openapi: "3.1.0",
	info: {
		version: "1.0.0",
		title: "My Settlement API",
		description: "API for managing settlements",
	},
	servers: [{ url: "/" }],
});
