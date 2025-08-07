import logger from "../../utils/logger";
import { getAckResponse, getNackResponse } from "../../utils/ackUtils";
import { OnReconAggregateObj } from "../generate-services/generate-on_recon-service";
import { GenOnReconBodyObjectType } from "../../types/generate-recon-types";
import { ReconDbService } from "../recon-service";
import { TransactionService } from "../transaction-serivce";
import { ReconType } from "../../schema/models/recon-schema";
import {
	OnReconPayload,
	OnReconPayloadOrders,
} from "../../schema/rsf/zod/on_recon-schema";
import { ReconPayload } from "../../schema/rsf/zod/recon-schema";

const rsfLogger = logger.child("on-recon-request-service");
export class OnReconRequestService {
	constructor(
		private reconService: ReconDbService,
		private transactionService: TransactionService,
	) {}

	ingestOnReconPayload = async (onReconPayload: OnReconPayload) => {
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

		const reconPayload = await this.transactionService.getReconByContext(
			transaction_id,
			message_id,
		);

		if (!reconPayload) {
			rsfLogger.error(
				"No recon payload found for the given transaction_id and message_id",
				{
					transaction_id,
					message_id,
				},
			);
			return getNackResponse("503"); // No recon payload found
		}

		if (onReconPayload.error) {
			rsfLogger.warning("Error found in on recon payload", {
				error: onReconPayload.error,
			});
			return this.handleOnReconWithError(
				onReconPayload,
				reconPayload._id.toString(),
			);
		}

		const payloadOrders = onReconPayload.message?.orders;
		if (
			!payloadOrders ||
			!Array.isArray(payloadOrders) ||
			payloadOrders.length === 0
		) {
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
				reconPayload._id.toString(),
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
			const aggData = this.validateRecons(
				filteredOrders,
				payloadOrders,
				reconPayload,
			);
			await this.updateSettlementsInDb(aggData);
			rsfLogger.info("On recon payload processed successfully");
		} catch (error) {
			rsfLogger.error("Error occurred while fetching orders", { error });
			return getNackResponse("70030"); // Error fetching orders
		}
		return getAckResponse();
	};

	async getOrdersFromDbWith(
		dbId: string,
		recon_status: ReconType["recon_status"],
	) {
		const orders = await this.reconService.getReconByTransaction(dbId);
		if (!orders || orders.length === 0) {
			rsfLogger.error(
				"No orders found for the given transaction_id and message_id",
				{
					dbId: dbId,
				},
			);
			throw new Error(
				"No orders found for the given transaction_id and message_id",
			);
		}
		return orders.filter((o) => o.recon_status === recon_status);
	}

	validateRecons(
		recons: ReconType[],
		onReconOrders: OnReconPayloadOrders[],
		reconPayload: ReconPayload,
	) {
		// 1. all recon payloads order match on_recon orders
		// 2. all recons are present in on_recon orders
		// 3. states of all recons are SENT_PENDING
		const finalData: OnReconAggregateObj[] = [];

		const reconPayloadOrders = reconPayload.message.orders;

		// Create sets for efficient lookup and better error reporting
		const onReconOrderIds = new Set(
			onReconOrders.map((order) => order.id).filter(Boolean),
		);
		const reconPayloadOrderIds = reconPayloadOrders.map((order) => order.id);
		const reconOrderIds = recons.map((recon) => recon.order_id);

		// Check if all recon payload orders are present in on_recon orders
		const missingReconPayloadOrders = reconPayloadOrderIds.filter(
			(orderId) => !onReconOrderIds.has(orderId),
		);
		if (missingReconPayloadOrders.length > 0) {
			const errorMsg = `Recon payload orders not found in on_recon orders: [${missingReconPayloadOrders.join(", ")}]. Available on_recon orders: [${Array.from(onReconOrderIds).join(", ")}]`;
			rsfLogger.error(errorMsg, {
				missing_orders: missingReconPayloadOrders,
				available_on_recon_orders: Array.from(onReconOrderIds),
				recon_payload_orders: reconPayloadOrderIds,
			});
			throw new Error(errorMsg);
		}

		// Check if all recons are present in on_recon orders
		const missingReconOrders = reconOrderIds.filter(
			(orderId) => !onReconOrderIds.has(orderId),
		);
		if (missingReconOrders.length > 0) {
			const errorMsg = `Recon orders not found in on_recon orders: [${missingReconOrders.join(", ")}]. Available on_recon orders: [${Array.from(onReconOrderIds).join(", ")}]`;
			rsfLogger.error(errorMsg, {
				missing_recon_orders: missingReconOrders,
				available_on_recon_orders: Array.from(onReconOrderIds),
				recon_orders: reconOrderIds,
			});
			throw new Error(errorMsg);
		}

		// Check states of all recons are SENT_PENDING
		const invalidStatusRecons = recons.filter(
			(recon) => recon.recon_status !== "SENT_PENDING",
		);
		if (invalidStatusRecons.length > 0) {
			const errorMsg = `Found recons with invalid status. Expected: SENT_PENDING. Invalid recons: ${invalidStatusRecons.map((r) => `${r.order_id}(${r.recon_status})`).join(", ")}`;
			rsfLogger.error(errorMsg, {
				invalid_recons: invalidStatusRecons.map((r) => ({
					order_id: r.order_id,
					current_status: r.recon_status,
					expected_status: "SENT_PENDING",
				})),
			});
			throw new Error(errorMsg);
		}

		rsfLogger.info("Recon validation completed successfully", {
			total_recon_payload_orders: reconPayloadOrderIds.length,
			total_recons: recons.length,
			total_on_recon_orders: onReconOrders.length,
			validation_passed: true,
		});

		return finalData;
	}

	updateSettlementsInDb = async (finalData: OnReconAggregateObj[]) => {
		rsfLogger.info("Updating settlements in DB for on recon payload");
		for (const data of finalData) {
			const userId = data.recon.user_id;
			const orderId = data.recon.order_id;
			if (data.onReconData.recon_accord) {
				await this.reconService.updateData(userId, orderId, {
					recon_status: "SENT_ACCEPTED",
					due_date: data.onReconData.due_date,
				});
			} else {
				await this.reconService.updateData(userId, orderId, {
					recon_status: "SENT_REJECTED",
					on_recon_breakdown: {
						amount: data.onReconData.on_recon_data?.settlement_amount ?? 0,
						commission: data.onReconData.on_recon_data?.commission_amount ?? 0,
						withholding_amount:
							data.onReconData.on_recon_data?.withholding_amount ?? 0,
						tcs: data.onReconData.on_recon_data?.tcs ?? 0,
						tds: data.onReconData.on_recon_data?.tds ?? 0,
					},
				});
			}
		}
	};

	handleOnReconWithError = async (errorPayload: any, dbId: string) => {
		const context = errorPayload.context;
		const allRelevantOrders =
			await this.reconService.getReconByTransaction(dbId);
		const filteredOrders = allRelevantOrders.filter(
			(order) => order.recon_status === "SENT_PENDING",
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
			await this.reconService.updateData(order.user_id, order.order_id, {
				recon_status: "INACTIVE",
				on_recon_error: errorPayload.error,
			});
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

/*
1. fetch recon payload
2. check all order_ids are present 
3. check thier states are SEND_PENDING
4. update data in db
5. context validations
6. nack if no due data and accord is true
*/
