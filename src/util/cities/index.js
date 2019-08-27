/*
* @Author: Shawn Yang
* @Date:   2019-08-26 14:52:19
* @Last Modified by:   Shawn Yang
* @Last Modified time: 2019-08-27 15:43:49
*/
'use strict';

var _cities = {
    cityInfo : {
        'Beijing':['Beijng'],
        'ShangHai':['ShangHai'],
        'Tianjin':['Tianjin'],
        'California':['LA','SF', 'Berkeley'],
        'Texas':['Dallas','Austin']
    },
    getProvinces : function(){
        var provinces = [];
        for(var item in this.cityInfo){
            provinces.push(item);
        }
        return provinces;
    },
    getCities : function(provinceName){
        return this.cityInfo[provinceName] || [];
    }
}

module.exports = _cities