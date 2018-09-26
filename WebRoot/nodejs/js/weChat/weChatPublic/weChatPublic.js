/**
 * Created by CGW on 2017/7/4.
 */
var qs = require('querystring'),
    url=require('url');
exports.to_departList_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/departSelect/departList.html');
};
exports.to_doctorList_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/doctorSelect/doctorList.html');
};
exports.to_appointment_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/appointment/appointList.html');
};
exports.to_appointConfirm_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/appointConfirm/appointConfirm.html');
};
// 微信聊天页面跳转
exports.to_myMedic_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/myMedic/medicList.html');
};
exports.to_chat_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/myMedic/weChat.html');
};
// 找医生
exports.to_findDoctor_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/findDoctor/findDoctor.html');
};
// 医生详情
exports.to_doctorMain_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/findDoctor/doctorMain.html');
};
// 微信支付页面
exports.to_buyWexin_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/myMedic/buyPage.html');
};
// 微信公众号手术信息
// 选择就诊人1页面
exports.to_selectPat_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/feeMessage/selectPat.html');
};
// 住院查询页面
exports.to_diagnoseMsg_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/feeMessage/diagnoseMsg.html');
};
// 诊断信息页面
exports.to_patientQuery_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/feeMessage/patientQuery.html');
};
// 门诊费用信息页面
exports.to_feeVisit_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/feeMessage/feeMsg.html');
};
exports.get_feeVisit_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/inhospQuery/1011","获取信息成功",query);
};
exports.get_feeVisitDetail_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/inhospQuery/1010","获取信息成功",query);
};
// 住院费用信息页面
exports.to_feeHosp_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/feeMessage/feeMsg.html');
};
exports.get_feeHosp_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/inhospQuery/1003","获取信息成功",query);
};
exports.get_feeHospDetail_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/inhospQuery/1004","获取信息成功",query);
};
// 每日详情页面
exports.to_dayDetail_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/feeMessage/dayDetail.html');
};
// 手术信息页面
exports.to_medicMsg_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/feeMessage/medicMsg.html');
};
// 手术详情页面
exports.to_medicDetail_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/feeMessage/medicDetail.html');
};
// 检查报告列表页面
exports.to_checkList_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/feeMessage/checkMsg.html');
};
// 检查报告详情页面
exports.to_checkDetail_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/feeMessage/checkDetail.html');
};
// 检验报告列表页面
exports.to_testList_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/feeMessage/testList.html');
};
// 检验报告详情页面
exports.to_testDetail_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/feeMessage/testDetail.html');
};
// 扫一扫页面
exports.to_sanCode_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/scanCode/scanCode.html');
};
// 医生主页
exports.to_doctorMainQ_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/scanCode/doctorMain.html');
};
////// 自助缴费
// 自助缴费列表页面
exports.to_selfPayList_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/selfPay/payList.html');
};
// 自助缴费主页
exports.to_selfPayMain_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/selfPay/selfPayMain.html');
};
//留言板
exports.to_feedBack_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/feedBack/feedBack.html');
};
//投诉表扬处理页面
exports.to_complaintsPraise_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/complaintsPraise/complaintsPraise.html');
};
//投诉表扬处理页面
exports.to_addComplaintsPraise_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/complaintsPraise/addComplaintsPraise.html');
};
exports.get_departList_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/dept/1000","获取信息成功",query);
};
exports.get_doctorList_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/staff/1000","获取信息成功",query);
};
exports.get_appointList_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/sch/1000","获取信息成功",query);
};
exports.get_appointDetail_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/sch/1001","获取信息成功",query);
};
//查询用户信息
exports.get_user_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/user/1009","获取信息成功",query);
};
exports.get_appointConfirm_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'7',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/reg/1000","提交成功",query,headers,null);
};
//获取预约记录
exports.get_myAppointList_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/reg/1002","获取列表成功",query);
};
exports.to_myAppointment_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/myAppointment/myAppointment.html');
};
exports.to_userBind_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/user/userBind.html');
};
exports.get_message_info=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/sms/1000","获取验证码成功",query);
};
exports.post_user_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/user/1007","新增用户成功",query);
};
exports.to_userInfoImprove_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/user/userInfoImprove.html');
};
exports.post_userInfoImprove_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/user/1012","完善用户信息成功",query);
};
exports.to_userInfo_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/user/userInfo.html');
};
//查询用户信息
exports.get_userInfo_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/user/1009","查询用户信息成功",query);
};
exports.to_addHospCard_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/user/userAddHospCard.html');
};
//添加就诊卡
exports.post_addHospCard_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'7',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/medicalCard/1001","添加就诊卡成功",query,headers,null);
};
//跳转至医疗记录
exports.to_medicalRecordList_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/medicalRecord/medicalRecordList.html');
};
//加载医疗列表
exports.query_medicalRecordList_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/medical/1041","patient医疗列表获取成功",query);
};
//caseNo加载医疗列表
exports.query_caseNoMedicalRecordList_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/medical/1053","带caseNo的patient医疗列表获取成功",query);
};
//跳转至门诊列表
exports.to_visit_case_page = function(){
    this.render('../../mobile/medical/patient/visit_case.html');
};
//跳转至住院列表
exports.to_hosp_case_page = function(){
    this.render('../../mobile/medical/patient/hosp_case.html');
};
//跳转至用户就诊卡列表
exports.to_userHospCardList_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/medicalRecord/userHospCardList.html');
};
//取消预约
exports.post_appointCancel_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'7',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/reg/1001","取消预约成功",query,headers,null);
};
//查询医院名字
exports.query_hospName_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/hos/1008","获取医院名称成功",query);
};
//微信解绑
exports.post_unbindWeChat_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/user/1038","微信解除绑定",query);
};
//跳转至成员管理
exports.to_memberList_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/memberManage/memberList.html');
};
//查询成员列表
exports.query_familyList_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/family/1002","获取成员列表成功",query);
};
//查询成员就诊卡
exports.get_userCard_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/medicalCard/1000","查询成员就诊卡成功",query);
};
//新增成员
exports.post_addFamilyMember_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/family/1000","新增成员成功",query);
};
//删除成员
exports.post_deleteFamilyMember_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/family/1001","删除成员成功",query);
};
//跳转至成员信息
exports.to_memberInfo_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/memberManage/memberInfo.html');
};
//跳转至成员选择
exports.to_memberSwitch_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/memberManage/memberSwitch.html');
};
// 医护聊天
//查询用户信息
exports.query_userMsg_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/user/1025","用户信息",query);
};
// 拉取医护列表
exports.query_doctor_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'7',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/follow/1002","查询医护列表成功",query,headers,null);
};
//拉取消息列表
exports.query_list_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'7',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/IM/1001","查询消息列表成功",query,headers,null);
};

//查询聊天记录
exports.query_msg_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'7',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8',
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/IM/1004","查询聊天记录成功",query,headers,null);
};
// 查询患者权限
exports.query_sendPatient_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'7',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/chat/1002","查询患者权限",query,headers,null);
};
//清空未读消息
exports.query_doing_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'7',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8',
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/IM/1003","查询消息列表成功",query,headers,null);
};
//发送消息
exports.query_sendText_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'7',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/chat/1000","发送信息",query,headers,null);
};
//找医生列表
exports.query_doctorList_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'7',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/user/1023","找医生列表成功",query,headers,null);
};
//医生详情
exports.query_doctorMain_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'7',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/user/1019","医生详情成功",query,headers,null);
};
//关注医生
exports.query_followDoc_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'7',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/follow/1000","关注医生成功",query,headers,null);
};
//取消关注
exports.query_nofollowDoc_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'7',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/follow/1004","取消关注医生成功",query,headers,null);
};
// 获取微信鉴权信息
exports.query_chatPay_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/wechat/1000","获取微信鉴权信息成功",query);
};
// 微信支付
exports.query_payPage_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/order/1006","调取微信支付页面成功",query);
};
//有卡无卡预约
exports.query_isCardRequired_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/param/1000","查询有无卡预约成功",query);
};
//跳转至就诊卡选择
exports.to_hospCardSwitch_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/appointConfirm/hospCardSwitch.html');
};
//跳转至重点科室用户
exports.to_importantDept_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/importantDept/importantDept.html');
};
//跳转至医院介绍
exports.to_deptDsc_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/importantDept/deptDsc.html');
};
//重点科室用户
exports.query_importantDept_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'7',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/user/1035","取消关注医生成功",query,headers,null);
};
// 查询用户带关系
exports.query_flowDocClick_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'7',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/follow/1007","关注医生成功",query,headers,null);
};
// 微信公众号手术
exports.get_inHosQuery_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'7',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/inhospQuery/1009","查询患者住院查询",query,headers,null);
};
// 手术列表
exports.get_medicList_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'7',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/inhospQuery/1001","手术列表查询",query,headers,null);
};
// 手术列表
exports.get_medicDetail_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'7',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/inhospQuery/1002","手术信息查询",query,headers,null);
};
// 手术列表
exports.get_checkList_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'7',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/inhospQuery/1005","检查报告列表查询",query,headers,null);
};
// 手术列表
exports.get_testList_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'7',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/inhospQuery/1007","检验报告列表查询",query,headers,null);
};
// 检查详情
exports.get_checkDetail_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'7',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/inhospQuery/1006","检查报告详情查询",query,headers,null);
};
// 检验详情
exports.get_testDetail_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'7',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/inhospQuery/1008","检验报告详情查询",query,headers,null);
};
//查询用户信息
exports.query_docData_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/user/1025","获取用户信息成功",query);
};
//查询医生分组并判断自己是否在分组里
exports.query_docGroup_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'7',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/collect/1011","获取医生分组成功",query,headers,null);
};
//收藏患者
exports.query_collectGroup_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'7',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query.groupIds&&(query.groupIds=JSON.parse(query.groupIds));
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/collect/1012","收藏患者成功",query,headers,null);
};
// 自主缴费
//收藏患者
exports.query_selfPayList_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'7',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query.groupIds&&(query.groupIds=JSON.parse(query.groupIds));
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/payment/1000","自主缴费单列表",query,headers,null);
};
//收藏患者
exports.query_selfPayMain_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'7',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query.groupIds&&(query.groupIds=JSON.parse(query.groupIds));
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/payment/1001","自主缴费单",query,headers,null);
};

// 获取ql列表
exports.query_qaList_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/qa/1000","获取qa列表",query);
};

exports.to_qaList_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/qa/qaList.html');
};

exports.to_chronicDiseaseRecruit_page = function(){
    this.render('../../web-bin/weChat/weChatPublic/views/indicatorPage/chronicDiseaseRecruit.html');
};
// 留言板反馈类型
exports.query_suggestType_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/suggestion/1001","反馈类型查询",query);
};
// 留言板意见提交
exports.query_suggestSubmit_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'7',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/suggestion/1002","反馈意见提交",query,headers,null);
};
//投诉表扬
// 投诉表扬查询
exports.query_complaintsPraise_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/complaint/1005","投诉表扬查询",query);
};
//新增投诉表扬
exports.query_addComplaintsPraise_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/complaint/1004","新增投诉表扬",query);
};
exports.query_fileDownloadPraise_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/complaint/1007","投诉表扬文件下载",query);
};