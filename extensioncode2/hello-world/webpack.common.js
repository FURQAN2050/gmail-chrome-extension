'use strict';

const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    content: './src/content.js',
    pageWorld: '@inboxsdk/core/pageWorld.js',
    background: '@inboxsdk/core/background.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],

  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "static" },
        { from: "./src/react-components", to: "react-components" }
      ],
    }),
  ],
};