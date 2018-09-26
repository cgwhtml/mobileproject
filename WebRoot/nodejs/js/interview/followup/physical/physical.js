/**
 * @author xyz
 * @date 20161024
 */
var qs = require('querystring');
//跳转到体检预约列表页面（包括已处理和未处理）
exports.to_physicalExamList_page = function(){
	this.render('../../web-bin/interview/followup/physical/physicalExamList.html');
};
//加载体检预约列表数据
exports.query_physicalExamList_data=function(){
	this.getAjax("/hug-web/r/examReg/1000","体检预约列表获取成功");
};
//跳转到体检预约处理页面
exports.to_physicalHandle_page=function(){
	this.render('../../web-bin/interview/followup/physical/handle.html');
};
//提交体检预约处理结果
exports.submit_physicalHandle_data=function(){
	var query ='';
	_t=this;
	this.req.addListener('data', function(data){
		query += data;
	}).addListener('end', function(){
		query = qs.parse(query);
		query=JSON.stringify(query);
		_t.postAjax("/hug-web/r/examReg/1001","体检预约处理成功",query);
	});
};
