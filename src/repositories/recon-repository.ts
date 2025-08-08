import { z } from "zod";
import { Recon } from "../db/models/recon-model";
import { ReconSchema } from "../schema/models/recon-schema";
import { ENUMS } from "../constants/enums";
import logger from "../utils/logger";

export interface ReconQueryParams {
	user_id: string;
	skip?: number;
	limit?: number;
	order_id?: string;
	settlement_id?: string;
	recon_status?: string[];
	due_date_from?: Date;
	due_date_to?: Date;
	sort_by?: string;
	sort_order?: "asc" | "desc";
}

export interface ReconAggregateResult {
	total_count: number;
	status_breakdown: Array<{
		_id: string;
		count: number;
	}>;
	overdue_count: number;
}

export class ReconRepository {
	/**
	 * Create a new recon record
	 */
	async createRecon(data: z.infer<typeof ReconSchema>) {
		logger.debug(
			`Creating new recon record for user ${data.user_id} and order ${data.order_id}`,
		);
		return await Recon.create(data);
	}

	/**
	 * override an existing recon record
	 */
	async updateRecon(id: string, data: z.infer<typeof ReconSchema>) {
		return await Recon.findByIdAndUpdate(id, data, { new: true });
	}

	/**
	 * Create multiple recon records
	 */
	async createMultipleRecon(data: z.infer<typeof ReconSchema>[]) {
		return await Recon.insertMany(data);
	}

	/**
	 * Find recon records with advanced query options
	 */
	async findWithQuery(queryParams: ReconQueryParams) {
		const {
			user_id,
			skip = 0,
			limit = 10,
			order_id,
			settlement_id,
			recon_status,
			due_date_from,
			due_date_to,
			sort_by = "createdAt",
			sort_order = "desc",
		} = queryParams;

		const query: any = { user_id };

		// Build query filters
		if (order_id) query.order_id = order_id;
		if (settlement_id) query.settlement_id = settlement_id;
		if (recon_status) query.recon_status = recon_status;

		// Date range filter
		if (due_date_from || due_date_to) {
			query.due_date = {};
			if (due_date_from) query.due_date.$gte = due_date_from;
			if (due_date_to) query.due_date.$lte = due_date_to;
		}

		// Build sort object
		const sort: any = {};
		sort[sort_by] = sort_order === "asc" ? 1 : -1;

		return await Recon.find(query).skip(skip).limit(limit).sort(sort);
	}

	/**
	 * Get total count of recon records for a user with filters
	 */
	async getCountWithQuery(
		queryParams: Omit<
			ReconQueryParams,
			"skip" | "limit" | "sort_by" | "sort_order"
		>,
	) {
		const {
			user_id,
			order_id,
			settlement_id,
			recon_status,
			due_date_from,
			due_date_to,
		} = queryParams;

		const query: any = { user_id };

		if (order_id) query.order_id = order_id;
		if (settlement_id) query.settlement_id = settlement_id;
		if (recon_status) query.recon_status = recon_status;

		if (due_date_from || due_date_to) {
			query.due_date = {};
			if (due_date_from) query.due_date.$gte = due_date_from;
			if (due_date_to) query.due_date.$lte = due_date_to;
		}

		return await Recon.countDocuments(query);
	}

	/**
	 * Find a single recon record by user_id and order_id
	 */
	async findByUserAndOrder(user_id: string, order_id: string) {
		return await Recon.findOne({ user_id, order_id });
	}

	/**
	 * Find recon records by settlement_id
	 */
	async findBySettlementId(settlement_id: string) {
		return await Recon.find({ settlement_id });
	}

	/**
	 * Find recon records by multiple transaction DB ID
	 */
	async findByTransactionId(transaction_db_id: string) {
		return await Recon.find({
			transaction_db_ids: transaction_db_id,
		});
	}

	/**
	 * Update recon record by user_id and order_id
	 */
	async updateByUserAndOrder(
		user_id: string,
		order_id: string,
		updateData: Partial<z.infer<typeof ReconSchema>>,
	) {
		return await Recon.findOneAndUpdate(
			{ user_id, order_id },
			{ $set: updateData },
			{ new: true, runValidators: true },
		);
	}

	/**
	 * Check if recon exists for user_id and order_id
	 */
	async existsByUserAndOrder(user_id: string, order_id: string) {
		return await Recon.exists({ user_id, order_id });
	}

	/**
	 * Delete recon record by user_id and order_id
	 */
	async deleteByUserAndOrder(user_id: string, order_id: string) {
		return await Recon.findOneAndDelete({ user_id, order_id });
	}

	/**
	 * Get overdue recon records
	 */
	async getOverdueRecons(user_id?: string) {
		const query: any = {
			due_date: { $lt: new Date() },
			recon_status: {
				$in: [
					ENUMS.INTERNAL_RECON_STATUS.SENT_PENDING,
					ENUMS.INTERNAL_RECON_STATUS.RECEIVED_PENDING,
				],
			},
		};

		if (user_id) query.user_id = user_id;

		return await Recon.find(query).sort({ due_date: 1 });
	}
}
