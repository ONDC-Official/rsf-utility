import { ReconDbService } from "../services/recon-service";
import logger from "../utils/logger";
import { sendError, sendSuccess } from "../utils/resUtils";
import { Request, Response } from "express";
import { getLoggerMeta } from "../utils/utility";
import {
	GetReconsQuerySchema,
	MoveReconsBodySchema,
} from "../types/recon-params";
import { z } from "zod";
import { validateUserId } from "../types/user-id-type";
import { RsfOrchestratorService } from "../services/rsf-orchestrator-service";

const reconLogger = logger.child("recon-controller");

export class ReconController {
	constructor(
		private reconService: ReconDbService,
		private rsfOrchestratorService: RsfOrchestratorService,
	) {}

	/**
	 * Get recons for a user with filtering and pagination
	 */
	getRecons = async (req: Request, res: Response) => {
		try {
			reconLogger.info("Fetching recons", getLoggerMeta(req));

			const userId = req.params.userId;
			if (!validateUserId(userId)) {
				reconLogger.error("Valid User ID is required", getLoggerMeta(req));
				return sendError(res, "INVALID_QUERY_PARAMS", undefined, {
					message: "Valid User ID is required",
				});
			}

			const validationResult = GetReconsQuerySchema.safeParse(req.query);
			if (!validationResult.success) {
				reconLogger.error(
					"Invalid query parameters",
					getLoggerMeta(req),
					validationResult.error,
				);
				return sendError(res, "INVALID_QUERY_PARAMS", undefined, {
					message: "Invalid query parameters",
					errors: z.treeifyError(validationResult.error),
				});
			}

			const data = await this.reconService.getRecons(
				userId,
				validationResult.data,
			);

			reconLogger.info("Recons fetched successfully", getLoggerMeta(req));
			return sendSuccess(res, data, "Recons fetched successfully");
		} catch (error: any) {
			reconLogger.error("Error fetching recons", getLoggerMeta(req), error);
			return sendError(res, "INTERNAL_ERROR", undefined, {
				error: error.message,
			});
		}
	};

	/**
	 * Get a specific recon by user ID and order ID
	 */
	getReconById = async (req: Request, res: Response) => {
		try {
			reconLogger.info("Fetching recon by ID", getLoggerMeta(req));

			const userId = req.params.userId;
			const orderId = req.params.orderId;

			if (!validateUserId(userId)) {
				reconLogger.error("Valid User ID is required", getLoggerMeta(req));
				return sendError(res, "INVALID_QUERY_PARAMS", undefined, {
					message: "Valid User ID is required",
				});
			}

			if (!orderId || orderId.trim().length === 0) {
				reconLogger.error("Valid Order ID is required", getLoggerMeta(req));
				return sendError(res, "INVALID_QUERY_PARAMS", undefined, {
					message: "Valid Order ID is required",
				});
			}

			const data = await this.reconService.getReconById(userId, orderId);

			if (!data) {
				reconLogger.info("Recon not found", getLoggerMeta(req));
				return sendError(res, "INTERNAL_ERROR", "Recon not found", {
					message: `Recon for order ${orderId} not found for user ${userId}`,
				});
			}

			reconLogger.info("Recon fetched successfully", getLoggerMeta(req));
			return sendSuccess(res, data, "Recon fetched successfully");
		} catch (error: any) {
			reconLogger.error(
				"Error fetching recon by ID",
				getLoggerMeta(req),
				error,
			);
			return sendError(res, "INTERNAL_ERROR", undefined, {
				error: error.message,
			});
		}
	};

	moveReconsToReady = async (req: Request, res: Response) => {
		try {
			reconLogger.info("Moving recons to ready", getLoggerMeta(req));

			const userId = req.params.userId;
			if (!validateUserId(userId)) {
				reconLogger.error("Valid User ID is required", getLoggerMeta(req));
				return sendError(res, "INVALID_QUERY_PARAMS", undefined, {
					message: "Valid User ID is required",
				});
			}
			const validationResult = MoveReconsBodySchema.safeParse(req.body);
			if (!validationResult.success) {
				reconLogger.error(
					"Invalid body parameters",
					getLoggerMeta(req),
					validationResult.error,
				);
				return sendError(res, "INVALID_REQUEST_BODY", undefined, {
					message: "Invalid body parameters",
					errors: z.treeifyError(validationResult.error),
				});
			}
			const data = await this.rsfOrchestratorService.moveReconsToReady(
				userId,
				validationResult.data,
			);
			reconLogger.info(
				"Recons moved to ready successfully",
				getLoggerMeta(req),
			);
			return sendSuccess(res, data, "Recons moved to ready successfully");
		} catch (error: any) {
			reconLogger.error(
				"Error moving recons to ready",
				getLoggerMeta(req),
				error,
			);
			return sendError(res, "INTERNAL_ERROR", undefined, {
				error: error.message,
			});
		}
	};
}
