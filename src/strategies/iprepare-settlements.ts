import { OrderType } from "../schema/models/order-schema";
import { SettleType } from "../schema/models/settle-schema";
import { SettlementStrategyOptions } from "./settlement-stratergy-options";

export interface ISettlementStrategy<T extends SettlementStrategyOptions> {
	/**
	 * Prepares a settlement from an order.
	 * @param order The order document to be processed.
	 * @param options A STRONGLY TYPED options object that matches the strategy.
	 * @returns A promise that resolves to the prepared settlement data.
	 */
	prepare(order: OrderType, options: T): Promise<SettleType>;
}
