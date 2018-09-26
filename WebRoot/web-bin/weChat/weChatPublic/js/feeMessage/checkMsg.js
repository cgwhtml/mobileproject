/**
 * Created by 风殇 on 2018/1/25.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var SERVER_URL=window.HUGPAGE_CONFIG.SERVER_URL;//读取图片服务器路径
var FILE_URL=window.HUGPAGE_CONFIG.FILE_URL;//读取图片文件路径
var query=getRequest();
var usId=query.usId||sessionStorage.getItem("usId");
var accessToken=query.accessToken||sessionStorage.getItem("accessToken");
var organCode=query.organCode;
var inhospNo=query.inhospNo;
$(function(){
    $.ajax({
        async:true,
        on: true,
        type:"post",
        url: LOCALHOST_URL+ '/web-bin/m/weChat/weChatPublic/get_checkList_data?accessToken=' + accessToken + '&usId=' + usId+'&organCode='+organCode+'&inhospNo='+inhospNo,
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
                $(".wrapper").setTemplateElement("template_checkList").processTemplate(data.data);
                $(".wrapper").find(".lookCheck_url").click(function(){
                    var examDescription=$(this).find(".examDescription").val();
                    var examResult=$(this).find(".examResult").val();
                    var reportName=$(this).find(".reportName").val();
                    var pictureWeb=$(this).find(".pictureWeb").val();
                    location.href=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/to_checkDetail_page?accessToken='+accessToken+'&usId='+usId+'&reportName='+encodeURI(reportName)+'&examDescription='+encodeURI(examDescription)+'&examResult='+encodeURI(examResult)+encodeURIComponent(pictureWeb);
                });
            }else{
                $.alert(data.msg)
            }
        }
    });
});
