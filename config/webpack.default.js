'use strict';

const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const html = (params) => new HtmlWebpackPlugin(params);
const rootDir = (...paths) => path.join(__dirname, '..', ...paths);

module.exports = {
  context: rootDir('src'),
  entry: {
    index: './index.js'
  },
  output: {
    path: rootDir('docs'),
    filename: '[name].bundle.js'
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      'node_modules'
    ],
    alias: {
      utils: rootDir('./src/utils')
    }
  },
  plugins: [
    html({
      template: rootDir(`src/index.html`),
      filename: 'index.html',
      inject: 'body',
      chunks: ['index'],
      inlineSource: '.(js|css)$' // inline all css and js in prod
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file-loader'
      },
      {
        test: /\.html/,
        exclude: /node_modules/,
        loader: 'template-string-loader'
      }
    ]
  }
};
