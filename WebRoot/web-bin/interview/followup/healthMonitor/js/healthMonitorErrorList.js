var pageNumber = 20;//每页20行
var pagination;
var localhostUrl=window.location.origin;//window.HUGPAGE_CONFIG.LOCALHOST_URL;
var followUrl;//随访系统的ip+port
var query=getRequest();//方法在config配置文件中
$(function(){
	//获取随访内网ip
	$.ajax({
		type: "GET",
		async:false,
	    url: localhostUrl+"/web-bin/p/followup/healthMonitor/query_host_ip?hospCode="+query.hospCode,
	    success: function(data){
	    	followUrl="http://"+data.data.ip+":"+data.data.port;
	    },
	    error:function(){
	        return;
        } 
	});
	pagination=$("#page").myPagination({
        currPage: 1,
        pageNumber: pageNumber,
        ajax: {
    		on: true,
    		cache: false,
    		callback: ajaxCallBack,
    		type: "GET",
    		url: localhostUrl+'/web-bin/p/followup/healthMonitor/query_healthMonitorErrorList_data?docHugId='+query.hugId+"&hospCode="+query.hospCode,
    		param:"reportStatus=0",
    		dataType: "json"
    	},
        panel: {
            tipInfo_on: true,
            tipInfo: '&nbsp;&nbsp;跳{input}/{sumPage}页',
            tipInfo_css: {
            	width: '23px',
           	 	height: "16px",
            	border: "1px solid #DADAD8",
            	padding: "0 5px 0 5px",
            	margin: "0 5px 0 5px",
            	color: "#48b9ef"
            }
        }
	});
	//根据输入框条件检索用户列表
  	$("#basicQusery").click(function(){
  		var patName = $.trim($("#patName").val());//患者姓名
  		if(patName==$("#patName").attr('placeholder')){
  			patName="";
		}
  		var params = "name="+escape(patName)+"&reportStatus=0";
  		pagination.onLoad({param:params});//根据条件检索后重新加载用户列表
  	});
	// 浏览器兼容支持 placeholder
	if(!('placeholder' in document.createElement('input'))){   // 判断浏览器是否支持 placeholder
	    $('[placeholder]').focus(function() {
	        var input = $(this);
	        if (input.val() == input.attr('placeholder')) {
	            input.val('');
	            input.removeClass('placeholder');
	            input.css({"color":"#333333"});
	        }
	    }).blur(function() {
	        var input = $(this);
	        if (input.val() == '' || input.val() == input.attr('placeholder')) {
	            input.addClass('placeholder');
	            input.val(input.attr('placeholder'));
	            input.css({"color":"#999999"});
	        }
	    }).blur();
	}
});
function ajaxCallBack(data){
	$("#dataTable").setTemplateElement("Template-ListRows").processTemplate(data.data.result);
}
function toErrorHandle(healthId){
	art.dialog.open(localhostUrl+'/web-bin/p/followup/healthMonitor/to_errorHandle_page?healthId='+healthId+"&hospCode="+query.hospCode+"&docHugId="+query.hugId,{
		width : 430,
		height : 254,
		lock : true,
		resize : false,
		title : '监测处理'
	});
}
function flush(){
	pagination.onReload();//刷新列表
}
function toPatientArchives(patName,idCard,healthType){
	if($.trim(idCard)==""){
		art.dialog({content: '患者身份信息未完善，查找不到！',icon: 'warning',time: 1.5});
		return false;
	}
	window.open(followUrl+"/hug_interview/followup/visitInfoAction!toPatientMainFromHealthSurvey.htm?patName="+patName+"&idCard="+idCard+"&healthSurveyType="+healthType);
}





