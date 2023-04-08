## Project Title

Vegan Reddit Bot

## Project Description

The vegan reddit troll bot is an application to monitor incoming
posts for specified keywords about animal
consumption to auto respond with comments about non human animal
sentience and personhood

The search and reply word parameters can be customized

## Tech stack

We used a an Express.js / Node.js server with Javascript warppers for the Reddit API, Snoowrap and Snoostorm and Sockets.io to live stream to the React.js client

## Challenges and future features

Initail challenges were to discover that many of the snoowrap / snoostorm methods seemed depricated after switching to using the es6 'require' vs. es5 'import'

The more modern syntax (require) for snoowrap / snoostorm is highly recommened over es5 (import) syntax

There is documentation online and some discussion about these wrappers, but only a fraction of the community support for the Python Reddit wrapper, PRAW

There was an initial learning curve, learning about Reddit's API ratelimit and Reddit's new account posting limits

Feature versions will have more dynamic saerch and response logic with a broader range of posts and replies

## How to Install and Run the Project

Once you have cloned ths repo

login or signin to reddit and visit https://www.reddit.com/prefs/apps

![](2023-04-08-09-04-53.png)

Create a new select personal use script app

You will recieve a client Id and sectret to replace my creditional variables

1. In your terminal install all the neccsarry node modules and neccsary dependencies including...

$ npm init -y

$ npm i express

2. comments.js contains the live comments stream and submissions.js contain the submissions stream with hard coded method to check for 'bacon', 'fish', 'chicken' or 'sushi' with corresponding replies

3. In your terminal run $ node comments

4. In your terminal run $ node submissions

The index.js file contains the sockets that connect with the React client app

https://github.com/vegan-coder/vegan_reddit_troll_client


## Credits

This project could not have been completed without the generous support of the engineers who built these Javascript Reddit wrappers

Snoowrap npm
https://www.npmjs.com/package/snoowrap

Snoostorm npm
https://www.npmjs.com/package/snoostorm

Mayor Monty, creator of github snoostorm
https://github.com/MayorMonty/Snoostorm

I would also like to thank the creators of sevreal bot testing subreddits, including

r/bottest, r/bottesting, and r/testinggrounds4bots

This project was inspired by the Vegan Hactivists

https://veganhacktivists.org/

and Steven Rourk

https://stevenrouk.com/

This project was initiated as a graduation project for BrainStation's software engineering diplolma program

https://brainstation.io/

HUGE thank you to my professor, Patrick Mccullough!!

https://www.linkedin.com/in/patrick-mccullough-5784a6210/
