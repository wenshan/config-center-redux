const path = require('path');
const webpack = require('webpack');
const pxtorem = require('postcss-pxtorem');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/entry/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js'
    //publicPath: '/static/'
  },
  postcss: function () {
      return [pxtorem({
          rootValue: 75,
          propWhiteList: []
      })]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
        compress:{
            warnings : false
        }
    }),
    new ExtractTextPlugin("index.css"),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEVTOOLS__: !!process.env.DEBUG
    })
  ],
  resolve: {
    extensions:['','.web.js','.js','.json','.jsx']
  },
  module: {
    loaders: [{
        test: /\.jsx?$/,
        loader: 'babel',
        exclude:/node_modules/,
        query: {
            presets: ['react', 'es2015'],
            plugins: ["transform-class-properties","transform-runtime",["antd",{libraryName:"antd-mobile",style:"css"}]]
        },
        include:__dirname
    },{
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style", "css-loader!less-loader")
    },{
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style','css!postcss')
    },{
        test: /\.(jpg|png)$/,
        loader: 'url?limit=8192'
    }]
  }
};
