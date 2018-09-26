/**
 * Created by CGT on 2017/7/26.
 */
$(function(){
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
    }
    else{
        $("#container").show();
        contentShow();
    }
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
});
function loginShow(){
    // 登录页
    // alert($("#login").css("display"));
    if($("#login").css("display")!=="none"){
        $("#loading").hide();
        $(".login_btn").click(function(){
            var tel=$("#tel").val();
            var vcode=$("#vcode").val();
            if(tel==""){
                art.dialog({
                    content:"请填写手机号！",
                    time:1.5,
                    icon:"warning"
                });
            }
            else if(vcode==""){
                art.dialog({
                    content:"请填写验证码！",
                    time:1.5,
                    icon:"warning"
                });
            }
            else{
                // alert($(".token").css("display"));
                if($(".token").css("display")!=="none"){
                    var token=$("#token").val();
                    var pwd=$("#pwd").val();
                    if(token==""){
                        art.dialog({
                            content:"请填写随访账号！",
                            time:1.5,
                            icon:"warning"
                        });
                    }else if(pwd==""){
                        art.dialog({
                            content:"请填写密码！",
                            time:1.5,
                            icon:"warning"
                        });
                    }else{
                        // alert("sending1");
                        $.ajax({
                            on: true,
                            timeout:60000,
                            type:"get",
                            url: LOCALHOST_URL+'/web-bin/m/followup/followupTask/post_ddCreate_data?phone='+tel+"&vCode="+vcode+"&interviewAccount="+token+"&interviewPwd="+pwd+"&corpId="+corpId+"&userId="+usId,
                            dataType:"json",
                            success: function(data){
                                console.log(data);
                                // alert(JSON.stringify(data));
                                if(data.data&&data.res==0){
                                    hgId=data.data.hgId;
                                    usId=data.data.id;
                                    accessToken=data.data.accessToken;
                                    eachDate=data.time.substring(0,10);
                                    //history.pushState("","",LOCALHOST_URL+'/web-bin/m/followup/followupTask/to_followUp_page?eachDate='+eachDate+'&usId='+usId+'&accessToken='+accessToken+'&hgId='+hgId);
                                    sessionStorage.setItem("usId",usId);
                                    sessionStorage.setItem("eachDate",eachDate);
                                    sessionStorage.setItem("hgId",hgId);
                                    sessionStorage.setItem("accessToken",accessToken);
                                    $("#login").hide();
                                    $("#container").show();
                                    contentShow();
                                }else{
                                    alert("登录失败"+data.msg);
                                }
                            }
                        });
                    }
                }else{
                    // alert("sending2");
                    $.ajax({
                        on: true,
                        timeout:60000,
                        type:"get",
                        url: LOCALHOST_URL+'/web-bin/m/followup/followupTask/get_ddLogin_info?phone='+tel+"&vCode="+vcode+"&corpId="+corpId+"&userId="+usId,
                        dataType:"json",
                        success: function(data){
                            console.log(data);
                            // alert(JSON.stringify(data));
                            if(data.data&&data.res==0){
                                hgId=data.data.hgId;
                                usId=data.data.id;
                                accessToken=data.data.accessToken;
                                eachDate=data.time.substring(0,10);
                                //history.pushState("","",LOCALHOST_URL+'/web-bin/m/followup/followupTask/to_followUp_page?eachDate='+eachDate+'&usId='+usId+'&accessToken='+accessToken+'&hgId='+hgId);
                                sessionStorage.setItem("usId",usId);
                                sessionStorage.setItem("eachDate",eachDate);
                                sessionStorage.setItem("hgId",hgId);
                                sessionStorage.setItem("accessToken",accessToken);
                                $("#login").hide();
                                $("#container").show();
                                contentShow();
                            }else{
                                alert("登录失败"+data.msg);
                            }
                        }
                    });
                }
            }
        });
        $(".login_content .active").click(function(){
            // alert("发送验证码");
            var tel=$("#tel").val();
            if(tel==""){
                art.dialog({
                    content:"请填写手机号！",
                    time:1.5,
                    icon:"warning"
                });
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
                        console.log(data);
                    }
                });
                //判断是否有随访账号
                $.ajax({
                    on: true,
                    timeout:60000,
                    type:"get",
                    url: LOCALHOST_URL+'/web-bin/m/followup/followupTask/get_user_info?phone='+tel,
                    dataType:"json",
                    success: function(data){
                        console.log(data);
                        alert(JSON.stringify(data));
                        if(data.data&&data.res==0){
                            if(data.data.interviewUser!==""){
                                $(".login_content ul li.token,.login_content ul li.pwd").hide();
                            }else{
                                $(".login_content ul li.token,.login_content ul li.pwd").show();
                            }
                        }
                    }
                });
            }
        });
    }
}
function contentShow(){
    // 业务逻辑
    if($("#container").css("display")!=="none"){
        hgId=query.hgId||sessionStorage.getItem("hgId");
        accessToken=query.accessToken||sessionStorage.getItem("accessToken");
        $(".bottom").show();
        pageResize();
        $(".main_body").niceScroll({
            railpadding : {top : 0,right : 0,left : 0,bottom : 0}
        });
        $(".education_btn").unbind('click').click(function(){
            $(this).addClass("active");
            $(".followup_btn").removeClass("active");
            $("#container").hide();
            $("#educationBox").show();
            educationShow();
        });
        //跳转到已完成随访页面
        $(".finish").unbind("click").click(function(){
            $(".border_bottom").removeClass("border_bottom");
            $(this).addClass("border_bottom");
            fromType=3;
            btnTab();
        });
        //跳转到待随访页面
        $("#wait").unbind("click").click(function(){
            $(".border_bottom").removeClass("border_bottom");
            $(this).addClass("border_bottom");
            fromType=2;
            btnTab();
        });
        //首次加载
        loadAjax();
        //跳转到处理随访任务页面
        $(".main_body").on("click",".followup_button",function () {
            var hospCode=$("#hospCode").val();
            var $parent=$(this).parents(".item");
            var inHosNo=$parent.find(".inHosNo").val();
            var visitCardNo=$parent.find(".visitCardNo").val();
            var mobileNo=$parent.find(".mobileNo").val();
            var name=$parent.find(".name").text();
            var sex=$parent.find(".sex").text();
            var age=$parent.find(".age").text();
            var form=$parent.find(".list").html();
            var id=$parent.find(".form_id").val();
            console.log(form);
            var revisitResult=$(this).parents(".item").find(".revisitResult").val();
            console.log(revisitResult);
            if(revisitResult==1){
                var result='&name='+name+'&sex='+sex+'&age='+age+'&form='+form+'&id='+id+'&hgId='+hgId+'&hospCode='+hospCode+'&inHosNo='+inHosNo+'&visitCardNo='+visitCardNo+'&mobileNo='+mobileNo+"&fromType=3";
            }else{
                var result='&name='+name+'&sex='+sex+'&age='+age+'&form='+form+'&id='+id+'&hgId='+hgId+'&hospCode='+hospCode+'&inHosNo='+inHosNo+'&visitCardNo='+visitCardNo+'&mobileNo='+mobileNo+"&fromType=2";
            }
            console.log(result);
            location.href = LOCALHOST_URL+'/web-bin/m/followup/followupTask/to_processingFollowupTask_page?eachDate='+eachDate+'&usId='+usId+'&accessToken='+accessToken+result;
        });
        //跳转到查看随访任务页面
        $(".main_body").on("click",".check_button",function () {
            var hospCode=$("#hospCode").val();
            var $parent=$(this).parents(".item");
            var inHosNo=$parent.find(".inHosNo").val();
            var visitCardNo=$parent.find(".visitCardNo").val();
            var name=$parent.find(".name").text();
            var sex=$parent.find(".sex").text();
            var age=$parent.find(".age").text();
            var form=$parent.find(".list").html();
            var id=$parent.find(".form_id").val();
            var empiId=$parent.find(".empiId").val();
            var handlingOpinion=$parent.find(".handlingOpinion").val();
            var plantimeStr=$parent.find(".date").text();
            var revisitResult=$(this).parents(".item").find(".revisitResult").val();
            console.log(revisitResult);
            if(revisitResult==1){
                var result='&name='+name+'&sex='+sex+'&age='+age+'&form='+form+'&id='+id+'&empiId='+empiId+'&handlingOpinion='+handlingOpinion+'&plantimeStr='+plantimeStr+'&hospCode='+hospCode+'&inHosNo='+inHosNo+'&visitCardNo='+visitCardNo+"&fromType=3";
            }else{
                var result='&name='+name+'&sex='+sex+'&age='+age+'&form='+form+'&id='+id+'&empiId='+empiId+'&handlingOpinion='+handlingOpinion+'&plantimeStr='+plantimeStr+'&hospCode='+hospCode+'&inHosNo='+inHosNo+'&visitCardNo='+visitCardNo+"&fromType=2";
            }
            console.log(result);
            location.href = LOCALHOST_URL+'/web-bin/m/followup/followupTask/to_checkFollowupTask_page?eachDate='+eachDate+'&usId='+usId+'&accessToken='+accessToken+result;
        });
        //跳转到随访任务详情页面
        $(".main_body").on("click",".sub_tit",function(){
            var f=0;
            if($(this).parent().hasClass('flag')){
                f=1
            }
            console.log(f);
            var $parent=$(this).parents(".item");
            var empiId=$parent.find(".empiId").val();
            var planId=$parent.find(".planId").val();
            var revisitResult=$parent.find(".revisitResult").val();
            if(revisitResult==1){
                var result='&empiId='+empiId+'&planId='+planId+'&flag='+f+"&fromType=3";
            }else{
                var result='&empiId='+empiId+'&planId='+planId+'&flag='+f+"&fromType=2";
            }
            location.href = LOCALHOST_URL+'/web-bin/m/followup/followupTask/to_followupPlanDetail_page?eachDate='+eachDate+'&usId='+usId+'&accessToken='+accessToken+result;
        });
        //跳转到医疗档案
        $(".main_body").on("click",".base_info",function () {
            var name=$(this).find(".name").text();
            var sex=$(this).find(".sex").text();
            var age=$(this).find(".age").text();
            var hospCode=$("#hospCode").val();
            console.log(hospCode);
            var inHosNo=$(this).find(".inHosNo").val();
            var visitCardNo=$(this).find(".visitCardNo").val();
            var revisitResult=$(this).parents(".item").find(".revisitResult").val();
            console.log(revisitResult);
            if(revisitResult==1){
                var result="&name="+name+"&sex="+sex+"&age="+age+"&fromType=3";
            }else{
                var result="&name="+name+"&sex="+sex+"&age="+age+"&fromType=2";
            }
            console.log(result);
            location.href = LOCALHOST_URL+'/web-bin/m/followup/followupTask/to_medicalRecordList_page?hospCode='+hospCode+'&usId='+usId+'&accessToken='+accessToken+'&inHosNo='+inHosNo+'&visitCardNo='+visitCardNo+result;
        });

        $(".main_body").height(document.documentElement.clientHeight-111);

    }
}
function loadAjax(){
    $.ajax({
        on: true,
        timeout:60000,
        type:"get",
        url: LOCALHOST_URL+'/web-bin/m/followup/followupTask/query_followUp_data?eachDate='+eachDate+'&usId='+usId+'&accessToken='+accessToken,
        beforeSend:function(XMLHttpRequest ){
            //加载中
            $(".wait_followup").html('<div class="load_followup"><img src="/web-bin/mobile/followup/followupTask/img/loading.gif"/><div>');
        },
        dataType:"json",
        success: function(data){//alert(JSON.stringify(data));
            console.log(data);
            if(data.data&&data.res==0){
                $("#hospCode").val(data.data.hosp.hospCode);
                callBack(data);
            }
        }
    });
}
function callBack(data){//alert(new Date());
    if(data.data.list && data.data.list.length>0){
        for(var i=0;i<data.data.list.length;i++){
            if(data.data.list[i].revisitPlanTime==""){
                data.data.list[i].revisitPlanTime=data.data.time.substring(0,10);
            }
            if(data.data.list[i].sexName=="女"){
                data.data.list[i].src="/web-bin/resources/images/woman.png";
            }else{
                data.data.list[i].src="/web-bin/resources/images/men.png";
            }
            data.data.list[i].plantimeStr=timeStr(data.data.list[i].revisitPlanTime);
        }
        data.data.list.sort(compare("revisitPlanTime"));
        $(".wait_followup").html("").setTemplateElement("Template-followUp").processTemplate(data.data.list);
        //alert(new Date());
        $("#loading").hide();
        btnTab();
    }
}
function btnTab(){
    if(fromType==3){
        $(".item[data-role=0]").hide();
        $(".item[data-role=1]").show();
        $(".finish").addClass("border_bottom");
        $("#wait").removeClass("border_bottom");
    }else{
        $(".item[data-role=1]").hide();
        $(".item[data-role=0]").show();
        $("#wait").addClass("border_bottom");
        $(".finish").removeClass("border_bottom");
    }
}
var time=60;
function timeCount(){
    time--;
    $(".vcode_btn").text(time+  "s").removeClass("active").addClass("gray");
    var Timer=setTimeout(timeCount,1000);
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
        $(".bottom").show();
        pageResize();
        $(".main_body").niceScroll({
            railpadding : {top : 0,right : 0,left : 0,bottom : 0}
        });
        $(".followup_btn").unbind('click').click(function(){
            $(this).addClass("active");
            $(".education_btn").removeClass("active");
            $("#container").show();
            $("#educationBox").hide();
            contentShow();
        });
        // alert("firstLoad..."+LOCALHOST_URL+'/web-bin/m/followup/followupTask/query_doctor_power?usId='+usId+'&accessToken='+accessToken);
        $.ajax({
            on: true,
            timeout:60000,
            type:"get",
            url: LOCALHOST_URL+'/web-bin/m/followup/followupTask/query_doctor_power?usId='+usId+'&accessToken='+accessToken,
            dataType:"json",
            success: function(data){
                console.log(data);
                // alert(JSON.stringify(data));
                if(data.data&&data.res==0){
                    callBack3(data);
                }else{
                    //alert(JSON.stringify(data));
                }
            }
        });
        //输入框
        $(".searchInput").focus(function(){
            $(".search").css({width:"80%",marginLeft:"0.09rem"});
            $(".cancle").show();
            $(".search_res").show();
            $(".bottom").hide();
        }).on('input',function(){
            $(".input_mes span").html($(".searchInput").val());
        });

        //取消按钮
        $(".cancle").click(function(e){
            pageResize();
            $(".searchInput").val("").blur();
            $(".search").css({width:"95%",margin:'0.1rem auto'});
            $(".searchList_result").html("");
            $(".input_mes span").html("");
            $(".search_res").hide();
            $(".null_mes").hide();
            $(".cancle").hide();
            $(".bottom").show();
        });
        //搜索按钮
        $(".input_mes").click(function(){
            pageResize();
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
                        console.log(data);
                        if (data.data) {
                            if (data.data.result.length==0) {
                                $(".null_mes").html('没有匹配结果').show();
                                $(".searchList_result").html("");
                            }else{
                                $(".null_mes").hide();
                                $(".searchList_result").setTemplateElement("template_searchList").processTemplate(data.data.result).append("<div style='text-align: center;font-size:12px;line-height:1;height:15px;'>已经到底啦！</div>");
                            }
                        }
                    }
                });
            } else {
                $(".null_mes").html('请输入查询内容').show();
                $(".searchList_result").html("");
            }
        });
        // 点击跳转详情
        $("#educationBox .main_body,.searchList_result").on("click",".item",function(){
            var $this=$(this);
            var bed=$this.find(".bed").text();
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
            location.href = LOCALHOST_URL+'/web-bin/m/followup/followupTask/to_educationDetail_page?bed='+bed+'&wardName='+wardName+'&admitDate='+admitDate+'&patName='+patName+"&phone="+phone+"&inhospNo="+inhospNo+"&idCard="+idCard+"&deptCode="+deptCode+"&deptName="+deptName+"&wardCode="+wardCode+"&visitCardNo="+visitCardNo+"&patIndexNo="+patIndexNo+"&inhospSerialNo="+inhospSerialNo+'&usId='+usId+'&accessToken='+accessToken+"&romType=1";
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
            deptcodes=data.data.deptCodes.split(",");
            deptcodes=JSON.stringify(deptcodes);
            deptCode="&deptCode="+deptcodes;
            var url=LOCALHOST_URL+'/web-bin/m/followup/followupTask/query_inHosp_data?usId='+usId+'&accessToken='+accessToken+"&inhospStatus=false"+deptCode;
            loadData(url);
            return;
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
        success: function(data){
            console.log(data);
            // alert(JSON.stringify(data));
            if(data.data.result.length>0){
                $(".pat").setTemplateElement("Template-Education").processTemplate(data.data.result);
                $("#loading").hide();
                // locScroll();
            }else{
                //alert(JSON.stringify(data));
            }
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
    console.log(document.documentElement.clientHeight);
    $(".main_body").height(document.documentElement.clientHeight-115);
    $(".search_body").height(document.documentElement.clientHeight-60);
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
// // 记录位置
// function locRecord(loc){
//     sessionStorage.setItem("loc",loc);
// }
// // 更新位置
// function locScroll(){
//     if(sessionStorage.getItem("loc")){
//         var loc= sessionStorage.getItem("loc");
//         console.log(loc);
//         $(".main_body").animate({scrollTop:loc},0);
//     }
// }