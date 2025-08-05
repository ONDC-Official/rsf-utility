import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import { container } from "../di/container";
import { getLoggerMeta } from "../utils/utility";
import { RsfActionListSchema } from "../types/rsf-payloads-params";
export const rsfAuditLogger = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const originalSend = res.send;
	if (!res.locals.isSendWrapped) {
		res.locals.isSendWrapped = true; // Flag to indicate the wrapping is done
		res.send = function (data: any) {
			if (!res.locals.isCacheUpdated) {
				res.locals.isCacheUpdated = true;
				saveRsfPayload(req, data, res);
			}
			return originalSend.call(this, data);
		};
	}
	next();
};
function saveRsfPayload(req: Request, data: any, res: Response) {
	const action = req.params.action;
	const validationResult = RsfActionListSchema.safeParse(action);
	if (!validationResult.success) {
		logger.warning("Skipping rsfAuditLogger middleware", getLoggerMeta(req));
		return;
	}
	logger.info(
		"Saving Rsf Payload to DB",
		getLoggerMeta(req),
		req.body,
		data,
		res.statusCode,
	);
	container.rsfPayloadDbService.saveRsfPayload({
		requestData: req.body,
		responseData: {
			body: data,
			statusCode: res.statusCode,
		},
	});
}
