/**
 * Created by CGT on 2017/8/8.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query=getRequest();
var patName=decodeURI(query.patName);
var pageNumber=1;//需要加载的页码标号
var pageSize=20;//每页的数据条数
var page="&pageNumber="+pageNumber+"&pageSize="+pageSize;//待拼凑的url参数
var phone=query.phone;
var isNewPhone=0;
var Sarr=[];
var partnerType=query.partnerType;
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
    pageResize();
    $(".content").niceScroll({
        railpadding : {top : 0,right : 0,left : 0,bottom : 0}
    });
    $(".bed").text(query.bed);
    $(".patName").text(decodeURI(query.patName));
    $(".wardName").text(decodeURI(query.wardName));
    $(".admitDate").text(query.admitDate);
    //查病人手机号
    // console.log(query.inhospNo);
    // console.log(patName);
    $.ajax({
        on:true,
        type:"get",
        url:LOCALHOST_URL+'/web-bin/m/followup/followupCommon/get_patientPhone_data?usId='+query.usId+'&accessToken='+query.accessToken+'&partnerType='+partnerType+"&inhospNo="+query.inhospNo+"&inhospSerialNo="+query.inhospSerialNo+"&patIndexNo="+query.patIndexNo+"&patName="+patName,
        dataType:"json",
        success:function(data){
            console.log(data);
            if(data.data&&data.res==0){
                phone=data.data.mobileNo;
                isNewPhone=1;
            }else{
                phone=query.phone;
                isNewPhone=0;
            }
            $.ajax({
                on:true,
                type:"get",
                url:LOCALHOST_URL+'/web-bin/m/followup/followupCommon/get_educationDetail_data?usId='+query.usId+'&accessToken='+query.accessToken+'&partnerType='+partnerType+"&patName="+patName+"&inhospNo="+query.inhospNo+"&category=6"+"&phone="+phone+"&idCard="+query.idCard+page,
                dataType:"json",
                success:function(data){
                    console.log(data);
                    if(data.data&&data.res==0){
                        if(data.data.result.length>0){
                            var hash = {};
                            var i = 0;
                            var res = [];
                            data.data.result.forEach(function(item) {
                                var sendTimeStr = item.sendTimeStr.substring(0,10);
                                hash[sendTimeStr] ? res[hash[sendTimeStr] - 1].id.push(item.id)&&res[hash[sendTimeStr] - 1].isBack.push(item.isBack)&&res[hash[sendTimeStr] - 1].title.push(item.title) : hash[sendTimeStr] = ++i && res.push({
                                        id: [item.id],
                                        sendTimeStr: sendTimeStr,
                                        isBack: [item.isBack],
                                        title:[item.title]
                                    })

                            });
                            console.log(res);
                            Sarr.push(res);
                            console.log("first");
                            console.log(Sarr);
                            for(var j=0;j<res.length;j++){
                                var con_time=res[j].sendTimeStr;
                                console.log(con_time);
                                $(".pat").append("<div class='con_box'><div class='con_box_time'></div><ul class='con_box_list'></ul></div>").find(".con_box_time").eq(j).text(con_time);
                                for(var k=0;k<res[j].id.length;k++){
                                    $(".pat .con_box_list").eq(j).append('<li><span class="title">'+res[j].title[k]+'</span><a class="con_btn"></a><input type="hidden" value="'+res[j].isBack[k]+'" class="isBack"><input type="hidden" class="id" value="'+res[j].id[k]+'"></li>');
                                }
                            }
                            btnShow();
                        }else{
                            $(".content").html(
                                '<div id="none">'+
                                '<img src="/web-bin/mobile/medical/patient/images/prompt_icon_data.png">'+
                                '<p>暂无数据</p>'+
                                '</div>'
                            );
                        }
                    }
                }
            });
        }
    });
    //查询列表
    // var result=[{id:"123",IsBack:true,title:"胆固醇",sendTime:"2017-7-7"},{id:"124",IsBack:false,title:"糖蛋白",sendTime:"2017-7-8"}];
    // $(".pat").setTemplateElement("content_temp").processTemplate(result);
    // btnShow();
    //滚动加载列表页面
    $(".content").scroll(function(){
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(".pat").outerHeight()+10;
        var windowHeight = $(this).height();
        console.log("scrollTop="+scrollTop);
        console.log("windowHeight="+windowHeight);
        console.log("scrollHeight="+scrollHeight);
        var yushu=(scrollTop+windowHeight)%scrollHeight;
        if(yushu==0){
            console.log(33333333333);
            // alert('scrollTop='+scrollTop+"windowHeight="+windowHeight+"scrollHeight="+scrollHeight+"yushu1="+(scrollTop+windowHeight)%scrollHeight);
            $(".pat").removeClass("pat").after('<div class="pat"><div>');
            pageNumber++;
            page="&pageNumber="+pageNumber+"&pageSize="+pageSize;
            $.ajax({
                on: true,
                timeout:60000,
                type:"get",
                url: LOCALHOST_URL+'/web-bin/m/followup/followupCommon/get_educationDetail_data?usId='+query.usId+'&accessToken='+query.accessToken+'&partnerType='+partnerType+"&patName="+patName+"&inhospNo="+query.inhospNo+"&category=6"+"&phone="+phone+"&idCard="+query.idCard+page,
                dataType:"json",
                success: function(data){
                    console.log(data);
                    if(data.data&&data.res==0){
                        if(data.data.result.length>0){
                            var hash = {};
                            var i = 0;
                            var res = [];
                            data.data.result.forEach(function(item) {
                                var sendTimeStr = item.sendTimeStr.substring(0,10);
                                hash[sendTimeStr] ? res[hash[sendTimeStr] - 1].id.push(item.id)&&res[hash[sendTimeStr] - 1].isBack.push(item.isBack)&&res[hash[sendTimeStr] - 1].title.push(item.title) : hash[sendTimeStr] = ++i && res.push({
                                        id: [item.id],
                                        sendTimeStr: sendTimeStr,
                                        isBack: [item.isBack],
                                        title:[item.title]
                                    })

                            });
                            console.log(res);
                            console.log(res[0].sendTimeStr);
                            console.log(Sarr);
                            if(res[0].sendTimeStr==Sarr[Sarr.length-1][Sarr[Sarr.length-1].length-1].sendTimeStr){
                                for(var j=0;j<res[0].id.length;j++) {
                                    console.log(234);
                                    console.log(res[0].title[j]);
                                    $(".pat").siblings("div").find(".con_box_list:last").append('<li><span class="title">'+res[0].title[j]+'</span><a class="con_btn"></a><input type="hidden" value="' + res[0].isBack[j] + '" class="isBack"><input type="hidden" class="id" value="' + res[0].id[j] + '"></li>');
                                }
                                for(var k=1;k<res.length;k++){
                                    console.log(456);
                                    var con_time=res[k].sendTimeStr;
                                    console.log(con_time);
                                    $(".pat").append("<div class='con_box'><div class='con_box_time'>"+con_time+"</div><ul class='con_box_list'></ul></div>");
                                    for(var v=0;v<res[k].id.length;v++){
                                        $(".pat .con_box_list").eq(k-1).append('<li><span class="title">'+res[k].title[v]+'</span><a class="con_btn"></a><input type="hidden" value="'+res[k].isBack[v]+'" class="isBack"><input type="hidden" class="id" value="'+res[k].id[v]+'"></li>');
                                    }
                                }
                            }else{
                                for(var j=0;j<res.length;j++){
                                    var con_time=res[j].sendTimeStr;
                                    console.log(con_time);
                                    $(".pat").append("<div class='con_box'><div class='con_box_time'></div><ul class='con_box_list'></ul></div>").find(".con_box_time").eq(j).text(con_time);
                                    for(var k=0;k<res[j].id.length;k++){
                                        $(".pat .con_box_list").eq(j).append('<li><span class="title">'+res[j].title[k]+'</span><a class="con_btn"></a><input type="hidden" value="'+res[j].isBack[k]+'" class="isBack"><input type="hidden" class="id" value="'+res[j].id[k]+'"></li>');
                                    }
                                }
                            }
                            btnShow();
                            Sarr.push(res);
                            console.log("second");
                            console.log(Sarr);
                        }
                    }
                }
            });
        }
    });
    //发送更多宣教
    $(".footer").click(function(){
        location.href = LOCALHOST_URL+'/web-bin/m/followup/followupCommon/to_educationSelect_page?usId='+query.usId+'&accessToken='+query.accessToken+'&partnerType='+partnerType+'&patName='+patName+"&phone="+phone+"&inhospNo="+query.inhospNo+"&idCard="+query.idCard+"&deptCode="+query.deptCode+"&deptName="+decodeURI(query.deptName)+"&wardCode="+query.wardCode+"&visitCardNo="+query.visitCardNo+"&wardName="+decodeURI(query.wardName)+"&inhospSerialNo="+query.inhospSerialNo+"&bed="+query.bed+"&admitDate="+query.admitDate+"&isNewPhone="+isNewPhone+"&hgId="+query.hgId;
    });
    //查看详情
    $("body").on("click",".con_box ul li",function(){
        var id=$(this).find(".id").val();
        location.href=LOCALHOST_URL+'/web-bin/m/nosen/oneparam/followup/education/to_checkEducation_page/'+id+"?app=1&isDoc=1";
    });
});
//已读未读显示
function btnShow(){
    $(".con_box ul li").each(function(){
        var $this=$(this);
        if($this.find(".isBack").val()!=="undefined"){
            console.log(true);
            $this.find(".con_btn").removeClass("unread").addClass("read").text("已读");
        }else if(($this.find(".isBack").val())=="undefined"){
            console.log(false);
            $this.find(".con_btn").removeClass("read").addClass("unread").text("未读");
        }else{
            $this.find(".con_btn").removeClass("read").addClass("unread").text("未读");
        }
    });
}
function pageResize(){
    $(".content").height($(window).height()-$(".header").height()-$(".footer").height()-10);
}
