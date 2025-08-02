import { Router } from "express";
import { container } from "../../di/container";
import { schemaValidatorForUser } from "../../controller/validation-controller";
import { UserAjvSchema } from "../../schema/models/user.schema";

const userRoutes = Router();
const userController = container.userController;
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
userRoutes.get("/", userController.getUsers);
userRoutes.post(
	"/",
	schemaValidatorForUser(UserAjvSchema),
	userController.createUser
);
// userRoutes.put(
// 	"/:id",
// 	schemaValidatorForUser(UserAjvSchema),
// 	userController.putUser
// );
userRoutes.patch("/:id", userController.updateUser); // only tax details are editable
// userRoutes.delete("/:id", userController.deleteUser);
export default userRoutes;
