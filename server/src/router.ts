import express from "express";
import { Request, Response } from "express";
import { registerUser, deleteOne, loginUser, getUser } from "./controllers/user";
import { authMiddleware } from "./middlewares/auth";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Welcome!");
});
router.get("/profile", authMiddleware, getUser);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.delete("/delete", deleteOne);

export default router;
