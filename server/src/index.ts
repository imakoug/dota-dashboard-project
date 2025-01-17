import express from "express";
import mongoose from "mongoose";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import router from "./router";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in the enviroment.");
}

const mongodbUri: string = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE"],
  },
});

const corsConfig = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE"],
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());
app.set("io", io);
app.use(router);

const activeUsers: Record<string, string> = {};

io.on("connection", (socket: Socket) => {
  console.log("User connected:", socket.id);

  socket.on("userConnected", (userId: string) => {
    activeUsers[userId] = socket.id;
  });

  socket.on("disconnect", () => {
    const userId = Object.keys(activeUsers).find(
      (key) => activeUsers[key] === socket.id
    );
    if (userId) delete activeUsers[userId];
  });
});

mongoose
  .connect(mongodbUri, {})
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error: Error) => {
    console.error("Error connecting to database:", error);
  });

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
io.listen(4000);

export default activeUsers;