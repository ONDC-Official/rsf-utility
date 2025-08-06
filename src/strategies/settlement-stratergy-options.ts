// src/strategies/settlement-options.types.ts

import { BreakdownType } from "../schema/models/recon-schema";

// Options needed for the ProfileConfigStrategy
export interface ProfileConfigOptions {
	type: "USER_CONFIG";
	profile: {
		userId: string;
		extraDetails: {
			self: number;
			provider: number;
			inter_np: number;
		};
	};
}

// Options needed for the CsvUploadStrategy
export interface CsvUploadOptions {
	type: "CSV_UPLOAD";
	csvData: string; // The raw CSV content as a string
}

// Options needed for the ReconDataStrategy
export interface ReconDataOptions {
	type: "RECON_DATA";
	data: BreakdownType;
}

// Now, we create a Discriminated Union of all possible option types
export type SettlementStrategyOptions =
	| ProfileConfigOptions
	| CsvUploadOptions
	| ReconDataOptions;
