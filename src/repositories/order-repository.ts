import { Order } from "../db/models/order-model";
import { UserType } from "../types/models/user.type";
export class OrderRepository {
    async createOrder(data: UserType) {
		return await Order.create(data);
	}
    async getAllOrders(queryParams: any) {
		return await Order.find(queryParams);
	}
}
