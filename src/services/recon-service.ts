import {
	ReconRepository,
	ReconQueryParams,
} from "../repositories/recon-repository";
import { ReconType } from "../schema/models/recon-schema";
import { TransactionService } from "./transaction-serivce";
import { UserService } from "./user-service";
import { GetReconsQuery } from "../types/recon-params";

export class ReconDbService {
	constructor(
		private reconRepo: ReconRepository,
		private userService: UserService,
		private transactionService: TransactionService,
	) {}

	async getRecons(userId: string, queryParams: GetReconsQuery) {
		// Validate user exists
		const userExists = await this.userService.checkUserById(userId);
		if (!userExists) {
			throw new Error(`User with ID ${userId} not found`);
		}

		const {
			page = 1,
			limit = 10,
			order_id,
			settlement_id,
			recon_status,
			due_date_from,
			due_date_to,
			sort_by = "createdAt",
			sort_order = "desc",
		} = queryParams;

		const skip = (page - 1) * limit;

		// Build repository query params
		const repoQueryParams: ReconQueryParams = {
			user_id: userId,
			skip,
			limit,
			order_id,
			settlement_id,
			recon_status,
			due_date_from,
			due_date_to,
			sort_by,
			sort_order,
			group_by_recon: queryParams.group_by_recon || true,
		};

		// Get recons and total count
		const [recons, totalCount] = await Promise.all([
			this.reconRepo.findWithQuery(repoQueryParams),
			this.reconRepo.getCountWithQuery({
				user_id: userId,
				order_id,
				settlement_id,
				recon_status,
				due_date_from,
				due_date_to,
			}),
		]);

		return {
			recons: recons.data,
			pagination: {
				total: totalCount,
				page,
				limit,
				totalPages: Math.ceil(totalCount / limit),
			},
		};
	}

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
