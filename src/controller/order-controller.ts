import { Request, Response } from "express";
import { UserService } from "../services/user-service";
import logger from "../utils/logger";
import { getLoggerMeta } from "../utils/utility";
import { OrderService } from "../services/order-service";
import {
	GetOrderParamsType,
	GetOrdersQuerySchema,
} from "../types/order-params";
import z from "zod";
import { validateUserId } from "../types/user-id-type";

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
			orderLogger.info("Fetching all orders", getLoggerMeta(req));
			const user_id = req.params.userId;

			if (!validateUserId(user_id)) {
				orderLogger.error("Valid User ID is required", getLoggerMeta(req));
				res.status(400).json({ message: "Valid User ID is required" });
				return;
			}
			const validationResult = GetOrdersQuerySchema.safeParse(req.query);
			if (!validationResult.success) {
				orderLogger.error(
					"Invalid query parameters",
					getLoggerMeta(req),
					validationResult.error,
				);
				res.status(400).json({
					message: "Invalid query parameters",
					errors: z.treeifyError(validationResult.error),
				});
				return;
			}

			const userExists = await this.orderService.checkUserById(user_id);
			if (!userExists) {
				return res
					.status(400)
					.json({ message: "User does not exist with this User ID" });
			}
			const query: GetOrderParamsType = {
				page: validationResult.data.page ?? 1,
				limit: validationResult.data.limit ?? 50,
				...validationResult.data,
			};
			// Fetch matching orders
			const orders = await this.orderService.getOrders(query, user_id);
			orderLogger.info("Orders fetched successfully", getLoggerMeta(req));
			res.status(200).json(orders);
		} catch (error: any) {
			orderLogger.error("Error fetching orders", getLoggerMeta(req), error);
			res.status(500).json({ message: error.message });
		}
	};
}
