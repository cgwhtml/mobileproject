var LOCALHOST_URL=window.HUGPAGE_CONFIG.LOCALHOST_URL;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query=getRequest();//方法在config配置文件中
var tops = [];
var flag = {"hosp_info": false, "docter_info": false, "hosp_oper": false, "check_info": false, "test_info": false};
var pageNumber = 10;//每页10行
var pagination;
var inhospSerialNo = parent.$(".document_checkbox_checked #inhospSerialNo").val();
console.log(query);
$(function(){

    $(".pageMenu").click(function () {
        $(".pageMenu_checked").removeClass("pageMenu_checked");
        $(this).addClass("pageMenu_checked");
        $("#scroll_nav").scrollTop(tops[$(".pageMenu").index($(this))] - 20);
    });
    $("#scroll_nav").scroll(function () {
        for (var i = 0; i < tops.length; i++) {
            if ($("#scroll_nav").scrollTop() >= tops[i] - 20 && $("#scroll_nav").scrollTop() <= tops[i + 1] - 40) {
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
    $.ajax({
        on: true,
        timeout:60000,
        type:"get",
        url: LOCALHOST_URL+':'+PORT+'/web-bin/p/followup/patientArchive/query_patientHosp_data?id='+inhospSerialNo,
        dataType:"json",
        success: function(data){
           callBack(data);
        }
    });
    $("html").niceScroll({
        railpadding: {top: 0, right: 0, left: 0, bottom: 0}
    });


});

function callBack(data){
    var basic=data.data.medicalInhospRecord;
    if(data && data.data){

        //加载基本信息
        if(basic){
            $("#hosp_info_scroll").setTemplateElement("Template-ListRows1").processTemplate(basic);
            flag.hosp_info = true;
            reGetTop();
        }

        //加载手术信息以及其跳转
        if(data.data.medicalSurgeryRecords && data.data.medicalSurgeryRecords.length!=0){
            $("#hosp_oper_scroll").setTemplateElement("Template-ListRows2").processTemplate(data.data.medicalSurgeryRecords);
            flag.hosp_oper = true;
            reGetTop();
        }

        //加载检查结果以及其跳转
        if(data.data.medicalExamReqs && data.data.medicalExamReqs.length!=0){
            $("#check_info_scroll").setTemplateElement("Template-ListRows3").processTemplate(data.data.medicalExamReqs);
            flag.check_info = true;
            reGetTop();
            $(".hos_operation .exam_result").each(function() {
                var reqId = $(this).find("#exam_id").val();
                var $this = $(this);
                $.ajax({
                    async: false,
                    on: true,
                    type: "post",
                    url: LOCALHOST_URL + ':' + PORT + '/web-bin/p/followup/patientArchive/query_examination_data?reqId=' + reqId,
                    dataType: "json",
                    success: function (data) {
                        if(data.data){
                            $this.find("#examCategName").attr("title",data.data.examCategName).text(data.data.examCategName);
                            $this.find("#applyDrName").text(data.data.applyDrName);
                            $this.find("#applyDeptName").text(data.data.applyDeptName);
                            $this.find("#examResult").text('检查结果：'+data.data.examResult);
                            $this.find("#examDescription").text('检查描述：'+data.data.examDesc);
                            $this.find("#picture").attr("href",data.data.picture);
                        }else{
                            $this.find(".report_containt").html('<p style="text-align: center;margin-top: 10px;">'+data.msg+'</p>');
                        }
                    }
                });
            });
        }

        //加载检验结果以及其跳转
        if(data.data.medicalTestReqs && data.data.medicalTestReqs.length!=0){
            $("#test_info_scroll").setTemplateElement("Template-ListRows4").processTemplate(data.data.medicalTestReqs);
            flag.test_info = true;
            reGetTop();
            $(".report_containt4").html(

                '<p style="display:none"><textarea id="Template-List4" rows="0" cols="0">'+
                '<table cellspacing="0" cellpadding="0" style="width:100%;" class="report_result">'+
                '<tr>' +
                '<td>项目</td>' +
                '<td>结果</td>' +
                '<td>参考</td>' +
                '<td>单位</td>' +
                '</tr>'+
                '{#foreach $T as Row}'+
                '<tr>' +
                '<td>{$T.Row.testItemName}</td>'+
                '<td>{$T.Row.testResultValue}</td>'+
                '<td>{$T.Row.refeRange}</td>'+
                '<td>{$T.Row.testResultValueUnit}</td>' +
                '</tr>'+
                '{/for}'+
                '</table>'+
                '</textarea></p>'+

                '<table class="s4"></table>'
            );
            $(".hos_operation .test_result").each(function() {
                var reqId=$(this).find("#requisitionNo_id").val();
                var $this=$(this);
                $.ajax({
                    async: false,
                    on: true,
                    type: "get",
                    url: LOCALHOST_URL + ':' + PORT + '/web-bin/p/followup/patientArchive/query_inspection_data?reqId='+reqId,
                    dataType: "json",
                    success: function (data) {
                        if(data.data){
                            $this.find("#sampleTypeName").text('样本类型：'+data.data.sampleTypeName);
                            $this.find("#applyDrName").text('开单医生：'+data.data.applyDrName);
                            $this.find("#applyDeptName").text('开单科室：'+data.data.applyDeptName);
                            $this.find(".s4").setTemplateElement("Template-List4").processTemplate(data.data.medicalTestResults);
                        }else {
                            $this.find(".report_containt").html('<p style="text-align: center;margin-top: 10px;">'+data.msg+'</p>');
                        }

                    }
                });
            });

        }

        //加载医嘱用药以及其跳转
        if(data.data.medicalInhospOrders && data.data.medicalInhospOrders.length!=0){

            $("#doctor_info_scroll").setTemplateElement("Template-ListRows5").processTemplate(data.data.medicalInhospOrders);
            flag.docter_info = true;
            $("#scroll_nav").niceScroll({
                railpadding: {top: 0, right: 0, left: 0, bottom: 0}
            });
            reGetTop();

        }


    }else{

        $(".document_right").html(
            '<div id="none">'+
            '<img src="/mobile/medical/hospital/images/prompt_icon_data.png">'+
            '<p>暂无数据</p>'+
            '</div>'
        );
        $("body").css("background-color","#f4f4f4");

        if(data!=null && data.res!=0){
            alert(data.msg);
        }

    }
}
//模块内容改变，重新取距离顶部的距离
function reGetTop() {
    var items = $(".p_head_title2");
    tops = [];
    for (var i = 0; i < items.length; i++) {
        tops.push(items[i].offsetTop);
    }
}

