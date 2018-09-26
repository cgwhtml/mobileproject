var pageNumber = 20;//每页20行
var pagination;
var localhostUrl=window.location.origin;//window.HUGPAGE_CONFIG.LOCALHOST_URL;
var followUrl;//随访系统的ip+port
var query=getRequest();//方法在config配置文件中
$(function(){
    $("html").niceScroll({
        railpadding : {top : 0,right : 10,left : 0,bottom : 0}
    });
    $(".chosen_for_search").chosen({
        disable_search_threshold:10,
        allow_single_deselect:true,
        search_contains:true,
        no_results_text:"未找到此选项",
        width:"140px"
    });
    //搜索时间
    laydate({
        elem: '#beginDate',
        format: 'YYYY-MM-DD',
        festival: true
    });
    laydate({
        elem: '#endDate',
        format: 'YYYY-MM-DD',
        festival: true
    });
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
    pagination = $("#page").myPagination({
        currPage: 1,
        pageNumber: pageNumber,
        ajax: {
            on: true,
            callback: ajaxCallBack,
            cache: false,
            type: "GET",
            url: localhostUrl+'/web-bin/p/followup/two/healthMonitor/query_healthMonitorErrorList_data?docHugId='+query.docHugId,
            param:"reportStatus=0",
            dataType: "json",
            ajaxStart: function() {
                ZENG.msgbox.show(" 正在加载中，请稍后...",6,100000000000);
            },
            ajaxStop: function() {
                //隐藏加载提示
                setTimeout(function(){
                    ZENG.msgbox.hide();
                }, 300);
            }
        },
        panel: {
            tipInfo_on: true,
            tipInfo: '<div class="i_box">到第{input}{sumPage}页</div>',
            totalInfo_on: true,
            totalInfo: '<p class="total_info">当前为{lower}-{upper}条记录——总记录为{total}条</p>'
        }
    });
	//根据输入框条件检索用户列表
  	$("#btn_search").click(function(){
  		var patName = $.trim($("#patName").val());//患者姓名
  		if(patName==$("#patName").attr('t_placeholder')){
  			patName="";
		}
		var beginDate=$("#beginDate").val();
        var endDate=$("#endDate").val();
        var healthType=$("#healthType").val();
  		var params = "name="+escape(patName)+"&endDate="+endDate+"&beginDate="+beginDate+"&healthType="+healthType+"&reportStatus=0";
  		pagination.onLoad({param:params});
  	});
});
function ajaxCallBack(data){
	$("#data_table").setTemplateElement("Template-ListRows").processTemplate(data.data.result);
}
function toErrorHandle(healthId){
	art.dialog.open(localhostUrl+'/web-bin/p/followup/healthMonitor/to_errorHandle_page?healthId='+healthId+"&hospCode="+query.hospCode+"&docHugId="+query.docHugId,{
		width : 430,
		height : 254,
		lock : true,
		resize : false,
		title : '监测处理'
	});
}
function flush(){
	pagination.onReload();//刷新列表
    parent.getHealthMonitorSum();
}
function toPatientArchives(patName,idCard,phone,healthType){
    if($.trim(idCard)==""&&$.trim(phone)==""){
        art.dialog({content: '患者身份信息未完善，查找不到！',icon: 'warning',time: 1.5});
        return false;
    }
    window.open(followUrl+"/hug_interview/crm/toPatientRecordFromHealthMonitoring.htm?openFlag=6&name="+patName+"&idcard="+idCard+"&mobileNo="+phone+"&healthType="+healthType);
}