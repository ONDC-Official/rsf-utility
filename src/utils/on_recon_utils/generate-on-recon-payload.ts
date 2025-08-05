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
				const settlementPayload = data.onReconData.recon_accord
					? getAccordResponse(data.settlement)
					: getNotAccordResponse(data.settlement, data.onReconData);
				return {
					id: data.settlement.order_id,
					amount: {
						currency: "INR",
						value: data.onReconData.recon_accord
							? data.settlement.reconInfo.amount?.toFixed(2) || "0.00"
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

function getAccordResponse(settlement: SettleType) {
	return {
		id: settlement.reconInfo.settlement_id,
		status: "PENDING",
		amount: {
			currency: "INR",
			value: settlement.reconInfo.amount?.toFixed(2) || "0.00",
		},
		commission: {
			currency: "INR",
			value: settlement.reconInfo.commission?.toFixed(2) || "0.00",
		},
		withholding_amount: {
			currency: "INR",
			value: settlement.reconInfo.withholding_amount?.toFixed(2) || "0.00",
		},
		tcs: {
			currency: "INR",
			value: settlement.reconInfo.tcs?.toFixed(2) || "0.00",
		},
		tds: {
			currency: "INR",
			value: settlement.reconInfo.tds?.toFixed(2) || "0.00",
		},
		updated_at: new Date().toISOString(),
	};
}

function getNotAccordResponse(
	settlement: SettleType,
	reconData: GenOnReconBodyObjectType,
) {
	if (!reconData.on_recon_data) {
		throw new Error("on_recon_data is missing in the recon data.");
	}
	if (
		!settlement.reconInfo.amount ||
		!settlement.reconInfo.commission ||
		!settlement.reconInfo.withholding_amount ||
		!settlement.reconInfo.tcs ||
		!settlement.reconInfo.tds
	) {
		throw new Error("reconInfo is missing in the settlement data.");
	}

	const diffAmount =
		reconData.on_recon_data.settlement_amount - settlement.reconInfo.amount;
	const diffCommission =
		reconData.on_recon_data.commission_amount - settlement.reconInfo.commission;
	const diffWithholding =
		reconData.on_recon_data.withholding_amount -
		settlement.reconInfo.withholding_amount;
	const diffTCS = reconData.on_recon_data.tcs - settlement.reconInfo.tcs;
	const diffTDS = reconData.on_recon_data.tds - settlement.reconInfo.tds;
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
