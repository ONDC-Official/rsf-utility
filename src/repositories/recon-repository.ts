import { z } from "zod";
import { Recon } from "../db/models/recon-model";
import { ReconSchema } from "../schema/models/recon-schema";
import { ENUMS } from "../constants/enums";

export interface ReconQueryParams {
	user_id: string;
	skip?: number;
	limit?: number;
	order_id?: string;
	settlement_id?: string;
	recon_status?: string;
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
	 * Update recon status by user_id and order_id
	 */
	async updateStatus(
		user_id: string,
		order_id: string,
		recon_status: keyof typeof ENUMS.INTERNAL_RECON_STATUS,
	) {
		return await Recon.findOneAndUpdate(
			{ user_id, order_id },
			{ $set: { recon_status } },
			{ new: true },
		);
	}

	/**
	 * Update multiple recon records by settlement_id
	 */
	async updateBySettlementId(
		settlement_id: string,
		updateData: Partial<z.infer<typeof ReconSchema>>,
	) {
		return await Recon.updateMany({ settlement_id }, { $set: updateData });
	}

	/**
	 * Check if recon exists for user_id and order_id
	 */
	async existsByUserAndOrder(user_id: string, order_id: string) {
		return await Recon.exists({ user_id, order_id });
	}

	/**
	 * Check if recon exists for settlement_id
	 */
	async existsBySettlementId(settlement_id: string) {
		return await Recon.exists({ settlement_id });
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

	/**
	 * Get recon records grouped by status
	 */
	async getStatusBreakdown(user_id: string): Promise<ReconAggregateResult> {
		const pipeline = [
			{ $match: { user_id } },
			{
				$facet: {
					total_count: [{ $count: "count" }],
					status_breakdown: [
						{
							$group: {
								_id: "$recon_status",
								count: { $sum: 1 },
							},
						},
					],
					overdue_count: [
						{
							$match: {
								due_date: { $lt: new Date() },
								recon_status: {
									$in: [
										ENUMS.INTERNAL_RECON_STATUS.SENT_PENDING,
										ENUMS.INTERNAL_RECON_STATUS.RECEIVED_PENDING,
									],
								},
							},
						},
						{ $count: "count" },
					],
				},
			},
		];

		const result = await Recon.aggregate(pipeline);
		const data = result[0];

		return {
			total_count: data.total_count[0]?.count || 0,
			status_breakdown: data.status_breakdown || [],
			overdue_count: data.overdue_count[0]?.count || 0,
		};
	}

	/**
	 * Get recon records that are pending for a specific time period
	 */
	async getPendingRecons(days: number, user_id?: string) {
		const cutoffDate = new Date();
		cutoffDate.setDate(cutoffDate.getDate() - days);

		const query: any = {
			createdAt: { $lte: cutoffDate },
			recon_status: {
				$in: [
					ENUMS.INTERNAL_RECON_STATUS.SENT_PENDING,
					ENUMS.INTERNAL_RECON_STATUS.RECEIVED_PENDING,
				],
			},
		};

		if (user_id) query.user_id = user_id;

		return await Recon.find(query).sort({ createdAt: 1 });
	}

	/**
	 * Get recon summary statistics for a user
	 */
	async getReconSummary(user_id: string, days?: number) {
		const matchStage: any = { user_id };

		if (days) {
			const fromDate = new Date();
			fromDate.setDate(fromDate.getDate() - days);
			matchStage.createdAt = { $gte: fromDate };
		}

		const pipeline = [
			{ $match: matchStage },
			{
				$group: {
					_id: null,
					total_recons: { $sum: 1 },
					sent_pending: {
						$sum: {
							$cond: [
								{
									$eq: [
										"$recon_status",
										ENUMS.INTERNAL_RECON_STATUS.SENT_PENDING,
									],
								},
								1,
								0,
							],
						},
					},
					sent_accepted: {
						$sum: {
							$cond: [
								{
									$eq: [
										"$recon_status",
										ENUMS.INTERNAL_RECON_STATUS.SENT_ACCEPTED,
									],
								},
								1,
								0,
							],
						},
					},
					sent_rejected: {
						$sum: {
							$cond: [
								{
									$eq: [
										"$recon_status",
										ENUMS.INTERNAL_RECON_STATUS.SENT_REJECTED,
									],
								},
								1,
								0,
							],
						},
					},
					received_pending: {
						$sum: {
							$cond: [
								{
									$eq: [
										"$recon_status",
										ENUMS.INTERNAL_RECON_STATUS.RECEIVED_PENDING,
									],
								},
								1,
								0,
							],
						},
					},
					received_accepted: {
						$sum: {
							$cond: [
								{
									$eq: [
										"$recon_status",
										ENUMS.INTERNAL_RECON_STATUS.RECEIVED_ACCEPTED,
									],
								},
								1,
								0,
							],
						},
					},
					received_rejected: {
						$sum: {
							$cond: [
								{
									$eq: [
										"$recon_status",
										ENUMS.INTERNAL_RECON_STATUS.RECEIVED_REJECTED,
									],
								},
								1,
								0,
							],
						},
					},
					avg_settlement_amount: {
						$avg: "$recon_breakdown.type.amount",
					},
					total_settlement_amount: {
						$sum: "$recon_breakdown.type.amount",
					},
				},
			},
		];

		const result = await Recon.aggregate(pipeline);
		return result[0] || {};
	}

	/**
	 * Get recon records by date range
	 */
	async getReconsByDateRange(
		user_id: string,
		start_date: Date,
		end_date: Date,
		status?: string,
	) {
		const query: any = {
			user_id,
			createdAt: {
				$gte: start_date,
				$lte: end_date,
			},
		};

		if (status) query.recon_status = status;

		return await Recon.find(query).sort({ createdAt: -1 });
	}

	/**
	 * Bulk update recon statuses
	 */
	async bulkUpdateStatus(
		filter: any,
		recon_status: keyof typeof ENUMS.INTERNAL_RECON_STATUS,
	) {
		return await Recon.updateMany(filter, { $set: { recon_status } });
	}

	/**
	 * Get distinct values for a field
	 */
	async getDistinctValues(field: string, user_id?: string) {
		const query = user_id ? { user_id } : {};
		return await Recon.distinct(field, query);
	}
}
