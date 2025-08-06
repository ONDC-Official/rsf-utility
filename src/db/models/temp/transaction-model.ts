import mongoose, { Schema, model, Model } from "mongoose";
import { ENUMS } from "../../../constants/enums";

// Reusable schema for currency and value objects
const currencySchema = new Schema(
	{
		currency: { type: String, required: true, enum: ["INR"] },
		value: { type: String, required: true },
	},
	{ _id: false },
);

// Reusable schema for settlement currency objects (with optional diff_value)
const currencyWithDiffSchema = new Schema(
	{
		currency: { type: String, required: true, enum: ["INR"] },
		value: { type: String, required: true },
		diff_value: { type: String },
	},
	{ _id: false },
);

// Reusable schema for location
const locationSchema = new Schema(
	{
		country: {
			code: { type: String, required: true, enum: ["IND"] },
		},
		city: {
			code: { type: String, required: true },
		},
	},
	{ _id: false },
);

// Base schema options for the discriminator
const baseOptions = {
	discriminatorKey: "context.action", // The field to determine the schema
	collection: "recon_transactions", // The name of the MongoDB collection
};

// Base Recon Transaction Schema
// This contains all the fields that are common to both 'recon' and 'on_recon'
const baseReconSchema = new Schema(
	{
		context: {
			domain: { type: String, required: true, enum: ["ONDC:NTS10"] },
			location: { type: locationSchema, required: true },
			version: { type: String, required: true, enum: ["2.0.0"] },
			action: { type: String, required: true, enum: ["recon", "on_recon"] },
			bap_id: { type: String, required: true },
			bap_uri: { type: String, required: true },
			bpp_id: { type: String, required: true },
			bpp_uri: { type: String, required: true },
			transaction_id: { type: String, required: true, index: true },
			message_id: { type: String, required: true, unique: true, index: true },
			timestamp: { type: Date, required: true },
			ttl: { type: String },
		},
		message: { type: Schema.Types.Mixed, required: true }, // This will be overridden by discriminators
	},
	baseOptions,
);

// Define the specific schema for the 'recon' action's message
const reconMessageSchema = new Schema(
	{
		orders: [
			{
				id: { type: String, required: true },
				amount: { type: currencySchema, required: true },
				settlements: [
					{
						id: { type: String, required: true },
						payment_id: { type: String, required: true },
						status: {
							type: String,
							required: true,
							enum: Object.values(ENUMS.RECON_STATUS),
						}, // Replace with ENUMS
						amount: { type: currencySchema, required: true },
						commission: { type: currencySchema, required: true },
						withholding_amount: { type: currencySchema, required: true },
						tcs: { type: currencySchema, required: true },
						tds: { type: currencySchema, required: true },
						settlement_ref_no: { type: String },
						updated_at: { type: Date, required: true },
					},
				],
			},
		],
	},
	{ _id: false },
);

// Define the specific schema for the 'on_recon' action's message
const onReconMessageSchema = new Schema(
	{
		orders: [
			{
				id: { type: String, required: true },
				amount: { type: currencySchema, required: true },
				recon_accord: { type: Boolean, required: true },
				settlements: [
					{
						id: { type: String, required: true },
						payment_id: { type: String, required: true },
						status: {
							type: String,
							required: true,
							enum: Object.values(ENUMS.RECON_STATUS),
						}, // Replace with ENUMS
						settlement_ref_no: { type: String },
						amount: { type: currencyWithDiffSchema, required: true },
						commission: { type: currencyWithDiffSchema, required: true },
						withholding_amount: {
							type: currencyWithDiffSchema,
							required: true,
						},
						tcs: { type: currencyWithDiffSchema, required: true },
						tds: { type: currencyWithDiffSchema, required: true },
						updated_at: { type: Date, required: true },
					},
				],
			},
		],
	},
	{ _id: false },
);

// Create the base model from the base schema
const ReconTransactionModel = model("ReconTransaction", baseReconSchema);

// Create the discriminator models. Mongoose will use these schemas
// when the 'context.action' field matches the provided string.
const ReconModel = ReconTransactionModel.discriminator(
	"recon",
	new Schema({
		message: { type: reconMessageSchema, required: true },
	}),
);

const OnReconModel = ReconTransactionModel.discriminator(
	"on_recon",
	new Schema({
		message: { type: onReconMessageSchema, required: true },
	}),
);

export { ReconTransactionModel, ReconModel, OnReconModel };
