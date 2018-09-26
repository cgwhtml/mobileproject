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
        url: LOCALHOST_URL+ '/web-bin/m/weChat/weChatPublic/get_testList_data?accessToken=' + accessToken + '&usId=' + usId+'&organCode='+organCode+'&inhospNo='+inhospNo,
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
                $(".wrapper").setTemplateElement("template_testList").processTemplate(data.data);
                $(".wrapper .imgcode").each(function(){
                    for(var i=0;i<data.data.length;i++){
                        $(this).JsBarcode(data.data[i].barcodeNo,{
                            width:4,
                            displayValue:false
                        });
                    }
                });
                $(".wrapper").find(".lookCheck_url").click(function(){
                    var reportNo=$(this).find(".reportNo").val();
                    var testItemName=$(this).find(".testItemName").val();
                    location.href=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/to_testDetail_page?accessToken='+accessToken+'&usId='+usId+'&reportNo='+reportNo+'&organCode='+organCode+'&testItemName='+testItemName;
                });
            }else{
                $.alert(data.msg)
            }
        }
    });
})