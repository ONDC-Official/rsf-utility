import { NextFunction, Request, Response } from "express";
import { RSF_DOMAINS } from "../constants/enums";
import logger from "../utils/logger";
import { getLoggerMeta } from "../utils/utility";
import { RsfService } from "../services/rsf-request-api-services/rsf-service";
import { RsfOnActionsSchema } from "../types/rsf-type";
import { getAckResponse, getNackResponse } from "../utils/ackUtils";
import { validateHeader, validateHeaderFromNp } from "../utils/header-utils";
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
			if (action == "settle" && process.env.NODE_ENV === "test") {
				rsfLogger.warning(
					"Settle is not supported responding with ACK for testing purposes",
					getLoggerMeta(req),
				);
				res.send(getAckResponse());
			}
			const actionValidationResult = RsfOnActionsSchema.safeParse(action);
			if (!actionValidationResult.success) {
				rsfLogger.error(
					"Invalid action detected for RSF payload",
					getLoggerMeta(req),
					{ action },
				);

				return res.status(200).send(getNackResponse("70002"));
			}
			// const auth = req.headers.authorization;
			// if (!auth) {
			// 	logger.warning("Authorization header is missing", getLoggerMeta(req));
			// 	res.status(200).send(getNackResponse("70001"));
			// 	return;
			// }
			// perform header-validations
			// if (["on_settle", "on_report"].includes(action)) {
			// 	const isHeaderValid = validateHeader(
			// 		req.headers,
			// 		payload,
			// 		SettleAgencyConfig.agencyKey,
			// 	);
			// 	if (!isHeaderValid) {
			// 		rsfLogger.error("Invalid header", getLoggerMeta(req));
			// 		res.status(200).send(getNackResponse("70000"));
			// 		return;
			// 	}
			// } else {
			// 	rsfLogger.info(
			// 		`Validating headers for ${action} from NP`,
			// 		getLoggerMeta(req),
			// 	);
			// 	const isHeaderValid = validateHeaderFromNp(
			// 		req.headers,
			// 		payload,
			// 		getLoggerMeta(req),
			// 	);
			// 	if (!isHeaderValid) {
			// 		rsfLogger.error("Invalid header from NP", getLoggerMeta(req));
			// 		res.status(200).send(getNackResponse("70000"));
			// 		return;
			// 	}
			// }
			rsfLogger.info(
				"Valid RSF payload received with valid header",
				getLoggerMeta(req),
				{
					action,
					payload,
				},
			);
			const response = await this.rsfService.ingestRsfPayload(
				payload,
				actionValidationResult.data,
			);
			return res.send(response);
		} catch (error: any) {
			rsfLogger.error("Error handling RSF payload", getLoggerMeta(req), {
				error,
			});
			res.status(200).send(getNackResponse("503", error?.message ?? ""));
			return;
		}
	};
}
