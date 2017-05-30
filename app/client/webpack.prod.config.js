const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],

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
        use: [
          'babel-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader!stylus-loader',
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(jpg|jpeg|png|gif|ico|svg|pdf|ttf|eof|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      comments: false
    }),
    new ExtractTextPlugin('static/style.css'),
    new HtmlWebpackPlugin({ template: 'src/index.html', inject: 'body' }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
}
