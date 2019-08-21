/*
* @Author: Shawn Yang
* @Date:   2019-08-20 16:39:24
* @Last Modified by:   Shawn Yang
* @Last Modified time: 2019-08-21 16:27:59
*/
'use strict'
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _sm = require('../../util/shuomall.js');
var _user   = require('service/user-service.js');
var templateIndex   = require('./index.string');

var page = {
    init: function(){
        this.onLoad();
    },
    onLoad : function(){
        navSide.init({
            name: 'user-center'
        });
        this.loadUserInfo();
    },
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _sm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg){
            _sm.errorTips(errMsg);
        });
    }
};
$(function(){
    page.init();
});