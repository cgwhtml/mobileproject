/**
 * Created by huang on 2017/7/13.
 */
var LOCALHOST_URL=window.HUGPAGE_CONFIG.LOCALHOST_URL;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query=getRequest();//方法在config配置文件中
var SERVER_URL=window.HUGPAGE_CONFIG.SERVER_URL;//读取图片服务器路径
var FILE_URL=window.HUGPAGE_CONFIG.FILE_URL;//读取图片文件路径
var tops=[];
var flag={"test":false};
var selfNo = parent.$(".document_checkbox_checked #selfNo").val();
var checkDate = parent.$(".document_checkbox_checked .check_time").text();
$(function(){
    self();
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
//自建
function self(){
    $("#check_date").text("就诊日期："+checkDate);
    $.ajax({
        type: "get",
        url: LOCALHOST_URL+':'+PORT+'/web-bin/p/followup/patientArchive/query_patientSelf_data?id='+selfNo,
        success: function(data){
            ajaxCallBack(data);
        },
        error:function(){
            return;
        }
    });
}
function ajaxCallBack(data){
    if(data.data){
        $("#self_drug_scroll").setTemplateElement("Template-ListRows1").processTemplate(data.data);
        $("#self_check_scroll").setTemplateElement("Template-ListRows2").processTemplate(data.data);
        $("#self_test_scroll").setTemplateElement("Template-ListRows3").processTemplate(data.data);
        $("#self_oper_scroll").setTemplateElement("Template-ListRows4").processTemplate(data.data);
        $("#self_hosp_scroll").setTemplateElement("Template-ListRows5").processTemplate(data.data);
        $("#self_visit_scroll").setTemplateElement("Template-ListRows6").processTemplate(data.data);
        $("#self_other_scroll").setTemplateElement("Template-ListRows7").processTemplate(data.data);

        $(".img_desc img").each(function(){
            $(this).attr("src",SERVER_URL+FILE_URL+$(this).attr("id"));
        });
    }

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

