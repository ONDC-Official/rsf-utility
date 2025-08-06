import mongoose, { Schema } from "mongoose";
import { ContextSchema } from "./sub-models/context-model";

const RequestSchema = new mongoose.Schema(
	{
		context: { type: ContextSchema, required: true },
		message: { type: Schema.Types.Mixed, required: false },
		error: { type: Schema.Types.Mixed, required: false },
	},
	{
		timestamps: false,
		strict: false,
		_id: false,
	},
);

const ResponseSchema = new mongoose.Schema(
	{
		statusCode: { type: String },
		data: { type: Schema.Types.Mixed },
	},
	{
		timestamps: false,
		strict: false,
		_id: false,
	},
);

const RsfPayloadSchema = new mongoose.Schema(
	{
		request: { type: RequestSchema, required: true },
		response: { type: ResponseSchema, required: true },
		headers: { type: Schema.Types.Mixed, required: false },
	},
	{ timestamps: true, strict: false },
);

// RsfPayloadSchema.index(
// 	{
// 		"request.context.transaction_id": 1,
// 		"request.context.message_id": 1,
// 		"request.context.action": 1,
// 	},
// 	{ unique: true },
// );

export const RsfPayload = mongoose.model("RsfPayload", RsfPayloadSchema);
