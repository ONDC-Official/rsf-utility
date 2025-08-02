import { UserController } from "../controller/user.controller";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// Export all controllers (or services too, if needed)
export const container = {
	userController,
};
