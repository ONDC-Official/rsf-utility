import { OrderRepository } from "../repositories/order-repository";
import { OrderType } from "../schema/models/order-schema";
import { GetOrderParamsType, PatchOrderBodyType } from "../types/order-params";
import logger from "../utils/logger";
import { UserService } from "./user-service";

const orderLogger = logger.child("order-service");
export class OrderService {
	constructor(private orderRepo: OrderRepository,private userService: UserService) {}

	async createOrder(orderData: OrderType) {
		return await this.orderRepo.createOrder(orderData);
	}
	async getOrders(queryParams: GetOrderParamsType,user_id: string) {
		orderLogger.info("Fetching settlements for user", { user_id, queryParams });
		if (!(await this.userService.checkUserById(user_id))) {
			throw new Error("User not found");
		}

		return await this.orderRepo.getAllOrders(queryParams,user_id);
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
	async checkUserById(userId: string) {
		return await this.userService.checkUserById(userId);
	}
	async updateOrders(
		userId: string,
		orders: PatchOrderBodyType,
	) {
		const updated_orders : OrderType[] = [];
		for(const order of orders){
			const {order_id,due_date} = order;
			const check = await this.orderRepo.checkOrderByUserAndOrderId(userId, order_id);
			if (!check) {
				throw new Error(`Order with ID ${order_id} not found for user ${userId}`);
			}
			const updated_order = await this.orderRepo.updateOrderByUserAndOrderId(userId, order_id, {due_date: due_date});
			if(!updated_order) {
				throw new Error(`Failed to update order with ID ${order_id} for user ${userId}`);
			}
			updated_orders.push(updated_order);
		}
	}
		
}
