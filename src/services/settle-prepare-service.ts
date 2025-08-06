import { ISettlementStrategy } from "../strategies/iprepare-settlements";
import { SettlementStrategyOptions } from "../strategies/settlement-stratergy-options";
import { UserConfigStrategy } from "../strategies/user-config-strat";
import { OrderService } from "./order-service";
import { SettleDbManagementService } from "./settle-service";
import { UserService } from "./user-service";

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
