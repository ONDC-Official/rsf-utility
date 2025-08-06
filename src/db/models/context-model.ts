import mongoose from "mongoose";

const subLocationSchema = new mongoose.Schema(
	{
		code: { type: String, required: true },
	},
	{ _id: false },
);

const locationSchema = new mongoose.Schema(
	{
		country: {
			type: subLocationSchema,
			required: true,
		},
		city: {
			type: subLocationSchema,
			required: true,
		},
	},
	{ _id: false },
);

export const ContextSchema = new mongoose.Schema(
	{
		domain: { type: String, required: true },
		location: { type: locationSchema, required: true },
		version: { type: String, required: true },
		action: { type: String, required: true },
		bap_id: { type: String, required: true },
		bap_uri: { type: String, required: true },
		bpp_id: { type: String, required: true },
		bpp_uri: { type: String, required: true },
		transaction_id: { type: String, required: true },
		message_id: { type: String, required: true },
		timestamp: { type: String, required: true },
		ttl: { type: String, required: true },
	},
	{ _id: false },
);
