/**
 * Created by 风殇 on 2018/1/20.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query=getRequest();
$(function() {
    var url = query.visit == '1' ? 'get_feeVisit_data' : 'get_feeHosp_data';
    $.ajax({
        async:true,
        on: true,
        type:"post",
        url: LOCALHOST_URL+ '/web-bin/m/weChat/weChatPublic/' + url + '?organCode=' + query.organCode + '&patIndexNo='+query.patIndexNo,
        dataType: "json",
        beforeSend:function(){
            //加载中
            $(".msg_wrapper ul").html('<div class="loaders"><img src="/web-bin/mobile/repository/drug/images/loading_2.gif"/><div>');
        },
        success: function(data){
            $(".loaders").remove();
            if (data.res == '0' && data.data && data.data.length > 0) {
                callBack(data.data);
            } else {
                $("#noDataBox").show();
            }
        }
    });
    $(".msg_wrapper ul").on('click', 'li', function() {
        location.href = LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/to_dayDetail_page?visit=' + query.visit +'&patIndexNo=' + query.patIndexNo + '&organCode=' + query.organCode + '&dealNo=' + $(this).attr('dealNo') + '&time=' + $(this).find('.time').text();
    });
});
function callBack(data) {
    $.each(data, function(i, item) {
        $(".msg_wrapper ul").append(
            '<li dealNo="' + $.trim(item.dealNo) + '">'+
            '<span class="time">' + $.trim(item.chargeDate).substring(0, 10) + '</span>'+
            '<div class="gray_arrow"></div>'+
            '<div class="money">'+
            '<span>' + $.trim(item.medicalTotalFee) + '</span>元'+
            '</div>'+
            '</li>'
        );
    });
}