/**
 * Created by CGT on 2017/11/17.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query=getRequest();
var hospCode=query.hospCode;
var usId=query.usId;
var accessToken=query.accessToken;
var hgId=query.hgId;
var sourseId=query.sourseId;
var num=1;
var deptcodes=new Array();
var deptCode="&deptCode="+deptcodes;
var url;
var hasNextPage=true;
var Sarr=[];
var wardArr;
var wardNameArr;
var wardCodeArr;
heightResize();
$(function() {
    $(".search").val('');
    $(".content,.search_result").niceScroll({
        cursoropacitymin: 0,
        cursoropacitymax: 0,
        railpadding : {top : 0,right : 0,left : 0,bottom : 0}
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
    //登录
    // $.ajax({
    //     on: true,
    //     type:"get",
    //     url: LOCALHOST_URL+'/web-bin/m/followup/satisSurvey/post_userLogin_data?phone=18868831950&pwd=123456&type=3',
    //     dataType:"json",
    //     success: function(data){
    //         console.log(data);
    //         usId=data.data.id;
    //         sourseId=data.data.sourseId;
    //         accessToken=data.data.accessToken;
    //         hgId=data.data.hgId;
    //         hospCode=data.data.hospCode;
            // 判断医生权限
            $.ajax({
                on: true,
                timeout:60000,
                type:"get",
                url: LOCALHOST_URL+'/web-bin/m/followup/satisSurvey/query_doctor_power?usId='+usId+'&accessToken='+accessToken,
                dataType:"json",
                success: function(data){
                    console.log(data);
                    if(data.data&&data.res==0){
                        callBack(data);
                    }else{
                        // alert(data.msg);
                    }
                }
            });
    //     }
    // });
    //点击搜索按钮
   /* $(".icon_slide").click(function(){
        $(".search").focus();
    });
    $(".search").focus(function(){
        $(".icon_slide").animate({'left':0,'margin-left':5}).find("span").text('');
        $(".search_cancel").show();
        $(".search_slideDown").slideDown();
        setTimeout(function(){
            $(".search_result").height($(window).height()-$("header").height()-5).css({"top":$("header").height()+5}).show();
        },500);
    }).on('input',function(){
        var search_txt=$(this).val();
        $(".search_txt").text(search_txt);
    });
    //取消搜索
    $(".search_cancel").click(function(){
        $(".icon_slide").animate({'left':'50%','margin-left':'-0.5rem'}).find("span").text('搜索');
        $(".search_cancel").hide();
        $(".search_slideDown").slideUp();
        $(".search").val('');
        $('.search_list').html('');
        $(".search_result .search_txt").text('');
        $(".search_result").hide();
    });*/
    //输入框
    $(".css_search").click(function(){
        $(".search_result").show();
        $(".searchInput").val("").focus();
        $(".search_list").html("");
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
    var canscroll=true;
    $(".content").scroll(function(){
        var windowHeight=$(".content").height();
        var Sheight=0;
        for(var i=0;i<$('.wardName').length;i++){
            Sheight+=$(".wardName").eq(i).height();
        }
        var scrollTop=$(this).scrollTop();
        var def=scrollTop+windowHeight-Sheight;
        if(def==0){
            num++;
            page='&pageNum='+num+'&pageSize=15';
            $(".content").append('<div class="show_more"><div class="show_more_box">' +
                '<img src="/web-bin/resources/images/loading_1.gif" width="20px"/></div></div>');
            if(canscroll){
                dataAjax(url,page,'',true);
            }
        }
    });
    //点击搜索
    $(".search_follow").click(function(){
        var search_txt=$(".searchInput").val();
        var page='&pageNum=1&pageSize=30';
        var search="&patName="+search_txt;
        $(".search_end").remove();
        dataAjax(url,page,search);
    });
    $(".content,.search_result").on('tap','.patient_list ul li',function(event){
        var serialNo=$(this).find(".serialNo").val();
        var phone=$(this).find(".phone").val();
        var patName=$(this).find(".name").text();
        var idNumber=$(this).find(".idNumber").val();
        var inhospNo=$(this).find(".inhospNo").val();
        var patIndexNo=$(this).find(".patIndexNo").val();
        var visitCardNo=$(this).find(".visitCardNo").val();
        var bedNo=$(this).find(".bedNo").text();
        var deptCode=$(this).find(".deptCode").val();
        var deptName=$(this).find(".deptName").val();
        var wardCode=$(this).find(".wardCode").val();
        var wardName=$(this).find(".wardName").val();
        var attendDrName=$(this).find(".attendDrName").val();
        var obj={
            hospCode:hospCode,
            phone:phone,
            patName:patName,
            idNumber:idNumber,
            hgId:hgId,
            isNewPhone:0,
            usId:usId,
            accessToken:accessToken,
            serialNo:serialNo,
            inhospNo:inhospNo,
            patIndexNo:patIndexNo,
            visitCardNo:visitCardNo,
            bedNo:bedNo,
            deptCode:deptCode,
            deptName:deptName,
            wardCode:wardCode,
            wardName:wardName,
            attendDrName:attendDrName
        };
        location.href = LOCALHOST_URL+'/web-bin/m/followup/satisSurvey/to_questionList_page?'+returnUrl(obj);
        event.stopPropagation();
    });
});
function dataAjax(url,page,search,noloading){
    canscroll=false;
    $.ajax({
        on: true,
        type:"get",
        url:url+page+search,
        dataType:"json",
        beforeSend:function(XMLHttpRequest){
            //加载中
            if(!noloading){
                $(".load_followup").remove();
                if(search){
                    $(".search_list").html('<div class="load_followup"><img src="/web-bin/mobile/followup/followupTask/img/loading.gif"/><div>');
                }else{
                    $(".content").html('<div class="load_followup"><img src="/web-bin/mobile/followup/followupTask/img/loading.gif"/><div>');
                }
            }
        },
        success: function(data){
            console.log(data);
            $(".show_more").remove();
            if(search){
                if(data.data&&data.res==0&&data.data.result.length>0){
                    $.each(data.data.result,function(i){
                        if(data.data.result[i].submitStatus==1){
                            data.data.result[i].active="active";
                        }
                    });
                    $(".search_list").setTemplateElement("search_result_temp").processTemplate(data.data.result);
                    var $end=$('<p style="margin-top: 5px;margin-bottom: 5px;font-size: 13px;text-align: center">全部加载完毕<p>');
                    $("#search_end").html($end)
                }else{
                    $('.search_list').html('<div id="none">'+
                        '<img src="/web-bin/resources/images/nodata2x.png">'+
                        '<p>暂无数据</p>'+
                        '</div>');
                }
                $(".ward_name").each(function(){
                    if($(this).text()=="undefined"){
                        $(this).remove();
                    }
                });
                $(".beds").each(function(){
                    if($(this).text()=="undefined"){
                        $(this).remove();
                    }
                });
                $(".wardName").each(function(){
                    if($(this).text()=="undefined"){
                        $(this).next("span").find(".admitDate").css("marginLeft","-12px")
                        $(this).remove();
                    }
                });
            }else{
                if(data.data&&data.res==0){
                    pageCount(data);
                    if(!hasNextPage){
                        var $end=$('<p style="margin-top: 5px;margin-bottom: 5px;font-size: 13px;text-align: center">全部加载完毕<p>');
                        $("#end").html($end);
                    }
                    if(data.data.result.length>0){
                        Sarr=Sarr.concat(data.data.result);
                        wardArr={};
                        wardNameArr=wardNameArr||[];
                        wardCodeArr=wardCodeArr||[];
                        $.each(data.data.result,function(i){
                            if(data.data.result[i].submitStatus==1){
                                data.data.result[i].active="active";
                            }
                            wardNameArr.push(data.data.result[i].wardName);
                            wardCodeArr.push(data.data.result[i].wardCode);
                        });
                        wardArr.wardName=wardNameArr;
                        wardArr.wardCode=wardCodeArr;
                        // console.log(wardArr);
                        // console.log(wardNameArr);
                        // console.log(wardCodeArr);
                        //去重
                        var wardNameStorge=[];
                        var wardCodeStorge=[];
                        var unqueNameArr={};
                        var unqueCodeArr={};
                        $.each(wardArr.wardName,function(i){
                            if(!unqueNameArr[wardArr.wardName[i]]){
                                wardNameStorge.push(wardArr.wardName[i]);
                                unqueNameArr[wardArr.wardName[i]]=1;
                            }
                        });
                        $.each(wardArr.wardCode,function(i){
                            if(!unqueCodeArr[wardArr.wardCode[i]]){
                                wardCodeStorge.push(wardArr.wardCode[i]);
                                unqueCodeArr[wardArr.wardCode[i]]=1;
                            }
                        });
                        // console.log(wardNameStorge);//获取到的wardName数组
                        // console.log(wardCodeStorge);
                        if(wardCodeStorge.length<=1){
                            $(".content").find("#"+wardCodeArr[0]).remove();
                            $(".content").append('<div class="wardName" id="'+wardCodeArr[0]+'" data-role="'+wardNameStorge[0]+'"><div class="patient_area">'+wardNameStorge[0]+'</div><div class="patient_list_box"><div class="patient_list"></div></div></div>');
                            $("#"+wardCodeArr[0]).find(".patient_list").setTemplateElement("patient_list_temp").processTemplate(Sarr);
                            canscroll=true;
                        }else{
                            //按照病区分出数据
                            var result=[];
                            // console.log(wardCodeStorge);
                            // console.log(Sarr);
                            for(var i=0;i<wardCodeStorge.length;i++){
                                result[i]=[];
                                for(var j=0;j<Sarr.length;j++){
                                    if(Sarr[j].wardCode==wardCodeStorge[i]){
                                        result[i].push(Sarr[j]);
                                    }
                                }
                            }
                            // console.log(result);
                            for(var i=0;i<result.length;i++){
                                $(".content").find("#"+result[i][0].wardCode).remove();
                                $(".content").append('<div class="wardName" id="'+result[i][0].wardCode+'" data-role="'+result[i][0].wardName+'"><div class="patient_area">'+result[i][0].wardName+'</div><div class="patient_list_box"><div class="patient_list"></div></div></div>');
                                $("#"+result[i][0].wardCode).find(".patient_list").setTemplateElement("patient_list_temp").processTemplate(result[i]);
                            }
                            canscroll=true;
                        }
                        $(".ward_name").each(function(){
                            if($(this).text()=="undefined"){
                                $(this).remove();
                            }
                        });
                        $(".beds").each(function(){
                            if($(this).text()=="undefined"){
                                $(this).remove();
                            }
                        });
                        $(".wardName").each(function(){
                            if($(this).text()=="undefined"){
                                $(this).next("span").find(".admitDate").css("marginLeft","-12px")
                                $(this).remove();
                            }
                        });
                    }else{
                        if(num==1){
                            $('.content').html('<div id="none">'+
                                '<img src="/web-bin/resources/images/nodata2x.png">'+
                                '<p>暂无数据</p>'+
                                '</div>');
                        }else{
                            var $end=$('<p style="margin-top: 5px;margin-bottom: 5px;font-size: 13px;text-align: center">全部加载完毕<p>');
                            $("#end").html($end);
                        }
                    }
                }else{
                    if(num==1){
                        $('.content').html('<div id="none">'+
                            '<img src="/web-bin/resources/images/nodata2x.png">'+
                            '<p>暂无数据</p>'+
                            '</div>');
                    }else{
                        var $end=$('<p style="margin-top: 5px;margin-bottom: 5px;font-size: 13px;text-align: center">全部加载完毕<p>');
                        $("#end").html($end);
                    }
                }
            }
        },
        complete:function(){
            if(!noloading){
                $(".load_followup").remove();
            }
        }
    });
}
function callBack(data){
    url=LOCALHOST_URL+'/web-bin/m/followup/satisSurvey/get_patientList_data?usId='+usId+'&accessToken='+accessToken+'&sourseId='+sourseId;
    var page='&pageNum='+num+'&pageSize=15';
   if(data.data.viewAuth == 1){
       url+="&inhospStatus=false";
       dataAjax(url,page,'');
       return;
    }else{
        if(data.data.deptCodes2 == "all"){
            url+="&inhospStatus=false";
            dataAjax(url,page,'');
            return;
        }else{
            var deptcodes=[];
            var wardcodes=[];
            if(data.data.deptCodes2){
                deptcodes=data.data.deptCodes2.split(",");
            }
            if(data.data.wardCodes){
                wardcodes=data.data.wardCodes.split(",");
            }
            if(data.data.deptCode){
                if(data.data.wardFlag == 1){
                    deptcodes.push(data.data.deptCode);
                }else{
                    wardcodes.push(data.data.deptCode);
                }
            }
            deptCodeUrl="&deptCode="+JSON.stringify(deptcodes)+'&wardCode='+JSON.stringify(wardcodes);
            url+="&inhospStatus=false" +deptCodeUrl;
            dataAjax(url,page,'')
        }
    }
   /* if(data.data.wardFlag==1){
        if(data.data.deptCodes == "all"){
            url+="&inhospStatus=false";
            dataAjax(url,page,'');
            return;
        }else {
            deptcodes=data.data.deptCodes.split(",");
            deptcodes=JSON.stringify(deptcodes);
            deptCode="&deptCode="+deptcodes;
            url+="&inhospStatus=false"+deptCode;
            dataAjax(url,page,'');
            return;
        }
    }else {
        if(data.data.deptCodes == "all"){
            url+="&inhospStatus=false";
            dataAjax(url,page,'');
            return;
        }else {
            deptcodes = data.data.deptCodes.split(",");
            deptcodes = JSON.stringify(deptcodes);
            deptCode = "&wardCode=" + deptcodes;
            url+="&inhospStatus=false" + deptCode;
            dataAjax(url,page,'');
            return;
        }
    }*/
}
function heightResize(){
    // $(".content").css({'margin-top':$('header').height()+10});
    $('.content').height($(window).height()-$(".search_box").height());
}
function returnUrl(obj){
    var str='';
    $.each(obj,function(i,val){
        str=str+'&'+i+'='+val;
    });
    str=str.substring(1);
    // console.log(str);
    return str;
}
function pageCount(data){
    if(num*15<data.totalCount){
        hasNextPage=true;
    }
}