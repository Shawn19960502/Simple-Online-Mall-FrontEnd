/*
* @Author: Shawn Yang
* @Date:   2019-08-27 16:59:04
* @Last Modified by:   Shawn Yang
* @Last Modified time: 2019-08-27 17:48:55
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _sm = require('util/shuomall.js');
var _order = require('service/order-service.js');

var page = {
	data: {
        orderNumber : _sm.getUrlParam('orderNumber')
    },
    init: function() {
    	this.bindEvent();
    },
    bindEvent: function() {
    	var _this = this;
    	$('.finish-button').click(function() {
    		if($.trim($('.input').val()) === 'Hail Hydra!') {
    			window.location.href 
                        = './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
    		} else {
    			alert("Your input is not correct!");
    		}
    	})
    }

};
$(function(){
    page.init();
});