import mongoose from "mongoose";

const Quote = new mongoose.Schema({
  total_order_value: { type: Number, required: true },
  breakup: { type: Array, required: true }, // Store entire breakup array as-is
});

const OrderSchema = new mongoose.Schema(
  {
    order_id: { type: String, required: true },
    user_id: { type: String, required: true },
    bap_id: { type: String, required: true },
    bpp_id: { type: String, required: true },
    domain: { type: String, required: true },
    provider_id: { type: String, required: true },
    state: {
      type: String,
      enum: ["Created", "Accepted", "In-Progress", "Completed", "Cancelled"],
      required: true,
    },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
    collected_by: { type: String, required: true },
    settlement_counterparty: { type: String, required: true },
    buyer_finder_fee_amount: { type: Number, required: true },
    buyer_finder_fee_type: { type: String, required: true },
    settlement_basis: { type: String, required: true },
    settlement_window: { type: String, required: true },
    withholding_amount: { type: Number, required: true },
    quote: Quote,
  },
  { timestamps: true }
);

// ✅ Compound unique index on order_id and user_id
OrderSchema.index({ order_id: 1, user_id: 1 }, { unique: true });

export const Order = mongoose.model("Order", OrderSchema);
