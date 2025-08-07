import {
	TransactionModel,
	ReconModel,
	OnReconModel,
	SettleModel,
	OnSettleModel,
} from "../db/models/transaction-model";

export type TransactionAction = "recon" | "on_recon" | "settle" | "on_settle";

export class TransactionRepository {
	// CREATE operations
	async createTransaction(data: any) {
		return await TransactionModel.create(data);
	}

	async createReconTransaction(data: any) {
		return await ReconModel.create(data);
	}

	async getReconById(id: string) {
		return await ReconModel.findById(id);
	}

	async createOnReconTransaction(data: any) {
		return await OnReconModel.create(data);
	}

	async createSettleTransaction(data: any) {
		return await SettleModel.create(data);
	}

	async createOnSettleTransaction(data: any) {
		return await OnSettleModel.create(data);
	}

	// READ operations
	async findById(id: string) {
		return await TransactionModel.findById(id);
	}

	async findByContext(
		action: TransactionAction,
		transactionId: string,
		messageId: string,
	) {
		return await TransactionModel.findOne({
			"context.action": action,
			"context.transaction_id": transactionId,
			"context.message_id": messageId,
		});
	}

	async findSettleByContext(transactionId: string, messageId: string) {
		return await SettleModel.findOne({
			"context.transaction_id": transactionId,
			"context.message_id": messageId,
		});
	}

	async findReconByContext(transactionId: string, messageId: string) {
		return await ReconModel.findOne({
			"context.transaction_id": transactionId,
			"context.message_id": messageId,
		});
	}

	async deleteById(id: string) {
		return await TransactionModel.findByIdAndDelete(id);
	}
}
