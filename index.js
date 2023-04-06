/** @format */

const express = require("express");
const app = express();

var cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.send("a-ok!");
});

app.listen(process.env.PORT || 8001, () => {
  console.log("running server.js");
});
