import { Router } from "express";
import { container } from "../../di/container";

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
userRoutes.post("/", userController.createUser);
// userRoutes.put("/:id", userController.updateUser);
// userRoutes.delete("/:id");

export default userRoutes;
