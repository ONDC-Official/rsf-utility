import { Router } from "express";
import { container } from "../../di/container";
import { schemaValidator } from "../../controller/validation-controller";
import { rsfAuditLogger } from "../../middlewares/rsf-audit-logger";
const triggerRoutes = Router();

triggerRoutes.post(
	"/:userId/:action",
	rsfAuditLogger,
	schemaValidator,
	container.triggerController.handleTrigger,
);

export default triggerRoutes;
