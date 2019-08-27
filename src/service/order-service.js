/*
* @Author: Shawn Yang
* @Date:   2019-08-26 11:54:03
* @Last Modified by:   Shawn Yang
* @Last Modified time: 2019-08-26 11:54:44
*/
'use strict';
var _sm = require('util/shuomall.js');

var _order = {
    getProductList : function(resolve, reject){
        _sm.request({
            url     : _sm.getServerUrl('/order/get_order_cart_product.do'),
            success : resolve,
            error   : reject
        });
    },
    createOrder : function(orderInfo, resolve, reject){
        _sm.request({
            url     : _sm.getServerUrl('/order/create.do'),
            data    : orderInfo,
            success : resolve,
            error   : reject
        });
    },
    getOrderList : function(listParam, resolve, reject){
        _sm.request({
            url     : _sm.getServerUrl('/order/list.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
    getOrderDetail : function(orderNumber, resolve, reject){
        _sm.request({
            url     : _sm.getServerUrl('/order/detail.do'),
            data    : {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    },
    cancelOrder : function(orderNumber, resolve, reject){
        _sm.request({
            url     : _sm.getServerUrl('/order/cancel.do'),
            data    : {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _order;