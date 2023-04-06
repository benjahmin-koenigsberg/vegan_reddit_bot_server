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
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
};

app.get("/", (_req, res) => {
  res.send(options)
}

const r = new snoowrap(options);
const s = new snoostorm(r);

//new submission stream
const submissions = s.Stream("submission", {
  subreddit:
    "foodie+bacon+food+foodporn+cooking+askculinary+recipes+BreakfastFood+pizza+meat",
  pollTime: 5000,
});

app.get("/", (_req, res) => {
  console.log("endpoint hit...");

r.getDefaultSubreddits("all").then( (item) => {
  console.log(item)
res.send(item)
});

  // submissions.on("item", (item) => {
  //   //console.log(item)
  //     io.emit("stream", item);
  // });
  // res.send('submission stream engaged');
});



app.get("/com", (_req, res) => {
  console.log("com endpoint hit...");

  r.getUser("Known_Importance_829")
    .getComments()
    .then((item) => {
      res.send(item);
    });
});




server.listen(process.env.PORT || 8001, () => {
  console.log("running server.js");
});
