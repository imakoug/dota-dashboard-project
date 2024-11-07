const mongoose = require('mongoose');
const DB_PORT =  27017;
const DB_NAME = 'dota-dashboard'; //mongodb://127.0.0.1:27017/secure_chat_app

mongoose.connect(
  `mongodb://127.0.0.1:${DB_PORT}/${DB_NAME}`).then(() => console.log("connected at port 27017")).catch((err) => console.log("😞 Sorry, something went wrong"))

module.exports = mongoose;
