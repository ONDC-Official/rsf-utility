import { SettleRepository } from "../repositories/settle-repository";
import {
	GetSettlementsQuerySchema,
	GenerateSettlementsBody,
	GenSettlementsBodyObject,
} from "../types/settle-params";
import { UserService } from "./user-service";
import { z } from "zod";
import logger from "../utils/logger";
import { OrderService } from "./order-service";
import { OrderType } from "../schema/models/order-schema";
import { SettleSchema, SettleType } from "../schema/models/settle-schema";
import { UserType } from "../schema/models/user-schema";
import { calculateSettlementDetails } from "../utils/settle-utils/tax";

const settleLogger = logger.child("settle-service");
export class SettleDbManagementService {
	constructor(
		private settleRepo: SettleRepository,
		private userService: UserService,
		private orderService: OrderService,
	) {}

	async getSettlements(
		userId: string,
		data: z.infer<typeof GetSettlementsQuerySchema>,
	) {
		settleLogger.info("Fetching settlements for user", { userId, data });
		if (!(await this.userService.checkUserById(userId))) {
			throw new Error("User not found");
		}

		const page = data.page ? 10 : 1;
		const limit = data.limit ? 10 : 10;
		const skip = (page - 1) * limit;
		const orderId = data.order_id;
		const status = data.status;

		return await this.settleRepo.findWithQuery({
			user_id: userId,
			skip,
			limit,
			counterparty_id: data.counterparty_id,
			order_id: orderId,
			status: status,
		});
	}

	async checkSettlementsForUser(userId: string, settleNpNpPayload: any) {
		settleLogger.info("Checking settlements existence for user", {
			userId,
			data: settleNpNpPayload,
		});
		if (!(await this.userService.checkUserById(userId))) {
			throw new Error("User not found");
		}
		const orderIds = settleNpNpPayload.message.settlements.orders.map(
			(order: any) => order.id,
		);
		if (orderIds.length === 0) {
			throw new Error("No order IDs provided for settlement check");
		}
		for (const orderId of orderIds) {
			if (!(await this.settleRepo.checkUniqueSettlement(userId, orderId))) {
				throw new Error(
					`Settlement for order ID ${orderId} does not exist for user ID: ${userId}`,
				);
			}
		}
	}

	async checkUniqueSettlement(userId: string, orderId: string) {
		settleLogger.info("Checking unique settlement for user", {
			userId,
			orderId,
		});
		return await this.settleRepo.checkUniqueSettlement(userId, orderId);
	}

	async prepareSettlements(userId: string, orderIds: string[]) {
		settleLogger.info("Preparing settlement data for user", {
			userId,
			orderIds,
		});
		if (!(await this.userService.checkUserById(userId))) {
			throw new Error("User not found");
		}
		const userConfig = await this.userService.getUserById(userId);
		const settles: SettleType[] = [];
		for (const orderId of orderIds) {
			if (!(await this.orderService.checkUniqueOrder(userId, orderId))) {
				throw new Error(
					`Order with ID ${orderId} not found for user ${userId}`,
				);
			}
			// @ts-ignore
			const order = (await this.orderService.getUniqueOrders(
				userId,
				orderId,
			)) as OrderType;
			const settleData = this.prepareSingleSettlement(order, userConfig);
			settles.push(settleData);
		}
		if (settles.length === 0) {
			throw new Error("No settlements to prepare");
		}
		const result = await this.settleRepo.insertSettlementList(settles);
		settleLogger.info("Settlements prepared successfully", {
			userId,
			orderIds,
		});
		return result;
	}

	async updateSettlementsViaResponse(
		userId: string,
		data: any,
		responseData: any,
	) {
		const hasError = responseData.error ? true : false;
		const orderIds = data.message.settlements.orders.map(
			(order: any) => order.id,
		);
		settleLogger.info("Updating settlements via response", {
			userId,
			hasError,
			orderIds,
			responseData,
		});
		for (const orderId of orderIds) {
			const settlement = await this.settleRepo.findWithQuery({
				user_id: userId,
				order_id: orderId,
				skip: 0,
				limit: 1,
			});
			if (!settlement || settlement.length === 0) {
				logger.error(
					`Settlement not found for order ID: ${orderId} for user ID: ${userId}`,
				);
				continue;
			}
			const settleData = settlement[0];
			settleData.context = data.context;
			if (hasError) {
				settleData.status = "NOT-SETTLED";
				settleData.error = responseData.error.message || "Unknown error";
			} else {
				settleData.status = "PENDING";
			}
			await this.settleRepo.updateSettlement(userId, orderId, settleData);
		}
	}

	prepareSingleSettlement(order: OrderType, userConfig: UserType): SettleType {
		const { commission, tax, inter_np_settlement } = calculateSettlementDetails(
			order,
			userConfig,
		);
		return {
			order_id: order.order_id,
			user_id: order.user_id,
			collector_id: order.collected_by === "BAP" ? order.bap_id : order.bpp_id,
			receiver_id: order.collected_by === "BAP" ? order.bpp_id : order.bap_id,
			total_order_value: order.quote.total_order_value, // calc
			commission: commission, // calc
			tax: tax, // calc
			withholding_amount: order.withholding_amount ?? 0,
			inter_np_settlement: inter_np_settlement, // calc
			provider_id: order.provider_id,
			due_date: new Date(),
			status: "PREPARED",
			type: "NP-NP",
		};
	}
	async getSettlementByContextAndOrderId(
		txn_id: string,
		message_id: string,
		order_id: string,
	) {
		const settlement = this.settleRepo.getSettlementByContextAndOrderId(
			txn_id,
			message_id,
			order_id,
		);
		if (!settlement) {
			throw new Error(
				"Settlement not found for the given transaction and message ID",
			);
		}
		return settlement;
	}
	async updateSettlementByOnSettle(
		txn_id: string,
		message_id: string,
		orderId: string,
		settlement: z.infer<typeof SettleSchema>,
	) {
		return await this.settleRepo.updateSettlementByOnSettle(
			txn_id,
			message_id,
			orderId,
			settlement,
		);
	}
}
