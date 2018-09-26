/*
 * @author cgw
 * @date 2017-03-30
 */
var qs = require('querystring'),
    url=require('url');
//跳转医患聊天页面
exports.to_chatClass_page = function(){
    this.render('../../web-bin/interview/followup/chat/chatClass.html');
};
exports.to_doctorPatient_page = function(){
    this.render('../../web-bin/interview/followup/chat/doctorPatient.html');
};
//根据sourceId查询用户信息
exports.query_sourceId_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/user/1028","根据sourceId查询用户信息成功",query);
};
//查询用户信息
exports.query_userData_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/user/1002","用户信息",query);
};
exports.to_patientChat_page= function(){
    this.render('../../web-bin/interview/followup/chat/patientChat.html');
};
//拉取消息列表
exports.query_list_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'10',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8',
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
        'partnerType':'10',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8',
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/IM/1004","查询聊天记录成功",query,headers,null);
};
//清空未读消息
exports.query_doing_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'10',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8',
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/IM/1003","查询消息列表成功",query,headers,null);
};
//查询收藏患者
exports.query_patient_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'10',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8',
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/collect/1002","查询收藏患者成功",query,headers,null);
};
exports.query_fans_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'10',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8',
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/follow/1002","查询粉丝成功",query,headers,null);
};
exports.query_searchFans_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'10',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8',
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/follow/1005","搜索粉丝成功",query,headers,null);
};
//发送消息
exports.query_sendText_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'10',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/chat/1000","发送信息",query,headers,null);
};
// 发送图片
exports.query_sendImg_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        var querys=eval('(' + query + ')');
        console.log(querys)
        var headers={
            'partnerType':'10',
            'usId':querys.usId,
            'accessToken':querys.accessToken,
            'Content-Type':'application/json;charset=utf-8'
        };
        this.uploadFile("/hug-web/r/chat/1001","发送图片/音频/视频",query,headers,null)
    });
};
// 与粉丝聊天
exports.query_sendPatient_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'10',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/consult/1006","查询患者权限",query,headers,null);
};
//--------------------------------医医聊天
exports.to_doctorDoc_page= function(){
    this.render('../../web-bin/interview/followup/chat/doctorDoc.html');
};
exports.to_doctorChat_page= function(){
    this.render('../../web-bin/interview/followup/chat/doctorDoc.html');
};
exports.to_addFriend_page = function(){
    this.render('../../web-bin/interview/followup/chat/addFriend.html');
};
exports.to_friendRequest_page = function(){
    this.render('../../web-bin/interview/followup/chat/friendRequest.html');
};
exports.to_revise_page = function(){
    this.render('../../web-bin/interview/followup/chat/revise.html');
};
exports.to_question_page = function(){
    this.render('../../web-bin/interview/followup/chat/question.html');
};
exports.to_questionDetail_page = function(){
    this.render('../../web-bin/interview/followup/chat/questionDetail.html');
};
//好友申请列表
exports.query_applyFriend_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'10',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/friend/1003","好友申请列表加载成功",query,headers,null);
};
//同意好友申请
exports.query_agree_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'10',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/friend/1001","同意好友申请",query,headers,null);
};
//拒绝好友申请
exports.query_refuse_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'10',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/friend/1002","拒绝好友申请",query,headers,null);
};
exports.query_friend_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'10',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8',
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/friend/1004","查询好友成功",query,headers,null);
};
exports.query_person_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'10',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8',
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/user/1018","搜索好友成功",query,headers,null);
};
exports.query_newFriend_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'10',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8',
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/friend/1000","发送添加好友成功",query,headers,null);
};
exports.query_yesFriend_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'10',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8',
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/friend/1000","同意好友请求",query,headers,null);
};
exports.query_noFriend_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'10',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8',
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/friend/1000","拒绝好友请求",query,headers,null);
};
exports.query_deleteFriend_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'10',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8',
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/friend/1007","删除好友成功",query,headers,null);
};
exports.query_reviseName_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'10',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8',
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/friend/1006","修改备注名成功",query,headers,null);
};
exports.to_doctorChat_page = function(){
    this.render('../../web-bin/interview/followup/chat/doctorChat.html');
};
// 聊天宣传问卷
exports.query_question_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'10',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8',
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/quest/1002","问卷列表获取成功",query,headers,null);
};
exports.query_questionContain_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'10',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8',
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/quest/1012","发送后获取问卷内容成功",query,headers,null);
};
exports.submit_question_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'10',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8',
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/quest/1004","问卷发送成功",query,headers,null);
};
//聊天宣教
exports.query_educate_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'10',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8',
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/educate/1000","宣教列表获取成功",query,headers,null);
};
exports.query_educateContain_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'10',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8',
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/educate/1002","发送后获取宣教内容成功",query,headers,null);
};
exports.submit_educate_data=function(){
    var _t=this;
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':'10',
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8',
    };
    query =JSON.stringify(query);
    _t.postAjax("/hug-web/r/educate/1003","宣教发送成功",query,headers,null);
};

