import { Router } from "express";
import authController from "../../controller/auth-controller";

const authRoutes = Router();

authRoutes.post("/sign-token", authController.signToken);
export default authRoutes;
