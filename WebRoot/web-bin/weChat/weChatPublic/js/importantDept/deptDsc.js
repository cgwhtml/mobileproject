/**
 * Created by 风殇 on 2017/11/29.
 */
$(function(){
    var LOCALHOST_URL=window.location.origin;
    var PORT=window.HUGPAGE_CONFIG.PORT;
    var query=getRequest();
    var usId=query.usId;
    var accessToken=query.accessToken;
    var hugId=query.hugId;
    var targetHugId=query.targetHugId;
    var head=query.head;
    var myHead=query.myHead;
    var doctorName=query.doctorName;
    var deptDesc= decodeURIComponent(query.deptDesc);
    $("#mainFrame").attr("src",deptDesc);
    $(".chat").tap(function(){
        location.href=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/to_chat_page?accessToken=' + accessToken +'&usId=' + usId + '&targetHugId='+targetHugId+'&hugId='+hugId+'&head='+head+'&myHead='+myHead+'&doctorName='+doctorName;
    });
});