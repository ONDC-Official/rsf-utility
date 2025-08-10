import { SettleRepository } from "../repositories/settle-repository";
import {
	GetSettlementsQuerySchema,
	UpdateSettlementSchema,
} from "../types/settle-params";
import { UserService } from "./user-service";
import { z } from "zod";
import logger from "../utils/logger";
import { SettleSchema, SettleType } from "../schema/models/settle-schema";
import { SettlePayload } from "../schema/rsf/zod/settle-schema";
import { TransactionService } from "./transaction-serivce";
import { checkPerfectAck } from "../utils/ackUtils";

const settleLogger = logger.child("settle-service");
export class SettleDbManagementService {
	constructor(
		private settleRepo: SettleRepository,
		private userService: UserService,
		private transactionService: TransactionService,
	) {}

	async getSingleSettlement(userId: string, orderId: string) {
		settleLogger.info("Fetching single settlement for user", {
			userId,
			orderId,
		});
		return await this.settleRepo.findSingleSettlement(userId, orderId);
	}

	async getSettlements(
		userId: string,
		data: z.infer<typeof GetSettlementsQuerySchema>,
	) {
		settleLogger.info("Fetching settlements for user", { userId, data });
		if (!(await this.userService.checkUserById(userId))) {
			throw new Error("User not found");
		}

		const page = data.page ? data.page : 1;
		const limit = data.limit ? data.limit : 10;
		const skip = (page - 1) * limit;
		const orderId = data.order_id;
		const status = data.status;
		logger.debug(
			`Fetching settlements for user ${userId} with order ID ${orderId}`,
			{
				page: page,
				limit: limit,
				skip: skip,
				status: status,
				counterparty_id: data.counterparty_id,
			},
		);
		const result = await this.settleRepo.findWithQuery({
			user_id: userId,
			skip,
			limit,
			counterparty_id: data.counterparty_id,
			order_id: orderId,
			status: status,
			due_date_from: data.due_date_from,
			due_date_to: data.due_date_to,
		});
		return {
			settlements: result.data,
			pagination: {
				total: result.count,
				page: data.page || 1,
				limit: data.limit || 10,
				totalPages: Math.ceil(result.count / (data.limit || 10)),
			},
		};
	}

	async checkSettlementsForUser(
		userId: string,
		settleNpNpPayload: SettlePayload,
	) {
		settleLogger.info("Checking settlements existence for user", {
			userId,
			data: settleNpNpPayload,
		});
		if (!(await this.userService.checkUserById(userId))) {
			throw new Error("User not found");
		}

		const orderIds = settleNpNpPayload.message.settlement.orders?.map(
			(order) => order.id,
		);
		if (!orderIds || orderIds.length === 0) {
			throw new Error("No order IDs provided for settlement check");
		}
		for (const orderId of orderIds) {
			if (!orderId) {
				throw new Error("Order ID is undefined or empty");
			}
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

	async updateSettlementsViaResponse(
		userId: string,
		settlePayload: SettlePayload,
		responseData: any,
	) {
		const hasError = responseData.error ? true : false;
		let orderIds = settlePayload.message.settlement.orders?.map(
			(order) => order.id,
		);
		if (!orderIds || orderIds.length === 0) {
			throw new Error("No order IDs found in settlement payload");
		}

		settleLogger.info("Updating settlements via response", {
			userId,
			hasError,
			orderIds,
			responseData,
		});

		let transDbId: string | undefined = undefined;
		if (checkPerfectAck(responseData)) {
			const transactionDbSave =
				await this.transactionService.addSettlePayload(settlePayload);
			transDbId = transactionDbSave._id.toString();
		}

		for (const orderId of orderIds) {
			if (!orderId) {
				settleLogger.error("Order ID is undefined or empty", {
					userId,
					orderId,
				});
				continue;
			}
			try {
				const settleData = await this.settleRepo.findSingleSettlement(
					userId,
					orderId,
				);
				if (!settleData) {
					settleLogger.error(
						`Settlement not found for user ${userId} and order ${orderId}`,
						{
							userId,
							orderId,
						},
					);
					continue;
				}
				if (transDbId) {
					settleData.transaction_db_ids.push(transDbId);
				}

				if (hasError) {
					settleData.status = "PREPARED";
					settleData.self_status = "PREPARED";
					settleData.provider_status = "PREPARED";
					settleData.error = responseData.error.message || "Unknown error";
				} else {
					settleData.status = "PENDING";
					settleData.self_status = "PENDING";
					settleData.provider_status = "PENDING";
				}
				await this.settleRepo.updateSettlement(userId, orderId, settleData);
			} catch (error) {
				settleLogger.error(
					`Error updating settlement for order ID ${orderId}`,
					{ userId, orderId },
					error,
				);
			}
		}
	}

	async getSettlementByDbId(orderId: string, dbId: string) {
		settleLogger.info("Fetching settlement by database ID");
		return await this.settleRepo.getByTransactionDbId(orderId, dbId);
	}
	async updateSettlementViaTxn(
		payload_id: string,
		orderId: string,
		settlement: Partial<SettleType>,
	) {
		logger.info("updating...setlement", settlement);
		return await this.settleRepo.updateSettlementByTransaction(
			payload_id,
			orderId,
			settlement,
		);
	}

	async updateSettlementViaUser(
		userId: string,
		orderId: string,
		settlement: Partial<SettleType>,
	) {
		return await this.settleRepo.updateSettlement(userId, orderId, settlement);
	}

	async updateMultipleSettlements(
		userId: string,
		data: { orderId: string; settlement: Partial<SettleType> }[],
	) {
		const updated = [];
		for (const { orderId, settlement } of data) {
			const exists = await this.settleRepo.checkUniqueSettlement(
				userId,
				orderId,
			);
			if (!exists) {
				throw new Error(
					`Settlement for order ID ${orderId} does not exist for user ID: ${userId}`,
				);
			}
		}

		for (const { orderId, settlement } of data) {
			const updatedData = await this.updateSettlementViaUser(
				userId,
				orderId,
				settlement,
			);
			updated.push(updatedData);
		}
		return updated;
	}

	async insertSettlementList(settlements: SettleType[]) {
		settleLogger.info("Inserting settlement list", {
			count: settlements.length,
		});
		if (settlements.length === 0) {
			throw new Error("No settlements to insert");
		}
		return await this.settleRepo.insertSettlementList(settlements);
	}

	async deleteSettlement(userId: string, orderId: string): Promise<void> {
		settleLogger.info("Deleting settlement", {
			userId,
			orderId,
		});
		await this.settleRepo.deleteSettlement(userId, orderId);
	}
}
