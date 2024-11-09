const mongoose = require('../db');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  steamId: {type: Number, required: true},
});
module.exports = mongoose.model('User', userSchema);
