import { SettleDbManagementService } from "../services/settle-service";
import logger from "../utils/logger";
import { NextFunction, Request, Response } from "express";
import { getLoggerMeta } from "../utils/utility";
import {
	GenerateSettlementsBody,
	GetSettlementsQuerySchema,
	MiscSettlementSchema,
	NilSettlementSchema,
	PrepareSettlementsBody,
} from "../types/settle-params";
import { z } from "zod";
import { validateUserId } from "../types/user-id-type";
import { sendError, sendSuccess } from "../utils/resUtils";
import { send } from "process";

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

	prepareSettlement = async (req: Request, res: Response) => {
		try {
			settleLogger.info("Preparing settlement", getLoggerMeta(req));
			const userId = req.params.userId;
			if (!userId) {
				settleLogger.error("User ID is required", getLoggerMeta(req));

				return sendError(res, "INVALID_QUERY_PARAMS", undefined, {
					message: "User ID is required",
				});

				// res.status(400).json({ message: "User ID is required" });
				// return;
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

				// res.status(400).json({
				// 	message: "Invalid request body",
				// 	errors: z.treeifyError(validationResult.error),
				// });
				// return;
			}
			const settlements = await this.settleService.prepareSettlements(
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

	generateNpNpSettlement = async (req: Request, res: Response) => {
		try {
			settleLogger.info("Generating settlement", getLoggerMeta(req));
			const userId = req.params.userId;
			if (!validateUserId(userId)) {
				settleLogger.error("Valid User ID is required", getLoggerMeta(req));

				return sendError(res, "INVALID_QUERY_PARAMS", undefined, {
					message: "Valid User ID is required",
				});
				// res.status(400).json({ message: "Valid User ID is required" });
				// return;
			}
			const validationResult = GenerateSettlementsBody.safeParse(req.body);
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
				// res.status(400).json({
				// 	message: "Invalid request body",
				// 	errors: z.treeifyError(validationResult.error),
				// });
				// return;
			}
			const settlementPayload = await this.settleService.generateSettlePayloads(
				userId,
				validationResult.data.order_ids,
			);
			settleLogger.info(
				"Settlement generated successfully",
				getLoggerMeta(req),
			);

			return sendSuccess(
				res,
				settlementPayload,
				"Settlement generated successfully",
				201,
			);
			//

			// res.status(201).json(settlementPayload);
		} catch (error: any) {
			settleLogger.error(
				"Error generating settlement",
				getLoggerMeta(req),
				error,
			);

			return sendError(res, "INTERNAL_ERROR", undefined, {
				error: error.message,
			});
			//
			// res.status(500).json({ message: error.message });
		}
	};

	generateMiscSettlement = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		try {
			settleLogger.info("Generating misc settlement", getLoggerMeta(req));
			const userId = req.params.userId;
			if (!validateUserId(userId)) {
				settleLogger.error("Valid User ID is required", getLoggerMeta(req));

				return sendError(res, "INVALID_QUERY_PARAMS", undefined, {
					message: "Valid User ID is required",
				});
				// return res.status(400).json({ message: "Valid User ID is required" });
			}
			const validationResult = MiscSettlementSchema.safeParse(req.body);
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

				// return res.status(400).json({
				// 	message: "Invalid request body",
				// 	errors: z.treeifyError(validationResult.error),
				// });
			}
			const miscData = validationResult.data;
			const miscPayload = await this.settleService.generateMiscPayload(
				userId,
				miscData,
			);

			settleLogger.info(
				"Settlement generated successfully",
				getLoggerMeta(req),
			);

			(req as any).miscPayload = miscPayload;

			return sendSuccess(
				res,
				miscPayload,
				"Settlement generated successfully",
				201,
			);
			// return res.status(201).json(miscPayload);
			//   const miscData = req.body.miscData;
		} catch (error: any) {
			settleLogger.error(
				"Error generating settlement",
				getLoggerMeta(req),
				error,
			);

			return sendError(res, "INTERNAL_ERROR", undefined, {
				error: error.message,
			});
			// res.status(500).json({ message: error.message });
		}
	};

	generateNilSettlement = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		try {
			settleLogger.info("Generating Nil settlement", getLoggerMeta(req));
			const userId = req.params.userId;
			if (!validateUserId(userId)) {
				settleLogger.error("Valid User ID is required", getLoggerMeta(req));
				return sendError(res, "INVALID_QUERY_PARAMS", undefined, {
					message: "Valid User ID is required",
				});
				// return res.status(400).json({ message: "Valid User ID is required" });
			}

			// res.status(400).json({ message: "Valid User ID is required" });

			const validationResult = NilSettlementSchema.safeParse(req.body);
			if (!validationResult.success) {
				settleLogger.error(
					"Invalid request body",
					getLoggerMeta(req),
					validationResult.error,
				);

				// sendError()
				return sendError(res, "INVALID_REQUEST_BODY", undefined, {
					message: "Invalid request body",
					errors: z.treeifyError(validationResult.error),
				});
				// return res.status(400).json({

				// return res.status(400).json({
				// 	message: "Invalid request body",
				// 	errors: z.treeifyError(validationResult.error),
				// });
			}
			const nilPayload = await this.settleService.generateNilPayload(userId);

			settleLogger.info(
				"Settlement generated successfully",
				getLoggerMeta(req),
			);

			(req as any).nilPayload = nilPayload;
			return sendSuccess(
				res,
				nilPayload,
				"Settlement generated successfully",
				201,
			);
			//
			// return res.status(201).json(nilPayload);
			//   const miscData = req.body.miscData;
		} catch (error: any) {
			settleLogger.error(
				"Error generating settlement",
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
