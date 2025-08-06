import { OrderType } from "../schema/models/order-schema";
import { SettleType } from "../schema/models/settle-schema";
import { ISettlementStrategy } from "./iprepare-settlements";
import { ProfileConfigOptions } from "./settlement-stratergy-options";

export class UserConfigStrategy
	implements ISettlementStrategy<ProfileConfigOptions>
{
	prepare(
		order: OrderType,
		options: ProfileConfigOptions,
	): Promise<SettleType> {
		throw new Error("Method not implemented.");
	}
}
