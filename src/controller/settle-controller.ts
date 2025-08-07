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
				// res.status(400).json({ message: "Valid User ID is required" });
				// return;
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
				// return res.status(400).json({

				// res.status(400).json({
				// 	message: "Invalid query parameters",
				// 	errors: z.treeifyError(validationResult.error),
				// });
				// return;
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
			// res.status(500).json({ message: error.message });
		}
		// res.status(500).json({ message: error.message });
	};
}
