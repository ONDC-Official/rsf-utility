import { JSONPath } from "jsonpath-plus";
import { OrderType } from "../schema/models/order-schema";

export const extractFields = (
	payload: any,
	paths: Record<string, string>,
): OrderType => {
	const result: Partial<OrderType> = {};

	let tempQuote: any = null;
	let tempBuyerFinderFeeType: string = "";
	let tempBuyerFinderFeeAmountRaw: any = 0;
	let tempWitholdingAmount: number = 0;

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
					const npType = Array.isArray(resolvedValue)
						? resolvedValue[0]?.trim().toUpperCase()
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

						tempQuote = {
							total_order_value: priceValue,
							breakup,
						};

						result[key as keyof OrderType] = tempQuote;

						const numericFee = Number(tempBuyerFinderFeeAmountRaw || 0);
						const fee =
							tempBuyerFinderFeeType === "percent"
								? (priceValue * numericFee) / 100
								: numericFee;

						result["buyer_finder_fee_amount"] = fee;
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

				default:
					result[key as keyof OrderType] =
						resolvedValue !== undefined && resolvedValue !== null
							? resolvedValue
							: "";
			}
		} catch (err) {
			console.error(`Error extracting "${key}" from "${path}":`);
		}
	}

	return result as OrderType;
};
