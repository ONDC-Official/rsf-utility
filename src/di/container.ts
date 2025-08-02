import { OrderController } from "../controller/order.controller";
import { UserController } from "../controller/user.controller";
import { OrderRepository } from "../repositories/order.repository";
import { UserRepository } from "../repositories/user.repository";
import { OrderService } from "../services/order.service";
import { UserService } from "../services/user.service";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const orderRepository = new OrderRepository()
const orderService = new OrderService(orderRepository);
const orderController = new OrderController(orderService);

// Export all controllers (or services too, if needed)
export const container = {
	userController,
	orderController,
	userService
};
