/*
* @Author: Shawn Yang
* @Date:   2019-08-11 11:20:48
* @Last Modified by:   Shawn Yang
* @Last Modified time: 2019-08-11 15:00:52
*/
var _sm = require('util/shuomall.js');

var _user = {
	logout : function() {
		_sm.request({
			url: _sm.getServerUrl('/user/logout.do'),
			method: 'POST',
			success: resolve,
			error: reject
		})
	},

	checkLogin : function(resolve, reject){
        _sm.request({
            url     : _sm.getServerUrl('/user/get_user_info.do'),
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    }
}

module.exports = _user;