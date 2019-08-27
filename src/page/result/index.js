/*
* @Author: Shawn Yang
* @Date:   2019-08-13 17:17:06
* @Last Modified by:   Shawn Yang
* @Last Modified time: 2019-08-27 17:47:53
*/
'use strict';
require('./index.css');
require('../common/nav-simple/index.js');
var _sm = require('util/shuomall.js');


$(function(){
    var type        = _sm.getUrlParam('type') || 'default',
        $element    = $('.' + type + '-success');
    if(type === 'payment'){
        var orderNumber  = _sm.getUrlParam('orderNumber'),
            $orderNumber = $element.find('.order-number');
        $orderNumber.attr('href', $orderNumber.attr('href') + orderNumber);
    }
    $element.show();
})