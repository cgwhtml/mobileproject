/**
 * Created by 风殇 on 2018/1/29.
 */
$(function(){
    var LOCALHOST_URL=window.location.origin;
    var queryUrl=window.location.href;
    var query=getRequest();
    var usId=query.usId;
    var accessToken=query.accessToken;
    var hugId=query.hugId;
    var hospCode=query.hospCode;
    //ajax获取到相关参数
    $.ajax({
        on: true,
        type:"post",
        url: LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/query_chatPay_data?hospCode='+hospCode+'&url='+encodeURIComponent(queryUrl),
        dataType:"json",
        success: function(data){
            if(data.res==0){
                var appId = data.data.appId;
                var timestamp = data.data.timestamp;
                var noncestr = data.data.noncestr;
                var signature = data.data.signature;
                wx.config({
                    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: appId, // 必填，公众号的唯一标识
                    timestamp: timestamp, // 必填，生成签名的时间戳
                    nonceStr: noncestr, // 必填，生成签名的随机串
                    signature: signature,// 必填，签名，见附录1
                    jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.ready(function(){
                    wx.scanQRCode({
                        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                        scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                        success: function (res) {
                            var result = res.resultStr;
                            location.href=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/to_doctorMainQ_page?accessToken='+accessToken+'&usId='+usId+'&targetHugId='+result+'&hugId='+hugId
                        },
                        error:function(res){
                            alert('出错'+res)
                        }
                    });
                });
                wx.error(function(res) {
                    alert("出错了：" + res.errMsg);
                });
                $("#sanCode").click(function(){
                    wx.scanQRCode({
                        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                        scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                        success: function (res) {
                            var result = res.resultStr;
                            location.href=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/to_doctorMainQ_page?accessToken='+accessToken+'&usId='+usId+'&targetHugId='+result+'&hugId='+hugId
                        },
                        error:function(res){
                            alert('出错'+res)
                        }
                    });
                })
            }
        }
    });
});
