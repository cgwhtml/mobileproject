/**
 * Created by CGT on 2017/7/12.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var SERVER_URL=window.HUGPAGE_CONFIG.SERVER_URL;//读取图片服务器路径
var query=getRequest();
console.log(query);
var hospCode=query.hospCode||sessionStorage.getItem("hospCode");
var hgId=query.hgId||sessionStorage.getItem("hgId");
var usId=query.usId||sessionStorage.getItem("usId");
var accessToken=query.accessToken||sessionStorage.getItem("accessToken");
var hospName;
var clickflag=false;
var openId=query.openId;
$(function(){
    sessionStorage.setItem("hospCode",hospCode);
    sessionStorage.setItem("hgId",hgId);
    sessionStorage.setItem("usId",usId);
    sessionStorage.setItem("accessToken",accessToken);
    //加载二维码
    $("#QRcode img").attr("src",SERVER_URL+"/hug-web/r/file/getQRCode/"+query.hgId);
    $.ajax({
        on: true,
        type:"get",
        url:LOCALHOST_URL+'/web-bin/m/weChat/WeChatPublic/get_userInfo_data?hgId='+hgId+'&hospCode='+hospCode,
        dataType:"json",
        success: function(data){
            console.log(data);
            if(data.data&&data.res==0){
                $("#name").text(data.data.name);
                if(data.data.sex==2){
                    $("#sex").text("男")
                }else if(data.data.sex==1){
                    $("#sex").text("女");
                }
                $("#card").text(data.data.card);
                $("#phone").text(data.data.phone);
                $("#card").text(data.data.card);
                if(data.data.medicalCards){
                    for(var i=0;i<data.data.medicalCards.length;i++){
                        if(data.data.medicalCards[i].cardType==1){
                            data.data.medicalCards[i].cardTypeTxt="就诊卡号"
                        }else if(data.data.medicalCards[i].cardType==2){
                            data.data.medicalCards[i].cardTypeTxt="住院号"
                        }
                    }
                    $(".hospCard_box").setTemplateElement("hospCard_temp").processTemplate(data.data.medicalCards);
                }
                if(data.data.checkStatus!==0){//0可修改，其他不可修改
                    clickflag=false;
                    $(".user_input .name .user_arrow,.user_input .sex .user_arrow,.user_input .card .user_arrow").hide();
                }else{
                    clickflag=true;
                }
            }
        }
    });
    //二维码大图
    $(".QRcode").click(function(event){
        $(".QRcode_img img").attr("src",SERVER_URL+"/hug-web/r/file/getQRCode/"+query.hgId);
        $(".QRcode_box").show();
        event.stopPropagation();
    });
    //二维码关闭
    $(".QRcode_close").click(function(){
        $(".QRcode_box").hide();
    });
    //成员管理
    $(".memberManage").click(function(event){
        location.href=LOCALHOST_URL+'/web-bin/m/weChat/WeChatPublic/to_memberList_page?hgId='+hgId+"&hospCode="+hospCode+"&usId="+usId+"&accessToken="+accessToken;
        event.stopPropagation();
    });
    $("body").on("tap",".name,.sex,.card",function(event){
        if(clickflag){
            location.href=LOCALHOST_URL+'/web-bin/m/weChat/WeChatPublic/to_userInfoImprove_page?hgId='+hgId+"&hospCode="+hospCode;
            event.stopPropagation();
        }else{
            return false;
        }
    });
    $(".footer").click(function(event){
        location.href=LOCALHOST_URL+'/web-bin/m/weChat/WeChatPublic/to_userHospCardList_page?hgId='+hgId+"&hospCode="+hospCode+'&fromType=0'+'&usId='+usId+'&accessToken='+accessToken+'&openId='+openId;
        event.stopPropagation();
    });
    //退出登录
    $(".exit").click(function(event){
        $.confirm({
            title: '确认',
            text: '确认退出该账号吗？',
            onOK: function () {
                $.ajax({
                    on: true,
                    type:"get",
                    url:LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/post_unbindWeChat_data?hospCode='+hospCode+'&hugId='+hgId+"&openId="+openId,
                    dataType:"json",
                    success: function(data){
                        console.log(data);
                        if(data.res==0){
                            location.href=LOCALHOST_URL+'/web-bin/m/weChat/WeChatPublic/to_userBind_page?openId='+openId+"&hospCode="+hospCode+'&urlType=5';
                        }else{
                            alert(data.msg);
                        }
                    }
                });
            },
            onCancel: function () {
            }
        });
        event.stopPropagation();
    });
});