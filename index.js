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

const r = new snoowrap(options);
const s = new snoostorm(r);

//new submission stream
const submissions = s.Stream("submission", {
  subreddit: "all",
  pollTime: 5000,
});

//new comments stream
const comments = s.Stream("comment", {
  subreddit: "all",
  pollTime: 5000,
});

//initate getting updated submissions for front end
app.get("/", (_req, res) => {
  console.log("endpoint hit...");

  getHot('food').then( (item) => {
  // r.getDefaultSubreddits("food").then((item) => {
    console.log(item);
    res.send(item);
  });

  submissions.on("item", (item) => {
    //console.log(item)
    io.emit("stream", item);
  });
  // res.send('submission stream engaged');
});

//end point to get comments for front end
app.get("/com", (_req, res) => {
  console.log("com endpoint hit...");

  r.getUser("Known_Importance_829")
    .getComments()
    .then((item) => {
      res.send(item);
    });
});


comments.on("item", (item) => {
  if (item.body.toLowerCase().includes("eat chicken")) {
    console.log("comment found!");
    item.reply(
      "Leading animal behavior scientists from around the globe know that chickens are inquisitive and interesting animals whose cognitive abilities are on par with those of cats, dogs, and even some primates. Like all animals, chickens love their families and value their own lives. Their social nature means that they’re always looking out for their families and for other chickens in their group. People who have spent time with them know that they have complex social structures and adept communication skills, just as we do. Learn the truth about the animals we eat....http://www.nationearth.com/"
    );
  }

  if (item.body.toLowerCase().includes("eat beef")) {
    console.log("comment found!");
    item.reply(
      "According to research, cows are generally quite intelligent animals who can remember things for a long time. Animal behaviorists have found that they interact in socially complex ways, developing friendships over time and sometimes holding grudges against other cows who treat them badly. Learn the truth about the animals we eat....http://www.nationearth.com/"
    );
  }
});

  submissions.on("item", (item) => {
    if (
      item.title.toLowerCase().includes("bacon") ||
      item.selftext.toLowerCase().includes("bacon")
    ) {
      console.log("post found!");
      item.reply(
        "'Pigs are playful, friendly, sensitive, and intelligent animals. They've long been considered smarter than dogs, and the complexity of their social lives rivals those of primates. Much like people, pigs are soothed by music, love playing ball, and even enjoy getting massages.' Learn the truth farmed animals....http://www.nationearth.com/"
      );
    }
    if (
      item.title.toLowerCase().includes("sushi") ||
      item.selftext.toLowerCase().includes("sushi")
    ) {
      console.log("post found!");
      item.reply(
        "'Fish feel pain! Neurobiologists have long recognized that fish have nervous systems that comprehend and respond to pain. Fish, like “higher vertebrates,” have neurotransmitters such as endorphins that relieve suffering—the only reason for their nervous systems to produce these painkillers is to alleviate pain.....http://www.nationearth.com/"
      );
    }
  });


app.listen(process.env.PORT || 8001, () => {
  console.log("running server.js");
});
