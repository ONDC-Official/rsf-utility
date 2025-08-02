import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import { getLoggerMeta } from "../utils/utility";
import { orderJsonPathMap } from "../utils/json-path";
import { extractFields } from "../services/payload-service";

export const payloadHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const payload = req.body;
	const { bap_user_id, bpp_user_id } = res.locals;
	const extracted = extractFields(payload, orderJsonPathMap);
	const updatedAt = new Date(
		payload.context?.timestamp || extracted.updated_at
	);
	const userIds = [bap_user_id, bpp_user_id].filter(Boolean);

	logger.info("Payload handler invoked", getLoggerMeta(req));
	next();
};
