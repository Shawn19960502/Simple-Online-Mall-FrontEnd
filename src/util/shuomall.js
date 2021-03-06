/*
* @Author: Shawn Yang
* @Date:   2019-08-02 12:04:10
* @Last Modified by:   Shawn Yang
* @Last Modified time: 2019-08-30 10:36:26
*/

'use strict';
var Hogan = require('hogan');
var conf = {
    serverHost : ''
};

var _sm = {
	request : function(param){
		var _this = this;
		$.ajax({
			type : param.method || 'GET',
			url  : param.url || '',
            xhrFields: {
                            withCredentials: true
                        },
			dataType : param.type || 'json',
			data : param.data || '',
			success : function(res){
				if(0 === res.status){
					typeof param.success === 'function' && param.success(res.data, res.msg);
				}
				else if(10 === res.status){
					_this.doLogin();
				}
				else if(1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg);
                }
			},
			error : function(err){
                console.log(2);
				typeof param.error === 'function' && param.error(err.statusText);
			}

		});
	},
	doLogin : function(){
	    window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
	},

    getUrlParam : function(name){
        var reg     = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var temp  = window.location.search.substr(1);
        var result = temp.match(reg);
        console.log(result);
        return result ? decodeURIComponent(result[2]) : null;
    },

    getServerUrl : function(path){
    	return conf.serverHost + path;
    },
    renderHtml : function(htmlTemplate, data) {
    	var template = Hogan.compile(htmlTemplate),
    		result = template.render(data);
    	return result;
    },
    successTips : function(msg){
    	alert(msg || 'operation successful!');
    },
    errorTips : function(msg){
    	alert(msg || 'Something Wrong');
    },
    validate : function(value, type) {
    	var value = $.trim(value);
    	if('require' === type) {
    		return !!value;
    	}
    	if('phone' === type) {
    		return /^\d{10}$/.test(value);
    	}
    	if('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    goHome : function(){
        window.location.href = './index.html';
    }
}

module.exports = _sm;