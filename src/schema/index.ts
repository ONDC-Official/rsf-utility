import { onCancelSchema } from "./retail/on-cancel";
import { onConfirmSchema } from "./retail/on-confirm";
import { onStatusSchema } from "./retail/on-status";
import { onUpdateSchema } from "./retail/on-update";
import logger from "../utils/logger";
export default function getSchema(action: string) {
	switch (action) {
		case "on_confirm":
			return onConfirmSchema;
		case "on_cancel":
			return onCancelSchema;
		case "on_update":
			return onUpdateSchema;
		case "on_status":
			return onStatusSchema;
		default:
			logger.warning("Action not found", { action });
			return undefined;
	}
}
