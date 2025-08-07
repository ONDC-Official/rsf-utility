import { ENUMS } from "../../constants/enums";
import { ReconType } from "../../schema/models/recon-schema";
import { UserType } from "../../schema/models/user-schema";
import {
	OnReconPayload,
	OnReconPayloadOrders,
	OnReconPayloadSettlement,
} from "../../schema/rsf/zod/on_recon-schema";
import { ReconPayload } from "../../schema/rsf/zod/recon-schema";
import { OnReconAggregateObj } from "../../services/generate-services/generate-on_recon-service";
import { GenOnReconBodyObjectType } from "../../types/generate-recon-types";

export function createOnReconPayload(
	aggregatedData: OnReconAggregateObj[],
	userConfig: UserType,
	reconPayload: ReconPayload,
): OnReconPayload {
	const extraOrders = reconPayload.message.orders.filter((order: any) =>
		[ENUMS.RECON_STATUS.SETTLED, ENUMS.RECON_STATUS.TO_BE_INITIATED].includes(
			order.settlements[0].status,
		),
	);

	const extraOnRecons: OnReconPayloadOrders[] = [];
	for (const order of extraOrders) {
		const obj = {
			...order,
			recon_accord: false,
		};
		obj.settlements[0].updated_at = new Date().toISOString();
		extraOnRecons.push(obj);
	}

	const orders: OnReconPayloadOrders[] = aggregatedData.map((data) => {
		const recon = data.recon;

		const settlementPayload = data.onReconData.recon_accord
			? getAccordResponse(recon, data.onReconData)
			: getNotAccordResponse(recon, data.onReconData);
		return {
			id: recon.order_id,
			amount: {
				currency: "INR",
				value: data.onReconData.recon_accord
					? recon.recon_breakdown.amount?.toFixed(2) || "0.00"
					: data.onReconData.on_recon_data?.settlement_amount?.toFixed(2) ||
						"0.00",
			},
			recon_accord: data.onReconData.recon_accord,
			settlements: [settlementPayload],
		};
	});

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
			bap_id: reconPayload.context.bap_id,
			bap_uri: reconPayload.context.bap_uri,
			bpp_id: reconPayload.context.bpp_id,
			bpp_uri: reconPayload.context.bpp_uri,
			transaction_id: reconPayload.context.transaction_id,
			message_id: reconPayload.context.message_id,
			timestamp: new Date().toISOString(),
			ttl: "P1D",
		},
		message: {
			orders: [...orders, ...extraOnRecons],
		},
	};
}

function getAccordResponse(
	recon: ReconType,
	reconData: GenOnReconBodyObjectType,
): OnReconPayloadSettlement {
	const reconFinData = recon.recon_breakdown;
	if (!reconFinData) {
		throw new Error("recon_data is missing in the settlement data.");
	}
	const due_date = reconData.due_date;
	if (!due_date) {
		throw new Error("due_date is missing in the settlement data.");
	}
	return {
		id: recon.settlement_id,
		status: "PENDING",
		due_date: due_date.toISOString(),
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
	recon: ReconType,
	reconData: GenOnReconBodyObjectType,
): OnReconPayloadSettlement {
	const reconFinData = recon.recon_breakdown;
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
	const obj: OnReconPayloadSettlement = {
		id: recon.settlement_id,
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
	if (recon.payment_id) {
		obj.payment_id = recon.payment_id;
	}
	return obj;
}
