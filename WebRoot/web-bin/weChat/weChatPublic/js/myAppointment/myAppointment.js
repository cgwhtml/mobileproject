/**
 * Created by CGT on 2017/7/11.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query=getRequest();
var hgId=query.hgId;
var hospCode=query.hospCode;
var usId=query.usId;
var accessToken=query.accessToken;
var hospCode2;
var regId;
var Timer1;
$(function(){
    console.log(hospCode);
    console.log(hgId);
    console.log(usId);
    console.log(accessToken);
    myAppointList();
    $("body").on("tap",".appoint_span.booking .canclick",function(event){
        var $this=$(this);
        hospCode2=$this.parents(".appoint_span").find(".hospCode").val();
        console.log(hospCode);
        regId=$this.parents(".appoint_span").find(".regId").val();
        console.log(regId);
        $(".cancel").show();
        event.stopPropagation();
    });
    $("body").on("tap",".cancel .cancel_submit",function(event){
        $.ajax({
            on: true,
            type:"get",
            url:LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/post_appointCancel_data?regId='+regId+"&hospCode="+hospCode2+"&usId="+usId+"&accessToken="+accessToken,
            dataType:"json",
            success: function(data){
                console.log(data);
                if(data&&data.res==0){
                    $(".cancel").hide();
                    $(".cancel_success").show();
                    location.reload();
                }else{
                    $(".cancel").hide();
                    $(".error").show();
                    $(".error .error_content span").text(data.msg||"取消失败");
                    Timer1=setTimeout(function(){
                        $(".error").hide();
                    },3000);
                }
            }
        });
        event.stopPropagation();
    });
    $(".cancel_cancel").click(function(event){
        $(".cancel").hide();
        event.stopPropagation();
    });
    //失败弹框
    $(".error_close").click(function(event){
        clearTimeout(Timer1);
        $(".error").hide();
        event.stopPropagation;
    });
});
function myAppointList(){
    $.ajax({
        on: true,
        type:"get",
        url:LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/get_myAppointList_data?hgId='+hgId+"&pageNumber=1&pageSize=10"+"&usId="+usId+"&accessToken="+accessToken,
        dataType:"json",
        success: function(data){
            console.log(data);
            if(data&&data.res==0){
                CallBack2(data);
            }
        }
    });
}
function CallBack2(data){
    var num=data.data.result.length;
    $(".myAppoint_header b").text(num);
    $(".myAppoint_content").setTemplateElement("appoint_span_temp").processTemplate(data.data.result);
    //我的预约
    $(".myAppoint_content .appoint_span").each(function(){
        var $this=$(this);
        if($this.find(".dayType").val()==1){
            $this.find(".dayStr").text("上午");
        }else if($this.find(".dayType").val()==2){
            $this.find(".dayStr").text("下午");
        }
        var regStatus=$this.find(".regStatus").val();
        if(regStatus==1){
            $this.addClass("booking");
            var remainDays=$this.find(".remainDays").text();
            if(remainDays==0){
                $this.find(".span_header p").css({"margin-top":"0.3rem"});
                $this.find(".header_tips").show();
            }else{
                $this.find(".cancel_appoint").addClass("canclick");
            }
        }else if(regStatus==3){
            $this.addClass("canceled");
        }else if(regStatus==5){
            $this.addClass("visited");
        }
    });
}