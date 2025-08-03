import { TriggerService } from "../services/trigger-services/trigger-service";
import logger from "../utils/logger";
import { Request, Response } from "express";
import { getLoggerMeta } from "../utils/utility";
import { validateUserId } from "../types/user-id-type";
import { TriggerActionSchema } from "../types/trigger-types";
import { z } from "zod";
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
				return res.status(400).json({ message: "Valid User ID is required" });
			}
			const actionValidationResult = TriggerActionSchema.safeParse(action);
			if (!actionValidationResult.success) {
				triggerLogger.error(
					"Invalid action",
					getLoggerMeta(req),
					actionValidationResult.error
				);
				return res.status(400).json({
					message: "Invalid action",
					errors: z.treeifyError(actionValidationResult.error),
				});
			}
			const body = req.body;
			const response = await this.triggerService.handleTrigger(
				actionValidationResult.data,
				userId,
				body
			);
			triggerLogger.info("Trigger handled successfully", getLoggerMeta(req), {
				response,
			});
			res.status(response.status).json(response.data);
			return;
		} catch (error: any) {
			triggerLogger.error("Error handling trigger", getLoggerMeta(req), error);
			res.status(500).json({ message: error.message });
			return;
		}
	};
}
