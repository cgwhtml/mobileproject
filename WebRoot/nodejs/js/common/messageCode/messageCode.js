/**
 * Created by Jialiang Fei
 * Created time 2018/3/19 14:36
 * Description
 */
var qs = require('querystring'),
    url=require('url');
/* 获取验证码 请求参数phone,smsType(0创建用户1修改密码2提现3修改手机号4快速认证验证码5注册登录)  返回参数res(0成功 其它失败),msg(res非0有值) */
exports.send_messageCode_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/sms/1000","获取验证码成功",query);
};
/* 校验验证码 请求参数phone,vCode  返回参数res(0成功 其它失败),msg(res非0有值) */
// 单纯验证校验码时要加获取时的参数smsType
exports.test_messageCode_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/sms/1001","校验验证码成功",query);
};