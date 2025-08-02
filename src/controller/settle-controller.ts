import { SettleService } from "../services/settle-service";
import logger from "../utils/logger";
import { Request, Response } from "express";
import { getLoggerMeta } from "../utils/utility";
import {
	GetSettlementsQuerySchema,
	PrepareSettlementsBody,
} from "../types/query-params/settle.query.type";
const settleLogger = logger.child("settle-controller");
import { z } from "zod";
export class SettleController {
	constructor(private settleService: SettleService) {}

	getSettlements = async (req: Request, res: Response) => {
		try {
			settleLogger.info("Fetching settlements", getLoggerMeta(req));
			const userId = req.params.userId;
			if (!userId) {
				settleLogger.error("User ID is required", getLoggerMeta(req));
				res.status(400).json({ message: "User ID is required" });
				return;
			}
			const validationResult = GetSettlementsQuerySchema.safeParse(req.query);
			if (!validationResult.success) {
				settleLogger.error(
					"Invalid query parameters",
					getLoggerMeta(req),
					validationResult.error
				);
				res.status(400).json({
					message: "Invalid query parameters",
					errors: z.treeifyError(validationResult.error),
				});
				return;
			}
			const data = await this.settleService.getSettlements(
				userId,
				validationResult.data
			);
			settleLogger.info("Settlements fetched successfully", getLoggerMeta(req));
			res.status(200).json(data);
		} catch (error: any) {
			settleLogger.error(
				"Error fetching settlements",
				getLoggerMeta(req),
				error
			);
			res.status(500).json({ message: error.message });
		}
	};

	prepareSettlement = async (req: Request, res: Response) => {
		try {
			settleLogger.info("Preparing settlement", getLoggerMeta(req));
			const userId = req.params.userId;
			if (!userId) {
				settleLogger.error("User ID is required", getLoggerMeta(req));
				res.status(400).json({ message: "User ID is required" });
				return;
			}
			const validationResult = PrepareSettlementsBody.safeParse(req.body);
			if (!validationResult.success) {
				settleLogger.error(
					"Invalid request body",
					getLoggerMeta(req),
					validationResult.error
				);
				res.status(400).json({
					message: "Invalid request body",
					errors: z.treeifyError(validationResult.error),
				});
				return;
			}
			await this.settleService.prepareSettlement(
				userId,
				validationResult.data.order_ids
			);
			settleLogger.info(
				"Settlement prepared successfully, new settlements created in the DB",
				getLoggerMeta(req)
			);
		} catch (error: any) {
			settleLogger.error(
				"Error preparing settlements",
				getLoggerMeta(req),
				error
			);
			res.status(500).json({ message: error.message });
		}
	};
}
