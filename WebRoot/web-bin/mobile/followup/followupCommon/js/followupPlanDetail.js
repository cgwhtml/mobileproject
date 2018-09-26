/**
 * Created by huang on 2017/8/4.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query=getRequest();//方法在config配置文件中
console.log(query);
console.log(query.flag);
var partnerType=query.partnerType;
$(function(){
    if(query.flag == 1){
        $(".close_case").show();
    }else {
        $(".close_case").hide();
    }

    $.ajax({
        on: true,
        timeout:60000,
        type:"get",
        url: LOCALHOST_URL+'/web-bin/m/followup/followupCommon/query_followupCommon_data?usId='+query.usId+'&accessToken='+query.accessToken+'&partnerType='+partnerType+'&empiId='+query.empiId+'&planId='+query.planId,
        dataType:"json",
        success: function(data){
            // alert(JSON.stringify(data));
            console.log(data);
            if(data.data && data.data.length>0){
                for(var i=0;i<data.data.length;i++){
                    if(data.data[i].revisitPlanTime==""){
                        data.data[i].revisitPlanTime=data.data.time.substring(0,10);
                    }
                    data.data[i].plantimeStr=timeStr(data.data[i].revisitPlanTime);
                }
                $(".wait_followup").setTemplateElement("Template-followUp").processTemplate(data.data);
            }
        }
    });

    //跳转到结案页面
    $("#close_button").click(function () {
        location.href = LOCALHOST_URL+'/web-bin/m/followup/followupCommon/to_closeCase_page?usId='+query.usId+'&accessToken='+query.accessToken+'&partnerType='+partnerType+'&empiId='+query.empiId+'&planId='+query.planId+"&hgId="+query.hgId;
    });
});
function timeStr(date){
    var Sdate=new Date(date);
    var Syear=Sdate.getFullYear();
    var Smonth=(Sdate.getMonth()+1)<10?"0"+(Sdate.getMonth()+1):(Sdate.getMonth()+1);
    var Sday=Sdate.getDate()<10?"0"+Sdate.getDate():Sdate.getDate();
    return Syear+"-"+Smonth+"-"+Sday;
}