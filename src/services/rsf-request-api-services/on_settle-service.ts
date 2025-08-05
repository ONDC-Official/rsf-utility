import logger from "../../utils/logger";
import { SettleDbManagementService } from "../settle-service";

const onSettleLogger = logger.child("on-settle-service");

export class OnSettleService {
	constructor(private settleService: SettleDbManagementService) {}

	ingestOnsettlePayload = async (ondcOnSettlePayload: any) => {
		const txn_id = ondcOnSettlePayload.context.transaction_id;
		const message_id = ondcOnSettlePayload.context.message_id;

		if (!txn_id || !message_id) {
			onSettleLogger.error("Transaction ID or Message ID is missing", {
				txn_id,
				message_id,
			});
			throw new Error("Transaction ID or Message ID is missing");
		}
		for (const order of ondcOnSettlePayload.message.settlement.orders) {
			if (order.id) {
				const settlement =
					await this.settleService.getSettlementByContextAndOrderId(
						txn_id,
						message_id,
						order.id,
					);
				if (!settlement) {
					throw new Error(
						"Settlement not found for the given context and order ID",
					);
				}
				const { interparticipant, self, provider } = order;

				Object.assign(settlement, {
					status: interparticipant?.status,
					self_status: self?.status,
					provider_status: provider?.status,
					settlement_reference: interparticipant?.settlement_reference,
					provider_settlement_reference: provider?.settlement_reference,
					self_settlement_reference: self?.settlement_reference,
				});
				return await this.settleService.updateSettlementByOnSettle(
					txn_id,
					message_id,
					order.id,
					settlement,
				);
			}
		}
	};
}
