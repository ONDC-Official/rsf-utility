import { OrderController } from "../controller/order-controller";
import { PayloadController } from "../controller/payload-controller";
import { SettleController } from "../controller/settle-controller";
import { UserController } from "../controller/user-controller";
import { OrderRepository } from "../repositories/order-repository";
import { SettleRepository } from "../repositories/settle-repository";
import { UserRepository } from "../repositories/user-repository";
import { OrderService } from "../services/order-service";
import { SettleService } from "../services/settle-service";
import { UserService } from "../services/user-service";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository);
const orderController = new OrderController(orderService, userService);

const settleRepository = new SettleRepository();
const settleService = new SettleService(
  settleRepository,
  userService,
  orderService
);
const settleController = new SettleController(settleService);

const payloadController = new PayloadController(orderService);
// Export all controllers (or services too, if needed)
export const container = {
  userController,
  orderController,
  settleController,
  payloadController,
};
