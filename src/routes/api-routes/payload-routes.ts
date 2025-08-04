import { Router } from "express";
import rateLimiter from "../../middlewares/rate-limiter";
import { schemaValidator } from "../../controller/validation-controller";
import { container } from "../../di/container";
import { sendSuccess } from "../../utils/resUtils";

const payloadRouter = Router();

payloadRouter.post(
	"/:action",
	rateLimiter,
	schemaValidator,
	container.userController.userValidationMiddleware,
	container.rsfController.rsfPayloadHandler,
	container.payloadController.nonRsfpayloadHandler,
	(req, res) => {
		const { action } = req.params;
		return sendSuccess(res, {}, `Action ${action} processed successfully`);
		// res.status(200).json({
		// 	message: `Action ${action} processed successfully`,
		// });
	},
);
export default payloadRouter;
