const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./router");

const corsConfig = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(router);
app.get("*", (req, res) => {
  res.status(404).send("not found");
});

app.listen(3000, (err) => {
  if (err) {
    console.log(` something went wrong ${err}`);
  } else {
    console.log(`Server is listening on port 3000!`);
  }
});
