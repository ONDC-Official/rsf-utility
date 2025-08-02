import onCancelSchema from "./retail/on-cancel";
import onConfirmSchema from "./retail/on-confirm";
import onStatusSchema from "./retail/on-status";
import onUpdateSchema from "./retail/on-update";
import logger from "../utils/logger";
import settleSchema from "./rsf/v2.0/settle";
import onSettleSchema from "./rsf/v2.0/on-settle";
import reconSchema from "./rsf/v2.0/recon";
import onReconSchema from "./rsf/v2.0/on-recon";
import reportSchema from "./rsf/v2.0/report";
import onReportSchema from "./rsf/v2.0/on-report";
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
		case "settle":
			return settleSchema;
		case "on_settle":
			return onSettleSchema;
		case "recon":
			return reconSchema;
		case "on_recon":
			return onReconSchema;
		case "report":
			return reportSchema;
		case "on_report":
			return onReportSchema;
		default:
			logger.warning("Action not found", { action });
			return undefined;
	}
}
