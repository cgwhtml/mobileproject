/**
 * @author xyz
 * @date 20170822
 */
var qs = require('querystring'),
	url=require('url');
//跳转到健康监测tab切换页
exports.to_healthMonitorTitle_page = function(){
	this.render('../../web-bin/interview/followup/healthMonitor2/healthMonitorTitle.html');
};
//获取健康监测数量统计
exports.query_healthMonitorSum_data=function(){
    this.postAjax("/hug-web/r/health/1034","获取健康监测2.0数量统计");
};
//跳转到健康监测异常未处理列表页面
exports.to_healthMonitorErrorList_page = function(){
    this.render('../../web-bin/interview/followup/healthMonitor2/healthMonitorErrorList.html');
};
//跳转到健康监测异常已处理列表页面
exports.to_healthMonitorFinishList_page = function(){
    this.render('../../web-bin/interview/followup/healthMonitor2/healthMonitorFinishList.html');
};
//加载健康监测异常列表数据(包括未处理异常)
exports.query_healthMonitorErrorList_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    if(query.name){
        query.name=unescape(query.name);
    }
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/health/1031","获取健康监测2.0异常列表",query);
};
//跳转到全部监测列表页面
exports.to_healthMonitorAllList_page = function(){
    this.render('../../web-bin/interview/followup/healthMonitor2/healthMonitorAllList.html');
};
//加载健康监测2.0全部数据
exports.query_healthMonitorAllList_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    if(query.name){
        query.name=unescape(query.name);
    }
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/health/1030","获取健康监测2.0全部数据",query);
};
//跳转到患者档案-健康监测2.0-胎心页面
exports.to_fetalHeart_page=function(){
    this.render('../../web-bin/interview/followup/healthMonitor2/fetalHeart.html');
};
//跳转到患者档案-健康监测2.0-血压页面
exports.to_bloodPressure_page=function(){
    this.render('../../web-bin/interview/followup/healthMonitor2/bloodPressure.html');
};
//跳转到患者档案-健康监测2.0-血糖页面
exports.to_bloodGlucose_page=function(){
    this.render('../../web-bin/interview/followup/healthMonitor2/bloodGlucose.html');
};
//跳转到患者档案-健康监测2.0-体温页面
exports.to_temperature_page=function(){
    this.render('../../web-bin/interview/followup/healthMonitor2/temperature.html');
};
//跳转到患者档案-健康监测2.0-心率页面
exports.to_heartRate_page=function(){
    this.render('../../web-bin/interview/followup/healthMonitor2/heartRate.html');
};
//跳转到患者档案-健康监测2.0-体重页面
exports.to_weight_page=function(){
    this.render('../../web-bin/interview/followup/healthMonitor2/weight.html');
};
//跳转到患者档案-健康监测2.0-心电页面
exports.to_electrocardio_page=function(){
    this.render('../../web-bin/interview/followup/healthMonitor2/electrocardio.html');
};
//患者档案-健康监测2.0，根据type，获取健康数据
exports.query_health_data_by_type=function(){
    this.postAjax("/hug-web/r/health/1032","获取患者某一类健康2.0的分页数据");
};