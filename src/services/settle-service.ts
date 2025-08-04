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
import { SettleType } from "../schema/models/settle-schema";
import { UserType } from "../schema/models/user-schema";
import { calculateSettlementDetails } from "../utils/settle-utils/tax";
import { generateSettlePayload } from "../utils/settle-utils/generate-settle-payload";
import { generateMiscFile } from "../utils/settle-utils/generate-misc-file";
import { generateNilFile } from "../utils/settle-utils/generate-nil-file";

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

	async checkSettlementsForUser(userId: string, data: any) {
		settleLogger.info("Checking settlements existence for user", {
			userId,
			data,
		});
		if (!(await this.userService.checkUserById(userId))) {
			throw new Error("User not found");
		}
		const orderIds = data.message.settlements.orders.map(
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
			withholding_amount: order.withholding_amount,
			inter_np_settlement: inter_np_settlement, // calc
			provider_id: order.provider_id,
			due_date: new Date(),
			status: "PREPARED",
			type: "NP-NP",
		};
	}

	async generateSettlePayloads(
		userId: string,
		settlementData: z.infer<typeof GenSettlementsBodyObject>[],
	) {
		settleLogger.info("Generating settlements for user", {
			userId,
			settlementData,
		});
		if (!(await this.userService.checkUserById(userId))) {
			throw new Error("User not found");
		}
		const userConfig = await this.userService.getUserById(userId);
		let uniqueId = "";
		const settlements: SettleType[] = [];
		for (const data of settlementData) {
			if (
				!(await this.settleRepo.checkUniqueSettlement(userId, data.order_id))
			) {
				throw new Error(
					`Settlement for order ID ${data.order_id} does not exist for config ID: ${userId}`,
				);
			}
			const settlement = await this.settleRepo.findWithQuery({
				user_id: userId,
				order_id: data.order_id,
				skip: 0,
				limit: 1,
			});
			if (!settlement || settlement.length === 0) {
				throw new Error(
					`Settlement for order ID ${data.order_id} does not exist for config ID: ${userId}`,
				);
			}
			const settleData = settlement[0];
			if (settleData.status === "SETTLED") {
				throw new Error(
					`Settlement for order ID ${data.order_id} is already settled for config ID: ${userId}`,
				);
			}
			const validId = `${settleData.collector_id}-${settleData.receiver_id}`;
			if (uniqueId == "") {
				uniqueId = validId;
			}
			if (uniqueId !== validId) {
				throw new Error(
					`Collector and Receiver IDs do not match for order ID ${data.order_id} in config ID: ${userId}`,
				);
			}
			settlements.push(settleData);
		}
		if (settlements.length === 0) {
			throw new Error("No settlements to generate payloads for");
		}
		return generateSettlePayload(userConfig, settlements, settlementData);
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

	async generateMiscPayload(userId: string, miscData: any) {
		if (!(await this.userService.checkUserById(userId))) {
			throw new Error("User not found");
		}

		const userConfig = await this.userService.getUserById(userId);

		return generateMiscFile(userConfig, miscData);
	}

	async generateNilPayload(userId: string) {
		if (!(await this.userService.checkUserById(userId))) {
			throw new Error("User not found");
		}

		const userConfig = await this.userService.getUserById(userId);

		return generateNilFile(userConfig);
	}
}
