import mongoose from "mongoose";
import { ENUMS } from "../../constants/enums";
import { ContextSchema } from "./conetxt-model";

const ReconSchema = new mongoose.Schema(
	{
		recon_status: {
			type: String,
			enum: Object.values(ENUMS.INTERNAL_RECON_STATUS),
			required: true,
		},
		recon_data: {
			type: {
				settlement_id: { type: String, required: false },
				amount: { type: Number, required: false },
				commission: { type: Number, required: false },
				withholding_amount: { type: Number, required: false },
				tcs: { type: Number, required: false },
				tds: { type: Number, required: false },
			},
			required: false,
		},
		on_recon_data: {
			type: {
				settlement_amount: { type: Number, required: false },
				commission_amount: { type: Number, required: false },
				withholding_amount: { type: Number, required: false },
				tcs: { type: Number, required: false },
				tds: { type: Number, required: false },
				due_date: { type: Date, required: false },
			},
			required: false,
		},
		context: { type: ContextSchema, required: false },
	},
	{
		_id: false,
	},
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
		collector_settlement: { type: Number, required: true },
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
			required: true,
			enum: Object.values(ENUMS.SETTLEMENT_STATUS),
		},
		self_status: {
			type: String,
			required: true,
			enum: Object.values(ENUMS.SETTLEMENT_STATUS),
		},
		context: { type: ContextSchema, required: false },
		reconInfo: { type: ReconSchema, required: true },
	},
	{ timestamps: true, strict: false },
);

SettleSchema.index({ user_id: 1, order_id: 1 }, { unique: true }); // Ensure unique settlement per user and order

export const Settle = mongoose.model("Settle", SettleSchema);
