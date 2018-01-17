/**
 * @flow
 */

const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],

  output: {
    filename: 'static/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|jpeg|png|gif|ico|svg|pdf|ttf|eof|woff|woff2|otf)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/[name].[ext]'
        }
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      comments: false
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      favicon: 'src/app/assets/favicon.ico'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
}
