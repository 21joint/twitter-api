var express = require('express');
var router = express.Router();
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'GigYKezkaVPFigOduVNuv9BXp',
  consumer_secret: 'uu0Up80LRwpwxeEDCbok9hGc4J8v5b2eQdDhYkJe5xPE0M0PsZ',
  access_token_key: '962475972233711617-9oos73o3bHin402lLYSKqtTSrKqoLyF',
  access_token_secret: 'm0s5ZEt6UdoRC4Ewqm97iOgmiPEWPl6uCzx3ublYwUv2u'
});

var currentTweets;

/* GET tweets listing. */
router.get('/', function(req, res, next) {
  client.get('search/tweets', {q: req.query.query}, function(error, tweets, response) {
    currentTweets = tweets
  });

  res.send(currentTweets);
});

module.exports = router;
