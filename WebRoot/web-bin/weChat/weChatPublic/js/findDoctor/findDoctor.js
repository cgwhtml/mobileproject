/**
 * Created by 风殇 on 2017/11/6.
 */
//禁止iPhone的缩放，弹性滚动
window.onload=function () {
    document.addEventListener('touchstart',function (event) {
        if(event.touches.length>1){
            event.preventDefault();
        }
    });
    var lastTouchEnd=0;
    document.addEventListener('touchend',function (event) {
        var now=(new Date()).getTime();
        if(now-lastTouchEnd<=300){
            event.preventDefault();
        }
        lastTouchEnd=now;
    },false);
    document.body.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, false);
};
$(function(){
    var LOCALHOST_URL=window.location.origin;
    var PORT=window.HUGPAGE_CONFIG.PORT;
    var SERVER_URL=window.HUGPAGE_CONFIG.SERVER_URL;//读取图片服务器路径
    var FILE_URL=window.HUGPAGE_CONFIG.FILE_URL;//读取图片文件路径
    var query=getRequest();
    var usId=query.usId||sessionStorage.getItem("usId");
    var accessToken=query.accessToken||sessionStorage.getItem("accessToken");
    var hugId=query.hugId;
    var hospCode=query.hospCode
    var pagenumber=1;
    var size=10;
    var page='&pageNumber='+pagenumber+'&pageSize='+size;
    //页面滚动条
    $(".search_res,.doc_list_box").niceScroll({
        cursoropacitymin: 0,
        cursoropacitymax: 0,
    });
    $.ajax({
        on: true,
        type: "post",
        url: LOCALHOST_URL+ '/web-bin/m/weChat/weChatPublic/query_doctorList_data?accessToken=' + accessToken + '&hospCode='+hospCode+'&usId=' + usId+page,
        dataType: "json",
        beforeSend:function(){
            $("body").append('<div class="loaders"><img src="/web-bin/resources/images/loading_1.gif"/></div>');
        },
        success: function (data) {
            $(".loaders").remove();
            if(data.res==0 && data.data.result){
                if(data.data.result.length!=0){
                    var newResult=data.data.result;
                    if(data.data.result.length!=0){
                         $(".doc_list").setTemplateElement("template_docList").processTemplate(data.data.result);
                        for(var i=0;i<data.data.result.length;i++){
                            if(data.data.result[i].head){
                                $(".head").eq(i).append('<img src='+SERVER_URL+FILE_URL+data.data.result[i].head+'/>');
                            }else{
                                $(".head").eq(i).html('<div class="design_icon"></div>');
                            }
                        }
                        $('img').on('error', function () {
                            $(this).prop('src', '/web-bin/weChat/weChatPublic/img/docHead.png');
                        });
                        $(".doc_list_box").on('scroll',function(){
                            var p=$(this).scrollTop();
                            var listScroll=$(".doc_list").height()+10-$(".doc_list_box").height();
                            if(listScroll-p<1){
                                pagenumber++;
                                page='&pageNumber='+pagenumber+'&pageSize='+size;
                                $.ajax({
                                    async:true,
                                    on: true,
                                    type:"post",
                                    url: LOCALHOST_URL+ '/web-bin/m/weChat/weChatPublic/query_doctorList_data?accessToken=' + accessToken + '&usId=' + usId+ '&hospCode='+hospCode+page,
                                    dataType: "json",
                                    beforeSend:function(){
                                        $(".doc_list li:last").append('<div class="show_more"><div class="show_more_box">' +
                                            '<img src="/web-bin/resources/images/loading_1.gif" width="20px"/></div></div>');
                                    },
                                    success: function(data){
                                        $(".show_more").remove();
                                        if(data.res==0) {
                                            if(data.data && data.data.result.length!=0){
                                                newResult=newResult.concat(data.data.result);
                                                $(".doc_list").setTemplateElement("template_docList").processTemplate(newResult);
                                                for(var i=0;i<newResult.length;i++){
                                                    if(newResult[i].head){
                                                        $(".head").eq(i).append('<img src='+SERVER_URL+FILE_URL+newResult[i].head+'/>');
                                                    }else{
                                                        $(".head").eq(i).html('<div class="design_icon"></div>');
                                                    }
                                                }
                                                $('img').on('error', function () {
                                                    $(this).prop('src', '/web-bin/weChat/weChatPublic/img/docHead.png');
                                                });
                                            }
                                        }
                                    }
                                });
                            }
                        });
                    }
                }
            }
        }
    });
    $(document).on("tap",".doc_list li",function(){
        var targetHugId=$(this).attr("data-hgId");
        var freeConsultation=$(this).find(".freeConsultation").val();
        var graphicConsulting=$(this).find(".graphicConsulting").val();
        var fetalheartConsultation=$(this).find(".fetalheartConsultation").val();
        var telephoneConsultation=$(this).find(".telephoneConsultation").val();
        var videoConsulting=$(this).find(".videoConsulting").val();
        location.href=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/to_doctorMain_page?' +
            'accessToken=' + accessToken +'&usId=' + usId + '&targetHugId='+targetHugId + '&hugId='
            +hugId+'&freeConsultation='+freeConsultation+'&graphicConsulting='
            +graphicConsulting+'&fetalheartConsultation='+fetalheartConsultation+
            '&telephoneConsultation='+telephoneConsultation+'&videoConsulting='+videoConsulting;
    });
    //搜索医生按钮
    $(".input_mes").tap(function(){
        var $value=$(".searchInput").val();
        var pagenumber2=1;
        var size=10;
        var page2='&pageNumber='+pagenumber2+'&pageSize='+size;
        if ($value) {
            $.ajax({
                on: true,
                type:"post",
                url: LOCALHOST_URL+ '/web-bin/m/weChat/weChatPublic/query_doctorList_data?accessToken=' + accessToken + '&usId=' + usId+page2+'&seachValue='+$value,
                dataType: "json",
                beforeSend:function(XMLHttpRequest ){
                    //加载中
                    $("#searchList_result").html('<div class="loaders"><img src="/web-bin/resources/images/loading_1.gif"/><div>');
                },
                success: function(data){
                    $(".loaders").hide();
                    if (data.res==0) {
                        if (data.data.result.length==0) {
                            $(".null_mes").html('没有匹配结果').show();
                            $("#searchList_result").html("");
                        }else{
                            var newResult2=data.data.result;
                            $(".null_mes").hide();
                            $("#searchList_result").setTemplateElement("template_docList").processTemplate(data.data.result);
                            for(var i=0;i<data.data.result.length;i++){
                                if(data.data.result[i].head){
                                    $("#searchList_result .head").eq(i).append('<img src='+SERVER_URL+FILE_URL+data.data.result[i].head+'/>');
                                }else{
                                    $("#searchList_result .head").eq(i).html('<div class="design_icon"></div>');
                                }
                            }
                            $('img').on('error', function () {
                                $(this).prop('src', '/web-bin/weChat/weChatPublic/img/docHead.png');
                            });
                            $(".search_res").on('scroll',function(){
                                var p=$(this).scrollTop();
                                var listScroll=$("#searchList_result").height()+17-$(".search_res").height();
                                if(listScroll-p<2){
                                    pagenumber2++;
                                    page2='&pageNumber='+pagenumber2+'&pageSize='+size;
                                    $.ajax({
                                        async:true,
                                        on: true,
                                        type:"post",
                                        url: LOCALHOST_URL+ '/web-bin/m/weChat/weChatPublic/query_doctorList_data?accessToken=' + accessToken + '&usId=' + usId+page2+'&seachValue='+$value,
                                        dataType: "json",
                                        beforeSend:function(){
                                            $("#searchList_result li:last").append('<div class="show_more"><div class="show_more_box">' +
                                                '<img src="/web-bin/resources/images/loading_1.gif" width="20px"/></div></div>');
                                        },
                                        success: function(data){
                                            $(".show_more").remove();
                                            if(data.res==0) {
                                                if(data.data && data.data.result.length!=0){
                                                    newResult2=newResult2.concat(data.data.result);
                                                    $("#searchList_result").setTemplateElement("template_docList").processTemplate(newResult2);
                                                    for(var i=0;i<newResult2.length;i++){
                                                        if(newResult2[i].head){
                                                            $("#searchList_result .head").eq(i).append('<img src='+SERVER_URL+FILE_URL+newResult2[i].head+'/>');
                                                        }else{
                                                            $("#searchList_result .head").eq(i).html('<div class="design_icon"></div>');
                                                        }
                                                    }
                                                    $('img').on('error', function () {
                                                        $(this).prop('src', '/web-bin/weChat/weChatPublic/img/docHead.png');
                                                    });
                                                }
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    }
                }
            });
        } else {
            $(".null_mes").html('请输入查询内容').show();
            $("#searchList_result").html("");
        }
    });
    $(document).on("tap","#searchList_result li",function(e){
        var targetHugId=$(this).attr("data-hgId");
        var freeConsultation=$(this).find(".freeConsultation").val();
        var graphicConsulting=$(this).find(".graphicConsulting").val();
        var fetalheartConsultation=$(this).find(".fetalheartConsultation").val();
        var telephoneConsultation=$(this).find(".telephoneConsultation").val();
        var videoConsulting=$(this).find(".videoConsulting").val();
        location.href=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/to_doctorMain_page?' +
            'accessToken=' + accessToken +'&usId=' + usId + '&targetHugId='+targetHugId + '&hugId='
            +hugId+'&freeConsultation='+freeConsultation+'&graphicConsulting='
            +graphicConsulting+'&fetalheartConsultation='+fetalheartConsultation+
            '&telephoneConsultation='+telephoneConsultation+'&videoConsulting='+videoConsulting;
    });
    //输入框
    $(".searchInput").focus(function(){
        $(".search").css({width:"80%",marginLeft:"0.1rem"});
        $(".cancle").show();
        $(".search_res").fadeIn(500);
    }).on('input',function(){
        $(".input_mes span").html($(".searchInput").val());
    });
    //取消按钮
    $(".cancle").click(function(e){
        $(".searchInput").val("").blur();
        $(".search").css({width:"95%",margin:'0.1rem auto'});
        $("#searchList_result").html("");
        $(".input_mes span").html("");
        $(".search_res").fadeOut(500);
        $(".null_mes").hide();
        $(".cancle").hide();
    });
    //关注
    $(document).on("tap",".focus",function(event){
        var $focus=$(this);
        var targetHugId=$focus.siblings(".targetHugId").val();
        $.ajax({
            async:true,
            on: true,
            type:"post",
            url: LOCALHOST_URL+ '/web-bin/m/weChat/weChatPublic/query_followDoc_data?accessToken=' + accessToken + '&usId=' + usId+'&targetHugId='+targetHugId,
            dataType: "json",
            success: function(data){
                if(data.res==0) {
                    console.log($focus.siblings(".fans"))
                    var fansNum=parseInt($focus.siblings(".fans").find("span").text());
                    $focus.siblings(".fans").find("span").html(fansNum+1);
                    $focus.remove();
                }
            }
        });
        event.stopPropagation()
    });
});