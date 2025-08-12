import { ReconType } from "../../schema/models/recon-schema";
import { SettleType } from "../../schema/models/settle-schema";
import { ReconPayloadSettlement } from "../../schema/rsf/zod/recon-schema";

export const extractReconDetails = (
	dbSettlement: SettleType,
	settlement: ReconPayloadSettlement,
	userId: string,
	orderId: string,
	reconStatus: ReconType["recon_status"],
): ReconType => {
	return {
		user_id: userId,
		order_id: orderId,
		collector_id: dbSettlement.collector_id,
		receiver_id: dbSettlement.receiver_id,
		recon_status: reconStatus,
		settlement_id: settlement.id,
		transaction_db_ids: [],
		transaction_id: "DUMMY_TRANSACTION_ID", // This will be set later
		recon_breakdown: {
			amount: parseFloat(settlement.amount.value),
			commission: parseFloat(settlement.commission.value),
			withholding_amount: parseFloat(settlement.withholding_amount.value),
			tcs: parseFloat(settlement.tcs.value),
			tds: parseFloat(settlement.tds.value),
		},
	};
};
