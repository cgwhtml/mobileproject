/**
 * Created by CGT on 2017/10/20.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query=getRequest();
var hospCode=query.hospCode||sessionStorage.getItem("hospCode");
var usId=query.usId||sessionStorage.getItem("usId");
var accessToken=query.accessToken||sessionStorage.getItem("accessToken");
var hgId=query.hgId||sessionStorage.getItem("hgId");
$(function(){
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
    $(".footer p").niceScroll({
        railpadding : {top : 0,right : 0,left : 0,bottom : 0}
    });
    $.ajax({
        on: true,
        type:"get",
        url:LOCALHOST_URL+'/web-bin/m/followup/feedBack/query_feedBackDetail_data?recordId='+query.recordId+'&hospCode='+hospCode+'&usId='+usId+'&accessToken='+accessToken,
        dataType:"json",
        success: function(data){
            console.log(data);
            if(data.data&&data.res==0){
                if(data.data.processStatus==4){
                    $(".header span").text('待处理');
                }else{
                    $(".header span").text('已受理');
                }
                if(data.data.acceptType==1){
                    $(".event_type span").text('投诉');
                    $(".category label").text('投诉类别');
                    $(".target label").text('投诉对象');
                    $(".purpose label").text('投诉目的');
                }else if(data.data.acceptType==2){
                    $(".event_type span").text('表扬');
                    $(".category label").text('表扬类别');
                    $(".target label").text('表扬对象');
                    $(".purpose label").text('表扬目的');
                }
                $(".category span").text(data.data.categoryName);
                $(".target span").text(data.data.cpPersonName);
                $(".purpose span").text(data.data.cpPurposeName);
                $(".event_describe_input").text(data.data.cpDetail);
            }else{
                alert(data.msg||'页面过时');
            }
        }
    });
});