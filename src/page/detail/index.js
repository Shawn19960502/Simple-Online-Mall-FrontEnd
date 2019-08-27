/*
* @Author: Shawn Yang
* @Date:   2019-08-26 10:53:46
* @Last Modified by:   Shawn Yang
* @Last Modified time: 2019-08-26 11:04:34
*/
'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _sm             = require('util/shuomall.js');
var _product        = require('service/product-service.js');
var _cart           = require('service/cart-service.js');
var templateIndex   = require('./index.string');

var page = {
    data : {
        productId : _sm.getUrlParam('productId') || '',
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        if(!this.data.productId){
            _sm.goHome();
        }
        this.loadDetail();
    },
    bindEvent : function(){
        var _this = this;
        $(document).on('mouseenter', '.p-img-item', function(){
            var imageUrl   = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imageUrl);
        });
        $(document).on('click', '.p-count-btn', function(){
            var type        = $(this).hasClass('plus') ? 'plus' : 'minus',
                $pCount     = $('.p-count'),
                currCount   = parseInt($pCount.val()),
                minCount    = 1,
                maxCount    = _this.data.detailInfo.stock || 1;
            if(type === 'plus'){
                $pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
            }
            else if(type === 'minus'){
                $pCount.val(currCount > minCount ? currCount - 1 : minCount);
            }
        });
        $(document).on('click', '.cart-add', function(){
            _cart.addToCart({
                productId   : _this.data.productId,
                count       : $('.p-count').val()
            }, function(res){
                window.location.href = './result.html?type=cart-add';
            }, function(errMsg){
                _sm.errorTips(errMsg);
            });
        });
    },
    loadDetail : function(){
        var _this       = this,
            html        = '',
            $pageWrap   = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');
        _product.getProductDetail(this.data.productId, function(res){
            _this.filter(res);
            _this.data.detailInfo = res;
            html = _sm.renderHtml(templateIndex, res);
            $pageWrap.html(html);
        }, function(errMsg){
            $pageWrap.html('<p class="err-tip">Not Found</p>');
        });
    },
    filter : function(data){
        data.subImages = data.subImages.split(',');
    }
};
$(function(){
    page.init();
})