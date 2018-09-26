/*
 * @author fjl
 * @date 20161026
 */
var qs = require('querystring'),
	url=require('url');
//跳转至医疗页面
exports.to_medicalRecordList_page = function(){
	this.render('../../web-bin/mobile/medical/doctor/medicalRecordList.html');
};
//加载医疗列表
exports.query_medicalRecordList_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/medical/1033","doctor医疗列表获取成功",query);//15
};
//跳转至刷新页面
exports.to_refresh_page = function(){
	this.render('../../web-bin/mobile/medical/doctor/refresh.html');
};
//跳转至门诊列表
exports.to_visit_case_page = function(){
	this.render('../../web-bin/mobile/medical/doctor/visit_case.html');
};
//跳转至住院列表
exports.to_hosp_case_page = function(){
	this.render('../../web-bin/mobile/medical/doctor/hosp_case.html');
};
//持续刷新医疗数据
exports.query_refresh_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/medical/1003","doctor医疗数据获取成功",query);
};
//点击刷新医疗数据
exports.query_startRefresh_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/medical/1005","doctor医疗数据刷新成功",query);
};
//加载门诊列表
exports.query_visitList_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/medical/1007","doctor门诊列表获取成功",query);
};
//加载门诊医嘱信息
exports.query_visitOrder_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/medical/1009","doctor门诊医嘱获取成功",query);
};
//跳转至费用详情
exports.to_cost_page = function(){
	this.render('../../web-bin/mobile/medical/doctor/cost.html');
};
//跳转至门诊用药
exports.to_visit_medicine_page = function(){
	this.render('../../web-bin/mobile/medical/doctor/visit_medicine.html');
};
//跳转至检查详情
exports.to_examination_page = function(){
	this.render('../../web-bin/mobile/medical/doctor/examination.html');
};
//跳转至检验详情
exports.to_inspection_page = function(){
	this.render('../../web-bin/mobile/medical/doctor/inspection.html');
};
//加载住院列表
exports.query_hospList_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/medical/1006","doctor住院列表获取成功",query);
};
//跳转至住院用药
exports.to_hosp_medicine_page = function(){
	this.render('../../web-bin/mobile/medical/doctor/hosp_medicine.html');
};
//跳转至住院手术
exports.to_hosp_operation_page = function(){
	this.render('../../web-bin/mobile/medical/doctor/hosp_operation.html');
};
//加载门诊费用
exports.query_visit_cost_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/medical/1008","doctor门诊费用获取成功",query);
};
//加载住院费用
exports.query_hosp_cost_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/medical/1013","doctor住院费用获取成功",query);
};
//加载住院费用明细
exports.query_hosp_cost_detail_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/medical/1012","doctor住院费用明细获取成功",query);
};
//跳转至费用明细
exports.to_cost_detail_page = function(){
	this.render('../../web-bin/mobile/medical/doctor/cost_detail.html');
};
//加载检查报告
exports.query_examination_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/medical/1010","doctor检查报告获取成功",query);
};
//加载检验报告
exports.query_inspection_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/medical/1011","doctor检验报告获取成功",query);
};
//加载病人信息
exports.query_patient_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/pat/1003","patient信息获取成功",query);
};





