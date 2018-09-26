/**
 * Created by 风殇 on 2018/1/20.
 */
/**
 * Created by 风殇 on 2018/1/20.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query=getRequest();
$(function() {
    $(".time_fee").text(query.time);
    var url = query.visit == '1' ? 'get_feeVisitDetail_data' : 'get_feeHospDetail_data';
    $.ajax({
        async:true,
        on: true,
        type:"post",
        url: LOCALHOST_URL+ '/web-bin/m/weChat/weChatPublic/' + url + '?organCode=' + query.organCode + '&patIndexNo='+query.patIndexNo + '&dealNoStr='+query.dealNo,
        dataType: "json",
        beforeSend:function(){
            //加载中
            $(".msg_wrapper ul").append('<div class="loaders"><img src="/web-bin/mobile/repository/drug/images/loading_2.gif"/><div>');
        },
        success: function(data){
            $(".loaders").remove();
            if (data.res == '0' && data.data && data.data.length >0) {
                callBack(data.data);
            } else {
                $("#noDataBox").show();
            }
        }
    });
});
function callBack(data) {
    var list = [];
    $.each(data, function(i, item) {
        var hasThis = false;
        $.each(list, function(j, jtem) {
            if (jtem.feeCategCode == item.feeCategCode) {
                jtem.totalMoney = Number(item.totalMoney) + Number(jtem.totalMoney);
                hasThis = true;
                return false;
            }
        });
        if (!hasThis) {
            list.push({
                'feeCategCode': item.feeCategCode,
                'feeCategName': item.feeCategName,
                'totalMoney': item.totalMoney
            });
        }
    });
    $.each(list, function(i, item) {
        $(".fee_content ul").append(
            '<li>'+
            '<span>' + item.feeCategName + '</span>'+
            '<div class="gray_arrow"></div>'+
            '<div class="money">'+
            '<span>' + Math.round(Number(item.totalMoney) * 100) / 100 + '</span>元'+
            '</div>'+
            '</li>'
        );
    });
}