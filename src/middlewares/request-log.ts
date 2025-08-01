import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

export default (req: Request, _res: Response, next: NextFunction) => {
	logger.info(`Request Log: ${req.method} ${req.url}`, {
		method: req.method,
		url: req.url,
		body: req.body,
		query: req.query,
		correlationId: req.correlationId,
		params: req.params,
	});
	next();
};
