import User from "../models/user";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY: string | undefined = process.env.SECRET_KEY;

export const registerUser = async (req: Request, res: Response) => {
  const { username, password, steamId } = req.body;

  try {
    let existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(409).send({ message: "User already exists" });
      return;
    }
    existingUser = await User.findOne({ steamId });
    if (existingUser) {
      res
        .status(409)
        .send({ message: "User with such steamId already exists" });
      return;
    }

    if (password.length < 8) {
      res
        .status(400)
        .send({ message: "Password should be at least 8 characters long" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ ...req.body, password: hashedPassword });
    const savedUser = await newUser.save();
    const token = jwt.sign({ id: savedUser._id }, SECRET_KEY as string, {
      expiresIn: "1h",
    });
    res.status(201).send({ message: "User created", token });
  } catch (err) {
    res.status(500).send({ error: err, message: "Something went wrong" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).send({ message: "Wrong password" });
      return;
    }
    const token = jwt.sign({ id: user._id }, SECRET_KEY as string, {
      expiresIn: "1h",
    });
    res.status(200).send({ message: "Login successful", token });
  } catch (err) {
    res.status(500).send({ error: err, message: "Something went wrong" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    res.status(200).send({ user: req.body });
  } catch (error) {
    res.status(404).send({ error, message: "Resource not found" });
  }
};

export const deleteOne = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // await User.deleteOne({ steamId: steamId });
    res.status(200).send({ message: "User deleted" });
  } catch (e) {
    res.status(400).send({ e, message: "Something went wrong" });
  }
};
