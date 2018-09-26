/**
 * Created by huang on 2017/8/1.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var SERVER_URL=window.HUGPAGE_CONFIG.SERVER_URL;
var query=getRequest();//方法在config配置文件中
console.log(query);
var url=location.href;
var revisitExcp=0;
var formArr=query.form.split(",");
console.log(formArr);
var partnerType=query.partnerType;
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
        document.body.addEventListener('touchmove', function (e) {
            e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
        }, {passive: false});
    };
    var h=$(window).height();
    $(window).resize(function() {
        if($(window).height()<h){
            $('.footer').hide();
        }
        if($(window).height()>=h){
            $('.footer').show();
        }
    });
    $("#followup_record").niceScroll({
        railpadding : {top : 0,right : 0,left : 0,bottom : 0}
    });
    $("#hospCode").val(query.hospCode);
    $(".inHosNo").val(query.inHosNo);
    $(".visitCardNo").val(query.visitCardNo);
    $(".name").text(decodeURIComponent(query.name));
    $(".sex").text(decodeURIComponent(query.sex));
    $(".age").text(decodeURIComponent(query.age));
    if($(".base_info .sex").text()=="女"){
        $(this).siblings(".per_img").find("img").attr("src","/web-bin/resources/images/woman.png");
    }
    //开关
    var $div2=$("#div2");
    var $div1=$("#div1");
    $div2.click(function () {
        if($div1.attr("class")=="close1"){
            $div1.attr("class","open1");
            revisitExcp=1;
        }else {
            $div1.attr("class","close1");
            revisitExcp=0;
        }
        if($div2.attr("class")=="close2"){
            $div2.attr("class","open2");
        }else {
            $div2.attr("class","close2");
        }
    });

    $.ajax({
        on: false,
        timeout:60000,
        type:"get",
        url: LOCALHOST_URL+'/web-bin/m/followup/healthCare/query_formExcpStatus_data?usId='+query.usId+'&accessToken='+query.accessToken+'&partnerType='+partnerType+'&id='+query.id,
        dataType:"json",
        success: function(data){
            console.log(data);
            // alert(JSON.stringify(data));
            for(var i=0;i<formArr.length;i++){
                $(".list").append("<div class='list_form' style='padding-left:10px;'>《"+decodeURI(formArr[i])+"》<i class='arrow' style='width:10px;height:20px;position:absolute;top:15px;right:30px;'></i></div>");
            }
            if(data.data && data.res==0){
                callBack(data);
            }
        }
    });

    //发送表单
    $(".send").click(function () {
        $.confirm("确认发送表单吗","确认发送?", function() {
            $.ajax({
                on: true,
                timeout:60000,
                type:"get",
                url: LOCALHOST_URL+'/web-bin/m/followup/healthCare/send_form_data?usId='+query.usId+'&accessToken='+query.accessToken+'&partnerType='+partnerType+'&id='+query.id,
                dataType:"json",
                success: function(data){
                    console.log(data);
                    if(data.res == 0){
                        $.toast("发送成功");
                    }else{
                        $.toast(data.msg,"forbidden")
                    }
                }
            });
        }, function() {
            //点击取消后的回调函数
        });
    });

    //查询问卷
    $(".list").on("click",".list_form",function () {
        var questionnaireId=$(this).find(".questionnaireId").val();
        $.ajax({
            type:"get",
            url: LOCALHOST_URL+'/web-bin/m/followup/healthCare/get_openForm_data?usId='+query.usId+'&accessToken='+query.accessToken+'&partnerType='+partnerType+'&relationId='+query.id+'&id='+questionnaireId+'&relationType=1',
            dataType:"json",
            success: function(data){
                if(data.res==0 && data.data.url){
                    location.href="http://"+data.data.url;
                }else{
                    previewForm();
                }
            }
        });
    });


    //完成
    $(".submit").click(function () {
        var handlingOpinion=$("#followup_record").val();
        if(handlingOpinion==""){
            $.toast("请填写随访记录！", "forbidden");
        }else{
            var result='&handlingOpinion='+handlingOpinion+'&revisitExcp='+revisitExcp;
            console.log(result);
            $.ajax({
                on: true,
                timeout:60000,
                type:"get",
                url: LOCALHOST_URL+'/web-bin/m/followup/healthCare/submit_followup_task?usId='+query.usId+'&accessToken='+query.accessToken+'&partnerType='+partnerType+'&id='+query.id+result,
                dataType:"json",
                success: function(data){
                    console.log(data);
                    if(data.res == 0){
                        location.href = LOCALHOST_URL+'/web-bin/m/followup/healthCare/to_followUp_page?usId='+query.usId+'&accessToken='+query.accessToken+'&partnerType='+partnerType+"&hgId="+query.hgId;
                    }
                }
            });
        }
    });
    //跳转到医疗档案
    $(".base_info").click(function () {
        var name=$(this).find(".name").text();
        var sex=$(this).find(".sex").text();
        var age=$(this).find(".age").text();
        var hospCode=$("#hospCode").val();
        console.log(hospCode);
        var inHosNo=$(this).find(".inHosNo").val();
        var visitCardNo=$(this).find(".visitCardNo").val();
        var result="&name="+name+"&sex="+sex+"&age="+age;
        location.href = LOCALHOST_URL+'/web-bin/m/followup/healthCare/to_medicalRecordList_page?hospCode='+hospCode+'&usId='+query.usId+'&accessToken='+query.accessToken+'&partnerType='+partnerType+'&inHosNo='+inHosNo+'&visitCardNo='+visitCardNo+result;
    });
});
function previewForm(){
    $.ajax({
        type:"get",
        url: LOCALHOST_URL+'/web-bin/m/followup/healthCare/query_questionNaire_data?usId='+query.usId+'&accessToken='+query.accessToken+'&partnerType='+partnerType+'&relationId='+query.id+'&questionnaireId='+questionnaireId,
        dataType:"json",
        success: function(data){
            console.log(data);
            if(data.res==0){
                if(data.data && data.data.id){
                    location.href = LOCALHOST_URL+'/web-bin/m/nosen/oneparam/followup/form/to_replyForm_page/'+data.data.id+'?&noJuge=1';
                }else {
                    location.href = LOCALHOST_URL+'/web-bin/m/nosen/followup/form/to_checkForm_page?id='+questionnaireId+'&hugId='+query.hgId;
                }
            }
        }
    });
}
function callBack(data){
    if(data.data && data.data.length>0){
        for(var i=0;i<data.data.length;i++){
            if(data.data[i].formExcpStatus == 1){
                $(".list .list_form").eq(i).append('<span class="red">异</span></span><input class="questionnaireId" type="hidden" value="'+data.data[i].formSingleId+'">');
            }else{
                if(data.data[i].formReplyStatus == 1){
                    $(".list .list_form").eq(i).append('<span class="green">回</span><input class="questionnaireId" type="hidden" value="'+data.data[i].formSingleId+'">');
                }else{
                    $(".list .list_form").eq(i).append('<input class="questionnaireId" type="hidden" value="'+data.data[i].formSingleId+'">');
                }
            }
        }
    }
}