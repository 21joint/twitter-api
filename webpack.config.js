const path = require('path');
const args = require('yargs').argv;
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const IS_DEV = (process.env.NODE_ENV === 'dev');
/**
 * Webpack Configuration
 */
let config = {
    entry: {
        common: [
            './src/app.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'scripts/[name].[hash].js',
        publicPath: '/',
    },
    module: {
        rules: [
            // JS
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                use: [
                    'babel-loader',
                ]
            },

            // SCSS
            {
                test: /\.s?css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: !IS_DEV,
                                sourceMap: IS_DEV,
                                publicPath: '../',
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: IS_DEV,
                                plugins: [
                                    require('postcss-flexbugs-fixes'),
                                    require('autoprefixer')({
                                        browsers: ['last 3 versions'],
                                    }),
                                ],
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: IS_DEV,
                            },
                        },
                    ],
                }),
            },

            // FONTS/IMAGES
            {
                test: /\.(woff|woff2|ttf|eot|otf|svg|gif|png|jpe?g)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name(file) {
                                if (file.indexOf('fonts') > -1) {
                                    return 'fonts/[name].[ext]';
                                }
                                else {
                                    return 'images/[name].[ext]';
                                }
                            },
                            fallback: 'file-loader',
                            outputPath: './',
                            publicPath: args.git ? '/gs-webpack/' : '/',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_DEV,
        }),
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery',
        //     'window.jQuery': 'jquery',
        // }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.ejs'),
            filename: 'index.html'
        }),
        new ExtractTextPlugin({
            filename: 'styles/[name].css',
        })
    ]
};

module.exports = config;
