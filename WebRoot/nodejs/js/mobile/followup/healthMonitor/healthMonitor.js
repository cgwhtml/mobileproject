/**
 * @author xyz
 * @date 20161026
 */
var qs = require('querystring'),
	url=require('url');
//跳转到手机端胎心查看页面
exports.to_fetalHeart_page = function(){
	this.render('../../web-bin/mobile/followup/healthMonitor/fetalHeart.html');
};
//查询某一个健康数据
exports.query_oneHealth_data=function(){
	this.postAjax("/hug-web/r/health/1007","胎心-手机端查询某一条健康数据成功");
};








