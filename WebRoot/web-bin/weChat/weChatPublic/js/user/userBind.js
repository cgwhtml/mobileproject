/**
 * Created by CGT on 2017/7/12.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query=getRequest();
var hospCode=query.hospCode;
var openId=query.openId;
var urlType=query.urlType;
var mPattern =/^1[3456789]\d{9}$/;
var Timer1;
var Timer2;
var Timer3;
var Timer4;
$(function(){
    // 阻止字体放大
    if (typeof(WeixinJSBridge) == "undefined") {
        document.addEventListener("WeixinJSBridgeReady", function (e) {
            setTimeout(function(){
                WeixinJSBridge.invoke('setFontSizeCallback',{"fontSize":0}, function(res) {
                    // alert(JSON.stringify(res));
                });
            },0);
        });
    } else {
        setTimeout(function(){
            WeixinJSBridge.invoke('setFontSizeCallback',{"fontSize":0}, function(res) {
                // alert(JSON.stringify(res));
            });
        },0);
    }
    sessionStorage.setItem("hospCode",hospCode);
    sessionStorage.setItem("urlType",urlType);
    console.log(hospCode);
    console.log(openId);
    var canclick=true;
    $("body").on("tap",".user_input .active",function(event){
        if(canclick){
            canclick=false;
            var phone=$("#phone").val();
            if(mPattern.test(phone)==false){
                // $(".error").show();
                $.alert("手机号输入错误！");
                // $(".error .error_content span").text("手机号输入错误！");
                Timer1=setTimeout(function(){
                    $(".error").hide();
                },3000);
                canclick=true;
            }else{
                timeCount();
                $.ajax({
                    on: true,
                    type:"get",
                    url:LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/get_message_info?phone='+phone+"&smsType=0",
                    dataType:"json",
                    success: function(data){
                        console.log(data);
                    }
                });
                canclick=true;
            }
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
    //点击下一步
    $(".footer").click(function(event){
        var phone=$("#phone").val();
        var vCode=$("#vCode").val();
        if(mPattern.test(phone)==false){
            /*$(".error").show();
            $(".error .error_content span").text("手机号输入错误！");*/
            $.alert("手机号输入错误！");
            Timer2=setTimeout(function(){
                $(".error").hide();
            },3000);
        }else if(vCode==""){
            $.alert("验证码不能为空！");
            /*$(".error").show();
            $(".error .error_content span").text("验证码不能为空！");*/
            Timer3=setTimeout(function(){
                $(".error").hide();
            },3000);
        }else{
            $.ajax({
                on: true,
                type:"get",
                url:LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/post_user_data?hospCode='+hospCode+"&openId="+openId+"&phone="+phone+"&vCode="+vCode,
                dataType:"json",
                success: function(data){
                    console.log(data);
                    if(data&&data.res==0){
                        var hgId=data.data.hgId;
                        var usId=data.data.id;
                        var accessToken=data.data.accessToken;
                        console.log(hgId);
                        console.log(urlType);
                        sessionStorage.setItem("hgId",hgId);
                        sessionStorage.setItem("usId",usId);
                        sessionStorage.setItem("accessToken",accessToken);
                        location.href=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/to_userInfoImprove_page?hgId='+hgId+"&urlType="+urlType;
                    }else{
                        /*$(".error").show();
                        $(".error .error_content span").text(data.msg||"注册失败");*/
                        $.alert(data.msg||"注册失败");
                        Timer4=setTimeout(function(){
                            $(".error").hide();
                        },3000);
                    }
                }
            });
        }
        event.stopPropagation();
    });
});
var time=60;
function timeCount(){
    time--;
    $(".verify_get").text(time+  "s").removeClass("active").addClass("gray");
    var Timer=setTimeout(timeCount,1000);
    if(time==0){
        time=60;
        clearTimeout(Timer);
        $(".verify_get").text("获取验证码").removeClass("gray").addClass("active");
    }
}