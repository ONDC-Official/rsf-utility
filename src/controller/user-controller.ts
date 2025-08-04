import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user-service";
import logger from "../utils/logger";
import { getLoggerMeta } from "../utils/utility";
import { UserSchema } from "../schema/models/user-schema";
import { z } from "zod";
import { validateUserId } from "../types/user-id-type";

const userLogger = logger.child("user-controller");

export class UserController {
	constructor(private userService: UserService) {}

	createUser = async (req: Request, res: Response) => {
		try {
			const body = req.body;
			const validationResult = UserSchema.safeParse(body);
			if (!validationResult.success) {
				userLogger.error(
					"Invalid user data",
					getLoggerMeta(req),
					validationResult.error,
				);
				res.status(400).json({
					message: "Invalid user data",
					errors: z.treeifyError(validationResult.error),
				});
				return;
			}
			userLogger.info(
				"Creating user",
				getLoggerMeta(req),
				validationResult.data,
			);
			const user = await this.userService.createUser(validationResult.data);
			res.status(201).json(user);
		} catch (error: any) {
			userLogger.error("Error creating user", getLoggerMeta(req), error);
			res.status(400).json({ message: error.message });
		}
	};

	getUsers = async (req: Request, res: Response) => {
		try {
			userLogger.info("Fetching all users", getLoggerMeta(req));
			const users = await this.userService.getUsers();
			res.status(200).json(users);
		} catch (error: any) {
			userLogger.error("Error fetching users", getLoggerMeta(req), error);
			res.status(500).json({ message: error.message });
		}
	};

	putUser = async (req: Request, res: Response) => {
		try {
			const userId = req.params.id;
			const body = req.body;
			if (!validateUserId(userId)) {
				res.status(400).json({ message: "Valid User ID is required" });
				return;
			}
			if (!(await this.userService.checkUserById(userId))) {
				res.status(404).json({ message: "User not found" });
				return;
			}
			const validationResult = UserSchema.safeParse(body);
			if (!validationResult.success) {
				userLogger.error(
					"Invalid user data",
					getLoggerMeta(req),
					validationResult.error,
				);
				res.status(400).json({
					message: "Invalid user data",
					errors: z.treeifyError(validationResult.error),
				});
				return;
			}
			userLogger.info("Patching user", getLoggerMeta(req), { userId, body });
			const updatedUser = await this.userService.overrideUser(
				userId,
				validationResult.data,
			);
			res.status(200).json(updatedUser);
		} catch (error: any) {
			userLogger.error("Error patching user", getLoggerMeta(req), error);
			res.status(400).json({ message: error.message });
		}
	};

	updateUser = async (req: Request, res: Response) => {
		try {
			const userId = req.params.id;
			const body = req.body;
			if (!validateUserId(userId)) {
				res.status(400).json({ message: "Valid User ID is required" });
				return;
			}
			if (!(await this.userService.checkUserById(userId))) {
				res.status(404).json({ message: "User not found" });
				return;
			}
			userLogger.info("Updating user", getLoggerMeta(req), { userId, body });
			const updatedUser = await this.userService.updateUserDetails(
				userId,
				body,
			);
			res.status(200).json(updatedUser);
		} catch (error: any) {
			userLogger.error("Error updating user", getLoggerMeta(req), error);
			res.status(400).json({ message: error.message });
		}
	};

	deleteUser = async (req: Request, res: Response) => {
		try {
			const userId = req.params.id;
			if (!userId) {
				res.status(400).json({ message: "User ID is required" });
				return;
			}
			if (!(await this.userService.checkUserById(userId))) {
				res.status(404).json({ message: "User not found to delete" });
				return;
			}
			userLogger.info("Deleting user", getLoggerMeta(req), { userId });
			await this.userService.deleteUser(userId);
			res.status(204).send();
		} catch (error: any) {
			userLogger.error("Error deleting user", getLoggerMeta(req), error);
			res.status(400).json({ message: error.message });
		}
	};
	userValidationMiddleware = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		logger.info("User Handler invoked", getLoggerMeta(req));
		try {
			const payload = req.body;
			const { domain, bap_uri, bpp_uri } = payload.context;
			if (!domain || !bap_uri || !bpp_uri) {
				return res.status(400).json({
					message: "Domain, BAP URL, and BPP URL are required in the context",
				});
			}
			const { bap_user_uri, bpp_user_uri } =
				await this.userService.getUserIdsByRoleAndDomain(
					domain,
					bap_uri,
					bpp_uri,
				);
			if (!bap_user_uri && !bpp_user_uri) {
				return res.status(400).json({
					message: "Cannot find user for this domain and subscriber_id.",
				});
			}
			res.locals.bap_user_url = bap_user_uri;
			res.locals.bpp_user_url = bpp_user_uri;
			next();
		} catch (e: any) {
			logger.error("Error in user validation", getLoggerMeta(req), e);
			res.status(500).json({ message: "Internal server error" });
			return;
		}
	};
}
