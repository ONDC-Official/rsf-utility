import { z } from "zod";
import { Settle } from "../db/models/settle-model";
import { SettleSchema } from "../schema/models/settle-schema";

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

	async insertSettlementList(settlements: z.infer<typeof SettleSchema>[]) {
		return await Settle.insertMany(settlements);
	}

	async updateSettlement(
		userId: string,
		orderId: string,
		settlement: z.infer<typeof SettleSchema>
	) {
		return await Settle.findOneAndUpdate(
			{ user_id: userId, order_id: orderId },
			{ $set: settlement },
			{ new: true }
		);
	}

	async insertSettlement(settlement: z.infer<typeof SettleSchema>) {
		const newSettlement = new Settle(settlement);
		return await newSettlement.save();
	}

	async checkUniqueSettlement(userId: string, orderId: string) {
		return await Settle.exists({
			user_id: userId,
			order_id: orderId,
		});
	}
}

// add list of counterparty
