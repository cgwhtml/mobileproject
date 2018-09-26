/**
 * Created by huang on 2017/7/28.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query=getRequest();//方法在config配置文件中
var pageNum=1;//需要加载的页码标号
var pageSize=10;//每页的数据条数
var page="&pageNum="+pageNum+"&pageSize="+pageSize;//待拼凑的url参数
var url=LOCALHOST_URL+'/web-bin/m/followup/followupTask/query_inHosp_data?usId='+query.usId+'&accessToken='+query.accessToken;
console.log(query);
var hasNextPage=true;
var deptcodes=new Array();
var deptCode="&deptCode="+deptcodes;
//禁止iPhone的缩放，弹性滚动
window.onload=function () {

    document.addEventListener('touchstart',function (event) {
        if(event.touches.length>1){
            event.preventDefault();
        }
    });
    var lastTouchEnd=0;
    document.addEventListener('touchend',function (event) {
        var now=(new Date()).getTime();
        if(now-lastTouchEnd<=300){
            event.preventDefault();
        }
        lastTouchEnd=now;
    },false);
    document.body.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, false);

};
$(function(){
//dropload
//     $('.pat').dropload({
//         //滑动区域
//         scrollArea :window,
//         //下部样式
//         domDown : {
//             domClass   : 'dropload',
//             domRefresh : '<div class="dropload-refresh" style="font-size:12px;">↑上拉加载更多</div>',
//             domUpdate  : '<div class="dropload-update" style="font-size:12px;">↓释放加载</div>',
//             domLoad    : '<div class="dropload-load" style="font-size:12px;"><span class="loading"></span>加载中...</div>'
//         },
//         //下部方法
//         loadDownFn : function(me){
//             pageNum++;//页数加1
//             page="&pageNum="+pageNum+"&pageSize="+pageSize;
//             $.ajax({
//                     on: true,
//                     timeout:60000,
//                     type:"get",
//                     url: url+page,
//                     dataType:"json",
//                     success: function(data){
//                         if(data.res==0){
//                             var len=data.data.result.length;
//                             $(".pat").append("<div class='data_add'></div>");
//                             var $this=$(".data_add:last-child");
//                             $this.setTemplateElement("Template-Education").processTemplate(data.data.result);
//                             // var len=$this.find(".item").length;
//                             if (len<10) {//表示数据全部加载完（一页10条）
//                                 $("#m2").hide();//隐藏正在加载
//                                 $("#m3").show();//显示全部加载完
//                                 $("#m4").hide();//隐藏网络异常
//                                 me.lock();//锁定上拉下拉操作
//                                 me.noData();//无数据
//                             }
//                         }
//                 },
//                 error:function (e) {
//                     $("#m2").hide();//隐藏正在加载
//                     $("#m3").hide();//隐藏全部加载完
//                     $("#m4").show();//显示网络异常
//                     console.log('错误'+e);
//                 }
//             });//ajax()方法结束
//
//             setTimeout(function(){
//                 me.resetload();//每次数据加载完都要重置（dropload的方法）
//             },1000);
//
//         }//loadDownFn()方法结束
//     });//dropload()方法结束
    $(".main_body").niceScroll({
        cursoropacitymin: 0,
        cursoropacitymax: 0,
    });
    //跳转到待随访页面
    $("#followup").click(function () {
        location.href = LOCALHOST_URL+'/web-bin/m/followup/followupTask/to_followUp_page?eachDate='+query.eachDate+'&usId='+query.usId+'&accessToken='+query.accessToken+'&hgId='+query.hgId;
    });
    console.log(document.documentElement.clientHeight);
    $(".main_body").height(document.documentElement.clientHeight-115);

    $.ajax({
        on: true,
        timeout:60000,
        type:"get",
        url: LOCALHOST_URL+'/web-bin/m/followup/followupTask/query_doctor_power?usId='+query.usId+'&accessToken='+query.accessToken,
        dataType:"json",
        success: function(data){
            console.log(data);
            if(data.data&&data.res==0){
                callBack(data);
            }
        }
    });

    //输入框
    $(".searchInput").focus(function(){
        $(".search").css({width:"80%",marginLeft:"0.18rem"});
        $(".cancle").show();
        $(".search_res").show();
    }).on('input',function(){
        $(".input_mes span").html($(".searchInput").val());
    });

    //取消按钮
    $(".cancle").click(function(e){
        $(".searchInput").val("").blur();
        $(".search").css({width:"95%",margin:'0.1rem auto'});
        $("#searchList_result").html("");
        $(".input_mes span").html("");
        $(".search_res").hide();
        $(".null_mes").hide();
        $(".cancle").hide();
    });
    //搜索按钮
    $(".input_mes").click(function(){
        var $value=$(".searchInput").val();
        console.log($value);
        if ($value) {
            console.log(url+"&patName="+$value+page);
            $.ajax({
                on: true,
                type:"post",
                url:url+"&patName="+$value+page,
                beforeSend:function(XMLHttpRequest ){
                    //加载中
                    $("#searchList_result").html('<div class="loaders"><img src="/web-bin/mobile/repository/drug/images/loading_2.gif"/><div>');
                },
                dataType:"json",
                success: function(data){
                    console.log(data);
                    if (data.data) {
                        if (data.data.result.length==0) {
                            $(".null_mes").html('没有匹配结果').show();
                            $("#searchList_result").html("");
                        }else{
                            $(".null_mes").hide();
                            $("#searchList_result").setTemplateElement("template_searchList").processTemplate(data.data.result);
                        }
                    }
                }
            });
        } else {
            $(".null_mes").html('请输入查询内容').show();
            $("#searchList_result").html("");
        }
    });
    //搜索结果点击跳转
    /*$("#searchList_result").on("tap",".searchItem",function(){
     var id=$(this).find(".drugId").val();
     location.href = LOCALHOST_URL+'/web-bin/m/nosen/repository/drug/to_drugMsg_page?id='+id;
     });*/
    // 点击跳转详情
    $(".main_body").on("click",".item",function(){
        var $this=$(this);
        var bed=$this.find(".bed").text();
        var wardName=$this.find(".wardName").text();
        var admitDate=$this.find(".admitDate").text();
        var patName=$this.find(".patName").text();
        var phone=$this.find(".phone").val();
        var inhospNo=$this.find(".inhospNo").val();
        var idCard=$this.find(".idCard").val();
        var deptCode=$this.find(".deptCode").val();
        var deptName=$this.find(".deptName").val();
        var wardCode=$this.find(".wardCode").val();
        var patIndexNo=$this.find(".patIndexNo").val()||"";
        var visitCardNo=$this.find(".visitCardNo").val();
        var inhospSerialNo=$this.find(".inhospSerialNo").val();
        location.href = LOCALHOST_URL+'/web-bin/m/followup/followupTask/to_educationDetail_page?bed='+bed+'&wardName='+wardName+'&admitDate='+admitDate+'&patName='+patName+"&phone="+phone+"&inhospNo="+inhospNo+"&idCard="+idCard+"&deptCode="+deptCode+"&deptName="+deptName+"&wardCode="+wardCode+"&visitCardNo="+visitCardNo+"&patIndexNo="+patIndexNo+"&inhospSerialNo="+inhospSerialNo+'&usId='+query.usId+'&accessToken='+query.accessToken;
    });
    //swiper
    // var loadFlag = true;
    //滚动加载页面
    $(".main_body").scroll(function(){
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(".pat").height();
        var windowHeight = $(this).height();
        var yushu=(scrollTop+windowHeight)%scrollHeight;
        if(yushu==0){
            // alert('scrollTop='+scrollTop+"windowHeight="+windowHeight+"scrollHeight="+scrollHeight+"yushu1="+(scrollTop+windowHeight)%scrollHeight);
            var $div=$('<div class="pat"><div>');
            $(".pat").removeClass("pat").after($div);
            pageNum++;
            page="&pageNum="+pageNum+"&pageSize="+pageSize;
            $.ajax({
                on: true,
                timeout:60000,
                type:"get",
                url: url+page,
                dataType:"json",
                success: function(data){
                    console.log(data);
                    loadData1(data);
                }
            });
        }
    });
});

function callBack(data){
    console.log(data.data.viewAuth);
    if(data.data.viewAuth == 1){
        loadData();
        return;
    }else {
        console.log(data.data.wardFlag);
        if(data.data.wardFlag == 1){
            if(data.data.deptCodes == "all"){
                loadData();
                return;
            }else {
                deptcodes=data.data.deptCodes.split(",");
                deptcodes=JSON.stringify(deptcodes);
                deptCode="&deptCode="+deptcodes;
                url=url+deptCode;
                loadData(data);
                return;
            }
        }else {
            deptcodes=data.data.deptCodes.split(",");
            deptcodes=JSON.stringify(deptcodes);
            deptCode="&deptCode="+deptcodes;
            url=url+deptCode;
            loadData();
            return;
        }
    }

}
function loadData(){
    $.ajax({
        on: true,
        timeout:60000,
        type:"get",
        url: url+page,
        dataType:"json",
        success: function(data){
            console.log(data);
            if(data.data.result.length>0){
                $(".pat").setTemplateElement("Template-Education").processTemplate(data.data.result);
            }
        }
    });

}
function loadData1(data){
    if(!data.data.hasNextPage){
        hasNextPage=false;
    }
    if(!hasNextPage){
        var $end=$('<p>全部加载完毕<p>');
        $("#end").html($end);
    }
    console.log(data.res==0);
    if(data.res==0){
        $(".pat").setTemplateElement("Template-Education").processTemplate(data.data.result);
    }
}