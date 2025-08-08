import { SettleDbManagementService } from "../services/settle-service";
import logger from "../utils/logger";
import { Request, Response } from "express";
import { getLoggerMeta } from "../utils/utility";
import { GetSettlementsQuerySchema } from "../types/settle-params";
import { z } from "zod";
import { validateUserId } from "../types/user-id-type";
import { sendError, sendSuccess } from "../utils/resUtils";

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

	updateSettlement = async (req: Request, res: Response) => {
		try {
			settleLogger.info("Updating settlement", getLoggerMeta(req));
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
			// const data = await this.settleService.updateSettlement(
			// 	userId,
			// 	validationResult.data,
			// );
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
}
