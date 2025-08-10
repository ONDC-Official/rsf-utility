import {
	GetSettlementsQuerySchema,
	PrepareSettlementsBody,
	UpdateSettlementSchema,
} from "../../types/settle-params";
import { SettleSchema } from "../../schema/models/settle-schema";
import { objectIdSchema } from "../../types/user-id-type";
import { z } from "zod";
import { registry } from "../open-api-registry";

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

// PATCH /ui/settle/{userId}
// registry.registerPath({
// 	method: "patch",
// 	path: "/ui/settle/{userId}",
// 	summary: "Update a settlement for a user",
// 	request: {
// 		params: z.object({ userId: objectIdSchema }),
// 		body: {
// 			content: {
// 				"application/json": { schema: UpdateSettlementSchema },
// 				"text/csv": {
// 					schema: {
// 						type: "string",
// 						format: "binary", // Use 'binary' for file uploads
// 					},
// 				},
// 			},
// 		},
// 	},
// 	responses: {
// 		200: {
// 			description: "Settlement updated successfully.",
// 			content: { "application/json": { schema: SettleSchema } },
// 		},
// 	},
// });

registry.registerPath({
	method: "patch",
	path: "/ui/settle/{userId}",
	summary: "Update settlement(s) for a user via JSON or CSV",
	description: `
This endpoint updates settlements for a user and supports two modes based on the \`Content-Type\` header.

**Mode 1: Single Update (Content-Type: application/json)**
- Send a JSON object with the fields you want to update for a single settlement.

**Mode 2: Bulk Update (Content-Type: multipart/form-data)**
- Upload a CSV file with the field name \`csvFile\`.
- Each row in the CSV represents a settlement update.

---
### CSV Format Requirements

- **Required Fields**: \`order_id\`
- **Optional Fields**: \`total_order_value\`, \`withholding_amount\`, \`tds\`, \`tcs\`, \`commission\`, \`collector_settlement\`

#### Example CSV:
\`\`\`csv
order_id,total_order_value,withholding_amount
ORD001,1000.50,100.00
ORD002,2500.75,250.00
\`\`\`
    `,
	request: {
		params: z.object({ userId: objectIdSchema }),
		// The body can now accept one of the following content types
		body: {
			content: {
				// --- OPTION 1: JSON BODY ---
				"application/json": {
					schema: UpdateSettlementSchema,
				},
				// --- OPTION 2: CSV FILE UPLOAD ---
				"multipart/form-data": {
					schema: {
						type: "object",
						properties: {
							csvFile: {
								type: "string",
								format: "binary",
								description: "The CSV file containing settlement updates.",
							},
						},
						required: ["csvFile"],
					},
				},
			},
		},
	},
	responses: {
		200: {
			description:
				"Operation successful. The response format depends on the type of update performed (single or bulk).",
			content: {
				"application/json": {
					// Use 'oneOf' to indicate the response can be one of the following schemas
					schema: SettleSchema,
				},
			},
		},
	},
});
