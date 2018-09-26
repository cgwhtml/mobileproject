/*
 * @author cgw
 * @date 20170311
 */
var qs = require('querystring'),
	url=require('url');
//跳转页面方法，to_是特定的方法。render后是页面跳转的具体路径，需要在config.js对应的map方法中注入
exports.to_drugList_page = function(){
	this.render('../../web-bin/mobile/repository/drug/drugList.html');
};
//ajax读取数据的方法，需要在config.js对应的map方法中注入
exports.query_drugTypeList_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/drug/1000","药品分类列表加载成功",query);
};
exports.query_drugNameList_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/drug/1004","药品名称加载成功",query);
};
exports.query_searchDrug_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/drug/1005","搜索药品分类列表加载成功",query);
};
exports.to_drugMsg_page = function(){
	this.render('../../web-bin/mobile/repository/drug/showDrug.html');
};
exports.query_drugMsg_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/drug/1002","药品详情加载成功",query);
};