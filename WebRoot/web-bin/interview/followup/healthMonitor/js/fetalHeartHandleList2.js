var pageNumber = 20;//每页20行
var pagination;
var localhostUrl=window.location.origin;//window.HUGPAGE_CONFIG.LOCALHOST_URL;
var query=getRequest();
$(function(){
    if(query.dataStatus==1){
        $("#content_title").text("待处理胎心列表");
    }else{
        $("#content_title").text("已处理胎心列表");
    }
    change();
    $(window).resize(function(){
        change();
    });
    $("html").niceScroll({
        railpadding: { top:0, right: 0, left: 0, bottom:0 }
    });
    pagination=$("#page").myPagination({
        currPage: 1,
        pageNumber: pageNumber,
        ajax: {
            on: true,
            cache: false,
            callback: ajaxCallBack,
            type: "GET",
            url: localhostUrl+'/web-bin/p/followup/healthMonitor/query_fetalHeartHandleList_data?hospCode='+query.hospCode+"&healthType=1",
            param:"dataStatus="+query.dataStatus,
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
        panel:{
            tipInfo_on: true,
            tipInfo: '<div class="i_box">到第{input}{sumPage}页</div>',
            totalInfo_on: true
        }
    });
});
function flush() {
    pagination.onReload();//刷新列表
}
function ajaxCallBack(data){
    $("#dataTable").setTemplateElement("Template-ListRows").processTemplate(data.data.result);
    var bg_class=["bg_class_odd","bg_class_even"];
    $("#dataTable table tr").each(function(i){
        $(this).attr("class",bg_class[i % 2]);
    });
}
//胎心处理
function toFetalHeartHandle(healthId,phone,hospCode){
    window.open(localhostUrl+"/web-bin/p/followup/healthMonitor/to_fetalHeartHandle_page?healthId="+healthId+"&phone="+phone+"&hospCode="+hospCode+"&userName="+query.userName);
}
//查看报告
function toCheckReport(healthId,hospCode){
    window.open(localhostUrl+"/web-bin/p/followup/healthMonitor/to_checkReport_page?healthId="+healthId+"&hospCode="+hospCode,"胎心报告查看");
}
function change(){
    $(".patient_list").height($(window).height());
}