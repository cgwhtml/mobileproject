/**
 * Created by CGT on 2017/11/20.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query=getRequest();
var hospCode=query.hospCode;
var usId=query.usId;
var accessToken=query.accessToken;
var hgId=query.hgId;
var num=1;
var serialNo=query.serialNo;
var hasNextPage=true;
var u = navigator.userAgent;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
heightResize();
$(function(){
    $(".content").niceScroll({
        cursoropacitymin: 0,
        cursoropacitymax: 0,
    });
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
        document.body.addEventListener('touchmove', function (e) {
            e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
        }, {passive: false});
    };
    //加载列表
    var page='&pageNumber='+num+'&pageSize=15';
    dataAjax(page,'',false);
    /*//点击搜索按钮
    $(".icon_slide").click(function(){
        $(".search").focus();
    });
    $(".search").focus(function(){
        $(".icon_slide").animate({'left':0,'margin-left':5}).find("span").text('');
        $(".search_cancel").show();
        $(".search_slideDown").slideDown();
        setTimeout(function(){
            $(".search_result").height($(window).height()-$("header").height()).css({"top":$("header").height()}).show();
        },500);
    }).on('input',function(){
        var search_txt=$(this).val();
        $(".search_txt").text(search_txt);
    });
    $(".search_cancel").click(function(){
        $(".icon_slide").animate({'left':'50%','margin-left':'-0.5rem'}).find("span").text('搜索');
        $(".search_cancel").hide();
        $(".search_slideDown").slideUp();
        $(".search").val('');
        $('.search_list').html('');
        $(".search_result .search_txt").text('');
        $(".search_result").hide();
        setTimeout(function(){
            heightResize();
        },500);
    });*/
    //输入框
    $(".css_search").click(function(){
        $(".search_result").show();
        $(".searchInput").val("").focus();
        $(".search_result_list").html("");
        $(".search_end").remove();
    });
    $(".searchInput").on('input',function(){
        $(".cancle").hide();
        $(".search_follow").show();
        if(!$(this).val()){
            $(".cancle").show();
            $(".search_follow").hide();
        }
    });
    //取消按钮
    $(".cancle").click(function(){
        $(".search_result").hide();
    });
    //滚动加载列表
    $(".content").scroll(function(){
        var scrollTop = $(this).scrollTop();
        var scrollHeight =$(".e").height();
        var windowHeight =$(this).find(".ques_box").height();
        // console.log(scrollTop);
        // console.log(windowHeight);
        // console.log(scrollHeight);
        var y=(scrollTop+windowHeight)%scrollHeight;
        // console.log(y);
        if(y==0){
            num++;
            // console.log(num);
            var $div=$("<div class='patient_list e'></div>");
            $(".e").removeClass("e").after($div);
            var page='&pageNumber='+num+'&pageSize=15';
            dataAjax(page,'',true);
        }
    });
    //点击搜索
    $(".search_follow").click(function(){
        var search_txt=$(".searchInput").val();
        var page='&pageNumber=1&pageSize=30';
        var search="&formTitle="+search_txt;
        dataAjax(page,search,false);
    });
    $("section").on('tap','.patient_list ul li',function(event){//生成URL
        var id=$(this).find(".id").val();
        var idList=[];
        idList.push(id);
        var obj={
            hospCode:query.hospCode,
            phone:query.phone,
            patName:query.patName,
            idCard:query.idNumber,
            patHugId:query.hgId,
            isNewPhone:0,
            usId:query.usId,
            accessToken:query.accessToken,
            inhospSerialNo:query.serialNo,
            inhospNo:query.inhospNo,
            patIndexNo:query.patIndexNo,
            visitCardNo:query.visitCardNo,
            bedNo:query.bedNo,
            deptCode:query.deptCode,
            deptName:query.deptName,
            wardCode:query.wardCode,
            wardName:query.wardName,
            attendDrName:query.attendDrName,
            id:id
        };
        $.ajax({
            on: true,
            timeout:60000,
            type:"get",
            url: LOCALHOST_URL+'/web-bin/m/followup/satisSurvey/get_urlBuild_data?'+returnUrl(obj),
            dataType:"json",
            beforeSend:function(){
                $(".e,.search_list").append('<div class="load_followup"><img src="/web-bin/mobile/followup/followupTask/img/loading.gif"/><div>');
            },
            success: function(data){
        // var data={
        //     data:{url:"http://www.baidu.com"},
        //     res:0
        // };
                console.log(data);
                if(data.data&&data.res==0){
                    var url=data.data.url.indexOf("http")!=-1?data.data.url:'http://'+data.data.url;
                    // alert(url);
                    if(!isiOS) {
                        window.WebViewJavascriptBridge.callHandler('urlPost', {'msg': url}, function(response) {
                            //$(".form_foot").text(response);
                        });
                        // window.location.href='http://'+url;
                    }else{
                        // alert(url);
                        setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('urlPost', {'msg': url}, function(response) {
                            });
                        });
                        // window.location.href='http://'+url;
                    }
                }else{
                    alert(data.msg);
                }
            },
            complete:function(){
                $(".e .load_followup,.search_list .load_followup").remove();
            }
        });
        event.stopPropagation();
    });
});
function dataAjax(page,search,noloading){
    $.ajax({
        on: true,
        type:"get",
        url:LOCALHOST_URL+'/web-bin/m/followup/satisSurvey/get_questionList_data?hospCode='+hospCode+'&hgId='+hgId+'&usId='+usId+'&accessToken='+accessToken+page+search+'&serialNo='+serialNo,
        dataType:"json",
        beforeSend:function(XMLHttpRequest){
            //加载中
            if(!noloading){
                if(search){
                    $(".search_list").html('<div class="load_followup"><img src="/web-bin/mobile/followup/followupTask/img/loading.gif"/><div>');
                }else{
                    $(".e").html('<div class="load_followup"><img src="/web-bin/mobile/followup/followupTask/img/loading.gif"/><div>');
                }
            }
        },
        success: function(data){
            console.log(data);
                if(search){
                    if(data.res==0&&data.data&&data.data.list.length>0){
                        idList=data.data.list;
                        $.each(data.data.list,function(i){
                            if(data.data.list[i].submitStatus==1){
                                data.data.list[i].active="active";
                            }
                        });
                        console.log(data.data.list);
                        $(".search_result_list").setTemplateElement("search_list_temp").processTemplate(data.data.list);
                        var $end=$('<p style="margin-top:10px;">全部加载完毕<p>');
                        $("#search_end").html($end);
                    }else{
                        $('.search_list').html('<div id="none">'+
                            '<img src="/web-bin/resources/images/nodata2x.png">'+
                            '<p>暂无数据</p>'+
                            '</div>');
                    }
                }else{
                    if(data.data&&data.res==0){
                        pageCount(data);
                        if(!hasNextPage) {
                            var $end = $('<p style="margin-top:10px;">全部加载完毕<p>');
                            $("#end").html($end);
                        }
                        if(data.data.list.length>0){
                            $.each(data.data.list,function(i){
                                if (data.data.list[i].submitStatus == 1) {
                                    data.data.list[i].active = "active";
                                }
                            });
                            console.log(data.data.list);
                            $(".e").setTemplateElement("question_list_temp").processTemplate(data.data.list);
                        }else{
                            if(num==1){
                                $('.e').html('<div id="none">' +
                                    '<img src="/web-bin/resources/images/nodata2x.png">' +
                                    '<p>暂无数据</p>' +
                                    '</div>');
                            }else{
                                var $end = $('<p style="margin-top:10px;">全部加载完毕<p>');
                                $("#end").html($end);
                            }
                        }
                    }else{
                            if(num==1){
                                $('.e').html('<div id="none">' +
                                    '<img src="/web-bin/resources/images/nodata2x.png">' +
                                    '<p>暂无数据</p>' +
                                    '</div>');
                            }else{
                                var $end = $('<p style="margin-top:10px;">全部加载完毕<p>');
                                $("#end").html($end);
                            }
                        }
                    }
                },
        complete:function(){
            if(!noloading){
                $(".e .load_followup,.search_list .load_followup").remove();
            }
        }
    });
}
function heightResize(){
   /* $(".content .ques_box").css({"margin-top":$('.search_box').height()+10});
    $(".content .ques_box").height($(window).height()-$('.search_box').height()-10);*/
    // $(".content").css({'margin-top':$('header').height()+10});
    $('.content').height($(window).height()-$(".search_box").height());
}
function returnUrl(obj){
    var str='';
    $.each(obj,function(i,val){
        str=str+'&'+i+'='+val;
    });
    str=str.substring(1);
    console.log(str);
    return str;
}
//js桥
function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe);}, 0);
}
function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge);
    } else {
        document.addEventListener(
            'WebViewJavascriptBridgeReady'
            , function() {
                callback(WebViewJavascriptBridge);
            },
            false
        );
    }
}
function pageCount(data){
    if(num*15<data.total){
        hasNextPage=true;
    }
}
