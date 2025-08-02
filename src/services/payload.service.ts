import { JSONPath } from "jsonpath-plus";

export const extractFields = (
  payload: any,
  paths: Record<string, string>
): Record<string, any> => {
  const result: Record<string, any> = {};

  for (const [key, path] of Object.entries(paths)) {
    try {
      const value = JSONPath({ path, json: payload });

      if (Array.isArray(value)) {
        // Handle empty or single-item arrays
        if (value.length === 0) {
          result[key] = "";
        } else {
          result[key] = value.length === 1 ? value[0] : value;
        }
      } else {
        result[key] = value ?? "";
      }
    } catch (err) {
      console.error(`Error extracting key "${key}" from path "${path}":`);
      result[key] = "";
    }
  }
  return result;
};