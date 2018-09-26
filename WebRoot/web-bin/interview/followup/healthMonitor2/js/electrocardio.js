var pageNumber = 20;//每页20行
var pagination;
var query=getRequest();//方法在config配置文件中
var localhostUrl=window.location.origin;//window.HUGPAGE_CONFIG.LOCALHOST_URL;
var serverUrl=window.HUGPAGE_CONFIG.SERVER_URL;
$(function(){
    var s_data="?healthType=8&docHugId="+query.docHugId;
    if(query.phone!=null && query.phone!=""){
        s_data=s_data+'&phone='+query.phone;
    }
    if(query.idCardNo!=null && query.idCardNo!=""){
        s_data=s_data+'&idCardNo='+query.idCardNo;
    }
    $("#beginDate").val(query.beginDate);
    $("#endDate").val(query.endDate);
    pagination=$("#page").myPagination({
        currPage: 1,
        pageNumber: pageNumber,
        pageObj: "data.healthPage",
        ajax: {
            on: true,
            cache: false,
            callback: ajaxCallBack,
            type: "GET",
            url: localhostUrl+'/web-bin/p/followup/two/healthMonitor/query_health_data_by_type'+s_data,
            param:"beginDate="+$("#beginDate").val()+"&endDate="+$("#endDate").val(),
            ajaxStart:function(XMLHttpRequest){
                $("#loading").html("<img src='/resources/images/loading.gif'/>");
            },
            dataType: "json"
        },
        panel: {
            tipInfo_on: true,
            tipInfo: '<div class="i_box">到第{input}{sumPage}页</div>',
            totalInfo_on: true,
            totalInfo: '<p class="total_info">当前为{lower}-{upper}条记录——总记录为{total}条</p>'
        }
    });
    $("#chartQusery").click(function(){
        var obj=more_obj();
        pagination.onLoad({param:obj});
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
});
function more_obj(){
    var beginDate=$("#beginDate").val();
    var endDate=$("#endDate").val();
    var obj="";

    if($.trim(beginDate)!=null&&$.trim(beginDate)!=""){
        obj+="&beginDate="+beginDate;
    }
    if($.trim(endDate)!=null&&$.trim(endDate)!=""){
        obj+="&endDate="+endDate;
    }
    obj=obj.substring(1,obj.length);
    return obj;
}
function ajaxCallBack(data){
    if(data.data!=null&&data.data.healthPage){
        for(var i=0;i<data.data.healthPage.result.length;i++){
            data.data.healthPage.result[i].instruction=JSON.parse(data.data.healthPage.result[i].instruction);
        }
        $("#dataTable").setTemplateElement("Template-ListRows").processTemplate(data.data.healthPage.result);
    }
    $("#loading").html("");
    //跨域返回iframe内容高度
    if(query.crossDomainSrc && query.iframeId) {
        var iframe = document.createElement("iframe");
        iframe.width = '0px';
        iframe.height = '0px';
        iframe.style.display="none";
        var iframeHeight = document.body.scrollHeight;
        iframe.src = query.crossDomainSrc + '?iframeHeight=' + iframeHeight + '&iframeId=' + query.iframeId;
        document.body.appendChild(iframe);
    }
}
//查看心电报告
function showReport(resourceId){
    serverUrl=serverUrl.split(":")[0]+":"+serverUrl.split(":")[1];
    window.open(serverUrl+"/holterPDF/"+resourceId+".pdf");
}