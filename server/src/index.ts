import express from "express";
import mongoose from "mongoose";
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

const corsConfig = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(router);

mongoose
  .connect(mongodbUri, {})
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((error: Error) => {
    console.error("Error connecting to database:", error);
  });
