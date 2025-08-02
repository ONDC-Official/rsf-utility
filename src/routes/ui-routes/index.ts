import { Router } from "express";
import userRoutes from "./user-routes";
import uploadRoutes from "./upload-routes";

const uiRoutes = Router();

uiRoutes.use("/users", userRoutes);
uiRoutes.use("/upload", uploadRoutes);

export default uiRoutes;
