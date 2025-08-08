import { ReconType } from "../../schema/models/recon-schema";
import { ReconPayloadSettlement } from "../../schema/rsf/zod/recon-schema";

export const extractReconDetails = (
	settlement: ReconPayloadSettlement,
	userId: string,
	orderId: string,
	dbId: string,
	reconStatus: ReconType["recon_status"],
): ReconType => {
	return {
		user_id: userId,
		order_id: orderId,
		recon_status: reconStatus,
		settlement_id: settlement.id,
		transaction_db_ids: [dbId],
		recon_breakdown: {
			amount: parseFloat(settlement.amount.value),
			commission: parseFloat(settlement.commission.value),
			withholding_amount: parseFloat(settlement.withholding_amount.value),
			tcs: parseFloat(settlement.tcs.value),
			tds: parseFloat(settlement.tds.value),
		},
	};
};
