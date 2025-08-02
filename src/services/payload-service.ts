import { JSONPath } from "jsonpath-plus";

export const extractFields = (
  payload: any,
  paths: Record<string, string>
): Record<string, any> => {
  const result: Record<string, any> = {};

  for (const [key, path] of Object.entries(paths)) {
    try {
      const value = JSONPath({ path, json: payload });

      let resolvedValue;
      if (Array.isArray(value)) {
        if (value.length === 0) {
          resolvedValue = "";
        } else {
          resolvedValue = value.length === 1 ? value[0] : value;
        }
      } else {
        resolvedValue = value ?? "";
      }

      // Type coercion based on schema
      switch (key) {
        case "created_at":
        case "updated_at":
          result[key] = resolvedValue ? new Date(resolvedValue) : "";
          break;

        case "buyer_finder_fee_amount":
        case "withholding_amount":
          result[key] =
            resolvedValue !== "" && !isNaN(resolvedValue)
              ? Number(resolvedValue)
              : "";
          break;

        case "quote":
          if (typeof resolvedValue === "object" && resolvedValue !== null) {
            const priceValue = Number(resolvedValue?.price?.value || "0");
            const breakup = Array.isArray(resolvedValue.breakup)
              ? resolvedValue.breakup
              : [];
            result[key] = {
              total_order_value: priceValue,
              breakup,
            };
          } else {
            result[key] = {
              total_order_value: 0,
              breakup: [],
            };
          }
          break;

        default:
          result[key] = resolvedValue;
      }
    } catch (err) {
      console.error(`Error extracting key "${key}" from path "${path}":`, err);
      result[key] = "";
    }
  }

  return result;
};
