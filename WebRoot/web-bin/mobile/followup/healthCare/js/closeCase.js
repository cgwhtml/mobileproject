/**
 * Created by huang on 2017/8/4.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var SERVER_URL=window.HUGPAGE_CONFIG.SERVER_URL;
var query=getRequest();//方法在config配置文件中
var partnerType=query.partnerType;
console.log(query);
$(function(){
    $("#submit").click(function () {
        var closeDesc=$("#closeDesc").val();
        $.ajax({
            on: true,
            timeout:60000,
            type:"get",
            url: LOCALHOST_URL+'/web-bin/m/followup/healthCare/submit_closeCase_data?usId='+query.usId+'&accessToken='+query.accessToken+'&partnerType='+partnerType+'&empiId='+query.empiId+'&planId='+query.planId+'&closeDesc='+closeDesc,
            dataType:"json",
            success: function(data){
                console.log(data);
                if(data.res == 0){
                    location.href = LOCALHOST_URL+'/web-bin/m/followup/healthCare/to_followUp_page?usId='+query.usId+'&accessToken='+query.accessToken+'&partnerType='+partnerType+"&hgId="+query.hgId;
                }
            }
        });
    });
});