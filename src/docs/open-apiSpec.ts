// file: openapi-spec.ts
import {
	OpenAPIRegistry,
	OpenApiGeneratorV31,
} from "@asteasolutions/zod-to-openapi";

import { z } from "zod";
import {
	GetSettlementsQuerySchema,
	PrepareSettlementsBody,
} from "../types/settle-params";
import { UserSchema } from "../schema/models/user-schema";
import { SettleSchema } from "../schema/models/settle-schema";
import { objectIdSchema } from "../types/user-id-type";
// Create a registry to collect all our definitions
const registry = new OpenAPIRegistry();

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

registry.registerPath({
	method: "post",
	path: "/ui/user/",
	summary: "Create a new user config",
	request: {
		body: {
			content: {
				"application/json": {
					schema: UserSchema,
				},
			},
		},
	},
	responses: {
		201: {
			description: "User config created successfully.",
			content: {
				"application/json": {
					schema: UserSchema.extend({
						_id: z.string().openapi({ description: "MongoDB Object ID" }),
					}),
				},
			},
		},
	},
});

registry.registerPath({
	method: "patch",
	path: "/ui/user/{userId}",
	summary: "Update a user config",
	request: {
		params: z.object({
			userId: objectIdSchema,
		}),
		body: {
			content: {
				"application/json": {
					schema: UserSchema.partial(),
				},
			},
		},
	},
	responses: {
		200: {
			description: "User config updated successfully.",
			content: {
				"application/json": {
					schema: UserSchema,
				},
			},
		},
	},
});

registry.registerPath({
	method: "get",
	path: "/ui/settle/{userId}",
	summary: "Retrieve a list of settlements for a user",
	request: {
		query: GetSettlementsQuerySchema,
		params: z.object({
			userId: objectIdSchema,
		}),
	},
	responses: {
		200: {
			description: "A list of settlements.",
			content: {
				"application/json": {
					// Define a schema for the response body
					schema: SettleSchema.array(),
				},
			},
		},
	},
});

registry.registerPath({
	method: "post",
	path: "/ui/settle/{userId}/prepare",
	summary: "Prepare a settlements for a user for given order ids",
	request: {
		params: z.object({
			userId: objectIdSchema,
		}),
		body: {
			content: {
				"application/json": {
					schema: PrepareSettlementsBody,
				},
			},
		},
	},
	responses: {
		200: {
			description: "Settlements prepared successfully.",
			content: {
				"application/json": {
					schema: SettleSchema.array(),
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
		title: "ondc-rsf-utility API",
		description: "backend APIs for ondc-rsf-utility",
	},
	servers: [{ url: "/" }],
});
