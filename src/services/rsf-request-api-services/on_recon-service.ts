import logger from "../../utils/logger";
import { getAckResponse, getNackResponse } from "../../utils/ackUtils";
import { OnReconAggregateObj } from "../generate-services/generate-on_recon-service";
import { ReconDbService } from "../recon-service";
import { TransactionService } from "../transaction-serivce";
import { ReconType } from "../../schema/models/recon-schema";
import {
	OnReconPayload,
	OnReconPayloadOrders,
} from "../../schema/rsf/zod/on_recon-schema";
import { ReconPayload } from "../../schema/rsf/zod/recon-schema";
import { ENUMS } from "../../constants/enums";

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
	): OnReconAggregateObj[] {
		const savedReconsMap = this.createReconsMap(recons);

		// Validate business rules for orders with recon_accord
		this.validateReconAccordOrders(onReconOrders, savedReconsMap);

		// Validate transaction consistency
		this.validateTransactionConsistency(recons, onReconOrders, reconPayload);

		// Validate recon statuses
		this.validateReconStatuses(recons);

		this.logValidationSuccess(recons, onReconOrders, reconPayload);

		// Aggregate and return the validated data
		const aggregatedData: OnReconAggregateObj[] = onReconOrders.map((order) => {
			const recon = savedReconsMap.get(order.id);
			if (!recon) {
				rsfLogger.error(
					`Recon not found for order ${order.id} in saved recons`,
				);
				throw new Error(`Recon not found for order ${order.id}`);
			}
			return {
				recon: recon,
				orderId: order.id,
				onReconData: {
					order_id: order.id,
					recon_accord: order.recon_accord,
					due_date: order.recon_accord
						? new Date(order.settlements?.[0]?.due_date || "")
						: undefined,
					on_recon_data: {
						settlement_amount:
							parseFloat(order.settlements?.[0]?.amount?.value) || 0,
						commission_amount:
							parseFloat(order.settlements?.[0]?.commission?.value) || 0,
						withholding_amount:
							parseFloat(order.settlements?.[0]?.withholding_amount?.value) ||
							0,
						tcs: parseFloat(order.settlements?.[0]?.tcs?.value) || 0,
						tds: parseFloat(order.settlements?.[0]?.tds?.value) || 0,
					},
				},
			};
		});

		return aggregatedData;
	}

	private createReconsMap(recons: ReconType[]): Map<string, ReconType> {
		return new Map(recons.map((recon) => [recon.order_id, recon]));
	}

	private validateReconAccordOrders(
		onReconOrders: OnReconPayloadOrders[],
		savedReconsMap: Map<string, ReconType>,
	): void {
		for (const order of onReconOrders) {
			if (!order.recon_accord) continue;

			this.validateDueDateForAccordOrder(order);
			this.validateBreakdownMatch(order, savedReconsMap);
		}
	}

	private validateDueDateForAccordOrder(order: OnReconPayloadOrders): void {
		if (!order.settlements?.[0]?.due_date) {
			const error = "Due date is required when recon_accord is true";
			rsfLogger.error(error, { order_id: order.id });
			throw new Error(error);
		}
	}

	private validateBreakdownMatch(
		order: OnReconPayloadOrders,
		savedReconsMap: Map<string, ReconType>,
	): void {
		const savedDetails = savedReconsMap.get(order.id);
		if (!savedDetails) {
			rsfLogger.warning(
				`Recon details not found for order ${order.id} in saved recons`,
			);
			return;
		}

		const breakdown = savedDetails.recon_breakdown;
		const settlement = order.settlements[0];

		const breakdownMatches = this.compareBreakdowns(breakdown, settlement);

		if (!breakdownMatches) {
			const error = "Recon breakdown does not match with on recon settlements";
			rsfLogger.error(error, {
				order_id: order.id,
				recon_breakdown: breakdown,
				on_recon_settlement: settlement,
			});
			throw new Error(error);
		}
	}

	private compareBreakdowns(
		breakdown: ReconType["recon_breakdown"],
		settlement: OnReconPayloadOrders["settlements"][0],
	): boolean {
		const parseValue = (value: string): number => parseFloat(value);

		return (
			breakdown.amount === parseValue(settlement.amount.value) &&
			breakdown.commission === parseValue(settlement.commission.value) &&
			breakdown.withholding_amount ===
				parseValue(settlement.withholding_amount.value) &&
			breakdown.tcs === parseValue(settlement.tcs.value) &&
			breakdown.tds === parseValue(settlement.tds.value)
		);
	}

	private validateTransactionConsistency(
		recons: ReconType[],
		onReconOrders: OnReconPayloadOrders[],
		reconPayload: ReconPayload,
	): void {
		const onReconOrderIds = new Set(
			onReconOrders.map((order) => order.id).filter(Boolean),
		);
		const reconPayloadOrderIds = reconPayload.message.orders.map(
			(order) => order.id,
		);
		const reconOrderIds = recons.map((recon) => recon.order_id);

		this.validateOrdersPresence(
			reconPayloadOrderIds,
			onReconOrderIds,
			"recon payload",
		);
		this.validateOrdersPresence(reconOrderIds, onReconOrderIds, "recon");
	}

	private validateOrdersPresence(
		orderIds: string[],
		onReconOrderIds: Set<string>,
		orderType: string,
	): void {
		const missingOrders = orderIds.filter(
			(orderId) => !onReconOrderIds.has(orderId),
		);

		if (missingOrders.length > 0) {
			const errorMsg = `${orderType} orders not found in on_recon orders: [${missingOrders.join(", ")}]. Available on_recon orders: [${Array.from(onReconOrderIds).join(", ")}]`;

			rsfLogger.error(errorMsg, {
				missing_orders: missingOrders,
				available_on_recon_orders: Array.from(onReconOrderIds),
				order_type: orderType,
			});

			throw new Error(errorMsg);
		}
	}

	private validateReconStatuses(recons: ReconType[]): void {
		const invalidStatusRecons = recons.filter(
			(recon) => recon.recon_status !== "SENT_PENDING",
		);

		if (invalidStatusRecons.length > 0) {
			const errorMsg = `Found recons with invalid status. Expected: SENT_PENDING. Invalid recons: ${invalidStatusRecons
				.map((r) => `${r.order_id}(${r.recon_status})`)
				.join(", ")}`;

			rsfLogger.error(errorMsg, {
				invalid_recons: invalidStatusRecons.map((r) => ({
					order_id: r.order_id,
					current_status: r.recon_status,
					expected_status: "SENT_PENDING",
				})),
			});

			throw new Error(errorMsg);
		}
	}

	private logValidationSuccess(
		recons: ReconType[],
		onReconOrders: OnReconPayloadOrders[],
		reconPayload: ReconPayload,
	): void {
		rsfLogger.info("Recon validation completed successfully", {
			total_recon_payload_orders: reconPayload.message.orders.length,
			total_recons: recons.length,
			total_on_recon_orders: onReconOrders.length,
			validation_passed: true,
		});
	}

	updateSettlementsInDb = async (finalData: OnReconAggregateObj[]) => {
		rsfLogger.info("Updating recon in DB for on_recon payload", finalData);
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
				recon_status: ENUMS.INTERNAL_RECON_STATUS.ERROR,
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
