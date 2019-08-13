/*
* @Author: Shawn Yang
* @Date:   2019-08-13 17:17:06
* @Last Modified by:   Shawn Yang
* @Last Modified time: 2019-08-13 17:39:48
*/
'use strict';
require('./index.css');
require('../common/nav-simple/index.js');
var _mm = require('../../util/shuomall.js');


$(function(){
    var type        = _mm.getUrlParam('type') || 'default',
        $element    = $('.' + type + '-success');
    if(type === 'payment'){
        var orderNumber  = _mm.getUrlParam('orderNumber'),
            $orderNumber = $element.find('.order-number');
        $orderNumber.attr('href', $orderNumber.attr('href') + orderNumber);
    }
    $element.show();
})