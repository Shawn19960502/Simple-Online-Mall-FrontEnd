/*
* @Author: Shawn Yang
* @Date:   2019-08-25 20:01:26
* @Last Modified by:   Shawn Yang
* @Last Modified time: 2019-08-26 10:43:16
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _sm             = require('util/shuomall.js');
var _product        = require('service/product-service.js');
var Pagination      = require('util/pagination/index.js');
var templateIndex   = require('./index.string');

var page = {
    data : {
        listParam : {
            keyword         : _sm.getUrlParam('keyword')    || '',
            categoryId      : _sm.getUrlParam('categoryId') || '',
            orderBy         : _sm.getUrlParam('orderBy')    || 'default',
            pageNum         : _sm.getUrlParam('pageNum')    || 1,
            pageSize        : _sm.getUrlParam('pageSize')   || 20
        }
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadList();
    },
    bindEvent : function(){
        var _this = this;
        $('.sort-item').click(function(){
            var $this = $(this);
            _this.data.listParam.pageNum = 1;
            if($this.data('type') === 'default'){
                if($this.hasClass('active')) {
                    return;
                }
                else{
                    $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            }
            else if($this.data('type') === 'price'){
                $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                if(!$this.hasClass('asc')){
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                }else{
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }
            _this.loadList();
        });
    },
    loadList : function(){
        var _this       = this,
            listHtml    = '',
            listParam   = this.data.listParam,
            $pListCon   = $('.p-list-con');
        $pListCon.html('<div class="loading"></div>');
        listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);
        console.log("listParam is " + listParam.categoryId)
        _product.getProductList(listParam, function(res){
        	console.log(res.list)
            listHtml = _sm.renderHtml(templateIndex, {
                list :  res.list
            });
            $pListCon.html(listHtml);
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });
        }, function(errMsg){
            _sm.errorTips(errMsg);
        });
    },
    loadPagination : function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }));
    }
};
$(function(){
    page.init();
})