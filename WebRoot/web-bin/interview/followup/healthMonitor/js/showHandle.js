var localhostUrl=window.location.origin;//window.HUGPAGE_CONFIG.LOCALHOST_URL;
var query=getRequest();//方法在config配置文件中
//父页面window对象
var parent = art.dialog.opener;
//当前dialog
var dialog = art.dialog.open.api;
$(function(){
	$.ajax({
		type: "POST",
		url: localhostUrl+'/web-bin/p/followup/healthMonitor/query_report_data?healthId='+query.healthId+"&docHugId="+query.docHugId,
	    success: function(data){
	    	$("#remark").val(data.data&&data.data.value);
	    },
	    error:function(){
	        return;
        }
	});
});
function cancel(){
	dialog.close();
}
