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
		const { limit, skip, counterparty_id, ...query } = queryData;
		return await Settle.find({
			...query,
			$or: [
				{ receiver_id: counterparty_id },
				{ collector_id: counterparty_id },
			],
		})
			.skip(skip)
			.limit(limit)
			.sort({ createdAt: -1 });
	}

	async insertSettlementList(settlements: z.infer<typeof SettleSchema>[]) {
		return await Settle.insertMany(settlements);
	}

	async updateSettlement(
		userId: string,
		orderId: string,
		settlement: Partial<z.infer<typeof SettleSchema>>,
	) {
		return await Settle.findOneAndUpdate(
			{ user_id: userId, order_id: orderId },
			{ $set: settlement },
			{ new: true },
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
	async getSettlementByContextAndOrderId(
		txn_id: string,
		message_id: string,
		order_id: string,
	) {
		const settlement = await Settle.findOne({
			"context.transaction_id": txn_id,
			"context.message_id": message_id,
			order_id: order_id,
		});
		return settlement;
	}
	async updateSettlementByOnSettle(
		txn_id: string,
		message_id: string,
		orderId: string,
		settlement: z.infer<typeof SettleSchema>,
	) {
		return await Settle.findOneAndUpdate(
			{
				"context.transaction_id": txn_id,
				"context.message_id": message_id,
				order_id: orderId,
			},
			{ $set: settlement },
			{ new: true },
		);
	}
}

// add list of counterparty
