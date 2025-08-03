import { OrderType } from "../../schema/models/order-schema";
import { UserType } from "../../schema/models/user-schema";
import logger from "../logger";

export function calculateSettlementDetails(
	order: OrderType,
	userConfig: UserType
) {
	// ! TODO: Implement proper settlement calculations
	logger.warning(
		"Using dummy values for settlement calculations, please implement proper logic"
	);
	return {
		commission: 1,
		tax: 1,
		inter_np_settlement: 1,
	};
}
