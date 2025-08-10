import { Types } from "mongoose";
import { UserType } from "../../schema/models/user-schema";
import { UserService } from "../user-service";
import { getAckResponse, getNackResponse } from "../../utils/ackUtils";
import logger from "../../utils/logger";
import { ENUMS, INTERNAL_RECON_STATUS } from "../../constants/enums";
import { extractReconDetails } from "../../utils/recon-utils/extract-recon-details";
import { OrderService } from "../order-service";
import { ReconDbService } from "../recon-service";
import { ReconPayload } from "../../schema/rsf/zod/recon-schema";
import { ReconType } from "../../schema/models/recon-schema";
import { SettleDbManagementService } from "../settle-service";
import { TransactionService } from "../transaction-serivce";
import { SettleType } from "../../schema/models/settle-schema";
import { update } from "lodash";

// A new type to hold the prepared data after successful validation.
type PreparedUpdate = {
	userId: string;
	orderId: string;
	reconData: ReconType;
};

export class ReconRequestService {
	constructor(
		private reconService: ReconDbService,
		private settleService: SettleDbManagementService,
		private userService: UserService,
		private orderService: OrderService,
		private transactionService: TransactionService,
	) {}

	/**
	 * Ingests a reconciliation payload, validates all orders in a first pass,
	 * and only if all are valid, updates them in the database in a second pass.
	 * This ensures atomicity for the batch of orders.
	 */
	async ingestReconPayload(reconPayload: ReconPayload) {
		// --- Basic Payload Structure Validation ---
		const orders = reconPayload.message.orders;
		if (!orders || !Array.isArray(orders) || orders.length === 0) {
			logger.error("No orders found or invalid format in the recon payload", {
				reconPayload,
			});
			return getNackResponse("70002", "No order found in payload"); // Invalid payload
		}
		logger.warning(
			"TODO: Implement async response for recon errors && mark something processing",
		);
		const { bap_uri, bpp_uri } = reconPayload.context;
		if (!bap_uri || !bpp_uri) {
			logger.error("BAP URI or BPP URI is missing in the recon payload", {
				reconPayload,
			});
			return getNackResponse("70002", "BAP URI or BPP URI is missing"); // Invalid payload
		}

		try {
			// --- Preparation and Validation Pass ---
			logger.info("Starting validation pass for recon payload...");
			const allUsers = await this.userService.getUsers();
			const updatesToProcess: PreparedUpdate[] = [];

			for (const order of orders) {
				const orderId = order.id;
				if (!orderId) {
					// Fail fast if a fundamental field is missing.
					throw new Error("Order ID is missing in one of the orders");
				}
				if (!order.settlements || order.settlements.length === 0) {
					// Fail fast if settlements are missing.
					throw new Error(
						`Settlement data is missing for order ${orderId} in the payload`,
					);
				}

				// Find the associated user and settlement for the order.
				const { user, recon, settlement } = await this.findUserForOrder(
					orderId,
					order.settlements[0].status,
					bap_uri,
					bpp_uri,
					allUsers,
				);

				if (recon) {
					// Validate if the settlement is in a state that allows reconciliation.
					if (this.illegalReconStatus.includes(recon.recon_status)) {
						logger.error(
							`Settlement for order ${orderId} is already processed or in a pending state.`,
							{
								userId: user._id.toString(),
								orderId,
								status: recon.recon_status,
							},
						);
						throw new Error(
							`Settlement for order ${orderId} is already processed or in a pending state.`,
						);
					}
				}
				if (!settlement) {
					logger.error(
						`Settlement for order ${orderId} does not exist for user ${user._id.toString()}`,
					);
					continue;
				}

				// Validate the settlement data within the payload for this order.
				const settleDataInPayload = order.settlements?.[0];
				if (!settleDataInPayload) {
					throw new Error(
						`Settlement data is missing in the payload for order ${orderId}`,
					);
				}

				const reconData = extractReconDetails(
					settlement,
					settleDataInPayload,
					user._id.toString(),
					orderId,
					INTERNAL_RECON_STATUS.RECEIVED_PENDING,
				);

				updatesToProcess.push({
					userId: user._id.toString(),
					orderId,
					reconData,
				});
			}

			// --- Update Pass ---
			// This section is only reached if all orders in the payload are valid.
			logger.warning(
				`Validation successful for ${updatesToProcess.length} orders. Proceeding with database updates.`,
			);
			const transactionDb =
				await this.transactionService.addReconPayload(reconPayload);
			const updatePromises = updatesToProcess.map(async (update) => {
				logger.warning(`Processing recon update for order ${update.orderId}`);

				update.reconData.transaction_db_ids.push(transactionDb._id.toString());

				logger.warning(`db id ${transactionDb._id.toString()}`);

				await this.reconService.createReconOrOverride(update.reconData);

				await this.settleService.updateSettlementViaUser(
					update.userId,
					update.reconData.order_id,
					{
						status: ENUMS.SETTLEMENT_STATUS.IN_RECON,
					},
				);
			});

			// Now this works correctly
			await Promise.all(updatePromises);

			logger.info("All recon updates completed successfully.");
			return getAckResponse();
		} catch (error: any) {
			// If any validation fails, the entire batch is rejected.
			logger.error("Recon payload processing failed during validation.", {
				error: error.message,
				reconPayload,
			});
			// You can map specific error messages to different NACK codes if needed.
			if (error.message.includes("No user-config found")) {
				return getNackResponse("70030", "No user-config found"); // Specific error for user not found
			}
			if (error.message.includes("already processed")) {
				return getNackResponse("503", "settlement is not in a valid state"); // Service unavailable / already handled
			}
			// Generic error for other validation failures (e.g., missing data)
			return getNackResponse("70002", error.message || "");
		}
	}

	/**
	 * Finds the user and their corresponding settlement record for a given order ID.
	 * Refactored to reduce code duplication.
	 */
	async findUserForOrder(
		order_id: string,
		recon_status: (typeof reconStatuses)[number],
		bap_uri: string,
		bpp_uri: string,
		users: UserWithId[],
	) {
		for (const user of users) {
			const subscriber_url = user.subscriber_url;
			const user_id = user._id.toString();
			logger.debug(
				`Checking user ${user_id} with subscriber URL ${subscriber_url} for order ${order_id}`,
			);
			// Check if user's subscriber URL matches either BAP or BPP URI
			if (subscriber_url === bap_uri || subscriber_url === bpp_uri) {
				logger.debug(
					`Found matching user ${user_id} for order ${order_id} with BAP URI ${bap_uri} or BPP URI ${bpp_uri}`,
				);
				// If it matches, check if a unique settlement exists for this user and order
				const settlementExists = await this.settleService.checkUniqueSettlement(
					user_id,
					order_id,
				);
				// no settlement
				logger.debug(
					`Settlement existence check for user ${user_id} and order ${order_id}`,
					settlementExists,
				);
				if (settlementExists) {
					const settlements = await this.settleService.getSingleSettlement(
						user_id,
						order_id,
					);
					if (!settlements) {
						throw new Error(
							`No settlements found for order ${order_id} for user ${user_id}`,
						);
					}
					const dbState = settlements.status;
					if (recon_status === "SETTLED" && dbState !== "SETTLED") {
						throw new Error(
							`Settlement for order ${order_id} is not in SETTLED state, current state: ${dbState}`,
						);
					}
					if (dbState === "SETTLED" && recon_status !== "SETTLED") {
						throw new Error(
							`Settlement for order ${order_id} is already SETTLED, cannot change to ${recon_status}`,
						);
					}
					logger.debug(
						`Found settlement for order ${order_id} for user ${user_id} with status ${dbState}`,
					);

					const recon = await this.reconService.getReconById(user_id, order_id);

					// Assuming getSettlements returns at least one result if checkUniqueSettlement is true
					return { user, settlement: settlements, recon: recon };
				} else {
					// fallback to order_table
					logger.debug(
						`No unique settlement found for order ${order_id} for user ${user_id}, checking order table`,
					);
					const orderExists = await this.orderService.checkUniqueOrder(
						user_id,
						order_id,
					);
					// const recon = await this.reconService.getReconById(user_id, order_id);
					logger.debug(
						`Order existence check for user ${user_id} and order ${order_id}: ${orderExists}`,
					);
					if (orderExists && recon_status === "TO_BE_INITIATED") {
						return { user, settlement: undefined, recon: null };
					}
				}
			}
		}
		// If the loop completes without finding a match, throw an error.
		throw new Error(
			`No user-config found for order ${order_id} with BAP URI ${bap_uri} or BPP URI ${bpp_uri}`,
		);
	}

	illegalReconStatus: string[] = [
		INTERNAL_RECON_STATUS.RECEIVED_ACCEPTED,
		INTERNAL_RECON_STATUS.RECEIVED_PENDING,
		INTERNAL_RECON_STATUS.SENT_PENDING,
		INTERNAL_RECON_STATUS.SENT_ACCEPTED,
	];
}

type UserWithId = UserType & { _id: Types.ObjectId };

const reconStatuses = Object.values(ENUMS.RECON_STATUS);
