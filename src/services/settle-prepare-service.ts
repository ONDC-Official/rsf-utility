import { ENUMS } from "../constants/enums";
import { OrderType } from "../schema/models/order-schema";
import { SettleType } from "../schema/models/settle-schema";
import { ISettlementStrategy } from "../strategies/iprepare-settlements";
import { ReconPrepareStrategy } from "../strategies/recon-strat";
import { SettlementStrategyOptions } from "../strategies/settlement-stratergy-options";
import { UserConfigStrategy } from "../strategies/user-config-strat";
import logger from "../utils/logger";
import { OrderService } from "./order-service";
import { ReconDbService } from "./recon-service";
import { SettleDbManagementService } from "./settle-service";
import { UserService } from "./user-service";

const settleLogger = logger.child("settle-prepare-service");

export class SettlePrepareService {
	constructor(
		private userService: UserService,
		private orderService: OrderService,
		private settleService: SettleDbManagementService,
		private reconService: ReconDbService,
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

	private async prepareSettlementsGeneric<T extends SettlementStrategyOptions>(
		userId: string,
		orderIds: string[],
		getStrategyAndOptions: (orderId: string) => Promise<{
			strategy: ISettlementStrategy<T>;
			options: T;
		}>,
		logLabel: string,
	) {
		settleLogger.info(`Preparing settlement data (${logLabel})`, {
			userId,
			orderIds,
		});

		if (!(await this.userService.checkUserById(userId))) {
			throw new Error("User not found");
		}

		const settles: SettleType[] = [];

		for (const orderId of orderIds) {
			if (!(await this.orderService.checkUniqueOrder(userId, orderId))) {
				throw new Error(
					`Order with ID ${orderId} not found for user ${userId}`,
				);
			}

			const { strategy, options } = await getStrategyAndOptions(orderId);

			const settleData = await this.prepareSettlement(
				userId,
				orderId,
				strategy,
				options,
			);

			await this.orderService.updateOrder(userId, orderId, {
				settle_status: ENUMS.INTERNAL_ORDER_SETTLE_STATUS.SETTLE,
			});

			settles.push(settleData);
		}

		if (settles.length === 0) {
			throw new Error("No settlements to prepare");
		}

		const result = await this.settleService.insertSettlementList(settles);

		settleLogger.info(`Settlements (${logLabel}) prepared successfully`, {
			userId,
			orderIds,
		});

		return result;
	}

	public async prepareSettlementsWithUser(userId: string, orderIds: string[]) {
		const userConfig = await this.userService.getUserById(userId);
		return this.prepareSettlementsGeneric(
			userId,
			orderIds,
			async (_orderId) => {
				return {
					strategy: new UserConfigStrategy(),
					options: {
						type: "USER_CONFIG",
						profile: userConfig,
					},
				};
			},
			"USER_CONFIG",
		);
	}

	public async prepareSettlementsWithRecon(userId: string, orderIds: string[]) {
		return this.prepareSettlementsGeneric(
			userId,
			orderIds,
			async (orderId) => {
				const reconData = await this.reconService.getReconById(userId, orderId);
				if (!reconData) {
					throw new Error(
						`Recon data for order ${orderId} not found for user ${userId}`,
					);
				}
				return {
					strategy: new ReconPrepareStrategy(),
					options: {
						type: "RECON_DATA",
						data: reconData,
					},
				};
			},
			"RECON_DATA",
		);
	}
}
