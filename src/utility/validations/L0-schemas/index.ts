import { onCancelSchema } from "./retail/on-cancel";
import { onConfirmSchema } from "./retail/on-confirm";
import { onStatusSchema } from "./retail/on-status";
import { onUpdateSchema } from "./retail/on-update";


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
            throw new Error("Action not found" + action);
    }
}
