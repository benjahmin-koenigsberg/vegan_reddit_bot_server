/** @format */

const express = require("express");
const app = express();
const snoowrap = require("snoowrap");
const snoostorm = require("snoostorm-es6");
const { InboxStream } = require("snoostorm");

var cors = require("cors");
app.use(cors());

const dotenv = require("dotenv").config();

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
let io;

app.get("/", (req, res) => {
  res.send(": )");
});

//sckets setup
io = new Server(server, {
  cors: {
    origin: "*",
  },
});


const options = {
  userAgent: "animalLiberation",
  clientSecret: process.env.CLIENT_SECRET,
  clientId: process.env.CLIENT_ID,
  username: "Known_Importance_829",
  password: process.env.PASSWORD,
};

console.log(options)

const r = new snoowrap(options);
const s = new snoostorm(r);

//new submission stream
const submissions = s.Stream("submission", {
  subreddit: "all",
  pollTime: 5000,
});


app.listen(process.env.PORT || 8001, () => {
  console.log("running server.js");
});
