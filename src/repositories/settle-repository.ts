import { z } from "zod";
import { GetSettlementsQuerySchema } from "../types/query-params/settle.query.type";
import { Settle } from "../db/models/settle-model";

export class SettleRepository {
	async findWithQuery(queryData: {
		user_id: string;
		skip: number;
		limit: number;
		counterparty_id?: string;
		order_id?: string;
		status?: string;
	}) {
		return await Settle.find({
			...queryData,
			$or: [
				{ receiver_id: queryData.counterparty_id },
				{ collector_id: queryData.counterparty_id },
			],
		})
			.skip(queryData.skip)
			.limit(queryData.limit)
			.sort({ createdAt: -1 });
	}
}

// add list of counterparty
