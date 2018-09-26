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
    var targetHugId=query.targetHugId;
    // var hospCode=query.hospCode;
    var freeConsultation=query.freeConsultation;
    var graphicConsulting=query.graphicConsulting;
    var fetalheartConsultation=query.fetalheartConsultation;
    var telephoneConsultation=query.telephoneConsultation;
    var videoConsulting=query.videoConsulting;
    $.ajax({
        async:true,
        on: true,
        type:"post",
        url: LOCALHOST_URL+ '/web-bin/m/weChat/weChatPublic/query_doctorMain_data?accessToken=' + accessToken + '&usId=' + usId+'&hgId='+hugId+'&targetHugId='+targetHugId+'&type=3',
        dataType: "json",
        success: function(data){
            if(data.res==0) {
                var main=data.data;
                $(".name").html(main.name);
                $(".deptName").html(main.deptName);
                $(".hosp").html(main.hosp);
                $(".fans").find("span").html(main.countFollow);
                if(main.shortDesc){
                    $(".doc_description").find("span").html('专长：'+main.shortDesc);
                }else{
                    $(".doc_description").find("span").html('该医生暂无介绍');
                }
                $("#followId").val(main.followId);
                if(main.deptName && main.hosp){
                    $(".line").show();
                }
                if(main.deptName==undefined && main.hosp){
                    $(".dept div").eq(2).css("paddingLeft","0")
                }
                if(data.data.head){
                    $(".head").append('<img src='+SERVER_URL+FILE_URL+main.head+'/>');
                }
                $('.head img').on('error', function () {
                    $(this).prop('src', '/weChat/weChatPublic/img/docHead.png');
                });
                if(main.isFollow!=0){
                    $(".service_box").show();
                    if(freeConsultation!=-1 && freeConsultation!=0){
                        $(".freeConsultation").html(freeConsultation+'天');
                        if(freeConsultation>=365){
                            $(".freeConsultation").html('一年');
                        }
                    }
                    if(freeConsultation==0){
                        $(".freeConsultation").html('无期限');
                    }
                    if(graphicConsulting!=-1){
                        $(".graphicConsulting").html(graphicConsulting+'元/次');
                    }
                    if(fetalheartConsultation!=-1 && fetalheartConsultation!=0){
                        $(".fetalheartConsultation").html(fetalheartConsultation+'元/次');
                    }
                    if(fetalheartConsultation==0){
                        $(".fetalheartConsultation").html('免费');
                    }
                    /*if(telephoneConsultation!=-1){
                        $(".telephoneConsultation").html(telephoneConsultation+'元/次');
                    }
                    if(videoConsulting!=-1){
                        $(".videoConsulting").html(videoConsulting+'元/次');
                    }*/
                    $(".focus_box").hide();
                    $(".no_focus_box").show();
                }
            }
        }
    });
    $(".focus").tap(function(){
        $.ajax({
            async:true,
            on: true,
            type:"post",
            url: LOCALHOST_URL+ '/web-bin/m/weChat/weChatPublic/query_followDoc_data?accessToken=' + accessToken + '&usId=' + usId+'&targetHugId='+targetHugId,
            dataType: "json",
            success: function(data){
                if(data.res==0) {
                    $(".service_box").show();
                    $(".focus_box").hide();
                    $(".no_focus_box").show();
                    $("#followId").val(data.data.followId);
                }
            }
        });
    });
    $(".no_focus").tap(function(){
        var followId=$("#followId").val();
        $.ajax({
            async:true,
            on: true,
            type:"post",
            url: LOCALHOST_URL+ '/web-bin/m/weChat/weChatPublic/query_nofollowDoc_data?accessToken=' + accessToken + '&usId=' + usId+'&followId='+followId,
            dataType: "json",
            success: function(data){
                if(data.res==0) {
                    $(".service_box").hide();
                    $(".focus_box").show();
                    $(".no_focus_box").hide();
                }
            }
        });
    });
    // 咨询医生
    $(".doc_chat").tap(function(){
        var doctorName=$(".name").text();
        location.href=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/to_chat_page?accessToken=' + accessToken +'&usId=' + usId + '&targetHugId='+targetHugId+'&hugId='+hugId+'&head='+$(".head").find("img").attr("src")+'&doctorName='+doctorName;
    })
});