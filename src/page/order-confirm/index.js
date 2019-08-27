/*
* @Author: Shawn Yang
* @Date:   2019-08-26 14:38:21
* @Last Modified by:   Shawn Yang
* @Last Modified time: 2019-08-27 11:22:41
*/
'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _sm                 = require('util/shuomall.js');
var _order              = require('service/order-service.js');
var _address            = require('service/address-service.js');
var templateAddress     = require('./address-list.string');
var templateProduct     = require('./product-list.string');
var addressModel        = require('./address-model.js');

var page = {
    data : {
        selectedAddressId : null
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadAddressList();
        this.loadProductList();
    },
    bindEvent : function(){
        var _this = this;
        $(document).on('click', '.address-item', function(){
            $(this).addClass('active')
                .siblings('.address-item').removeClass('active');
            _this.data.selectedAddressId = $(this).data('id');
        });
        $(document).on('click', '.order-submit', function(){
            var shippingId = _this.data.selectedAddressId;
            if(shippingId){
                _order.createOrder({
                    shippingId : shippingId
                }, function(res){
                    window.location.href = './payment.html?orderNumber=' + res.orderNo;
                }, function(errMsg){
                    _sm.errorTips(errMsg)
                });
            }else{
                _sm.errorTips('Please select one address.');
            }
        });
        $(document).on('click', '.address-add', function(){
            addressModel.show({
                isUpdate : false,
                onSuccess : function(){
                    _this.loadAddressList();
                }
            });
        });
        $(document).on('click', '.address-update', function(e){
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            _address.getAddress(shippingId, function(res){
                addressModel.show({
                    isUpdate    : true,
                    data        : res,
                    onSuccess   : function(){
                        _this.loadAddressList();
                    }
                });
            }, function(errMsg){
                _sm.errorTips(errMsg);
            });
        });
        $(document).on('click', '.address-delete', function(e){
            e.stopPropagation();
            var id = $(this).parents('.address-item').data('id');
            if(window.confirm('Sure to Delete？')){
                _address.deleteAddress(id, function(res){
                    _this.loadAddressList();
                }, function(errMsg){
                    _sm.errorTips(errMsg);
                });
            }
        });
    },
    loadAddressList : function(){
        var _this       = this;
        $('.address-con').html('<div class="loading"></div>');
        _address.getAddressList(function(res){
            _this.addressFilter(res);
            var addressListHtml = _sm.renderHtml(templateAddress, res);
            $('.address-con').html(addressListHtml);
        }, function(errMsg){
            $('.address-con').html('<p class="err-tip">load address failed.</p>');
        })
    },
    addressFilter : function(data){
        if(this.data.selectedAddressId){
            var selectedAddressIdFlag = false;
            for (var i = 0, length = data.list.length; i < length; i++) {
                if(data.list[i].id === this.data.selectedAddressId){
                    data.list[i].isActive = true;
                    selectedAddressIdFlag = true;
                }
            };
            if(!selectedAddressIdFlag){
                this.data.selectedAddressId = null;
            }
        }
    },
    loadProductList : function(){
        var _this       = this;
        $('.product-con').html('<div class="loading"></div>');
        _order.getProductList(function(res){
            var productListHtml = _sm.renderHtml(templateProduct, res);
            $('.product-con').html(productListHtml);
        }, function(errMsg){
            $('.product-con').html('<p class="err-tip">load product infomation failed.</p>');
        })
    },
};
$(function(){
    page.init();
})