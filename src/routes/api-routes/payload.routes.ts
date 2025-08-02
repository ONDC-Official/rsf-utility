import { Router } from "express";
import rateLimiter from "../../middlewares/rate-limiter";
import { schemaValidator } from "../../controller/validation-controller";
import { payloadHandler } from "../../controller/payload-controller";
import { userValidation } from "../../controller/user-controller-shivang";

const payloadRouter = Router();

payloadRouter.post("/:action", rateLimiter, schemaValidator,userValidation,payloadHandler, (req, res) => {
	const { action } = req.params;
	res.status(200).json({
		message: `Action ${action} processed successfully`,
	});
});
export default payloadRouter;
