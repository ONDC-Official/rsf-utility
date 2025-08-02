import { Order } from "../db/models/order-model";
import { OrderType } from "../schema/models/order-schema";

export class OrderRepository {
	async createOrder(data: OrderType) {
		return await Order.create(data);
	}
	async getAllOrders(queryParams: any) {
		return await Order.find(queryParams);
	}
	async findOrderByUserAndOrderId(user_id: string, order_id: string) {
		return await Order.findOne({ user_id, order_id });
	}

	async checkOrderByUserAndOrderId(user_id: string, order_id: string) {
		return await Order.exists({ user_id, order_id });
	}
}
