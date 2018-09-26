/**
 * Created by 风殇 on 2018/1/20.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var SERVER_URL=window.HUGPAGE_CONFIG.SERVER_URL;//读取图片服务器路径
var FILE_URL=window.HUGPAGE_CONFIG.FILE_URL;//读取图片文件路径
var query=getRequest();
var usId=query.usId||sessionStorage.getItem("usId");
var accessToken=query.accessToken||sessionStorage.getItem("accessToken");
var organCode=query.hospCode;
var inhospNo=query.inhospNo;
var inhospSerialNo;
$(function(){
    $.ajax({
        async:true,
        on: true,
        type:"post",
        url: LOCALHOST_URL+ '/web-bin/m/weChat/weChatPublic/get_inHosQuery_data?accessToken=' + accessToken + '&usId=' + usId+'&organCode='+organCode+'&patIndexNo='+inhospNo,
        dataType: "json",
        success: function(data){
            if(data.res==0 && data.data) {
                $("#noDataBox").hide();
                var result=data.data;
                $(".name").text(result.patName);
                $(".sexCode").text(result.sexCode == '1' ? '男' : result.sexCode == '2' ? '女' : '其他');
                $(".patIndexNo").text(result.patIndexNo);
                $(".mobileNo").text(result.mobileNo);
                inhospSerialNo=result.inhospSerialNo;
                $(".query_box").click(function(){
                    location.href=LOCALHOST_URL+'/web-bin/m/followup/healthCare/to_medicalRecordList_page?partnerType=7&hugId='+query.hgId+'&name='+result.patName+'&hospCode='+organCode+'&usId='+usId+'&accessToken='+accessToken+'&inHosNo=&visitCardNo='+result.visitCardNo+'&sex='+result.sexName+'&phone='+result.mobileNo;
                })
            }else{
                $("#noDataBox").show();
            }
        }
    });
    $("#diagnoseMsg").click(function(){
        location.href=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/to_diagnoseMsg_page';
    });
    $("#medicMsg").click(function(){
        location.href=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/to_medicMsg_page?accessToken='+accessToken+'&usId='+usId+'&inhospNo='+inhospNo+'&organCode='+organCode;
    });
    $("#feeVisit").click(function(){
        location.href=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/to_feeVisit_page?visit=1&patIndexNo=' + inhospNo + '&organCode='+organCode;
    });
    $("#feeHosp").click(function(){
        location.href=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/to_feeHosp_page?visit=0&patIndexNo=' + inhospNo + '&organCode='+organCode;
    });
    $("#checkMsg").click(function(){
        location.href=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/to_checkList_page?accessToken='+accessToken+'&usId='+usId+'&inhospNo='+inhospNo+'&organCode='+organCode;
    });
    $("#testMsg").click(function(){
        location.href=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/to_testList_page?accessToken='+accessToken+'&usId='+usId+'&inhospNo='+inhospNo+'&organCode='+organCode;
    });
});