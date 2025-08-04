import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import { getLoggerMeta } from "../utils/utility";
import { orderJsonPathMap } from "../utils/json-path";
import { OrderService } from "../services/order-service";
import { extractFields } from "../services/payload-service";

export class PayloadController {
	constructor(private orderService: OrderService) {}

	nonRsfpayloadHandler = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		logger.info("Payload Handler invoked", getLoggerMeta(req));
		try {
			const payload = req.body;
			const bap_user_id = String(res.locals.bap_user_id || "");
			const bpp_user_id = String(res.locals.bpp_user_id || "");

			const extracted = extractFields(payload, orderJsonPathMap);
			const userIds = [bap_user_id, bpp_user_id].filter(Boolean);

			for (const user_id of userIds) {
				const order_id = extracted.order_id;
				const extractedUpdatedAt = new Date(extracted.updated_at);
				const checkOrder = await this.orderService.checkUniqueOrder(
					user_id,
					order_id,
				);

				if (checkOrder) {
					const existingOrder = await this.orderService.getUniqueOrders(
						user_id,
						order_id,
					);
					const existingUpdatedAt = existingOrder.updated_at;

					if (extractedUpdatedAt > existingUpdatedAt) {
						await this.orderService.updateOrder(user_id, order_id, {
							...extracted,
							user_id,
						});

						logger.info(
							`Order updated for user_id=${user_id}, order_id=${order_id}`,
							getLoggerMeta(req),
						);
					} else {
						logger.info(
							`Skipping update: existing order is newer or same for user_id=${user_id}, order_id=${order_id}`,
							getLoggerMeta(req),
						);
					}
				} else {
					await this.orderService.createOrder({
						...extracted,
						user_id,
					});

					logger.info(
						`New order created for user_id=${user_id}, order_id=${order_id}`,
						getLoggerMeta(req),
					);
				}
			}

			logger.info("Payload handler completed", getLoggerMeta(req));
			next();
		} catch (error) {
			logger.error("Error in payloadHandler", {
				...getLoggerMeta(req),
				error,
			});
			next(error); // Pass the error to Express error handler middleware
		}
	};
}
