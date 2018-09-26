/**
 * Created by huang on 2017/8/1.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var SERVER_URL=window.HUGPAGE_CONFIG.SERVER_URL;
var query=getRequest();//方法在config配置文件中
var url=location.href;
var revisitExcp=0;
var code;
var agentId=query.agentId;
var corpId=query.opt_corpId;
var formArr=query.form.split(",");
var appId=sessionStorage.getItem("skipNum");
var hgId=query.hgId;
$(function(){
    //禁止iPhone的缩放，弹性滚动
    window.onload=function () {
        document.addEventListener('touchstart',function (event) {
            if(event.touches.length>1){
                event.preventDefault();
            }
        });
        var lastTouchEnd=0;
        document.addEventListener('touchend',function (event) {
            var now=(new Date()).getTime();
            if(now-lastTouchEnd<=300){
                event.preventDefault();
            }
            lastTouchEnd=now;
        },false);
        document.body.addEventListener('touchmove', function (event) {
            event.preventDefault();
        }, false);
    };
    $("#followup_record").niceScroll({
        railpadding : {top : 0,right : 0,left : 0,bottom : 0}
    });
    $("#hospCode").val(query.hospCode);
    $(".inHosNo").val(query.inHosNo);
    $(".visitCardNo").val(query.visitCardNo);
    $(".name").text(decodeURIComponent(query.name));
    $(".sex").text(decodeURIComponent(query.sex));
    $(".age").text(decodeURIComponent(query.age));
    if($(".base_info .sex").text()=="女"){
        $(this).siblings(".per_img").find("img").attr("src","/web-bin/resources/images/woman.png");
    }
    //开关
    var $div2=$("#div2");
    var $div1=$("#div1");
    $div2.click(function () {
        if($div1.attr("class")=="close1"){
            $div1.attr("class","open1");
            revisitExcp=1;
        }else {
            $div1.attr("class","close1");
            revisitExcp=0;
        }
        if($div2.attr("class")=="close2"){
            $div2.attr("class","open2");
        }else {
            $div2.attr("class","close2");
        }
    });

    $.ajax({
        on: true,
        timeout:60000,
        type:"get",
        url: LOCALHOST_URL+'/web-bin/m/followup/followupTask/query_formExcpStatus_data?eachDate='+query.eachDate+'&usId='+query.usId+'&accessToken='+query.accessToken+'&id='+query.id,
        dataType:"json",
        success: function(data){
            console.log(data);
            // alert(JSON.stringify(data));
            for(var i=0;i<formArr.length;i++){
                console.log(decodeURI(formArr[i]));
                $(".list").append("<div class='list_form' style='padding-left:10px;'>《"+decodeURI(formArr[i])+"》<i class='arrow' style='width:10px;height:20px;position:absolute;top:15px;right:30px;'></i></div>");
            }
            if(data.data&&data.res==0){
                callBack(data);
            }
        }
    });

    //发送表单
    $(".send").click(function () {
        dd.ready(function(){
            dd.device.notification.confirm({
                message: "确认发送吗?",
                title: "提示",
                buttonLabels: ['取消', '确定'],
                onSuccess : function(result) {
                    if(result.buttonIndex==1){
                        if(hgId=="LN12199218"){
                            $.toast("发送成功");
                            return;
                        }
                        $.ajax({
                            on: true,
                            timeout:60000,
                            type:"get",
                            url: LOCALHOST_URL+'/web-bin/m/followup/followupTask/send_form_data?eachDate='+query.eachDate+'&usId='+query.usId+'&accessToken='+query.accessToken+'&id='+query.id,
                            dataType:"json",
                            success: function(data){
                                console.log(data);
                                if(data.res == 0){
                                    $.toast("演示拨打成功");
                                }
                            }
                        });
                    }
                },
                onFail : function(err) {}
            });
        });
    });

    //查询问卷
    $(".list").on("click",".list_form",function () {
        console.log(222);
        var questionnaireId=$(this).find(".questionnaireId").val();
        $.ajax({
            type:"get",
            url: LOCALHOST_URL+'/web-bin/m/followup/followupTask/query_questionNaire_data?usId='+query.usId+'&accessToken='+query.accessToken+'&relationId='+query.id+'&questionnaireId='+questionnaireId,
            dataType:"json",
            success: function(data){
                console.log(data);
                if(data.res==0){
                    if(data.data && data.data.id){
                        location.href = LOCALHOST_URL+'/web-bin/m/nosen/oneparam/followup/form/to_replyForm_page/'+data.data.id+'?&noJuge=1';
                    }else {
                        location.href = LOCALHOST_URL+'/web-bin/m/nosen/followup/form/to_checkForm_page?id='+questionnaireId+'&hugId='+query.hgId;
                    }
                }
            }
        });
    });


    //完成
    $(".submit").click(function () {
        // var skipNum;
        // dd.util.domainStorage.getItem({
        //     name:"skipNum",
        //     onSuccess : function(info) {
        //         value: skipNum; // 获取存储的信息
        //         skipNum=info.value;
        //         // alert("token_fromType="+fromType);
        //     },
        //     onFail : function(err) {
        //         alert("first_error:"+JSON.stringify(err));
        //     }
        // });
        var handlingOpinion=$("#followup_record").val();
        if(handlingOpinion==""){
            alert("请填写随访记录！")
        }else{
            var result='&handlingOpinion='+handlingOpinion+'&revisitExcp='+revisitExcp;
            console.log(result);
            $.ajax({
                on: true,
                timeout:60000,
                type:"get",
                url: LOCALHOST_URL+'/web-bin/m/followup/followupTask/submit_followup_task?eachDate='+query.eachDate+'&usId='+query.usId+'&accessToken='+query.accessToken+'&id='+query.id+result,
                dataType:"json",
                success: function(data){
                    console.log(data);
                    if(data.res == 0){
                        //history.go(-1);
                        // location.href = LOCALHOST_URL+'/web-bin/m/followup/followupTask/to_followUp_page?eachDate='+query.eachDate+'&usId='+query.usId+'&accessToken='+query.accessToken+"&corpId="+corpId+"&agentId="+agentId;
                        location.href = SERVER_URL+'/hug-web/c/user/'+appId+'/1004?corpid='+corpId;
                    }
                }
            });
        }
    });
    //跳转到医疗档案
    $(".base_info").click(function () {
        var name=$(this).find(".name").text();
        var sex=$(this).find(".sex").text();
        var age=$(this).find(".age").text();
        var hospCode=$("#hospCode").val();
        console.log(hospCode);
        var inHosNo=$(this).find(".inHosNo").val();
        var visitCardNo=$(this).find(".visitCardNo").val();
        var result="&name="+name+"&sex="+sex+"&age="+age;
        location.href = LOCALHOST_URL+'/web-bin/m/followup/followupTask/to_medicalRecordList_page?hospCode='+hospCode+'&usId='+query.usId+'&accessToken='+query.accessToken+'&inHosNo='+inHosNo+'&visitCardNo='+visitCardNo+result;
    });
    // //检测
    // $("#followup_record").val(url);
    //打电话
    $(".tel").click(function () {
        dd.ready(function(){
            dd.device.notification.confirm({
                message: '拨打电话'+query.mobileNo+'进行电话随访',
                title: "电话随访",
                buttonLabels: ['取消', '确定'],
                onSuccess : function(result) {
                    if(result.buttonIndex==1){
                        // alert("请求地址="+LOCALHOST_URL+'/web-bin/m/followup/followupTask/get_ddConfig_info?corpId='+corpId+'&url='+encodeURIComponent(url));
                        if(hgId=="LN12199218"){
                            dd.device.notification.actionSheet({
                                title: "拨打电话", //标题
                                cancelButton: '取消', //取消按钮文本
                                otherButtons: ["普通电话","钉钉智能办公电话"],
                                onSuccess : function(result) {
                                    if(result.buttonIndex==0){
                                        $.toast("演示拨打成功");
                                    }else if(result.buttonIndex==1){
                                        $.toast("演示拨打成功");
                                    }
                                },
                                onFail : function(err) {}
                            });
                            return;
                        }
                        $.ajax({
                            on: true,
                            timeout:60000,
                            type:"get",
                            url:LOCALHOST_URL+'/web-bin/m/followup/followupTask/get_ddConfig_info?corpId='+corpId+'&url='+encodeURIComponent(url)+"&appId="+appId,
                            dataType:"json",
                            success: function(data){
                                console.log(data);
                                // alert(JSON.stringify(data));
                                if(data.data&&data.res==0){
                                    dd.config({                                                          //实现验证
                                        agentId : agentId,
                                        corpId : corpId,
                                        timeStamp : data.data.timestamp,
                                        nonceStr :data.data.noncestr,
                                        signature : data.data.signature,
                                        jsApiList : [
                                            'runtime.info',
                                            'biz.contact.choose',
                                            'device.notification.confirm',
                                            'device.notification.alert',
                                            'device.notification.prompt',
                                            'biz.ding.post',
                                            'biz.util.openLink',
                                            'biz.telephone.showCallMenu',
                                            'biz.telephone.checkBizCall',
                                            'biz.telephone.quickCallList'
                                        ]
                                    });
                                    dd.ready(function() {
                                        dd.runtime.permission.requestAuthCode({
                                            corpId :corpId,
                                            onSuccess : function(info) {//成功获得code值,code值在info中
                                                code=info.code;
                                                // alert('authcode: ' + info.code);
                                                if(code&&corpId){
                                                    // alert('corpId='+corpId);
                                                    //打电话
                                                    dd.biz.telephone.checkBizCall({
                                                        corpId:corpId,
                                                        onSuccess:function(result){
                                                            // alert(JSON.stringify(result));
                                                            if(result==1){
                                                                dd.biz.telephone.quickCallList({
                                                                    title:"呼叫"+query.mobileNo,
                                                                    content:"推荐使用办公电话，员工免费",
                                                                    phoneNumber:query.mobileNo,
                                                                    typeList:[3,7],
                                                                    onSuccess:function(result){

                                                                    },
                                                                    onFail:function(err){
                                                                        alert('err1='+err);
                                                                    }
                                                                });
                                                            }else{
                                                                dd.biz.telephone.quickCallList({
                                                                    title:"呼叫"+query.mobileNo,
                                                                    content:"使用普通电话",
                                                                    phoneNumber:query.mobileNo,
                                                                    typeList:[3],
                                                                    onSuccess:function(result){

                                                                    },
                                                                    onFail:function(err){
                                                                        alert('err2='+err);
                                                                    }
                                                                });
                                                            }
                                                        },
                                                        onFail:function(err){
                                                            dd.device.notification.confirm({
                                                                message: "当前版本办公电话未开放，请使用普通电话",
                                                                title: "提示",
                                                                buttonLabels: ['取消', '确定'],
                                                                onSuccess : function(result) {
                                                                    if(result.buttonIndex==1){
                                                                        dd.biz.telephone.showCallMenu({
                                                                            phoneNumber: query.mobileNo, // 期望拨打的电话号码
                                                                            code: '+86', // 国家代号，中国是+86
                                                                            showDingCall: false, // 是否显示钉钉电话
                                                                            onSuccess: function () {
                                                                                // alert("打电话成功");
                                                                            },
                                                                            onFail: function (data) {
                                                                                alert("打电话失败"+JSON.stringify(data));
                                                                            }
                                                                        });
                                                                    }
                                                                },
                                                                onFail : function(err) {}
                                                            });
                                                        }
                                                    });
                                                }
                                            },
                                            onFail : function(err) {                                                       //获得code值失败
                                                console.log('fail: ' + JSON.stringify(err));
                                            }
                                        });
                                    });
                                    /*
                                     *在dd.config函数验证没有通过下执行这个函数
                                     */
                                    dd.error(function(err){
                                        alert('dd error: ' + JSON.stringify(err));
                                    });
                                }else{
                                    alert("ajax失败"+data.msg);
                                }
                            }
                        });
                    }
                },
                onFail : function(err) {}
            });
        });
    });
});

function callBack(data){
    if(data.data && data.data.length>0){
        for(var i=0;i<data.data.length;i++){
            if(data.data[i].formExcpStatus == 1){
                $(".list .list_form").eq(i).append('<span class="red">异</span></span><input class="questionnaireId" type="hidden" value="'+data.data[i].formSingleId+'">');
            }else{
                if(data.data[i].formReplyStatus == 1){
                    $(".list .list_form").eq(i).append('<span class="green">回</span><input class="questionnaireId" type="hidden" value="'+data.data[i].formSingleId+'">');
                }else{
                    $(".list .list_form").eq(i).append('<input class="questionnaireId" type="hidden" value="'+data.data[i].formSingleId+'">');
                }
            }
        }
    }
}