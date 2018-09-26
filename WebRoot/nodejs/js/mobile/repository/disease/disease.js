/*
 * @author cgw
 * @date 20170311
 */
var qs = require('querystring'),
	url=require('url');
//跳转页面方法，to_是特定的方法。render后是页面跳转的具体路径，需要在config.js对应的map方法中注入
exports.to_diseaseList_page=function(){
	this.render('../../web-bin/mobile/repository/disease/diseaseList.html');
};
//ajax读取数据的方法，需要在config.js对应的map方法中注入
exports.query_diseaseTypeList1_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/disease/1000","根据疾病部位分类列表加载成功",query);
};
exports.query_diseaseNameList1_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/disease/1001","根据疾病部位分类疾病名称加载成功",query);
};
// 根据科室
exports.query_diseaseTypeList2_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/disease/1002","根据科室分类列表加载成功",query);
};
exports.query_diseaseNameList2_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/disease/1003","根据科室疾病分类列表加载",query);
};
exports.query_searchDisease_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/disease/1005","搜索疾病分类列表加载成功",query);
};
exports.to_diseaseMsg_page = function(){
	this.render('../../web-bin/mobile/repository/disease/showDisease.html');
};
exports.query_diseaseMsg_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/disease/1004","疾病详情加载成功",query);
};