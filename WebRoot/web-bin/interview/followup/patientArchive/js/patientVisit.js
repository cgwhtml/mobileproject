var LOCALHOST_URL=window.HUGPAGE_CONFIG.LOCALHOST_URL;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query=getRequest();//方法在config配置文件中
var tops = [];
var flag={"visit_info":false,"visit_pres":false,"check_info":false,"test_info":false};
var outhospSerialNo = parent.$(".document_checkbox_checked #outhospSerialNo").val();
var outhospNo = parent.$(".document_checkbox_checked #outhospNo").val();
var visitDate = parent.$(".document_checkbox_checked #visitDate").val();
$(function(){
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
    $.ajax({
        on: true,
        timeout:60000,
        type:"get",
        url: LOCALHOST_URL+':'+PORT+'/web-bin/p/followup/patientArchive/query_patientVisit_data?id='+outhospSerialNo,
        dataType:"json",
        success: function(data){
            callBack(data);
        }
    });
});

function callBack(data){

    if(data && data.data){

        //加载基本信息
        if(data.data.visitInfo){
            $("#visit_info_scroll").setTemplateElement("Template-ListRows1").processTemplate(data.data.visitInfo);
            flag.visit_info=true;
            reGetTop();
        }

        //加载医嘱用药以及其跳转
        if(data.data.medicalOrderInfos && data.data.medicalOrderInfos.length!=0){
            $("#visit_pres_scroll").setTemplateElement("Template-ListRows2").processTemplate(data.data.medicalOrderInfos);
            flag.visit_pres=true;
            reGetTop();
            $(".report_contanint2").html(

                '<p style="display:none"><textarea id="Template-List1" rows="0" cols="0">'+
                '<table cellspacing="0" cellpadding="0" style="width:100%;">'+
                '<tr>' +
                '<td>药品名称</td>' +
                '<td>药品规格</td>' +
                '<td>一次计量</td>' +
                '<td>总数量</td>' +
                '<td>使用频次</td>' +
                '<td>用药途径</td>' +
                '<td>药品剂型</td>' +
                '</tr>'+
                '{#foreach $T as Row}'+
                '<tr>' +
                '<td>{$T.Row.drugName}</td>'+
                '<td>{$T.Row.drugSpe}</td>'+
                '<td>{$T.Row.oneDosage}</td>'+
                '<td>{$T.Row.drugAmount}</td>' +
                '<td>{$T.Row.frequencyName}</td>' +
                '<td>{$T.Row.doseWayName}</td>' +
                '<td>{$T.Row.formName}</td>' +
                '</tr>'+
                '{/for}'+
                '</table>'+
                '</textarea></p>'+

                '<table class="s1"></table>'
            );

            $(".hos_operation .medical_order").each(function() {
                var orderInfoId=$(this).find("#bTitle_text_id").val();
                var $this=$(this);
                $.ajax({
                    async: false,
                    on: true,
                    type: "get",
                    url: LOCALHOST_URL + ':' + PORT + '/web-bin/p/followup/patientArchive/query_visitOrder_data?orderInfoId='+orderInfoId,
                    dataType: "json",
                    success: function (data1) {
                        if(data1.data.infos){
                            $this.find(".s1").setTemplateElement("Template-List1").processTemplate(data1.data.infos);
                        }else {
                            $this.find(".report_containt2").html('<p style="text-align: center;margin-top: 10px;">'+data.msg+'</p>');
                        }

                    }
                });
            });

        }

        //加载检查结果以及其跳转
        if(data.data.examReqs && data.data.examReqs.length!=0){
            $("#check_info_scroll").setTemplateElement("Template-ListRows3").processTemplate(data.data.examReqs);
            flag.check_info=true;
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
                            $this.find("#apply_DrName").text(data.data.applyDrName);
                            $this.find("#apply_DeptName").text(data.data.applyDeptName);
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

        //加载检验结果
        if(data.data.medicalTestReqs && data.data.medicalTestReqs.length>0){
            $("#test_info_scroll").setTemplateElement("Template-ListRows4").processTemplate(data.data.medicalTestReqs);
            flag.test_info=true;
            reGetTop();
            $(".report_containt").html(

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
    return false;
}


//模块内容改变，重新取距离顶部的距离
function reGetTop(){
    var items  = $(".p_head_title2");
    tops = [];
    for (var i = 0; i <items.length ; i++) {
        tops.push( items[i].offsetTop );
    }
}