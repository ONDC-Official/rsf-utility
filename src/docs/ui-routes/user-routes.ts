import { z } from "zod";

import { UserSchema } from "../../schema/models/user-schema";
import { objectIdSchema } from "../../types/user-id-type";
import { registry } from "../open-api-registry";

// GET /ui/users/
registry.registerPath({
	method: "get",
	path: "/ui/users/",
	summary: "Retrieve a list of users configs",
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

// POST /ui/users/
registry.registerPath({
	method: "post",
	path: "/ui/users/",
	summary: "Create a new user config",
	request: {
		body: { content: { "application/json": { schema: UserSchema } } },
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

// PATCH /ui/users/{userId}
registry.registerPath({
	method: "patch",
	path: "/ui/users/{userId}",
	summary: "Update a user config",
	request: {
		params: z.object({ userId: objectIdSchema }),
		body: {
			content: { "application/json": { schema: UserSchema.partial() } },
		},
	},
	responses: {
		200: {
			description: "User config updated successfully.",
			content: { "application/json": { schema: UserSchema } },
		},
	},
});

// DELETE /ui/users/{userId}
registry.registerPath({
	method: "delete",
	path: "/ui/users/{userId}",
	summary: "Delete a user config",
	request: {
		params: z.object({ userId: objectIdSchema }),
	},
	responses: {
		204: {
			description: "User config deleted successfully.",
		},
	},
});
