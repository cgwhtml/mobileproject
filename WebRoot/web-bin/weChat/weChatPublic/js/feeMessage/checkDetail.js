/**
 * Created by 风殇 on 2018/1/26.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var SERVER_URL=window.HUGPAGE_CONFIG.SERVER_URL;//读取图片服务器路径
var FILE_URL=window.HUGPAGE_CONFIG.FILE_URL;//读取图片文件路径
var query=getRequest();
var usId=query.usId||sessionStorage.getItem("usId");
var accessToken=query.accessToken||sessionStorage.getItem("accessToken");
$(function(){
    console.log(query.pictureWeb)
    $(".check_head span").text(decodeURIComponent(query.reportName));
    $(".video_detail").text(decodeURIComponent(query.examResult));
    $(".check_detail").text(decodeURIComponent(query.examDescription));
    if(query.pictureWeb){
        $("#picUrl").show();
        $("#picUrl").click(function(){
            location.href=decodeURIComponent(query.pictureWeb);
        })
    }
    /*$.ajax({
        async:true,
        on: true,
        type:"post",
        url: LOCALHOST_URL+ '/web-bin/m/weChat/weChatPublic/get_checkDetail_data?accessToken=' + accessToken + '&usId=' + usId+'&organCode='+organCode+'&requisitionNo='+requisitionNo,
        dataType: "json",
        beforeSend:function(XMLHttpRequest ){
            //加载中
            $(".wrapper").append('<div class="loaders"><img src="/web-bin/mobile/repository/drug/images/loading_2.gif"/><div>');
        },
        success: function(data){
            $(".loaders").remove();
            if(data.res==0) {
                if(!data.data){
                    $("#noDataBox").show();
                    return;
                }
                $("#noDataBox").hide();
                var result=data.data;
                $(".check_head span").text(result.examItemName);
                $(".video_detail").text(result.examResult);
                $(".check_detail").text(result.examDescription);
            }else{
                $.alert(data.msg)
            }
        }
    });*/
});
