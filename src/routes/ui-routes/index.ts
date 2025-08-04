import { Router } from "express";
import userRoutes from "./user-routes";
import uploadRoutes from "./upload-routes";
import settleRouter from "./settle-routes";
import orderRoutes from "./order-routes";
import triggerRoutes from "./trigger-routes";
import rsfPayloadRoutes from "./rsf-payload-routes";

const uiRoutes = Router();

uiRoutes.use("/orders", orderRoutes);
uiRoutes.use("/users", userRoutes);
uiRoutes.use("/upload", uploadRoutes);
uiRoutes.use("/settle", settleRouter);
uiRoutes.use("/trigger", triggerRoutes);
uiRoutes.use("/rsf-payloads", rsfPayloadRoutes);
export default uiRoutes;
