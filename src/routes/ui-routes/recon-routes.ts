import { Router } from "express";
import { container } from "../../di/container";

const reconRouter = Router();
const reconController = container.reconController;

reconRouter.get("/:userId", reconController.getRecons);
reconRouter.post("/:userId/move-to-ready", reconController.moveReconsToReady);

// router.get("/:userId/:orderId", reconController.getReconById);

export default reconRouter;
