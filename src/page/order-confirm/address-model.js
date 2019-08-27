/*
* @Author: Shawn Yang
* @Date:   2019-08-26 14:43:40
* @Last Modified by:   Shawn Yang
* @Last Modified time: 2019-08-27 15:45:34
*/

'use strict';
var _sm                     = require('util/shuomall.js');
var _cities                 = require('util/cities/index.js');
var _address                = require('service/address-service.js');
var templateAddressModal    = require('./address-model.string');

var addressModal = {
    show : function(option){
        this.option         = option;
        this.option.data    = option.data || {};
        this.$modalWrap     = $('.modal-wrap');
        this.loadModal();
        this.bindEvent();
    },
    bindEvent :  function(){
        var _this = this;
        this.$modalWrap.find('#receiver-province').change(function(){
            var selectedProvince = $(this).val();
            _this.loadCities(selectedProvince);
        });
        this.$modalWrap.find('.address-btn').click(function(){
            var receiverInfo = _this.getReceiverInfo(),
                isUpdate     = _this.option.isUpdate;
            if(!isUpdate && receiverInfo.status){
                _address.save(receiverInfo.data, function(res){
                    _sm.successTips('Add address successfully');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function' 
                        && _this.option.onSuccess(res);
                }, function(errMsg){
                    _sm.errorTips(errMsg);
                });
            }
            else if(isUpdate && receiverInfo.status){
                _address.update(receiverInfo.data, function(res){
                    _sm.successTips('Address Modification Succeed');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function' 
                        && _this.option.onSuccess(res);
                }, function(errMsg){
                    _sm.errorTips(errMsg);
                });
            }
            else{
                _sm.errorTips(receiverInfo.errMsg || 'Something Wrong~');
            }
        });
        this.$modalWrap.find('.modal-container').click(function(e){
            e.stopPropagation();
        });
        this.$modalWrap.find('.close').click(function(e){
            _this.hide();
        });
    },
    loadModal : function(){
        var addressModalHtml = _sm.renderHtml(templateAddressModal, {
            isUpdate    :  this.option.isUpdate,
            data        : this.option.data
        });
        this.$modalWrap.html(addressModalHtml);
        this.loadProvince();
    },
    loadProvince : function(){
        var provinces       = _cities.getProvinces() || [],
            $provinceSelect = this.$modalWrap.find('#receiver-province');
        $provinceSelect.html(this.getSelectOption(provinces));
        if(this.option.isUpdate && this.option.data.receiverProvince){
            $provinceSelect.val(this.option.data.receiverProvince);
            this.loadCities(this.option.data.receiverProvince);
        }
    },
    loadCities : function(provinceName){
        var cities      = _cities.getCities(provinceName) || [],
            $citySelect = this.$modalWrap.find('#receiver-city');
        $citySelect.html(this.getSelectOption(cities));
        if(this.option.isUpdate && this.option.data.receiverCity){
            $citySelect.val(this.option.data.receiverCity);
        }
    },
    getReceiverInfo : function(){
        var receiverInfo    = {},
            result          = {
                status : false
            };
        receiverInfo.receiverName       = $.trim(this.$modalWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince   = this.$modalWrap.find('#receiver-province').val();
        receiverInfo.receiverCity       = this.$modalWrap.find('#receiver-city').val();
        receiverInfo.receiverAddress    = $.trim(this.$modalWrap.find('#receiver-address').val());
        receiverInfo.receiverPhone      = $.trim(this.$modalWrap.find('#receiver-phone').val());
        receiverInfo.receiverZip        = $.trim(this.$modalWrap.find('#receiver-zip').val());
        
        if(this.option.isUpdate){
            receiverInfo.id             = this.$modalWrap.find('#receiver-id').val();
        }
        if(!receiverInfo.receiverName){
            result.errMsg = 'Please Enter Name';
        }
        else if(!receiverInfo.receiverProvince){
            result.errMsg = 'Please Enter State';
        }
        else if(!receiverInfo.receiverCity){
            result.errMsg = 'Please Enter City';
        }
        else if(!receiverInfo.receiverAddress){
            result.errMsg = 'Please Enter Concrete Address';
        }
        else if(!receiverInfo.receiverPhone){
            result.errMsg = 'Please Enter Phone Number';
        }
        else{
            result.status   = true;
            result.data     = receiverInfo;
        }
        return result;
    },
    getSelectOption : function(optionArray){
        var html = '<option value="">Select</option>';
        for(var i = 0, length = optionArray.length; i < length; i++){
            html += '<option value="' + optionArray[i] + '">' + optionArray[i] + '</option>';
        }
        return html;
    },
    hide : function(){
        this.$modalWrap.empty();
    }
};
module.exports = addressModal;