import { OrderType } from "../schema/models/order-schema";
import { SettleType } from "../schema/models/settle-schema";
import { calculateSettlementDetails } from "../utils/settle-utils/tax";
import { ISettlementStrategy } from "./iprepare-settlements";
import { ProfileConfigOptions } from "./settlement-stratergy-options";
import { v4 as uuidv4 } from "uuid";

export class UserConfigStrategy
	implements ISettlementStrategy<ProfileConfigOptions>
{
	// prepare(
	// 	order: OrderType,
	// 	options: ProfileConfigOptions,
	// ): Promise<SettleType> {
	// 	throw new Error("Method not implemented.");
	// }

	async prepare(
		order: OrderType,
		options: ProfileConfigOptions,
	): Promise<SettleType> {
		const { commission, tax, inter_np_settlement } = calculateSettlementDetails(
			order,
			options.profile,
		);

		return {
			order_id: order.order_id,
			user_id: order.user_id,
			settlement_id: uuidv4(),
			collector_id: order.collected_by === "BAP" ? order.bap_id : order.bpp_id,
			receiver_id: order.collected_by === "BAP" ? order.bpp_id : order.bap_id,
			total_order_value: order.quote.total_order_value, // calc
			commission: commission, // calc
			collector_settlement: 0,
			tax: tax, // calc
			withholding_amount: order.withholding_amount ?? 0,
			inter_np_settlement: inter_np_settlement, // calc
			provider_id: order.provider_id,
			due_date: new Date(),
			type: "NP-NP",
			status: "PREPARED",
			provider_status: "PREPARED",
			self_status: "PREPARED",
			transaction_db_ids: [],
		};
	}
}
