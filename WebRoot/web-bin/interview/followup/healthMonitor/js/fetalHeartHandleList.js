var pageNumber = 20;//每页20行
var pagination;
var localhostUrl=window.location.origin;//window.HUGPAGE_CONFIG.LOCALHOST_URL;
//var serverUrl=window.HUGPAGE_CONFIG.SERVER_URL;
var query=getRequest();
$(function(){
	pagination=$("#page").myPagination({
        currPage: 1,
        pageNumber: pageNumber,
        ajax: {
    		on: true,
    		cache: false,
    		callback: ajaxCallBack,
    		type: "GET",
    		url: localhostUrl+'/web-bin/p/followup/healthMonitor/query_fetalHeartHandleList_data?hospCode='+query.hospCode+"&healthType=1",
    		param:"dataStatus=1",
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
});
function flush(){
	pagination.onReload();//刷新列表
}
function showUnfinish(){
	$(".type_title a").removeClass("current");
	$("#unfinish").addClass("current");
	pagination.onLoad({param:"dataStatus=1"});
}
function showFinish(){
	$(".type_title a").removeClass("current");
	$("#finish").addClass("current");
	pagination.onLoad({param:"dataStatus=2"});
}
function ajaxCallBack(data){
	$("#dataTable").setTemplateElement("Template-ListRows").processTemplate(data.data.result);
	//parent.$("#fetalCount").text(data.data.totalCount);
}
//胎心处理
function toFetalHeartHandle(healthId,phone,hospCode){
	window.open(localhostUrl+"/web-bin/p/followup/healthMonitor/to_fetalHeartHandle_page?healthId="+healthId+"&phone="+phone+"&hospCode="+hospCode+"&userName="+query.userName);
}
//查看报告
function toCheckReport(healthId,hospCode){
	//window.open(serverUrl+"/hug-web/r/health/1014?healthId="+healthId+"&hospCode="+hospCode,"胎心报告查看");
	//window.open(localhostUrl+":3001/3001/hug-web/r/health/1014?healthId="+healthId+"&hospCode="+hospCode,"胎心报告查看");
	window.open(localhostUrl+"/web-bin/p/followup/healthMonitor/to_checkReport_page?healthId="+healthId+"&hospCode="+hospCode,"胎心报告查看");
}



