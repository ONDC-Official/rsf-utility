import {
	GetReconsQuerySchema,
	MoveReconsBodySchema,
} from "../../types/recon-params";
import { objectIdSchema } from "../../types/user-id-type";
import { registry } from "../open-api-registry";
import { z } from "zod";
// GET ui/recon/{userId}
registry.registerPath({
	method: "get",
	path: "/ui/recon/{userId}",
	description: "Get reconciliation records for a user",
	summary: "Get Reconciliation Records",
	request: {
		params: z.object({ userId: objectIdSchema }),
		query: GetReconsQuerySchema,
	},
	responses: {
		200: {
			description: "List of reconciliation records",
			content: {
				"application/json": {
					schema: z.array(z.any()).openapi({
						description: "An array of reconciliation records for the user",
					}),
				},
			},
		},
	},
});

// POST ui/recon/{userId}/move-to-ready
registry.registerPath({
	method: "post",
	path: "/ui/recon/{userId}/move-to-ready",
	description: "Move reconciliation records to ready state",
	summary: "Move Reconciliation Records to Ready",
	request: {
		params: z.object({ userId: objectIdSchema }),
		body: {
			content: {
				"application/json": {
					schema: MoveReconsBodySchema,
				},
			},
			required: true,
		},
	},
	responses: {
		200: {
			description: "Reconciliation records moved to ready state",
			content: {
				"application/json": {
					schema: z.any().openapi({
						description: "Success message",
					}),
				},
			},
		},
	},
});
