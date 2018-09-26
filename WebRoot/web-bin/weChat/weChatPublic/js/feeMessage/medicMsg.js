/**
 * Created by 风殇 on 2018/1/20.
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
        url: LOCALHOST_URL+ '/web-bin/m/weChat/weChatPublic/get_medicList_data?accessToken=' + accessToken + '&usId=' + usId+'&organCode='+organCode+'&inhospSerialNo='+inhospNo+'&inhospNo='+inhospNo,
        dataType: "json",
        beforeSend:function(XMLHttpRequest ){
            //加载中
            $("#medicList").html('<div class="loaders"><img src="/web-bin/mobile/repository/drug/images/loading_2.gif"/><div>');
        },
        success: function(data){
            $(".loaders").remove();
            if(data.res==0) {
                if(data.data.length==0){
                    $("#medicList").append('<div id="none">'+
                        '<img src="/web-bin/resources/images/nodata2x.png">'+
                        '<p>暂无数据</p>'+
                        '</div>');
                    return;
                }
                $("#medicList").setTemplateElement("template_medicList").processTemplate(data.data);
                $("#medicList li").click(function(){
                    var surgeryNo=$(this).find(".surgeryNo").val();
                    var surgeryOperName=$(this).find(".surgeryOperName").val();
                    var surgeryDrName=$(this).find(".surgeryDrName").val();
                    var surgeryBeginDate=$(this).find(".surgeryBeginDate").val();
                    var anesDrName=$(this).find(".anesDrName").val();
                    var surgeryLevelName=$(this).find(".surgeryLevelName").val();
                    var woundHealingLevelName=$(this).find(".woundHealingLevelName").val();
                    location.href=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/to_medicDetail_page?accessToken='+accessToken+'&usId='+usId+'&surgeryNo='+surgeryNo+'&organCode='+organCode+'&surgeryOperName='+surgeryOperName+'&surgeryDrName='+surgeryDrName+'&surgeryBeginDate='+surgeryBeginDate+'&anesDrName='+anesDrName+'&surgeryLevelName='+surgeryLevelName+'&woundHealingLevelName='+woundHealingLevelName;
                });
            }else{
                $.alert(data.msg)
            }
        }
    });
});
