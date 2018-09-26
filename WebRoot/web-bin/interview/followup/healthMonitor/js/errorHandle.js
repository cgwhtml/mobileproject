var localhostUrl=window.location.origin;//window.HUGPAGE_CONFIG.LOCALHOST_URL;
var query=getRequest();//方法在config配置文件中
function submit(){
	var result={};
	//result.hospCode=query.hospCode;
	result.healthId=query.healthId;
	result.docHugId=query.docHugId;
	result.value=$("#remark").val();
	result.reportType="1";
	art.dialog.confirm("确认提交处理意见？",function(){
		//父页面window对象
		var parent = art.dialog.opener;
		//当前dialog
		var dialog = art.dialog.open.api;
		$.ajax({
			type: "POST",
			url: localhostUrl+'/web-bin/p/followup/healthMonitor/submit_errorHandle_data',
			data:JSON.stringify(result),
		    success: function(data){
		    	if(data.res=='0'){
		    		parent.art.dialog({content: '提交成功！', icon: 'succeed', time: 1.5});
		    		dialog.close();
		    		parent.flush();
		    	}else{
		    		art.dialog({
						 time: 1.5,
						 content: data.msg,
						 icon: 'error'
					});
		    	}
		    },
		    error:function(){
		        return;
	        }
		});
	});
}
function cancel(){
	//当前dialog
	var dialog = art.dialog.open.api;
	dialog.close();
}
