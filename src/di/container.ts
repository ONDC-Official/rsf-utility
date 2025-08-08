import { GenerateController } from "../controller/generate-controller";
import { OrderController } from "../controller/order-controller";
import { PayloadController } from "../controller/payload-controller";
import { ReconController } from "../controller/recon-controller";
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
import { OnSettleService } from "../services/rsf-request-api-services/on_settle-service";
import { RsfService } from "../services/rsf-request-api-services/rsf-service";
import { RsfPayloadDbService } from "../services/rsf-payloadDb-service";
import { SettleDbManagementService } from "../services/settle-service";
import { SettleTriggerService } from "../services/trigger-services/settle-trigger-service";
import { TriggerService } from "../services/trigger-services/trigger-service";
import { UserService } from "../services/user-service";
import { ReconTriggerService } from "../services/trigger-services/recon-trigger-service";
import { ReconRequestService } from "../services/rsf-request-api-services/recon-api-service";
import { GenerateOnReconService } from "../services/generate-services/generate-on_recon-service";
import { OnReconTriggerService } from "../services/trigger-services/on_recon-trigger-service";
import { OnReconRequestService } from "../services/rsf-request-api-services/on_recon-service";
import { SettlePrepareService } from "../services/settle-prepare-service";
import { SettlePrepareController } from "../controller/prepare-controller";
import { TransactionService } from "../services/transaction-serivce";
import { TransactionRepository } from "../repositories/transaction-repository";
import { ReconDbService } from "../services/recon-service";
import { ReconRepository } from "../repositories/recon-repository";
import { RsfOrchestratorService } from "../services/rsf-orchestrator-service";

const rsfPayloadRepository = new RsfPayloadRepository();
const rsfPayloadDbService = new RsfPayloadDbService(rsfPayloadRepository);
const rsfPayloadDbController = new RsfPayloadDbController(rsfPayloadDbService);

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository, userService);
const orderController = new OrderController(orderService);

const transactionRepo = new TransactionRepository();
const transactionService = new TransactionService(transactionRepo);

const settleRepository = new SettleRepository();
const settleDbManagementService = new SettleDbManagementService(
	settleRepository,
	userService,
	transactionService,
);
const settleController = new SettleController(settleDbManagementService);

const reconRepo = new ReconRepository();
const reconService = new ReconDbService(
	reconRepo,
	userService,
	transactionService,
);

const rsfOrchestratorService = new RsfOrchestratorService(
	reconService,
	settleDbManagementService,
	orderService,
	userService,
);
const reconController = new ReconController(
	reconService,
	rsfOrchestratorService,
);

const settlePrepareService = new SettlePrepareService(
	userService,
	orderService,
	settleDbManagementService,
);

const settlePrepareController = new SettlePrepareController(
	settlePrepareService,
);

const payloadController = new PayloadController(orderService);

const settleTriggerService = new SettleTriggerService(
	settleDbManagementService,
	userService,
);
const reconTriggerService = new ReconTriggerService(
	reconService,
	userService,
	transactionService,
);
const onReconTriggerService = new OnReconTriggerService(
	reconService,
	userService,
);
const triggerService = new TriggerService(
	settleTriggerService,
	reconTriggerService,
	onReconTriggerService,
);
const triggerController = new TriggerController(triggerService);

const onSettleService = new OnSettleService(
	settleDbManagementService,
	transactionService,
);
const reconRequestService = new ReconRequestService(
	reconService,
	settleDbManagementService,
	userService,
	orderService,
	transactionService,
);
const onReconRequestService = new OnReconRequestService(
	reconService,
	transactionService,
);
const rsfService = new RsfService(
	onSettleService,
	reconRequestService,
	onReconRequestService,
);
const rsfRequestController = new RsfRequestController(rsfService);

const generateSettleService = new GenerateSettleService(
	settleDbManagementService,
	userService,
);

const generateReconService = new GenerateReconService(
	settleDbManagementService,
	userService,
	orderService,
);
const generateOnReconService = new GenerateOnReconService(
	reconService,
	userService,
	transactionService,
);
const generateRsfController = new GenerateController(
	generateSettleService,
	generateReconService,
	generateOnReconService,
);

// Export all controllers (or services too, if needed)
export const container = {
	userController,
	orderController,
	triggerController,
	settleController,
	settlePrepareController,
	reconController,
	payloadController,
	rsfRequestController,
	rsfPayloadDbController,
	rsfPayloadDbService,
	generateRsfController,
};
