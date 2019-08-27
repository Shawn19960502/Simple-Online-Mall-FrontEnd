/*
* @Author: Shawn Yang
* @Date:   2019-08-26 11:11:48
* @Last Modified by:   Shawn Yang
* @Last Modified time: 2019-08-27 10:17:09
*/
'use strict';
require('./index.css');
require('page/common/header/index.js');
var nav             = require('page/common/nav/index.js');
var _sm             = require('util/shuomall.js');
var _cart           = require('service/cart-service.js');
var templateIndex   = require('./index.string');

var page = {
    data : {
        
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadCart();
    },
    bindEvent : function(){
        var _this = this;
        $(document).on('click', '.cart-select', function(){
            var $this = $(this),
                productId = $this.parents('.cart-table').data('product-id');
            if($this.is(':checked')){
                _cart.selectProduct(productId, function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showCartError();
                });
            }
            else{
                _cart.unselectProduct(productId, function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showCartError();
                });
            }
        });
        $(document).on('click', '.cart-select-all', function(){
            var $this = $(this);
            if($this.is(':checked')){
                _cart.selectAllProduct(function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showCartError();
                });
            }
            else{
                _cart.unselectAllProduct(function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showCartError();
                });
            }
        });
        $(document).on('click', '.count-btn', function(){
            var $this       = $(this),
                $pCount     = $this.siblings('.count-input'),
                currCount   = parseInt($pCount.val()),
                type        = $this.hasClass('plus') ? 'plus' : 'minus',
                productId   = $this.parents('.cart-table').data('product-id'),
                minCount    = 1,
                maxCount    = parseInt($pCount.data('max')),
                newCount    = 0;
            if(type === 'plus'){
                if(currCount >= maxCount){
                    _sm.errorTips('该商品数量已达到上限');
                    return;
                }
                newCount = currCount + 1;
            }else if(type === 'minus'){
                if(currCount <= minCount){
                    return;
                }
                newCount = currCount - 1;
            }
            _cart.updateProduct({
                productId : productId,
                count : newCount
            }, function(res){
                _this.renderCart(res);
            }, function(errMsg){
                _this.showCartError();
            });
        });
        $(document).on('click', '.cart-delete', function(){
            if(window.confirm('Sure to Delete？')){
                var productId = $(this).parents('.cart-table')
                    .data('product-id');
                _this.deleteCartProduct(productId);
            }
        });
        $(document).on('click', '.delete-selected', function(){
            if(window.confirm('Sure to Delete？')){
                var arrProductIds = [],
                    $selectedItem = $('.cart-select:checked');
                for(var i = 0, iLength = $selectedItem.length; i < iLength; i ++){
                    arrProductIds
                        .push($($selectedItem[i]).parents('.cart-table').data('product-id'));
                }
                if(arrProductIds.length){
                    _this.deleteCartProduct(arrProductIds.join(','));
                }
                else{
                    _sm.errorTips('Sorry, no product is selected');
                }  
            }
        });
        $(document).on('click', '.btn-submit', function(){
            if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
                window.location.href = './order-confirm.html';
            }else{
                _sm.errorTips('Please submit after you have selected at least one product!');
            }
        });
    },
    loadCart : function(){
        var _this       = this;
        _cart.getCartList(function(res){
            _this.renderCart(res);
        }, function(errMsg){
            _this.showCartError();
        })
    },
    renderCart : function(data){
        this.filter(data);
        this.data.cartInfo = data;
        var cartHtml = _sm.renderHtml(templateIndex, data);
        $('.page-wrap').html(cartHtml);
        nav.loadCartCount();
    },
    deleteCartProduct : function(productIds){
        var _this = this;
        _cart.deleteProduct(productIds, function(res){
            _this.renderCart(res);
        }, function(errMsg){
            _this.showCartError();
        });
    },
    filter : function(data){
        data.notEmpty = !!data.cartProductVoList.length;
    },
    showCartError: function(){
        $('.page-wrap').html('<p class="err-tip">Something Wrong.</p>');
    }
};
$(function(){
    page.init();
})