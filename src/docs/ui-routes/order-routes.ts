import { OrderSchema } from "../../schema/models/order-schema";
import { GetOrdersQuerySchema, PatchOrderBody } from "../../types/order-params";
import { GetSettlementsQuerySchema } from "../../types/settle-params";
import { objectIdSchema } from "../../types/user-id-type";
import { registry } from "../open-api-registry";
import { z } from "zod";

// GET /ui/orders/{userId}
registry.registerPath({
	method: "get",
	path: "/ui/orders/{userId}",
	summary: "Get orders for a user",
	request: {
		params: z.object({ userId: objectIdSchema }),
		query: GetOrdersQuerySchema,
	},
	responses: {
		200: {
			description: "Orders retrieved successfully.",
			content: {
				"application/json": {
					schema: z.object({
						data: z.array(OrderSchema),
					}),
				},
			},
		},
	},
});

// PATCH /ui/orders/{userId}
registry.registerPath({
	method: "patch",
	path: "/ui/orders/{userId}",
	summary: "Update due dates of orders for a user",
	request: {
		params: z.object({ userId: objectIdSchema }),
		body: {
			content: {
				"application/json": {
					schema: PatchOrderBody,
				},
			},
		},
	},
	responses: {
		200: {
			description: "Orders updated successfully.",
			content: {
				"application/json": {
					schema: z.object({
						data: z.array(OrderSchema),
					}),
				},
			},
		},
	},
});
