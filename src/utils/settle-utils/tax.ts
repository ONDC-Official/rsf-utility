import { OrderType } from "../../schema/models/order-schema";
import { UserType } from "../../schema/models/user-schema";
import logger from "../logger";

export function calculateSettlementDetails(
	order: OrderType,
	userConfig: UserType,
) {
	// ! TODO: Implement proper settlement calculations
	// logger.warning(
	// 	"Using dummy values for settlement calculations, please implement proper logic"
	// );

	const tcs: number = Number(userConfig?.tcs) ?? 0;
	const tds: number = Number(userConfig?.tds) ?? 0;
	const commission = order.buyer_finder_fee_amount ?? 0;
	const total_order_value = order?.quote?.total_order_value ?? 0;
	const domain = order?.domain ?? "";
	const role = userConfig?.role ?? "";
	const tax: number = 0;

	const inter_np_settlement = total_order_value - commission - tax;

	return {
		commission: commission,
		tax: 1,
		inter_np_settlement: inter_np_settlement,
	};
}
