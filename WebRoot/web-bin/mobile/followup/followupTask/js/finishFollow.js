/**
 * Created by CGT on 2017/7/26.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query=getRequest();
var usId=query.usId||sessionStorage.getItem("usId");
var eachDate=query.eachDate||sessionStorage.getItem("eachDate");
var hgId=query.hgId||sessionStorage.getItem("hgId");
var accessToken=query.accessToken||sessionStorage.getItem("accessToken");
$(function(){
    $("#container").show();
    contentShow();
});
function contentShow(){
    // 业务逻辑
    // alert($("#container").css("display"));
    if($("#container").css("display")!=="none"){
        //window.location.reload();//刷新当前页面.
        //跳转到已完成随访页面
        $(".finish").click(function(){
            location.href = LOCALHOST_URL+'/web-bin/m/followup/followupTask/to_finishFollow_page?eachDate='+eachDate+'&usId='+usId+'&accessToken='+accessToken+'&hgId='+hgId;
        });
        //跳转到待随访页面
        $(".wait").click(function(){
            location.href = LOCALHOST_URL+'/web-bin/m/followup/followupTask/to_followUp_page?eachDate='+eachDate+'&usId='+usId+'&accessToken='+accessToken+'&hgId='+hgId;
        });
        //跳转到宣教页面
        $("#education").click(function(){
            location.href = LOCALHOST_URL+'/web-bin/m/followup/followupTask/to_education_page?eachDate='+eachDate+'&usId='+usId+'&accessToken='+accessToken+'&hgId='+hgId;
        });
        //跳转到处理随访任务页面
        $(".main_body").on("click",".followup_button",function () {
            var hospCode=$("#hospCode").val();
            var $parent=$(this).parents(".item");
            var inHosNo=$parent.find(".inHosNo").val();
            var visitCardNo=$parent.find(".visitCardNo").val();
            var name=$parent.find(".name").text();
            var sex=$parent.find(".sex").text();
            var age=$parent.find(".age").text();
            var form=$parent.find(".list").html();
            var id=$parent.find(".form_id").val();
            console.log(form);
            var result='&name='+name+'&sex='+sex+'&age='+age+'&form='+form+'&id='+id+'&hgId='+hgId+'&hospCode='+hospCode+'&inHosNo='+inHosNo+'&visitCardNo='+visitCardNo;
            location.href = LOCALHOST_URL+'/web-bin/m/followup/followupTask/to_processingFollowupTask_page?eachDate='+eachDate+'&usId='+usId+'&accessToken='+accessToken+result;
        });
        //跳转到查看随访任务页面
        $(".main_body").on("click",".check_button",function () {
            var hospCode=$("#hospCode").val();
            var $parent=$(this).parents(".item");
            var inHosNo=$parent.find(".inHosNo").val();
            var visitCardNo=$parent.find(".visitCardNo").val();
            var name=$parent.find(".name").text();
            var sex=$parent.find(".sex").text();
            var age=$parent.find(".age").text();
            var form=$parent.find(".list").html();
            var id=$parent.find(".form_id").val();
            var empiId=$parent.find(".empiId").val();
            var handlingOpinion=$parent.find(".handlingOpinion").val();
            var returnVisitTime=$parent.find(".returnVisitTime").val();
            var result='&name='+name+'&sex='+sex+'&age='+age+'&form='+form+'&id='+id+'&empiId='+empiId+'&handlingOpinion='+handlingOpinion+'&returnVisitTime='+returnVisitTime+'&hospCode='+hospCode+'&inHosNo='+inHosNo+'&visitCardNo='+visitCardNo;
            location.href = LOCALHOST_URL+'/web-bin/m/followup/followupTask/to_checkFollowupTask_page?eachDate='+eachDate+'&usId='+usId+'&accessToken='+accessToken+result;
        });
        //跳转到随访任务详情页面
        $(".main_body").on("click",".sub_tit",function(){
            var f=0;
            if($(this).parent().hasClass('flag')){
                f=1
            }
            console.log(f);
            var $parent=$(this).parents(".item");
            var empiId=$parent.find(".empiId").val();
            var planId=$parent.find(".planId").val();
            var result='&empiId='+empiId+'&planId='+planId+'&flag='+f;
            location.href = LOCALHOST_URL+'/web-bin/m/followup/followupTask/to_followupPlanDetail_page?eachDate='+eachDate+'&usId='+usId+'&accessToken='+accessToken+result;
        });
        //跳转到医疗档案
        $(".main_body").on("click",".base_info",function () {
            var name=$(this).find(".name").text();
            var sex=$(this).find(".sex").text();
            var age=$(this).find(".age").text();
            var hospCode=$("#hospCode").val();
            console.log(hospCode);
            var inHosNo=$(this).find(".inHosNo").val();
            var visitCardNo=$(this).find(".visitCardNo").val();
            var result="&name="+name+"&sex="+sex+"&age="+age;
            location.href = LOCALHOST_URL+'/web-bin/m/followup/followupTask/to_medicalRecordList_page?hospCode='+hospCode+'&usId='+usId+'&accessToken='+accessToken+'&inHosNo='+inHosNo+'&visitCardNo='+visitCardNo+result;
        });

        $(".main_body").height(document.documentElement.clientHeight-111);

        $.ajax({
            on: true,
            timeout:60000,
            type:"get",
            url: LOCALHOST_URL+'/web-bin/m/followup/followupTask/query_followUp_data?eachDate='+eachDate+'&usId='+usId+'&accessToken='+accessToken,
            dataType:"json",
            success: function(data){
                console.log(data);
                $("#hospCode").val(data.data.hosp.hospCode);
                callBack(data);
            }
        });
    }
}
function callBack(data){
    if(data.data.list && data.data.list.length>0){
        $(".wait_followup").setTemplateElement("Template-followUp").processTemplate(data.data.list);
    }
}
