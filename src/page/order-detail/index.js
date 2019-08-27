/*
* @Author: Shawn Yang
* @Date:   2019-08-26 11:55:32
* @Last Modified by:   Shawn Yang
* @Last Modified time: 2019-08-27 16:22:07
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _sm             = require('util/shuomall.js');
var _order          = require('service/order-service.js');
var templateIndex   = require('./index.string');

var page = {
    data: {
        orderNumber : _sm.getUrlParam('orderNumber')
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        navSide.init({
            name: 'order-list'
        });
        this.loadDetail();
    },
    bindEvent : function(){
        var _this = this;
        $(document).on('click', '.order-cancel', function(){
            if(window.confirm('Sure to Cancel？')){
                _order.cancelOrder(_this.data.orderNumber, function(res){
                    _sm.successTips('Succeed');
                    _this.loadDetail();
                }, function(errMsg){
                    _sm.errorTips(errMsg);
                });
            }
        });
    },
    loadDetail: function(){
        var _this           = this,
            orderDetailHtml = '',
            $content        = $('.content');
        $content.html('<div class="loading"></div>');
        _order.getOrderDetail(this.data.orderNumber, function(res){
            _this.dataFilter(res);
            orderDetailHtml = _sm.renderHtml(templateIndex, res);
            $content.html(orderDetailHtml);
        }, function(errMsg){
            $content.html('<p class="err-tip">' + errMsg + '</p>');
        });
    },
    dataFilter : function(data){
        data.needPay        = data.status == 10;
        data.isCancelable   = data.status == 10;
    }
};
$(function(){
    page.init();
});
