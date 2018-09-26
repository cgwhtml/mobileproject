/**
 * Created by CGT on 2017/7/6.
 */localhostUrl=window.location.origin;
var query=getRequest();
console.log(query);
var hospCode=sessionStorage.getItem("hospCode");
var usId=sessionStorage.getItem("usId");
var accessToken=sessionStorage.getItem("accessToken");
var deptCode=query.deptCode;
var staffCode=query.staffCode;
var staffName=decodeURI(query.staffName);
var titleName=decodeURI(query.titleName);
var deptName=decodeURI(query.deptName);
var hospName;
$(function(){
    console.log(staffName);
    console.log(titleName);
    console.log(deptName);
    console.log(hospCode);
    console.log(usId);
    console.log(accessToken);
    $(".content").height($(window).height()-$(".header").height()-10);
    $(".content").niceScroll({
        cursoropacitymin: 0,
        cursoropacitymax: 0
    });
    //查询医院名字
    $.ajax({
        on: true,
        type:"get",
        url:localhostUrl+'/web-bin/m/weChat/weChatPublic/query_hospName_data?hospCode='+hospCode,
        dataType:"json",
        success: function(data){
            console.log(data);
            if(data.data&&data.res==0){
                hospName=data.data[0].name;
            }
        }
    });
    if(staffCode){
        $(".header .doctor_name h2 b,.footer .doctor_name h2 b").text(staffName);
        $(".header .doctor_name h2 span,.footer .doctor_name h2 span").text(titleName);
        if(query.schDate){
            var schDate=query.schDate;
            var url=localhostUrl+'/web-bin/m/weChat/WeChatPublic/get_appointList_data?hospCode='+hospCode+"&deptCode="+deptCode+"&schDate="+schDate+"&staffCode="+staffCode+"&deptName="+deptName+"&staffName="+staffName;
        }else{
            var url=localhostUrl+'/web-bin/m/weChat/WeChatPublic/get_appointList_data?hospCode='+hospCode+"&deptCode="+deptCode+"&staffCode="+staffCode+"&deptName="+deptName+"&staffName="+staffName;
        }
    }else{
        $(".header .doctor_name h2 b,.footer .doctor_name h2 b").text(deptName);
        var url=localhostUrl+'/web-bin/m/weChat/WeChatPublic/get_appointList_data?hospCode='+hospCode+"&deptCode="+deptCode+"&deptName="+deptName;
    }
    console.log(url);
    $.ajax({
        on: true,
        type:"get",
        url:url,
        dataType:"json",
        success: function(data){
            console.log(data);
            if(data&&data.res==0){
                CallBack(data);
            }else{
                alert(data.msg);
            }
        }
    });
    // 点击关闭弹出框
    $(".box_close").click(function(event){
        $(".footer").hide();
        window.location.reload();
        event.stopPropagation();
    });
    //获取余号详情
    $("body").on("tap",".allow_appoint",function(event){
        var schId=$(this).siblings(".schId").val();
        var regFee=$(this).siblings(".regFee").val();
        if(staffCode){
            var url=localhostUrl+'/web-bin/m/weChat/WeChatPublic/get_appointDetail_data?hospCode='+hospCode+"&deptCode="+deptCode+"&staffCode="+staffCode+"&schId="+schId
        }else{
            var url=localhostUrl+'/web-bin/m/weChat/WeChatPublic/get_appointDetail_data?hospCode='+hospCode+"&deptCode="+deptCode+"&schId="+schId
        }
        $.ajax({
            on: true,
            type:"get",
            url:url,
            dataType:"json",
            success: function(data){
                console.log(data);
                if(data.data&&data.res==0){
                    CallBack2(data);
                    $(".footer .schId").val(schId);
                    $(".footer .regFee").val(regFee);
                }
            }
        });
        event.stopPropagation();
    });
    // 点击确认预约
    $("body").on("tap",".footer_list ul li",function(event){
        var schId=$(this).parents(".footer").find(".schId").val();
        var takeIndex=$(this).find(".takeIndex").text();
        var schDate=$(".footer").find(".schDate").text();
        var dayStr=$(".footer").find(".dayStr").text();
        var expectStime=$(this).find(".expectStime").text();
        var regFee=$(this).parents(".footer").find(".regFee").val();
        if(query.staffCode){
            location.href = localhostUrl+"/web-bin/m/weChat/WeChatPublic/to_appointConfirm_page?schId="+schId+"&takeIndex="+takeIndex+"&hospCode="+hospCode+"&staffName="+staffName+"&schDate="+schDate+"&dayStr="+dayStr+"&expectStime="+expectStime+"&regFee="+regFee+"&deptName="+deptName+"&pageShow=0";
        }else{
            location.href = localhostUrl+"/web-bin/m/weChat/WeChatPublic/to_appointConfirm_page?schId="+schId+"&takeIndex="+takeIndex+"&hospCode="+hospCode+"&schDate="+schDate+"&dayStr="+dayStr+"&expectStime="+expectStime+"&regFee="+regFee+"&deptName="+deptName+"&pageShow=0";
        }
        event.stopPropagation();
    });
});
function CallBack(data){
    $("#hospName").text(hospName);
    for(var i=0;i<data.data.length;i++){
        var $this=data.data[i];
        if($this.dayType==1){
            $this.dayStr="上午";
        }else if($this.dayType==2){
            $this.dayStr="下午";
        }
        $this.registered=$this.totalNo-$this.remainNo;
    }
    $(".content").setTemplateElement("content_temp").processTemplate(data.data);
    var Clength=$(".content ul li").length;
    for(var i=0;i<Clength;i++){
        var $this=$(".content ul li").eq(i);
        var remainNo=parseInt($this.find(".remainNo").text());
        if(remainNo!==0){
            console.log(0);
            $this.find(".con_right").addClass("allow_appoint");
        }else{
            console.log(1);
            $this.find(".con_right").addClass("no_appoint");
        }
    }
}
function CallBack2(data){
    if(data.data.dayType==1){
        data.data.dayStr="上午";
    }else if(data.data.dayType==2){
        data.data.dayStr="下午";
    }
    $(".footer .schDate").text(data.data.schDate);
    $(".footer .dayStr").text(data.data.dayStr);
    if(data.data.sourceList){
        $(".footer_list").setTemplateElement("footer_temp").processTemplate(data.data.sourceList);
    }else{
        $('.footer_list').html('<div id="none">'+
            '<img src="/web-bin/mobile/medical/patient/images/prompt_icon_data.png">'+
            '<p>暂无数据</p>'+
            '</div>');
    }
    $(".footer").show();
}

