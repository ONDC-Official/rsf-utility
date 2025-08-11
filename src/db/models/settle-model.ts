import mongoose from "mongoose";
import { ENUMS } from "../../constants/enums";
import { round2 } from "./order-model";

const SettleSchema = new mongoose.Schema(
	{
		order_id: { type: String, required: true },
		user_id: { type: String, required: true },
		settlement_id: { type: String, required: true },
		collector_id: { type: String, required: true },
		receiver_id: { type: String, required: true },
		total_order_value: { type: Number, required: true, set: round2 },
		commission: { type: Number, required: true },
		collector_settlement: { type: Number, required: true },
		tds: { type: Number, required: true, set: round2 },
		tcs: { type: Number, required: true, set: round2 },
		withholding_amount: { type: Number, required: true, set: round2 },
		inter_np_settlement: { type: Number, required: true, set: round2 },
		provider_id: { type: String, required: false },
		due_date: { type: Date, required: true },
		type: {
			type: String,
			enum: Object.values(ENUMS.SETTLEMENT_TYPE),
			required: true,
		},
		settlement_reference: { type: String },
		provider_settlement_reference: { type: String },
		self_settlement_reference: { type: String },
		error: { type: String },
		status: {
			type: String,
			required: true,
			enum: Object.values(ENUMS.SETTLEMENT_STATUS),
		},
		provider_status: {
			type: String,
			required: false,
			enum: Object.values(ENUMS.SETTLEMENT_STATUS),
		},
		self_status: {
			type: String,
			required: false,
			enum: Object.values(ENUMS.SETTLEMENT_STATUS),
		},
		transaction_db_ids: { type: [String] },
	},
	{ timestamps: true, strict: false },
);

SettleSchema.index({ user_id: 1, order_id: 1 }, { unique: true }); // Ensure unique settlement per user and order

export const Settle = mongoose.model("Settle", SettleSchema);
