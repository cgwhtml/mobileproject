/**
 * Created by CGT on 2017/7/13.
 */
var LOCALHOST_URL=window.location.origin;
var IMG_URL=window.HUGPAGE_CONFIG.IMG_URL;
var query=getRequest();
var sex=decodeURIComponent(query.sex);
var hospCode=query.hospCode;
var inHosNo=query.inHosNo;
var visitCardNo=query.visitCardNo;
var arr=[];
var arr2=[];
var num=0;
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
    $("#main_body").height($(window).height()-$("#main_head").height()-5);
    // sessionStorage.setItem("fromType",query.fromType);
    // console.log("fromType="+sessionStorage.getItem("fromType"));
    $("#name").text(decodeURIComponent(query.name));
    $("#sex").text(decodeURIComponent(query.sex));
    if(query.age && query.age!="undefined"){
        $("#age b").text(decodeURIComponent(query.age));
    }
    if(query.phone && query.phone!="undefined"){
        $("#phone").text(query.phone);
    }
    CallBack2();
    $("#main_body").hide();
    if(inHosNo!=""){
        console.log(inHosNo);
        $.ajax({
            on: false,
            type:"get",
            url: LOCALHOST_URL+'/web-bin/m/followup/healthCare/get_medicalRecordList_data?hospCard='+inHosNo+"&hospCode="+hospCode+'&usId='+query.usId+'&accessToken='+query.accessToken+'&partnerType='+partnerType+"&cardType=2",
            dataType:"json",
            success: function(data){
                $("#loading").hide();
                num+=1;
                console.log(num);
                if(data.data&&data.res==0){
                    arr=arr.concat(data.data);
                }else{
                    alert(data.msg);
                }
            }
        });
    }else if(visitCardNo!==""){
        console.log(visitCardNo);
        $.ajax({
            on: false,
            type:"get",
            url: LOCALHOST_URL+'/web-bin/m/followup/healthCare/get_medicalRecordList_data?hospCard='+visitCardNo+"&hospCode="+hospCode+'&usId='+query.usId+'&accessToken='+query.accessToken+'&partnerType='+partnerType+"&cardType=1",
            dataType:"json",
            success: function(data){
                $("#loading").hide();
                console.log(data);
                num+=1;
                console.log(num);
                if(data.data&&data.res==0){
                    arr=arr.concat(data.data);
                }else{
                    alert(data.msg);
                }
                $.ajax({
                    on: false,
                    type:"get",
                    url: LOCALHOST_URL+'/web-bin/m/followup/healthCare/get_medicalRecordList_data?hospCard='+visitCardNo+"&hospCode="+hospCode+'&usId='+query.usId+'&accessToken='+query.accessToken+'&partnerType='+partnerType+"&cardType=2",
                    dataType:"json",
                    success: function(data){
                        num+=1;
                        console.log(num);
                        if(data.data&&data.res==0){
                            arr=arr.concat(data.data);
                        }else{
                            alert(data.msg);
                        }
                        // setTimeout(function(){
                            arrShow(arr);
                            $("#main_body").show();
                            $("#loading").hide();
                            CallBack(arr2);
                        // },1000);
                    }
                });
            }
        });
    }
});
function arrShow(arr){
    for(var i=0;i<arr.length;i++){
        if(arr2.indexOf(arr[i])==-1){
            arr2.push(arr[i]);
        }
    }
    return arr2;
}
function CallBack2(){
    if(sex=="女"){
        $("#photo").attr("src","/web-bin/resources/images/woman.png");
    }
}
function CallBack(arr){
    console.log(arr);
    if(arr.length!==0){

        $(".d2").setTemplateElement("Template-ListRows").processTemplate(arr);
        $(".img").each(function(){
            $(this).attr("src",IMG_URL+$(this).attr("src"));
        });

        //住院跳转
        $("body").on("click",".hosp",function(event){
            var name="&name="+$("#name").html();

            var id="id="+$(this).find(".id").html();
            var sexShow="&sex="+sex;
            var hospName="&hospName="+$(this).find(".p1").text();
            var top="&hideTop=1"+"&hideBasic=0"+"&hideFee=0";
            var result=id+hospName+sexShow+name+top;
            console.log(result);
            location.href = LOCALHOST_URL+'/web-bin/m/medical/patient/to_hosp_case_page?'+result;
            event.stopPropagation();
        });
        //门诊跳转
        $("body").on("click",".visit",function(event){
            var name="&name="+$("#name").html();

            var id="id="+$(this).find(".id").html();
            var sexShow="&sex="+sex;
            var hospName="&hospName="+$(this).find(".p1").text();
            var top="&hideTop=1"+"&hideBasic=0"+"&hideFee=0";
            var result=id+hospName+sexShow+name+top;
            location.href = LOCALHOST_URL+'/web-bin/m/medical/patient/to_visit_case_page?'+result;
            event.stopPropagation();
        });
        $(".id").hide();
        $(".hugId").hide();

    }else{
        console.log(arr);
        $("#main_body").html(
            '<div id="none">'+
            '<img src="/web-bin/resources/images/nodata2x.png">'+
            '<p>暂无数据</p>'+
            '</div>'
        );
        $("body").css("background-color","#f4f4f4");
    }
    $("#main_body").niceScroll({
        railpadding : {top : 0,right : 0,left : 0,bottom : 0}
    });
}
