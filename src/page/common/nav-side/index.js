/*
* @Author: Shawn Yang
* @Date:   2019-08-11 17:39:50
* @Last Modified by:   Shawn Yang
* @Last Modified time: 2019-08-13 15:49:17
*/
'use strict';
require('./index.css');
require('./index.css');
var _sm             = require('util/shuomall.js');
var templateIndex   = require('./index.string');
var navSide = {
    option : {
        name : '',
        navList : [
            {name : 'user-center', desc : 'Account', href: './user-center.html'},
            {name : 'order-list', desc : 'My Orders', href: './order-list.html'},
            {name : 'user-pass-update', desc : 'Change Password', href: './user-pass-update.html'},
            {name : 'about', desc : 'About', href: './about.html'}
        ]
    },
    init : function(option){
    	// Combine Options
        $.extend(this.option, option);
        this.renderNav();
    },
    renderNav : function(){
        // Calculate active data
        for(var i = 0, iLength = this.option.navList.length; i < iLength; i++){
            if(this.option.navList[i].name === this.option.name){
                this.option.navList[i].isActive = true;
            }
        };
        // draw list data
        var navHtml = _sm.renderHtml(templateIndex, {
            navList : this.option.navList
        });
        // put html to container
        $('.nav-side').html(navHtml);
    }
};

module.exports = navSide;