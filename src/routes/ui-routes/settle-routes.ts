import { Router } from "express";
import { container } from "../../di/container";

const settleRouter = Router();

settleRouter.get("/:userId", container.settleController.getSettlements); // all(counterNPId(calc),)
settleRouter.post(
	"/:userId/prepare",
	container.settleController.prepareSettlement,
);
settleRouter.post(
	"/:userId/generate/np-np",
	container.settleController.generateNpNpSettlement,
); // same collector and receiver and 100 limit

settleRouter.post(
	"/:userId/generate/misc",
	container.settleController.generateMiscSettlement,
);

settleRouter.post(
	"/:userId/generate/nil",
	container.settleController.generateNilSettlement,
);
export default settleRouter;
