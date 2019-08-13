/*
* @Author: Shawn Yang
* @Date:   2019-07-29 16:44:45
* @Last Modified by:   Shawn Yang
* @Last Modified time: 2019-08-13 16:13:39
*/
'use strict';
console.log("index.js is loaded successfully!");
// require('./index.css');
// require('../login/index.js');
// console.log('hhh');
// var _mm = require('../../util/shuomall.js');
// console.log(_mm.getUrlParam('test'));
require('../common/nav-simple/index.js');
require('../common/nav/index.js');
require('../common/header/index.js');
var navSide = require('../common/nav-side/index.js');
navSide.init({
	name: 'order-list'
})