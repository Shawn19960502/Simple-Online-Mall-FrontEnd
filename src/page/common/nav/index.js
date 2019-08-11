/*
* @Author: Shawn Yang
* @Date:   2019-08-07 11:25:48
* @Last Modified by:   Shawn Yang
* @Last Modified time: 2019-08-09 18:09:33
*/
'use strict';
console.log('common/nav/index.js is loaded successfully');
require('./index.css');
var _sm = require('util/shuomall.js');
var _user = require('service/user-service.js');
var _cart   = require('service/cart-service.js');
var nav = {
    init : function(){
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent : function(){
        $('.js-login').click(function(){
        	console.log("login function is called successfully!");
            _sm.doLogin();
        });
        $('.js-register').click(function(){
            window.location.href = './user-register.html';
        });
        $('.js-logout').click(function(){
            _user.logout(function(res){
                window.location.reload();
            }, function(errMsg){
                _sm.errorTips(errMsg);
            });
        });
    },
    loadUserInfo : function(){
    	_user.checkLogin(function(res){
            $('.user.not-login').hide().siblings('.user.login').show()
                .find('.username').text(res.username);
        }, function(errMsg){
        });
    },
    loadCartCount : function(){
    	_cart.getCartCount(function(res){
            $('.nav .cart-count').text(res || 0);
        }, function(errMsg){
            $('.nav .cart-count').text(0);
        });

    }
};

module.exports = nav.init();