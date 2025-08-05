import { Types } from "mongoose";
import { UserType } from "../../schema/models/user-schema";
import { SettleDbManagementService } from "../settle-service";
import { UserService } from "../user-service";
import { getAckResponse, getNackResponse } from "../../utils/ackUtils";
import logger from "../../utils/logger";
import { SubReconDataType } from "../../schema/models/settle-schema";
import { INTERNAL_RECON_STATUS } from "../../constants/enums";
import { extractReconDetails } from "../../utils/recon-utils/extract-recon-details";

// A new type to hold the prepared data after successful validation.
type PreparedUpdate = {
	userId: string;
	orderId: string;
	reconData: SubReconDataType;
};

export class ReconRequestService {
	constructor(
		private settleService: SettleDbManagementService,
		private userService: UserService,
	) {}

	/**
	 * Ingests a reconciliation payload, validates all orders in a first pass,
	 * and only if all are valid, updates them in the database in a second pass.
	 * This ensures atomicity for the batch of orders.
	 */
	async ingestReconPayload(reconPayload: any) {
		// --- Basic Payload Structure Validation ---
		const orders = reconPayload.message.orders;
		if (!orders || !Array.isArray(orders) || orders.length === 0) {
			logger.error("No orders found or invalid format in the recon payload", {
				reconPayload,
			});
			return getNackResponse("70002"); // Invalid payload
		}

		const { bap_uri, bpp_uri } = reconPayload.context;
		if (!bap_uri || !bpp_uri) {
			logger.error("BAP URI or BPP URI is missing in the recon payload", {
				reconPayload,
			});
			return getNackResponse("70002"); // Invalid payload
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

				// Find the associated user and settlement for the order.
				const { user, settlement } = await this.findUserForOrder(
					orderId,
					bap_uri,
					bpp_uri,
					allUsers,
				);

				// Validate if the settlement is in a state that allows reconciliation.
				if (
					this.illegalReconStatus.includes(settlement.reconInfo.recon_status)
				) {
					logger.error(
						`Settlement for order ${orderId} is already processed or in a pending state.`,
						{
							userId: user._id.toString(),
							orderId,
							status: settlement.reconInfo.recon_status,
						},
					);
					throw new Error(
						`Settlement for order ${orderId} is already processed or in a pending state.`,
					);
				}

				// Validate the settlement data within the payload for this order.
				const settleDataInPayload = order.settlements?.[0];
				if (!settleDataInPayload) {
					throw new Error(
						`Settlement data is missing in the payload for order ${orderId}`,
					);
				}
				const reconData = extractReconDetails(
					settleDataInPayload,
					reconPayload,
					INTERNAL_RECON_STATUS.RECEIVED_ACCEPTED,
				);

				updatesToProcess.push({
					userId: user._id.toString(),
					orderId,
					reconData,
				});
			}

			// --- Update Pass ---
			// This section is only reached if all orders in the payload are valid.
			logger.info(
				`Validation successful for ${updatesToProcess.length} orders. Proceeding with database updates.`,
			);

			const updatePromises = updatesToProcess.map((update) =>
				this.settleService.updateReconData(
					update.userId,
					update.orderId,
					update.reconData,
				),
			);

			// Execute all updates concurrently for better performance.
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
				return getNackResponse("70030"); // Specific error for user not found
			}
			if (error.message.includes("already processed")) {
				return getNackResponse("503"); // Service unavailable / already handled
			}
			// Generic error for other validation failures (e.g., missing data)
			return getNackResponse("70002");
		}
	}

	/**
	 * Finds the user and their corresponding settlement record for a given order ID.
	 * Refactored to reduce code duplication.
	 */
	async findUserForOrder(
		order_id: string,
		bap_uri: string,
		bpp_uri: string,
		users: UserWithId[],
	) {
		for (const user of users) {
			const subscriber_url = user.subscriber_url;
			const user_id = user._id.toString();

			// Check if user's subscriber URL matches either BAP or BPP URI
			if (subscriber_url === bap_uri || subscriber_url === bpp_uri) {
				// If it matches, check if a unique settlement exists for this user and order
				const settlementExists = await this.settleService.checkUniqueSettlement(
					order_id,
					user_id,
				);

				if (settlementExists) {
					const settlements = await this.settleService.getSettlements(user_id, {
						order_id: order_id,
					});
					// Assuming getSettlements returns at least one result if checkUniqueSettlement is true
					return { user, settlement: settlements[0] };
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
