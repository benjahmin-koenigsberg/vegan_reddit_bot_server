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



const comments = s.Stream("comment", {
  subreddit: "all",
  pollTime: 5000,
});

comments.on("item", (item) => {

  if ( item.body.toLowerCase().includes("eat chicken")
  ) {
    console.log("comment found!");
    item.reply(
      "Leading animal behavior scientists from around the globe know that chickens are inquisitive and interesting animals whose cognitive abilities are on par with those of cats, dogs, and even some primates. Like all animals, chickens love their families and value their own lives. Their social nature means that they’re always looking out for their families and for other chickens in their group. People who have spent time with them know that they have complex social structures and adept communication skills, just as we do. Learn the truth about the animals we eat....http://www.nationearth.com/"
    );
  }

  if (
    item.body.toLowerCase().includes("eat beef")
  ) {
    console.log("comment found!");
    item.reply(
      "According to research, cows are generally quite intelligent animals who can remember things for a long time. Animal behaviorists have found that they interact in socially complex ways, developing friendships over time and sometimes holding grudges against other cows who treat them badly. Learn the truth about the animals we eat....http://www.nationearth.com/"
    );
  }
});
