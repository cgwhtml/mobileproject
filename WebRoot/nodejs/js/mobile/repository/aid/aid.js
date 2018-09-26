/*
 * @author cgw
 * @date 20170311
 */
var qs = require('querystring'),
	url=require('url');
//跳转页面方法，to_是特定的方法。render后是页面跳转的具体路径，需要在config.js对应的map方法中注入
exports.to_aidList_page=function(){
	this.render('../../web-bin/mobile/repository/aid/aidList.html');
};
//ajax读取数据的方法，需要在config.js对应的map方法中注入
exports.query_aidTypeList_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/emergency/1001","获取急救分类",query);
};
exports.query_aidNameList_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/emergency/1002","急救名称加载成功",query);
};
exports.query_searchAid_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/emergency/1003","搜索药品分类列表加载成功",query);
};
exports.to_emergencyMsg_page = function(){
	this.render('../../web-bin/mobile/repository/aid/showAid.html');
};
exports.query_aidMsg_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/emergency/1000","获取急救内容",query);
};