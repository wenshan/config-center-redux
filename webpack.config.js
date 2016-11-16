var path = require('path');
var webpack = require('webpack');

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
    extensions: ['', '.js']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel']
      //exclude: /node_modules/
    },{
        test: /\.jsx?$/,
        loader: 'babel',
        //exclude:/node_modules/
        query: {
            presets: ['react', 'es2015'],
            plugins: ["transform-class-properties","transform-runtime",["antd",{libraryName:"antd-mobile",style:"css"}]]
        },
        include:__dirname
    }, {
        test: /\.scss$/,
        loader: 'style!css!sass'
    },{
        test: /\.css$/,
        loader: 'style!css!postcss'
    }, {
        test: /\.(jpg|png)$/,
        loader: 'url?limit=8192'
    }]
  }
};
