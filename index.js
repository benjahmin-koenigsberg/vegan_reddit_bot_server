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
  subreddit: "bacon+Cheap_Meals+beef+Culinary+TastyFood+fitmeals+cookingforbeginners",
  pollTime: 5000,
});

//new comments stream
const comments = s.Stream("comment", {
  subreddit: "bacon+Cheap_Meals+beef+Culinary+TastyFood+fitmeals+cookingforbeginners",
  pollTime: 5000,
});

//initate getting updated submissions for front end




//end point to get comments for front end
app.get("/com", (_req, res) => {
  console.log("comments endpoint hit...");
  r.getUser("Known_Importance_829")
    .getComments()
    .then((item) => {
      res.send(item);
     // console.log(item);
    });
});



app.get("/", (_req, res) => {
  console.log('bot running')

  comments.on("item", (item) => {
    if (item.body.toLowerCase().includes("chicken")) {
      console.log("comment found!");
      item.reply(
        "According to research, chickens cognitive abilities are on par with those of cats, dogs, and even some primates. Like all animals, chickens love their families and value their own lives. People who have spent time with them know that they have complex social structures and adept communication skills, just as we do. Learn the truth about chickens....http://www.nationearth.com/"
      );
    }

    if (item.body.toLowerCase().includes("beef")) {
      console.log("comment found!");
      item.reply(
        "According to research, cows are intelligent animals who can remember things for a long time, interact in socially complex ways and develop friendships. Learn the truth about cows....http://www.nationearth.com/"
      );
    }
  });

  submissions.on("item", (item) => {
    console.log(
      `{
     title : "${item.title}",
     subreddit : "${item.subreddit_name_prefixed}",
     selftext : "${item.selftext}"},`
    );

    if (
      item.title.toLowerCase().includes("bacon") ||
      item.selftext.toLowerCase().includes("bacon")
    ) {
      console.log("post found!");
      item.reply(
        "'Pigs are playful, friendly, sensitive, and have long been considered smarter than dogs. Much like people, pigs are soothed by music, love playing ball, and even enjoy getting massages.  Learn the truth about pigs....http://www.nationearth.com/"
      );
    }
    if (
      item.title.toLowerCase().includes("sushi") ||
      item.selftext.toLowerCase().includes("sushi")
    ) {
      console.log("post found!");
      item.reply(
        "Fish feel pain! Neurobiologists have long recognized that fish have nervous systems that comprehend and respond to pain,  like other higher vertebrates.  Learn the truth about fish....http://www.nationearth.com/"
      )
    }
  });

  res.send("endpoint hit");
});


app.listen(process.env.PORT || 8001, () => {
  console.log("running server.js");
});
