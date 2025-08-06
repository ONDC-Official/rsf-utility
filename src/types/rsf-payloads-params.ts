import { z } from "zod";
import { rsfApiList, settleTypes } from "../constants/rsf-constants";

export const GetRsfPayloadsParams = z
	.object({
		page: z.coerce
			.number()
			.positive()
			.optional()
			.default(1)
			.openapi({
				param: {
					name: "page",
					in: "query",
				},
				description: "Page number for pagination",
				example: 1,
			}),
		limit: z.coerce
			.number()
			.positive()
			.optional()
			.default(10)
			.openapi({
				param: {
					name: "limit",
					in: "query",
				},
				description: "Number of items per page",
				example: 10,
			}),
		action: z.enum(rsfApiList).optional(),
		transaction_id: z.uuidv4().optional(),
		message_id: z.string().optional(),
		settlement_type: z.enum(settleTypes).optional(),
		settlement_id: z.string().optional(),
		onlyAck: z.boolean().optional().default(false),
	})
	.strict()
	.openapi("GetRsfPayloadsParams");

export type GetRsfPayloadsParamsType = z.infer<typeof GetRsfPayloadsParams>;

export type RsfPayloadStructure = {
	requestData: any;
	headers: any;
	responseData: {
		body: any;
		statusCode: number;
	};
};

export const RsfActionListSchema = z.enum(rsfApiList);
