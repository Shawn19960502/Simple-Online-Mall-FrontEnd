/*
* @Author: Shawn Yang
* @Date:   2019-08-11 11:20:48
* @Last Modified by:   Shawn Yang
* @Last Modified time: 2019-08-27 16:18:12
*/
var _sm = require('util/shuomall.js');

var _user = {
	login : function(userInfo, resolve, reject){
        _sm.request({
            url     : _sm.getServerUrl('/user/login.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
	logout : function(resolve, reject) {
		_sm.request({
			url: _sm.getServerUrl('/user/logout.do'),
			method: 'POST',
			success: resolve,
			error: reject
		})
	},

	checkUsername : function(username, resolve, reject){
        _sm.request({
            url     : _sm.getServerUrl('/user/checkValid.do'),
            data    : {
                type    : 'username',
                str     : username
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },

	checkLogin : function(resolve, reject){
        _sm.request({
            url     : _sm.getServerUrl('/user/get_user_info.do'),
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },
    
    register : function(userInfo, resolve, reject){
        _sm.request({
            url     : _sm.getServerUrl('/user/register.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    getQuestion : function(username, resolve, reject){
        _sm.request({
            url     : _sm.getServerUrl('/user/forget_get_question.do'),
            data    : {
                username : username
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    checkAnswer : function(userInfo, resolve, reject){
        _sm.request({
            url     : _sm.getServerUrl('/user/forget_check_answer.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    resetPassword : function(userInfo, resolve, reject){
        _sm.request({
            url     : _sm.getServerUrl('/user/forget_reset_password.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    getUserInfo : function(resolve, reject){
        _sm.request({
            url     : _sm.getServerUrl('/user/get_information.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    updateUserInfo : function(userInfo, resolve, reject){
        _sm.request({
            url     : _sm.getServerUrl('/user/update_information.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    updatePassword : function(userInfo, resolve, reject){
        _sm.request({
            url     : _sm.getServerUrl('/user/reset_password.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
}

module.exports = _user;