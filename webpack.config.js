const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV === 'pro' ? 'production' : 'development',
  entry: './src/content.js',
  output: {
    filename: 'content.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
};