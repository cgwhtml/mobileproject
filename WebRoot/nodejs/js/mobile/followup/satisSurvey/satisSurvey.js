/**
 * Created by CGT on 2017/11/17.
 */
var qs = require('querystring');
url=require('url');
//跳转到新在院患者列表页面
exports.to_patientListNew_page = function(){
    this.render('../../web-bin/mobile/followup/satisSurvey/views/patientListNew.html');
};
//跳转到在院患者列表页面
exports.to_patientList_page = function(){
    this.render('../../web-bin/mobile/followup/satisSurvey/views/patientList.html');
};
//跳转到满意度问卷页面
exports.to_questionList_page = function(){
    this.render('../../web-bin/mobile/followup/satisSurvey/views/questionList.html');
};
//获取患者列表信息
exports.get_patientList_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':4,
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query.deptCode&&(query.deptCode=JSON.parse(query.deptCode));
    query.wardCode&&(query.wardCode=JSON.parse(query.wardCode));
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/pat/1006","获取患者列表信息成功",query,headers,null);
};
//判断医生权限
exports.query_doctor_power=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':4,
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/user/1024","获取当前医生权限",query,headers,null);
};
//登录接口
exports.post_userLogin_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/user/1002","登录成功",query);
};
//获取满意度问卷列表信息
exports.get_questionList_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':4,
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/quest/1017","获取患者列表信息成功",query,headers,null);
};
//生成满意度URL
exports.get_urlBuild_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':4,
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/quest/1018","获取患者列表信息成功",query,headers,null);
};
