/**
 * Created by 风殇 on 2018/4/25.
 */
/**
 * Created by CGT on 2018/1/5.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var SERVER_URL=window.HUGPAGE_CONFIG.SERVER_URL;
var FILE_URL=window.HUGPAGE_CONFIG.FILE_URL;
var query=getRequest();
var usId=query.usId||sessionStorage.getItem("usId");
var hgId=query.hgId||sessionStorage.getItem("hgId");
var accessToken=query.accessToken||sessionStorage.getItem("accessToken");
var pageNum=1;//需要加载的页码标号
var pageNumS=1;//需要加载的页码标号
var pageSize=20;//每页的数据条数
var page="&pageNum="+pageNum+"&pageSize="+pageSize;//待拼凑的url参数
var pages="&pageNum="+pageNumS+"&pageSize="+pageSize;//待拼凑的url参数
var hasNextPage=true;
var deptcodes=new Array();
var deptCode="&deptCode="+deptcodes;
var fromType=sessionStorage.getItem("fromType");
var partnerType=query.partnerType||sessionStorage.getItem("partnerType");
var url;
var hospCode;
var wardcodeString=query.wardcode;
var deptcodesString=query.deptcodes;
var deptcode=query.deptcode;
var loadFlag=true;
$(function(){
    callBack3();
    sessionStorage.setItem("usId",usId);
    sessionStorage.setItem("hgId",hgId);
    sessionStorage.setItem("accessToken",accessToken);
    sessionStorage.setItem("fromType",fromType);
    //禁止iPhone的缩放，弹性滚动
    window.onload=function(){
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
    educationShow();
});
function educationShow(){
    hgId=query.hgId||sessionStorage.getItem("hgId");
    accessToken=query.accessToken||sessionStorage.getItem("accessToken");
    partnerType=query.partnerType||sessionStorage.getItem("partnerType");
    $(".bottom").show();
    pageResize();
    $(".main_body").niceScroll({
        cursoropacitymin: 0,
        cursoropacitymax: 0,
    });
    $(".followup_btn").unbind('click').click(function(){
        $(this).addClass("active");
        $(".education_btn,.personal_btn").removeClass("active");
        $("#container").show();
        $("#educationBox,#personal_box").hide();
        contentShow();
    });
    $(".personal_btn").unbind('click').click(function(){
        $(this).addClass("active");
        $(".education_btn,.followup_btn").removeClass("active");
        $("#personal_box").show();
        $("#educationBox,#container").hide();
        personalShow();
    });
    //输入框
    $(".css_search").click(function(){
        $(".search_res").show();
        $(".searchInput").val("").focus();
        $(".searchList_result").html("");
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
        $(".search_res").hide();
    });
    //搜索按钮
    $(".search_follow").click(function(){
        $(".search_body").niceScroll({
            cursoropacitymin: 0,
            cursoropacitymax: 0,
        });
        pages="&pageNum=1&pageSize=30";//待拼凑的url参数
        $("#none").remove();
        var $value=$(".searchInput").val();
        if ($value) {
            $.ajax({
                on: true,
                type:"post",
                url:url+"&patName="+$value+pages,
                beforeSend:function(XMLHttpRequest ){
                    //加载中
                    $(".searchList_result").html('<div class="loaders"><img src="/web-bin/mobile/repository/drug/images/loading_2.gif"/><div>');
                },
                dataType:"json",
                success: function(data){
                    $(".loaders").remove();
                    if (data.res==0) {
                        if (data.data.result.length==0) {
                            $(".search_body").append('<div id="none">'+
                                '<img src="/web-bin/resources/images/nodata2x.png">'+
                                '<p>暂无数据</p>'+
                                '</div>');
                        }else{
                            $("#none").remove();
                            $(".searchList_result").html("").setTemplateElement("template_searchList").processTemplate(data.data.result);
                        }
                    }else{
                        $.alert(data.msg);
                    }
                }
            });
        } else {
            $(".null_mes").html('请输入查询内容').show();
            $(".searchList_result").html("");
        }
    });
    // 点击跳转详情
    $("#educationBox .main_body,.searchList_result").on("click",".item",function(){
        sessionStorage.setItem("fromType",1);
        var $this=$(this);
        var bed=$this.find(".beds").text();
        var wardName=$this.find(".wardName").val();
        var admitDate=$this.find(".admitDate").val();
        var patName=$this.find(".patName").val();
        var phone=$this.find(".phone").val();
        var inhospNo=$this.find(".inhospNo").val();
        var idCard=$this.find(".idCard").val();
        var deptCode=$this.find(".deptCode").val();
        var deptName=$this.find(".deptName").val();
        var wardCode=$this.find(".wardCode").val();
        var patIndexNo=$this.find(".patIndexNo").val()||"";
        var visitCardNo=$this.find(".visitCardNo").val();
        var inhospSerialNo=$this.find(".inhospSerialNo").val();
        var sexName=$this.find(".sexName").val();
        location.href = LOCALHOST_URL+'/web-bin/m/followup/healthCare/to_hosFollowDetail_page?bed='+bed+'&wardName='+wardName+'&admitDate='+admitDate+'&patName='+patName+"&phone="+phone+"&inhospNo="+inhospNo+"&idCard="+idCard+"&deptCode="+deptCode+"&deptName="+deptName+"&wardCode="+wardCode+"&visitCardNo="+visitCardNo+"&patIndexNo="+patIndexNo+"&inhospSerialNo="+inhospSerialNo+'&usId='+usId+'&accessToken='+accessToken+'&partnerType='+partnerType+"&fromType=1"+"&hgId="+hgId+"&hospCode="+hospCode+"&sexName="+sexName;
    });
    //滚动加载列表页面
    $(".main_body").scroll(function(){
        var scrollTop = $(this).scrollTop();//卷上高度
        var contentHeight = $("#main_content").height();
        var windowHeight = $(this).height();//可视区高度
        if(contentHeight-scrollTop-windowHeight==0){
            pageNum++;
            page="&pageNum="+pageNum+"&pageSize="+pageSize;
            /* var url=LOCALHOST_URL+'/web-bin/m/followup/healthCare/query_inHosp_data?usId='+usId+'&accessToken='+accessToken+'&partnerType='+partnerType+"&inhospStatus=false";*/
            loadData(url);
        }
    });

}
//滚动加载列表页面
$(".search_body").scroll(function(){
    var scrollTop = $(this).scrollTop();//卷上高度
    var contentHeight = $(".searchList_result").height();
    var windowHeight = $(this).height();//可视区高度
    if(contentHeight-scrollTop-windowHeight==0){
        pageNumS++;
        var $value=$(".searchInput").val();
        pages="&pageNum="+pageNumS+"&pageSize="+pageSize;
        var urls=url+"&patName="+$value;
        loadDataSearch(urls);
    }
});
function callBack3(){
    var deptcodes=[];
    var wardcodes=[];
    if(deptcodesString){
        deptcodes.push(deptcodesString);
    }else{
        wardcodes.push(wardcodeString);
    }
    deptCodeUrl="&deptCode="+JSON.stringify(deptcodes)+'&wardCode='+JSON.stringify(wardcodes);
    url=LOCALHOST_URL+'/web-bin/m/followup/healthCare/query_inHosp_data?usId='+usId+'&accessToken='+accessToken+'&partnerType='+partnerType+"&inhospStatus=false"+deptCodeUrl;
    loadData(url);
    return  url;
}
function loadData(url){
    $.ajax({
        on: true,
        timeout:60000,
        type:"get",
        url: url+page,
        dataType:"json",
        beforeSend:function(XMLHttpRequest ){
            //加载中
            if(pageNum==1){
                $("#main_content").html('<div class="loaders"><img src="/web-bin/mobile/repository/drug/images/loading_2.gif"/><div>');
            }else{
                if(loadFlag){
                    $("#main_content").append('<div class="show_more"><div class="show_more_box">' +
                        '<img src="/web-bin/resources/images/loading_1.gif" width="20px"/></div></div>');
                }
            }
        },
        success: function(data){
            $(".loaders").remove();
            setTimeout(function(){
                $(".show_more").remove();
            },1000);
            if(data.res!=0 || data.data.result.length==0 ){
                loadFlag=false;
            }
            if(data.res!=0){
                $.alert(data.msg);
                return;
            }
            if(data.data&&data.data.result.length>0){
                var result=data.data.result;
                $.each(result,function (i, item) {
                    if(deptcodesString) {
                        if (!document.getElementById(item.deptCode)) {
                            $("#main_content").append('<div id="' + item.deptCode + '" class="wardBox"><div class="ward_name">' + item.deptName + '</div></div>');
                        }
                        var appendHtml=['<div class="item" data-role="'+item.deptCode+'">',
                            '    <input type="hidden" class="inhospNo" value="'+item.inhospNo+'">',
                            '    <input type="hidden" class="phone" value="'+item.mobileNo+'">',
                            '    <input type="hidden" class="inhospSerialNo" value="'+item.inhospSerialNo+'">' +
                            '    <input type="hidden" class="patIndexNo" value="'+item.patIndexNo+'">',
                            '    <input type="hidden" class="mobileNo" value="'+item.mobileNo+'">' +
                            '    <input type="hidden" class="idCard" value="'+item.idNumber+'">',
                            '    <input type="hidden" class="deptCode" value="'+item.deptCode+'">' +
                            '    <input type="hidden" class="deptName" value="'+item.deptName+'">' +
                            '    <input type="hidden" class="wardCode" value="'+item.wardCode+'">',
                            '    <input type="hidden" class="wardName" value="'+item.wardName+'">',
                            '    <input type="hidden" class="visitCardNo" value="'+item.visitCardNo+'">',
                            '    <input type="hidden" class="patName" value="'+item.patName+'">' +
                            '    <input type="hidden" class="admitDate" value="'+item.admitDate.substring(0,10)+'">',
                            '<input type="hidden" class="sexName" value="'+item.sexName+'">',
                            '    <div class="head">',
                            '    </div>',
                            '    <div class="info">',
                            '        <h4>' +
                            '            <span class="beds">'+item.bedNo+'</span><span class="patName">'+item.patName+'</span>' +
                            '             <span class="sex">'+item.sexName+'</span>' +
                            '       </h4>',
                            '        <p>',
                            '            <span class="wardName">'+item.wardName+'</span>&nbsp;&nbsp;' +
                            '           <span><i class="admitDate" style="font-style: normal;">'+item.admitDate.substring(0,10)+'</i>&nbsp;&nbsp;入院</span>',
                            '        </p>',
                            '    </div>',
                            '</div>'].join("");
                        $("#"+item.deptCode).append(appendHtml);
                    }else{
                        if(!document.getElementById(item.wardCode)){
                            $("#main_content").append('<div id="'+item.wardCode+'" class="wardBox"><div class="ward_name">'+item.wardName+'</div></div>');
                        }
                        var appendHtml=['<div class="item" data-role="'+item.wardCode+'">',
                            '    <input type="hidden" class="inhospNo" value="'+item.inhospNo+'">',
                            '    <input type="hidden" class="phone" value="'+item.mobileNo+'">',
                            '    <input type="hidden" class="inhospSerialNo" value="'+item.inhospSerialNo+'">' +
                            '    <input type="hidden" class="patIndexNo" value="'+item.patIndexNo+'">',
                            '    <input type="hidden" class="mobileNo" value="'+item.mobileNo+'">' +
                            '    <input type="hidden" class="idCard" value="'+item.idNumber+'">',
                            '    <input type="hidden" class="deptCode" value="'+item.deptCode+'">' +
                            '    <input type="hidden" class="deptName" value="'+item.deptName+'">' +
                            '    <input type="hidden" class="wardCode" value="'+item.wardCode+'">',
                            '    <input type="hidden" class="wardName" value="'+item.wardName+'">',
                            '    <input type="hidden" class="visitCardNo" value="'+item.visitCardNo+'">',
                            '    <input type="hidden" class="patName" value="'+item.patName+'">' +
                            '    <input type="hidden" class="admitDate" value="'+item.admitDate.substring(0,10)+'">',
                            '<input type="hidden" class="sexName" value="'+item.sexName+'">',
                            '    <div class="head">',
                            '    </div>',
                            '    <div class="info">',
                            '        <h4>' +
                            '            <span class="beds">'+item.bedNo+'</span><span class="patName">'+item.patName+'</span>' +
                            '             <span class="sex">'+item.sexName+'</span>' +
                            '       </h4>',
                            '        <p>',
                            '            <span class="wardName">'+item.wardName+'</span>&nbsp;&nbsp;' +
                            '           <span><i class="admitDate" style="font-style: normal;">'+item.admitDate.substring(0,10)+'</i>&nbsp;&nbsp;入院</span>',
                            '        </p>',
                            '    </div>',
                            '</div>'].join("");
                        $("#"+item.wardCode).append(appendHtml);
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
                })
            }else{
                if(pageNum==1){
                    $("#main_content").append('<div id="none">'+
                        '<img src="/web-bin/resources/images/nodata2x.png">'+
                        '<p>暂无数据</p>'+
                        '</div>');
                }
            }
        }
    });
}
function loadDataSearch(urls){
    $.ajax({
        on: true,
        timeout:60000,
        type:"get",
        url: urls+pages,
        dataType:"json",
        success: function(data){
            if(data.data&&data.data.result.length>0){
                var result=data.data.result;
                $.each(result,function (i, item) {
                    var appendHtml=['<div class="item" data-role="'+item.wardCode+'">',
                        '    <input type="hidden" class="inhospNo" value="'+item.inhospNo+'">',
                        '    <input type="hidden" class="phone" value="'+item.mobileNo+'">',
                        '    <input type="hidden" class="inhospSerialNo" value="'+item.inhospSerialNo+'">' +
                        '    <input type="hidden" class="patIndexNo" value="'+item.patIndexNo+'">',
                        '    <input type="hidden" class="mobileNo" value="'+item.mobileNo+'">' +
                        '    <input type="hidden" class="idCard" value="'+item.idNumber+'">',
                        '    <input type="hidden" class="deptCode" value="'+item.deptCode+'">' +
                        '    <input type="hidden" class="deptName" value="'+item.deptName+'">' +
                        '    <input type="hidden" class="wardCode" value="'+item.wardCode+'">',
                        '    <input type="hidden" class="wardName" value="'+item.wardName+'">',
                        '    <input type="hidden" class="visitCardNo" value="'+item.visitCardNo+'">',
                        '    <input type="hidden" class="patName" value="'+item.patName+'">' +
                        '    <input type="hidden" class="admitDate" value="'+item.admitDate.substring(0,10)+'">',
                        '<input type="hidden" class="sexName" value="'+item.sexName+'">',
                        '    <div class="head">',
                        '    </div>',
                        '    <div class="info">',
                        '        <h4>' +
                        '            <span class="beds">'+item.bedNo+'</span><span class="patName">'+item.patName+'</span>' +
                        '             <span class="sex">'+item.sexName+'</span>' +
                        '       </h4>',
                        '        <p>',
                        '            <span class="wardName">'+item.wardName+'</span>&nbsp;&nbsp;' +
                        '           <span><i class="admitDate" style="font-style: normal;">'+item.admitDate.substring(0,10)+'</i>&nbsp;&nbsp;入院</span>',
                        '        </p>',
                        '    </div>',
                        '</div>'].join("");
                    $(".searchList_result").append(appendHtml);
                })
            }
        }
    });
}
function pageResize(){
    $(".main_body").height($(window).height()-$(".search_box").height());
    $(".search_body").height($(window).height()-$(".search_box").height());
}
function compare(property){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}
function timeStr(date){
    var Sdate=new Date(date);
    var Syear=Sdate.getFullYear();
    var Smonth=(Sdate.getMonth()+1)<10?"0"+(Sdate.getMonth()+1):(Sdate.getMonth()+1);
    var Sday=Sdate.getDate()<10?"0"+Sdate.getDate():Sdate.getDate();
    return Syear+"-"+Smonth+"-"+Sday;
}
function loginInit(){
    $(".login_content #tel,.login_content #vcode").val('');
    $(".login_content ul li.token,.login_content ul li.pwd").hide().val('');
}
function loginHeight(){
    var login_top=$(".login_header").height()+10;
    $(".login_content").css({'margin-top':login_top});
}