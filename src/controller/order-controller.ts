import { Request, Response } from "express";
import { UserService } from "../services/user-service";
import logger from "../utils/logger";
import { getLoggerMeta } from "../utils/utility";
import { OrderService } from "../services/order-service";
import { sendError, sendSuccess } from "../utils/resUtils";

const orderLogger = logger.child("order-controller");

export class OrderController {
	constructor(
		private orderService: OrderService,
		private userService: UserService,
	) {}
	createOrder = async (req: Request, res: Response) => {
		try {
			const body = req.body;
			orderLogger.info("Creating order", getLoggerMeta(req), body);
			const order = await this.orderService.createOrder(body);
			return sendSuccess(res, order, "Order created successfully", 201);
			// res.status(201).json(order);
		} catch (error: any) {
			orderLogger.error("Error creating order", getLoggerMeta(req), error);
			return sendError(res, "ORDER_CREATION_FAILED", undefined, {
				error: error instanceof Error ? error.message : String(error),
			});
			// res.status(400).json({ message: error.message });
		}
	};
	getOrders = async (req: Request, res: Response) => {
		try {
			const { user_id, state } = req.query;
			const allowedStates = ["Completed", "not:Completed"];
			const query: any = {};

			// Validate and add user_id to query
			if (!user_id) {
				return sendError(res, "INVALID_QUERY_PARAMS", undefined, {
					message: "User Id is not being sent as query parameter",
				});
				// return res
				// 	.status(400)
				// 	.json({ message: "User Id is not being sent as query parameter" });
			}
			const userExists = await this.userService.checkUserById(
				user_id as string,
			);
			if (!userExists) {
				return sendError(res, "USER_NOT_FOUND", undefined, {
					message: "User does not exist with this User ID",
				});

				// return res
				// 	.status(400)
				// 	.json({ message: "User does not exist with this User ID" });
			}

			query.user_id = user_id;

			// Validate and add state to query
			if (state) {
				if (!allowedStates.includes(state as string)) {
					return sendError(res, "VALIDATION_FAILED", undefined, {
						message: `Invalid state. Allowed values are: ${allowedStates.join(", ")}`,
					});
					//

					// return res.status(400).json({
					// 	message: `Invalid state. Allowed values are: ${allowedStates.join(", ")}`,
					// });
				}

				query.state =
					state === "Completed" ? "Completed" : { $ne: "Completed" };
			}

			// Fetch orders
			const orders = await this.orderService.getOrders(query);
			// res.status(200).json(orders);

			return sendSuccess(res, orders, "Orders fetched successfully", 200);
		} catch (error: any) {
			orderLogger.error("Error fetching orders", getLoggerMeta(req), error);
			// res.status(500).json({ message: error.message });
			return sendError(res, "INTERNAL_ERROR", undefined, {
				error: error instanceof Error ? error.message : String(error),
			});
		}
	};
}
