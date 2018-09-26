/**
 * Created by 风殇 on 2017/11/16.
 */
$(function(){
    var LOCALHOST_URL=window.location.origin;
    var query=getRequest();
    var hugId=query.hugId;
    var targetHugId=query.targetHugId;
    var openId=query.openId;
    var feeIm=query.feeIm;
    var doctorName=query.doctorName;
    $(".money").find("span").html(feeIm);
    $("#doctorName").html(decodeURI(doctorName))
    // 购买咨询
    $("#goBuy").tap(function(){
        var appId = "wxe1b9ae72ef1bc6bf";
        //开始支付
        var queryUrl=window.location.href;
        //ajax获取到相关参数
        $.ajax({
            on: true,
            type:"post",
            url: LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/query_chatPay_data?hospCode=47174063-8'+'&url='+encodeURIComponent(queryUrl),
            dataType:"json",
            success: function(data){
                if(data.res==0){
                    var timestamp = data.data.timestamp;
                    var noncestr = data.data.noncestr;
                    var signature = data.data.signature;
                    wx.config({
                        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: appId, // 必填，公众号的唯一标识
                        timestamp: timestamp, // 必填，生成签名的时间戳
                        nonceStr: noncestr, // 必填，生成签名的随机串
                        signature: signature,// 必填，签名，见附录1
                        jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    //唤起微信支付
                    if(appId!=''){
                        pay();
                    }
                    function pay(){
                        $.ajax({
                            on: true,
                            type:"get",
                            url: LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/query_payPage_data?payBy=2&payClientType=3'+'&hugId='+hugId+'&docHugId='+targetHugId+'&openId='+openId,
                            dataType:"json",
                            success: function(data){
                               if(data.res==0){
                                   var orderString=JSON.parse(data.data.orderString);
                                   var timestamp = orderString.timeStamp;
                                   var noncestr = orderString.nonceStr;
                                   var package=orderString.package;
                                   var paySign=orderString.sign;
                                   wx.ready(function(){
                                       wx.chooseWXPay({
                                           timestamp: timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                                           nonceStr: noncestr, // 支付签名随机串，不长于 32 位
                                           package: package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                                           signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                                           paySign: paySign, // 支付签名
                                           success: function (res) {
                                               // 支付成功后的回调函数
                                               window.history.go(-1);
                                           }
                                       });
                                   });
                                   wx.error(function(res){
                                       alert("失败");
                                       // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                                   });
                               }
                            }
                        });
                    }
                }
            }
        });
        /* //唤起微信支付
         function pay(){
         if (typeof WeixinJSBridge == "undefined"){
         if( document.addEventListener ){
         document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
         }else if (document.attachEvent){
         document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
         document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
         }
         }else{
         onBridgeReady();
         }

         }
         //开始支付
         function onBridgeReady(){
         WeixinJSBridge.invoke(
         'getBrandWCPayRequest', {
         "appId" : appId,     //公众号名称，由商户传入
         "timeStamp": timeStamp+"",         //时间戳，自1970年以来的秒数
         "nonceStr" : nonceStr, //随机串
         "package" : "prepay_id=" + pg,
         "signType" : signType,         //微信签名方式:
         "paySign" : paySign    //微信签名
         },

         function(res){
             if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                alert("支付成功");  // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                //回到用户订单列表
                window.location.href="http://wx.ooklady.com/wechat/order/orderlist";
             }else if (res.err_msg == "get_brand_wcpay_request:cancel")  {
                alert("支付过程中用户取消");
             }else{
                //支付失败
                alert(res.err_msg)
             }
         }
         );
         }*/
    });
});