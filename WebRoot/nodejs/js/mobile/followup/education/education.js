/*
 * @author xyz
 * @date 20170504
 */
var qs = require('querystring'),
	url=require('url'),
	parseURL = require('url').parse;
exports.to_checkEducation_page = function(){
	this.render('../../web-bin/mobile/followup/education/checkEducation.html');
};
exports.query_education_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/educate/1002","获取宣教数据接口调用",query);
};
exports.to_noSendEducation_page = function(){
	this.render('../../web-bin/mobile/followup/education/noSendEducation.html');
};
exports.query_noSendEducation_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/educate/1006","获取未发送宣教数据接口调用",query);
};