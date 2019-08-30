/*
* @Author: Shawn Yang
* @Date:   2019-07-29 17:09:03
* @Last Modified by:   Shawn Yang
* @Last Modified time: 2019-08-30 11:05:34
*/
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
//set environment
var WEBPACK_ENV = process.env.WEBPACK_ENV  || 'dev';
//get html plugin parameter methods;
var getHtmlConfig = function(name, title) {
	return {
   			template : './src/view/' + name + '.html',
   			filename : 'view/' + name + '.html',
        title: title,
   			inject : true,
   			hash : true,
   			chunks : ['common', name]
   		};
}
var config = {
	entry: {
		'common' : ['./src/page/common/index.js'],
		'index' : ['./src/page/index/index.js'],
    'list' : ['./src/page/list/index.js'],
    'detail' : ['./src/page/detail/index.js'],
    'payment' : ['./src/page/payment/index.js'],
		'user-login' : ['./src/page/user-login/index.js'],
    'user-register' : ['./src/page/user-register/index.js'],
    'user-pass-reset' : ['./src/page/user-pass-reset/index.js'],
    'user-pass-update' : ['./src/page/user-pass-update/index.js'],
    'user-center-update' : ['./src/page/user-center-update/index.js'],
    'user-center' : ['./src/page/user-center/index.js'],
    'result' : ['./src/page/result/index.js'],
    'cart' : ['./src/page/cart/index.js'],
    'order-confirm'     : ['./src/page/order-confirm/index.js'],
    'order-list'        : ['./src/page/order-list/index.js'],
    'order-detail'      : ['./src/page/order-detail/index.js'],
    'credit'      : ['./src/page/credit/index.js'],
	},
	output: {
		// path: '/Users/yangshuo/Backend-Amazon/shuomall-frontend/Simple-Online-Mall-FrontEnd/dist',
		path: __dirname + '/dist/',
		publicPath: '/dist/',
		filename: 'js/[name].js'
	},
	externals : {
		'jQuery' : 'window:jQuery'
	},
	plugins : [
	    new webpack.optimize.CommonsChunkPlugin({
	    	name : 'common',
	    	filename : 'js/base.js'
   		}),
   		new ExtractTextPlugin('css/[name].css'),
   		new HtmlWebpackPlugin(getHtmlConfig('index', 'Head Page')),
   		new HtmlWebpackPlugin(getHtmlConfig('user-login', 'Login')),
      new HtmlWebpackPlugin(getHtmlConfig('result', 'Operation Result')),
      new HtmlWebpackPlugin(getHtmlConfig('user-register', 'Register')),
      new HtmlWebpackPlugin(getHtmlConfig('cart', 'Cart')),
      new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', 'FindPassword')),
      new HtmlWebpackPlugin(getHtmlConfig('user-center', 'User Center')),
      new HtmlWebpackPlugin(getHtmlConfig('user-center-update', 'User Center Update')),
      new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', 'Change Password')),
      new HtmlWebpackPlugin(getHtmlConfig('list', 'List')),
      new HtmlWebpackPlugin(getHtmlConfig('detail', 'Detail')),
      new HtmlWebpackPlugin(getHtmlConfig('order-confirm', 'Order Confirm')),
      new HtmlWebpackPlugin(getHtmlConfig('order-list', 'Order List')),
      new HtmlWebpackPlugin(getHtmlConfig('order-detail', 'Order Detail')),
      new HtmlWebpackPlugin(getHtmlConfig('payment', 'Payments')),
      new HtmlWebpackPlugin(getHtmlConfig('credit', 'Credit')),

  	],
  	resolve : {
        alias : {
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            // image           : __dirname + '/src/image'
        }
    },
  	module : {
  		loaders: [
  			{ test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
  			{ test: /\.(gif|png|jpg)\??.*$/, loader: 'url-loader?limit=100&name=../resource/[name].[ext]'},
  			{ test: /\.(woff|woff2|eot|ttf|svg)/,loader: 'file?name=assets/[name].[ext]'},
        { test: /\.string$/, loader: 'html-loader', query : {minimize : true, removeAttributeQuotes : false}}
  		]
  	}
};
if('dev' === WEBPACK_ENV) {
	config.entry.common.push('webpack-dev-server/client?http://localhost:9001/');
}

module.exports = config;
