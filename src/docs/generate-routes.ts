import { z } from "zod";
import { registry } from "./open-api-registry";
import { objectIdSchema } from "../types/user-id-type";
import {
	GenerateSettlementsBody,
	MiscSettlementSchema,
	NilSettlementSchema,
} from "../types/settle-params";
import { GenReconBody } from "../types/generate-recon-types";

// POST /ui/generate/{userId}/settle/np-np
registry.registerPath({
	method: "post",
	path: "/ui/generate/{userId}/settle/np-np",
	summary: "Generate a NP-NP settlement for a user",
	request: {
		params: z.object({ userId: objectIdSchema }),
		body: {
			content: { "application/json": { schema: GenerateSettlementsBody } },
		},
	},
	responses: {
		200: {
			description: "NP-NP settlement generated successfully.",
			content: {
				"application/json": {
					schema: z.object({
						data: z
							.any()
							.openapi({ description: "valid settle ondc rsf payload" }),
					}),
				},
			},
		},
	},
});

// POST /ui/generate/{userId}/settle/misc
registry.registerPath({
	method: "post",
	path: "/ui/generate/{userId}/settle/misc",
	summary: "Generate a miscellaneous settlement for a user",
	request: {
		params: z.object({ userId: objectIdSchema }),
		body: {
			content: { "application/json": { schema: MiscSettlementSchema } },
		},
	},
	responses: {
		200: {
			description: "Miscellaneous settlement generated successfully.",
			content: {
				"application/json": {
					schema: z.object({
						data: z
							.any()
							.openapi({ description: "valid settle ondc rsf payload" }),
					}),
				},
			},
		},
	},
});

// POST /ui/generate/{userId}/settle/nil
registry.registerPath({
	method: "post",
	path: "/ui/generate/{userId}/settle/nil",
	summary: "Generate a Nil settlement for a user",
	request: {
		params: z.object({ userId: objectIdSchema }),
		body: {
			content: { "application/json": { schema: NilSettlementSchema } },
		},
	},
	responses: {
		200: {
			description: "Nil settlement generated successfully.",
			content: {
				"application/json": {
					schema: z.object({
						data: z
							.any()
							.openapi({ description: "valid settle ondc rsf payload" }),
					}),
				},
			},
		},
	},
});

// POST /ui/generate/{userId}/recon
registry.registerPath({
	method: "post",
	path: "/ui/generate/{userId}/recon",
	summary: "Generate a reconciliation for a user",
	request: {
		params: z.object({ userId: objectIdSchema }),
		body: {
			content: { "application/json": { schema: GenReconBody } },
		},
	},
	responses: {
		200: {
			description: "Reconciliation generated successfully.",
			content: {
				"application/json": {
					schema: z.object({
						data: z
							.any()
							.openapi({ description: "valid settle ondc rsf payload" }),
					}),
				},
			},
		},
	},
});
