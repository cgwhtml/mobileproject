var LOCALHOST_URL=window.HUGPAGE_CONFIG.LOCALHOST_URL;
var PORT=window.HUGPAGE_CONFIG.PORT;
var url=window.location.search.split("&indexNoId=")[0];
var query=getRequest();//方法在config配置文件中

$(function () {

    $.ajax({
        url: LOCALHOST_URL+':'+PORT+'/web-bin/p/followup/patientArchive/query_hospitalmessList_data?hospCode='+query.hospCode+'&targetHugId='+query.targetHugId+'&hugId='+query.hugId,
        type: "get",
        contentType : "application/json; charset=utf-8",
        beforeSend: function () {
            $("#dataTable").html("<img src='/resources/images/loading.gif' class='loading_img' style=\"margin-left:47%;margin-top:10%;margin-bottom:10%\"/>");
        },
        success: function (data) {
            ajaxCallBack(data);
        },
        error: function () {
            return;
        }
    });

    $(document).on("click", ".document_checkbox_js", function () {
        $(".icon_back_checked").removeClass("icon_back_checked").addClass("icon_back");
        $(".document_checkbox_checked").removeClass("document_checkbox_checked").addClass("document_checkbox");
        $(this).removeClass("document_checkbox").addClass("document_checkbox_checked");
        $(this).find(".icon_back").removeClass("icon_back").addClass("icon_back_checked");
    });

});
function ajaxCallBack(data) {
    var rows = data.data;
    $(".loading_img").remove();
    if (data.res==0 && rows.length > 0) {
        if(rows.length>0){
            $(".document_checkbox_js").eq(0).click();
            $("#dataTable").setTemplateElement("Template-ListRows").processTemplate(rows);
            $(".no_data").hide();
        }else{
            $(".no_data").show();
        }
    }else{
        $(".no_data").show();
    }
}
function toInhosp() {
    $("#mainFrame").attr("src", "to_patientHosp_page");
}
function toVisit() {
    $("#mainFrame").attr("src", "to_patientVisit_page");
}
function toTest() {
    $("#mainFrame").attr("src", "to_patientTest_page");
}
function toSelf() {
    $("#mainFrame").attr("src", "to_patientSelf_page");
}