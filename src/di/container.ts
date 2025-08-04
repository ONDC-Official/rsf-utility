import { OrderController } from "../controller/order-controller";
import { PayloadController } from "../controller/payload-controller";
import { RsfController } from "../controller/rsf-controller";
import { SettleController } from "../controller/settle-controller";
import { TriggerController } from "../controller/trigger-controller";
import { UserController } from "../controller/user-controller";
import { OrderRepository } from "../repositories/order-repository";
import { SettleRepository } from "../repositories/settle-repository";
import { UserRepository } from "../repositories/user-repository";
import { OrderService } from "../services/order-service";
import { OnSettleService } from "../services/rsf-api-services/on_settle-service";
import { RsfService } from "../services/rsf-api-services/rsf-service";
import { SettleDbManagementService } from "../services/settle-service";
import { SettleTriggerService } from "../services/trigger-services/settle-trigger-service";
import { TriggerService } from "../services/trigger-services/trigger-service";
import { UserService } from "../services/user-service";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository,userService);
const orderController = new OrderController(orderService);

const settleRepository = new SettleRepository();
const settleDbManagementService = new SettleDbManagementService(
	settleRepository,
	userService,
	orderService
);
const settleController = new SettleController(settleDbManagementService);

const payloadController = new PayloadController(orderService);

const settleTriggerService = new SettleTriggerService(
	settleDbManagementService,
	userService
);
const triggerService = new TriggerService(settleTriggerService);
const triggerController = new TriggerController(triggerService);

const onSettleService = new OnSettleService(settleDbManagementService);
const rsfService = new RsfService(onSettleService);
const rsfController = new RsfController(rsfService);

// Export all controllers (or services too, if needed)
export const container = {
	userController,
	orderController,
	triggerController,
	settleController,
	payloadController,
	rsfController,
};
