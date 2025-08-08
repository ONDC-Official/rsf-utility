import { Router } from "express";
import { container } from "../../di/container";

const router = Router();
const reconController = container.reconController;

router.get("/:userId", reconController.getRecons);

// router.get("/:userId/:orderId", reconController.getReconById);

export default router;
