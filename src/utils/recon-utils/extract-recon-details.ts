import { SubReconDataType } from "../../schema/models/settle-schema";

export const extractReconDetails = (
	settlement: any,
	reconPayload: any,
	reconStatus: SubReconDataType["recon_status"],
): SubReconDataType => {
	return {
		recon_status: reconStatus,
		settlement_id: settlement.id,
		amount: parseFloat(settlement.amount.value),
		commission: parseFloat(settlement.commission.value),
		withholding_amount: parseFloat(settlement.withholding_amount.value),
		tcs: parseFloat(settlement.tcs.value),
		tds: parseFloat(settlement.tds.value),
		context: reconPayload.context,
	};
};
