import { Router } from "express";
import payloadRouter from "./payload-routes";

const apiRoutes = Router();

apiRoutes.use("/", payloadRouter);

export default apiRoutes;
