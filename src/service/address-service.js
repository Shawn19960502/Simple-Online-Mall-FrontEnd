/*
* @Author: Shawn Yang
* @Date:   2019-08-26 14:48:41
* @Last Modified by:   Shawn Yang
* @Last Modified time: 2019-08-26 14:49:28
*/
'use strict';
var _sm = require('util/shuomall.js');

var _address = {
    // 获取地址列表
    getAddressList : function(resolve, reject){
        _sm.request({
            url     : _sm.getServerUrl('/shipping/list.do'),
            data    : {
                pageSize : 50
            },
            success : resolve,
            error   : reject
        });
    },
    // 新建收件人
    save : function(addressInfo, resolve, reject){
        _sm.request({
            url     : _sm.getServerUrl('/shipping/add.do'),
            data    : addressInfo,
            success : resolve,
            error   : reject
        });
    },
    // 更新收件人
    update : function(addressInfo, resolve, reject){
        _sm.request({
            url     : _sm.getServerUrl('/shipping/update.do'),
            data    : addressInfo,
            success : resolve,
            error   : reject
        });
    },
    // 删除收件人
    deleteAddress : function(shippingId, resolve, reject){
        _sm.request({
            url     : _sm.getServerUrl('/shipping/del.do'),
            data    : {
                shippingId : shippingId
            },
            success : resolve,
            error   : reject
        });
    },
    // 获取单条收件人信息
    getAddress : function(shippingId, resolve, reject){
        _sm.request({
            url     : _sm.getServerUrl('/shipping/select.do'),
            data    : {
                shippingId : shippingId
            },
            success : resolve,
            error   : reject
        });
    },
}
module.exports = _address;