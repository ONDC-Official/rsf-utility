import mongoose, { Schema } from "mongoose";
import { ENUMS } from "../../constants/enums";
import { round2 } from "./order-model";

const BreakdownSchema = new mongoose.Schema(
	{
		amount: { type: Number, required: true, set: round2 },
		commission: { type: Number, required: true, set: round2 },
		withholding_amount: { type: Number, required: true, set: round2 },
		tcs: { type: Number, required: true, set: round2 },
		tds: { type: Number, required: true, set: round2 },
	},
	{ _id: false },
);

const ReconTableSchema = new mongoose.Schema(
	{
		user_id: {
			type: String,
			required: true,
			index: true,
		},
		order_id: {
			type: String,
			required: true,
			index: true,
		},
		collector_id: {
			type: String,
			required: true,
		},
		receiver_id: {
			type: String,
			required: true,
		},
		recon_status: {
			type: String,
			enum: Object.values(ENUMS.INTERNAL_RECON_STATUS),
			required: true,
			index: true,
		},
		settlement_id: {
			type: String,
			required: true,
			index: true,
		},
		payment_id: {
			type: String,
			required: false,
			nullable: true,
			index: true,
		},
		transaction_db_ids: {
			type: [String],
			required: true,
		},
		recon_breakdown: {
			type: BreakdownSchema,
			required: true,
		},
		on_recon_breakdown: {
			type: BreakdownSchema,
			required: false,
		},
		on_recon_error: {
			type: Schema.Types.Mixed,
			required: false,
		},
		due_date: {
			type: Date,
			required: false,
			index: true,
		},
	},
	{
		timestamps: true,
		collection: "recon_table",
	},
);

// Indexes for better performance
ReconTableSchema.index({ user_id: 1, order_id: 1 }, { unique: true });

export const Recon = mongoose.model("Recon", ReconTableSchema);
