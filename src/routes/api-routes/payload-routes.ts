import { Router } from "express";
import rateLimiter from "../../middlewares/rate-limiter";
import { schemaValidator } from "../../controller/validation-controller";
import { container } from "../../di/container";

const payloadRouter = Router();

payloadRouter.post(
	"/:action",
	rateLimiter,
	schemaValidator,
	container.userController.userValidationMiddleware,
	container.rsfRequestController.rsfPayloadHandler,
	container.payloadController.nonRsfPayloadHandler,
	(req, res) => {
		const { action } = req.params;
		res.status(200).json({
			message: `Action ${action} processed successfully`,
		});
	},
);
export default payloadRouter;
