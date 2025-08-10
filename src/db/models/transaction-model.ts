import mongoose, { Schema, model, Model } from "mongoose";
import { ENUMS } from "../../constants/enums";
import { required } from "zod/v4/core/util.cjs";
import { locationSchema } from "./sub-models/context-model";

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

// Base schema options for the discriminator
const baseOptions = {
	discriminatorKey: "context.action", // The field to determine the schema
	collection: "rsf_transactions", // The name of the MongoDB collection
	timestamps: true, // Add createdAt and updatedAt
};

// Base Recon Transaction Schema
// This contains all the fields that are common to both 'recon' and 'on_recon'
const baseReconSchema = new Schema(
	{
		context: {
			type: {
				domain: {
					type: String,
					required: true,
					enum: ["ONDC:NTS10"],
					index: true,
				},
				location: { type: locationSchema, required: true },
				version: { type: String, required: true, enum: ["2.0.0"] },
				action: {
					type: String,
					required: true,
					enum: ["recon", "on_recon", "settle", "on_settle"],
					index: true,
				},
				bap_id: { type: String, required: true, index: true },
				bap_uri: { type: String, required: true },
				bpp_id: { type: String, required: true, index: true },
				bpp_uri: { type: String, required: true },
				transaction_id: { type: String, required: true, index: true },
				message_id: { type: String, required: true, unique: true, index: true },
				timestamp: { type: String, required: true, index: true },
				ttl: { type: String, required: true },
			},
			required: true,
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
						},
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
						},
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

// Define the specific schema for the 'settle' action's message
const settleMessageSchema = new Schema(
	{
		collector_app_id: { type: String },
		receiver_app_id: { type: String },
		settlement: {
			type: {
				type: String,
				enum: Object.values(ENUMS.SETTLEMENT_TYPE),
				required: true,
			},
			id: { type: String },
			orders: [
				{
					id: { type: String },
					inter_participant: {
						amount: { type: currencySchema, required: true },
					},
					collector: {
						amount: { type: currencySchema, required: true },
					},
					provider: {
						type: new Schema(
							{
								id: { type: String, required: true },
								name: { type: String, required: true },
								bank_details: {
									account_no: { type: String, required: true },
									ifsc_code: { type: String, required: true },
								},
								amount: { type: currencySchema, required: true },
							},
							{ _id: false },
						),
						required: false,
					},
					self: {
						type: new Schema(
							{
								amount: { type: currencySchema, required: true },
							},
							{ _id: false },
						),
						required: false,
					},
				},
			],
		},
	},
	{ _id: false },
);

// Define the specific schema for the 'on_settle' action's message
const onSettleMessageSchema = new Schema(
	{
		collector_app_id: { type: String },
		receiver_app_id: { type: String },
		settlement: {
			type: {
				type: String,
				enum: Object.values(ENUMS.SETTLEMENT_TYPE),
				required: true,
			},
			id: { type: String },
			orders: [
				{
					id: { type: String },
					inter_participant: {
						settled_amount: { type: currencySchema, required: true },
						amount: { type: currencySchema, required: true },
						status: {
							type: String,
							enum: Object.values(ENUMS.REPORT_STATUS),
							required: true,
						},
						error: {
							code: { type: String },
							message: { type: String },
						},
						reference_no: { type: String },
					},
					collector: {
						amount: { type: currencySchema, required: true },
					},
					provider: {
						type: new Schema({
							id: { type: String, required: true },
							name: { type: String },
							amount: { type: currencySchema, required: true },
							status: {
								type: String,
								enum: Object.values(ENUMS.REPORT_STATUS),
								required: true,
							},
							error: {
								code: { type: String },
								message: { type: String },
							},
							reference_no: { type: String },
						}),
						required: false,
					},
					self: {
						type: new Schema({
							amount: { type: currencySchema, required: true },
							status: {
								type: String,
								enum: Object.values(ENUMS.REPORT_STATUS),
								required: true,
							},
							reference_no: { type: String },
							error: {
								code: { type: String },
								message: { type: String },
							},
						}),
						required: false,
					},
				},
			],
		},
	},
	{ _id: false },
);

// Additional indexes for better performance
baseReconSchema.index({
	"context.transaction_id": 1,
	"context.action": 1,
	"context.message_id": 1,
});

// Create the base model from the base schema
const TransactionModel = model("Transaction", baseReconSchema);

// Create the discriminator models for all actions
const ReconModel = TransactionModel.discriminator(
	"recon",
	new Schema({
		message: { type: reconMessageSchema, required: true },
	}),
);

const OnReconModel = TransactionModel.discriminator(
	"on_recon",
	new Schema({
		message: { type: onReconMessageSchema, required: false },
		error: { type: Schema.Types.Mixed, required: false },
	}),
);

const SettleModel = TransactionModel.discriminator(
	"settle",
	new Schema({
		message: { type: settleMessageSchema, required: true },
	}),
);

const OnSettleModel = TransactionModel.discriminator(
	"on_settle",
	new Schema({
		message: { type: onSettleMessageSchema, required: false },
		error: { type: Schema.Types.Mixed, required: false },
	}),
);

export {
	TransactionModel,
	ReconModel,
	OnReconModel,
	SettleModel,
	OnSettleModel,
};
