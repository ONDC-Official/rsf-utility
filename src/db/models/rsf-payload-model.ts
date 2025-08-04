import mongoose, { Schema } from "mongoose";
import { ContextSchema } from "./settle-model";

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
	},
	{ timestamps: true },
);

export const RsfPayload = mongoose.model("RsfPayload", RsfPayloadSchema);
