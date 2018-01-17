const { resolve } = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const config = {
  devtool: 'source-map',

  entry: [
    'babel-polyfill',
    './index.js'
  ],

  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  context: resolve(__dirname, 'src'),

  devServer: {
    port: 3000,
    hot: true,
    publicPath: '/',
    historyApiFallback: {
      disableDotRule: true
    },
    proxy: {
      '/api/**': {
        target: 'http://localhost:3001',
        secure: false
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|jpeg|png|gif|ico|svg|pdf|eof)$/,
        use: 'url-loader?limit=15000&name=images/[name].[ext]'
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: 'file-loader?&name=fonts/[name].[ext]'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use:
          'url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        use:
          'url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[ext]'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use:
          'url-loader?limit=10000&mimetype=image/svg+xml&name=images/[name].[ext]'
      }
    ]
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      favicon: './app/assets/favicon.ico',
      inject: 'body'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
}

module.exports = config
