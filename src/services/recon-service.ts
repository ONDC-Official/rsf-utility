import { ReconRepository } from "../repositories/recon-repository";
import { ReconType } from "../schema/models/recon-schema";
import { TransactionService } from "./transaction-serivce";
import { UserService } from "./user-service";

export class ReconDbService {
	constructor(
		private reconRepo: ReconRepository,
		private userService: UserService,
		private transactionService: TransactionService,
	) {}

	getReconById(userId: string, orderId: string) {
		return this.reconRepo.findByUserAndOrder(userId, orderId);
	}

	async createReconOrOverride(data: ReconType) {
		const existingRecon = await this.getReconById(data.user_id, data.order_id);
		if (existingRecon) {
			return this.reconRepo.updateRecon(existingRecon._id.toString(), data);
		} else {
			return this.reconRepo.createRecon(data);
		}
	}

	async checkReconExists(user_id: string, order_id: string) {
		return await this.reconRepo.existsByUserAndOrder(user_id, order_id);
	}

	async getReconByTransaction(dbId: string) {
		return await this.reconRepo.findByTransactionId(dbId);
	}

	async updateData(
		userId: string,
		orderId: string,
		reconData: Partial<ReconType>,
	) {
		return await this.reconRepo.updateByUserAndOrder(
			userId,
			orderId,
			reconData,
		);
	}
}
