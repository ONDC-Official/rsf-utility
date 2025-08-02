import { Request, Response } from "express";
import { UserService } from "../services/user-service";
import logger from "../utils/logger";
import { getLoggerMeta } from "../utils/utility";
import { OrderService } from "../services/order-service";

const orderLogger = logger.child("order-controller");

export class OrderController {
	constructor(private orderService: OrderService) {}
	createOrder = async (req: Request, res: Response) => {
		try {
			const body = req.body;
			orderLogger.info("Creating order", getLoggerMeta(req), body);
			const order = await this.orderService.createOrder(body);
			res.status(201).json(order);
		} catch (error: any) {
			orderLogger.error("Error creating order", getLoggerMeta(req), error);
			res.status(400).json({ message: error.message });
		}
	};
	getOrders = async (req: Request, res: Response) => {
		try {
			const queryParams = req.query;
			orderLogger.info("Fetching all users", getLoggerMeta(req));
			const users = await this.orderService.getOrders(queryParams);
			res.status(200).json(users);
		} catch (error: any) {
			orderLogger.error("Error fetching users", getLoggerMeta(req), error);
			res.status(500).json({ message: error.message });
		}
	};
}
