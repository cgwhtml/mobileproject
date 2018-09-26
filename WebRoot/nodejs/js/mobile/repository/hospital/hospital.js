/*
 * @author cgw
 * @date 20170311
 */
var qs = require('querystring'),
	url=require('url');
//跳转页面方法，to_是特定的方法。render后是页面跳转的具体路径，需要在config.js对应的map方法中注入
exports.to_hosList_page = function(){
	this.render('../../web-bin/mobile/repository/hospital/hosList.html');
};
//ajax读取数据的方法，需要在config.js对应的map方法中注入
exports.query_hosTypeList_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	console.log(query)
	this.postAjax("/hug-web/r/hos/1005","获取科室下拉列表",query);
};
exports.query_hosNameList_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/hos/1006","获取科室医院下拉列表",query);
};
exports.to_hosMsg_page = function(){
	this.render('../../web-bin/mobile/repository/hospital/showHos.html');
};
exports.query_hosMsg_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/hos/1007","获取专科医院内容",query);
};
exports.query_hosMsgCode_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/hos/1008","获取专科医院内容",query);
};