import { OrderType } from "../schema/models/order-schema";
import { SettleType } from "../schema/models/settle-schema";
import { ISettlementStrategy } from "./iprepare-settlements";
import { ReconDataOptions } from "./settlement-stratergy-options";
import { v4 as uuidv4 } from "uuid";

export class ReconPrepareStrategy
	implements ISettlementStrategy<ReconDataOptions>
{
	prepare(order: OrderType, options: ReconDataOptions): Promise<SettleType> {
		// This strategy would typically prepare a settlement based on the provided recon data
		// For now, we will just return a placeholder SettleType object
		return Promise.resolve({
			order_id: order.order_id,
			user_id: order.user_id,
			settlement_id: uuidv4(),
			collector_id: order.collected_by === "BAP" ? order.bap_id : order.bpp_id,
			receiver_id: order.collected_by === "BAP" ? order.bpp_id : order.bap_id,
			total_order_value: order.quote.total_order_value,
			commission:
				options.data.on_recon_breakdown?.commission ||
				options.data.recon_breakdown.commission,
			collector_settlement: 0,
			tds:
				options.data.on_recon_breakdown?.tds ||
				options.data.recon_breakdown.tds,
			tcs:
				options.data.on_recon_breakdown?.tcs ||
				options.data.recon_breakdown.tcs,
			withholding_amount: order.withholding_amount ?? 0,
			inter_np_settlement:
				options.data.on_recon_breakdown?.amount ||
				options.data.recon_breakdown.amount,
			provider_id: order.provider_id,
			due_date: options.data.due_date || new Date(),
			type: "NP-NP",
			status: "PREPARED",
			provider_status: "PREPARED",
			self_status: "PREPARED",
			transaction_db_ids: [],
		});
	}
}
