import mongoose, { Schema } from "mongoose";
import { ENUMS } from "../../constants/enums";

const BreakdownSchema = new mongoose.Schema(
	{
		amount: { type: Number, required: true },
		commission: { type: Number, required: true },
		withholding_amount: { type: Number, required: true },
		tcs: { type: Number, required: true },
		tds: { type: Number, required: true },
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
			required: true,
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
ReconTableSchema.index({ settlement_id: 1 });
ReconTableSchema.index({ recon_status: 1 });
ReconTableSchema.index({ due_date: 1 });
ReconTableSchema.index({ user_id: 1, recon_status: 1 });
ReconTableSchema.index({ user_id: 1, due_date: 1 });

export const Recon = mongoose.model("Recon", ReconTableSchema);
