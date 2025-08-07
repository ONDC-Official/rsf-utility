import { GenerateSettleService } from "../services/generate-services/generate-settle-service";
import { getLoggerMeta } from "../utils/utility";
import logger from "../utils/logger";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { validateUserId } from "../types/user-id-type";
import { sendError, sendSuccess } from "../utils/resUtils";
import {
	GenerateSettlementsBody,
	MiscSettlementSchema,
	NilSettlementSchema,
} from "../types/settle-params";
import { GenOnReconBody, GenReconBody } from "../types/generate-recon-types";
import { GenerateReconService } from "../services/generate-services/generate-recon-service";
import { GenerateOnReconService } from "../services/generate-services/generate-on_recon-service";

const settleLogger = logger.child("generate-controller");
export class GenerateController {
	constructor(
		private generateSettleService: GenerateSettleService,
		private generateReconService: GenerateReconService,
		private generateOnReconService: GenerateOnReconService,
	) {}

	handleSettleNpNp = async (req: Request, res: Response) => {
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
			}
			const settlementPayload =
				await this.generateSettleService.generateSettlePayloads(
					userId,
					validationResult.data.settle_data,
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

	handleSettleMisc = async (
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
			const miscPayload = await this.generateSettleService.generateMiscPayload(
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

	handleSettleNil = async (req: Request, res: Response, next: NextFunction) => {
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
			}
			const nilPayload =
				await this.generateSettleService.generateNilPayload(userId);

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

	handleRecon = async (req: Request, res: Response) => {
		try {
			const body = req.body;
			settleLogger.info("Handling generate recon", getLoggerMeta(req), body);
			const userId = req.params.userId;
			if (!validateUserId(userId)) {
				settleLogger.error("Valid User ID is required", getLoggerMeta(req));
				return sendError(res, "INVALID_QUERY_PARAMS", undefined, {
					message: "Valid User ID is required",
				});
			}
			const validationResult = GenReconBody.safeParse(body);
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
			const reconData = validationResult.data;
			const reconPayload = await this.generateReconService.generateReconPayload(
				userId,
				reconData,
			);
			settleLogger.info(
				"Recon payload generated successfully",
				getLoggerMeta(req),
			);
			return sendSuccess(
				res,
				reconPayload,
				"Recon payload generated successfully",
				201,
			);
		} catch (error: any) {
			settleLogger.error("Error handling recon", getLoggerMeta(req), error);
			return sendError(res, "INTERNAL_ERROR", undefined, {
				error: error.message,
			});
		}
	};

	handleOnRecon = async (req: Request, res: Response) => {
		try {
			// Implementation for handling on-reconciliation requests
			logger.info("Handling generate on-recon", getLoggerMeta(req));
			const userId = req.params.userId;
			if (!validateUserId(userId)) {
				logger.error("Valid User ID is required", getLoggerMeta(req));
				return sendError(res, "INVALID_QUERY_PARAMS", undefined, {
					message: "Valid User ID is required",
				});
			}
			const validationResult = GenOnReconBody.safeParse(req.body);
			if (!validationResult.success) {
				logger.error(
					"Invalid request body",
					getLoggerMeta(req),
					validationResult.error,
				);
				return sendError(res, "INVALID_REQUEST_BODY", undefined, {
					message: "Invalid request body",
					errors: z.treeifyError(validationResult.error),
				});
			}
			const onReconData = validationResult.data.on_recon_data;
			const onReconPayload =
				await this.generateOnReconService.generateOnReconPayload(
					userId,
					onReconData,
				);
			logger.info(
				"On-recon payload generated successfully",
				getLoggerMeta(req),
			);
			return sendSuccess(
				res,
				onReconPayload,
				"On-recon payload generated successfully",
				201,
			);
		} catch (error: any) {
			logger.error(
				"Error handling generate on-recon",
				getLoggerMeta(req),
				error,
			);
			return sendError(res, "INTERNAL_ERROR", undefined, {
				error: error.message,
			});
		}
	};
}
