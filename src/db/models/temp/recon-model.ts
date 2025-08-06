import mongoose from "mongoose";
import { ENUMS } from "../../../constants/enums";

const BreakdownSchema = new mongoose.Schema({
	type: {
		amount: { type: Number },
		commission: { type: Number },
		withholding_amount: { type: Number },
		tcs: { type: Number },
		tds: { type: Number },
	},
});

const ReconTableSchema = new mongoose.Schema({
	user_id: {
		type: String,
		required: true,
	},
	order_id: {
		type: String,
		required: true,
	},
	recon_status: {
		type: String,
		enum: Object.values(ENUMS.INTERNAL_RECON_STATUS),
		required: true,
	},
	settlement_id: {
		type: String,
		required: true,
	},
	transaction_db_ids: {
		type: [String],
		required: true,
	},
	recon_breakdown: {
		type: BreakdownSchema,
	},
	on_recon_breakdown: {
		type: BreakdownSchema,
		required: false,
	},
	due_date: {
		type: Date,
		required: true,
	},
});

ReconTableSchema.index({ user_id: 1, order_id: 1 }, { unique: true });
