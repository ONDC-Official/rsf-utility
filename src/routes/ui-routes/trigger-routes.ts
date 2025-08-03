import { Router } from "express";
import { container } from "../../di/container";
import { schemaValidator } from "../../controller/validation-controller";
const triggerRoutes = Router();

triggerRoutes.post(
	"/:userId/:action",
	schemaValidator,
	container.triggerController.handleTrigger,
);

export default triggerRoutes;
