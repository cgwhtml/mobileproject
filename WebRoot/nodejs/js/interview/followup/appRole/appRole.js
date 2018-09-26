/**
 * Created by 风殇 on 2018/1/2.
 */
var qs = require('querystring'),
    url=require('url');
//跳转app角色管理页面
exports.to_appRoleList_page = function(){
    this.render('../../web-bin/interview/followup/appRole/roleList.html');
};
// 查询所有角色
exports.query_allRole_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/role/1004","查询所有角色成功",query);
};




