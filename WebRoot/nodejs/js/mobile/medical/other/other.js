var qs = require('querystring'),
	url=require('url');
//跳转至分享页面
exports.to_share_page = function(){
	this.render('../../web-bin/mobile/medical/other/share.html');
};
//加载分享页面
exports.query_shareList_data=function(){
	var query = url.parse(this.req.url).query;
	query=qs.parse(query);
	query =JSON.stringify(query);
	this.postAjax("/hug-web/r/user/1025","share页面获取成功",query);
};