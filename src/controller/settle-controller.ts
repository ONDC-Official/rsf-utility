import { SettleService } from "../services/settle-service";
import logger from "../utils/logger";
import { Request, Response } from "express";
import { getLoggerMeta } from "../utils/utility";
import {
	GenerateSettlementsBody,
	GetSettlementsQuerySchema,
	PrepareSettlementsBody,
} from "../types/settle-params";
import { z } from "zod";
import { validateUserId } from "../types/user-id-type";

const settleLogger = logger.child("settle-controller");

export class SettleController {
	constructor(private settleService: SettleService) {}

	getSettlements = async (req: Request, res: Response) => {
		try {
			settleLogger.info("Fetching settlements", getLoggerMeta(req));
			const userId = req.params.userId;
			if (!validateUserId(userId)) {
				settleLogger.error("Valid User ID is required", getLoggerMeta(req));
				res.status(400).json({ message: "Valid User ID is required" });
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
			const settlements = await this.settleService.prepareSettlements(
				userId,
				validationResult.data.order_ids
			);
			settleLogger.info(
				"Settlement prepared successfully, new settlements created in the DB",
				getLoggerMeta(req)
			);
			res.status(201).json(settlements);
		} catch (error: any) {
			settleLogger.error(
				"Error preparing settlement",
				getLoggerMeta(req),
				error
			);
			res.status(500).json({ message: error.message });
		}
	};

	generateSettlement = async (req: Request, res: Response) => {
		try {
			settleLogger.info("Generating settlement", getLoggerMeta(req));
			const userId = req.params.userId;
			if (!validateUserId(userId)) {
				settleLogger.error("Valid User ID is required", getLoggerMeta(req));
				res.status(400).json({ message: "Valid User ID is required" });
				return;
			}
			const validationResult = GenerateSettlementsBody.safeParse(req.body);
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
			const settlementPayload = await this.settleService.generateSettlePayloads(
				userId,
				validationResult.data.order_ids
			);
			settleLogger.info(
				"Settlement generated successfully",
				getLoggerMeta(req)
			);
			res.status(201).json(settlementPayload);
		} catch (error: any) {
			settleLogger.error(
				"Error generating settlement",
				getLoggerMeta(req),
				error
			);
			res.status(500).json({ message: error.message });
		}
	};
}
