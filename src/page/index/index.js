/*
* @Author: Shawn Yang
* @Date:   2019-07-29 16:44:45
* @Last Modified by:   Shawn Yang
* @Last Modified time: 2019-08-21 18:32:54
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
var navSide = require('page/common/nav-side/index.js');
var templateBanner = require('./banner.string');
var _sm = require('util/shuomall.js');

$(function() {
    var bannerHtml  = _sm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    var $slider     = $('.banner').unslider({
        dots: true
    });
    $('.banner-con .banner-arrow').click(function(){
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    });
});
