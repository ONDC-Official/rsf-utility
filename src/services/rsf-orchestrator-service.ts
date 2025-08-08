import mongoose from "mongoose";
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
		const mongoSession = await mongoose.startSession();

		try {
			await mongoSession.withTransaction(async (activeSession) => {
				rsfLogger.info(`moveReconsToReady: Processing for userId: ${userId}`);
				await Promise.all(
					data.orders.map((order) =>
						this.handleReadyFor(userId, order, activeSession),
					),
				);
			});
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
		} finally {
			rsfLogger.info(
				`moveReconsToReady: Completed processing for userId: ${userId}`,
			);
			if (mongoSession) {
				await mongoSession.endSession();
			}
		}
	}

	async validateReadyRequest(
		userId: string,
		order: MoveReconsBody["orders"][number],
		session: mongoose.ClientSession,
	) {
		// if(!(await this.userService.checkUserById(userId)))
	}

	async handleReadyFor(
		userId: string,
		order: MoveReconsBody["orders"][number],
		session: mongoose.ClientSession,
	) {
		rsfLogger.info(`handleReadyFor: Processing order for userId: ${userId}`, {
			userId: userId,
			order: order,
		});
		// delete order from settle
		// await await this.settleService.deleteSettlement(
		// 	userId,
		// 	order.order_id,
		// 	session,
		// );
		// un-mark order & add due date
	}
}
