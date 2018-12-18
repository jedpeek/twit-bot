// Setup twit package with node
const Twit = require('twit');

// const serverless = require('serverless-http')
// import quotes from quotes.js
// gets quotes object from ./quotes.js
// all quotes is an array of quotes
const quotes = require('./quotes').getQuotes()

// Use dotenv to hide Twitter API keys
// if your going to store this in a repository
// on github. Add .env file to .gitignore
require('dotenv').config();


// Create a Twit instance that can be used to make requests to Twitter's APIs.
const T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
  timeout_ms:           30000, // Optional parameter, will stop request if it takes longer than 30 seconds.
                              // (408 Request Timeout)
})

// Main tweeting function setup as
// an anonymous fat arrow (ES6) function
const timedTweet = ()=> {

    // We're creating a new date object and storing in a variable
    // Date object looks something like 2018-11-19T16:13:18.730Z
    let d = new Date();

    // Converting date to toLocaleTimeString gives us
    // something much more manageable that looks
    // like a normal human readable time.
    // The above date is converted to my local time
    // (pacific standard time) as a string
    // time = "8:13:18 AM"
    let time = d.toLocaleTimeString();

    // if time strictly equals "9:30:00 AM"
    // (=== must much type(string) and value("9:00:00 AM"))
    // then post tweet otherwise log time to console
    if(time === "10:00:00 AM"){
      T.post('statuses/update',
        { status: `'${quotes[i].text}' - ${quotes[i].from} #quotebot #inspiration` },
        (err, data, response) => {
          console.log(err, data, response);
        });
        i++;
    } else{
      console.log(time)
    }
}

// We're going to use this variable i to iterate over our quotes array
// each time the if statement in our timedTweets function evaluates to true
// we will post a tweet and increase the value of i by 1 which will grab
// the next object from our quotes array
let i = 0;
setInterval(timedTweet, 1000);

// This setInterval will call timedTweet every second
// This is how we update our date/time variables That
// are checked against our if/else statement



// Stream setup will track statuses that mention whatever you pass in.
// This can be hashtags, accounts, or words
// Here I am following two bands and liking any tweet that mentions them
const bandStream = T.stream('statuses/filter', { track: ['@ganyosmusic', '@MRKTSband'] });
bandStream.on('tweet', (tweet) => {
    console.log('tweet received! ', tweet.user.name, tweet.id, tweet.text, tweet.user.id, tweet)
    T.post('favorites/create',
      {id: tweet.id_str}
    )
  }
);
