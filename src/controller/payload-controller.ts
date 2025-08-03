import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import { getLoggerMeta } from "../utils/utility";
import { orderJsonPathMap } from "../utils/json-path";
import { OrderService } from "../services/order-service";
import { extractFields } from "../services/payload-service";

export class PayloadController {
	constructor(private orderService: OrderService) {}

	nonRsfPayloadHandler = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const payload = req.body;
		const { bap_user_id, bpp_user_id } = res.locals;
		const extracted = extractFields(payload, orderJsonPathMap);
		const quotePriceValue = parseFloat(extracted.quote?.price?.value || "0");
		const feeAmount = parseFloat(extracted.buyer_finder_fee_amount || "0");
		const feeType = extracted.buyer_finder_fee_type;

		if (feeType === "percent") {
			extracted.buyer_finder_fee_amount = (quotePriceValue * feeAmount) / 100;
		} else {
			extracted.buyer_finder_fee_amount = feeAmount;
		}
		const userIds = [bap_user_id, bpp_user_id].filter(Boolean);

		for (const user_id of userIds) {
			const order_id = extracted.order_id;
			const extractedUpdatedAt = extracted.updated_at;

			const existingOrder = await this.orderService.getUniqueOrders(
				user_id,
				order_id
			);

			if (existingOrder) {
				const existingUpdatedAt = existingOrder.updated_at;

				if (extractedUpdatedAt > existingUpdatedAt.toISOString()) {
					await this.orderService.updateOrder(user_id, order_id, {
						...extracted,
						user_id,
					});

					logger.info(
						`Order updated for user_id=${user_id}, order_id=${order_id}`,
						getLoggerMeta(req)
					);
				} else {
					logger.info(
						`Skipping update: existing order is newer or same for user_id=${user_id}, order_id=${order_id}`,
						getLoggerMeta(req)
					);
				}
			} else {
				// await this.orderService.createOrder({
				//   ...extracted,
				//   user_id,
				// });

				logger.info(
					`New order created for user_id=${user_id}, order_id=${order_id}`,
					getLoggerMeta(req)
				);
			}
		}

		logger.info("Payload handler completed", getLoggerMeta(req));
		next();
	};
}
