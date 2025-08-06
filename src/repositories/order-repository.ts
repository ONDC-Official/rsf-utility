import { query } from "winston";
import { Order } from "../db/models/order-model";
import { OrderType } from "../schema/models/order-schema";
import { GetOrderParamsType } from "../types/order-params";

export class OrderRepository {
	async createOrder(data: OrderType) {
		return await Order.create(data);
	}
	async getAllOrders(queryParams: GetOrderParamsType, user_id: string) {
		const { is_completed: isCompleted, page, limit, ...rest } = queryParams;
		const cleanedQuery: Record<string, any> = {
			...rest,
			user_id: user_id,
		};
		if (queryParams.is_completed) {
			cleanedQuery.status = "Completed";
		} else {
			cleanedQuery.status = { $ne: "Completed" };
		}
		return await Order.find(cleanedQuery)
			.skip((page - 1) * limit)
			.limit(limit)
			.sort({ createdAt: -1 });
	}
	async findOrderByUserAndOrderId(user_id: string, order_id: string) {
		return await Order.findOne({ user_id, order_id });
	}
	async updateOrderByUserAndOrderId(
		user_id: string,
		order_id: string,
		updateData: any,
	) {
		return await Order.findOneAndUpdate({ user_id, order_id }, updateData, {
			new: true,
		});
	}

	async checkOrderByUserAndOrderId(user_id: string, order_id: string) {
		return await Order.exists({ user_id, order_id });
	}
}
