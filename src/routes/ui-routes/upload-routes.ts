import { Router } from "express";
import rateLimiter from "../../middlewares/rate-limiter";
import { schemaValidator } from "../../controller/file-validation-controller";
import { jsonFileUploadMiddleware } from "../../middlewares/file-upload";

const uploadRouter = Router();

uploadRouter.post(
  "/upload",
  rateLimiter,
  jsonFileUploadMiddleware,
  schemaValidator,
  (req, res) => {
    res.json({ success: true, insertedCount: (req as any).insertedCount });
  }
);
export default uploadRouter;
