import { OrderType } from "../schema/models/order-schema";
import { UserType } from "../schema/models/user-schema";
import logger from "../utils/logger";

const taxLogger = logger.child("tax-service");

export class TaxEngine {
	tcs: number;
	tds: number;
	domain: string;
	collected_by: string;
	total_order_value: number;
	msn: boolean;
	buyer_finder_fee_amount: number;
	item_tax: number;
	tcs_applicability: string
	tds_applicability: string
	constructor(order: OrderType, userConfig: UserType) {
		this.tcs = (userConfig.np_tcs ?? 0) / 100;
		this.tds = (userConfig.np_tds ?? 0) / 100;
		this.domain = order?.domain ?? "";
		this.collected_by = order?.collected_by ?? "";
		this.total_order_value = order.quote.total_order_value ?? 0;
		this.msn = order.msn ?? true;
		this.buyer_finder_fee_amount = order.buyer_finder_fee_amount ?? 0;
		this.item_tax = order.item_tax ?? 0;
		this.tcs_applicability = userConfig.tcs_applicability
		this.tds_applicability = userConfig.tds_applicability
	}
	calculateTcs() {
		const shouldApplyTcs =
		this.tcs_applicability === "BOTH" ||
		(this.tcs_applicability === "ISN" && !this.msn) ||
		(this.tcs_applicability === "MSN" && this.msn);

	return shouldApplyTcs
		? (this.total_order_value - this.item_tax) * this.tcs
		: 0;
	}
	calculateTds() {
		const shouldApplyTds =
		this.tds_applicability === "BOTH" ||
		(this.tds_applicability === "ISN" && !this.msn) ||
		(this.tds_applicability === "MSN" && this.msn);

	return shouldApplyTds
		? (this.total_order_value - this.item_tax) * this.tds
		: 0;
	}
	interNpSettlement() {
		const tcs = this.calculateTcs();
		const tds = this.calculateTds();
		const isRet11 = this.domain === "ONDC:RET11";
		const addItemTax = !this.msn && isRet11;

		if (this.collected_by === "BAP") {
			let amount =
				this.total_order_value - this.buyer_finder_fee_amount - tcs - tds;
			if (addItemTax) amount -= this.item_tax;
			return amount;
		} else {
			let amount = this.buyer_finder_fee_amount;
			return amount;
		}
	}

	collectorSettlement() {
		const isBap = this.collected_by === "BAP";

		if (isBap) {
			if(this.domain === "ONDC:RET11" && !this.msn){
				return this.buyer_finder_fee_amount + this.calculateTcs() + this.calculateTds() + this.item_tax
			} else {
				return (
				this.buyer_finder_fee_amount + this.calculateTcs() + this.calculateTds()
			)
			}
		}

		return this.total_order_value - this.interNpSettlement();
	}
}
