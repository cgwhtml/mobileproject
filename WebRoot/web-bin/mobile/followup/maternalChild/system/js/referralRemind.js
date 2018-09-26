$(function(){
	//ajax调用返回修改内容
    var localhostUrl=window.location.origin;
    //var port=window.HUGPAGE_CONFIG.PORT;
    var id=window.location.pathname.split("/").pop();
    var query=getRequest();//方法在config配置文件中
    if(query&&query.app==1){
    	$(".app_foot_download").hide(),$(".blank_div").height(40);
    }
	$.ajax({
        type:"post",
        url: localhostUrl+'/web-bin/m/nosen/followup/maternalChild/system/query_referralRemind_data?id='+id,
        success:function(data){
        	if(!(data.data&&data.data.id)){
        		$(".noFound").show();
        		return false;
        	}
        	ajaxCallBack(data);
        	$(".wrapper").show();
        },
        error:function () {
            return;
        }
    });
});
function ajaxCallBack(data){
	var remind=eval("(" + data.data.questionnaire + ")");
	$("#dataTable").setTemplateElement("Template-ListRows").processTemplate(remind);
}