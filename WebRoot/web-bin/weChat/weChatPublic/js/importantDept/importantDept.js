/**
 * Created by 风殇 on 2017/11/1.
 */
$(function(){
    var LOCALHOST_URL=window.location.origin;
    var PORT=window.HUGPAGE_CONFIG.PORT;
    var SERVER_URL=window.HUGPAGE_CONFIG.SERVER_URL;//读取图片服务器路径
    var FILE_URL=window.HUGPAGE_CONFIG.FILE_URL;//读取图片文件路径
    var query=getRequest();
    var hospCode=query.hospCode;
    var usId=query.usId;
    var accessToken=query.accessToken;
    var hugId=query.hugId;
    var head=query.head;
    var myHead=query.myHead;
    var doctorName=query.doctorName;
    $(".list_box").niceScroll({
        cursoropacitymin: 0,
        cursoropacitymax: 0
    });
    $.ajax({
        on: true,
        type: "post",
        url: LOCALHOST_URL+ '/web-bin/m/weChat/weChatPublic/query_importantDept_data?accessToken=' + accessToken + '&usId=' + usId+ '&hospCode='+hospCode,
        dataType: "json",
        success: function (data) {
            if(data.res==0 && data.data){
                if(data.data.length!=0){
                    $(".list_box").setTemplateElement("template_msgList").processTemplate(data.data);
                    for(var i=0;i<data.data.length;i++){
                        if(data.data[i].head){
                            $(".list_box").find(".head").eq(i).append('<img src='+SERVER_URL+FILE_URL+data.data[i].head+'/>');
                        }else{
                            $(".list_box").find(".head").eq(i).html('<div class="design_icon"></div>');
                        }
                    }

                }
            }
        }
    });
    $(document).find(".list_box").on("tap","li",function(){
        var deptDesc=$(this).find(".deptDesc").val();
        var targetHugId=$(this).attr("data-hugId");
        $.ajax({
            on: true,
            type: "post",
            url: LOCALHOST_URL+ '/web-bin/m/weChat/weChatPublic/query_flowDocClick_data?userType=0&accessToken='+accessToken+'&usId='+usId+'&targetHugId='+targetHugId,
            dataType: "json",
            success: function (data) {
                console.log(data)
            }
        });
        if(deptDesc){
            location.href=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/to_deptDsc_page?accessToken=' + accessToken +'&usId=' + usId + '&targetHugId='+targetHugId+'&hugId='+hugId+'&head='+head+'&myHead='+myHead+'&doctorName='+doctorName+'&deptDesc='+encodeURIComponent(deptDesc);
        }else{
            location.href=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/to_chat_page?accessToken=' + accessToken +'&usId=' + usId + '&targetHugId='+targetHugId+'&hugId='+hugId+'&head='+head+'&myHead='+myHead+'&doctorName='+doctorName;
        }
    })
});