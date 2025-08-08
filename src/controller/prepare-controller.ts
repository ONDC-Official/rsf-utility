import { SettlePrepareService } from "../services/settle-prepare-service";
import logger from "../utils/logger";
import { Request, Response } from "express";
import { getLoggerMeta } from "../utils/utility";
import { sendError, sendSuccess } from "../utils/resUtils";
import { PrepareSettlementsBody } from "../types/settle-params";
import { z } from "zod";
const settleLogger = logger.child("settle-controller");

export class SettlePrepareController {
	constructor(private settlePrepareService: SettlePrepareService) {}
	prepareSettlement = async (req: Request, res: Response) => {
		try {
			settleLogger.info("Preparing settlement", getLoggerMeta(req));
			const userId = req.params.userId;
			if (!userId) {
				settleLogger.error("User ID is required", getLoggerMeta(req));

				return sendError(res, "INVALID_QUERY_PARAMS", undefined, {
					message: "User ID is required",
				});
			}
			const validationResult = PrepareSettlementsBody.safeParse(req.body);
			if (!validationResult.success) {
				settleLogger.error(
					"Invalid request body",
					getLoggerMeta(req),
					validationResult.error,
				);

				return sendError(res, "INVALID_REQUEST_BODY", undefined, {
					message: "Invalid request body",
					errors: z.treeifyError(validationResult.error),
				});
			}

			// const settlements =
			// 	validationResult.data.strategy === "USER"
			// 		? await this.settlePrepareService.prepareSettlementsWithUser(
			// 				userId,
			// 				validationResult.data.order_ids,
			// 			)
			// 		: await this.settlePrepareService.prepareSettlementsWithRecon(
			// 				userId,
			// 				validationResult.data.order_ids,
			// 			);

			const settlements = await this.settlePrepareService.prepareSettlements(
				userId,
				validationResult.data.order_ids,
			);

			settleLogger.info(
				"Settlement prepared successfully, new settlements created in the DB",
				getLoggerMeta(req),
			);
			return sendSuccess(
				res,
				settlements,
				"Settlement prepared successfully",
				201,
			);
			//
			// res.status(201).json(settlements);
		} catch (error: any) {
			settleLogger.error(
				"Error preparing settlement",
				getLoggerMeta(req),
				error,
			);
			return sendError(res, "INTERNAL_ERROR", undefined, {
				error: error.message,
			});
			// res.status(500).json({ message: error.message });
		}
	};
}
