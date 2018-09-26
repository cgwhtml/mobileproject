/**
 * Created by 风殇 on 2017/7/11.
 */
$(function(){
    var localhostUrl=window.location.origin;//window.HUGPAGE_CONFIG.localhostUrl;
    var query=window.location.search;
    query=decodeURIComponent(query,"UTF-8");
    var SERVER_URL=window.HUGPAGE_CONFIG.SERVER_URL;//读取图片服务器路径
    var FILE_URL=window.HUGPAGE_CONFIG.FILE_URL;//读取图片文件路径
    var usId=query&&query.split("&")[0].split("?usId=")[1];
    var accessToken=query&&query.split("&")[1].split("accessToken=")[1];
    var hugId=query&&query.split("&")[2].split("hugId=")[1];
    var id=query&&query.split("&")[3].split("id=")[1];
    $.ajax({
        async:true,
        on: true,
        type:"post",
        url: localhostUrl+'/web-bin/p/followup/chat/query_questionContain_data?usId='+usId+'&accessToken='+accessToken+'&id='+id,
        dataType:"json",
        beforeSend:function(){
            $("#loading").show();
        },
        success: function(data){
            $("#loading").hide();
        }
    });
});