import { Order } from "../db/models/order-model";
import { UserType } from "../types/models/user.type";
export class OrderRepository {
    async createOrder(data: UserType) {
		return await Order.create(data);
	}
    async getAllOrders(queryParams: any) {
		return await Order.find(queryParams);
	}
	async findOrderByUserAndOrderId(user_id: string, order_id: string) {
  		return await Order.findOne({ user_id, order_id });
}
}
