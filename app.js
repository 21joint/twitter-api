var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Twitter = require('twitter');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

var client = new Twitter({
  consumer_key: 'GigYKezkaVPFigOduVNuv9BXp',
  consumer_secret: 'uu0Up80LRwpwxeEDCbok9hGc4J8v5b2eQdDhYkJe5xPE0M0PsZ',
  access_token_key: '962475972233711617-9oos73o3bHin402lLYSKqtTSrKqoLyF',
  access_token_secret: 'm0s5ZEt6UdoRC4Ewqm97iOgmiPEWPl6uCzx3ublYwUv2u'
});

client.get('search/tweets', {q: 'ara'}, function(error, tweets, response) {
  console.log(tweets);
});

module.exports = app;
