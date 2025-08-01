import { Request, Response, NextFunction } from "express";
import logger from "../utility/logger";

export default (req: Request, res: Response, next: NextFunction) => {
	const originalJson = res.json;
	const originalSend = res.send;
	res.json = function (data: any) {
		logger.info(`Response Log`, {
			statusCode: res.statusCode,
			correlationId: req.correlationId,
		});
		return originalJson.call(this, data);
	};
	res.send = function (data: any) {
		logger.info(`Response Log`, {
			statusCode: res.statusCode,
			correlationId: req.correlationId,
		});
		return originalSend.call(this, data);
	};
	next();
};
