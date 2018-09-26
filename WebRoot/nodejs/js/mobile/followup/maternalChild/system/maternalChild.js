/*
 * @author xyz
 * @date 20170506
 */
var qs = require('querystring'),
	url=require('url'),
	parseURL = require('url').parse;
exports.to_referralRemind_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/system/referralRemind.html');
};
exports.query_referralRemind_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/quest/1012","获取复诊提醒数据接口调用",query);
};
exports.to_maternityPlan_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/system/maternityPlan.html');
};
exports.query_maternityPlan_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/quest/1012","获取孕产计划表数据接口调用",query);
};
exports.to_maternityFiling_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/system/maternityFiling.html');
};
exports.submit_maternityFiling_data=function(){
	var query ='';
	var _t=this;
	this.req.addListener('data', function(data){
		query += data;
	}).addListener('end', function(){
		query = qs.parse(query);
        query.gestationHistoryList&&(query.gestationHistoryList=JSON.parse(query.gestationHistoryList));
		query=JSON.stringify(query);
		_t.postAjax("/hug-web/r/maternity/1000","上传妇幼自助建档信息接口调用",query);
	});
};