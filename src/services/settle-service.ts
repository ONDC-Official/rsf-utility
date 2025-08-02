import { SettleRepository } from "../repositories/settle-repository";
import { GetSettlementsQuerySchema } from "../types/query-params/settle.query.type";
import { UserService } from "./user-service";
import { z } from "zod";
import logger from "../utils/logger";
import { OrderService } from "./order-service";

const settleLogger = logger.child("settle-service");
export class SettleService {
	constructor(
		private settleRepo: SettleRepository,
		private userService: UserService,
		private orderService: OrderService
	) {}

	async getSettlements(
		userId: string,
		data: z.infer<typeof GetSettlementsQuerySchema>
	) {
		settleLogger.info("Fetching settlements for user", { userId, data });
		if (await this.userService.checkUserById(userId)) {
			throw new Error("User not found");
		}

		const page = data.page ? 10 : 1;
		const limit = data.limit ? 10 : 10;
		const skip = (page - 1) * limit;
		const orderId = data.order_id;
		const status = data.status;

		return await this.settleRepo.findWithQuery({
			user_id: userId,
			skip,
			limit,
			counterparty_id: data.counterparty_id,
			order_id: orderId,
			status: status,
		});
	}

	async prepareSettlement(userId: string, orderIds: string[]) {}
}
