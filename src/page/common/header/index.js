/*
* @Author: Shawn Yang
* @Date:   2019-08-11 16:29:07
* @Last Modified by:   Shawn Yang
* @Last Modified time: 2019-08-11 16:48:50
*/
'use strict';
require('./index.css');
var _sm = require('util/shuomall.js');
var header = {
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        var keyword = _sm.getUrlParam('keyword');
        if(keyword){
            $('#search-input').val(keyword);
        };
    },
    bindEvent : function(){
        var _this = this;
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        $('#search-input').keyup(function(e){
            // 13 is the 'enter' keyCode
            if(e.keyCode === 13){
                _this.searchSubmit();
            }
        });
    },
    searchSubmit : function(){
        var keyword = $.trim($('#search-input').val());
        if(keyword){
            window.location.href = './list.html?keyword=' + keyword;
        }
        else{
            _sm.goHome();
        }
    }
};

header.init();