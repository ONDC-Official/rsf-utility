import { AuthService } from "../services/auth-service";
import { Request, Response } from "express";
import { getLoggerMeta } from "../utils/utility";
import logger from "../utils/logger";
import config from "../config/auth-config";
import { sendError, sendSuccess } from "../utils/resUtils";

const authController = {
	signToken: async (req: Request, res: Response) => {
		const { client_id, expires } = req.body; //client id from request body
		const { CLIENT_ID } = config; //Saved CLIENT_ID
		const authService = new AuthService(CLIENT_ID);

		const token = authService.issueToken(client_id, expires);

		if (!token) {
			return sendError(res, "INVALID_CLIENT_ID", "Invalid client_id");
		}

		return sendSuccess(res, { token }, "Token issued successfully");
	},
};

export default authController;
