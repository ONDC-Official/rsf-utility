export const UserAjvSchema = {
	type: "object",
	required: [
		"role",
		"subscriber_id",
		"domain",
		"tcs",
		"tds",
		"msn",
		"provider_details",
		"signing_private_key",
		"settlement_agency_url",
		"settlement_agency_api_key",
		"settlement_agency_id",
	],
	properties: {
		role: {
			type: "string",
			enum: ["BAP", "BPP"],
		},
		subscriber_id: {
			type: "string",
		},
		domain: {
			type: "string",
		},
		tcs: {
			type: "string",
		},
		tds: {
			type: "string",
		},
		msn: {
			type: "boolean",
		},
		provider_details: {
			type: "array",
			items: {
				type: "object",
				required: ["provider_id", "account_number", "ifsc_code", "bank_name"],
				properties: {
					provider_id: { type: "string" },
					account_number: { type: "string" },
					ifsc_code: { type: "string" },
					bank_name: { type: "string" },
				},
				additionalProperties: false,
			},
		},
		signing_private_key: {
			type: "string",
		},
		settlement_agency_url: {
			type: "string",
			format: "uri",
		},
		settlement_agency_api_key: {
			type: "string",
		},
		settlement_agency_id: {
			type: "string",
		},
	},
	additionalProperties: false,
};
