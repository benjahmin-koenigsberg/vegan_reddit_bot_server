/** @format */
const snoowrap = require("snoowrap");
const snoostorm = require("snoostorm-es6");
// const BOT_START = Date.now() / 1000;

const dotenv = require("dotenv").config();

//instantiant connection to reddit , user1
const options = {
  userAgent: "animalLiberation",
  clientSecret: process.env.CLIENT_SECRET,
  clientId: process.env.CLIENT_ID,
  username: process.env.USERNAME,
  password: process.env.PASSWORD
};

const r = new snoowrap(options);
const s = new snoostorm(r);

const submissions = s.Stream("submission", {
  subreddit: "all",
  pollTime: 5000
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
        item.title.toLowerCase().includes( "sushi") ||
        item.selftext.toLowerCase().includes("sushi")
      ) {
        console.log("post found!");
        item.reply(
          "'Fish feel pain! Neurobiologists have long recognized that fish have nervous systems that comprehend and respond to pain. Fish, like “higher vertebrates,” have neurotransmitters such as endorphins that relieve suffering—the only reason for their nervous systems to produce these painkillers is to alleviate pain.....http://www.nationearth.com/"
        );
      }

  });
