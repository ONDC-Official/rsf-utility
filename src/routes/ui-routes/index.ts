import { Router } from "express";
import userRoutes from "./user-routes";
import uploadRoutes from "./upload-routes";
import settleRouter from "./settle-routes";

const uiRoutes = Router();

uiRoutes.use("/users", userRoutes);
uiRoutes.use("/upload", uploadRoutes);
uiRoutes.use("/settle", settleRouter);
export default uiRoutes;
