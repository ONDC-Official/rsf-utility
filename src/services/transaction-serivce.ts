import {
	TransactionRepository,
	TransactionAction,
} from "../repositories/transaction-repository";
import { ReconPayload } from "../schema/rsf/zod/recon-schema";
import { SettlePayload } from "../schema/rsf/zod/settle-schema";
import logger from "../utils/logger";

const transactionLogger = logger.child("transaction-service");

export class TransactionService {
	constructor(private transactionRepo: TransactionRepository) {}

	/**
	 * Add settle payload to transaction database
	 */
	async addSettlePayload(settleData: SettlePayload) {
		try {
			transactionLogger.info("Adding settle payload", {
				transaction_id: settleData.context?.transaction_id,
				message_id: settleData.context?.message_id,
				action: "settle",
			});

			// Validate that this is a settle action
			if (settleData.context?.action !== "settle") {
				throw new Error("Invalid action for settle payload");
			}
			const result =
				await this.transactionRepo.createSettleTransaction(settleData);

			transactionLogger.info("Settle payload added successfully", {
				transaction_id: result.context?.transaction_id,
				message_id: result.context?.message_id,
				db_id: result._id,
			});

			return result;
		} catch (error) {
			transactionLogger.error(
				"Error adding settle payload",
				{
					transaction_id: settleData.context?.transaction_id,
					message_id: settleData.context?.message_id,
					error: error instanceof Error ? error.message : "Unknown error",
				},
				error,
			);
			throw error;
		}
	}

	/**
	 * Add on_settle payload to transaction database
	 */
	async addOnSettlePayload(onSettleData: any) {
		try {
			transactionLogger.info("Adding on_settle payload", {
				transaction_id: onSettleData.context?.transaction_id,
				message_id: onSettleData.context?.message_id,
				action: "on_settle",
			});

			// Validate that this is an on_settle action
			if (onSettleData.context?.action !== "on_settle") {
				throw new Error("Invalid action for on_settle payload");
			}

			const result =
				await this.transactionRepo.createOnSettleTransaction(onSettleData);

			transactionLogger.info("On_settle payload added successfully", {
				transaction_id: result.context?.transaction_id,
				message_id: result.context?.message_id,
				db_id: result._id,
			});

			return result;
		} catch (error) {
			transactionLogger.error(
				"Error adding on_settle payload",
				{
					transaction_id: onSettleData.context?.transaction_id,
					message_id: onSettleData.context?.message_id,
					error: error instanceof Error ? error.message : "Unknown error",
				},
				error,
			);
			throw error;
		}
	}

	async addReconPayload(reconPayload: ReconPayload) {
		try {
			transactionLogger.info("Adding recon payload", {
				transaction_id: reconPayload.context?.transaction_id,
				message_id: reconPayload.context?.message_id,
				action: "recon",
			});
			// Validate that this is a recon action
			if (reconPayload.context?.action !== "recon") {
				throw new Error("Invalid action for recon payload");
			}
			const result =
				await this.transactionRepo.createReconTransaction(reconPayload);
			transactionLogger.info("Recon payload added successfully", {
				transaction_id: result.context?.transaction_id,
				message_id: result.context?.message_id,
				db_id: result._id,
			});
			return result;
		} catch (error) {
			transactionLogger.error(
				"Error adding recon payload",
				{
					transaction_id: reconPayload.context?.transaction_id,
					message_id: reconPayload.context?.message_id,
					error: error instanceof Error ? error.message : "Unknown error",
				},
				error,
			);
			throw error;
		}
	}

	/**
	 * Get transaction by database _id
	 */
	async getTransactionById(id: string): Promise<any> {
		try {
			transactionLogger.info("Retrieving transaction by ID", {
				_id: id,
			});

			const transaction = await this.transactionRepo.findById(id);

			if (!transaction) {
				transactionLogger.warning("Transaction not found", {
					transaction_id: id,
				});
				return null;
			}

			transactionLogger.info("Transaction retrieved successfully", {
				transaction_id: id,
				action: transaction.context?.action,
				message_id: transaction.context?.message_id,
			});

			return transaction;
		} catch (error) {
			transactionLogger.error(
				"Error retrieving transaction by ID",
				{
					transaction_id: id,
					error: error instanceof Error ? error.message : "Unknown error",
				},
				error,
			);
			throw error;
		}
	}

	async getReconById(id: string) {
		try {
			transactionLogger.info("Retrieving recon by ID", {
				_id: id,
			});

			const recon = await this.transactionRepo.getReconById(id);

			if (!recon) {
				transactionLogger.warning("Recon not found", {
					recon_id: id,
				});
				return null;
			}

			transactionLogger.info("Recon retrieved successfully", {
				recon_id: id,
				action: recon.context?.action,
				message_id: recon.context?.message_id,
			});

			return recon;
		} catch (error) {
			transactionLogger.error(
				"Error retrieving recon by ID",
				{
					recon_id: id,
					error: error instanceof Error ? error.message : "Unknown error",
				},
				error,
			);
			throw error;
		}
	}

	/**
	 * Get settle by transaction ID and message ID
	 */
	async getSettleByTransactionIdAndMessageId(
		transactionId: string,
		messageId: string,
	) {
		transactionLogger.info(
			"Retrieving settle by transaction ID and message ID",
			{
				transaction_id: transactionId,
				message_id: messageId,
			},
		);

		const settle = await this.transactionRepo.findSettleByContext(
			transactionId,
			messageId,
		);

		if (!settle) {
			transactionLogger.warning("Settle not found", {
				transaction_id: transactionId,
				message_id: messageId,
			});
			return null;
		}
		transactionLogger.info("Settle retrieved successfully", {
			transaction_id: transactionId,
			message_id: messageId,
		});

		return settle;
	}

	/**
	 * Delete transaction by _id (use with caution)
	 */
	async deleteTransactionById(id: string): Promise<any> {
		try {
			transactionLogger.warning("Deleting transaction by ID", { id });

			const deletedTransaction = await this.transactionRepo.deleteById(id);

			if (!deletedTransaction) {
				transactionLogger.warning("Transaction not found for deletion", { id });
				throw new Error(`Transaction with ID ${id} not found`);
			}

			transactionLogger.warning("Transaction deleted successfully", {
				id,
				transaction_id: deletedTransaction.context?.transaction_id,
				action: deletedTransaction.context?.action,
			});

			return deletedTransaction;
		} catch (error) {
			transactionLogger.error(
				"Error deleting transaction by ID",
				{
					id,
					error: error instanceof Error ? error.message : "Unknown error",
				},
				error,
			);
			throw error;
		}
	}

	async getReconByContext(transactionId: string, messageId: string) {
		transactionLogger.info("Retrieving recon by context", {
			transaction_id: transactionId,
			message_id: messageId,
		});

		const recon = await this.transactionRepo.findReconByContext(
			transactionId,
			messageId,
		);

		if (!recon) {
			transactionLogger.warning("Recon not found for context", {
				transaction_id: transactionId,
				message_id: messageId,
			});
			return null;
		}

		transactionLogger.info("Recon retrieved successfully by context", {
			transaction_id: transactionId,
			message_id: messageId,
		});

		return recon;
	}
}
