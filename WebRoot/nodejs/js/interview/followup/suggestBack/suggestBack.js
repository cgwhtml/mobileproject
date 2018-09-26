/**
 * Created by 风殇 on 2018/3/27.
 */
var qs = require('querystring'),
    url=require('url');
//跳转建议管理页面
exports.to_suggestList_page = function(){
    this.render('../../web-bin/interview/followup/suggestBack/suggestList.html');
};
// 查询反馈意见列表
exports.query_suggestList_data=function(){
    var query ='';
    _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        _t.postAjax("/hug-web/r/suggestion/1003","反馈意见列表显示",query);
    });
};
// 处理反馈意见
exports.query_suggestSolve_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/suggestion/1004","反馈意见处理",query);
};