import express from "express";
import { Request, Response } from "express";
import { create, deleteOne, profile, getAll } from "./controllers/user";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Welcome!");
});
router.post("/register", create);
router.delete("/delete", deleteOne);
router.get("/me", profile);
router.get("/all", getAll);

export default router;
