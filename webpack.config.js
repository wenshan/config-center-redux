const path = require('path');
const webpack = require('webpack');
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
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
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
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
    },{
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style','css!postcss')
    },{
        test: /\.(jpg|png)$/,
        loader: 'url?limit=8192'
    }]
  }
};
