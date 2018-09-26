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
var urls=LOCALHOST_URL+'/web-bin/m/followup/healthCare/get_educationDetail_data?accessToken='+query.accessToken+'&partnerType='+partnerType+'&usId='+query.usId+"&patName="+patName+"&inhospNo="+query.inhospNo+"&category=0"+"&phone="+phone+"&idCard="+query.idCard;
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
$(function(){
    pageResize();
    $(".content").niceScroll({
        cursoropacitymin: 0,
        cursoropacitymax: 0,
    });
    $(".bed").text(decodeURI(query.bed));
    $(".patName").text(decodeURI(query.patName));
    if(query.wardName && query.wardName!="undefined"){
        $(".wardName").text(decodeURI(query.wardName));
    }else{
        $(".wardName").css("marginRight",0)
    }
    $(".admitDate").text(query.admitDate);
    var oneFlag=false;
    $("#allAndOne").click(function(){
        oneFlag=!oneFlag;
        if(oneFlag){
            if(urls.indexOf("&sourseId")!==-1){
                var urlArr=urls.split("&");
                var index=$.inArray("&sourseId="+query.usId,urlArr);
                urlArr.splice(index,1);
                urls=urlArr.join("&");
                $(this).text("只看自己");
            }
            loadEducation();
        }else{
            if(urls.indexOf("sourseId")){
                urls+="&sourseId="+query.usId;
                $(this).text("查看全部");
                loadEducation();
            }
        }
    });
    $("#allAndOne").click();
    // 查权限
    $.ajax({
        async:false,
        timeout:60000,
        type:"get",
        url: LOCALHOST_URL+'/web-bin/m/followup/healthCare/query_doctor_power?usId='+query.usId+'&accessToken='+query.accessToken+'&partnerType='+query.partnerType,
        dataType:"json",
        beforeSend:function(XMLHttpRequest ){
            //加载中
            $(".pat").append('<div class="loaders"><img src="/web-bin/mobile/repository/drug/images/loading_2.gif"/><div>');
        },
        success: function(data){
            $(".loaders").remove();
            if(data.data&&data.res==0){
                callBack3(data);
            }else{
                alert(data.msg);
            }
        }
    });
    function loadEducation(){
        $.ajax({
            on:true,
            type:"get",
            url:LOCALHOST_URL+'/web-bin/m/followup/healthCare/get_patientPhone_data?usId='+query.usId+'&accessToken='+query.accessToken+'&partnerType='+partnerType+"&inhospNo="+query.inhospNo+"&inhospSerialNo="+query.inhospSerialNo+"&patIndexNo="+query.patIndexNo+"&patName="+patName,
            dataType:"json",
            beforeSend:function(XMLHttpRequest ){
                //加载中
                if(pageNumber==1){
                    $(".pat").append('<div class="loaders"><img src="/web-bin/mobile/repository/drug/images/loading_2.gif"/><div>');
                }
            },
            success:function(data){
                $(".loaders").remove();
                if(data.data&&data.res==0){
                    phone=data.data.mobileNo;
                    isNewPhone=1;
                }else{
                    phone=query.phone;
                    isNewPhone=0;
                }
                $(".header").click(function(){
                    location.href=LOCALHOST_URL+'/web-bin/m/followup/healthCare/to_medicalRecordList_page?partnerType=4&hugId='+query.hgId+'&name='+patName+'&phone='+phone+'&hospCode='+query.hospCode+'&usId='+query.usId+'&accessToken='+query.accessToken+'&inHosNo=&visitCardNo='+query.visitCardNo+'&sex='+query.sexName;
                });
                $.ajax({
                    on:true,
                    type:"get",
                    url:urls+page,
                    dataType:"json",
                    beforeSend:function(XMLHttpRequest ){
                        //加载中
                        if(pageNumber==1){
                            $(".pat").html('<div class="loaders"><img src="/web-bin/mobile/repository/drug/images/loading_2.gif"/><div>');
                        }
                    },
                    success:function(data){
                        $(".loaders").remove();
                        if(data.data&&data.res==0){
                            if(data.data.result.length>0){
                                $(".pat").html("");
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
                                Sarr.push(res);
                                console.log("first");
                                console.log(Sarr);
                                for(var j=0;j<res.length;j++){
                                    var con_time=res[j].sendTimeStr;
                                    $(".pat").append("<div class='con_box'><div class='con_box_time'></div><div class='sm_spot'></div><ul class='con_box_list'></ul></div>").find(".con_box_time").eq(j).text(con_time);
                                    for(var k=0;k<res[j].id.length;k++){
                                        $(".pat .con_box_list").eq(j).append('<li><div class="question_img"></div><div class="education_span">'+res[j].title[k]+'</div><a class="con_btn"></a><input type="hidden" value="'+res[j].isBack[k]+'" class="isBack"><input type="hidden" class="id" value="'+res[j].id[k]+'"></li>');
                                    }
                                }
                                btnShow();
                            }else{
                                $(".pat").html(
                                    '<div id="none">'+
                                    '<img src="/web-bin/resources/images/nodata2x.png">'+
                                    '<p>暂无数据</p>'+
                                    '</div>'
                                );
                            }
                        }else{
                            $(".pat").html(
                                '<div id="none">'+
                                '<img src="/web-bin/resources/images/nodata2x.png">'+
                                '<p>暂无数据</p>'+
                                '</div>'
                            );
                        }
                    }
                });
            }
        });
    }
    //查询列表
    // var result=[{id:"123",IsBack:true,title:"胆固醇",sendTime:"2017-7-7"},{id:"124",IsBack:false,title:"糖蛋白",sendTime:"2017-7-8"}];
    // $(".pat").setTemplateElement("content_temp").processTemplate(result);
    // btnShow();
    //滚动加载列表页面
    $(".content").scroll(function(){
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(".pat").outerHeight()+10;
        var windowHeight = $(this).height();
        var yushu=(scrollTop+windowHeight)%scrollHeight;
        if(yushu==0){
            // alert('scrollTop='+scrollTop+"windowHeight="+windowHeight+"scrollHeight="+scrollHeight+"yushu1="+(scrollTop+windowHeight)%scrollHeight);
            $(".pat").removeClass("pat").after('<div class="pat"><div>');
            pageNumber++;
            page="&pageNumber="+pageNumber+"&pageSize="+pageSize;
            $.ajax({
                on: true,
                timeout:60000,
                type:"get",
                url: urls+page,
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
                                    $(".pat").siblings("div").find(".con_box_list:last").append('<li><div class="question_img"></div><div class="education_span">'+res[0].title[j]+'</div><a class="con_btn"></a><input type="hidden" value="' + res[0].isBack[j] + '" class="isBack"><input type="hidden" class="id" value="' + res[0].id[j] + '"></li>');
                                }
                                for(var k=1;k<res.length;k++){
                                    console.log(456);
                                    var con_time=res[k].sendTimeStr;
                                    console.log(con_time);
                                    $(".pat").append("<div class='con_box'><div class='con_box_time'>"+con_time+"</div><div class='sm_spot'></div><ul class='con_box_list'></ul></div>");
                                    for(var v=0;v<res[k].id.length;v++){
                                        $(".pat .con_box_list").eq(k-1).append('<li><div class="question_img"></div><div class="education_span">'+res[k].title[v]+'</div><a class="con_btn"></a><input type="hidden" value="'+res[k].isBack[v]+'" class="isBack"><input type="hidden" class="id" value="'+res[k].id[v]+'"></li>');
                                    }
                                }
                            }else{
                                for(var j=0;j<res.length;j++){
                                    var con_time=res[j].sendTimeStr;
                                    console.log(con_time);
                                    $(".pat").append("<div class='con_box'><div class='con_box_time'></div><div class='sm_spot'></div><div class='sm_spot'></div><ul class='con_box_list'></ul></div>").find(".con_box_time").eq(j).text(con_time);
                                    for(var k=0;k<res[j].id.length;k++){
                                        $(".pat .con_box_list").eq(j).append('<li><div class="question_img"></div><div class="education_span">'+res[j].title[k]+'</div><a class="con_btn"></a><input type="hidden" value="'+res[j].isBack[k]+'" class="isBack"><input type="hidden" class="id" value="'+res[j].id[k]+'"></li>');
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
        location.href = LOCALHOST_URL+'/web-bin/m/followup/healthCare/to_hosFollowSelect_page?usId='+query.usId+'&accessToken='+query.accessToken+'&partnerType='+partnerType+'&patName='+patName+"&phone="+phone+"&inhospNo="+query.inhospNo+"&idCard="+query.idCard+"&deptCode="+query.deptCode+"&deptName="+decodeURI(query.deptName)+"&wardCode="+query.wardCode+"&visitCardNo="+query.visitCardNo+"&wardName="+decodeURI(query.wardName)+"&inhospSerialNo="+query.inhospSerialNo+"&bed="+query.bed+"&admitDate="+query.admitDate+"&isNewPhone="+isNewPhone+"&hgId="+query.hgId;
    });
    //查看详情
    $("body").on("click",".con_box ul li",function(){
        var id=$(this).find(".id").val();
        location.href=LOCALHOST_URL+'/web-bin/m/nosen/oneparam/followup/form/to_replyForm_page/'+id+"?app=1&isDoc=1";
    });
});
//已读未读显示
function btnShow(){
    $(".con_box ul li").each(function(){
        var $this=$(this);
        if($this.find(".isBack").val()!=="undefined"){
            console.log(true);
            $this.find(".con_btn").removeClass("unread").addClass("read").text("已回复");
        }else if(($this.find(".isBack").val())=="undefined"){
            console.log(false);
            $this.find(".con_btn").removeClass("read").addClass("unread").text("未回复");
        }else{
            $this.find(".con_btn").removeClass("read").addClass("unread").text("未回复");
        }
    });
}
function pageResize(){
    $(".content").height($(window).height()-$(".header").height()-$(".footer").height()-10);
}
function callBack3(data){
    if(data.data.viewAuth == 1){
        var allDept=1;
        urls+='&allDept=1';
        return;
    }else{
        var deptcodes=[];
        var wardcodes=[];
        if(data.data.deptCodes2 == "all"){
            var allDept=1;
            urls+='&allDept=1';
        }else{
            if(data.data.deptCodes2){
                var deptcodes=data.data.deptCodes2.split(",");
            }
            if(data.data.wardCodes){
                wardcodes=data.data.wardCodes.split(",");
            }
            if(data.data.wardFlag == 1){
                if(data.data.deptCode){
                    deptcodes.push(data.data.deptCode);
                }
                urls+='&deptCodeList='+JSON.stringify(deptcodes);
            }else{
                if(data.data.deptCode){
                    wardcodes.push(data.data.deptCode);
                }
                urls+='&deptCodeList='+JSON.stringify(wardcodes);
            }
            return;
        }
    }
}
