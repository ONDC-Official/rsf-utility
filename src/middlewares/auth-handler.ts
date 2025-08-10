import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/auth-config";
import { sendError, sendSuccess } from "../utils/resUtils";
import logger from "../utils/logger";
const authLogger = logger.child("auth-handler");

const verifyClientToken = (req: Request, res: Response, next: NextFunction) => {
	next();
	// try {
	// 	const { JWT_SECRET, CLIENT_ID } = config;
	// 	const authHeader = req.headers.authorization;
	// 	if (!authHeader)
	// 		return sendError(
	// 			res,
	// 			"AUTH_INVALID_TOKEN",
	// 			"Missing authorization token",
	// 		);

	// 	const token = authHeader.split(" ")[1]; // Assuming Bearer token format

	// 	const decoded = jwt.verify(token, JWT_SECRET) as { client_id: string };

	// 	if (decoded.client_id !== CLIENT_ID) {
	// 		authLogger.error("Auth Token Verification Failed", {
	// 			client_id: decoded.client_id,
	// 		});
	// 		return sendError(res, "AUTH_INVALID_TOKEN", "Token verification failed");
	// 	}

	// 	next();
	// } catch (err) {
	// 	return sendError(res, "AUTH_INVALID_TOKEN", "Invalid or expired token");
	// 	// return res.status(403).json({ message: "Invalid or expired token" });
	// }
};

export default verifyClientToken;
