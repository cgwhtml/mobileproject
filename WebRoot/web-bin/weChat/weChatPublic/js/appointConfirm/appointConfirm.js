/**
 * Created by CGT on 2017/7/10.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query=getRequest();
console.log(query);
var schId=query.schId;
var takeIndex=query.takeIndex;
var hgId=sessionStorage.getItem("hgId");
var hospCode=sessionStorage.getItem("hospCode");
var usId=sessionStorage.getItem("usId");
var accessToken=sessionStorage.getItem("accessToken");
var staffName=decodeURI(query.staffName);
var deptName=decodeURI(query.deptName);
console.log(deptName);
var schDate=query.schDate;
var dayStr=decodeURI(query.dayStr);
var expectStime=query.expectStime;
var regFee=query.regFee;
var pageShow=query.pageShow;
var hospCode2;
var regId;
var Timer1;
var Timer2;
var improveFlag=false;
var hospName;
var cardFlag=false;
$(function(){
    $("#id").val(query.id);
    $("#hospCard_num").val(query.hospCard);
    console.log(pageShow);
    if(pageShow==1){
        $(".main").hide();
        myAppointList();
        $(".myAppoint").show();
    }
    console.log(staffName);
    console.log(hospCode);
    console.log(hgId);
    console.log(usId);
    console.log(accessToken);
    $("#deptName").text(deptName);
    if(query.staffName){
        $("#staffName").text(staffName);
    }else{
        $("#staffName").closest("li").hide();
    }
    $("#takeIndex").text(takeIndex);
    $("#schDate").text(schDate);
    $("#dayStr").text(dayStr);
    $("#expectStime").text(expectStime);
    $("#regFee").text(regFee);
    //查询医院名字
    $.ajax({
        on: true,
        type:"get",
        url:LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/query_hospName_data?hospCode='+hospCode,
        dataType:"json",
        success: function(data){
            console.log(data);
            if(data.data&&data.res==0){
                hospName=data.data[0].name;
            }
        }
    });
    $.ajax({
        on: true,
        type:"get",
        url:LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/get_user_data?hospCode='+hospCode+"&hgId="+hgId,
        dataType:"json",
        success: function(data){
            console.log(data);
            if(data.data&&data.res==0){
                console.log("获取到个人信息");
                CallBack(data);
            }else{
                improveFlag=true;
                $("#userName,#userPhone,#userCard").text('暂无信息');
            }
        }
    });
    //查询医院有卡无卡预约
        $.ajax({
            on: true,
            type:"get",
            url:LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/query_isCardRequired_data?hospCode='+hospCode+'&paramCode=IS_ALLOW_NOCARD_REG',
            dataType:"json",
            success: function(data){
                console.log(data);
                if(data.data&&data.res==0){
                    if(data.data.value1==0){
                        cardFlag=true;
                        $(".hospCard_span").show();
                        var id=$("#id").val();
                        if(id&&id!=='undefined'){
                            url=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/get_userCard_data?hospCode='+hospCode+"&hugId="+id+'&isFamily=1';
                        }else{
                            url=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/get_userCard_data?hospCode='+hospCode+"&hugId="+hgId+'&isFamily=0';
                        }
                        $.ajax({
                            on: true,
                            type:"get",
                            url:url,
                            dataType:"json",
                            success: function(data){
                                console.log(data);
                                if(data.data&&data.res==0&&data.data.length>0){
                                    $("#hospCard_num").text(query.hospCard||data.data[0].hospCard);
                                    $("#hospCard_id").val(query.cardId||data.data[0].id);
                                }else{
                                    $("#hospCard_num").text('暂无信息');
                                }
                            }
                        });
                    }
                }
            }
        });
    // 立即预约
    var clickflag=true;
    $(".appoint_btn").click(function(event){
        if(improveFlag){
            $(".error").show().addClass("improveFlag");
            $(".error .error_content span").text("请先完善个人信息");
        }else{
            if(clickflag){
                clickflag=false;
                var familyId=$("#id").val();
                var cardId=$("#hospCard_id").val();
                if(cardFlag&&cardId==''){
                    $(".error").show();
                    $(".error .error_content span").text("请先绑定就诊卡");
                    Timer2=setTimeout(function(){
                        $(".error").hide();
                    },3000);
                    clickflag=true;
                    return false;
                }
                console.log(familyId);
                var url=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/get_appointConfirm_data?hospCode='+hospCode+"&hgId="+hgId+"&schId="+schId+"&takeIndex="+takeIndex+"&usId="+usId+"&accessToken="+accessToken+"&expectStime="+expectStime;
                if(familyId!==""||familyId!=='undefined'){
                    url+="&familyId="+familyId;
                }
                if(cardFlag){
                    url+="&cardId="+cardId;
                }
                $.ajax({
                    on: true,
                    type:"get",
                    url:url,
                    dataType:"json",
                    success: function(data){
                        console.log(data);
                        if(data.data&&data.res==0){
                            $(".success").show();
                            clickflag=true;
                        }else{
                            $(".error").show();
                            $(".error .error_content span").text(data.msg||"预约失败");
                            Timer1=setTimeout(function(){
                                $(".error").hide();
                            },3000);
                            clickflag=true;
                        }
                    }
                });
            }
        }
        // var cardId=$("#hospCard_id").val();
        // console.log(cardId);
        // if(cardId){
        //     var url=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/get_appointConfirm_data?hospCode='+hospCode+"&hgId="+hgId+"&schId="+schId+"&takeIndex="+takeIndex+"&usId="+usId+"&accessToken="+accessToken+"&cardId="+cardId;
        // }else{
        //     var url=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/get_appointConfirm_data?hospCode='+hospCode+"&hgId="+hgId+"&schId="+schId+"&takeIndex="+takeIndex+"&usId="+usId+"&accessToken="+accessToken;
        // }
        event.stopPropagation();
    });
    //成功弹框
    $(".skip_btn").click(function(event){
        $(".success").hide();
        $(".main").hide();
        $(".myAppoint").show();
        myAppointList();
        event.stopPropagation();
    });
    //失败弹框
    $(".error_close").click(function(event){
        clearTimeout(Timer1);
        clearTimeout(Timer2);
       $(".error,.cancel_success").hide();
        event.stopPropagation();
    });
    //选择卡
    $(".card_select").click(function(event){
        var id=$("#id").val();
        var hospCard=$("#hospCard_num").text();
        var hospName=$("#hospName").text();
        var name=$("#userName").text();
        var phone=$("#userPhone").text();
        var card=$("#userCard").text();
        var url=LOCALHOST_URL+'/web-bin/m/weChat/WeChatPublic/to_hospCardSwitch_page?selectType=0'+"&schId="+schId+"&takeIndex="+takeIndex+"&hospCode="+hospCode+"&schDate="+schDate+"&dayStr="+dayStr+"&expectStime="+expectStime+"&regFee="+regFee+"&deptName="+deptName+"&pageShow=0"+'&hgId='+hgId+'&id='+id+'&hospCard='+hospCard+'&hospName='+hospName+'&name='+name+'&phone='+phone+'&card='+card+"&usId="+usId+"&accessToken="+accessToken;
        if(query.staffName){
            location.href=url+"&staffName="+staffName;
        }else{
            location.href=url;
        }
        event.stopPropagation();
    });
    $(".hosp_header_close").click(function(event){
        $(".hospCard_box").slideUp();
        event.stopPropagation();
    });
    $("body").on("tap",".hospCard_box_content ul li",function(event){
        var $this=$(this);
        $("#hospCard_num").text($this.find("span").text());
        $("#hospCard_id").val($this.find(".hospCard_id").val());
        $(".hospCard_box").slideUp();
        event.stopPropagation();
    });
    $(document).on("tap",".appoint_span.booking .canclick",function(event){
        var $this=$(this);
        hospCode2=$this.parents(".appoint_span").find(".hospCode").val();
        console.log(hospCode2);
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
                // var data={data:true,res:0};
                console.log(data);
                if(data.res==0){
                    $(".cancel").hide();
                    $(".cancel_success").show();
                    var url=location.href;
                    console.log(url);
                    setTimeout(function(){
                        window.location.href=changeURLArg(url,"pageShow",1);
                    },1000);
                }else{
                    $(".cancel").hide();
                    $(".error").show();
                    $(".error .error_content span").text(data.msg||"取消失败");
                    setTimeout(function(){
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
    $(".improveFlag .error_close").click(function(event){
        $(".error").hide();
        location.href=LOCALHOST_URL+'/web-bin/m/weChat/WeChatPublic/to_userInfoImprove_page?urlType=3';
        event.stopPropagation();
    });
    //选择成员
    $("body").on("tap",".memberSelect",function(event){
        var id=$("#id").val();
        var hospCard=$("#hospCard_num").text();
        var url=LOCALHOST_URL+'/web-bin/m/weChat/WeChatPublic/to_memberSwitch_page?selectType=0'+"&schId="+schId+"&takeIndex="+takeIndex+"&hospCode="+hospCode+"&schDate="+schDate+"&dayStr="+dayStr+"&expectStime="+expectStime+"&regFee="+regFee+"&deptName="+deptName+"&pageShow=0"+'&hgId='+hgId+'&id='+id+'&hospCard='+hospCard+"&usId="+usId+"&accessToken="+accessToken;
        if(query.staffName){
            location.href=url+"&staffName="+staffName;
        }else{
            location.href=url;
        }
        event.stopPropagation();
    });
});
function CallBack(data){
    if(query.name){
        $("#userName").text(decodeURI(query.name));
    }else{
        $("#userName").text(data.data.name);
    }
    $("#userPhone").text(query.phone||data.data.phone);
    $("#userCard").text(query.card||data.data.card);
    $("#hospName").text(hospName);
    // if(data.data.medicalCards.length!==0){
    //     $(".hospCard_span").show();
    //     $("#hospCard_num").text(data.data.medicalCards[0].hospCard);
    //     $("#hospCard_id").val(data.data.medicalCards[0].id);
    //     $(".hospCard_box_content").setTemplateElement("hospCard_box_temp").processTemplate(data.data.medicalCards);
    // }
}
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

function changeURLArg(url,arg,arg_val){
    var pattern=arg+'=([^&]*)';
    var replaceText=arg+'='+arg_val;
    if(url.match(pattern)){
        var tmp='/('+ arg+'=)([^&]*)/gi';
        tmp=url.replace(eval(tmp),replaceText);
        return tmp;
    }else{
        if(url.match('[\?]')){
            return url+'&'+replaceText;
        }else{
            return url+'?'+replaceText;
        }
    }
    return url+'\n'+arg+'\n'+arg_val;
}
function returnUrl(obj){
    var str='';
    $.each(obj,function(i,val){
        str=str+'&'+i+'='+val;
    });
    str=str.substring(1);
    console.log(str);
    return str;
}
