import { SettleType } from "../../schema/models/settle-schema";
import { GenOnReconBodyObjectType } from "../../types/generate-recon-types";
import logger from "../../utils/logger";
import { createOnReconPayload } from "../../utils/on_recon_utils/generate-on-recon-payload";
import { SettleDbManagementService } from "../settle-service";
import { UserService } from "../user-service";

const onReconLogger = logger.child("generate-on-recon-service");

export type OnReconAggregateObj = {
	settlement: SettleType;
	onReconData: GenOnReconBodyObjectType;
	orderId: string;
};

export class GenerateOnReconService {
	constructor(
		private readonly settleService: SettleDbManagementService,
		private readonly userService: UserService,
	) {}

	/**
	 * Main method to generate the on-recon payload.
	 * It orchestrates user validation and data validation before payload creation.
	 */
	async generateOnReconPayload(
		userId: string,
		onReconData: GenOnReconBodyObjectType[],
	) {
		onReconLogger.info("Starting on-recon payload generation.", { userId });

		const userConfig = await this.userService.getUserById(userId);
		if (!userConfig) {
			onReconLogger.error("User validation failed.", { userId });
			throw new Error(`User with ID: ${userId} not found.`);
		}

		const aggregatedData = await this.validateAndAggregateReconData(
			userId,
			onReconData,
		);

		onReconLogger.info("On-recon data validated and aggregated successfully.", {
			userId,
		});
		return createOnReconPayload(aggregatedData, userConfig);
	}

	/**
	 * Validates the entire batch of reconciliation data against database records.
	 * This method is a coordinator for more specific private validation methods.
	 * @param userId The ID of the user performing the action.
	 * @param onReconData The raw reconciliation data from the API payload.
	 * @returns A promise resolving to the aggregated and validated data.
	 */
	private async validateAndAggregateReconData(
		userId: string,
		onReconData: GenOnReconBodyObjectType[],
	): Promise<OnReconAggregateObj[]> {
		onReconLogger.info("Validating on-recon data batch.", {
			userId,
			count: onReconData.length,
		});

		if (!onReconData || onReconData.length === 0) {
			throw new Error("Reconciliation data cannot be empty.");
		}

		// 1. Get the transaction context from the first record to identify the batch.
		const { transactionId, messageId } = await this._getReconContext(
			userId,
			onReconData[0],
		);

		// 2. Fetch all settlements from the DB that are part of this transaction batch.
		const dbSettlements = await this.settleService.getAllSettlementsForRecon(
			transactionId,
			messageId,
		);

		// 3. Ensure the provided data and the DB records are for the same set of orders.
		if (dbSettlements.length !== onReconData.length) {
			throw new Error(
				`Data mismatch: Expected ${dbSettlements.length} settlement records for this batch, but received ${onReconData.length}.`,
			);
		}

		// 4. Perform detailed validation on each item and aggregate the results.
		return this._aggregateAndValidateItems(onReconData, dbSettlements);
	}

	/**
	 * Fetches the initial settlement to establish the transaction context (transaction_id, message_id).
	 */
	private async _getReconContext(
		userId: string,
		firstRecord: GenOnReconBodyObjectType,
	) {
		const firstSettlement = await this.settleService.getSingleSettlement(
			userId,
			firstRecord.order_id,
		);

		if (!firstSettlement) {
			throw new Error(
				`Settlement not found for order ID: ${firstRecord.order_id}. Cannot establish reconciliation context.`,
			);
		}

		const { context } = firstSettlement.reconInfo;
		const transactionId = context?.transaction_id;
		const messageId = context?.message_id;

		if (!transactionId || !messageId) {
			throw new Error(
				`Transaction ID or Message ID is missing in the settlement for order ID: ${firstRecord.order_id}.`,
			);
		}

		return { transactionId, messageId };
	}

	/**
	 * Aggregates input data with DB records and performs item-level validations.
	 * @param onReconData The raw reconciliation data from the API payload.
	 * @param dbSettlements The settlement records fetched from the database for this batch.
	 * @returns The aggregated and validated data.
	 */
	private _aggregateAndValidateItems(
		onReconData: GenOnReconBodyObjectType[],
		dbSettlements: SettleType[],
	): OnReconAggregateObj[] {
		// Create a Map for efficient O(1) lookups instead of using find() in a loop.
		const onReconDataMap = new Map(
			onReconData.map((data) => [data.order_id, data]),
		);

		return dbSettlements.map((settlement) => {
			const { order_id } = settlement;
			const reconData = onReconDataMap.get(order_id);

			// VALIDATION 1: All recon orders from the DB must be present in the API payload.
			if (!reconData) {
				throw new Error(
					`Mismatch: Settlement for order ID ${order_id} exists in the batch, but was not found in your provided data.`,
				);
			}

			// VALIDATION 2: All recon states must be 'RECEIVED_PENDING'.
			if (settlement.reconInfo.recon_status !== "RECEIVED_PENDING") {
				throw new Error(
					`Invalid Status: The settlement for order ID ${order_id} has a status of '${settlement.reconInfo.recon_status}' but must be 'RECEIVED_PENDING'.`,
				);
			}

			return {
				settlement,
				onReconData: reconData,
				orderId: order_id,
			};
		});
	}
}
