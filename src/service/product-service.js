/*
* @Author: Shawn Yang
* @Date:   2019-08-25 19:58:08
* @Last Modified by:   Shawn Yang
* @Last Modified time: 2019-08-25 20:43:50
*/
'use strict';

var _sm = require('util/shuomall.js');

var _product = {
    getProductList : function(listParam, resolve, reject){
        _sm.request({
            url     : _sm.getServerUrl('/product/list.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
    getProductDetail : function(productId, resolve, reject){
        _sm.request({
            url     : _sm.getServerUrl('/product/detail.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _product;