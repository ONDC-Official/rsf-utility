import { z } from "zod";

import { objectIdSchema } from "../../types/user-id-type";
import { TriggerActionSchema } from "../../types/trigger-types";
import { registry } from "../open-api-registry";

// POST /ui/trigger/{userId}/{action}
registry.registerPath({
	method: "post",
	path: "/ui/trigger/{userId}/{action}",
	summary: "Trigger an given action payload to settlement agency",
	request: {
		params: z.object({
			userId: objectIdSchema,
			action: TriggerActionSchema,
		}),
		body: {
			content: {
				"application/json": {
					schema: z.object({
						data: z.any().openapi({ description: "valid ondc rsf payload" }),
					}),
				},
			},
		},
	},
	responses: {
		200: {
			description: "Action triggered successfully.",
			content: {
				"application/json": {
					schema: z.object({
						message: z.string().openapi({ description: "Success message" }),
					}),
				},
			},
		},
	},
});
