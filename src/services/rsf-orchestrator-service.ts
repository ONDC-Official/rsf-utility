import { ENUMS } from "../constants/enums";
import { MoveReconsBody } from "../types/recon-params";
import logger from "../utils/logger";
import { OrderService } from "./order-service";
import { ReconDbService } from "./recon-service";
import { SettleDbManagementService } from "./settle-service";
import { UserService } from "./user-service";

const rsfLogger = logger.child("rsf-orchestrator-service");
export class RsfOrchestratorService {
	constructor(
		private reconService: ReconDbService,
		private settleService: SettleDbManagementService,
		private orderService: OrderService,
		private userService: UserService,
	) {}

	async moveReconsToReady(userId: string, data: MoveReconsBody) {
		try {
			await Promise.all(
				data.orders.map((order) => this.handleReadyFor(userId, order)),
			);
			rsfLogger.info(
				`moveReconsToReady: Successfully processed for userId: ${userId}`,
				{ userId: userId, orders: data.orders },
			);
			return { message: "Reconciliations moved to ready successfully." };
		} catch (error: any) {
			rsfLogger.error(
				`moveReconsToReady: Error processing for userId: ${userId}`,
				{
					userId: userId,
					orders: data.orders,
				},
				error,
			);
			throw new Error(
				`Failed to move recons to ready for userId: ${userId}. Error: ${error.message}`,
			);
		}
	}

	async validateReadyRequest(
		userId: string,
		order: MoveReconsBody["orders"][number],
	) {
		if (!(await this.userService.checkUserById(userId))) {
			throw new Error(`User with ID ${userId} does not exist.`);
		}
		if (!order || !order.order_id) {
			throw new Error(
				`Invalid order data provided for userId: ${userId}. Order ID is required.`,
			);
		}
		const orderExists = await this.orderService.checkUniqueOrder(
			userId,
			order.order_id,
		);
		if (!orderExists) {
			throw new Error(`Order with ID ${order.order_id} does not exist.`);
		}

		const recon = await this.reconService.getReconById(userId, order.order_id);
		if (!recon) {
			throw new Error(
				`No reconciliation record found for userId: ${userId} and orderId: ${order.order_id}.`,
			);
		}
		const reconStatus = recon.recon_status;
		if (
			reconStatus !== ENUMS.INTERNAL_RECON_STATUS.RECEIVED_ACCEPTED &&
			reconStatus !== ENUMS.INTERNAL_RECON_STATUS.RECEIVED_REJECTED
		) {
			throw new Error(
				`Recon status for order ${order.order_id} is already ${reconStatus}. Cannot move to ready.`,
			);
		}
		return recon;
	}

	async handleReadyFor(
		userId: string,
		order: MoveReconsBody["orders"][number],
	) {
		const recon = await this.validateReadyRequest(userId, order);
		rsfLogger.info(`handleReadyFor: Processing order for userId: ${userId}`, {
			userId: userId,
			order: order,
		});
		// delete order from settle
		await this.settleService.deleteSettlement(userId, order.order_id);

		// un-mark order & add due date
		await this.orderService.updateOrder(userId, order.order_id, {
			due_date: recon.due_date,
			settle_status: ENUMS.INTERNAL_ORDER_SETTLE_STATUS.RECON,
		});
	}
}
