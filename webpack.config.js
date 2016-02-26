'use strict';

const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const PROD = (process.env.NODE_ENV && process.env.NODE_ENV === 'production');

const conf = {
  devtool: 'source-map',
  entry  : {
    main: `${__dirname}/src/main.js`,
  },
  output: {
    path    : `${__dirname}/dist`,
    filename: '[name].bundle.[hash].js',
  },
  module: {
    loaders: [
      {
        test  : /\.jsx?$/,
        loader: 'babel',
        query : {
          cacheDirectory: true,
          plugins       : ['transform-decorators-legacy'],
          presets       : ['es2015'],
        },
      },
      { test: /\.jpg$/, loader: 'url-loader?mimetype=image/jpg' },
      { test: /\.png$/, loader: 'url-loader?mimetype=image/png' },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/index.html`,
      minify  : (PROD) ? ({ removeComments: true, collapseWhitespace: true, minifyJS: true }) : (false),
    }),
  ],
};

if (PROD) {
  // loaders
  conf.module.loaders.push({ test: /\.scss$/, loader: ['style', 'css', 'sass'] });
  // plugins
  conf.plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
} else {
  // loaders
  conf.module.loaders.push({
    test  : /\.scss$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap', 'sass-loader'),
  });
  // plugins
  conf.plugins.push(new ExtractTextPlugin('styles.css'));
}

module.exports = conf;
