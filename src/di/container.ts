import { GenerateController } from "../controller/generate-controller";
import { OrderController } from "../controller/order-controller";
import { PayloadController } from "../controller/payload-controller";
import { RsfPayloadDbController } from "../controller/rsf-db-controller";
import { RsfRequestController } from "../controller/rsf-request-controller";
import { SettleController } from "../controller/settle-controller";
import { TriggerController } from "../controller/trigger-controller";
import { UserController } from "../controller/user-controller";
import { OrderRepository } from "../repositories/order-repository";
import { RsfPayloadRepository } from "../repositories/rsf-payload-repository";
import { SettleRepository } from "../repositories/settle-repository";
import { UserRepository } from "../repositories/user-repository";
import { GenerateReconService } from "../services/generate-services/generate-recon-service";
import { GenerateSettleService } from "../services/generate-services/generate-settle-service";
import { OrderService } from "../services/order-service";
import { OnSettleService } from "../services/rsf-api-services/on_settle-service";
import { RsfService } from "../services/rsf-api-services/rsf-service";
import { RsfPayloadDbService } from "../services/rsf-payloadDb-service";
import { SettleDbManagementService } from "../services/settle-service";
import { SettleTriggerService } from "../services/trigger-services/settle-trigger-service";
import { TriggerService } from "../services/trigger-services/trigger-service";
import { UserService } from "../services/user-service";

const rsfPayloadRepository = new RsfPayloadRepository();
const rsfPayloadDbService = new RsfPayloadDbService(rsfPayloadRepository);
const rsfPayloadDbController = new RsfPayloadDbController(rsfPayloadDbService);

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository, userService);
const orderController = new OrderController(orderService);

const settleRepository = new SettleRepository();
const settleDbManagementService = new SettleDbManagementService(
	settleRepository,
	userService,
	orderService,
);
const settleController = new SettleController(settleDbManagementService);

const payloadController = new PayloadController(orderService);

const settleTriggerService = new SettleTriggerService(
	settleDbManagementService,
	userService,
);

const triggerService = new TriggerService(settleTriggerService);
const triggerController = new TriggerController(triggerService);

const onSettleService = new OnSettleService(settleDbManagementService);
const rsfService = new RsfService(onSettleService);
const rsfRequestController = new RsfRequestController(rsfService);

const generateSettleService = new GenerateSettleService(
	settleDbManagementService,
	userService,
);
const generateReconService = new GenerateReconService(
	settleDbManagementService,
	userService,
);
const generateRsfController = new GenerateController(
	generateSettleService,
	generateReconService,
);

// Export all controllers (or services too, if needed)
export const container = {
	userController,
	orderController,
	triggerController,
	settleController,
	payloadController,
	rsfRequestController,
	rsfPayloadDbController,
	rsfPayloadDbService,
	generateRsfController,
};
