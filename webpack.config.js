/* eslint max-len: 0 */

'use strict';

const path               = require('path');
const webpack            = require('webpack');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const ExtractTextPlugin  = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const PROD = (process.env.NODE_ENV && process.env.NODE_ENV === 'production');

const conf = {
  devtool: 'source-map',
  entry  : [path.join(__dirname, 'src', 'client.ts')],
  output : {
    path    : path.join(__dirname, 'dist'),
    filename: '[name].bundle.[hash].js',
  },
  resolve: {
    extensions: ['', '.ts', '.js', '.json', '.css', '.scss', '.html'],
  },
  module: {
    loaders: [
      { test  : /\.ts$/, loader: 'ts-loader' },
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.scss$/, loaders: ['to-string', 'css', 'sass'] },
      { test: /\.css$/, loaders: ['to-string', 'css'] },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.jpg$/, loader: 'file-loader?mimetype=image/jpg' },
      { test: /\.png$/, loader: 'file-loader?mimetype=image/png' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      minify  : (PROD) ? ({ removeComments: true, collapseWhitespace: true, minifyJS: true }) : (false),
    }),
  ],
  devServer: {
    port              : 8080,
    historyApiFallback: true,
  },
};

module.exports = conf;
