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
	recon_status?: string[] | string;
	due_date_from?: Date;
	due_date_to?: Date;
	sort_by?: string;
	sort_order?: "asc" | "desc";
	group_by_recon?: boolean;
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
	 * Finds Recon documents based on query parameters.
	 * Can return a flat list or documents grouped by the first transaction ID.
	 * @param queryParams - The parameters for filtering, sorting, and pagination.
	 * @returns A promise that resolves to an object with the data and total count.
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
			group_by_recon = false, // Default to false for backward compatibility
		} = queryParams;

		// Build the initial match query for both find and aggregate
		const matchQuery: any = { user_id };
		if (order_id) matchQuery.order_id = order_id;
		if (settlement_id) matchQuery.settlement_id = settlement_id;
		if (recon_status) {
			if (Array.isArray(recon_status)) {
				matchQuery.recon_status = { $in: recon_status };
			} else {
				matchQuery.recon_status = recon_status;
			}
		}
		if (due_date_from || due_date_to) {
			matchQuery.due_date = {};
			if (due_date_from) matchQuery.due_date.$gte = new Date(due_date_from);
			if (due_date_to) matchQuery.due_date.$lte = new Date(due_date_to);
		}

		// --- GROUPING LOGIC ---
		if (group_by_recon) {
			// Ensure we only process documents that have transaction IDs
			matchQuery.transaction_db_ids = { $exists: true, $ne: [] };

			const pipeline: any[] = [
				// Stage 1: Filter documents based on the query parameters.
				{ $match: matchQuery },
				// Stage 2: Sort documents BEFORE grouping. This makes operators
				// like $first and $last deterministic.
				{ $sort: { [sort_by]: sort_order === "asc" ? 1 : -1 } },
				// Stage 3: Group documents by the first transaction ID.
				{
					$group: {
						_id: { $arrayElemAt: ["$transaction_db_ids", 0] },
						// Capture the value of the field we are sorting by from the first document in the group.
						sortKey: { $first: `$${sort_by}` },
						// Push all documents belonging to this group into an array.
						recons: { $push: "$$ROOT" },
					},
				},
				// Stage 4: Sort the GROUPS themselves based on the captured sortKey.
				{ $sort: { sortKey: sort_order === "asc" ? 1 : -1 } },
				// Stage 5: Use $facet to run two parallel pipelines: one for getting the
				// total count of groups and another for paginating the results.
				{
					$facet: {
						paginatedResults: [
							{ $skip: skip },
							{ $limit: limit },
							// Reshape the output for a cleaner response
							{
								$project: {
									_id: 0, // remove the default _id
									transaction_id: "$_id",
									recons: "$recons",
									count: { $size: "$recons" },
								},
							},
						],
						totalCount: [{ $count: "count" }],
					},
				},
			];

			const results = await Recon.aggregate(pipeline);
			console.warn("Aggregation results:", results);
			logger.debug("Aggregation results:", JSON.stringify(results, null, 2));
			const data = results[0].paginatedResults;
			const total =
				results[0].totalCount.length > 0 ? results[0].totalCount[0].count : 0;

			return { data, total };
		} else {
			// --- ORIGINAL FIND LOGIC ---
			const sort: any = { [sort_by]: sort_order === "asc" ? 1 : -1 };

			const data = await Recon.find(matchQuery)
				.sort(sort)
				.skip(skip)
				.limit(limit)
				.lean();
			const total = await Recon.countDocuments(matchQuery);

			return { data, total };
		}
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
