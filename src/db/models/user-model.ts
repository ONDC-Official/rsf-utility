import mongoose from "mongoose";
import { title } from "process";

const ProviderDetails = new mongoose.Schema(
	{
		provider_id: { type: String, required: true },
		account_number: { type: String, required: true },
		ifsc_code: { type: String, required: true },
		bank_name: { type: String, required: true },
	},
	{ _id: false },
);

const UserSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		role: {
			type: String,
			enum: ["BAP", "BPP"],
			required: true,
		},
		subscriber_url: { type: String, required: true },
		domain: { type: String, required: true },
		np_tcs: { type: Number, required: true },
		np_tds: { type: Number, required: true },
		pr_tcs: { type: Number, required: false },
		pr_tds: { type: Number, required: false },
		msn: { type: Boolean, required: true },
		provider_details: { type: [ProviderDetails], required: true },
		counterparty_ids: {
			type: [String],
			required: true,
			default: [],
		},
	},
	{ timestamps: true },
);

// Compound index for uniqueness on role + subscriber_id + domain
UserSchema.index({ role: 1, subscriber_url: 1, domain: 1 }, { unique: true });
UserSchema.index({ title: 1 }, { unique: true });
export const User = mongoose.model("User", UserSchema);
