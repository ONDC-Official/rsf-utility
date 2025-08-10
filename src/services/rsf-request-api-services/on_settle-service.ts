import { SettleType } from "../../schema/models/settle-schema";
import { OnSettlePayload } from "../../schema/rsf/zod/on_settle-schema";
import { getAckResponse, getNackResponse } from "../../utils/ackUtils";
import logger from "../../utils/logger";
import { SettleDbManagementService } from "../settle-service";
import { TransactionService } from "../transaction-serivce";

const onSettleLogger = logger.child("on-settle-service");

export class OnSettleService {
	constructor(
		private settleService: SettleDbManagementService,
		private transactionService: TransactionService,
	) {}

	ingestOnSettlePayload = async (ondcOnSettlePayload: OnSettlePayload) => {
		const txn_id = ondcOnSettlePayload.context.transaction_id;
		const message_id = ondcOnSettlePayload.context.message_id;

		if (!txn_id || !message_id) {
			onSettleLogger.error("Transaction ID or Message ID is missing", {
				txn_id,
				message_id,
			});
			throw new Error("Transaction ID or Message ID is missing");
		}

		const settlePayload =
			await this.transactionService.getSettleByTransactionIdAndMessageId(
				txn_id,
				message_id,
			);

		logger.info("Settle payload found", {
			txn_id,
			message_id,
		});

		if (!settlePayload) {
			onSettleLogger.error("Settle payload not found for on_settle request", {
				txn_id,
				message_id,
			});
			return getNackResponse("503");
		}

		if (ondcOnSettlePayload.error) {
			onSettleLogger.error(
				"handling error in on_settle in not implemented yet",
				{
					txn_id,
					message_id,
					error: ondcOnSettlePayload.error,
				},
			);
			throw new Error("Error in on settle payload");
		}

		const orders = ondcOnSettlePayload.message?.settlement.orders;
		if (!orders || orders.length === 0) {
			onSettleLogger.error("No orders found in the settlement message", {
				txn_id,
				message_id,
			});
			throw new Error("No orders found in the settlement message");
		}
		logger.info("Processing orders in on_settle payload", {
			txn_id,
			message_id,
			orders,
		});
		for (const order of orders) {
			if (order.id) {
				const settlement = await this.settleService.getSettlementByDbId(
					settlePayload._id.toString(),
				);
				if (!settlement) {
					onSettleLogger.error(
						"Settlement not found for order in on_settle request",
						{
							txn_id,
							message_id,
							settlePayload: settlePayload._id.toString(),
						},
					);
					return getNackResponse("503");
				}
				const { inter_participant, self, provider } = order;
				logger.info("updating data", order);

				if (!inter_participant || !self || !provider) {
					onSettleLogger.error("Missing required settlement data in order", {
						order,
					});
					throw new Error("Missing required settlement data in order");
				}

				const settlementData: Partial<SettleType> = {
					status: inter_participant.status,
					self_status: self.status,
					provider_status: provider.status,
					settlement_reference: inter_participant.reference_no,
					provider_settlement_reference: provider.reference_no,
					self_settlement_reference: self.reference_no,
					error:
						inter_participant.error?.message ||
						provider.error?.message ||
						self.error?.message,
				};
				await this.settleService.updateSettlementViaTxn(
					settlePayload._id.toString(),
					order.id,
					settlementData,
				);
			}
		}
		return getAckResponse();
	};
}
