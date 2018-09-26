var pageNumber = 20;//每页20行
var pagination;
var localhostUrl=window.location.origin;//window.HUGPAGE_CONFIG.LOCALHOST_URL;
var query=getRequest();
$(function(){
    change();
    $(window).resize(function(){
        change();
    });
    pagination=$("#page").myPagination({
        currPage: 1,
        pageNumber: pageNumber,
        ajax: {
            on: true,
            cache: false,
            callback: ajaxCallBackForUserList,
            type: "get",
            url: localhostUrl+'/web-bin/p/followup/healthMonitor/query_fetalHeartUserList_data?hospCode='+query.hospCode,
            dataType: "json",
            ajaxStart: function() {
                ZENG.msgbox.show(" 正在加载中，请稍后...",6,100000000000);
            },
            ajaxStop: function() {
                //隐藏加载提示
                setTimeout(function(){
                    ZENG.msgbox.hide();
                }, 300);
            },
        },
        panel:{
            tipInfo_on: true,
            tipInfo: '<div class="i_box">到第{input}{sumPage}页</div>',
            totalInfo_on: true
        }
    });
    //搜索
    $(".s_input").inputer({
        css:{"width":"170px"},
        callback:function(){
            var seachValue = $("#seachValue").val();
            if(seachValue==$("#seachValue").attr("t_placeholder")){
                seachValue="";
            }
            var param = encodeURI("seachValue="+seachValue);
            pagination.onLoad({param:param});
        }
    });
    //添加用户
    $("#addFetalUser").click(function(){
        art.dialog.open(localhostUrl+'/web-bin/p/followup/healthMonitor/to_addFetalUser_page?hospCode='+query.hospCode,{
            width : 340,
            height : 238,
            lock : true,
            resize : false,
            title : "添加用户"
        });
    });
    //展开/收起健康报告数据列表
    $(document).on("click",".patName",function(){
        var phone=$(this).attr("phone");
        var p_tr=$(this).parents("tr");
        if(p_tr.hasClass("drop_active")){
            $(".drop_active").next().hide();
            $(".drop_active").removeClass("drop_active").find(".arrow_icon").toggleClass("arrow_gray_right").toggleClass("arrow_gray_bottom");
        }else{
            $(".drop_active").next().hide();
            $(".drop_active").removeClass("drop_active").find(".arrow_icon").toggleClass("arrow_gray_right").toggleClass("arrow_gray_bottom");
            $(this).find(".arrow_icon").toggleClass("arrow_gray_right").toggleClass("arrow_gray_bottom");
            p_tr.addClass("drop_active");
            p_tr.next().hasClass("drop_content_hasLoad")?p_tr.next().show():(
                $.ajax({
                    type: "POST",
                    url: localhostUrl+'/web-bin/p/followup/healthMonitor/query_healthReportList_data?hospCode='+query.hospCode+"&phone="+phone,
                    success: function(data){
                        ajaxCallBackForReportList(p_tr.attr("id"),data);
                        p_tr.next().addClass("drop_content_hasLoad").show();
                    },
                    error:function(){
                        return;
                    }
                })
            );
        }
    });
});
//Load用户中心患者列表
function ajaxCallBackForUserList(data){
    $("#data_table").setTemplateElement("Template-ListRows1").processTemplate(data.data.result);
    var bg_class=["bg_class_even","bg_class_odd"];
    $("#data_table").find("tr:odd").each(function(i){
        if(!$(this).hasClass("table_head")){
            $(this).attr("class",bg_class[i % 2]);
        }
    });
}
//Load单个患者健康报告列表(根据手机号检索)
function ajaxCallBackForReportList(id,data){
    $("#"+id).next().find(".drop_content_table").setTemplateElement("Template-ListRows2").processTemplate(data.data);
}
//列表刷新方法
function flushList(){
    pagination.onReload();
}
function change(){
    $(".patient_list").height($(window).height());
}
//设置胎心监测服务次数
function toSetFrequency(patName,phone,age){
    art.dialog.open(localhostUrl+'/web-bin/p/followup/healthMonitor/to_setFrequency_page?hospCode='+query.hospCode+"&age="+age+"&patName="+escape(patName)+"&phone="+phone,{
        width : 430,
        height : 300,
        lock : true,
        resize : false,
        title : '胎心监测服务次数设置'
    });
}
//查看报告
function toCheckReport(healthId,hospCode){
    window.open(localhostUrl+"/web-bin/p/followup/healthMonitor/to_checkReport_page?healthId="+healthId+"&hospCode="+hospCode,"胎心报告查看");
}