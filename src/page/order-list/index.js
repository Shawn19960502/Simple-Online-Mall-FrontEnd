/*
* @Author: Shawn Yang
* @Date:   2019-08-26 11:56:04
* @Last Modified by:   Shawn Yang
* @Last Modified time: 2019-08-27 16:03:48
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _sm             = require('util/shuomall.js');
var _order          = require('service/order-service.js');
var Pagination      = require('util/pagination/index.js');
var templateIndex   = require('./index.string');

var page = {
    data: {
        listParam : {
            pageNum     : 1,
            pageSize    : 10
        }
    },
    init: function(){
        this.onLoad();
    },
    onLoad : function(){
        this.loadOrderList();
        navSide.init({
            name: 'order-list'
        });
    },
    loadOrderList: function(){
        var _this           = this,
            orderListHtml   = '',
            $listCon        = $('.order-list-con');
        $listCon.html('<div class="loading"></div>');
        _order.getOrderList(this.data.listParam, function(res){
            orderListHtml = _sm.renderHtml(templateIndex, res);
            $listCon.html(orderListHtml);
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });
        }, function(errMsg){
            $listCon.html('<p class="err-tip">Load Order Failed</p>');
        });
    },
    loadPagination : function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }));
    }
};
$(function(){
    page.init();
});