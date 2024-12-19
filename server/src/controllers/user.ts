import User from "../models/user";
import { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
  const { steamId } = req.body;
  const user = await User.findOne({ steamId: steamId });
  if (user) {
    res.status(409).send({ e: "409", message: "User already exists" });
    return;
  }
  if (steamId.length < 8) {
    res.status(400).send({
      e: "400",
      message: "SteamID should be at least 8 characters long",
    });
    return;
  }
  try {
    await User.create({ ...req.body });
    res.status(201).send({ message: "User created!" });
  } catch (e) {
    res.status(400).send({ e, message: "Something went wrong" });
  }
};

export const profile = async (req: Request, res: Response) => {
  try {
    const { steamId } = req.body;
    const user = await User.findOne({ steamId: steamId });
    res.status(200).send(user);
  } catch (e) {
    res.status(404).send({ e, message: "User not found" });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find({});
    res.status(200).send(allUsers);
  } catch (e) {
    res.status(400).send({ e, message: "Something went wrong" });
  }
};

export const deleteOne = async (req: Request, res: Response) => {
  try {
    const { steamId } = req.body;
    await User.deleteOne({ steamId: steamId });
    res.status(200).send({ message: "User deleted" });
  } catch (e) {
    res.status(400).send({ e, message: "Something went wrong" });
  }
};
