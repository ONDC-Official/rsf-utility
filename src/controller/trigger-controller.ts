import { TriggerService } from "../services/trigger-services/trigger-service";
import logger from "../utils/logger";
import { Request, Response } from "express";
import { getLoggerMeta } from "../utils/utility";
import { validateUserId } from "../types/user-id-type";
import { TriggerActionSchema } from "../types/trigger-types";
import { z } from "zod";
import { sendError, sendSuccess } from "../utils/resUtils";
import { isPerfectAck } from "../utils/ackUtils";
const triggerLogger = logger.child("trigger-controller");

export class TriggerController {
	constructor(private triggerService: TriggerService) {}

	handleTrigger = async (req: Request, res: Response) => {
		try {
			const { userId, action } = req.params;
			triggerLogger.info("Handling trigger", getLoggerMeta(req), {
				userId,
				action,
			});
			if (!validateUserId(userId)) {
				triggerLogger.error("Valid User ID is required", getLoggerMeta(req));

				return sendError(res, "INVALID_QUERY_PARAMS", undefined, {
					message: "Valid User ID is required",
				});
			}
			const actionValidationResult = TriggerActionSchema.safeParse(action);
			if (!actionValidationResult.success) {
				triggerLogger.error(
					"Invalid action",
					getLoggerMeta(req),
					actionValidationResult.error,
				);
				return sendError(res, "SCHEMA_VALIDATION_FAILED", undefined, {
					errors: z.treeifyError(actionValidationResult.error),
				});
			}
			const body = req.body;
			const response = await this.triggerService.handleTrigger(
				actionValidationResult.data,
				userId,
				body,
			);

			if (!isPerfectAck(response.data)) {
				triggerLogger.error(
					"Trigger response is not a perfect ACK",
					getLoggerMeta(req),
					{
						response,
					},
				);
				return sendError(res, "BAD_GATEWAY", undefined, { got: response.data });
			}

			triggerLogger.info("Trigger handled successfully", getLoggerMeta(req), {
				response,
			});
			return sendSuccess(res, response.data, undefined, response.status);
		} catch (error: any) {
			triggerLogger.error("Error handling trigger", getLoggerMeta(req), error);
			return sendError(res, "INTERNAL_ERROR", undefined, {
				error: error.message,
			});
		}
	};
}
