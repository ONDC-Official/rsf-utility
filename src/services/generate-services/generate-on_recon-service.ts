import { ReconType } from "../../schema/models/recon-schema";
import { SettleType } from "../../schema/models/settle-schema";
import { GenOnReconBodyObjectType } from "../../types/generate-recon-types";
import { checkPerfectAck } from "../../utils/ackUtils";
import logger from "../../utils/logger";
import { createOnReconPayload } from "../../utils/on_recon_utils/generate-on-recon-payload";
import { ReconDbService } from "../recon-service";
import { TransactionService } from "../transaction-serivce";
import { UserService } from "../user-service";

const onReconLogger = logger.child("generate-on-recon-service");

export type OnReconAggregateObj = {
	recon: ReconType;
	onReconData: GenOnReconBodyObjectType;
	orderId: string;
};

export class GenerateOnReconService {
	constructor(
		private readonly reconService: ReconDbService,
		private readonly userService: UserService,
		private readonly transactionService: TransactionService,
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
		const firstData = await this._getReconContext(userId, onReconData[0]);

		const aggregatedData = await this.validateAndAggregateReconData(
			userId,
			firstData.reconPayload._id.toString(),
			onReconData,
		);

		onReconLogger.info("On-recon data validated and aggregated successfully.", {
			userId,
		});

		const reconPayload = firstData.reconPayload;

		return createOnReconPayload(aggregatedData, userConfig, reconPayload);
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
		dbId: string,
		onReconData: GenOnReconBodyObjectType[],
	): Promise<OnReconAggregateObj[]> {
		onReconLogger.info("Validating on-recon data batch.", {
			userId,
			count: onReconData.length,
		});

		if (!onReconData || onReconData.length === 0) {
			throw new Error("Reconciliation data cannot be empty.");
		}

		// 2. Fetch all settlements from the DB that are part of this transaction batch.
		const dbRecons = await this.reconService.getReconByTransaction(dbId);

		// 4. Perform detailed validation on each item and aggregate the results.
		return this._aggregateAndValidateItems(onReconData, dbRecons);
	}

	/**
	 * Fetches the initial settlement to establish the transaction context (transaction_id, message_id).
	 */
	private async _getReconContext(
		userId: string,
		firstRecord: GenOnReconBodyObjectType,
	) {
		const firstRecon = await this.reconService.getReconById(
			userId,
			firstRecord.order_id,
		);

		if (!firstRecon) {
			throw new Error(
				`Reconciliation record not found for order ID: ${firstRecord.order_id}. Cannot establish reconciliation context.`,
			);
		}

		const { transaction_db_ids } = firstRecon;

		if (!transaction_db_ids || transaction_db_ids.length === 0) {
			throw new Error(
				`No transaction DB IDs found for order ID: ${firstRecord.order_id}. Cannot establish reconciliation context.`,
			);
		}

		const latestId = transaction_db_ids[transaction_db_ids.length - 1];
		const completeReconPayload =
			await this.transactionService.getReconById(latestId);
		if (!completeReconPayload) {
			throw new Error(
				`Complete reconciliation payload not found for transaction DB ID: ${latestId}. Cannot establish reconciliation context.`,
			);
		}
		const { transaction_id, message_id } = completeReconPayload.context || {};
		return {
			transactionId: transaction_id,
			messageId: message_id,
			reconPayload: completeReconPayload,
		};
	}

	/**
	 * Aggregates input data with DB records and performs item-level validations.
	 * @param onReconData The raw reconciliation data from the API payload.
	 * @param dbSettlements The settlement records fetched from the database for this batch.
	 * @returns The aggregated and validated data.
	 */
	private _aggregateAndValidateItems(
		onReconData: GenOnReconBodyObjectType[],
		dbRecons: ReconType[],
	): OnReconAggregateObj[] {
		// Create a Map for efficient O(1) lookups instead of using find() in a loop.
		const onReconDataMap = new Map(
			onReconData.map((data) => [data.order_id, data]),
		);

		return dbRecons.map((recon) => {
			const order_id = recon.order_id;
			const reconData = onReconDataMap.get(order_id);

			// VALIDATION 1: All recon orders from the DB must be present in the API payload.
			if (!reconData) {
				throw new Error(
					`Mismatch: Settlement for order ID ${order_id} exists in the batch, but was not found in your provided data.`,
				);
			}

			// VALIDATION 2: All recon states must be 'RECEIVED_PENDING'.
			if (recon.recon_status !== "RECEIVED_PENDING") {
				throw new Error(
					`Invalid Status: The settlement for order ID ${order_id} has a status of '${recon.recon_status}' but must be 'RECEIVED_PENDING'.`,
				);
			}

			return {
				recon,
				onReconData: reconData,
				orderId: order_id,
			};
		});
	}
}
