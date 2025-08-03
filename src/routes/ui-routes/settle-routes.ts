import { Router } from "express";
import { container } from "../../di/container";

const settleRouter = Router();

settleRouter.get("/:userId", container.settleController.getSettlements); // all(counterNPId(calc),)
settleRouter.post(
	"/:userId/prepare",
	container.settleController.prepareSettlement
);
settleRouter.post(
	"/:userId/generate",
	container.settleController.generateSettlement
); // same collector and receiver and 100 limit
export default settleRouter;
