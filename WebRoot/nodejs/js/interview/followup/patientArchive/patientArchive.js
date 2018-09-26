/**
 * Created by huang on 2017/6/27.
 */
var qs = require('querystring'),
    url=require('url');
//跳转健康本页面
exports.to_hospitalmessList_page = function(){
    this.testMD5('../../interview/followup/patientArchive/hospitalmessList.html');
};
//跳转住院页面
exports.to_patientHosp_page = function(){
    this.render('../../interview/followup/patientArchive/patientHosp.html');
};
//跳转门诊页面
exports.to_patientVisit_page = function(){
    this.render('../../interview/followup/patientArchive/patientVisit.html');
};
//跳转体检页面
exports.to_patientTest_page = function(){
    this.render('../../interview/followup/patientArchive/patientTest.html');
};
//跳转自建页面
exports.to_patientSelf_page = function(){
    this.render('../../interview/followup/patientArchive/patientSelf.html');
};
//加载健康本页面
exports.query_hospitalmessList_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/medical/1018","医疗信息列表获取成功",query);
};
//加载住院列表
exports.query_patientHosp_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/medical/1027","patient住院列表获取成功",query);
};
//加载门诊列表
exports.query_patientVisit_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/medical/1028","patient门诊列表获取成功",query);
};
//加载体检列表
exports.query_patientTest_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/medical/1035","patient体检列表获取成功",query);
};
//加载门诊医嘱信息
exports.query_visitOrder_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/medical/1009","patient门诊医嘱获取成功",query);
};
//加载检验报告
exports.query_inspection_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/medical/1011","patient检验报告获取成功",query);
};
//加载检查报告
exports.query_examination_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/medical/1010","patient检查报告获取成功",query);
};
//加载自建列表
exports.query_patientSelf_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/medical/record/1001","patient自建列表获取成功",query);
};