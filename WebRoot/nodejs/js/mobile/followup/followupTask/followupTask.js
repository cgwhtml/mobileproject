/**
 * Created by huang on 2017/7/25.
 */
var qs = require('querystring');
url=require('url');
var config = require('../../../config');
var log_url=config.hugPageConfigObj.log_url;

//跳转到随访页面
exports.to_followUp_page = function(){
    this.render('../../web-bin/mobile/followup/followupTask/followUp.html');
    console.log("进入时间"+new Date());
};

//跳转到已完成随访页面
exports.to_finishFollow_page = function(){
    this.render('../../web-bin/mobile/followup/followupTask/finishFollow.html');
};

//跳转到宣教页面
exports.to_education_page = function(){
    this.render('../../web-bin/mobile/followup/followupTask/education.html');
};

//跳转到处理随访任务页面
exports.to_processingFollowupTask_page = function(){
    this.render('../../web-bin/mobile/followup/followupTask/processingFollowupTask.html');
};

//跳转到查看随访任务页面
exports.to_checkFollowupTask_page = function(){
    this.render('../../web-bin/mobile/followup/followupTask/checkFollowupTask.html');
};

//跳转到随访计划详情页面
exports.to_followupPlanDetail_page = function(){
    this.render('../../web-bin/mobile/followup/followupTask/followupPlanDetail.html');
};

//跳转到结案页面
exports.to_closeCase_page = function(){
    this.render('../../web-bin/mobile/followup/followupTask/closeCase.html');
};

//查询随访数据
exports.query_followUp_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':query.partnerType,
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/followUp/1001","获取当日随访任务列表",query,headers,null);
};
//判断医生权限
exports.query_doctor_power=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'11',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/user/1024","获取当前医生权限",query,headers,null);
};

//获取在院患者列表
exports.query_inHosp_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'11',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query.deptCode&&(query.deptCode=JSON.parse(query.deptCode));
    query.wardCode&&(query.wardCode=JSON.parse(query.wardCode));
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/pat/1002","获取在院患者列表",query,headers,null);
};

//查询随访表单状态
exports.query_formExcpStatus_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'11',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/followUp/1003","获取随访内容状态",query,headers,null);
};

//发送表单
exports.send_form_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'11',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/followUp/1004","发送表单",query,headers,null);
};

//点击完成
exports.submit_followup_task=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'11',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/followUp/1005","提交随访任务",query,headers,null);
};

//查看问卷
exports.query_questionNaire_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'11',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/quest/1015","查看问卷",query,headers,null);
};

//查看随访任务
exports.query_followupTask_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'11',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/followUp/1007","查看随访任务",query,headers,null);
};

//提交结案
exports.submit_closeCase_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'11',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/followUp/1008","提交结案",query,headers,null);
};

// 跳转到医疗档案
exports.to_medicalRecordList_page = function(){
    this.render('../../web-bin/mobile/followup/followupTask/medicalRecordList.html');
};
//根据卡号刷新医疗数据
exports.get_medicalRecordList_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'11',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/medical/1033","获取医疗数据列表",query,headers,null);
};
// 跳转到宣教详情
exports.to_educationDetail_page = function(){
    this.render('../../web-bin/mobile/followup/followupTask/educationDetail.html');
};
//查询宣教列表
exports.get_educationDetail_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'11',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/quest/1007","获取宣教数据列表",query,headers,null);
};
// 查病人手机号
exports.get_patientPhone_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'11',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/quest/1009","获取病人手机号",query,headers,null);
};
// 跳转到医疗档案
exports.to_educationSelect_page = function(){
    this.render('../../web-bin/mobile/followup/followupTask/educationSelect.html');
};
// 查宣教列表
exports.get_educationList_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'11',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/educate/1000","获取宣教列表",query,headers,null);
};
//发送宣教
exports.post_educationList_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    console.log(query);
    var headers={
        'partnerType':'11',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    console.log(query.idList);
    query.idList&&(query.idList=JSON.parse(query.idList));
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/educate/1004","发送宣教列表",query,headers,null);
};
// 发短信
exports.get_message_info=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/sms/1000","获取验证码成功",query);
};
//获取钉钉权限
exports.get_ddAcess_info=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var id=query.id;
    console.log(123);
    console.log(id);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/info/sign/"+id,"获取钉钉信息成功",query);
};
//判断是否绑定钉钉
exports.get_ddBind_info=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/user/1030","判断是否绑定钉钉",query);
};
//创建绑定用户
exports.post_ddCreate_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/user/1029","创建绑定用户",query);
};
//查询用户是否有随访账号
exports.get_user_info=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/user/1006","查询用户信息",query);
};
//钉钉登录
exports.get_ddLogin_info=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/user/1031","钉钉登录",query);
};
// 钉钉config
exports.get_ddConfig_info=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/dingtalk/1000","钉钉config成功",query);
};
//跳转到test页面
exports.to_phoneTest_page = function(){
    this.render('../../web-bin/mobile/followup/followupTask/test.html');
    console.log("进入时间"+new Date());
};
//跳转到查看随访任务页面
exports.to_skipFirst_page = function(){
    this.render('../../web-bin/mobile/followup/followupTask/skipFirst.html');
};
// 跳转到个人绑定
exports.to_bindAccount_page = function(){
    this.render('../../web-bin/mobile/followup/followupTask/bindAccount.html');
};
//绑定随访
exports.post_bindFollowUp_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    console.log(query);
    var headers={
        'partnerType':'11',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    console.log(query.idList);
    query.idList&&(query.idList=JSON.parse(query.idList));
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/user/1011","绑定随访",query,headers,null);
};
//解除绑定
exports.post_unbindFollowUp_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    console.log(query);
    var headers={
        'partnerType':'11',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    console.log(query.idList);
    query.idList&&(query.idList=JSON.parse(query.idList));
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/user/1016","解除绑定随访",query,headers,null);
};
//查询用户信息
exports.query_userInfo_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    console.log(query);
    var headers={
        'partnerType':'11',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    console.log(query.idList);
    query.idList&&(query.idList=JSON.parse(query.idList));
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/user/1025","发送宣教列表",query,headers,null);
};
//钉钉解除绑定
exports.post_ddUnbind_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/user/1037","解绑钉钉用户",query);
};
//点击日志
exports.query_beginLog_info=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    console.log(11111);
    this.postAjax("logs/1000","点击日志",query,null,log_url);
};
//随访日志
exports.query_followupLog_info=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("logs/1002","随访日志",query,null,log_url);
};
//宣教日志
exports.query_educationLog_info=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("logs/1001","宣教日志",query,null,log_url);
};
