import { SettleDbManagementService } from "../services/settle-service";
import logger from "../utils/logger";
import { Request, Response } from "express";
import { getLoggerMeta } from "../utils/utility";
import {
	GetSettlementsQuerySchema,
	UpdateSettlementSchema,
	UpdateSettlementType,
} from "../types/settle-params";
import { z } from "zod";
import { validateUserId } from "../types/user-id-type";
import { sendError, sendSuccess } from "../utils/resUtils";
import { SettleType } from "../schema/models/settle-schema";
import { or } from "ajv/dist/compile/codegen";

const settleLogger = logger.child("settle-controller");

export class SettleController {
	constructor(private settleService: SettleDbManagementService) {}

	getSettlements = async (req: Request, res: Response) => {
		try {
			settleLogger.info("Fetching settlements", getLoggerMeta(req));
			const userId = req.params.userId;
			if (!validateUserId(userId)) {
				settleLogger.error("Valid User ID is required", getLoggerMeta(req));

				return sendError(res, "INVALID_QUERY_PARAMS", undefined, {
					message: "Valid User ID is required",
				});
			}
			const validationResult = GetSettlementsQuerySchema.safeParse(req.query);
			if (!validationResult.success) {
				settleLogger.error(
					"Invalid query parameters",
					getLoggerMeta(req),
					validationResult.error,
				);

				return sendError(res, "INVALID_QUERY_PARAMS", undefined, {
					message: "Invalid query parameters",
					errors: z.treeifyError(validationResult.error),
				});
			}
			const data = await this.settleService.getSettlements(
				userId,
				validationResult.data,
			);
			settleLogger.info("Settlements fetched successfully", getLoggerMeta(req));

			return sendSuccess(res, data, "Settlements fetched successfully");
			// res.status(200).json(data);
		} catch (error: any) {
			settleLogger.error(
				"Error fetching settlements",
				getLoggerMeta(req),
				error,
			);

			return sendError(res, "INTERNAL_ERROR", undefined, {
				error: error.message,
			});
		}
	};

	updateSettlements = async (req: Request, res: Response) => {
		try {
			settleLogger.info("Updating settlement", getLoggerMeta(req));
			const userId = req.params.userId;
			if (!validateUserId(userId)) {
				settleLogger.error("Valid User ID is required", getLoggerMeta(req));

				return sendError(res, "INVALID_QUERY_PARAMS", undefined, {
					message: "Valid User ID is required",
				});
			}
			const validationResult = UpdateSettlementSchema.safeParse(req.body);
			if (!validationResult.success) {
				settleLogger.error(
					"Invalid body",
					getLoggerMeta(req),
					validationResult.error,
				);

				return sendError(res, "INVALID_REQUEST_BODY", undefined, {
					message: "Invalid body",
					errors: z.treeifyError(validationResult.error),
				});
			}

			const convertedData = validationResult.data.settlements.map(
				(settlement) => ({
					orderId: settlement.order_id,
					settlement: this.getUpdateData(settlement),
				}),
			);

			const updated = await this.settleService.updateMultipleSettlements(
				userId,
				convertedData,
			);
			return sendSuccess(res, updated, "Settlement updated successfully");
		} catch (error: any) {
			settleLogger.error(
				"Error updating settlement",
				getLoggerMeta(req),
				error,
			);

			return sendError(res, "INTERNAL_ERROR", undefined, {
				error: error.message,
			});
		}
	};

	private getUpdateData(data: UpdateSettlementType["settlements"][number]) {
		const settlePartialData: Partial<SettleType> = {};
		if (data.total_order_value) {
			settlePartialData.total_order_value = data.total_order_value;
		}
		if (data.withholding_amount) {
			settlePartialData.withholding_amount = data.withholding_amount;
		}
		if (data.tds) {
			settlePartialData.tds = data.tds;
		}
		if (data.tcs) {
			settlePartialData.tcs = data.tcs;
		}
		if (data.commission) {
			settlePartialData.commission = data.commission;
		}
		if (data.collector_settlement) {
			settlePartialData.collector_settlement = data.collector_settlement;
		}
		return settlePartialData;
	}
}
