// file: openapi-spec.ts
import {
	OpenAPIRegistry,
	OpenApiGeneratorV31,
} from "@asteasolutions/zod-to-openapi";

import { z } from "zod";
import { GetSettlementsQuerySchema } from "../types/query-params/settle.query.type";
// Create a registry to collect all our definitions
const registry = new OpenAPIRegistry();

// We must register an actual API path that USES the schema
registry.registerPath({
	method: "get",
	path: "/settlements",
	summary: "Retrieve a list of settlements",
	request: {
		query: GetSettlementsQuerySchema,
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

// Generate the OpenAPI document from the registry
const generator = new OpenApiGeneratorV31(registry.definitions);

export const openApiDocument = generator.generateDocument({
	openapi: "3.1.0",
	info: {
		version: "1.0.0",
		title: "My Settlement API",
		description: "API for managing settlements",
	},
	servers: [{ url: "/api/v1" }],
});
