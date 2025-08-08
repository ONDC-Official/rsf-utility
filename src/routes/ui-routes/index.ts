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

const uiRoutes = Router();

uiRoutes.use("/orders", orderRoutes);
uiRoutes.use("/users", userRoutes);
uiRoutes.use("/upload", uploadRoutes);
uiRoutes.use("/settle", settleRouter);
uiRoutes.use("/trigger", triggerRoutes);
uiRoutes.use("/rsf-payloads", rsfPayloadRoutes);
uiRoutes.use("/generate", generateRoutes);
uiRoutes.use("/auth", authRoutes);
uiRoutes.use("/recon", reconRouter);
export default uiRoutes;
