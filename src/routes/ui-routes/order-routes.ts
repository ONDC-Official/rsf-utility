import { Router } from "express";
import { container } from "../../di/container";

const orderRoutes = Router();
const orderController = container.orderController;

orderRoutes.get("/", orderController.getOrders);
export default orderRoutes;
