/**
 * Created by 风殇 on 2018/3/2.
 */
var localhostUrl=window.location.origin;
var query=getRequest();
var usId=query.usId;
var accessToken=query.accessToken;
var phone=query.phone?query.phone:"";
var name=query.name?query.name:"";
var paymentNo=query.paymentNo;
var cardType=query.cardType;
var hospCode=query.hospCode;
var settlementStatus=query.settlementStatus;
$(function(){
    console.log(query.name)
    $(".pay_name").text(decodeURI(decodeURI(query.name)));
    $("#payTime").text(decodeURI(query.payTime));
    $("#cardNo").text(query.cardNo);
    $("#trasactionId").text(paymentNo);
    if(settlementStatus==0){
        $("#payFeeBox").show();
        $("#wrapper").css("paddingBottom","65px")
    }
    if(settlementStatus==3){
        $("#payDefeatBox").show();
        $("#wrapper").css("paddingBottom","65px")
    }
    $.ajax({
        async:true,
        on: true,
        type:"post",
        url: localhostUrl+ '/web-bin/m/weChat/weChatPublic/query_selfPayMain_data?accessToken=' + accessToken + '&usId=' + usId+'&paymentNo='+paymentNo+'&hospCode='+hospCode,
        dataType: "json",
        beforeSend:function(XMLHttpRequest ){
            //加载中
            $("#payList").html('<div class="loaders"><img src="/web-bin/mobile/repository/drug/images/loading_2.gif"/><div>');
        },
        success: function(data){
            $(".loaders").remove();
            if(query.paymentUrl){
                $("#payFeeBox").click(function(){
                    location.href=decodeURIComponent(query.paymentUrl);
                });
            }else{
                $("#payFeeBox").click(function(){
                    $.alert("暂无可缴费用")
                });
            }
            if(data.res==0) {
                if(data.data.length==0){
                    $("#payList").append('<div id="none">'+
                        '<img src="/web-bin/resources/images/nodata2x.png">'+
                        '<p>暂无数据</p>'+
                        '</div>');
                    return;
                }
                $("#payList").setTemplateElement("template_payMain").processTemplate(data.data);
            }else{
                $.alert(data.msg)
            }
        }
    });
});