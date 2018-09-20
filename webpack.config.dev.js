const merge = require('webpack-merge');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const express = require('express');
const Twitter = require('twitter');
const client = new Twitter({
    consumer_key: 'GigYKezkaVPFigOduVNuv9BXp',
    consumer_secret: 'uu0Up80LRwpwxeEDCbok9hGc4J8v5b2eQdDhYkJe5xPE0M0PsZ',
    access_token_key: '962475972233711617-9oos73o3bHin402lLYSKqtTSrKqoLyF',
    access_token_secret: 'm0s5ZEt6UdoRC4Ewqm97iOgmiPEWPl6uCzx3ublYwUv2u'
});


let currentTweets;


module.exports = merge(webpackConfig, {
    devServer: {
        watchContentBase: true,
        port: 3000,
        hot: true,
        open: true,
        publicPath: '/',
        before: app => {
            app.use(logger('dev'));
            app.use(express.json());
            app.use(express.urlencoded({extended: false}));
            app.use(cookieParser());

            /* GET tweets listing. */
            app.get('/tweets', function (req, res, next) {
                console.log(req);
                client.get('search/tweets', {
                    q: req.query.query
                }, function (error, tweets, response) {
                    currentTweets = tweets;
                });

                res.send(currentTweets);
            });
        }
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'cheap-eval-source-map'

});
