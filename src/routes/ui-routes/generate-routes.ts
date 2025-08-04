import { Router } from "express";
import { container } from "../../di/container";

const generateRoutes = Router();

generateRoutes.post(
	"/:userId/settle/np-np",
	container.generateRsfController.handleSettleNpNp,
);
generateRoutes.post(
	"/:userId/settle/misc",
	container.generateRsfController.handleSettleMisc,
);
generateRoutes.post(
	"/:userId/settle/nil",
	container.generateRsfController.handleSettleNil,
);
// generateRoutes.post("/:userId/recon", container.generateRsfController.handleRecon);
// generateRoutes.post("/:userId/on_recon", container.generateRsfController.handleOnRecon);
// generateRoutes.post("/:userId/report", container.generateRsfController.handleReport);
export default generateRoutes;
