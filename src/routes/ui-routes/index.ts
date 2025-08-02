import { Router } from "express";
import userRoutes from "./user.routes";

const uiRoutes = Router();

uiRoutes.use("/users", userRoutes);

export default uiRoutes;
