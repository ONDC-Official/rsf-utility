import { Router } from "express";
import { container } from "../../di/container";
import { optionalCsvUploadMiddleware } from "../../middlewares/csv-upload";

const settleRouter = Router();

settleRouter.get("/:userId", container.settleController.getSettlements); // all(counterNPId(calc),)
settleRouter.post(
	"/:userId/prepare",
	container.settlePrepareController.prepareSettlement,
);
// Update settlement - supports both JSON body and CSV file upload
settleRouter.patch(
	"/:userId",
	optionalCsvUploadMiddleware, // Handles both CSV uploads and JSON requests
	container.settleController.updateSettlements,
);

export default settleRouter;
