/*
 * @author fjl
 * @date 20161025
 */
var qs = require('querystring'),
	url=require('url');
//跳转至医疗页面
exports.to_medicalRecordList_page = function(){
	this.render('../../web-bin/mobile/medical/patient/medicalRecordList.html');
};
//加载医疗列表
exports.query_medicalRecordList_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/medical/1026","patient医疗列表获取成功",query);
};
//跳转至刷新页面
exports.to_refresh_page = function(){
	this.render('../../web-bin/mobile/medical/patient/refresh.html');
};
//跳转至门诊列表
exports.to_visit_case_page = function(){
	this.render('../../web-bin/mobile/medical/patient/visit_case.html');
};
//跳转至住院列表
exports.to_hosp_case_page = function(){
	this.render('../../web-bin/mobile/medical/patient/hosp_case.html');
};
//跳转至体检列表
exports.to_test_case_page = function(){
	this.render('../../web-bin/mobile/medical/patient/test_case.html');
};
//持续刷新医疗数据
exports.query_refresh_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/medical/1040","patient医疗数据获取成功",query);//03
};
//点击刷新医疗数据
exports.query_startRefresh_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/medical/1039","patient医疗数据刷新成功",query);//05
};
//加载门诊列表
exports.query_visitList_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/medical/1028","patient门诊列表获取成功",query);
};
//加载门诊医嘱信息
exports.query_visitOrder_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/medical/1009","patient门诊医嘱获取成功",query);
};
//跳转至费用详情
exports.to_cost_page = function(){
	this.render('../../web-bin/mobile/medical/patient/cost.html');
};
//跳转至门诊用药
exports.to_visit_medicine_page = function(){
	this.render('../../web-bin/mobile/medical/patient/visit_medicine.html');
};
//跳转至检查详情
exports.to_examination_page = function(){
	this.render('../../web-bin/mobile/medical/patient/examination.html');
};
//跳转至检验详情
exports.to_inspection_page = function(){
	this.render('../../web-bin/mobile/medical/patient/inspection.html');
};
//加载住院列表
exports.query_hospList_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/medical/1027","patient住院列表获取成功",query);
};
//跳转至住院用药
exports.to_hosp_medicine_page = function(){
	this.render('../../web-bin/mobile/medical/patient/hosp_medicine.html');
};
//跳转至住院手术
exports.to_hosp_operation_page = function(){
	this.render('../../web-bin/mobile/medical/patient/hosp_operation.html');
};
//加载门诊费用
exports.query_visit_cost_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/medical/1008","patient门诊费用获取成功",query);
};
//加载住院费用
exports.query_hosp_cost_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/medical/1013","patient住院费用获取成功",query);
};
//加载住院费用明细
exports.query_hosp_cost_detail_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/medical/1012","patient住院费用明细获取成功",query);
};
//跳转至费用明细
exports.to_cost_detail_page = function(){
	this.render('../../web-bin/mobile/medical/patient/cost_detail.html');
};
//加载检查报告
exports.query_examination_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/medical/1010","patient检查报告获取成功",query);
};
//加载检验报告
exports.query_inspection_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/medical/1011","patient检验报告获取成功",query);
};
//加载条码信息
exports.query_barcode_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/medical/1029","patient检验报告条码信息获取成功",query);
};
//加载体检列表
exports.query_testList_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/medical/1035","patient体检列表获取成功",query);
};
//跳转至体检检查详情
exports.to_test_examination_page = function(){
	this.render('../../web-bin/mobile/medical/patient/test_examination.html');
};
//跳转至体检检验详情
exports.to_test_inspection_page = function(){
	this.render('../../web-bin/mobile/medical/patient/test_inspection.html');
};
//跳转至查看条码详情
exports.to_barcode_detail_page = function(){
	this.render('../../web-bin/mobile/medical/patient/barcode_detail.html');
};
//加载病人信息
exports.query_patient_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/pat/1003","patient信息获取成功",query);
};



