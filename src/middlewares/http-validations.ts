import { NextFunction, Request, Response } from "express";
import { sendError } from "../utils/resUtils";

export function requireJsonContent(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	if (req.headers["content-type"] !== "application/json") {
		return sendError(
			res,
			"INVALID_REQUEST_BODY",
			"Content-Type must be application/json",
		);
	}
	next();
}
