import { string } from "zod";
import { OrderType } from "../../schema/models/order-schema";
import { UserType } from "../../schema/models/user-schema";
import { TaxEngine } from "../../services/tax-engine";
import logger from "../logger";

export function calculateSettlementDetails(
	order: OrderType,
	userConfig: UserType,
) {
	// ! TODO: Implement proper settlement calculations
	// logger.warning(
	// 	"Using dummy values for settlement calculations, please implement proper logic"
	// );
	const taxEngine = new TaxEngine(order, userConfig);

	const tcs = taxEngine.calculateTcs();
	const tds = taxEngine.calculateTds();
	const total_tax = tcs + tds;

	const commission = taxEngine.collectorSettlement();
	const inter_np_settlement = taxEngine.interNpSettlement();

	return {
		commission: commission,
		tds: tds,
		tcs: tcs,
		inter_np_settlement: inter_np_settlement,
	};
}
