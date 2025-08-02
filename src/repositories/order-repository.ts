import { Order } from "../db/models/order-model";

export class OrderRepository {
    async createOrder(data: any) {
		return await Order.create(data);
	}
    async getAllOrders(queryParams: any) {
		return await Order.find(queryParams);
	}
	async findOrderByUserAndOrderId(user_id: string, order_id: string) {
  		return await Order.findOne({ user_id, order_id });
	}
	async updateOrderByUserAndOrderId(user_id: string, order_id: string, updateData: any) {
    return await Order.findOneAndUpdate(
      { user_id, order_id },
      updateData,
      { new: true }
    );
  }
}
