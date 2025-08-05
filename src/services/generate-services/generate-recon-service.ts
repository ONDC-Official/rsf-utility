import { SettleType } from "../../schema/models/settle-schema";
import {
	GenReconBodyType,
	GenReconOrderObjType,
	ReconAggregateData,
} from "../../types/generate-recon-types";
import { reconBuilder } from "../../utils/recon-utils/generate-recon-payload";
import { OrderService } from "../order-service";
import { SettleDbManagementService } from "../settle-service";
import { UserService } from "../user-service";

export class GenerateReconService {
	constructor(
		private settleDbService: SettleDbManagementService,
		private userService: UserService,
		private orderService: OrderService,
	) {}

	async generateReconPayload(userId: string, reconData: GenReconBodyType) {
		if (!(await this.userService.checkUserById(userId))) {
			throw new Error("User not found");
		}
		const userConfig = await this.userService.getUserById(userId);
		const aggregateReconData: ReconAggregateData = [];
		for (const data of reconData.recon_data) {
			const orderId = data.order_id;
			if (
				!(await this.settleDbService.checkUniqueSettlement(userId, orderId))
			) {
				throw new Error(
					`Settlement not found for order ID: ${orderId} for user ID: ${userId}`,
				);
			}

			if (!(await this.orderService.checkUniqueOrder(userId, orderId))) {
				throw new Error(
					`Order not found for order ID: ${orderId} for user ID: ${userId}`,
				);
			}
			const orderData = await this.orderService.getUniqueOrders(
				userId,
				orderId,
			);

			const settleData = await this.settleDbService.getSettlements(userId, {
				order_id: orderId,
			});
			if (settleData.length === 0) {
				throw new Error(
					`No settlement data found for order ID: ${orderId} for user ID: ${userId}`,
				);
			}
			const settlement = settleData[0];
			aggregateReconData.push({
				reconData: data,
				settleData: settlement,
				orderData: orderData,
			});
		}
		return reconBuilder(userConfig, aggregateReconData);
	}
}
