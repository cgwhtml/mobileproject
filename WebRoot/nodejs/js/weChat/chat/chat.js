/*
 * @author fjl
 * @date 20161026
 */
var qs = require('querystring'),
	url=require('url');
exports.to_index_page = function(){
	this.render('../../web-bin/weChat/chat/index.html');
};
exports.to_information_page = function(){
	this.render('../../web-bin/weChat/chat/information.html');
};
exports.to_content_page = function(){
	this.render('../../web-bin/weChat/chat/content.html');
};
exports.to_healthEdu_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/queAndEdu/healthEducation.html');
};
exports.to_followupQues_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/queAndEdu/followUpQues.html');
};
exports.next_step_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/user/1007","下一步操作成功",query);
};
exports.query_information_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/user/1009","获取信息成功",query);
};
exports.submit_information_data=function(){
	var query ='';
	_t=this;
	this.req.addListener('data', function(data){
		query += data;
	}).addListener('end', function(){
		var querys=eval('(' + query + ')');
		var headers={
	       	'partnerType':'7',
	       	'usId':querys.usId,
	       	'accessToken':querys.accessToken,
	       	'Content-Type':'application/json;charset=utf-8',
		};
		_t.postAjax("/hug-web/r/user/1008","提交成功",query,headers,null);
	});
};
exports.get_code_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/sms/1000","获取验证码成功",query);
};
exports.query_education_data=function(){
	var query = url.parse(this.req.url).query;
	var _url="http://www.lanniuh.com:8080";
	this.getAjax("/Hug/index.html","获取宣教问卷成功",query,null,_url);
};
//获取宣教问卷新接口
exports.query_education_newdata=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/quest/1008","患者查询收到的宣教问卷成功",query);
};



