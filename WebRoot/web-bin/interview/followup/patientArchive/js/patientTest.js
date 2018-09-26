var LOCALHOST_URL=window.HUGPAGE_CONFIG.LOCALHOST_URL;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query=getRequest();//方法在config配置文件中
var tops=[];
var flag={"test":false};
var reportNo = parent.$(".document_checkbox_checked #reportNo").val();
var patName = parent.$(".document_checkbox_checked #patName").val();
$(function(){
    test();
    $(".pageMenu").click(function(){
        $(".pageMenu_checked").removeClass("pageMenu_checked");
        $(this).addClass("pageMenu_checked");
        $("#scroll_nav").scrollTop(tops[$(".pageMenu").index($(this))]-20);
    });
    $("#scroll_nav").scroll(function(){
        for(var i=0;i<tops.length;i++){
            if($("#scroll_nav").scrollTop() >= tops[i]- 20 && $("#scroll_nav").scrollTop() <= tops[i+1] - 40){
                $(".pageMenu_checked").removeClass("pageMenu_checked");
                $(".pageMenu").eq(i).addClass("pageMenu_checked");
            }
        }
    });
    $(".move_area").mousedown(function() {
        $(document).mousemove(function(e){
            $(".dragbox").css({'left': e.pageX - 45, 'top': e.pageY - 10});
        });
    });
    $(document).mouseup(function() {
        $(document).unbind('mousemove');
    });
});
//体检
function test(){
    $.ajax({
        type: "get",
        url: LOCALHOST_URL+':'+PORT+'/web-bin/m/medical/patient/query_testList_data?id='+reportNo,
        data: {reportNo:reportNo,patName:patName},
        beforeSend:function(XMLHttpRequest){
            $("#test_general_scroll").html("<img src='/resources/images/loading.gif' style=\"margin-left:47%;margin-top:10%;margin-bottom:10%\"/>");
            $("#test_result_scroll").html("<img src='/resources/images/loading.gif' style=\"margin-left:47%;margin-top:10%;margin-bottom:10%\"/>");
            $("#check_info_scroll").html("<img src='/resources/images/loading.gif' style=\"margin-left:47%;margin-top:10%;margin-bottom:10%\"/>");
            $("#test_info_scroll").html("<img src='/resources/images/loading.gif' style=\"margin-left:47%;margin-top:10%;margin-bottom:10%\"/>");
        },
        success: function(data){
            ajaxCallBack(data);
        },
        error:function(){
            return;
        }
    });
}
function ajaxCallBack(data){
    $("#test_general_scroll").setTemplateElement("Template-ListRows1").processTemplate(data.data);
    $("#test_result_scroll").setTemplateElement("Template-ListRows2").processTemplate(data.data);
    $("#check_info_scroll").setTemplateElement("Template-ListRows3").processTemplate(data.data.medicalPhysicalResults);
    flag.test=true;
    reGetTop();
}
//模块内容改变，重新取距离顶部的距离
function reGetTop(){
    var items  = $(".p_head_title2");
    tops = [];
    for (var i = 0; i <items.length ; i++) {
        tops.push( items[i].offsetTop );
    }
}
