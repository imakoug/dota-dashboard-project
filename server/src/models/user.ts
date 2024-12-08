import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  steamId: {type: Number, required: true},
});

export default mongoose.model('User', userSchema);
