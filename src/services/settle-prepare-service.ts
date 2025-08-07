import { OrderType } from "../schema/models/order-schema";
import { SettleType } from "../schema/models/settle-schema";
import { ISettlementStrategy } from "../strategies/iprepare-settlements";
import { SettlementStrategyOptions } from "../strategies/settlement-stratergy-options";
import { UserConfigStrategy } from "../strategies/user-config-strat";
import logger from "../utils/logger";
import { OrderService } from "./order-service";
import { SettleDbManagementService } from "./settle-service";
import { UserService } from "./user-service";

const settleLogger = logger.child("settle-prepare-service");

export class SettlePrepareService {
	constructor(
		private userService: UserService,
		private orderService: OrderService,
		private settleService: SettleDbManagementService,
	) {}

	public async prepareSettlement<T extends SettlementStrategyOptions>(
		userId: string,
		orderId: string,
		strategy: ISettlementStrategy<T>,
		options: T,
	) {
		const order = await this.orderService.getUniqueOrders(userId, orderId);
		const settlement = await strategy.prepare(order, options);
		return settlement;
	}

	async prepareSettlementsWithUser(userId: string, orderIds: string[]) {
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
					`Order with ID ${orderId} not found for user ${userId}`,
				);
			}
			const order = (await this.orderService.getUniqueOrders(
				userId,
				orderId,
			)) as OrderType;
			const userStrategy = new UserConfigStrategy();
			const settleData = await this.prepareSettlement(
				userId,
				orderId,
				userStrategy,
				{
					type: "USER_CONFIG",
					profile: userConfig,
				},
			);
			await this.orderService.updateOrder(userId, orderId, {
				settle_status: true,
			});
			settles.push(settleData);
		}
		if (settles.length === 0) {
			throw new Error("No settlements to prepare");
		}
		const result = await this.settleService.insertSettlementList(settles);
		settleLogger.info("Settlements prepared successfully", {
			userId,
			orderIds,
		});
		return result;
	}

	// private sampleUsage() {
	// 	// Example usage of the prepareSettlement method
	// 	const userId = "user123";
	// 	const orderId = "order456";
	// 	const strategy = new UserConfigStrategy();

	// 	this.prepareSettlement(userId, orderId, strategy, {
	// 		type: "USER_CONFIG",
	// 		profile: {
	// 			userId: userId,
	// 			extraDetails: {
	// 				self: 100,
	// 				provider: 200,
	// 				inter_np: 50,
	// 			},
	// 		},
	// 	})
	// 		.then((settlement) => {
	// 			console.log("Settlement prepared:", settlement);
	// 		})
	// 		.catch((error) => {
	// 			console.error("Error preparing settlement:", error);
	// 		});
	// }
}
