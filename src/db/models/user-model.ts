import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		role: {
			type: String,
			enum: ["BAP", "BPP"],
			required: true,
		},
		subscriber_id: { type: String, required: true },
		domain: { type: String, required: true },
		tcs: { type: String, required: true },
		tds: { type: String, required: true },
		provider_details: [
			{
				provider_id: { type: String, required: true },
				account_number: { type: String, required: true },
				ifsc_code: { type: String, required: true },
				bank_name: { type: String, required: true },
			},
		],
		signing_private_key: { type: String, required: true },
		settlement_agency_url: { type: String, required: true },
		settlement_agency_api_key: { type: String, required: true },
	},
	{ timestamps: true }
);

// Compound index for uniqueness on role + subscriber_id + domain
UserSchema.index({ role: 1, subscriber_id: 1, domain: 1 }, { unique: true });

export const User = mongoose.model("User", UserSchema);
