import { OrderRepository } from "../repositories/order-repository";

export class OrderService {
	constructor(private orderRepo: OrderRepository) {}

	async createOrder(userData: any) {
		return await this.orderRepo.createOrder(userData);
	}
	async getOrders(queryParams: any) {
		return await this.orderRepo.getAllOrders(queryParams);
	}
}
