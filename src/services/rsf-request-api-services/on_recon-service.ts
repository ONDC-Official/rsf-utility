import { SettleDbManagementService } from "../settle-service";
import logger from "../../utils/logger";
import { getAckResponse, getNackResponse } from "../../utils/ackUtils";
import { RsfContextType, SettleType } from "../../schema/models/settle-schema";
import { OnReconAggregateObj } from "../generate-services/generate-on_recon-service";
import { GenOnReconBodyObjectType } from "../../types/generate-recon-types";

const rsfLogger = logger.child("on-recon-request-service");
export class OnReconRequestService {
	constructor(private settleDbManagementService: SettleDbManagementService) {}

	ingestOnReconPayload = async (onReconPayload: any) => {
		rsfLogger.info("Ingesting on recon payload");

		const { bap_uri, bpp_uri, transaction_id, message_id } =
			onReconPayload.context;
		if (!bap_uri || !bpp_uri || !transaction_id || !message_id) {
			rsfLogger.error(
				"BAP URI or BPP URI or Transaction ID or Message ID is missing in the on recon payload",
				{
					onReconPayload,
				},
			);
			return getNackResponse("70002"); // Invalid payload
		}

		if (onReconPayload.error) {
			rsfLogger.warning("Error found in on recon payload", {
				error: onReconPayload.error,
			});
			return this.handleOnReconWithError(onReconPayload);
		}
		const orders = onReconPayload.message.orders;
		if (!orders || !Array.isArray(orders) || orders.length === 0) {
			rsfLogger.error(
				"No orders found or invalid format in the on recon payload",
				{
					onReconPayload,
				},
			);
			return getNackResponse("70002"); // Invalid payload
		}

		try {
			const filteredOrders = await this.getOrdersFromDbWith(
				transaction_id,
				message_id,
				"SENT_PENDING",
			);
			if (filteredOrders.length === 0) {
				rsfLogger.error(
					"No orders found with SENT_PENDING status for the given transaction_id and message_id",
					{
						transaction_id,
						message_id,
					},
				);
				return getNackResponse("503"); // No orders found
			}
			const aggData = this.validateSettlements(filteredOrders, orders);
			await this.updateSettlementsInDb(aggData);
			rsfLogger.info("On recon payload processed successfully");
		} catch (error) {
			rsfLogger.error("Error occurred while fetching orders", { error });
			return getNackResponse("70030"); // Error fetching orders
		}
		return getAckResponse();
	};

	async getOrdersFromDbWith(
		transaction_id: string,
		message_id: string,
		recon_status: SettleType["reconInfo"]["recon_status"],
	) {
		const orders =
			await this.settleDbManagementService.getAllSettlementsForRecon(
				transaction_id,
				message_id,
			);
		if (!orders || orders.length === 0) {
			rsfLogger.error(
				"No orders found for the given transaction_id and message_id",
				{
					transaction_id,
					message_id,
				},
			);
			throw new Error(
				"No orders found for the given transaction_id and message_id",
			);
		}
		return orders.filter((o) => o.reconInfo.recon_status === recon_status);
	}

	validateSettlements(settlements: SettleType[], onReconOrders: any[]) {
		const onReconDataMap = new Map(
			onReconOrders.map((data) => [data.id, data]),
		);
		const aggregatedData: OnReconAggregateObj[] = [];
		for (const settlement of settlements) {
			const orderId = settlement.order_id;
			const reconData = onReconDataMap.get(orderId);

			// VALIDATION 1: All recon orders from the DB must be present in the API payload.
			if (!reconData) {
				throw new Error(
					`Mismatch: Settlement for order ID ${orderId} exists in the batch, but was not found in your provided data.`,
				);
			}

			const accord = reconData.recon_accord;

			const onReconData: GenOnReconBodyObjectType = {
				order_id: orderId,
				recon_accord: accord,
			};

			if (accord) {
				onReconData.due_date = reconData.settlements[0].due_date;
			} else {
				onReconData.on_recon_data = {
					settlement_amount: reconData.settlements[0].amount.value,
					commission_amount: reconData.settlements[0].commission.value,
					withholding_amount: reconData.settlements[0].withholding_amount.value,
					tcs: reconData.settlements[0].tcs.value,
					tds: reconData.settlements[0].tds.value,
				};
			}

			aggregatedData.push({
				orderId: orderId,
				onReconData: reconData,
				settlement: settlement,
			});
		}
		return aggregatedData;
	}

	updateSettlementsInDb = async (finalData: OnReconAggregateObj[]) => {
		rsfLogger.info("Updating settlements in DB for on recon payload");
		for (const data of finalData) {
			const userId = data.settlement.user_id;
			const orderId = data.settlement.order_id;
			if (data.onReconData.recon_accord) {
				await this.settleDbManagementService.updateReconData(userId, orderId, {
					recon_status: "SENT_ACCEPTED",
					on_recon_data: {
						due_date: data.onReconData.due_date,
					},
				});
			} else {
				await this.settleDbManagementService.updateReconData(userId, orderId, {
					recon_status: "SENT_REJECTED",
					on_recon_data: {
						settlement_amount:
							data.onReconData.on_recon_data?.settlement_amount,
						commission_amount:
							data.onReconData.on_recon_data?.commission_amount,
						withholding_amount:
							data.onReconData.on_recon_data?.withholding_amount,
						tcs: data.onReconData.on_recon_data?.tcs,
						tds: data.onReconData.on_recon_data?.tds,
					},
				});
			}
		}
	};

	handleOnReconWithError = async (errorPayload: any) => {
		const context = errorPayload.context as RsfContextType;
		const allRelevantOrders =
			await this.settleDbManagementService.getAllSettlementsForRecon(
				context.transaction_id,
				context.message_id,
			);
		const filteredOrders = allRelevantOrders.filter(
			(order) => order.reconInfo.recon_status === "SENT_PENDING",
		);
		if (filteredOrders.length === 0) {
			rsfLogger.error(
				"No orders found with SENT_PENDING status for the given transaction_id and message_id",
				{
					transaction_id: context.transaction_id,
					message_id: context.message_id,
				},
			);
			return getNackResponse("503"); // No orders found
		}
		logger.info(
			"Handling on recon payload with error, updating settlements in DB with Inactives",
		);
		for (const order of filteredOrders) {
			await this.settleDbManagementService.updateReconData(
				order.user_id,
				order.order_id,
				{
					recon_status: "INACTIVE",
				},
			);
		}
		return getAckResponse();
	};
}

/*
    1. check if all order ids(with send_pending & txId) are present in the payload
	2. their states are SEND_PENDING
	3. context validations 
	4. update data in db
	orders: => only and all which are sent_pending
*/
