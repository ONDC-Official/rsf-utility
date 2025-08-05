import { z } from "zod";
import { registry } from "./open-api-registry";
import { GetRsfPayloadsParams } from "../types/rsf-payloads-params";

// GET /ui/rsf-payloads/
registry.registerPath({
	method: "get",
	path: "/ui/rsf-payloads/",
	summary: "Retrieve a list of RSF payloads",
	request: {
		query: GetRsfPayloadsParams,
	},
	responses: {
		200: {
			description: "A list of RSF payloads.",
			content: {
				"application/json": {
					schema: z.array(
						z.object({
							id: z
								.string()
								.openapi({ description: "Unique identifier for the payload" }),
							type: z.string().openapi({ description: "Type of the payload" }),
							data: z.any().openapi({ description: "Payload data" }),
						}),
					),
				},
			},
		},
	},
});
