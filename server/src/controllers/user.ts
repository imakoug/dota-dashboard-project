import { User } from "../models/user";
import { Request, Response } from "express";
import { Socket } from "socket.io";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import activeUsers from "..";

dotenv.config();

const SECRET_KEY: string | undefined = process.env.SECRET_KEY;

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, steamId } = req.body;

  try {
    let existingUser = await User.findOne({ email });
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
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
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

export const sendRequest = async (req: Request, res: Response) => {
  try {
    const { steamId, friendSteamId } = req.body;

    if (!steamId || !friendSteamId) {
      res.status(400).json({ error: "User IDs are required." });
      return;
    }
    if (steamId === friendSteamId) {
      res.status(400).json({ error: "Cannot add yourself as a friend." });
      return;
    }
    const user = await User.findOne({ steamId: steamId });
    const friend = await User.findOne({ steamId: friendSteamId });

    if (!user || !friend) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    if (
      friend.friends.includes(steamId) ||
      user.friends.includes(friendSteamId)
    ) {
      res.status(400).send({
        error: "400",
        message: "you are already friends with this user!",
      });
      return;
    }
    if (
      friend.pendingRequests.includes(steamId) ||
      user.sentRequests.includes(friendSteamId)
    ) {
      res.status(400).send({
        error: "400",
        message: "you have already sent a friend request to this user",
      });
      return;
    }

    friend.pendingRequests.push(steamId);
    user.sentRequests.push(friendSteamId);
    await friend.save();
    await user.save();
    const friendSocketId = activeUsers[friendSteamId];
    if (friendSocketId) {
      const io: Socket = req.app.get("io");
      io.to(friendSocketId).emit("newFriendRequest", {
        from: steamId,
        message: `${user.email} sent you a friend request.`,
      });
    }

    res.status(200).json({ message: "Friend request sent.", friendEmail: friend.email });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const acceptRequest = async (req: Request, res: Response) => {
  try {
    const { steamId, friendSteamId } = req.body;

    if (!steamId || !friendSteamId) {
      res.status(400).json({ error: "User IDs are required." });
      return;
    }

    const user = await User.findOne({ steamId: steamId });
    const friend = await User.findOne({ steamId: friendSteamId });

    if (!user || !friend) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    if (user.friends.includes(friendSteamId)) {
      res.status(400).json({ error: "already friends" });
      return;
    }
    if (friend.friends.includes(steamId)) {
      res.status(400).json({ error: "already friends" });
      return;
    }

    user.friends.push(friendSteamId);
    friend.friends.push(steamId);

    user.pendingRequests = user.pendingRequests.filter(
      (id) => id !== friendSteamId
    );
    friend.sentRequests = friend.sentRequests.filter((id) => id !== steamId);

    await user.save();
    await friend.save();

    const io: Socket = req.app.get("io");
    const userSocketId = activeUsers[steamId];
    const friendSocketId = activeUsers[friendSteamId];

    if (userSocketId) {
      io.to(userSocketId).emit("friendAdded", {
        friendId: friendSteamId,
        email: friend.email,
      });
    }
    if (friendSocketId) {
      io.to(friendSocketId).emit("friendAdded", {
        friendId: steamId,
        email: user.email,
      });
    }
    res.status(200).json({ message: "Friend request accepted." });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteFriend = async (req: Request, res: Response) => {
  try {
    const { steamId, friendSteamId } = req.body;
    const user = await User.findOne({ steamId: steamId });
    const friend = await User.findOne({ steamId: friendSteamId });

    if (!user || !friend) {
      res.status(400).json({ error: "User IDs are required." });
      return;
    }
    if (
      !user.friends.includes(friendSteamId) ||
      !friend.friends.includes(steamId)
    ) {
      res.status(400).json({ error: "you are not friends" });
    }
    user.friends = user.friends.filter((id) => id !== friendSteamId);
    friend.friends = friend.friends.filter((id) => id !== steamId);
    await friend.save();
    await user.save();

    const io: Socket = req.app.get("io");
    const userSocketId = activeUsers[steamId];
    const friendSocketId = activeUsers[friendSteamId];

    if (userSocketId) {
      io.to(userSocketId).emit("friendDeleted", {
        friendId: friendSteamId,
        email: friend.email,
      });
    }
    if (friendSocketId) {
      io.to(friendSocketId).emit("friendDeleted", {
        friendId: steamId,
        email: user.email,
      });
    }

    res.status(200).json({ message: "friend deleted!" });
  } catch (err) {
    res.status(500).json({ error: err, message: "Something went wrong" });
  }
};
