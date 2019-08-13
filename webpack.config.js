/*
* @Author: Shawn Yang
* @Date:   2019-07-29 17:09:03
* @Last Modified by:   Shawn Yang
* @Last Modified time: 2019-08-13 17:07:57
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
		'login' : ['./src/page/login/index.js'],
    'result' : ['./src/page/result/index.js'],
	},
	output: {
		// path: '/Users/yangshuo/Backend-Amazon/shuomall-frontend/Simple-Online-Mall-FrontEnd/dist',
		path: './dist',
		publicPath: '/dist',
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
   		new HtmlWebpackPlugin(getHtmlConfig('login', 'Login')),
      new HtmlWebpackPlugin(getHtmlConfig('result', 'Operation Result')),
  	],
  	resolve : {
        alias : {
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            // page            : __dirname + '/src/page',
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
