var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var SERVER_URL=window.HUGPAGE_CONFIG.SERVER_URL;
var FILE_URL=window.HUGPAGE_CONFIG.FILE_URL;
var query=getRequest();
var usId=query.usId||sessionStorage.getItem("usId");
var hgId=query.hgId||sessionStorage.getItem("hgId");
var accessToken=query.accessToken||sessionStorage.getItem("accessToken");
var pageNumber=1;//需要加载的页码标号
var pageSize=10;//每页的数据条数
var page="&pageNumber="+pageNumber+"&pageSize="+pageSize;//待拼凑的url参数
var hasNextPage=true;
var deptcodes=new Array();
var deptCode="&deptCode="+deptcodes;
var fromType=sessionStorage.getItem("fromType");
var partnerType=query.partnerType||sessionStorage.getItem("partnerType");
var time=new Date();
var year=time.getFullYear();
var month=(time.getMonth()+1)>9?time.getMonth()+1:'0'+(time.getMonth()+1);
var date=time.getDate()>9?time.getDate():'0'+time.getDate();
var followupDate=year.toString()+'-'+month.toString()+'-'+date.toString();
var queryDate="&beginDate="+followupDate+"&endDate="+followupDate;
var filterDates=sessionStorage.filterDate?JSON.parse(sessionStorage.filterDate):[];
if(filterDates && filterDates.filterDate){
    queryDate=filterDates.filterDate;
}
$(function(){
    sessionStorage.setItem("usId",usId);
    sessionStorage.setItem("hgId",hgId);
    sessionStorage.setItem("accessToken",accessToken);
    sessionStorage.setItem("fromType",fromType);
    //禁止iPhone的缩放，弹性滚动
    window.onload=function(){
        document.addEventListener('touchstart',function (event) {
            if(event.touches.length>1){
                event.preventDefault();
            }
        });
        var lastTouchEnd=0;
        document.addEventListener('touchend',function(event){
            var now=(new Date()).getTime();
            if(now-lastTouchEnd<=300){
                event.preventDefault();
            }
            lastTouchEnd=now;
        },false);
        document.body.addEventListener('touchmove', function (e) {
            e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
        }, {passive: false});
    };
    contentShow();
    $(".search_left").click(function(){
        $(".search_body").show();
        $(".search_result_box").html("");
    });
    $(".cancle").click(function(){
        $(".search_body").hide();
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
        $(".date_input_box input").val("");
    });
    $(".week_day").click(function(){
        getBeforeDate(7);
        queryDate="&beginDate="+filterDate+"&endDate="+followupDate;
        $(".date_input_box input").val("");
    });
    $(".other_day").click(function(){
        $(".begin_date").calendar();
    });
    $(".begin_date").click(function(){
        $(".other_day").click();
    });
    $(".begin_date").calendar();
    $(".ended_date").calendar();
    $(".sure_filter").click(function(){
        if($(".other_day").hasClass("filter_tag_selected")){
             if($(".begin_date").val()=="" || $(".ended_date").val()==""){
                 $.alert("请输入开始日期和结束日期");
                 return fasle;
             }
        }
        if($(".other_day").hasClass("filter_tag_selected")){
            queryDate="&beginDate="+$(".begin_date").val()+"&endDate="+$(".ended_date").val();
        }
        $(".filter_body").hide();
        var filterDate={
            filterDate:queryDate
        };
        sessionStorage.filterDate=JSON.stringify(filterDate);
        if($("#wait").hasClass("border_bottom")){
            $("#wait").click();
        }else{
            $(".finish").click();
        }
    });
    // 滚动加载
    $(".main_body").infinite(50);
    var loading = false;  //状态标记
    $(".main_body").infinite().on("infinite", function() {
        if(loading) return;
        loading = true;
        setTimeout(function() {
            pageNumber+=1;
            if($("#wait").hasClass("border_bottom")){
                var revisitResult=0;
            }else{
                var revisitResult=1;
            }
            $.ajax({
                on: true,
                timeout:60000,
                type:"get",
                url: LOCALHOST_URL+'/web-bin/m/followup/healthCare/query_followUp_data?usId='+usId+'&accessToken='+accessToken+'&partnerType='+partnerType+"&pageNumber="+pageNumber+"&pageSize="+pageSize+'&revisitResult='+revisitResult+queryDate,
                dataType:"json",
                success: function(data){//alert(JSON.stringify(data));
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
                            console.log(data.data.pageInfo.list)
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
                            console.log(data.data.pageInfo.list)
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
    // 搜索之滚动加载
    $(".search_result_box").infinite(50);
    var loading = false;  //状态标记
    $(".search_result_box").infinite().on("infinite", function() {
        if(loading) return;
        loading = true;
        var patName=$(".searchInput").val();
        setTimeout(function() {
            pageNumber+=1;
            if($("#wait").hasClass("border_bottom")){
                var revisitResult=0;
            }else{
                var revisitResult=1;
            }
            $(".search_result_box").append('<div class="weui-loadmore" ><i class="weui-loading"></i><span class="weui-loadmore__tips">正在加载...</span></div>')
            $.ajax({
                on: true,
                timeout:60000,
                type:"get",
                url: LOCALHOST_URL+'/web-bin/m/followup/healthCare/query_followUp_data?usId='+usId+'&accessToken='+accessToken+'&partnerType='+partnerType+"&pageNumber="+pageNumber+"&pageSize="+pageSize+'&revisitResult='+revisitResult+'&patName='+patName+queryDate,
                dataType:"json",
                success: function(data){//alert(JSON.stringify(data));
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
                            console.log(data.data.pageInfo.list)
                            $.each(data.data.pageInfo.list,function(i,item){
                                $(".search_result_box").append('<div class="item" data-role="0"><input type="hidden" class="revisitResult" value='+item.revisitResult+'><input type="hidden" value='+item.id+' class="form_id"><input type="hidden" value="'+item.empiId+'" class="empiId"><div class="base_info"><input type="hidden" class="inHosNo" value="'+item.inHosNo+'"><input type="hidden" class="visitCardNo" value='+item.visitCardNo+'><input type="hidden" class="mobileNo" value="'+item.mobileNo+'"><span class="per_img"><img src='+item.src+' alt="头像"></span><div class="base_smInfo_box"><div class="base_sm_info"> <span class="name">'+item.patName+'</span></div><div class="base_sm_info sex_age"><span class="sex">'+item.sexName+'</span><span class="age">'+item.age+'岁</span></div></div></div><div class="subject"><div class="flag"> <input type="hidden" value='+item.planId+' class="planId"><span class="sub_tit">'+item.planName+'</span><div class="date"><span>'+item.plantimeStr+'</span><div class="right_gray_arrow"></div></div></div><div class="list">'+item.formTitle+'<div class="followup_button">随访</div></div></div></div>')
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
                            console.log(data.data.pageInfo.list)
                            $.each(data.data.pageInfo.list,function(i,item){
                                $(".search_result_box").append('<div class="item" data-role="0"><input type="hidden" class="revisitResult" value='+item.revisitResult+'><input type="hidden" value='+item.id+' class="form_id"><input type="hidden" value="'+item.empiId+'" class="empiId"><div class="base_info"><input type="hidden" class="inHosNo" value="'+item.inHosNo+'"><input type="hidden" class="visitCardNo" value='+item.visitCardNo+'><input type="hidden" class="mobileNo" value="'+item.mobileNo+'"><span class="per_img"><img src='+item.src+' alt="头像"></span><div class="base_smInfo_box"><div class="base_sm_info"> <span class="name">'+item.patName+'</span></div><div class="base_sm_info sex_age"><span class="sex">'+item.sexName+'</span><span class="age">'+item.age+'岁</span></div></div></div><div class="subject"><div class="flag"> <input type="hidden" value='+item.planId+' class="planId"><span class="sub_tit">'+item.planName+'</span><div class="date"><span>'+item.plantimeStr+'</span><div class="right_gray_arrow"></div></div></div><div class="list">'+item.formTitle+'<div class="check_button">查看</div></div></div></div>')
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
    $(".searchInput").on('input',function(){
        $(".cancle").hide();
        $(".search_follow").show();
        if(!$(this).val()){
            $(".cancle").show();
            $(".search_follow").hide();
        }
    });
    $(".search_follow").click(function(){
        var searchValue=$(".searchInput").val();
        if($("#wait").hasClass("border_bottom")){
            var revisitResult=0;
        }else{
            var revisitResult=1;
        }
        loadSearchAjax(revisitResult,searchValue)
    });
});
function contentShow(){
    // 随访逻辑
    loginHeight();
    $(document).resize(function(){
        loginHeight();
    });
    hgId=query.hgId||sessionStorage.getItem("hgId");
    accessToken=query.accessToken||sessionStorage.getItem("accessToken");
    partnerType=query.partnerType||sessionStorage.getItem("partnerType");
    $(".bottom").show();
    pageResize();
    $(".main_body,.search_result_box").niceScroll({
        cursoropacitymin: 0,
        cursoropacitymax: 0,
    });
    //跳转到已完成随访页面
    $(".finish").unbind("click").click(function(){
        $(".border_bottom").removeClass("border_bottom");
        $(this).addClass("border_bottom");
        sessionStorage.setItem("fromType",3);
        fromType=3;
        btnTab();
    });
    //跳转到待随访页面
    $("#wait").unbind("click").click(function(){
        $(".border_bottom").removeClass("border_bottom");
        $(this).addClass("border_bottom");
        sessionStorage.setItem("fromType",2);
        fromType=2;
        btnTab();
    });
    $("#wait").click();
    //跳转到处理随访任务页面
    $(".search_result_box,.main_body").on("click",".followup_button",function () {
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
        var revisitResult=$(this).parents(".item").find(".revisitResult").val();
        console.log(revisitResult);
        if(revisitResult==1){
            sessionStorage.setItem("fromType",3);
            var result='&name='+name+'&sex='+sex+'&age='+age+'&form='+formStr+'&id='+id+'&hgId='+hgId+'&hospCode='+hospCode+'&inHosNo='+inHosNo+'&visitCardNo='+visitCardNo+'&mobileNo='+mobileNo+"&fromType=3";
        }else{
            sessionStorage.setItem("fromType",2);
            var result='&name='+name+'&sex='+sex+'&age='+age+'&form='+formStr+'&id='+id+'&hgId='+hgId+'&hospCode='+hospCode+'&inHosNo='+inHosNo+'&visitCardNo='+visitCardNo+'&mobileNo='+mobileNo+"&fromType=2";
        }
        location.href =LOCALHOST_URL+'/web-bin/m/followup/healthCare/to_processingFollowupCommon_page?usId='+usId+'&accessToken='+accessToken+'&partnerType='+partnerType+result;
    });
    //跳转到查看随访任务页面
    $(".search_result_box,.main_body").on("click",".check_button",function () {
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
        console.log(revisitResult);
        if(revisitResult==1){
            sessionStorage.setItem("fromType",3);
            var result='&name='+name+'&sex='+sex+'&age='+age+'&form='+formStr+'&id='+id+'&empiId='+empiId+'&handlingOpinion='+handlingOpinion+'&hgId='+hgId+'&plantimeStr='+plantimeStr+'&hospCode='+hospCode+'&inHosNo='+inHosNo+'&visitCardNo='+visitCardNo+"&fromType=3";
        }else{
            sessionStorage.setItem("fromType",2);
            var result='&name='+name+'&sex='+sex+'&age='+age+'&form='+formStr+'&id='+id+'&empiId='+empiId+'&handlingOpinion='+handlingOpinion+'&hgId='+hgId+'&plantimeStr='+plantimeStr+'&hospCode='+hospCode+'&inHosNo='+inHosNo+'&visitCardNo='+visitCardNo+"&fromType=2";
        }
        console.log(result);
        location.href = LOCALHOST_URL+'/web-bin/m/followup/healthCare/to_checkFollowupCommon_page?usId='+usId+'&accessToken='+accessToken+'&partnerType='+partnerType+result;
    });
    //跳转到随访任务详情页面
    $(".search_result_box,.main_body").on("click",".flag",function(){
        var f=0;
        if($(this).hasClass('closeCase')){
            f=1
        }
        var $parent=$(this).parents(".item");
        var empiId=$parent.find(".empiId").val();
        var planId=$parent.find(".planId").val();
        var revisitResult=$parent.find(".revisitResult").val();
        if(revisitResult==1){
            sessionStorage.setItem("fromType",3);
            var result='&empiId='+empiId+'&planId='+planId+'&flag='+f+"&fromType=3";
        }else{
            sessionStorage.setItem("fromType",2);
            var result='&empiId='+empiId+'&planId='+planId+'&flag='+f+"&fromType=2";
        }
        location.href = LOCALHOST_URL+'/web-bin/m/followup/healthCare/to_followupPlanDetail_page?usId='+usId+'&accessToken='+accessToken+'&partnerType='+partnerType+result+"&hgId="+hgId;
    });
    //跳转到医疗档案
    $(".search_result_box,.main_body").on("click",".base_info",function () {
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
            sessionStorage.setItem("fromType",3);
            var result="&name="+name+"&sex="+sex+"&age="+age+"&fromType=3";
        }else{
            sessionStorage.setItem("fromType",2);
            var result="&name="+name+"&sex="+sex+"&age="+age+"&fromType=2";
        }
        location.href = LOCALHOST_URL+'/web-bin/m/followup/healthCare/to_medicalRecordList_page?hospCode='+hospCode+'&usId='+usId+'&accessToken='+accessToken+'&partnerType='+partnerType+'&inHosNo='+inHosNo+'&visitCardNo='+visitCardNo+result+"&hgId="+hgId;
    });

    $(".main_body").height(document.documentElement.clientHeight-111);
}
function loadSearchAjax(revisitResult,patName){
    $.ajax({
        on: true,
        timeout:60000,
        type:"get",
        url: LOCALHOST_URL+'/web-bin/m/followup/healthCare/query_followUp_data?usId='+usId+'&accessToken='+accessToken+'&partnerType='+partnerType+page+'&revisitResult='+revisitResult+'&patName='+patName+queryDate,
        beforeSend:function(XMLHttpRequest){
            //加载中
            $(".search_result_box").html('<div class="load_followup"><img src="/web-bin/mobile/followup/healthCare/img/loading.gif"/></div>');
        },
        dataType:"json",
        success: function(data){//alert(JSON.stringify(data));
            $(".load_followup").hide();
            if(data.data && data.res==0){
                if(!data.data.pageInfo){
                    $(".weui-loadmore").remove()
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

                    if($(".search_result_box").find(".item").length>=10){
                        $(".search_body").append('<div class="weui-loadmore" ><i class="weui-loading"></i><span class="weui-loadmore__tips">正在加载...</span></div>')
                    }
                }else{
                    // contentTab();
                    $(".weui-loadmore").remove()
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
function loadAjax(revisitResult){
    $(".weui-loadmore").remove();
    $.ajax({
        on: true,
        timeout:60000,
        type:"get",
        url: LOCALHOST_URL+'/web-bin/m/followup/healthCare/query_followUp_data?usId='+usId+'&accessToken='+accessToken+'&partnerType='+partnerType+page+'&revisitResult='+revisitResult+queryDate,
        beforeSend:function(XMLHttpRequest){
            //加载中
            $(".wait_followup").html('<div class="load_followup"><img src="/web-bin/mobile/followup/healthCare/img/loading.gif"/></div>');
        },
        dataType:"json",
        success: function(data){//alert(JSON.stringify(data));
            $(".load_followup").hide();
            if(data.data && data.res==0){
                $("#hospCode").val(data.data.hospCode);
                callBack(data);
            }else{
                $.alert(JSON.stringify(data));
            }
        },
        complete:function(){
            $(".wait_followup .load_followup").remove();
        }
    });
}
function callBack(data){//alert(new Date());
    if(!data.data.pageInfo){
        $(".weui-loadmore").remove()
        $(".wait_followup").append('<div id="none">'+
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
        $(".wait_followup").html("").setTemplateElement("Template-followUp").processTemplate(data.data.pageInfo.list);
        $(".weui-loadmore").remove();
        if($(".main_body").find(".item").length>=10){
            $(".main_body").append('<div class="weui-loadmore" ><i class="weui-loading"></i><span class="weui-loadmore__tips">正在加载...</span></div>')
        }
    }else{
        // contentTab();
        $(".weui-loadmore").remove()
        $(".wait_followup").append('<div id="none">'+
            '<img src="/web-bin/resources/images/nodata2x.png">'+
            '<p>暂无数据</p>'+
            '</div>');
    }
}
function btnTab(){
    if(fromType==3){
        // $(".item[data-role=0]").hide();
        $("#none").remove();
        // $(".item[data-role=1]").show();
        $(".finish").addClass("border_bottom");
        $("#wait").removeClass("border_bottom");
        loadAjax(1)
    }else{
        // $(".item[data-role=1]").hide();
        $("#none").remove();
        // $(".item[data-role=0]").show();
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
function callBack3(data){
    console.log(data.data.viewAuth);
    if(data.data.viewAuth == 1){
        var url=LOCALHOST_URL+'/web-bin/m/followup/healthCare/query_inHosp_data?usId='+usId+'&accessToken='+accessToken+'&partnerType='+partnerType+"&inhospStatus=false";
        loadData(url);
        return;
    }else {
        console.log(data.data.wardFlag);
        if(data.data.wardFlag == 1){
            if(data.data.deptCodes == "all"){
                var url=LOCALHOST_URL+'/web-bin/m/followup/healthCare/query_inHosp_data?usId='+usId+'&accessToken='+accessToken+'&partnerType='+partnerType+"&inhospStatus=false";
                loadData(url);
                return;
            }else {
                deptcodes=data.data.deptCodes.split(",");
                deptcodes=JSON.stringify(deptcodes);
                deptCode="&deptCode="+deptcodes;
                var url=LOCALHOST_URL+'/web-bin/m/followup/healthCare/query_inHosp_data?usId='+usId+'&accessToken='+accessToken+'&partnerType='+partnerType+"&inhospStatus=false"+deptCode;
                loadData(url);
                return;
            }
        }else {
            if(data.data.deptCodes == "all"){
                var url=LOCALHOST_URL+'/web-bin/m/followup/healthCare/query_inHosp_data?usId='+usId+'&accessToken='+accessToken+'&partnerType='+partnerType+"&inhospStatus=false";
                loadData(url);
                return;
            }else {
                deptcodes = data.data.deptCodes.split(",");
                deptcodes = JSON.stringify(deptcodes);
                deptCode = "&wardCode=" + deptcodes;
                var url = LOCALHOST_URL + ':' + PORT + '/web-bin/m/followup/healthCare/query_inHosp_data?usId=' + usId + '&accessToken=' + accessToken+'&partnerType='+partnerType + "&inhospStatus=false" + deptCode;
                loadData(url);
                return;
            }
        }
    }
}
function loadData(url){
    $.ajax({
        on: true,
        timeout:60000,
        type:"get",
        url: url+page,
        dataType:"json",
        success: function(data){
            console.log(data);
            // alert(JSON.stringify(data));
            if(data.data && data.data.result.length>0){
                $(".pat").setTemplateElement("Template-Education").processTemplate(data.data.result);
                pageResize();
            }else{
                $('.pat').html('<div id="none">'+
                    '<img src="/web-bin/resources/images/nodata2x.png">'+
                    '<p>暂无数据</p>'+
                    '</div>');
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
        pageResize();
    }
}
function pageResize(){
    console.log(document.documentElement.clientHeight);
    $(".main_body").height($(window).height()-$(".top").height()-$(".function_box").height());
    $(".search_body").height($(window).height()-$(".top").height());
    $(".search_result_box").height($(window).height()-$(".top").height()-56);
    $(".filter_body").height($(window).height()-$(".top").height());
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
function loginHeight(){
    var login_top=$(".login_header").height()+10;
    $(".login_content").css({'margin-top':login_top});
}
