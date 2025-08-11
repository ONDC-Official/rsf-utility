import { OrderType } from "../schema/models/order-schema";
import { SettleType } from "../schema/models/settle-schema";
import { calculateSettlementDetails } from "../utils/settle-utils/tax";
import { ISettlementStrategy } from "./iprepare-settlements";
import { ProfileConfigOptions } from "./settlement-stratergy-options";
import { v4 as uuidv4 } from "uuid";

export class UserConfigStrategy
	implements ISettlementStrategy<ProfileConfigOptions>
{
	async prepare(
		order: OrderType,
		options: ProfileConfigOptions,
	): Promise<SettleType> {
		const { collector_settlement, tds, tcs, inter_np_settlement } =
			calculateSettlementDetails(order, options.profile);

		return {
			order_id: order.order_id,
			user_id: order.user_id,
			settlement_id: uuidv4(),
			collector_id: order.collected_by === "BAP" ? order.bap_id : order.bpp_id,
			receiver_id: order.collected_by === "BAP" ? order.bpp_id : order.bap_id,
			total_order_value: order.quote.total_order_value, // calc
			commission: order.buyer_finder_fee_amount, // calc
			collector_settlement: collector_settlement,
			tds: tds, // calc
			tcs: tcs, // calc
			withholding_amount: order.withholding_amount ?? 0,
			inter_np_settlement: inter_np_settlement, // calc
			provider_id: order.provider_id,
			due_date: order.due_date,
			type: "NP-NP",
			status: "PREPARED",
			provider_status: "PREPARED",
			self_status: "PREPARED",
			transaction_db_ids: [],
		};
	}
}
