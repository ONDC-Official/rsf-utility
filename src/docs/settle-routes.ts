import {
	GetSettlementsQuerySchema,
	PrepareSettlementsBody,
} from "../types/settle-params";
import { SettleSchema } from "../schema/models/settle-schema";
import { objectIdSchema } from "../types/user-id-type";
import { z } from "zod";
import { registry } from "./open-api-registry";

// GET /ui/settle/{userId}
registry.registerPath({
	method: "get",
	path: "/ui/settle/{userId}",
	summary: "Retrieve a list of settlements for a user",
	request: {
		query: GetSettlementsQuerySchema,
		params: z.object({ userId: objectIdSchema }),
	},
	responses: {
		200: {
			description: "A list of settlements.",
			content: { "application/json": { schema: SettleSchema.array() } },
		},
	},
});

// POST /ui/settle/{userId}/prepare
registry.registerPath({
	method: "post",
	path: "/ui/settle/{userId}/prepare",
	summary: "Prepare a settlements for a user for given order ids",
	request: {
		params: z.object({ userId: objectIdSchema }),
		body: {
			content: { "application/json": { schema: PrepareSettlementsBody } },
		},
	},
	responses: {
		200: {
			description: "Settlements prepared successfully.",
			content: { "application/json": { schema: SettleSchema.array() } },
		},
	},
});
