import { Router } from "express";
import rateLimiter from "../../middlewares/rate-limiter";
import { schemaValidator } from "../../controller/file-validation-controller";
import { jsonFileUploadMiddleware } from "../../middlewares/file-upload";
import logger from "../../utils/logger";

const uploadRouter = Router();

uploadRouter.post(
  "/",
  rateLimiter,
  jsonFileUploadMiddleware,
  schemaValidator,
  (req, res) => {
    logger.info(`File upload successful`);
    res.json({ success: true, insertedCount: (req as any).insertedCount });
  }
);
export default uploadRouter;
