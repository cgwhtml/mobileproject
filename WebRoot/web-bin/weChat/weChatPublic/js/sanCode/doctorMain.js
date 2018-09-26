/**
 * Created by 风殇 on 2018/1/30.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var SERVER_URL=window.HUGPAGE_CONFIG.SERVER_URL;//读取图片服务器路径
var FILE_URL=window.HUGPAGE_CONFIG.FILE_URL;//读取图片文件路径
var query=getRequest();
var usId=query.usId;
var accessToken=query.accessToken;
var hugId=query.hugId;
var targetHugId=query.targetHugId;
$(function(){
    $.ajax({
        async:true,
        on: true,
        type:"post",
        url: LOCALHOST_URL+ '/web-bin/m/weChat/weChatPublic/query_docData_data?hgId='+targetHugId,
        dataType: "json",
        success: function(data){
            if(data.res==0) {
                var result=data.data;
                 if(result.head){
                    $(".doc_header").append('<img src='+SERVER_URL+FILE_URL+result.head+'>')
                 }
                 $("#docName").text(result.name);
                 $("#docTitle").text(result.drTitle);
                 if(result.deptName && result.hosp){
                    $(".line").show();
                 }
                 $(".deptName").text(result.deptName);
                 $(".hosp").text(result.hosp);
                 $(".doc_introduction").text(result.shortDesc);
                 $(".fans").text(result.countFollow);
                $('img').on('error', function () {
                    $(".doc_header img").remove();
                });
                $(".group_box").css("max-height",$(window).height()-$(".doc_top").outerHeight()-$(".doc_introduction_box").outerHeight()-$(".select_group").outerHeight()-$(".main_foot").outerHeight()-10);
                groupList();
            }else{
                $.alert(data.msg)
            }
        }
    });
    $(".add_manage").click(function(){
        var group=[];
        $(".selecting").each(function(){
            group.push($(this).siblings(".groupId").val());
        });
        if(group.length==0){
            $.alert('请先选择分组');
            return;
        }
        $.ajax({
            on: true,
            type:"post",
            url: LOCALHOST_URL+ '/web-bin/m/weChat/weChatPublic/query_collectGroup_data?sourceType=9&accessToken=' + accessToken + '&usId=' + usId+'&groupIds='+JSON.stringify(group)+'&targetHugId='+targetHugId+'&hugId='+hugId,
            dataType: "json",
            beforeSend:function(XMLHttpRequest ){
                //加载中
                $(".wrapper").append('<div id="loaders_box"><div class="loaders"><img src="/web-bin/mobile/repository/drug/images/loading_2.gif"/><div><div>');
            },
            success: function(data){
                $("#loaders_box").remove();
                if (data.res== 0) {
                    $.toast("加入成功");
                    groupList();
                } else {
                    $.alert(data.msg);
                }
            }
        });
    });
});
function groupList(){
    $.ajax({
        async:true,
        on: true,
        type:"post",
        url: LOCALHOST_URL+ '/web-bin/m/weChat/weChatPublic/query_docGroup_data?accessToken=' + accessToken + '&usId=' + usId+'&targetHugId='+targetHugId+'&hugId='+hugId,
        dataType: "json",
        beforeSend:function(XMLHttpRequest ){
            //加载中
            $(".group_box").html('<div class="loaders"><img src="/web-bin/mobile/repository/drug/images/loading_2.gif"/><div>');
        },
        success: function(data){
            $(".loaders").remove();
            if(data.res==0) {
                if(data.data.length==0){
                    return;
                }
                $(".group_box").setTemplateElement("template_groupList").processTemplate(data.data);
                $(".select_prev").click(function(){
                    $(this).toggleClass("selecting");
                });
            }else{
                $.alert(data.msg)
            }
        }
    });
}