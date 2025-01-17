import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  steamId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  friends: [{ type: Schema.Types.String }],
  pendingRequests: [{ type: Schema.Types.String }],
  sentRequests: [{ type: Schema.Types.String }],
});

export const User = model("User", UserSchema);
