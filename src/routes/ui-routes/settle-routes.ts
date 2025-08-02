import { Router } from "express";
import { container } from "../../di/container";

const settleRouter = Router();

settleRouter.get("/:userId", container.settleController.getSettlements); // all(counterNPId(calc),)
settleRouter.post(
	"/:userId/prepare",
	container.settleController.prepareSettlement
); // same to
settleRouter.post("/:userId/generate", async (req, res) => {}); // same collector and receiver and 100 limit
export default settleRouter;
