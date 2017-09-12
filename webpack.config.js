require('dotenv').config({ silent: true });
require('babel-register');
var Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const pkg = require('./package');

// Check if watching so that prerendering can be disabled.
const watching = process.argv[1] && process.argv[1].indexOf('webpack-dev-server') !== -1;


const development = {
    devtool: 'source-map',
    entry: Object.assign(
        {},
        {
            [pkg.name]: './src/schedule/client.js'
        },
        watching
            ? {}
            : {__prerender: './src/schedule/prerender.js'}
    ),
    output: {
        path: path.resolve(__dirname, "docs"),
        filename: '[name].js',
        publicPath: '/',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        extensions: ['.jsx', '.js'],
        modules: ['src', 'node_modules']
    },
    plugins: [
        new Dotenv({
            path: '.env',
            systemvars: (process.env.NODE_ENV === 'production') ? true : false
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'buildInfo.sha': JSON.stringify(process.env.CIRCLE_SHA1),
            'buildInfo.branch': JSON.stringify(process.env.CIRCLE_BRANCH),
            'buildInfo.buildNumber': JSON.stringify(process.env.CIRCLE_BUILD_NUM),
            'buildInfo.previousBuildNumber': JSON.stringify(process.env.CIRCLE_PREVIOUS_BUILD_NUM)
        }),
        new ExtractTextPlugin({
            filename: 'schedule-[contenthash].css',
        }),
        // Don't run prerender if watching
        watching ? null : new StaticSiteGeneratorPlugin('__prerender', ['/'])
    ].filter(plugin => !!plugin),
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.resolve('./src'),
                use: [{
                    loader: 'babel-loader'
                }]
            },
            {
                test: /\.graphql$/,
                use: [{
                    loader: 'raw-loader'
                }]
            },
            {
                test: /\.graphql$/,
                use: [{
                    loader: 'raw-loader'
                }]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {loader: 'css-loader', options: {sourceMap: true}},
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [
                                    autoprefixer({ browsers: ['ie >= 9', 'last 2 versions'] })
                                ],
                                sourceMap: true
                            }
                        },
                        {loader: 'sass-loader', options: {sourceMap: true}}
                    ]
                })
            }
        ]
    },
    devServer: {
        host: '0.0.0.0',
        publicPath: '/',
        port: process.env.JARVIS_CORE_CLIENT_PORT || 3000,
        historyApiFallback: true,
        stats: { chunks: false }
    }
};

module.exports = development
