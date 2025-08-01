import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/", (req, res) => {
	res.send("get all user configs");
});
// userRoutes.post("/");
// userRoutes.put("/:id");
// userRoutes.delete("/:id");

export default userRoutes;
