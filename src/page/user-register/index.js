/*
* @Author: Shawn Yang
* @Date:   2019-08-15 18:08:59
* @Last Modified by:   Shawn Yang
* @Last Modified time: 2019-08-30 14:12:17
*/
console.log('hello register');
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

// page part
var page = {
    init: function(){
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        // username verification
        $('#username').blur(function(){
            var username = $.trim($(this).val());
            if(!username){
                return;
            }
            _user.checkUsername(username, function(res){
                formError.hide();
            }, function(errMsg){
                formError.show(errMsg);
            });
        });
        $('#password').blur(function(){
        	var password = $.trim($('#password').val());
        	if(!password) {
        		return;
        	}
        	if(password.length < 6) {
        		formError.show('password must longer than 6');
        	} else {
        		formError.hide();
        	}
        });
        $('#password-confirm').blur(function(){
        	var passwordConfirm = $.trim($('#password-confirm').val());
        	var password = $.trim($('#password').val());
        	if(!passwordConfirm || !password) {
        		return;
        	}
        	if(password !== passwordConfirm){
        		formError.show('password are not same');
        	} else {
        		formError.hide();
        	}
        });
        $('#submit').click(function(){
            _this.submit();
        });
        $('.user-content').keyup(function(e){
            if(e.keyCode === 13){
                _this.submit();
            }
        });
    },
    // submit table 
    submit : function(){
        var formData = {
                username        : $.trim($('#username').val()),
                password        : $.trim($('#password').val()),
                passwordConfirm : $.trim($('#password-confirm').val()),
                phone           : $.trim($('#phone').val()),
                email           : $.trim($('#email').val()),
                question        : $.trim($('#question').val()),
                answer          : $.trim($('#answer').val())
            },
            // validation result
            validateResult = this.formValidate(formData);
        // verification succeed
        if(validateResult.status){
            _user.register(formData, function(res){
                window.location.href = './result.html?type=register';
            }, function(errMsg){
                formError.show(errMsg);
            });
        }
        // verification failed
        else{
            // error message
            formError.show(validateResult.msg);
        }

    },
    // table verification
    formValidate : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        if(!_sm.validate(formData.username, 'require')){
            result.msg = "username can't be empty";
            return result;
        }
        if(!_sm.validate(formData.password, 'require')){
            result.msg = "password can't be empty";
            return result;
        }
        if(formData.password.length < 6){
            result.msg = 'password must longer than 6';
            return result;
        }
        if(formData.password !== formData.passwordConfirm){
            result.msg = 'password are not same';
            return result;
        }
        if(!_sm.validate(formData.phone, 'phone')){
            result.msg = 'phone number format is not correct.(10 numbers)';
            return result;
        }
        if(!_sm.validate(formData.email, 'email')){
            result.msg = 'E-mail format is not correct';
            return result;
        }
        if(!_sm.validate(formData.question, 'require')){
            result.msg = 'Security question should not be empty';
            return result;
        }
        if(!_sm.validate(formData.answer, 'require')){
            result.msg = 'Answer should not be empty';
            return result;
        }
        result.status   = true;
        result.msg      = 'Validation passed';
        return result;
    }
};
$(function(){
    page.init();
});