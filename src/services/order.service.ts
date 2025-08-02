import { OrderRepository } from "../repositories/order.repository";

export class OrderService {
  constructor(private userRepo: OrderRepository) {}

}
