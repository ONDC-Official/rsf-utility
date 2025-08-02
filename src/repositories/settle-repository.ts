import { z } from "zod";
import { GetSettlementsQuerySchema } from "../types/settle-params";
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

	async insertSettlementList(
		settlements: z.infer<typeof GetSettlementsQuerySchema>[]
	) {
		return await Settle.insertMany(settlements);
	}
}

// add list of counterparty
