import { Router } from "express";
import { container } from "../../di/container";

const settleRouter = Router();

settleRouter.get("/:userId", container.settleController.getSettlements); // all(counterNPId(calc),)
settleRouter.post(
	"/:userId/prepare",
	container.settleController.prepareSettlement,
);

export default settleRouter;
