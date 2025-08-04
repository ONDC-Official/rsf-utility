import mongoose from "mongoose";
import { ENUMS } from "../../constants/enums";

const Quote = new mongoose.Schema({
	total_order_value: { type: Number, required: true },
	breakup: [
		{
			title: { type: String, required: true },
			price: { type: Number, required: true },
			id: { type: String, required: true },
		},
	],
});

const OrderSchema = new mongoose.Schema(
	{
		order_id: { type: String, unique: true, required: true },
		user_id: { type: String, required: true },
		bap_url: { type: String, required: true },
		bpp_url: { type: String, required: true },
		bap_id: { type: String, required: true },
		bpp_id: { type: String, required: true },
		domain: { type: String, required: true },
		provider_id: { type: String, required: true },
		state: {
			type: String,
			enum: Object.values(ENUMS.ORDER_STATE),
			required: true,
		}, // order state
		created_at: { type: Date, required: true },
		updated_at: { type: Date, required: true },
		collected_by: { type: String, required: true },
		settlement_counterparty: { type: String, required: false },
		buyer_finder_fee_amount: { type: Number, required: true },
		buyer_finder_fee_type: { type: String, required: true },
		settlement_basis: { type: String, required: false },
		settlement_window: { type: String, required: false },
		withholding_amount: { type: Number, required: false },
		settle_status: { type: String, default: false,required: true },
		due_date: { type: Date, required: false },
		quote: { type: Quote, required: true },
	},
	{ timestamps: true },
);

OrderSchema.index({ order_id: 1, user_id: 1 }, { unique: true });

export const Order = mongoose.model("Order", OrderSchema);



