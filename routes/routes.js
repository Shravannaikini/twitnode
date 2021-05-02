const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http')
const Twit = require('twit');
const notifier = require('node-notifier');
const open = require('open');
const franc = require('franc');

var route2 = express.Router();


const apikey = 'z0yoWwwGdRzpqsbZUiXm6sFgY'
const apiSecretKey = 'tTPeDX3ZlLFkQNNRIkBAbiCLtlci43OZAMDJn5UuFA7yiynNSI'
const accessToken = '819065255036788737-gU7a4oDDbOQbta7kMhvzBt9IFDTQYCb'
const accessTokenSecret = 'oAXhfeyEGabYZmsABVYBGu9Srr5r40Cvptl7StVOcL0rO'

var T = new Twit({
  consumer_key:         apikey,
  consumer_secret:      apiSecretKey,
  access_token:         accessToken,
  access_token_secret:  accessTokenSecret,
});

console.log('working');

// route2.get('', function(req, res) {
//     console.log("route2 works");

// });
route2.post('/test2', function(req, res) {
    console.log("route2 works");
    console.log(req.body.q);


    (async () => {
        console.log('async works');

        // //1. GET RECENT TWEETS
        T.get('search/tweets', { q:req.body.q , count: 300, tweet_mode: 'extended' }, function(err, data, response) {
            
            if(err){
                res.status(401).send();
            }else{
                const tweets = data.statuses
                // .map(tweet => `LANG: ${franc(tweet.text)} : ${tweet.text}`) //CHECK LANGUAGE
                .map(tweet => tweet.full_text).filter(tweet => tweet.toLowerCase().includes('available'));
                console.log(data);
                console.log(tweets);
                res.status(200).send(data);
            }
         
        })
    
        // //2. REAL TIME MONITORING USING STREAM (HASHTAG)
        // var stream = T.stream('statuses/filter', { track: '#tesla' })
        // stream.on('tweet', function (tweet) {
        //     console.log(tweet.text);
        //     console.log('Language: ' + franc(tweet.text));
        //     console.log('------');
        // })
    
        // 3. REAL TIME MONITORING USING STREAM (LOCATION)
        // var sanFrancisco = [ '-122.75', '36.8', '-121.75', '37.8' ]
        // var stream = T.stream('statuses/filter', { locations: sanFrancisco })
        
        // //SHOW NOTIFICATION FOR EACH RECEIVED TWEET
        // stream.on('tweet', function (tweet) {
        //   console.log(tweet.text);
        //   let url = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
    
        //   notifier.notify({
        //     title: tweet.user.name,
        //     message: tweet.text
        //   });
    
        //   notifier.on('click', async function(notifierObject, options, event) {
        //     console.log('clicked');
        //     await open(url);
        //   });
        // })
    })

    ();

});


module.exports= route2