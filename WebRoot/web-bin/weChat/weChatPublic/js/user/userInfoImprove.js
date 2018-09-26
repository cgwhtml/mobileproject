/**
 * Created by CGT on 2017/7/12.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query=getRequest();
console.log(query);
var hgId=query.hgId||sessionStorage.getItem("hgId");
var hospCode=query.hospCode||sessionStorage.getItem("hospCode");
var usId=sessionStorage.getItem("usId");
var accessToken=sessionStorage.getItem("accessToken");
var urlType=query.urlType||sessionStorage.getItem("urlType");
var idCard =/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
var Timer1;
var Timer2;
var Timer3;
var Timer4;
var name;
var card;
var sex;
$(function(){
    if(urlType==5){
        $(".footer_skip").show();
        $(".next_btn,.footer_noskip").hide();
    }else{
        $(".footer_noskip").show();
        $(".next_btn,.footer_skip").hide();
    }
    //获取hgId的个人信息
    $.ajax({
        on: true,
        type:"get",
        url:LOCALHOST_URL+'/web-bin/m/weChat/WeChatPublic/get_userInfo_data?hgId='+hgId+'&hospCode='+hospCode+'&usId='+usId+'&accessToken='+accessToken,
        dataType:"json",
        success: function(data){
            console.log(data);
            if(data.data&&data.res==0&&data.data.name){
                name=data.data.name;
                sex=data.data.sex;
                card=data.data.card;
                $("#name").val(name);
                if(sex==2){
                    $("#sexMan").attr("checked","checked");
                }else if(sex==1){
                    $("#sexWomen").attr("checked","checked");
                }
                $("#card").val(card);
                if(data.data.checkStatus!==0){
                    $(".user_input").find("input").attr("disabled",true);
                    $(".footer_skip,.footer_noskip").hide();
                    $(".next_btn").show();
                }
            }else{
                $("#name").val("");
                $("#card").val("");
            }
        }
    });
    $(".next_btn").click(function(event){
        location.href=LOCALHOST_URL+'/web-bin/m/weChat/WeChatPublic/to_userInfo_page?hgId='+hgId;
        event.stopPropagation();
    });
    $(".footer_skip .btn_left").click(function(event){
        if(urlType==5){
            location.href=LOCALHOST_URL+'/web-bin/m/weChat/WeChatPublic/to_userInfo_page?hgId='+hgId;
        }
        event.stopPropagation();
    });
    $(".footer_skip .btn_right").click(function(event){
        var name=$("#name").val();
        var sex=$(".sex input:checked").val();
        var card=$("#card").val();
        if(name==""){
            $.alert("请输入姓名！");
        }else if(sex==""){
            $.alert("请选择性别！");
        }else if(idCard.test(card)==false){
            $.alert("身份证错误，请重新输入！");
        }else{
            $.ajax({
                on: true,
                type:"get",
                url:LOCALHOST_URL+'/web-bin/m/weChat/WeChatPublic/post_userInfoImprove_data?hgId='+hgId+'&name='+name+'&sex='+sex+'&card='+card+'&usId='+usId+'&accessToken='+accessToken,
                dataType:"json",
                success: function(data){
                    console.log(data);
                    if(data&&data.res==0){
                        location.href=LOCALHOST_URL+'/web-bin/m/weChat/WeChatPublic/to_userInfo_page?hgId='+hgId;
                    }else{
                        $.alert(data.msg||"完善信息失败");
                    }
                }
            });
        }
        event.stopPropagation();
    });
    $(".footer_noskip").click(function(event){
        var name=$("#name").val();
        var sex=$(".sex input:checked").val();
        var card=$("#card").val();
        console.log(name);
        console.log(sex);
        console.log(card);
        if(name==""){
            $.alert("请输入姓名！");
        }else if(sex==""){
            $.alert("请选择性别！");;
        }else if(idCard.test(card)==false){
            $.alert("身份证错误，请重新输入！");
        }else{
            $.ajax({
                on: true,
                type:"get",
                url:LOCALHOST_URL+'/web-bin/m/weChat/WeChatPublic/post_userInfoImprove_data?hgId='+hgId+'&name='+name+'&sex='+sex+'&card='+card+'&usId='+usId+'&accessToken='+accessToken,
                dataType:"json",
                success: function(data){
                    console.log(data);
                    if(data&&data.res==0){
                        if(urlType==2){
                            location.href=LOCALHOST_URL+'/web-bin/m/weChat/WeChatPublic/to_medicalRecordList_page';
                        }else if(urlType==3){
                            location.href=LOCALHOST_URL+'/web-bin/m/weChat/WeChatPublic/to_departList_page';
                        }else if(urlType==4){
                            location.href=LOCALHOST_URL+'/web-bin/m/weChat/WeChatPublic/to_myAppointment_page';
                        }else{
                            location.href=LOCALHOST_URL+'/web-bin/m/weChat/WeChatPublic/to_userInfo_page?hgId='+hgId;
                        }
                    }else{
                        $.alert(data.msg||"完善信息失败");
                    }
                }
            });
        }
        event.stopPropagation();
   });
    //失败弹框
    $(".error_close").click(function(event){
        clearTimeout(Timer1);
        clearTimeout(Timer2);
        clearTimeout(Timer3);
        clearTimeout(Timer4);
        $(".error").hide();
        event.stopPropagation();
    });
});
