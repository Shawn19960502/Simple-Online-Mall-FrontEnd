/*
* @Author: Shawn Yang
* @Date:   2019-08-20 16:39:06
* @Last Modified by:   Shawn Yang
* @Last Modified time: 2019-08-21 16:42:28
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _sm = require('util/shuomall.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');

var page = {
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        navSide.init({
            name: 'user-center'
        });
        this.loadUserInfo();
    },
    bindEvent : function(){
        var _this = this;
        $(document).on('click', '.btn-submit', function(){
            var userInfo = {
                phone       : $.trim($('#phone').val()),
                email       : $.trim($('#email').val()),
                question    : $.trim($('#question').val()),
                answer      : $.trim($('#answer').val())
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                _user.updateUserInfo(userInfo, function(res, msg){
                    _sm.successTips(msg);
                    window.location.href = './user-center.html';
                }, function(errMsg){
                    _sm.errorTips(errMsg);
                });
            }
            else{
                _sm.errorTips(validateResult.msg);
            }
        });
    },
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _sm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg){
            _sm.errorTips(errMsg);
        });
    },
    validateForm : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        if(!_sm.validate(formData.phone, 'phone')){
            result.msg = 'Format is not correct';
            return result;
        }
        if(!_sm.validate(formData.email, 'email')){
            result.msg = 'Format is not correct';
            return result;
        }
        if(!_sm.validate(formData.question, 'require')){
            result.msg = 'Can not be empty';
            return result;
        }
        if(!_sm.validate(formData.answer, 'require')){
            result.msg = 'Can not be empty';
            return result;
        }
        result.status   = true;
        result.msg      = 'Validation Passed';
        return result;
    }
};
$(function(){
    page.init();
});
