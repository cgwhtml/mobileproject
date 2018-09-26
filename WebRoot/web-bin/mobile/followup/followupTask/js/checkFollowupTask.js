/**
 * Created by huang on 2017/8/2.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query=getRequest();//方法在config配置文件中
console.log(query);
console.log(query);
var url=location.href;
var formArr=query.form.split(",");
console.log(formArr);
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
    // sessionStorage.setItem("fromType",query.fromType);
    // console.log("fromType="+sessionStorage.getItem("fromType"));
    console.log(decodeURIComponent(query.form));
    $("#hospCode").val(query.hospCode);
    $(".inHosNo").val(query.inHosNo);
    $(".visitCardNo").val(query.visitCardNo);
    $(".name").text(decodeURIComponent(query.name));
    $(".sex").text(decodeURIComponent(query.sex));
    $(".age").text(decodeURIComponent(query.age));
    $("#handlingOpinion").niceScroll({
        railpadding : {top : 0,right : 0,left : 0,bottom : 0}
    });
    $("#handlingOpinion").text(decodeURIComponent(query.handlingOpinion));
    $(".date").text(query.plantimeStr);
    //查询表单状态
    $.ajax({
        type:"get",
        url: LOCALHOST_URL+'/web-bin/m/followup/followupTask/query_formExcpStatus_data?eachDate='+query.eachDate+'&usId='+query.usId+'&accessToken='+query.accessToken+'&id='+query.id,
        dataType:"json",
        success: function(data){
            console.log(data);
            // alert(JSON.stringify(data));
            for(var i=0;i<formArr.length;i++){
                console.log(decodeURI(formArr[i]));
                $(".list").append("<div class='list_form' style='padding-left:10px;'>《"+decodeURI(formArr[i])+"》<i class='arrow' style='width:10px;height:20px;position:absolute;top:15px;right:30px;'></i></div>");
            }
            if(data.data&&data.res==0){
                callBack(data);
            }
        }
    });

    //查询问卷
    $(".list").on("click",".list_form",function () {
        var questionnaireId=$(this).find(".questionnaireId").val();
        $.ajax({
            type:"get",
            url: LOCALHOST_URL+'/web-bin/m/followup/followupTask/query_questionNaire_data?usId='+query.usId+'&accessToken='+query.accessToken+'&relationId='+query.id+'&questionnaireId='+questionnaireId,
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
        location.href = LOCALHOST_URL+'/web-bin/m/followup/followupTask/to_medicalRecordList_page?hospCode='+hospCode+'&usId='+query.usId+'&accessToken='+query.accessToken+'&inHosNo='+inHosNo+'&visitCardNo='+visitCardNo+result;
    });
});

function callBack(data){
    if(data.data && data.data.length>0){
        for(var i=0;i<data.data.length;i++){
            if(data.data[i].formExcpStatus == 1){
                $(".list .list_form").eq(i).append('<span class="red">异</span><input class="questionnaireId" type="hidden" value="'+data.data[i].formSingleId+'">');
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