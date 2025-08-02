import { OrderType } from "../../schema/models/order-schema";
import { UserType } from "../../schema/models/user-schema";

export function calculateSettlementDetails(
	order: OrderType,
	userConfig: UserType
) {
	return {
		commission: 1,
		tax: 1,
		inter_np_settlement: 1,
	};
}
