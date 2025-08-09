import { Router } from "express";
import userRoutes from "./user-routes";
import uploadRoutes from "./upload-routes";
import settleRouter from "./settle-routes";
import orderRoutes from "./order-routes";
import triggerRoutes from "./trigger-routes";
import rsfPayloadRoutes from "./rsf-payload-routes";
import generateRoutes from "./generate-routes";
import authRoutes from "./auth-routes";
import reconRouter from "./recon-routes";
import verifyClientToken from "../../middlewares/auth-handler";

const uiRoutes = Router();

uiRoutes.use("/orders", verifyClientToken, orderRoutes);
uiRoutes.use("/users", verifyClientToken, userRoutes);
uiRoutes.use("/upload", verifyClientToken, uploadRoutes);
uiRoutes.use("/settle", verifyClientToken, settleRouter);
uiRoutes.use("/trigger", verifyClientToken, triggerRoutes);
uiRoutes.use("/rsf-payloads", verifyClientToken, rsfPayloadRoutes);
uiRoutes.use("/generate", verifyClientToken, generateRoutes);
uiRoutes.use("/auth", authRoutes);
uiRoutes.use("/recon", verifyClientToken, reconRouter);
export default uiRoutes;
