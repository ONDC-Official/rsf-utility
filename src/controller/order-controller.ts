import { Request, Response } from "express";
import { UserService } from "../services/user-service";
import logger from "../utils/logger";
import { getLoggerMeta } from "../utils/utility";
import { OrderService } from "../services/order-service";
import {
	GetOrderParamsType,
	GetOrdersQuerySchema,
	PatchOrderBody,
} from "../types/order-params";
import z from "zod";
import { validateUserId } from "../types/user-id-type";
import { sendError, sendSuccess } from "../utils/resUtils";
import { or } from "ajv/dist/compile/codegen";

const orderLogger = logger.child("order-controller");

export class OrderController {
	constructor(private orderService: OrderService) {}
	createOrder = async (req: Request, res: Response) => {
		try {
			const body = req.body;
			orderLogger.info("Creating order", getLoggerMeta(req), body);
			const order = await this.orderService.createOrder(body);
			return sendSuccess(res, order, undefined, 201);
			// res.status(201).json(order);
		} catch (error: any) {
			orderLogger.error("Error creating order", getLoggerMeta(req), error);
			return sendError(res, "INTERNAL_ERROR", undefined, {
				error: error.message,
			});
			// res.status(400).json({ message: error.message });
		}
	};
	getOrders = async (req: Request, res: Response) => {
		try {
			orderLogger.info("Fetching all orders", getLoggerMeta(req));
			const user_id = req.params.userId;

			if (!validateUserId(user_id)) {
				orderLogger.error("Valid User ID is required", getLoggerMeta(req));
				return sendError(res, "INVALID_QUERY_PARAMS", undefined, {
					message: "Valid User ID is required",
				});
				// res.status(400).json({ message: "Valid User ID is required" });
				// return;
			}
			const validationResult = GetOrdersQuerySchema.safeParse(req.query);
			if (!validationResult.success) {
				orderLogger.error(
					"Invalid query parameters",
					getLoggerMeta(req),
					validationResult.error,
				);

				return sendError(res, "INVALID_QUERY_PARAMS", undefined, {
					message: "Invalid query parameters",
					errors: z.treeifyError(validationResult.error),
				});
				// res.status(400).json({
				// 	message: "Invalid query parameters",
				// 	errors: z.treeifyError(validationResult.error),
				// });
				// return;
			}

			const userExists = await this.orderService.checkUserById(user_id);
			if (!userExists) {
				return sendError(res, "INVALID_QUERY_PARAMS", undefined, {
					message: "User does not exist with this User ID",
				});
				// return res
				// 	.status(400)
				// 	.json({ message: "User does not exist with this User ID" });
			}
			const query: GetOrderParamsType = {
				page: validationResult.data.page ?? 1,
				limit: validationResult.data.limit ?? 50,
				...validationResult.data,
			};
			// Fetch matching orders
			const orders = await this.orderService.getOrders(query, user_id);
			orderLogger.info("Orders fetched successfully", getLoggerMeta(req));
			return sendSuccess(res, orders, "Orders fetched successfully");
			// res.status(200).json(orders);
		} catch (error: any) {
			orderLogger.error("Error fetching orders", getLoggerMeta(req), error);

			return sendError(res, "INTERNAL_ERROR", undefined, {
				error: error.message,
			});
			// res.status(500).json({ message: error.message });
		}
	};
	updateOrders = async (req: Request, res: Response) => {
		const userId = req.params.id;
		const body = req.body;

		try {
			if (!validateUserId(userId)) {
				return sendError(res, "INVALID_QUERY_PARAMS", undefined, {
					message: "Valid User ID is required",
				});
			}

			const validationResult = PatchOrderBody.safeParse(body);
			if (!validationResult.success) {
				orderLogger.error(
					"Invalid request body",
					getLoggerMeta(req),
					validationResult.error,
				);

				return sendError(res, "INVALID_REQUEST_BODY", undefined, {
					message: "Invalid request body",
					errors: z.treeifyError(validationResult.error),
				});
			}

			orderLogger.info("Updating user", getLoggerMeta(req), { userId, body });
			const updatedUser = await this.orderService.updateOrders(userId, body);
			return sendSuccess(res, updatedUser);
		} catch (err) {
			orderLogger.error("Error updating orders", getLoggerMeta(req), err);
			return sendError(res, "INTERNAL_ERROR", undefined, {
				message: "Failed to update orders",
			});
		}
	};
}
