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
	const originalJson = res.json;
	const originalSend = res.send;
	res.json = function (data: any) {
		saveRsfPayload(req, data, res);
		return originalJson.call(this, data);
	};
	res.send = function (data: any) {
		saveRsfPayload(req, data, res);
		return originalSend.call(this, data);
	};
	next();
};
function saveRsfPayload(req: Request, data: any, res: Response) {
	const action = req.params.action;
	const validationResult = RsfActionListSchema.safeParse(action);
	if (!validationResult.success) {
		logger.warning("Skipping rsfAuditLogger middleware", getLoggerMeta(req));
		return;
	}
	logger.info("Saving Rsf Payload to DB", getLoggerMeta(req));
	container.rsfPayloadDbService.saveRsfPayload({
		requestData: req.body,
		responseData: {
			body: data,
			statusCode: res.statusCode,
		},
	});
}
