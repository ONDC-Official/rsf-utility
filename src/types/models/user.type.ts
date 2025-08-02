export interface ProviderDetails {
	provider_id: string;
	account_number: string;
	ifsc_code: string;
	bank_name: string;
}

export interface UserType {
	role: "BAP" | "BPP";
	subscriber_id: string;
	domain: string;
	tcs: string;
	tds: string;
	msn: boolean;
	provider_details: ProviderDetails[];
	signing_private_key: string;
	settlement_agency_url: string;
	settlement_agency_id: string;
	settlement_agency_api_key: string;
	createdAt?: Date;
	updatedAt?: Date;
}
