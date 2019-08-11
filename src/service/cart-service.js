/*
* @Author: Shawn Yang
* @Date:   2019-08-07 14:02:39
* @Last Modified by:   Shawn Yang
* @Last Modified time: 2019-08-09 17:55:45
*/

'use strict';

var _sm = require('util/shuomall.js');

var _cart = {
    getCartCount : function(resolve, reject){
        _sm.request({
            url     : _sm.getServerUrl('/cart/get_cart_product_count.do'),
            success : resolve,
            error   : reject
        });
    },
    addToCart : function(productInfo, resolve, reject){
        _sm.request({
            url     : _sm.getServerUrl('/cart/add.do'),
            data    : productInfo,
            success : resolve,
            error   : reject
        });
    },
    getCartList : function(resolve, reject){
        _sm.request({
            url     : _sm.getServerUrl('/cart/list.do'),
            success : resolve,
            error   : reject
        });
    },
    selectProduct : function(productId, resolve, reject){
        _sm.request({
            url     : _sm.getServerUrl('/cart/select.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    },
    unselectProduct : function(productId, resolve, reject){
        _sm.request({
            url     : _sm.getServerUrl('/cart/un_select.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    },
    selectAllProduct : function(resolve, reject){
        _sm.request({
            url     : _sm.getServerUrl('/cart/select_all.do'),
            success : resolve,
            error   : reject
        });
    },
    unselectAllProduct : function(resolve, reject){
        _sm.request({
            url     : _sm.getServerUrl('/cart/un_select_all.do'),
            success : resolve,
            error   : reject
        });
    },
    updateProduct : function(productInfo, resolve, reject){
        _sm.request({
            url     : _sm.getServerUrl('/cart/update.do'),
            data    : productInfo,
            success : resolve,
            error   : reject
        });
    },
    deleteProduct : function(productIds, resolve, reject){
        _sm.request({
            url     : _sm.getServerUrl('/cart/delete_product.do'),
            data    : {
                productIds : productIds
            },
            success : resolve,
            error   : reject
        });
    },
}
module.exports = _cart;