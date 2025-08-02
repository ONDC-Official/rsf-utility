import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import logger from "../utils/logger";
import { getLoggerMeta } from "../utils/utility";

export class UserController {
	constructor(private userService: UserService) {}

	createUser = async (req: Request, res: Response) => {
		try {
			const body = req.body;
			logger.info("Creating user", getLoggerMeta(req), body);
			const user = await this.userService.createUser(body);
			res.status(201).json(user);
		} catch (error: any) {
			logger.error("Error creating user", getLoggerMeta(req), error);
			res.status(400).json({ message: error.message });
		}
	};

	getUsers = async (_req: Request, res: Response) => {
		try {
			logger.info("Fetching all users", getLoggerMeta(_req));
			const users = await this.userService.getUsers();
			res.status(200).json(users);
		} catch (error: any) {
			logger.error("Error fetching users", getLoggerMeta(_req), error);
			res.status(500).json({ message: error.message });
		}
	};
}
