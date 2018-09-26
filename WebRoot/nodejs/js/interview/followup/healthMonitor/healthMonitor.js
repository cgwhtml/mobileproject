/**
 * @author xyz
 * @date 20161026
 */
var qs = require('querystring'),
	url=require('url');
//跳转到健康监测异常未处理列表页面
exports.to_healthMonitorErrorList_page = function(){
	this.render('../../web-bin/interview/followup/healthMonitor/healthMonitorErrorList.html');
};
//加载健康监测异常列表数据(包括未处理异常和已处理异常)
exports.query_healthMonitorErrorList_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
    if(query.name){
	    query.name=unescape(query.name);
    }
    query =JSON.stringify(query);
	this.postAjax("/hug-web/r/health/1006","健康监测异常列表获取成功",query);
};
//获取随访内网ip
exports.query_host_ip=function(){
	this.postAjax("/hug-web/r/hos/1000","随访内网ip获取成功");
};
//跳转到健康监测异常数据处理页面
exports.to_errorHandle_page=function(){
	this.render('../../web-bin/interview/followup/healthMonitor/errorHandle.html');
};
//提交健康监测异常数据处理结果
exports.submit_errorHandle_data=function(){
	var query ='';
	_t=this;
	this.req.addListener('data', function(data){
		query += data;
	}).addListener('end', function(){
		_t.postAjax("/hug-web/r/health/1010","健康监测异常处理成功",query);
	});
};
//跳转到健康监测异常已处理列表页面
exports.to_healthMonitorFinishList_page=function(){
	this.render('../../web-bin/interview/followup/healthMonitor/healthMonitorFinishList.html');
};
//跳转到健康监测全部数据页面
exports.to_healthMonitorAllList_page=function(){
	this.render('../../web-bin/interview/followup/healthMonitor/healthMonitorAllList.html');
};
//加载健康监测全部数据
exports.query_healthMonitorAllList_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
    if(query.name){
	    query.name=unescape(query.name);
    }
    query =JSON.stringify(query);
	this.postAjax("/hug-web/r/health/1008","健康监测全部数据列表获取成功",query);
};
//跳转到远程胎监页面（包括未处理和已处理）
exports.to_fetalHeartHandleList_page=function(){
	this.render('../../web-bin/interview/followup/healthMonitor/fetalHeartHandleList.html');
};
//获取远程胎监数据
exports.query_fetalHeartHandleList_data=function(){
	this.postAjax("/hug-web/r/health/1012","远程胎监数据获取成功");
};
//跳转到远程胎监处理页面
exports.to_fetalHeartHandle_page=function(){
	this.render('../../web-bin/interview/followup/healthMonitor/fetalHeartHandle.html');
};
//跳转到远程胎监报告查看页面
exports.to_checkReport_page=function(){
	this.req.url=this.req.url.replace("/web-bin/p/followup/healthMonitor/to_checkReport_page","/hug-web/r/health/1014");
	this.proxyUrl();
};
//查询某一个健康数据
exports.query_oneHealth_data=function(){
	this.postAjax("/hug-web/r/health/1007","查询某一条健康数据成功");
};
//查询病人设置的监测信息
exports.query_fetalHeart_configure_data=function(){
	this.postAjax("/hug-web/r/health/1015","查询病人设置的监测信息成功");
};
//远程胎监上传报告
exports.submit_fetalHeart_report=function(){
	var query ='';
	_t=this;
	this.req.addListener('data', function(data){
		query += data;
	}).addListener('end', function(){
		_t.postAjax("/hug-web/r/health/1010","远程胎监上传报告成功",query);
	});
};
//跳转到患者档案-健康监测-胎心页面
exports.to_fetalHeart_page=function(){
	this.render('../../web-bin/interview/followup/healthMonitor/fetalHeart.html');
};
//跳转到患者档案-健康监测-血压页面
exports.to_bloodPressure_page=function(){
	this.render('../../web-bin/interview/followup/healthMonitor/bloodPressure.html');
};
//跳转到患者档案-健康监测-血糖页面
exports.to_bloodGlucose_page=function(){
	this.render('../../web-bin/interview/followup/healthMonitor/bloodGlucose.html');
};
//跳转到患者档案-健康监测-体温页面
exports.to_temperature_page=function(){
	this.render('../../web-bin/interview/followup/healthMonitor/temperature.html');
};
//跳转到患者档案-健康监测-心率页面
exports.to_heartRate_page=function(){
	this.render('../../web-bin/interview/followup/healthMonitor/heartRate.html');
};
//跳转到患者档案-健康监测-体重页面
exports.to_weight_page=function(){
	this.render('../../web-bin/interview/followup/healthMonitor/weight.html');
};
//患者档案-健康监测，根据type，获取健康数据
exports.query_health_data_by_type=function(){
	this.postAjax("/hug-web/r/health/1004","查询某一类健康的分页数据成功");
};
//查询健康报告（包括处理意见）
exports.query_report_data=function(){
	this.postAjax("/hug-web/r/health/1013","查询健康报告数据成功");
};
//跳转到健康监测处理结果查看页面
exports.to_showHandle_page=function(){
	this.render('../../web-bin/interview/followup/healthMonitor/showHandle.html');
};
//跳转到设置胎心监测服务次数页面
exports.to_setFrequency_page=function(){
	this.render('../../web-bin/interview/followup/healthMonitor/setFrequency.html');
};
//上传胎心监测服务次数设置结果
exports.submit_fetalHeart_configure_data=function(){
	var query ='';
	_t=this;
	this.req.addListener('data', function(data){
		query += data;
	}).addListener('end', function(){
		_t.postAjax("/hug-web/r/health/1009","上传胎心监测服务次数设置结果成功",query);
	});
};
//跳转到胎监待处理页面----随访2.0
exports.to_fetalHeartHandleList2_page=function(){
    this.render('../../web-bin/interview/followup/healthMonitor/fetalHeartHandleList2.html');
};
//跳转到胎监用户中心----随访2.0
exports.to_fetalHeartUserList_page=function(){
    this.render('../../web-bin/interview/followup/healthMonitor/fetalHeartUserList.html');
};
//分页查询用户中心数据----随访2.0
exports.query_fetalHeartUserList_data=function(){
    this.postAjax("/hug-web/r/health/1017","查询胎监用户中心--随访2.0");
};
//查询健康报告列表数据----随访2.0
exports.query_healthReportList_data=function(){
    this.postAjax("/hug-web/r/health/1018","查询健康报告列表--随访2.0");
};
//胎监管理-用户中心-添加用户---随访2.0
exports.to_addFetalUser_page=function(){
    this.render('../../web-bin/interview/followup/healthMonitor/addFetalUser.html');
};





