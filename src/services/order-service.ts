import { OrderRepository } from "../repositories/order-repository";
import { OrderType } from "../schema/models/order-schema";

export class OrderService {
	constructor(private orderRepo: OrderRepository) {}

	async createOrder(orderData: OrderType) {
		return await this.orderRepo.createOrder(orderData);
	}
	async getOrders(queryParams: any) {
		return await this.orderRepo.getAllOrders(queryParams);
	}
	async getUniqueOrders(user_id: string, order_id: string) {
		const order = await this.orderRepo.findOrderByUserAndOrderId(
			user_id,
			order_id
		);
		if (!order) {
			throw new Error(
				`Order with ID ${order_id} not found for user ${user_id}`
			);
		}
		return order;
	}

	async checkUniqueOrder(user_id: string, order_id: string) {
		return await this.orderRepo.checkOrderByUserAndOrderId(user_id, order_id);
	}

	async updateOrder(
		user_id: string,
		order_id: string,
		updateData: Partial<OrderType>
	) {
		const updatedOrder = await this.orderRepo.updateOrderByUserAndOrderId(
			user_id,
			order_id,
			updateData
		);
		if (!updatedOrder) {
			throw new Error(
				`Failed to update order with ID ${order_id} for user ${user_id}`
			);
		}
		return updatedOrder;
	}
}
