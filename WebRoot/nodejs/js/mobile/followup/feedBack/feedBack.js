/**
 * Created by CGT on 2017/10/24.
 */
var qs = require('querystring');
url=require('url');

//跳转到随访页面
exports.to_departSelect_page = function(){
    this.render('../../web-bin/mobile/followup/feedBack/departSelect.html');
};
//跳转到填写投诉表扬
exports.to_feedBackInput_page = function(){
    this.render('../../web-bin/mobile/followup/feedBack/feedBackInput.html');
};
//跳转到投诉表扬记录
exports.to_feedBackList_page = function(){
    this.render('../../web-bin/mobile/followup/feedBack/feedBackList.html');
};
//登录接口
exports.post_userLogin_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/user/1002","登录成功",query);
};
//查询科室选择
exports.get_departList_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'0',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/dept/1003","查询科室成功",query,headers,null);
};
//查询下拉框数据
exports.get_slideDown_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'0',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/complaint/1000","查询下拉框数据成功",query,headers,null);
};
//保存投诉表扬
exports.post_formInfo_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'0',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/complaint/1001","提交表单数据成功",query,headers,null);
};

//查询投诉登记列表
exports.query_feedBackList_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'0',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/complaint/1002","提交表单数据成功",query,headers,null);
};
//跳转到投诉表扬详情
exports.to_feedBackDetail_page = function(){
    this.render('../../web-bin/mobile/followup/feedBack/feedBackDetail.html');
};
//查询投诉登记详情
exports.query_feedBackDetail_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'0',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/complaint/1003","提交表单数据成功",query,headers,null);
};
//查询用户信息
exports.query_userInfo_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/user/1009","查询用户信息成功",query);
};

