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
	constructor(order: OrderType, userConfig: UserType) {
		this.tcs = (userConfig.tcs ?? 0) / 100;
		this.tds = (userConfig.tds ?? 0) / 100;
		this.domain = order?.domain ?? "";
		this.collected_by = order?.collected_by ?? "";
		this.total_order_value = order.quote.total_order_value ?? 0;
		this.msn = order.msn ?? true;
		this.buyer_finder_fee_amount = order.buyer_finder_fee_amount ?? 0;
		this.item_tax = order.item_tax ?? 0;
	}
	calculateTcs() {
		if(this.collected_by === "BAP" && !this.msn && this.domain !== "ONDC:RET11") {
			return (this.total_order_value - this.item_tax) * this.tcs;
		}
		return 0;
}
	calculateTds() {
		if (this.collected_by === "BAP" && !this.msn) {
				return (this.total_order_value - this.item_tax) * this.tds;
		} 
		return 0;
	}
	interNpSettlement() {
        if(this.collected_by === "BAP") {
            if(!this.msn){
                if (this.domain === "ONDC:RET11") {
                    return this.total_order_value - this.buyer_finder_fee_amount -  this.calculateTcs() - this.calculateTds() - this.item_tax;
                } else {
                    return this.total_order_value - this.buyer_finder_fee_amount - this.calculateTcs() - this.calculateTds();
                }
            } else {
                if(this.domain === "ONDC:RET11") {
                    return this.total_order_value - this.buyer_finder_fee_amount - this.calculateTcs() - this.calculateTds(); 
                } else {
                    return this.total_order_value - this.buyer_finder_fee_amount - this.calculateTcs() - this.calculateTds(); 
                }
            }
    } else {
        if(!this.msn){
            if(this.domain === "ONDC:RET11"){
                return this.buyer_finder_fee_amount + this.calculateTcs() + this.calculateTds() + this.item_tax;
            } else {
                return this.buyer_finder_fee_amount + this.calculateTcs() + this.calculateTds()
            }
        } else {
            if(this.domain === "ONDC:RET11"){
                return this.buyer_finder_fee_amount + this.calculateTcs() + this.calculateTds()
            } else {
                return this.buyer_finder_fee_amount + this.calculateTcs() + this.calculateTds()
            }
        }

    }
}

	collectorSettlement(){
    if(this.collected_by === "BAP"){
        if(!this.msn){
            if(this.domain === "ONDC:RET11"){
                return this.buyer_finder_fee_amount + this.calculateTcs() + this.calculateTds()
            } else {
                return this.buyer_finder_fee_amount + this.calculateTcs() + this.calculateTds()
            }
        } else {
            if(this.domain === "ONDC:RET11"){
                return this.buyer_finder_fee_amount + this.calculateTcs() + this.calculateTds()
            }
            else {
                return this.buyer_finder_fee_amount + this.calculateTcs() + this.calculateTds()
            }
        }
    } else {
        if(!this.msn){
            if(this.domain === "ONDC:RET11"){
                return this.total_order_value - this.interNpSettlement()
            } else {
                return this.total_order_value - this.interNpSettlement()   
            }
        } else {
            if(this.domain === "ONDC:RET11"){
                return this.total_order_value - this.interNpSettlement()
            } else {
                return this.total_order_value - this.interNpSettlement()
            }
        }
    }
    }
}
