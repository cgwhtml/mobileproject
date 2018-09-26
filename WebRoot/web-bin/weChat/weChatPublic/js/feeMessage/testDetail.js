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
var organCode=query.organCode;
var reportNo=query.reportNo;
$(function(){
    $.ajax({
        async:true,
        on: true,
        type:"post",
        url: LOCALHOST_URL+ '/web-bin/m/weChat/weChatPublic/get_testDetail_data?accessToken=' + accessToken + '&usId=' + usId+'&organCode='+organCode+'&reportNo='+reportNo,
        dataType: "json",
        beforeSend:function(XMLHttpRequest ){
            //加载中
            $(".wrapper").append('<div class="loaders"><img src="/web-bin/mobile/repository/drug/images/loading_2.gif"/><div>');
        },
        success: function(data){
            $(".loaders").remove();
            if(data.res==0) {
                if(!data.data){
                    $(".wrapper").append('<div id="none">'+
                        '<img src="/web-bin/resources/images/nodata2x.png">'+
                        '<p>暂无数据</p>'+
                        '</div>');
                    return;
                }
                $("#none").hide();
                $(".check_head span").text(decodeURI(query.testItemName));
                $(".detail_box").setTemplateElement("template_testDetail").processTemplate(data.data);

            }else{
                $.alert(data.msg);
            }
        }
    });
});