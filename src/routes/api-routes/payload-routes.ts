import { Router } from "express";
import rateLimiter from "../../middlewares/rate-limiter";
import { schemaValidator } from "../../controller/validation-controller";
import { container } from "../../di/container";
import { sendSuccess } from "../../utils/resUtils";
import { rsfAuditLogger } from "../../middlewares/rsf-audit-logger";
import { requireJsonContent } from "../../middlewares/http-validations";

const payloadRouter = Router();

payloadRouter.post(
	"/:action",
	requireJsonContent,
	rateLimiter,
	rsfAuditLogger,
	schemaValidator,
	container.rsfRequestController.rsfPayloadHandler,
	container.userController.userValidationMiddleware,
	container.payloadController.nonRsfpayloadHandler,
	(req, res) => {
		const { action } = req.params;
		return sendSuccess(res, {}, `Action ${action} processed successfully`);
	},
);
export default payloadRouter;
