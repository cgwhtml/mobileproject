/**
 * Created by 风殇 on 2018/3/27.
 */
var localhostUrl=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query=getRequest();
var hospCode=query.hospCode;
var pageNumber = 20;//每页20行
var pagination;
$(function(){
    $(".more_filter_btn, .close_filter").click(function() {
        console.log($(".more_filter_btn ").hasClass("btn-default"))
        $(".more_filter_btn").toggleClass('btn-default');
        $(".more_filter_btn").hasClass('btn-default') && $(".more-filter-div").show() || $(".more-filter-div").hide();
    });
    // 限制开始时间小于结束时间
    $("#startTime").click(function(){
        var end=$("#endTime").val();
        var obj={
            elem: '#startTime',
            format: 'YYYY-MM-DD',
            festival: true //显示节日
        };
        end&&(obj.max=end);
        laydate(obj);
    });
    $("#endTime").click(function(){
        var start=$("#startTime").val();
        var obj={
            elem: '#endTime',
            format: 'YYYY-MM-DD',
            festival: true, //显示节日
            cssEvent:function (a, b) {
                b.left = a.right - 240;
                return b;
            }
        };
        start&&(obj.min=start);
        laydate(obj);
    });
    // 反馈类型下拉框
    $.ajax({
        on: true,
        timeout:60000,
        type:"get",
        url: localhostUrl+'/web-bin/m/weChat/weChatPublic/query_suggestType_data?hospCode='+hospCode,
        dataType:"json",
        success: function(data){
            if(data.res==0 && data.data.length>0){
                $.each(data.data,function(i,item){
                    $(".suggest_type").append('<option>'+item.name+'</option>')
                });
                $(".chosen_for_search").chosen({
                    disable_search_threshold:10,
                    allow_single_deselect:true,
                    search_contains:true,
                    no_results_text:"未找到此选项",
                    width:"180px"
                });
            }
        }
    });
    loadList("");
    //加载列表
    function loadList(searchUrl){
        pagination = $("#page").myPagination({
            currPage: 1,
            pageNumber: pageNumber,
            pageObj:"data",
            ajax: {
                on: true,
                callback: ajaxCallBack,
                type: "get",
                beforeSend:function(){
                    //加载中
                    $(".table-list-layout tbody").html('<div class="loaders"><img src="/web-bin/mobile/repository/drug/images/loading_2.gif"/><div>');
                },
                url: localhostUrl+'/web-bin/p/followup/suggestBack/query_suggestList_data?hospCode='+hospCode+searchUrl,
                dataType: "json"
            },
            panel: {
                tipInfo_on: true,
                tipInfo: '<div class="i_box">到第{input}{sumPage}页</div>'
            }
        });
    }
    $(".search1").click(function(){
        var searchUrl="";
        if($("#userName").val()!=="输入反馈人搜索"){
            searchUrl="&userName="+$("#userName").val();
        }
        loadList(searchUrl);
    });
    function ajaxCallBack(data){
        $(".loaders").remove();
        if(data.res==0) {
            $(".table-list-layout tbody").setTemplateElement("template_suggestList").processTemplate(data.data.list);
            function formatDate(now) {
                console.log(now)
                var year = now.getFullYear();
                var month = now.getMonth() + 1;
                var date = now.getDate();
                return year + "-" + month + "-" + date;
            }
            $(".time").each(function(){
                var time=Number($(this).text());
                var d = new Date(time);
                $(this).html(formatDate(d))
            });
            $(".do_suggest").click(function(){
                var id=$(this).siblings(".suggest_id").val();
                toSuggest(id,2);
            });
            $(".no_suggest").click(function(){
                var id=$(this).siblings(".suggest_id").val();
                toSuggest(id,3);
            })
        }else{
            art.dialog({
                content: data.msg,
                icon: 'error',
                time: 1.8
            });
        }
    }
    $(".search").click(function(){
        var categoryName=$(".suggest_type").find("option:selected").text();
        var type=$("#type").val();
        var phone=$.trim($("#phone").val());
        var startTime=$("#startTime").val();
        var endTime=$("#endTime").val();
        var searchUrl="";
        if(categoryName!=="请选择"){
            searchUrl+='&categoryName='+categoryName;
        }
        if(type){
            searchUrl+='&type='+type;
        }
        if(phone){
            searchUrl+='&phone='+phone;
        }
        if(startTime){
            searchUrl+='&startTime='+startTime;
        }
        if(endTime){
            searchUrl+='&endTime='+endTime;
        }
        loadList(searchUrl);
    });
    function toSuggest(id,type){
        artDialog.confirm("是否确认处理？",function(){
            $.ajax({
                on:true,
                type: "post",
                url: localhostUrl+"/web-bin/p/followup/suggestBack/query_suggestSolve_data?id="+id+"&type="+type,
                contentType: "application/json",
                dataType: 'json',
                success: function(data) {
                    if(data.res==0){
                        $(".search1").click();
                        art.dialog({
                            content: "处理成功！",
                            icon: 'succeed',
                            time: 1.5
                        });
                    }else{
                        art.dialog({
                            content: data.msg,
                            icon: 'error',
                            time: 1.5
                        });
                    }
                }
            });
        });
    }
});