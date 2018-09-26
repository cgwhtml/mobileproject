var localhostUrl=window.location.origin;//window.HUGPAGE_CONFIG.LOCALHOST_URL;
var query=window.location.search;
var queryObj=getRequest();//方法在config配置文件中
$(window).resize(function(){
    change();
});
function change(){
    $("html").height($(window).height());
    $("#iframe").height($(window).height()-40);
}
$(function(){
    change();
    $("#error").click(function(){
        $(".focus").removeClass("focus");
        $(this).addClass("focus");
        $("#mainFrame").attr("src",localhostUrl+"/web-bin/p/followup/two/healthMonitor/to_healthMonitorErrorList_page"+query);
    });
    $("#finish").click(function(){
        $(".focus").removeClass("focus");
        $(this).addClass("focus");
        $("#mainFrame").attr("src",localhostUrl+"/web-bin/p/followup/two/healthMonitor/to_healthMonitorFinishList_page"+query);
    });
    $("#all").click(function(){
        $(".focus").removeClass("focus");
        $(this).addClass("focus");
        $("#mainFrame").attr("src",localhostUrl+"/web-bin/p/followup/two/healthMonitor/to_healthMonitorAllList_page"+query);
    });
    //健康监测tab页触发的选项类型
    var titleType=queryObj.titleType;
    if(titleType==2){
        $("#finish").click();
    }else if(titleType==3){
        $("#all").click();
    }else{
        $("#error").click();
    }
    getHealthMonitorSum();
});
//获取健康监测数量统计
function getHealthMonitorSum(){
    $.ajax({
        type: "POST",
        url: localhostUrl+'/web-bin/p/followup/two/healthMonitor/query_healthMonitorSum_data?docHugId='+queryObj.docHugId,
        success: function(data){
            if(data.res==0){
                data.data.abnormalCount&&$("#error a").text("未处理异常("+data.data.abnormalCount+")");
                data.data.abnormalReportCount&&$("#finish a").text("已处理异常("+data.data.abnormalReportCount+")");
                data.data.healthCount&&$("#all a").text("全部监测("+data.data.healthCount+")");
            }
        },
        error:function(){
            return;
        }
    });
}