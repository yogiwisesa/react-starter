/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const merge = require("webpack-merge");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const APP_DIR = path.resolve(__dirname, '../src');

module.exports = (env, argv) => {

  const { PLATFORM, VERSION } = argv;

  return merge([
      {
        entry: ['@babel/polyfill', APP_DIR],
        module: {
          rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader'
              }
            },
            {
              test: /\.(scss|css)$/,
              use: [
                PLATFORM === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                'css-loader',
                'sass-loader'
              ]
            }
          ]
        },
        plugins: [
          new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
          }),
          new webpack.DefinePlugin({ 
            // 'process.env.VERSION': JSON.stringify(argv.VERSION),
            'process.env.PLATFORM': JSON.stringify(argv.PLATFORM)
          }),
          new CopyWebpackPlugin([ { from: 'src/static' } ]),
        ],
        // output: {
        //   filename: '[name].bundle.js',
        //   chunkFilename: '[name].chunk.bundle.js',
        //   path: path.resolve(__dirname, '..', 'dist'),
        //   publicPath: '/',
        // },
    }
  ])
};