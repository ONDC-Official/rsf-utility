import { SettleType } from "../../schema/models/settle-schema";
import { UserType } from "../../schema/models/user-schema";
import { OnReconAggregateObj } from "../../services/generate-services/generate-on_recon-service";
import { GenOnReconBodyObjectType } from "../../types/generate-recon-types";

export function createOnReconPayload(
	aggregatedData: OnReconAggregateObj[],
	userConfig: UserType,
) {
	const firstData = aggregatedData[0];
	const reconContext = firstData.settlement.reconInfo.context;
	if (!reconContext) {
		throw new Error("Recon context is missing in the settlement data.");
	}

	return {
		context: {
			domain: "ONDC:NTS10",
			location: {
				country: {
					code: "IND",
				},
				city: {
					code: "*",
				},
			},
			version: "2.0.0",
			action: "on_recon",
			bap_id: reconContext.bap_id,
			bap_uri: reconContext.bap_uri,
			bpp_id: reconContext.bpp_id,
			bpp_uri: reconContext.bpp_uri,
			transaction_id: reconContext.transaction_id,
			message_id: reconContext.message_id,
			timestamp: new Date().toISOString(),
			ttl: "P1D",
		},
		message: {
			orders: aggregatedData.map((data) => {
				const settlement = data.settlement;
				if (
					!settlement.reconInfo ||
					!settlement.reconInfo.settlement_id ||
					!settlement.reconInfo.recon_data
				) {
					throw new Error("Settlement ID is missing in the settlement data.");
				}
				const settlementPayload = data.onReconData.recon_accord
					? getAccordResponse(data.settlement, data.onReconData)
					: getNotAccordResponse(data.settlement, data.onReconData);
				return {
					id: data.settlement.order_id,
					amount: {
						currency: "INR",
						value: data.onReconData.recon_accord
							? settlement.reconInfo.recon_data.amount?.toFixed(2) || "0.00"
							: data.onReconData.on_recon_data?.settlement_amount?.toFixed(2) ||
								"0.00",
					},
					recon_accord: data.onReconData.recon_accord,
					settlements: [settlementPayload],
				};
			}),
		},
	};
}

function getAccordResponse(
	settlement: SettleType,
	reconData: GenOnReconBodyObjectType,
) {
	const reconFinData = settlement.reconInfo.recon_data;
	if (!reconFinData) {
		throw new Error("recon_data is missing in the settlement data.");
	}
	return {
		id: settlement.reconInfo.settlement_id,
		status: "PENDING",
		due_date: reconData.due_date,
		amount: {
			currency: "INR",
			value: reconFinData.amount?.toFixed(2) || "0.00",
		},
		commission: {
			currency: "INR",
			value: reconFinData.commission?.toFixed(2) || "0.00",
		},
		withholding_amount: {
			currency: "INR",
			value: reconFinData.withholding_amount?.toFixed(2) || "0.00",
		},
		tcs: {
			currency: "INR",
			value: reconFinData.tcs?.toFixed(2) || "0.00",
		},
		tds: {
			currency: "INR",
			value: reconFinData.tds?.toFixed(2) || "0.00",
		},
		updated_at: new Date().toISOString(),
	};
}

function getNotAccordResponse(
	settlement: SettleType,
	reconData: GenOnReconBodyObjectType,
) {
	const reconFinData = settlement.reconInfo.recon_data;
	if (!reconData.on_recon_data) {
		throw new Error("on_recon_data is missing in the recon data.");
	}
	if (!reconFinData) {
		throw new Error("recon_data is missing in the settlement data.");
	}
	if (
		!reconFinData.amount ||
		!reconFinData.commission ||
		!reconFinData.withholding_amount ||
		!reconFinData.tcs ||
		!reconFinData.tds
	) {
		throw new Error("reconInfo is missing in the settlement data.");
	}

	const diffAmount =
		reconData.on_recon_data.settlement_amount - reconFinData.amount;
	const diffCommission =
		reconData.on_recon_data.commission_amount - reconFinData.commission;
	const diffWithholding =
		reconData.on_recon_data.withholding_amount -
		reconFinData.withholding_amount;
	const diffTCS = reconData.on_recon_data.tcs - reconFinData.tcs;
	const diffTDS = reconData.on_recon_data.tds - reconFinData.tds;
	return {
		id: settlement.reconInfo.settlement_id,
		status: "PENDING",
		amount: {
			currency: "INR",
			value: reconData.on_recon_data.settlement_amount.toFixed(2),
			diff_value: diffAmount.toFixed(2),
		},
		commission: {
			currency: "INR",
			value: reconData.on_recon_data.commission_amount.toFixed(2),
			diff_value: diffCommission.toFixed(2),
		},
		withholding_amount: {
			currency: "INR",
			value: reconData.on_recon_data.withholding_amount.toFixed(2),
			diff_value: diffWithholding.toFixed(2),
		},
		tcs: {
			currency: "INR",
			value: reconData.on_recon_data.tcs.toFixed(2),
			diff_value: diffTCS.toFixed(2),
		},
		tds: {
			currency: "INR",
			value: reconData.on_recon_data.tds.toFixed(2),
			diff_value: diffTDS.toFixed(2),
		},
		updated_at: new Date().toISOString(),
	};
}
