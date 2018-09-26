console.log(dd);
var LOCALHOST_URL=window.location.origin;
var SERVER_URL=window.HUGPAGE_CONFIG.SERVER_URL;
var FILE_URL=window.HUGPAGE_CONFIG.FILE_URL;
var query=getRequest();
var id=query.id;
var usId=query.usId||sessionStorage.getItem("usId");
var eachDate=query.eachDate||sessionStorage.getItem("eachDate");
var hgId=query.hgId||sessionStorage.getItem("hgId");
var accessToken=query.accessToken||sessionStorage.getItem("accessToken");
var _config=new Object();
var code;
var pageNum=1;//需要加载的页码标号
var pageSize=20;//每页的数据条数
var pageNumFollow=1;//需要加载的页码标号
var pageSizeFollow=15;
var page="&pageNum="+pageNum+"&pageSize="+pageSize;//待拼凑的url参数
var hasNextPage=true;
var deptcodes=new Array();
var deptCode="&deptCode="+deptcodes;
var fromType;
var corpId=query.corpId;
var agentId=query.agentId;
var timeStamp;
var nonceStr;
var signature;
var bindIf;
var appId=sessionStorage.getItem("skipNum");
var userId;
var time=new Date();
var year=time.getFullYear();
var month=(time.getMonth()+1)>9?time.getMonth()+1:'0'+(time.getMonth()+1);
var date=time.getDate()>9?time.getDate():'0'+time.getDate();
var followupDate=year.toString()+'-'+month.toString()+'-'+date.toString();
var queryDate="&beginDate="+followupDate+"&endDate="+followupDate;
$(function(){
    //进入日志
    $.ajax({
        on: true,
        timeout:60000,
        type:"get",
        url: LOCALHOST_URL+'/web-bin/m/followup/followupTask/query_beginLog_info?appId='+appId,
        dataType:"json",
        success: function(data){
            console.log(data||'1');
        }
    });
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
    //获取code
    if(query.id){
        $.ajax({
            on: true,
            timeout:60000,
            type:"get",
            url: LOCALHOST_URL+'/web-bin/m/followup/followupTask/get_ddAcess_info?id='+id,
            dataType:"json",
            success: function(data){
                // alert(JSON.stringify(data));
                if(data.data&&data.res==0){
                    corpId=data.data.corpid;
                    agentId=data.data.agentId;
                    corpId=data.data.corpid;
                    timeStamp=data.data.timestamp;
                    nonceStr=data.data.noncestr;
                    signature=data.data.signature;
                    _config.agentId=data.data.agentId;
                    _config.corpId=data.data.corpid;
                    _config.timeStamp=data.data.timestamp;
                    _config.nonceStr=data.data.noncestr;
                    _config.signature=data.data.signature;
                    console.log(_config);
                    dd.config({                                                          //实现验证
                        agentId : _config.agentId,
                        corpId : _config.corpId,
                        timeStamp : _config.timeStamp,
                        nonceStr : _config.nonceStr,
                        signature : _config.signature,
                        jsApiList : [
                            'runtime.info',
                            'biz.contact.choose',
                            'device.notification.confirm',
                            'device.notification.alert',
                            'device.notification.prompt',
                            'biz.ding.post',
                            'biz.util.openLink',
                            'biz.telephone.showCallMenu',
                            'util.domainStorage.setItem',
                            'util.domainStorage.getItem']
                    });

                    dd.ready(function() {
                        dd.runtime.permission.requestAuthCode({
                            corpId : _config.corpId,
                            onSuccess : function(info) {                                                   //成功获得code值,code值在info中
                                code=info.code;
                                // alert('authcode: ' + info.code);
                                if(code&&corpId){
                                    //判断钉钉是否绑定
                                    $.ajax({
                                        on: true,
                                        timeout:60000,
                                        async:false,
                                        type:"get",
                                        url: LOCALHOST_URL+'/web-bin/m/followup/followupTask/get_ddBind_info?code='+code+"&corpId="+corpId+"&appId="+appId,
                                        dataType:"json",
                                        success: function(data) {
                                            // alert(JSON.stringify(data));
                                            console.log(data);
                                            if(data.data&&data.res==0){
                                                usId=data.data.id;
                                                hgId=data.data.hgId;
                                                accessToken=data.data.accessToken;
                                                // alert(usId)
                                                // alert(accessToken)
                                                eachDate=data.time.substring(0,10);
                                                sessionStorage.setItem("usId",usId);
                                                sessionStorage.setItem("eachDate",eachDate);
                                                sessionStorage.setItem("hgId",hgId);
                                                sessionStorage.setItem("accessToken",accessToken);
                                                $.ajax({//判断是否有随访账号
                                                    on: true,
                                                    type:"get",                 url:LOCALHOST_URL+'/web-bin/m/followup/followupTask/query_userInfo_data?usId='+usId+'&accessToken='+accessToken+"&hgId="+hgId,
                                                    dataType:"json",
                                                    success: function(data){
                                                        // alert(JSON.stringify(data));
                                                        if(data.data&&data.res==0){
                                                            if(data.data.interviewUser){
                                                                bindIf=true;
                                                            }else{
                                                                bindIf=false;
                                                            }
                                                            $("#login").hide();
                                                            dd.util.domainStorage.getItem({
                                                                name:"fromType",
                                                                onSuccess : function(info) {
                                                                    value: fromType; // 获取存储的信息
                                                                    fromType=info.value;
                                                                    // alert("id_fromType="+fromType);
                                                                    if(fromType==1){
                                                                        $("#educationBox").show();
                                                                        educationShow();
                                                                        $(".followup_btn,.personal_btn").removeClass("active");
                                                                        $(".education_btn").addClass("active");
                                                                    }else if(fromType==2){
                                                                        $("#container").show();
                                                                        contentShow();
                                                                        $(".followup_btn").addClass("active");
                                                                        $(".education_btn,.personal_btn").removeClass("active");
                                                                    }else if(fromType==3){
                                                                        $("#container").show();
                                                                        contentShow();
                                                                        $(".followup_btn").addClass("active");
                                                                        $(".education_btn,.personal_btn").removeClass("active");
                                                                    }else if(fromType==4){
                                                                        $("#personal_box").show();
                                                                        personalShow();
                                                                        $(".personal_btn").addClass("active");
                                                                        $(".education_btn,.followup_btn").removeClass("active");
                                                                    }
                                                                    else{
                                                                        $("#container").show();
                                                                        contentShow();
                                                                    }
                                                                },
                                                                onFail : function(err) {
                                                                    alert("first_error:"+JSON.stringify(err));
                                                                }
                                                            });
                                                        }else{
                                                            alert(data.msg);
                                                        }
                                                    }
                                                });
                                            }else{
                                                userId=data.msg;
                                                $("#container").hide();
                                                $(".bottom").hide();
                                                $("#login").show();
                                                loginShow();

                                            }
                                        }
                                    });
                                }
                            },
                            onFail : function(err) {                                                       //获得code值失败
                                alert('fail: ' + JSON.stringify(err));
                            }
                        });
                    });
                    /*
                     *在dd.config函数验证没有通过下执行这个函数
                     */
                    dd.error(function(err){
                        alert('dd error: ' + JSON.stringify(err));
                    });
                }
            }
        });
    }else if(usId&&accessToken){
        $("#educationBox").show();
        educationShow();
        $("#login").hide();
        dd.util.domainStorage.getItem({
            name:"fromType",
            onSuccess : function(info) {
                value: fromType; // 获取存储的信息
                fromType=info.value;
                // alert("token_fromType="+fromType);
                if(fromType==1){
                    $("#educationBox").show();
                    educationShow();
                    $(".followup_btn").removeClass("active");
                    $(".education_btn").addClass("active");
                }else if(fromType==2){
                    $("#container").show();
                    contentShow();
                    $(".followup_btn").addClass("active");
                    $(".education_btn").removeClass("active");
                }else if(fromType==3){
                    $("#container").show();
                    contentShow();
                    $(".followup_btn").addClass("active");
                    $(".education_btn").removeClass("active");
                }else if(fromType==4){
                    $("#personal_box").show();
                    personalShow();
                    $(".personal_btn").addClass("active");
                    $(".education_btn,.followup_btn").removeClass("active");
                }
                else{
                    $("#container").show();
                    contentShow();
                }
            },
            onFail : function(err) {
                alert("first_error:"+JSON.stringify(err));
            }
        });
    }
    $(".search_left").click(function(){
        $(".search_body").show();
        $(".search_result_box").html("");
    });
    $(".cancle").click(function(){
        $(".search_body").hide();
        $(".searchInput").val("");
    });
    $(".filter_right").click(function(){
        $(".filter_body").show();
        $(".begin_date").val("");
        $(".ended_date").val("");
    });
    $(".cancel_filter").click(function(){
        $(".filter_body").hide();
    });
    //筛选
    $(".filter_tag").click(function(){
        $(".filter_tag_selected").removeClass("filter_tag_selected");
        $(this).addClass("filter_tag_selected");
    });
    $(".today_day").click(function(){
        var filterDate=year.toString()+'-'+month.toString()+'-'+date.toString();
        queryDate="&beginDate="+followupDate+"&endDate="+filterDate;
        $(".date_input_box input").val("");
    });
    function getBeforeDate(n) {
        var n = n;
        var d = new Date();
        var year = d.getFullYear();
        var mon = d.getMonth() + 1;
        var day = d.getDate();
        if(day <= n) {
            if(mon > 1) {
                mon = mon - 1;
            } else {
                year = year - 1;
                mon = 12;
            }
        }
        d.setDate(d.getDate() - n);
        year = d.getFullYear();
        mon = d.getMonth() + 1;
        day = d.getDate();
        filterDate = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
        return filterDate;
    }
    $(".three_day").click(function(){
        getBeforeDate(3);
        queryDate="&beginDate="+filterDate+"&endDate="+followupDate;
        $(".date_input_box div").html("点击选择日期");
    });
    $(".week_day").click(function(){
        getBeforeDate(7);
        queryDate="&beginDate="+filterDate+"&endDate="+followupDate;
        $(".date_input_box div").html("点击选择日期");
    });
    /*$(".other_day").click(function(){
        $(".begin_date").click();
    });*/
    $(".begin_date").click(function(){
        dd.biz.util.datepicker({
            format: 'yyyy-MM-dd',
            value: '2015-03-20', //默认显示日期
            onSuccess : function(result) {
                $(".begin_date").html(result.value);
            },
            onFail : function(err) {}
        })
    });
    $(".ended_date").click(function(){
        datepicker=2;
        dd.biz.util.datepicker({
            format: 'yyyy-MM-dd',
            value: '2015-03-20', //默认显示日期
            onSuccess : function(result) {
                $(".ended_date").html(result.value);
            },
            onFail : function(err) {}
        })
    });
    $(".sure_filter").click(function(){
        if($(".other_day").hasClass("filter_tag_selected")){
            if($(".begin_date").text()=="点击选择日期" || $(".ended_date").text()=="点击选择日期"){
                alert("请输入开始日期和结束日期");
                return fasle;
            }
        }
        if($(".other_day").hasClass("filter_tag_selected")){
            queryDate="&beginDate="+$(".begin_date").text()+"&endDate="+$(".ended_date").text();
        }
        $(".filter_body").hide();
        if($("#wait").hasClass("border_bottom")){
            $("#wait").click();
        }else{
            $(".finish").click();
        }
    });
    $(".exit").click(function(){//请求退出登录
        if(hgId=="LN12199218"){
            alert("该账号为演示账号,不能操作");
            return;
        }
        dd.device.notification.confirm({
            message:"确定退出该随访账号吗？",
            title: "提示",
            buttonLabels: ['取消', '确定'],
            onSuccess:function(result){
                // alert(JSON.stringify(result))
                if(result.buttonIndex==1){
                    $.ajax({
                        on: true,
                        timeout:60000,
                        type:"get",
                        url: LOCALHOST_URL+'/web-bin/m/followup/followupTask/post_ddUnbind_data?corpId='+corpId+'&hugId='+hgId,
                        dataType:"json",
                        success: function(data){
                            console.log(data);
                            // alert('corpId='+corpId);
                            // alert(hgId);
                            // alert(JSON.stringify(data));
                            if(data.res==0){
                                $("#container,#educationBox,#personal_box").hide();
                                $(".bottom").hide();
                                loginInit();
                                $("#login").show();
                                loginShow();
                            }else{
                                alert(data.msg);
                            }
                        }
                    });
                }
            },
            onFail : function(err) {}
        });
    });
});
function loginShow(){
    // 登录页
    // alert($("#login").css("display"));
    if($("#login").css("display")!=="none"){
        loginHeight();
        $(document).resize(function(){
            loginHeight();
        });
        $(".login_btn").click(function(){
            var tel=$("#tel").val();
            var vcode=$("#vcode").val();
            if(tel==""){
                alert("请填写手机号！");
            }
            else if(vcode==""){
                alert("请填写验证码！");
            }
            else{
                // alert($(".token").css("display"));
                if($(".token").css("display")!=="none"){
                    var token=$("#token").val();
                    var pwd=$("#pwd").val();
                    if(token==""){
                        alert("请填写随访账号！");
                        return false;
                    }else if(pwd==""){
                        alert("请填写密码！");
                        return false;
                    }else{
                        $.ajax({
                            on: true,
                            timeout:60000,
                            type:"get",
                            url: LOCALHOST_URL+'/web-bin/m/followup/followupTask/post_ddCreate_data?phone='+tel+"&vCode="+vcode+"&interviewAccount="+token+"&interviewPwd="+pwd+"&corpId="+corpId+"&userId="+userId,
                            dataType:"json",
                            success: function(data){
                                console.log(data);
                                // alert(JSON.stringify(data));
                                if(data.data&&data.res==0){
                                    hgId=data.data.hgId;
                                    usId=data.data.id;
                                    accessToken=data.data.accessToken;
                                    eachDate=data.time.substring(0,10);
                                    sessionStorage.setItem("usId",usId);
                                    sessionStorage.setItem("eachDate",eachDate);
                                    sessionStorage.setItem("hgId",hgId);
                                    sessionStorage.setItem("accessToken",accessToken);
                                    bindIf=true;
                                    $("#login").hide();
                                    $("#container").show();
                                    contentShow();
                                    $(".followup_btn").addClass("active");
                                    $(".education_btn,.personal_btn").removeClass("active");
                                }else{
                                    alert(data.msg);
                                    return false;
                                }
                            }
                        });
                    }
                }else{
                    $.ajax({
                        on: true,
                        timeout:60000,
                        type:"get",
                        url: LOCALHOST_URL+'/web-bin/m/followup/followupTask/get_ddLogin_info?phone='+tel+"&vCode="+vcode+"&corpId="+corpId+"&userId="+userId+"&appId="+appId,
                        dataType:"json",
                        success: function(data){
                            console.log(data);
                            // alert(JSON.stringify(data));
                            if(data.data&&data.res==0){
                                hgId=data.data.hgId;
                                usId=data.data.id;
                                accessToken=data.data.accessToken;
                                eachDate=data.time.substring(0,10);
                                sessionStorage.setItem("usId",usId);
                                sessionStorage.setItem("eachDate",eachDate);
                                sessionStorage.setItem("hgId",hgId);
                                sessionStorage.setItem("accessToken",accessToken);
                                bindIf=true;
                                $("#login").hide();
                                $("#container").show();
                                contentShow();
                                $(".followup_btn").addClass("active");
                                $(".education_btn,.personal_btn").removeClass("active");
                            }else{
                                alert(data.msg);
                                return false;
                            }
                        }
                    });
                }
            }
        });
        $(".login_content .active").click(function(){
            // alert("发送验证码");
            var mPattern =/^1[34578]\d{9}$/;
            var tel=$("#tel").val();
            if(tel==""){
                alert("请填写手机号！");
            }else if(mPattern.test(tel)==false){
                alert("手机号格式错误！");
            }else{
                timeCount();
                //发短信
                $.ajax({
                    on: true,
                    timeout:60000,
                    type:"get",
                    url: LOCALHOST_URL+'/web-bin/m/followup/followupTask/get_message_info?phone='+tel+"&smsType=5",
                    dataType:"json",
                    success: function(data){
                        if(data.res==0){
                            console.log(data);
                        }else{
                            alert(data.msg);
                        }
                    }
                });
                //判断是否有随访账号
                $.ajax({
                    on: true,
                    timeout:60000,
                    type:"get",
                    url: LOCALHOST_URL+'/web-bin/m/followup/followupTask/get_user_info?phone='+tel+"&type=3",
                    dataType:"json",
                    success: function(data){
                        console.log(data);
                        // alert(JSON.stringify(data));
                        if(data.res==0){
                            var Dlength=data.data.length;
                            var num=0;
                            for(var i=0;i<Dlength;i++){
                                if(data.data[i].interviewUser){
                                    num++;
                                }
                            }
                            if(num>0){
                                $(".login_content ul li.token,.login_content ul li.pwd").hide();
                            }else{
                                $(".login_content ul li.token,.login_content ul li.pwd").show();
                            }
                        }else if(data.res==10008){//找不到用户信息
                            $(".login_content ul li.token,.login_content ul li.pwd").show();
                        }else{
                            alert(data.msg);
                        }
                    }
                });
            }
        });
    }
}
function contentShow(){
    $(".searchInput").on('input',function(){
        $(".cancle").hide();
        $(".search_follow").show();
        if(!$(this).val()){
            $(".cancle").show();
            $(".search_follow").hide();
        }
    });
    // 随访逻辑
    if($("#container").css("display")!=="none"){
        hgId=query.hgId||sessionStorage.getItem("hgId");
        accessToken=query.accessToken||sessionStorage.getItem("accessToken");
        var hospCode=$("#hospCode").val();
        // 随访日志
        $.ajax({
            on: true,
            timeout:60000,
            type:"get",
            url: LOCALHOST_URL+'/web-bin/m/followup/followupTask/query_followupLog_info?hugId='+hgId+'&hospCode='+hospCode,
            dataType:"json",
            success: function(data){
                console.log(data||'2');
            }
        });
        $(".bottom").show();
        pageResize();
        $(".main_followupBody").niceScroll({
            cursoropacitymin: 0.4,
            cursoropacitymax: 0.4,
            cursorcolor:"#515153",
        });
        $(".education_btn").unbind('click').click(function(){
            $(this).addClass("active");
            $(".followup_btn,.personal_btn").removeClass("active");
            $("#container,#personal_box").hide();
            $("#educationBox").show();
            educationShow();
        });
        $(".personal_btn").unbind('click').click(function(){
            $(this).addClass("active");
            $(".followup_btn,.education_btn").removeClass("active");
            $("#container,#educationBox").hide();
            $("#personal_box").show();
            personalShow();
        });
        $(".follow_search").click(function(){
            var searchValue=$(".searchInput").val();
            if($("#wait").hasClass("border_bottom")){
                var revisitResult=0;
            }else{
                var revisitResult=1;
            }
            loadSearchAjax(revisitResult,searchValue)
        });
        //跳转到已完成随访页面
        $(".finish").unbind("click").click(function(){
            $(".border_bottom").removeClass("border_bottom");
            $(this).addClass("border_bottom");
            dd.util.domainStorage.setItem({
                name:"fromType",
                value:3,
                onSuccess : function(info) {
                    // alert("success:"+JSON.stringify(info));
                    dd.util.domainStorage.getItem({
                        name:"fromType",
                        onSuccess : function(info) {
                            value: fromType; // 获取存储的信息
                            fromType=info.value;
                            // alert("fromType="+fromType);
                        },
                        onFail : function(err) {
                            alert("error:"+JSON.stringify(err));
                        }
                    });
                },
                onFail : function(err) {
                    alert("error:"+JSON.stringify(err));
                }
            });
            fromType=3;
            btnTab();
        });
        //跳转到待随访页面
        $("#wait").unbind("click").click(function(){
            $(".border_bottom").removeClass("border_bottom");
            $(this).addClass("border_bottom");
            dd.util.domainStorage.setItem({
                name:"fromType",
                value:2,
                onSuccess : function(info) {
                    // alert("success:"+JSON.stringify(info));
                    dd.util.domainStorage.getItem({
                        name:"fromType",
                        onSuccess : function(info) {
                            value: fromType; // 获取存储的信息
                            fromType=info.value;
                            // alert("fromType="+fromType);
                        },
                        onFail : function(err) {
                            alert("error:"+JSON.stringify(err));
                        }
                    });
                },
                onFail : function(err) {
                    alert("error:"+JSON.stringify(err));
                }
            });
            fromType=2;
            btnTab();
        });
        //首次加载
        if(bindIf){
            $("#wait").click();
        }else{
            alert("请先绑定随访账号！");
        }
        //跳转到处理随访任务页面
        $(".search_result_box,.main_followupBody").on("click",".followup_button",function () {
            var hospCode=$("#hospCode").val();
            var $parent=$(this).parents(".item");
            var inHosNo=$parent.find(".inHosNo").val();
            var visitCardNo=$parent.find(".visitCardNo").val();
            var mobileNo=$parent.find(".mobileNo").val();
            var name=$parent.find(".name").text();
            var sex=$parent.find(".sex").text();
            var age=$parent.find(".age").text();
            var form=$parent.find(".list .list_form");
            var formArr=[];
            for(var i=0;i<form.length;i++){
                formArr.push(form.eq(i).text());
            }
            var formStr=formArr.join();
            // alert(formArr);
            // alert(formStr);
            var id=$parent.find(".form_id").val();
            console.log(form);
            var revisitResult=$(this).parents(".item").find(".revisitResult").val();
            console.log(revisitResult);
            if(revisitResult==1){
                dd.util.domainStorage.setItem({
                    name:"fromType",
                    value:3,
                    onSuccess : function(info) {
                        // alert("success:"+JSON.stringify(info));
                        dd.util.domainStorage.getItem({
                            name:"fromType",
                            onSuccess : function(info) {
                                value: fromType; // 获取存储的信息
                                fromType=info.value;
                                // alert("fromType="+fromType);
                            },
                            onFail : function(err) {
                                alert("error:"+JSON.stringify(err));
                            }
                        });
                    },
                    onFail : function(err) {
                        alert("error:"+JSON.stringify(err));
                    }});
                var result='&name='+name+'&sex='+sex+'&age='+age+'&form='+formStr+'&id='+id+'&hgId='+hgId+'&hospCode='+hospCode+'&inHosNo='+inHosNo+'&visitCardNo='+visitCardNo+'&mobileNo='+mobileNo+"&fromType=3";
            }else{
                dd.util.domainStorage.setItem({
                    name:"fromType",
                    value:2,
                    onSuccess : function(info) {
                        // alert("success:"+JSON.stringify(info));
                        dd.util.domainStorage.getItem({
                            name:"fromType",
                            onSuccess : function(info) {
                                value: fromType; // 获取存储的信息
                                fromType=info.value;
                                // alert("fromType="+fromType);
                            },
                            onFail : function(err) {
                                alert("error:"+JSON.stringify(err));
                            }
                        });
                    },
                    onFail : function(err) {
                        alert("error:"+JSON.stringify(err));
                    }});
                var result='&name='+name+'&sex='+sex+'&age='+age+'&form='+formStr+'&id='+id+'&hgId='+hgId+'&hospCode='+hospCode+'&inHosNo='+inHosNo+'&visitCardNo='+visitCardNo+'&mobileNo='+mobileNo+"&fromType=2";
            }
            console.log(result);
            location.href =LOCALHOST_URL+'/web-bin/m/followup/followupTask/to_processingFollowupTask_page?eachDate='+eachDate+'&usId='+usId+'&accessToken='+accessToken+result+"&opt_corpId="+corpId+"&agentId="+agentId;
            // location.href='116.62.29.166:3002/web-bin/m/followup/followupTask/to_phoneTest_page?opt_corpId='+corpId+"&agentId="+agentId;
        });
        //跳转到查看随访任务页面
        $(".search_result_box,.main_followupBody").on("click",".check_button",function () {
            var hospCode=$("#hospCode").val();
            var $parent=$(this).parents(".item");
            var inHosNo=$parent.find(".inHosNo").val();
            var visitCardNo=$parent.find(".visitCardNo").val();
            var name=$parent.find(".name").text();
            var sex=$parent.find(".sex").text();
            var age=$parent.find(".age").text();
            var form=$parent.find(".list .list_form");
            var formArr=[];
            for(var i=0;i<form.length;i++){
                formArr.push(form.eq(i).text());
            }
            var formStr=formArr.join();
            var id=$parent.find(".form_id").val();
            var empiId=$parent.find(".empiId").val();
            var handlingOpinion=$parent.find(".handlingOpinion").val();
            var plantimeStr=$parent.find(".date span").text();
            var revisitResult=$(this).parents(".item").find(".revisitResult").val();
            if(revisitResult==1){
                dd.util.domainStorage.setItem({
                    name:"fromType",
                    value:3,
                    onSuccess : function(info) {
                        // alert("success:"+JSON.stringify(info));
                        dd.util.domainStorage.getItem({
                            name:"fromType",
                            onSuccess : function(info) {
                                value: fromType; // 获取存储的信息
                                fromType=info.value;
                                // alert("fromType="+fromType);
                            },
                            onFail : function(err) {
                                alert("error:"+JSON.stringify(err));
                            }
                        });
                    },
                    onFail : function(err) {
                        alert("error:"+JSON.stringify(err));
                    }});
                var result='&name='+name+'&sex='+sex+'&age='+age+'&form='+formStr+'&id='+id+'&empiId='+empiId+'&handlingOpinion='+handlingOpinion+'&plantimeStr='+plantimeStr+'&hospCode='+hospCode+'&inHosNo='+inHosNo+'&visitCardNo='+visitCardNo+"&fromType=3";
            }else{
                dd.util.domainStorage.setItem({
                    name:"fromType",
                    value:2,
                    onSuccess : function(info) {
                        // alert("success:"+JSON.stringify(info));
                        dd.util.domainStorage.getItem({
                            name:"fromType",
                            onSuccess : function(info) {
                                value: fromType; // 获取存储的信息
                                fromType=info.value;
                                // alert("fromType="+fromType);
                            },
                            onFail : function(err) {
                                alert("error:"+JSON.stringify(err));
                            }
                        });
                    },
                    onFail : function(err) {
                        alert("error:"+JSON.stringify(err));
                    }});
                var result='&name='+name+'&sex='+sex+'&age='+age+'&form='+formStr+'&id='+id+'&empiId='+empiId+'&handlingOpinion='+handlingOpinion+'&plantimeStr='+plantimeStr+'&hospCode='+hospCode+'&inHosNo='+inHosNo+'&visitCardNo='+visitCardNo+"&fromType=2";
            }
            console.log(result);
            location.href = LOCALHOST_URL+'/web-bin/m/followup/followupTask/to_checkFollowupTask_page?eachDate='+eachDate+'&usId='+usId+'&accessToken='+accessToken+result;
        });
        //跳转到随访任务详情页面
        $(".search_result_box,.main_followupBody").on("click",".flag",function(){
            var f=0;
            if($(this).hasClass('closeCase')){
                f=1
            }
            var $parent=$(this).parents(".item");
            var empiId=$parent.find(".empiId").val();
            var planId=$parent.find(".planId").val();
            var revisitResult=$parent.find(".revisitResult").val();
            if(revisitResult==1){
                dd.util.domainStorage.setItem({
                    name:"fromType",
                    value:3,
                    onSuccess : function(info) {
                        // alert("success:"+JSON.stringify(info));
                        dd.util.domainStorage.getItem({
                            name:"fromType",
                            onSuccess : function(info) {
                                value: fromType; // 获取存储的信息
                                fromType=info.value;
                                // alert("fromType="+fromType);
                            },
                            onFail : function(err) {
                                alert("error:"+JSON.stringify(err));
                            }
                        });
                    },
                    onFail : function(err) {
                        alert("error:"+JSON.stringify(err));
                    }});
                var result='&empiId='+empiId+'&planId='+planId+'&flag='+f+"&fromType=3";
            }else{
                dd.util.domainStorage.setItem({
                    name:"fromType",
                    value:2,
                    onSuccess : function(info) {
                        // alert("success:"+JSON.stringify(info));
                        dd.util.domainStorage.getItem({
                            name:"fromType",
                            onSuccess : function(info) {
                                value: fromType; // 获取存储的信息
                                fromType=info.value;
                                // alert("fromType="+fromType);
                            },
                            onFail : function(err) {
                                alert("error:"+JSON.stringify(err));
                            }
                        });
                    },
                    onFail : function(err) {
                        alert("error:"+JSON.stringify(err));
                    }});
                var result='&empiId='+empiId+'&planId='+planId+'&flag='+f+"&fromType=2";
            }
            location.href = LOCALHOST_URL+'/web-bin/m/followup/followupTask/to_followupPlanDetail_page?eachDate='+eachDate+'&usId='+usId+'&accessToken='+accessToken+result+"&corpId="+corpId+"&agentId="+agentId;
        });
        //跳转到医疗档案
        $(".search_result_box,.main_followupBody").on("click",".base_info",function () {
            var name=$(this).find(".name").text();
            var sex=$(this).find(".sex").text();
            var age=$(this).find(".age").text();
            var hospCode=$("#hospCode").val();
            var inHosNo=$(this).find(".inHosNo").val();
            var visitCardNo=$(this).find(".visitCardNo").val();
            var revisitResult=$(this).parents(".item").find(".revisitResult").val();
            if(revisitResult==1){
                dd.util.domainStorage.setItem({
                    name:"fromType",
                    value:3,
                    onSuccess : function(info) {
                        // alert("success:"+JSON.stringify(info));
                        dd.util.domainStorage.getItem({
                            name:"fromType",
                            onSuccess : function(info) {
                                value: fromType; // 获取存储的信息
                                fromType=info.value;
                                // alert("fromType="+fromType);
                            },
                            onFail : function(err) {
                                alert("error:"+JSON.stringify(err));
                            }
                        });
                    },
                    onFail : function(err) {
                        alert("error:"+JSON.stringify(err));
                    }});
                var result="&name="+name+"&sex="+sex+"&age="+age+"&fromType=3";
            }else{
                dd.util.domainStorage.setItem({
                    name:"fromType",
                    value:2,
                    onSuccess : function(info) {
                        // alert("success:"+JSON.stringify(info));
                        dd.util.domainStorage.getItem({
                            name:"fromType",
                            onSuccess : function(info) {
                                value: fromType; // 获取存储的信息
                                fromType=info.value;
                                // alert("fromType="+fromType);
                            },
                            onFail : function(err) {
                                alert("error:"+JSON.stringify(err));
                            }
                        });
                    },
                    onFail : function(err) {
                        alert("error:"+JSON.stringify(err));
                    }});
                var result="&name="+name+"&sex="+sex+"&age="+age+"&fromType=2";
            }
            location.href = LOCALHOST_URL+'/web-bin/m/followup/followupTask/to_medicalRecordList_page?hospCode='+hospCode+'&usId='+usId+'&accessToken='+accessToken+'&inHosNo='+inHosNo+'&visitCardNo='+visitCardNo+result;
        });

        // $(".main_followupBody").height(document.documentElement.clientHeight-111);
    }
}
function loadAjax(revisitResult){
    $(".weui-loadmore").remove();
    $.ajax({
         async:true,
         on: true,
         type:"post",
        url: LOCALHOST_URL+'/web-bin/m/followup/followupTask/query_followUp_data?usId='+usId+'&accessToken='+accessToken+'&partnerType=11'+"&pageNumber="+pageNumFollow+"&pageSize="+pageSizeFollow+'&revisitResult='+revisitResult+queryDate,
        beforeSend:function(XMLHttpRequest){
            //加载中
            $(".wait_followup").html('<div class="load_followup"><img src="/web-bin/mobile/followup/healthCare/img/loading.gif"/></div>');
        },
        dataType:"json",
        success: function(data){
            $(".load_followup").hide();
            if(data.data && data.res==0){
                $("#hospCode").val(data.data.hospCode);
                callBack(data);
            }else{
                if(data.msg){
                    alert(data.msg);
                }else{
                    $(".wait_followup").append('<div id="none">'+
                        '<img src="/web-bin/resources/images/nodata2x.png">'+
                        '<p>暂无数据</p>'+
                        '</div>');
                }
            }
        },
        complete:function(){
            $(".wait_followup .load_followup").remove();
        }
    });
}
// 滚动加载
$(".main_followupBody").infinite(50);
var loading = false;  //状态标记
$(".main_followupBody").infinite().on("infinite", function() {
    if(loading) return;
    loading = true;
    setTimeout(function() {
        pageNumFollow+=1;
        if($("#wait").hasClass("border_bottom")){
            var revisitResult=0;
        }else{
            var revisitResult=1;
        }
        $.ajax({
            on: true,
            timeout:60000,
            type:"get",
            url: LOCALHOST_URL+'/web-bin/m/followup/followupTask/query_followUp_data?usId='+usId+'&accessToken='+accessToken+'&partnerType=11'+"&pageNumber="+pageNumFollow+"&pageSize="+pageSizeFollow+'&revisitResult='+revisitResult+queryDate,
            dataType:"json",
            success: function(data){
                if(data.data && data.res==0){
                    // $(".weui-loadmore").remove();
                    if(revisitResult==0){
                        for(var i=0;i<data.data.pageInfo.list.length;i++){
                            if(data.data.pageInfo.list[i].revisitPlanTime==""){
                                data.data.pageInfo.list[i].revisitPlanTime=data.data.time.substring(0,10);
                            }
                            if(data.data.pageInfo.list[i].sexName=="女"){
                                data.data.pageInfo.list[i].src="/web-bin/resources/images/woman.png";
                            }else{
                                data.data.pageInfo.list[i].src="/web-bin/resources/images/men.png";
                            }
                            data.data.pageInfo.list[i].plantimeStr=timeStr(data.data.pageInfo.list[i].revisitPlanTime);
                        }
                        data.data.pageInfo.list.sort(compare("revisitPlanTime"));
                        $.each(data.data.pageInfo.list,function(i,item){
                            $(".wait_followup").append('<div class="item" data-role="0"><input type="hidden" class="revisitResult" value='+item.revisitResult+'><input type="hidden" value='+item.id+' class="form_id"><input type="hidden" value="'+item.empiId+'" class="empiId"><div class="base_info"><input type="hidden" class="inHosNo" value="'+item.inHosNo+'"><input type="hidden" class="visitCardNo" value='+item.visitCardNo+'><input type="hidden" class="mobileNo" value="'+item.mobileNo+'"><span class="per_img"><img src='+item.src+' alt="头像"></span><div class="base_smInfo_box"><div class="base_sm_info"> <span class="name">'+item.patName+'</span></div><div class="base_sm_info sex_age"><span class="sex">'+item.sexName+'</span><span class="age">'+item.age+'岁</span></div></div></div><div class="subject"><div class="flag"> <input type="hidden" value='+item.planId+' class="planId"><span class="sub_tit">'+item.planName+'</span><div class="date"><span>'+item.plantimeStr+'</span><div class="right_gray_arrow"></div></div></div><div class="list">'+item.formTitle+'<div class="followup_button">随访</div></div></div></div>')
                        })
                    }else{
                        for(var i=0;i<data.data.pageInfo.list.length;i++){
                            if(data.data.pageInfo.list[i].revisitPlanTime==""){
                                data.data.pageInfo.list[i].revisitPlanTime=data.data.time.substring(0,10);
                            }
                            if(data.data.pageInfo.list[i].sexName=="女"){
                                data.data.pageInfo.list[i].src="/web-bin/resources/images/woman.png";
                            }else{
                                data.data.pageInfo.list[i].src="/web-bin/resources/images/men.png";
                            }
                            data.data.pageInfo.list[i].plantimeStr=timeStr(data.data.pageInfo.list[i].revisitPlanTime);
                        }
                        data.data.pageInfo.list.sort(compare("revisitPlanTime"));
                        $.each(data.data.pageInfo.list,function(i,item){
                            $(".wait_followup").append('<div class="item" data-role="0"><input type="hidden" class="revisitResult" value='+item.revisitResult+'><input type="hidden" value='+item.id+' class="form_id"><input type="hidden" value="'+item.empiId+'" class="empiId"><div class="base_info"><input type="hidden" class="inHosNo" value="'+item.inHosNo+'"><input type="hidden" class="visitCardNo" value='+item.visitCardNo+'><input type="hidden" class="mobileNo" value="'+item.mobileNo+'"><span class="per_img"><img src='+item.src+' alt="头像"></span><div class="base_smInfo_box"><div class="base_sm_info"> <span class="name">'+item.patName+'</span></div><div class="base_sm_info sex_age"><span class="sex">'+item.sexName+'</span><span class="age">'+item.age+'岁</span></div></div></div><div class="subject"><div class="flag"> <input type="hidden" value='+item.planId+' class="planId"><span class="sub_tit">'+item.planName+'</span><div class="date"><span>'+item.plantimeStr+'</span><div class="right_gray_arrow"></div></div></div><div class="list">'+item.formTitle+'<div class="check_button">查看</div></div></div></div>')
                        })
                    }
                    if(data.res==0 && data.data.pageInfo.list.length<pageSize){
                        //加载完毕
                        $(".weui-loadmore").html('<div class="weui-loadmore" ><span class="weui-loadmore__tips">已全部显示</span></div>');
                    }
                }else{
                    $.alert(JSON.stringify(data));
                }
            }
        });
        loading = false;
    }, 1000);   //模拟延迟
});
function loadSearchAjax(revisitResult,patName){
    $.ajax({
        on: true,
        timeout:60000,
        type:"get",
        url: LOCALHOST_URL+'/web-bin/m/followup/followupTask/query_followUp_data?usId='+usId+'&accessToken='+accessToken+'&partnerType=11'+"&pageNumber=1"+"&pageSize=50"+'&revisitResult='+revisitResult+'&patName='+patName+queryDate,
        beforeSend:function(XMLHttpRequest){
            //加载中
            $(".search_result_box").html('<div class="load_followup"><img src="/web-bin/mobile/followup/healthCare/img/loading.gif"/></div>');
        },
        dataType:"json",
        success: function(data){//alert(JSON.stringify(data));
            $(".load_followup").hide();
            if(data.data && data.res==0){
                if(!data.data.pageInfo){
                    $(".search_result_box").append('<div id="none">'+
                        '<img src="/web-bin/resources/images/nodata2x.png">'+
                        '<p>暂无数据</p>'+
                        '</div>');
                    return false;
                }
                if(data.data.pageInfo.list && data.data.pageInfo.list.length>0){
                    for(var i=0;i<data.data.pageInfo.list.length;i++){
                        if(data.data.pageInfo.list[i].revisitPlanTime==""){
                            data.data.pageInfo.list[i].revisitPlanTime=data.data.time.substring(0,10);
                        }
                        if(data.data.pageInfo.list[i].sexName=="女"){
                            data.data.pageInfo.list[i].src="/web-bin/resources/images/woman.png";
                        }else{
                            data.data.pageInfo.list[i].src="/web-bin/resources/images/men.png";
                        }
                        // 滚动加载标记异常
                        if(data.data.pageInfo.list[i].revisitExcp==1){
                            $(".wait_followup").find(".list").eq(i).append('<div class="abnormity_markers">异</div>')
                        }
                        data.data.pageInfo.list[i].plantimeStr=timeStr(data.data.pageInfo.list[i].revisitPlanTime);
                    }
                    data.data.pageInfo.list.sort(compare("revisitPlanTime"));
                    $(".search_result_box").html("").setTemplateElement("Template-followUp").processTemplate(data.data.pageInfo.list);
                }else{
                    $(".search_result_box").append('<div id="none">'+
                        '<img src="/web-bin/resources/images/nodata2x.png">'+
                        '<p>暂无数据</p>'+
                        '</div>');
                }
            }else{
                $.alert(JSON.stringify(data));
            }
        },
        complete:function(){
            $(".wait_followup .load_followup").remove();
        }
    });
}
function callBack(data){
    if(data.data.pageInfo.list && data.data.pageInfo.list.length>0){
        for(var i=0;i<data.data.pageInfo.list.length;i++){
            if(data.data.pageInfo.list[i].revisitPlanTime==""){
                data.data.pageInfo.list[i].revisitPlanTime=data.data.time.substring(0,10);
            }
            if(data.data.pageInfo.list[i].sexName=="女"){
                data.data.pageInfo.list[i].src="/web-bin/resources/images/woman.png";
            }else{
                data.data.pageInfo.list[i].src="/web-bin/resources/images/men.png";
            }
            // 滚动加载标记异常
            if(data.data.pageInfo.list[i].revisitExcp==1){
                $(".wait_followup").find(".list").eq(i).append('<div class="abnormity_markers">异</div>')
            }
            data.data.pageInfo.list[i].plantimeStr=timeStr(data.data.pageInfo.list[i].revisitPlanTime);
        }
        data.data.pageInfo.list.sort(compare("revisitPlanTime"));
        $(".wait_followup").html("").setTemplateElement("Template-followUp").processTemplate(data.data.pageInfo.list);
        // $("#loading").hide();
    }else{
        $(".wait_followup").append('<div id="none">'+
            '<img src="/web-bin/resources/images/nodata2x.png">'+
            '<p>暂无数据</p>'+
            '</div>');
    }
}
function btnTab(){
    if(fromType==3){
        $("#none").remove();
        $(".finish").addClass("border_bottom");
        $("#wait").removeClass("border_bottom");
        loadAjax(1)
    }else{
        $("#none").remove();
        $("#wait").addClass("border_bottom");
        $(".finish").removeClass("border_bottom");
        loadAjax(0);
    }
}
/*function contentTab(){
 if(fromType==3){
 $(".finish").addClass("border_bottom");
 $("#wait").removeClass("border_bottom");
 }else{
 $("#wait").addClass("border_bottom");
 $(".finish").removeClass("border_bottom");
 }
 }*/
var time=60;
function timeCount(){
    time--;
    $(".vcode_btn").text(time+  "s").removeClass("active").addClass("gray");
    Timer=setTimeout(timeCount,1000);
    if(time==0){
        time=60;
        clearTimeout(Timer);
        $(".vcode_btn").text("获取验证码").removeClass("gray").addClass("active");
    }
}
function educationShow(){
    if($("#educationBox").css("display")!=="none"){
        hgId=query.hgId||sessionStorage.getItem("hgId");
        accessToken=query.accessToken||sessionStorage.getItem("accessToken");
        // 宣教日志
        $.ajax({
            on: true,
            timeout:60000,
            type:"get",
            url: LOCALHOST_URL+'/web-bin/m/followup/followupTask/query_educationLog_info?hugId='+hgId+'&hospCode='+hospCode,
            dataType:"json",
            success: function(data){
               console.log(data||'3');
            }
        });
        $(".bottom").show();
        pageResize();
        $(".main_body").niceScroll({
            railpadding : {top : 0,right : 0,left : 0,bottom : 0}
        });
        $(".followup_btn").unbind('click').click(function(){
            $(this).addClass("active");
            $(".education_btn,.personal_btn").removeClass("active");
            $("#container").show();
            $("#educationBox,#personal_box").hide();
            contentShow();
        });
        $(".personal_btn").unbind('click').click(function(){
            $(this).addClass("active");
            $(".education_btn,.followup_btn").removeClass("active");
            $("#personal_box").show();
            $("#educationBox,#container").hide();
            personalShow();
        });
        if(bindIf){
            $.ajax({
                on: true,
                timeout:60000,
                type:"get",
                url: LOCALHOST_URL+'/web-bin/m/followup/followupTask/query_doctor_power?usId='+usId+'&accessToken='+accessToken,
                dataType:"json",
                success: function(data){
                    // alert(JSON.stringify(data));
                    if(data.data&&data.res==0){
                        callBack3(data);
                    }else{
                        alert(data.msg);
                    }
                }
            });
        }else{
            alert("请先绑定随访账号！");
        }
        //输入框
        $("#educationBox").find(".css_search").click(function(){
            $(".search_res").show();
            $(".searchInput").val("").focus();
            $(".searchList_result").html("");
        });
        $(".searchInput").on('input',function(){
            $(".cancle").hide();
            $(".search_follow").show();
            if(!$(this).val()){
                $(".cancle").show();
                $(".search_follow").hide();
            }
        });
        //取消按钮
        $(".cancle").click(function(){
            $(".search_res").hide();
        });
        //搜索按钮
        $(".education_search").click(function(){
            $(".search_body").niceScroll({
                railpadding : {top : 0,right : 0,left : 0,bottom : 0}
            });
            page="&pageNum=1&pageSize=30";//待拼凑的url参数
            var $value=$(".searchInput").val();
            console.log($value);
            if ($value) {
                console.log(LOCALHOST_URL+'/web-bin/m/followup/followupTask/query_inHosp_data?usId='+usId+'&accessToken='+accessToken+"&inhospStatus=false"+"&patName="+$value+page);
                $.ajax({
                    on: true,
                    type:"post",
                    url:LOCALHOST_URL+'/web-bin/m/followup/followupTask/query_inHosp_data?usId='+usId+'&accessToken='+accessToken+"&inhospStatus=false"+"&patName="+$value+page,
                    beforeSend:function(XMLHttpRequest ){
                        //加载中
                        $(".searchList_result").html('<div class="loaders"><img src="/web-bin/mobile/repository/drug/images/loading_2.gif"/><div>');
                    },
                    dataType:"json",
                    success: function(data){
                        $(".loaders").remove();
                        if (data.res==0) {
                            if (data.data.result.length==0) {
                                $(".search_body").append('<div id="none">'+
                                    '<img src="/web-bin/resources/images/nodata2x.png">'+
                                    '<p>暂无数据</p>'+
                                    '</div>');
                            }else{
                                $("#none").remove();
                                $(".searchList_result").setTemplateElement("template_searchList").processTemplate(data.data.result).append("<div style='text-align: center;font-size:12px;line-height:1;height:15px;'>已经到底啦！</div>");
                            }
                        }else{
                            alert(data.msg)
                        }
                    }
                });
            }
        });
        // 点击跳转详情
        $("#educationBox .main_body,.searchList_result").on("click",".item",function(){
            dd.util.domainStorage.setItem({
                name:"fromType",
                value:1,
                onSuccess : function(info) {
                    // alert("success:"+JSON.stringify(info));
                    dd.util.domainStorage.getItem({
                        name:"fromType",
                        onSuccess : function(info) {
                            value: fromType; // 获取存储的信息
                            fromType=info.value;
                            // alert("fromType="+fromType);
                        },
                        onFail : function(err) {
                            alert("error:"+JSON.stringify(err));
                        }
                    });
                },
                onFail : function(err) {
                    alert("error:"+JSON.stringify(err));
                }});
            var $this=$(this);
            var bed=$this.find(".beds").text();
            var wardName=$this.find(".wardName").val();
            var admitDate=$this.find(".admitDate").val();
            var patName=$this.find(".patName").val();
            var phone=$this.find(".phone").val();
            var inhospNo=$this.find(".inhospNo").val();
            var idCard=$this.find(".idCard").val();
            var deptCode=$this.find(".deptCode").val();
            var deptName=$this.find(".deptName").val();
            var wardCode=$this.find(".wardCode").val();
            var patIndexNo=$this.find(".patIndexNo").val()||"";
            var visitCardNo=$this.find(".visitCardNo").val();
            var inhospSerialNo=$this.find(".inhospSerialNo").val();
            location.href = LOCALHOST_URL+'/web-bin/m/followup/followupTask/to_educationDetail_page?bed='+bed+'&wardName='+wardName+'&admitDate='+admitDate+'&patName='+patName+"&phone="+phone+"&inhospNo="+inhospNo+"&idCard="+idCard+"&deptCode="+deptCode+"&deptName="+deptName+"&wardCode="+wardCode+"&visitCardNo="+visitCardNo+"&patIndexNo="+patIndexNo+"&inhospSerialNo="+inhospSerialNo+'&usId='+usId+'&accessToken='+accessToken+"&fromType=1"+"&sexName="+'&hgId='+hgId;
        });
        //滚动加载列表页面
        $(".main_body").scroll(function(){
            var scrollTop = $(this).scrollTop();
            // locRecord(scrollTop);
            var scrollHeight = $(".pat").height();
            var windowHeight = $(this).height();
            var yushu=(scrollTop+windowHeight)%scrollHeight;
            if(yushu==0){
                var $div=$('<div class="pat"><div>');
                $(".pat").removeClass("pat").after($div);
                pageNum++;
                page="&pageNum="+pageNum+"&pageSize="+pageSize;
                $.ajax({
                    on: true,
                    timeout:60000,
                    type:"get",
                    url: LOCALHOST_URL+'/web-bin/m/followup/followupTask/query_inHosp_data?usId='+usId+'&accessToken='+accessToken+"&inhospStatus=false"+page,
                    dataType:"json",
                    success: function(data){
                        console.log(data);
                        if(data.data&&data.res==0){
                            loadData1(data);
                        }
                    }
                });
            }
        });
    }
}
function callBack3(data){
    console.log(data.data.viewAuth);
    if(data.data.viewAuth == 1){
        var url=LOCALHOST_URL+'/web-bin/m/followup/followupTask/query_inHosp_data?usId='+usId+'&accessToken='+accessToken+"&inhospStatus=false";
        loadData(url);
        return;
    }else {
        console.log(data.data.wardFlag);
        if(data.data.wardFlag == 1){
            if(data.data.deptCodes == "all"){
                var url=LOCALHOST_URL+'/web-bin/m/followup/followupTask/query_inHosp_data?usId='+usId+'&accessToken='+accessToken+"&inhospStatus=false";
                loadData(url);
                return;
            }else {
                deptcodes=data.data.deptCodes.split(",");
                deptcodes=JSON.stringify(deptcodes);
                deptCode="&deptCode="+deptcodes;
                var url=LOCALHOST_URL+'/web-bin/m/followup/followupTask/query_inHosp_data?usId='+usId+'&accessToken='+accessToken+"&inhospStatus=false"+deptCode;
                loadData(url);
                return;
            }
        }else {
            if(data.data.deptCodes == "all"){
                var url=LOCALHOST_URL+'/web-bin/m/followup/followupTask/query_inHosp_data?usId='+usId+'&accessToken='+accessToken+"&inhospStatus=false";
                loadData(url);
                return;
            }else {
                deptcodes = data.data.deptCodes.split(",");
                deptcodes = JSON.stringify(deptcodes);
                deptCode = "&wardCode=" + deptcodes;
                var url = LOCALHOST_URL + ':' + PORT + '/web-bin/m/followup/followupTask/query_inHosp_data?usId=' + usId + '&accessToken=' + accessToken + "&inhospStatus=false" + deptCode;
                loadData(url);
                return;
            }
        }
    }
}
function loadData(url){
    // alert("loadData...");
    $.ajax({
        on: true,
        timeout:60000,
        type:"get",
        url: url+page,
        dataType:"json",
        beforeSend:function(XMLHttpRequest){
            //加载中
            $("#educationBox .pat").html('<div class="loaders"><img src="/web-bin/mobile/repository/drug/images/loading_2.gif"/><div>');
        },
        success: function(data){
            console.log(data);
            // alert(JSON.stringify(data));
            if(data.res==0 && data.data.result.length>0){
                if(data.data.result.length==0){
                    $('.pat').html('<div id="none">'+
                        '<img src="/web-bin/resources/images/nodata2x.png">'+
                        '<p>暂无数据</p>'+
                        '</div>');
                }
                $(".pat").setTemplateElement("Template-Education").processTemplate(data.data.result);
                // $("#loading").hide();
                // locScroll();
            }else{
                alert(data.msg);
                $('.pat').html('<div id="none">'+
                    '<img src="/web-bin/resources/images/nodata2x.png">'+
                    '<p>暂无数据</p>'+
                    '</div>');
                //alert(JSON.stringify(data));
            }
        },
        complete:function(){
            $("#educationBox .pat .loaders").remove();
        }
    });
}
function loadData1(data){
    if(!data.data.hasNextPage){
        hasNextPage=false;
    }
    if(!hasNextPage){
        var $end=$('<p>全部加载完毕<p>');
        $("#end").html($end);
    }
    console.log(data.res==0);
    if(data.res==0){
        $(".pat").setTemplateElement("Template-Education").processTemplate(data.data.result);
        // locScroll();
    }
}
function pageResize(){
    $(".main_body").height($(window).height()-115);
    // $(".main_followupBody").height($(window).height()-115);
    $(".main_followupBody").height($(window).height()-115-$(".function_box").height());
    $(".search_body").height($(window).height()-$(".top").height());
    // $(".search_result_box").height($(window).height()-$(".top").height()-56);
    $(".filter_body").height($(window).height()-$(".top").height());
    $("#personal_box").height($(window).height()-$(".bottom").height()-10);
}
function compare(property){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}
function timeStr(date){
    var Sdate=new Date(date);
    var Syear=Sdate.getFullYear();
    var Smonth=(Sdate.getMonth()+1)<10?"0"+(Sdate.getMonth()+1):(Sdate.getMonth()+1);
    var Sday=Sdate.getDate()<10?"0"+Sdate.getDate():Sdate.getDate();
    return Syear+"-"+Smonth+"-"+Sday;
}
function personalShow(){
    if($("#personal_box").css("display")!=="none"){
        $(".bottom").show();
        $("#personal_box").niceScroll({
            railpadding : {top : 0,right : 0,left : 0,bottom : 0}
        });
        pageResize();
        hgId=query.hgId||sessionStorage.getItem("hgId");
        accessToken=query.accessToken||sessionStorage.getItem("accessToken");
        // alert("usId="+usId);
        // alert(accessToken);
        $(".followup_btn").unbind('click').click(function(){
            $(this).addClass("active");
            $(".education_btn,.personal_btn").removeClass("active");
            $("#container").show();
            $("#educationBox,#personal_box").hide();
            contentShow();
        });
        $(".education_btn").unbind('click').click(function(){
            $(this).addClass("active");
            $(".followup_btn,.personal_btn").removeClass("active");
            $("#container,#personal_box").hide();
            $("#educationBox").show();
            educationShow();
        });
        //显示数据
        $.ajax({
            on: true,
            type:"get",
            url:LOCALHOST_URL+'/web-bin/m/followup/followupTask/query_userInfo_data?usId='+usId+'&accessToken='+accessToken+"&hgId="+hgId,
            dataType:"json",
            success: function(data){
                // alert('hgId='+hgId);
                // console.log(data);
                // alert(JSON.stringify(data));
                if(data.data&&data.res==0){
                    $(".per_header_name").text(data.data.name);
                    if(data.data.interviewUser){
                        $(".account_num").text(data.data.interviewUser);
                        bindIf=true;
                    }else{
                        $(".account_num").text("未绑定");
                        bindIf=false;
                    }
                    $(".personal_list .per_hosp span").text(data.data.hosp||"暂无信息");
                    $(".personal_list .per_dept span").text(data.data.deptName||"暂无信息");
                    $(".personal_list .per_title span").text(data.data.drTitle||"暂无信息");
                    if(data.data.head&&data.data.head!==''){
                        // alert(SERVER_URL+FILE_URL+data.data.head);
                        $(".per_header_img img").attr({"src":SERVER_URL+FILE_URL+data.data.head});
                    }
                }else{
                    alert(data.msg);
                }
            }
        });
        $(".per_account").unbind("click").click(function(){
            var account_num=$(".per_account .account_num").text();
            dd.util.domainStorage.setItem({
                name:"fromType",
                value:4,
                onSuccess : function(info) {
                    // alert("success:"+JSON.stringify(info));
                    dd.util.domainStorage.getItem({
                        name:"fromType",
                        onSuccess : function(info) {
                            value: fromType; // 获取存储的信息
                            fromType=info.value;
                            // alert("fromType="+fromType);
                        },
                        onFail : function(err) {
                            alert("error:"+JSON.stringify(err));
                        }
                    });
                },
                onFail : function(err) {
                    alert("error:"+JSON.stringify(err));
                }});
            if(hgId=="LN12199218"){
                alert("该账号为演示账号，不能操作");
                return;
            }
            location.href = LOCALHOST_URL+'/web-bin/m/followup/followupTask/to_bindAccount_page?bindIf='+bindIf+"&account_num="+account_num+"&hgId="+hgId+'&usId='+usId+'&accessToken='+accessToken;
        });

    }
}
function loginInit(){
    $(".login_content #tel,.login_content #vcode").val('');
    $(".login_content ul li.token,.login_content ul li.pwd").hide().val('');
}
function loginHeight(){
    $(".login_header").height($(".login_header img").height());
    $(".login_content").css({'margin-top':10});
}



