import mongoose from "mongoose";
import { ENUMS } from "../../constants/enums";

const subLocationSchema = new mongoose.Schema(
	{
		code: { type: String, required: true },
	},
	{ _id: false }
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
	{ _id: false }
);

const ContextSchema = new mongoose.Schema(
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
	{ _id: false }
);

const SettleSchema = new mongoose.Schema(
	{
		order_id: { type: String, required: true },
		user_id: { type: String, required: true },
		settlement_id: { type: String, required: true },
		collector_id: { type: String, required: true },
		receiver_id: { type: String, required: true },
		total_order_value: { type: Number, required: true },
		commission: { type: Number, required: true },
		tax: { type: Number, required: true },
		withholding_amount: { type: Number, required: true },
		inter_np_settlement: { type: Number, required: true },
		provider_id: { type: String, required: true },
		due_date: { type: Date, required: true },
		type: {
			type: String,
			enum: Object.values(ENUMS.SETTLEMENT_TYPE),
			required: true,
		},
		settlement_reference: { type: String },
		error: { type: String },
		status: {
			type: String,
			required: true,
			enum: Object.values(ENUMS.SETTLEMENT_STATUS),
		}, // settlement status PENDING, SETTLED, NOT-SETTLED
		context: { type: ContextSchema, required: false },
	},
	{ timestamps: true }
);

SettleSchema.index({ user_id: 1, order_id: 1 }, { unique: true }); // Ensure unique settlement per user and order

export const Settle = mongoose.model("Settle", SettleSchema);
