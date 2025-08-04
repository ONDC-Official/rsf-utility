import { NextFunction, Request, Response } from "express";
import { RSF_DOMAINS } from "../constants/enums";
import logger from "../utils/logger";
import { getLoggerMeta } from "../utils/utility";
import { RsfService } from "../services/rsf-api-services/rsf-service";
import { RsfOnActionsSchema } from "../types/rsf-type";
import { getAckResponse, getNackResponse } from "../utils/ackUtils";
import { validateHeader } from "../utils/header-utils";
import { SettleAgencyConfig } from "../config/rsf-utility-instance-config";
const rsfLogger = logger.child("rsf-controller");

export class RsfRequestController {
	constructor(private rsfService: RsfService) {}

	rsfPayloadHandler = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		// ? response only with ONDC (ACK/NACK)s
		try {
			const payload = req.body;
			const domain = payload.context.domain;
			if (!RSF_DOMAINS.includes(domain)) {
				rsfLogger.info(
					"Non-RSF domain detected, skipping RSF payload handling",
					getLoggerMeta(req),
					{ domain },
				);
				return next();
			}
			const action = req.params.action;
			const actionValidationResult = RsfOnActionsSchema.safeParse(action);
			if (!actionValidationResult.success) {
				rsfLogger.error(
					"Invalid action detected for RSF payload",
					getLoggerMeta(req),
					{ action },
				);

				return res.status(200).send(getNackResponse("70002"));

				// return res.status(400).json({
				// 	message: "Invalid action for RSF payload",
				// 	errors: z.treeifyError(actionValidationResult.error),
				// });
			}
			const auth = req.headers.authorization;
			if (!auth) {
				logger.warning("Authorization header is missing", getLoggerMeta(req));
				res.status(200).send(getNackResponse("70001"));
				return;
			}

			// perform header-validations
			if (["on_settle", "on_report"].includes(action)) {
				const isHeaderValid = validateHeader(
					req.headers,
					payload,
					SettleAgencyConfig.agencyKey,
				);
				if (!isHeaderValid) {
					rsfLogger.error("Invalid header", getLoggerMeta(req));
					res.status(200).send(getNackResponse("70000"));
					return;
				}
			} else {
				// ! TODO: implement header validations for on_recon
			}
			logger.info("Valid RSF payload received", getLoggerMeta(req), {
				action,
				payload,
			});
			this.rsfService.ingestRsfPayload(payload, actionValidationResult.data);
			res.status(200).send(getAckResponse());
		} catch (error) {
			rsfLogger.error("Error handling RSF payload", getLoggerMeta(req), {
				error,
			});
			res.status(200).send(getNackResponse("503"));
			return;
		}
	};
}
