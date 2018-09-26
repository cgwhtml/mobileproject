/**
 * Created by 风殇 on 2018/3/2.
 */
var localhostUrl=window.location.origin;
var query=getRequest();
var usId=query.usId;
var accessToken=query.accessToken;
var phone=query.phone?query.phone:"";
var name=query.name?query.name:"";
var cardType=query.cardType;
var cardNo=query.cardNo;
var hospCode=query.hospCode;
$(function(){
    if(!cardNo || !cardType){
        $.alert("请绑定就诊卡");
        return;
    }
    if(cardNo=="null" || cardType=="null"){
        $.alert("请绑定就诊卡");
        return;
    }
    $.ajax({
        async:true,
        on: true,
        type:"post",
        url: localhostUrl+ '/web-bin/m/weChat/weChatPublic/query_selfPayList_data?accessToken=' + accessToken + '&usId=' + usId+'&phone='+phone+'&name='+name+'&cardType='+cardType+'&cardNo='+cardNo+'&hospCode='+hospCode,
        dataType: "json",
        beforeSend:function(XMLHttpRequest ){
            //加载中
            $(".wrapper").html('<div class="loaders"><img src="/web-bin/mobile/repository/drug/images/loading_2.gif"/><div>');
        },
        success: function(data){
            $(".loaders").remove();
            if(data.res==0) {
                if(data.data.length==0){
                    $(".wrapper").append('<div id="none">'+
                        '<img src="/web-bin/resources/images/nodata2x.png">'+
                        '<p>暂无数据</p>'+
                        '</div>');
                    return;
                }
                $(".wrapper").setTemplateElement("template_payList").processTemplate(data.data);
                $("#payList").on("click","li",function(){
                    var paymentNo=$(this).find(".paymentNo").val();
                    var payTime=$(this).find(".payTime").val();
                    var settlementStatus=$(this).find(".settlementStatus").val();
                    var paymentUrl=$(this).find(".paymentUrl").val();
                    var paymentName=$(this).find(".paymentName").val();
                    location.href=localhostUrl+'/web-bin/m/weChat/weChatPublic/to_selfPayMain_page?accessToken=' + accessToken + '&usId=' + usId+'&phone='+phone+'&name='+encodeURI(paymentName)+'&cardType='+cardType+'&cardNo='+cardNo+'&hospCode='+hospCode+'&paymentNo='+paymentNo+'&payTime='+encodeURI(payTime)+'&settlementStatus='+settlementStatus+'&paymentUrl='+encodeURIComponent(paymentUrl);
                })
            }else{
                $.alert(data.msg)
            }
        }
    });
});