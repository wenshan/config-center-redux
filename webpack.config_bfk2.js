const path = require('path'),
    pxtorem = require('postcss-pxtorem'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpack = require('webpack');

const ENV = process.env.NODE_ENV = process.env.ENV = 'development';

const config = {
    cache:true,
    devtool: 'eval',
    entry: {
        index:['webpack/hot/dev-server', path.resolve(__dirname, 'src/entry/index.js')]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    resolve:{
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
      }, {
          test: /\.less$/,
          loader: ExtractTextPlugin.extract('style-loader','css!postcss!less')
      },{
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style-loader','css!postcss')
      }, {
          test: /\.(jpg|png)$/,
          loader: 'url?limit=8192'
      }]
    },
    postcss: function () {
        return [pxtorem({
            rootValue: 75,
            propWhiteList: []
        })]
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        new ExtractTextPlugin("styles.css"),
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings : false
            }
        }),
        new webpack.DllReferencePlugin({
            context:__dirname,
            manifest:require('./dist/vendor-manifest.json')
        }),
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify(ENV)
            }
        }),
        new HtmlWebpackPlugin({
            title:"Dome",
            hash:true,
            template:'index.template.html'
        })
    ]
};

module.exports = config;
