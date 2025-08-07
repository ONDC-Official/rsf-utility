import { GetReconsQuerySchema } from "../../types/recon-params";
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
					schema: {
						type: "array",
						items: {
							$ref: "#/components/schemas/Recon",
						},
					},
				},
			},
		},
	},
});
