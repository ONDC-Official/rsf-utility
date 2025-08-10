import { JSONPath } from "jsonpath-plus";
import { OrderType } from "../schema/models/order-schema";
import { resolve } from "path";
import duration from "iso8601-duration";
import logger from "../utils/logger";
import { pick } from "lodash";

export const extractFields = (
	payload: any,
	paths: Record<string, string>,
): OrderType => {
	const result: Partial<OrderType> = {};

	let tempQuote: any = null;
	let tempBuyerFinderFeeType: string = "";
	let tempBuyerFinderFeeAmountRaw: any = 0;
	let tempWitholdingAmount: number = 0;
	let pickup_time: any = 0;
	for (const [key, path] of Object.entries(paths)) {
		try {
			const value = JSONPath({ path, json: payload });
			const resolvedValue = Array.isArray(value)
				? value.length === 0
					? ""
					: value.length === 1
						? value[0]
						: value
				: (value ?? "");

			switch (key) {
				case "created_at":
					result.created_at = resolvedValue
						? new Date(resolvedValue)
						: new Date();
					break;

				case "updated_at":
					result.updated_at = resolvedValue
						? new Date(resolvedValue)
						: new Date();
					break;

				case "withholding_amount":
					tempWitholdingAmount =
						resolvedValue !== "" && !isNaN(resolvedValue)
							? Number(resolvedValue)
							: 0;
					result.withholding_amount = tempWitholdingAmount;
					break;

				case "np_type":
					const npType = resolvedValue
						? resolvedValue?.trim().toUpperCase()
						: null;

					result.msn = npType === "MSN";
					break;

				case "buyer_finder_fee_type":
					tempBuyerFinderFeeType = resolvedValue || "";
					(result as any)[key] =
						typeof resolvedValue === "string" ? resolvedValue : "";
					break;

				case "buyer_finder_fee_amount":
					tempBuyerFinderFeeAmountRaw = resolvedValue;
					break;
				case "pickup_time":
					 pickup_time = resolvedValue
					 break;
				case "collected_by": 
					result["collected_by"] = resolvedValue
					break;
				case "quote":
					if (typeof resolvedValue === "object" && resolvedValue !== null) {
						const priceValue = Number(resolvedValue?.price?.value || 0);

						const breakup = Array.isArray(resolvedValue.breakup)
							? resolvedValue.breakup.map((item: any) => ({
									title: String(item["@ondc/org/title_type"] || ""),
									price: Number(
										typeof item.price === "object" && item.price?.value
											? item.price.value
											: (item.price ?? 0),
									),
									id: String(item["@ondc/org/item_id"] || ""),
								}))
							: [];
						const item_ids = breakup.reduce((acc: any, item: any) => {
							if (item.title === "item") acc.push(item.id);
							return acc;
						}, []);

						tempQuote = {
							total_order_value: priceValue,
							breakup,
						};

						result[key as keyof OrderType] = tempQuote;

						const numericFee = parseFloat(tempBuyerFinderFeeAmountRaw) || 0;
						let quoteValueWithoutTax: number = 0;
						let item_tax = 0;
						for (let item of breakup) {
							if (item.title === "tax" && item_ids.includes(item.id)) {
								result["item_tax"] = (result["item_tax"] || 0) + parseFloat(item.price);
							} else quoteValueWithoutTax += item.price;
						}

						const fee =
							tempBuyerFinderFeeType === "percent"
								? (quoteValueWithoutTax * numericFee) / 100
								: numericFee;

						result["buyer_finder_fee_amount"] =
							Math.round(fee * 1.18 * 100) / 100; // Assuming 18% GST on fee
						result.withholding_amount =
							(priceValue * tempWitholdingAmount) / 100;
					} else {
						result.quote = {
							total_order_value: 0,
							breakup: [],
						};
						result.buyer_finder_fee_amount = 0;
						result.withholding_amount = 0;
					}
					break;
				case "state":
					if(resolvedValue === "Completed") {
						const durationMs = duration.toSeconds(duration.parse(result["settlement_window"] ?? "P2D")) * 1000;
						const updated_at = result["updated_at"] ?? new Date();
						if(result["settlement_basis"] === "delivery"){
							result["due_date"] = new Date(new Date(updated_at).getTime() + durationMs);
						} else {
							result["due_date"] = new Date(new Date(pickup_time).getTime() + durationMs);
						}
					}
					result["state"] = resolvedValue;
					break;
				default:
					result[key as keyof OrderType] =
						resolvedValue !== undefined && resolvedValue !== null
							? resolvedValue
							: "";
			}
		} catch (err) {
			logger.error(`Error extracting "${key}" from "${path}":`);
		}
	}

	return result as OrderType;
};
