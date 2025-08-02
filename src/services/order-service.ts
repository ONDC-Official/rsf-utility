import { OrderRepository } from "../repositories/order-repository";

export class OrderService {
  constructor(private orderRepo: OrderRepository) {}

  async createOrder(orderData: any) {
    return await this.orderRepo.createOrder(orderData);
  }
  async getOrders(queryParams: any) {
    return await this.orderRepo.getAllOrders(queryParams);
  }
  async getUniqueOrders(user_id: string, order_id: string) {
    return await this.orderRepo.findOrderByUserAndOrderId(user_id, order_id);
  }
  async updateOrder(user_id: string, order_id: string, updateData: any) {
    return await this.orderRepo.updateOrderByUserAndOrderId(user_id, order_id, updateData);
}
}
