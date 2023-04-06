/** @format */

const express = require("express");
const app = express();
const dotenv = require("dotenv").config()
var cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {

  const submissions = s.Stream("submission", {
    subreddit: "food",
    pollTime: 5000,
  });


  submissions.on("item", (item) => {
    if (
      item.title.toLowerCase().includes("bacon") ||
      item.selftext.toLowerCase().includes("bacon")
    ) {
      // && item.created_utc < BOT_START )
      if (old.indexOf(item.id) < 0) {
        console.log("post found!");
        // item.reply(veganQoutes[Math.floor(Math.random() * veganQoutes.length - 1)]);
        item.reply(
          "'Pigs are playful, friendly, sensitive, and intelligent animals. They've long been considered smarter than dogs, and the complexity of their social lives rivals those of primates. Much like people, pigs are soothed by music, love playing ball, and even enjoy getting massages.'"
        );
      }
    }
    old.push(item.id);
  });
});




app.listen(8000, () => {
  console.log("running on port 8000");
});
