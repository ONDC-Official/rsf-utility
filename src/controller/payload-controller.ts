import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import { getLoggerMeta } from "../utils/utility";

export const payloadHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	logger.info("Payload handler invoked", getLoggerMeta(req));
	next();
};
