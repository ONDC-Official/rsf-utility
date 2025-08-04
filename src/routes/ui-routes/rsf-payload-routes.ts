import { Router } from "express";
import { container } from "../../di/container";

const rsfPayloadRoutes = Router();

rsfPayloadRoutes.get("/", container.rsfPayloadDbController.getPayloads);

export default rsfPayloadRoutes;
