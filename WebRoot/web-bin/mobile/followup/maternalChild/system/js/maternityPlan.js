$(function(){
	//ajax调用返回修改内容
    var localhostUrl=window.location.origin;
    //var port=window.HUGPAGE_CONFIG.PORT;
    var id=window.location.pathname.split("/").pop();
	$.ajax({
        type:"post",
        url: localhostUrl+'/web-bin/m/nosen/followup/maternalChild/system/query_maternityPlan_data?id='+id,
        success:function(data){
        	ajaxCallBack(data);
        },
        error:function () {
            return;
        }
    });
});
function ajaxCallBack(data){
	var plan=eval("(" + data.data.questionnaire + ")");
	$("#planData").setTemplateElement("Template-ListRows").processTemplate(plan);
}