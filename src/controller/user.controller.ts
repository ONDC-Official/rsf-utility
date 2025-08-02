import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import logger from "../utils/logger";
import { getLoggerMeta } from "../utils/utility";

const userLogger = logger.child("user-controller");

export class UserController {
	constructor(private userService: UserService) {}

	createUser = async (req: Request, res: Response) => {
		try {
			const body = req.body;
			userLogger.info("Creating user", getLoggerMeta(req), body);
			const user = await this.userService.createUser(body);
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
			if (!userId) {
				res.status(400).json({ message: "User ID is required" });
				return;
			}
			if (!(await this.userService.checkUserById(userId))) {
				res.status(404).json({ message: "User not found" });
				return;
			}
			userLogger.info("Patching user", getLoggerMeta(req), { userId, body });
			const updatedUser = await this.userService.overrideUser(userId, body);
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
			if (!userId) {
				res.status(400).json({ message: "User ID is required" });
				return;
			}
			if (!(await this.userService.checkUserById(userId))) {
				res.status(404).json({ message: "User not found" });
				return;
			}
			userLogger.info("Updating user", getLoggerMeta(req), { userId, body });
			const updatedUser = await this.userService.updateUserDetails(
				userId,
				body
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
}
