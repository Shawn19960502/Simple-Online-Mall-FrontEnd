/*
* @Author: Shawn Yang
* @Date:   2019-07-29 17:58:37
* @Last Modified by:   Shawn Yang
* @Last Modified time: 2019-08-15 18:05:13
*/
console.log('hello login');
'use strict';
require('./index.css');
require('../common/nav-simple/index.js');
var _sm = require('../../util/shuomall.js');
var _user   = require('service/user-service.js');

var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};

var page = {
	init: function() {
		this.bindEvent();
	},
	bindEvent: function() {
		var _this = this;
		$('#submit').click(function() {
				_this.submit();
			});
		$('.user-content').keyup(function(e) {
			if(e.keyCode === 13) {
				_this.submit();
			}
		});
	},
	submit: function() {
		var formData = {
			username: $.trim($('#username').val()),
			password: $.trim($('#password').val())
		};
		validateResult = this.formValidate(formData);
		if(validateResult.status) {
			console.log(validateResult.status)
			_user.login(formData, function(res){
				window.location.href = _sm.getUrlParam('redirect') || './index.html';
			}, function(errMsg){
				formError.show(errMsg);
			});
		} else {
			formError.show(validateResult.msg);
		}
	},
	formValidate: function(formData) {
		var result = {
			status : false,
			msg : '',
		}
		if(!_sm.validate(formData.username, 'require')) {
			result.msg = "username can't be empty";
			return result;
		}
		if(!_sm.validate(formData.password, 'require')) {
			result.msg = "password can't be empty";
			return result;
		}
		result.status = true;
		return result;
	}
};


$(function(){
	page.init();
});