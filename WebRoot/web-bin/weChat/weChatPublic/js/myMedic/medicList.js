/**
 * Created by 风殇 on 2017/11/1.
 */
$(function(){
    var LOCALHOST_URL=window.location.origin;
    var PORT=window.HUGPAGE_CONFIG.PORT;
    var SERVER_URL=window.HUGPAGE_CONFIG.SERVER_URL;//读取图片服务器路径
    var FILE_URL=window.HUGPAGE_CONFIG.FILE_URL;//读取图片文件路径
    var query=getRequest();
    // var hospCode=query.hospCode;
    var usId=query.usId||sessionStorage.getItem("usId");
    var accessToken=query.accessToken||sessionStorage.getItem("accessToken");
    var hugId=query.hugId;
    var medic=sessionStorage.medic?JSON.parse(sessionStorage.medic):[];
    // $(".list_box").height($(window).height()-$(".head_tab").height())
    $(".doc_list,.list_box").niceScroll({
        cursoropacitymin: 0,
        cursoropacitymax: 0
    });
    // 解决ios页面不刷新
    var isPageHide = false;
    window.addEventListener('pageshow', function () {
        if (isPageHide) {
            window.location.reload();
        }
    });
    window.addEventListener('pagehide', function () {
        isPageHide = true;
    });
    $(".head_tab").on("tap","li",function(e){
        $(".active_tab").removeClass("active_tab");
        $(this).addClass("active_tab");
        var role=$(this).attr("data-role");
        var pagenumber=1;
        var size=15;
        var page='&pageNumber='+pagenumber+'&pageSize='+size;
        medic={
            role:role
        };
        sessionStorage.medic=JSON.stringify(medic);
        if(role==0){
            $(".list_box").hide();
            $(".doc_list").show();
            $.ajax({
                on: true,
                type: "post",
                url: LOCALHOST_URL+ '/web-bin/m/weChat/weChatPublic/query_doctor_data?accessToken=' + accessToken + '&usId=' + usId+ '&hugId='+hugId+page,
                dataType: "json",
                success: function (data) {
                    if(data.res==0 && data.data.result){
                        if(data.data.result.length!=0){
                            var newResult2=data.data.result;
                            $(".doc_list").setTemplateElement("template_doctorList").processTemplate(data.data.result);
                            for(var i=0;i<data.data.result.length;i++){
                                if(data.data.result[i].head){
                                    $(".doc_list").find(".head").eq(i).append('<img src='+SERVER_URL+FILE_URL+data.data.result[i].head+'/>');
                                }else{
                                    $(".doc_list").find(".head").eq(i).html('<div class="design_icon"></div>');
                                }
                            }
                            $('img').on('error', function () {
                                $(this).prop('src', '/web-bin/weChat/weChatPublic/img/docHead.png');
                            });
                            $(".doc_list").on('scroll',function(){
                                var p=$(this).scrollTop();
                                var listLength=$(".doc_list li").length;
                                var listScroll=$(".doc_list li").outerHeight()*listLength-$(".doc_list").height();
                                if(Math.abs(p-listScroll)<5){
                                    pagenumber++;
                                    page='&pageNumber='+pagenumber+'&pageSize='+size;
                                    if(role==0) {
                                        $.ajax({
                                            async: true,
                                            on: true,
                                            type: "post",
                                            url: LOCALHOST_URL+ '/web-bin/m/weChat/weChatPublic/query_doctor_data?accessToken=' + accessToken + '&usId=' + usId + '&hugId=' + hugId + page,
                                            dataType: "json",
                                            beforeSend: function () {
                                                $("#loading").show();
                                            },
                                            success: function (data) {
                                                if (data.res == 0) {
                                                    $("#loading").hide();
                                                    newResult2 = newResult2.concat(data.data.result);
                                                    $(".doc_list").setTemplateElement("template_doctorList").processTemplate(newResult2);
                                                    for (var i = 0; i < newResult2.length; i++) {
                                                        if (newResult2[i].head) {
                                                            $(".doc_list .head").eq(i).append('<img src=' + SERVER_URL + FILE_URL + newResult2[i].head + '/>');
                                                        } else {
                                                            $(".doc_list .head").eq(i).html('<div class="design_icon"></div>');
                                                        }
                                                    }
                                                    $('img').on('error', function () {
                                                        $(this).prop('src', '/web-bin/weChat/weChatPublic/img/docHead.png');
                                                    });
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                }
            });
        }else{
            // hide里加参数1ms，解决hide()失效问题
            $(".doc_list").hide(1);
            $(".list_box").show();
            var docMsgList=sessionStorage['docMsgList'+hugId]?JSON.parse(sessionStorage['docMsgList'+hugId]):[];
            if(docMsgList==[]){
                $(".msg_list").tap();
            }
            if(docMsgList.length!=0){
                $(".list_box").html("").setTemplateElement("template_msgList").processTemplate(docMsgList);
                for(var i=0;i<docMsgList.length;i++){
                    if(docMsgList[i].head){
                        $(".list_box").find(".head").eq(i).append('<img src='+SERVER_URL+FILE_URL+docMsgList[i].head+'/>');
                    }else{
                        $(".list_box").find(".head").eq(i).html('<div class="design_icon"></div>');
                    }
                }
                $('img').on('error', function () {
                    $(this).prop('src', '/web-bin/weChat/weChatPublic/img/docHead.png');
                });
            }
        }
    });
    if(medic.role==1){
        $(".msg_list").tap();
    }else{
        $(".head_tab li:first").tap();
    }
});