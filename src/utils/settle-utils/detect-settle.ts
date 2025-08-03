import { SettleType } from "../../schema/models/settle-schema";

export const detectSettleType = (payload: any): SettleType["type"] => {
	if (!payload || !payload.message || !payload.message.settlement) {
		throw new Error("Invalid payload structure for detecting settle type");
	}
	return payload.message.settlement.type as SettleType["type"];
};
