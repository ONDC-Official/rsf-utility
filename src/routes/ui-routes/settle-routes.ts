import { Router } from "express";
import { container } from "../../di/container";

const settleRouter = Router();

settleRouter.get("/:userId", container.settleController.getSettlements); // all(counterNPId(calc),)
settleRouter.post(
	"/:userId/prepare",
	container.settlePrepareController.prepareSettlement,
);
settleRouter.patch("/:userId", container.settleController.updateSettlements); // update settlement by userId
export default settleRouter;
