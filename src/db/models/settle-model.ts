import mongoose from "mongoose";

const SettleSchema = new mongoose.Schema(
	{
		order_id: { type: String, required: true },
		user_id: { type: String, required: true },
		collector_id: { type: String, required: true },
		receiver_id: { type: String, required: true },
		total_order_value: { type: Number, required: true },
		commission: { type: Number, required: true },
		tax: { type: Number, required: true },
		withholding_amount: { type: Number, required: true },
		inter_np_settlement: { type: Number, required: true },
		provider_id: { type: String, required: true },
		due_date: { type: Date, required: true },
		settlement_reference: { type: String },
		error: { type: String },
		status: {
			type: String,
			required: true,
			enum: ["PREPARED", "PENDING", "SETTLED", "NOT-SETTLED"],
		}, // settlement status PENDING, SETTLED, NOT-SETTLED
	},
	{ timestamps: true }
);

export const Settle = mongoose.model("Settle", SettleSchema);
