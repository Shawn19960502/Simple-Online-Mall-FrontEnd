/*
* @Author: Shawn Yang
* @Date:   2019-08-21 17:34:18
* @Last Modified by:   Shawn Yang
* @Last Modified time: 2019-08-21 18:02:05
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _sm             = require('util/shuomall.js');
var _user           = require('service/user-service.js');
var page = {
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        navSide.init({
            name: 'user-pass-update'
        });
    },
    bindEvent : function(){
        var _this = this;
        $(document).on('click', '.btn-submit', function(){
            var userInfo = {
                password        : $.trim($('#password').val()),
                passwordNew     : $.trim($('#password-new').val()),
                passwordConfirm : $.trim($('#password-confirm').val())
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                _user.updatePassword({
                    oldPassword : userInfo.password,
                    newPassword : userInfo.passwordNew
                }, function(res, msg){
                    _sm.successTips(msg);
                    window.location.href = './user-center.html'
                }, function(errMsg){
                    _sm.errorTips(errMsg);
                });
            }
            else{
                _sm.errorTips(validateResult.msg);
            }
        });
    },
    validateForm : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        if(!_sm.validate(formData.password, 'require')){
            result.msg = 'Can not be empty';
            return result;
        }
        if(!formData.passwordNew || formData.passwordNew.length < 6){
            result.msg = 'Longer than 6';
            return result;
        }
        if(formData.passwordNew !== formData.passwordConfirm){
            result.msg = 'Two password are not same';
            return result;
        }
        result.status   = true;
        result.msg      = 'Validation Passeds';
        return result;
    }
};
$(function(){
    page.init();
});