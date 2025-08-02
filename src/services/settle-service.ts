import { SettleRepository } from "../repositories/settle-repository";
import { GetSettlementsQuerySchema } from "../types/settle-params";
import { UserService } from "./user-service";
import { z } from "zod";
import logger from "../utils/logger";
import { OrderService } from "./order-service";
import { OrderType } from "../schema/models/order-schema";
import { SettleType } from "../schema/models/settle-schema";
import { UserType } from "../schema/models/user-schema";
import { calculateSettlementDetails } from "../utils/tax-utils";

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
		if (!(await this.userService.checkUserById(userId))) {
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

	async prepareSettlements(userId: string, orderIds: string[]) {
		settleLogger.info("Preparing settlement data for user", {
			userId,
			orderIds,
		});
		if (!(await this.userService.checkUserById(userId))) {
			throw new Error("User not found");
		}
		const userConfig = await this.userService.getUserById(userId);
		const settles: SettleType[] = [];
		for (const orderId of orderIds) {
			if (!(await this.orderService.checkUniqueOrder(userId, orderId))) {
				throw new Error(
					`Order with ID ${orderId} not found for user ${userId}`
				);
			}
			const order = (await this.orderService.getUniqueOrders(
				userId,
				orderId
			)) as OrderType;
			const settleData = this.prepareSingleSettlement(order, userConfig);
			settles.push(settleData);
		}
		if (settles.length === 0) {
			throw new Error("No settlements to prepare");
		}
		const result = await this.settleRepo.insertSettlementList(settles);
		settleLogger.info("Settlements prepared successfully", {
			userId,
			orderIds,
		});
		return result;
	}

	prepareSingleSettlement(order: OrderType, userConfig: UserType): SettleType {
		const { commission, tax, inter_np_settlement } = calculateSettlementDetails(
			order,
			userConfig
		);
		return {
			order_id: order.order_id,
			user_id: order.user_id,
			collector_id: order.collected_by === "BAP" ? order.bap_id : order.bpp_id,
			receiver_id: order.collected_by === "BAP" ? order.bpp_id : order.bap_id,
			total_order_value: order.quote.total_order_value, // calc
			commission: commission, // calc
			tax: tax, // calc
			withholding_amount: order.withholding_amount,
			inter_np_settlement: inter_np_settlement, // calc
			provider_id: order.provider_id,
			due_date: new Date(),
			status: "PREPARED",
		};
	}
}
