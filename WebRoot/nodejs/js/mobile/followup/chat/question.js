/*
 * @author fjl
 * @date 20161026
 */
var qs = require('querystring'),
	url=require('url');
exports.to_question_page = function(){
	this.render('../../web-bin/mobile/followup/chat/question.html');
};
exports.query_question_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/quest/1000","问卷列表获取成功",query);
};
exports.submit_question_data=function(){
	var query ='';
	_t=this;
	this.req.addListener('data', function(data){
		query += data;
	}).addListener('end', function(){
		_t.postAjax("/hug-web/r/quest/1001","问卷提交成功",query);
	});
};