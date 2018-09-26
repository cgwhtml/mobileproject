var pageNumber = 20;//每页20行
var pagination1;//未处理异常&已处理异常
var pagination2;//全部监测
var localhostUrl=window.location.origin;//window.HUGPAGE_CONFIG.LOCALHOST_URL;
var followUrl;//随访系统的ip+port
var query=getRequest();//方法在config配置文件中
$(function(){
    getSearchDate();
    var beginDate=query.beginDate?query.beginDate:$("#beginDate").val();
    var endDate=query.endDate?query.endDate:$("#endDate").val();
    var healthType=query.healthType?query.healthType:"";
    var titleType=query.titleType?query.titleType:"1";
    var reportStatus=0;
    if(titleType==1){
        reportStatus=0;
    }else if(titleType==2){
        reportStatus=1;
    }
    $("#beginDate").val(beginDate);
    $("#endDate").val(endDate);
    $("#healthType").val(healthType);
    $("#titleType").val(titleType);
    $("html").niceScroll({
        railpadding : {top : 0,right : 6,left : 0,bottom : 0}
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
            if(data&&data.res==0) {
                followUrl = "http://" + data.data.ip + ":" + data.data.port;
            }
        },
        error:function(){
            return;
        }
    });
    pagination1 = $("#page1").myPagination({
        currPage: 1,
        pageNumber: pageNumber,
        ajax: {
            on: true,
            callback: ajaxCallBack1,
            cache: false,
            type: "GET",
            url: localhostUrl+'/web-bin/p/followup/two/healthMonitor/query_healthMonitorErrorList_data?docHugId='+query.docHugId,
            param:"reportStatus="+reportStatus+"&beginDate="+beginDate+"&endDate="+endDate+"&healthType="+healthType,
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
    pagination2 = $("#page2").myPagination({
        currPage: 1,
        pageNumber: pageNumber,
        ajax: {
            on: true,
            callback: ajaxCallBack2,
            cache: false,
            type: "GET",
            url: localhostUrl+'/web-bin/p/followup/two/healthMonitor/query_healthMonitorAllList_data?docHugId='+query.docHugId,
            param:"beginDate="+beginDate+"&endDate="+endDate+"&healthType="+healthType,
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
        var titleType=$("#titleType").val();
        var params = "name="+escape(patName)+"&endDate="+endDate+"&beginDate="+beginDate+"&healthType="+healthType;
        if(titleType==1){
            params=params+"&reportStatus=0";
        }else if(titleType==2){
            params=params+"&reportStatus=1";
        }
        if(titleType==1||titleType==2){
            pagination1.onLoad({param:params});
        }else{
            pagination2.onLoad({param:params});
        }
    });
});
//未处理异常&已处理异常
function ajaxCallBack1(data){
    var titleType=$("#titleType").val();
    if(titleType==1||titleType==2){
        $("#data_table").setTemplateElement("Template-ListRows1").processTemplate(data.data && data.data.result);
        $("#page1").show();
        $("#page2").hide();
    }
}
//全部监测
function ajaxCallBack2(data){
    var titleType=$("#titleType").val();
    if(titleType==3) {
        $("#data_table").setTemplateElement("Template-ListRows2").processTemplate(data.data && data.data.result);
        $("#page1").hide();
        $("#page2").show();
    }
}
function flush(){
    pagination1.onReload();//刷新列表
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
function toPatientArchives(patName,idCard,phone,healthType){
    if($.trim(idCard)==""&&$.trim(phone)==""){
        art.dialog({content: '患者身份信息未完善，查找不到！',icon: 'warning',time: 1.5});
        return false;
    }
    window.open(followUrl+"/hug_interview/crm/toPatientRecordFromHealthMonitoring.htm?openFlag=6&name="+patName+"&idcard="+idCard+"&mobileNo="+phone+"&healthType="+healthType);
}
function getSearchDate(){
    var search = window.location.search;
    var now = new Date();
    var nowTime = now.getTime() ;
    var day = now.getDay();
    var oneDayLong = 24 * 60 * 60 * 1000 ;
    var MondayTime = nowTime - (day-1) * oneDayLong;
    var SundayTime = nowTime + (7-day) * oneDayLong;
    var monday = new Date(MondayTime);
    var sunday = new Date(SundayTime);
    var year = monday.getFullYear();
    var month = monday.getMonth() < 9 ? ('0' + (monday.getMonth() + 1)) : (monday.getMonth() + 1);
    var dayStart = monday.getDate() < 10 ? ('0' + monday.getDate()) : monday.getDate();
    var yearEnd = sunday.getFullYear();
    var monthEnd = sunday.getMonth() < 9 ? ('0' + (sunday.getMonth() + 1)) : (sunday.getMonth() + 1);
    var dayEnd = sunday.getDate() < 10 ? ('0' + sunday.getDate()) : sunday.getDate();
    if ($.trim(search).indexOf('beginDate') <1) {
        $("#beginDate").val(year+'-'+month+'-'+dayStart);
        $("#endDate").val(yearEnd+'-'+monthEnd+'-'+dayEnd);
    }
}