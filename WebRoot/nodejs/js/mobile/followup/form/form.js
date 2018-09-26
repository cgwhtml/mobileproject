/*
 * @author xyz
 * @date 20170406
 */
var qs = require('querystring'),
	url=require('url'),
	parseURL = require('url').parse;
exports.to_replyForm_page = function(){
	this.render('../../web-bin/mobile/followup/form/replyForm.html');
};
exports.query_form_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/quest/1012","获取表单数据+答案接口调用",query);
};
exports.query_form_data_satisfaction=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/quest/1025","获取二维码满意度表单数据接口调用",query);
};
exports.submit_form_data=function(){
	var query ='';
	var _t=this;
	this.req.addListener('data', function(data){
		query += data;
	}).addListener('end', function(){
		query = qs.parse(query);
		query=JSON.stringify(query);
		console.log(query);
		_t.postAjax("/hug-web/r/quest/1010","表单答案提交接口调用",query);
	});
};
exports.submit_form_data_satisfaction=function(){
	var query ='';
	var _t=this;
	this.req.addListener('data', function(data){
		query += data;
	}).addListener('end', function(){
		query = qs.parse(query);
		query=JSON.stringify(query);
		_t.postAjax("/hug-web/r/quest/1026","二维码满意度表单答案提交接口调用",query);
	});
};
exports.to_checkForm_page = function(){
	this.render('../../web-bin/mobile/followup/form/checkForm.html');
};
exports.query_checkForm_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/quest/1014","获取未发送表单数据接口调用",query);
};
exports.upload_img = function(){
    this.uploadFile("/hug-web/r/file/uploadWiThOss/007","表单图片题目上传文件");
};