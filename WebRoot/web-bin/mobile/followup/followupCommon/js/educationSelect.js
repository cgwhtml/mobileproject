/**
 * Created by CGT on 2017/8/9.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query=getRequest();//方法在config配置文件中
var patName=decodeURI(query.patName);
var pageNumber=1;//需要加载的页码标号
var pageSize=20;//每页的数据条数
var page="&pageNumber="+pageNumber+"&pageSize="+pageSize;//待拼凑的url参数
var partnerType=query.partnerType;
var url=LOCALHOST_URL+'/web-bin/m/followup/followupCommon/get_educationList_data?usId='+query.usId+'&accessToken='+query.accessToken+'&partnerType='+query.partnerType;
var hasNextPage=true;
var searchflag=false;
var isNewPhone=query.isNewPhone;
var phone=query.phone;
console.log(query);
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
    console.log($(window).height());
    console.log($(".search_box").height());
    console.log($(".footer").height());
    $(".content").height($(window).height()-$(".search_box").height()-$(".footer").height());
    console.log($(".content").height());
    $(".footer .phone_num").text(phone);
    //获取宣教列表
    // var data={data:{result:[{title:1},{title:2},{title:3},{title:4},{title:5},{title:6},{title:7},{title:8},{title:9},{title:10}]}};
    $.ajax({
        on: true,
        timeout:60000,
        type:"get",
        url: url+page,
        dataType:"json",
        success: function(data){
            console.log(data);
            if(data.data.result.length>0){
                $(".content .con_box.pat").setTemplateElement("con_temp").processTemplate(data.data.result);
                $(".content").niceScroll({
                    railpadding : {top : 0,right : 0,left : 0,bottom : 0}
                });
            }
        }
    });
    //页面滚动
    $(".content").on("scroll",function(){
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(".pat").height();
        var windowHeight = $(this).height();
        console.log("scrollTop="+scrollTop);
        console.log("windowHeight="+windowHeight);
        console.log("scrollHeight="+scrollHeight);
        if((scrollTop + windowHeight)%scrollHeight == 0){
            var $div=$('<div class="pat con_box"><div>');
            $(".pat").removeClass("pat").after($div);
            pageNumber++;
            page="&pageNumber="+pageNumber+"&pageSize="+pageSize;
            console.log(page);
            $.ajax({
                on: true,
                timeout:60000,
                type:"get",
                url: url+page,
                dataType:"json",
                success: function(data){
            // var data={data:{result:[{title:11},{title:12},{title:13},{title:14},{title:15},{title:16},{title:17},{title:18},{title:19},{title:20}],hasNextPage:true},res:0};
                    console.log(data);
                    if(!data.data.hasNextPage){
                        hasNextPage=false;
                    }
                    if(!hasNextPage){
                        var $end=$('<p>全部加载完毕<p>');
                        $(".end").html($end);
                    }

                    if(data.res==0){
                        $(".content .con_box.pat").setTemplateElement("con_temp").processTemplate(data.data.result);
                    }
                }
            });
        }
    });
    //选中
    $(".main").on("click",".con_box .btn_box",function(){
        // alert(1);
        var $this=$(this).find(".btn");
        if($this.hasClass("gray")){
            $this.addClass("active").removeClass("gray");
        }else if($this.hasClass("active")){
            $this.addClass("gray").removeClass("active");
        }
    });
    //发送
    var clickflag=true;
    $(".footer .btn_send").click(function(){
        if(clickflag){
            var idList=[];
            if(searchflag){
                console.log($(".search_res .list .btn_box .btn.active").length);
                $(".search_res .list .btn.active").each(function(){
                    var $this=$(this).parents(".btn_box");
                    idList.push($this.siblings(".id").val());
                });
            }else{
                console.log($(".content .list .btn_box .btn.active").length);
                $(".content .list .btn.active").each(function(){
                    var $this=$(this).parents(".btn_box");
                    idList.push($this.siblings(".id").val());
                });
            }
            // alert(idList);
            if(idList.length==0){
                art.dialog({
                    content:"请先选择要发送的宣教！",
                    lock:true,
                    time:1.5,
                    icon:"warning"
                });
            }else{
                clickflag=false;
                $.ajax({
                    on: true,
                    timeout:60000,
                    type:"get",
                    url:LOCALHOST_URL+'/web-bin/m/followup/followupCommon/post_educationList_data?usId='+query.usId+'&accessToken='+query.accessToken+'&partnerType='+partnerType+"&idList="+JSON.stringify(idList)+'&patName='+patName+"&phone="+phone+"&inhospNo="+query.inhospNo+"&idCard="+query.idCard+"&deptCode="+query.deptCode+"&deptName="+decodeURI(query.deptName)+"&wardCode="+query.wardCode+"&visitCardNo="+query.visitCardNo+"&wardName="+decodeURI(query.wardName)+"&inhospSerialNo="+query.inhospSerialNo+"&isNewPhone="+isNewPhone+"&bedNo="+query.bed,
                    dataType:"json",
                    success: function(data){
                        console.log(data);
                        if(data.res==0){
                            art.dialog({
                                content:"发送成功！",
                                lock:true,
                                icon:"succeed",
                                time:1.5
                            });
                            clickflag=true;
                            // location.href =LOCALHOST_URL+'/web-bin/m/followup/followupCommon/to_educationDetail_page?bed='+query.bed+'&wardName='+query.wardName+'&admitDate='+query.admitDate+'&patName='+query.patName+"&phone="+phone+"&inhospNo="+query.inhospNo+"&idCard="+query.idCard+"&deptCode="+query.deptCode+"&deptName="+query.deptName+"&wardCode="+query.wardCode+"&visitCardNo="+query.visitCardNo+"&patIndexNo="+query.patIndexNo+"&inhospSerialNo="+query.inhospSerialNo+"&admitDate="+decodeURI(query.admitDate)+'&usId='+query.usId+'&accessToken='+query.accessToken;
                        }else{
                            clickflag=true;
                        }
                    }
                });
            }
        }
    });
    //搜索
    //输入框
    $(".searchInput").focus(function(){
        $(".search").css({width:"80%",marginLeft:"0.19rem"});
        $(".cancle").show();
        $(".search_res").show();
    }).on('input',function(){
        $(".input_mes span").html($(".searchInput").val());
    });

    //取消按钮
    $(".cancle").click(function(e){
        $(".content").height($(window).height()-$(".search_box").height()-$(".footer").height());
        $(".searchInput").val("").blur();
        $(".search").css({width:"95%",margin:'0.1rem auto'});
        $(".search_res .con_box").html("");
        $(".input_mes span").html("");
        $(".search_res").hide();
        $(".null_mes").hide();
        $(".cancle").hide();
        searchflag=false;
    });
    //搜索按钮
    $(".input_mes").click(function(){
        var $value=$(".searchInput").val();
        page="&pageNumber=1&pageSize=30";
        console.log($value);
        if ($value) {
            $.ajax({
                on: true,
                type:"post",
                url:url+"&title="+$value+page,
                beforeSend:function(XMLHttpRequest ){
                    //加载中
                    $(".search_res .con_box").html('<div class="loaders"><img src="/web-bin/mobile/repository/drug/images/loading_2.gif"/><div>');
                },
                dataType:"json",
                success: function(data){
                    console.log(data);
                    if (data.data) {
                        if (data.data.result.length==0) {
                            $(".null_mes").html('没有匹配结果').show();
                            $(".search_res .con_box").html("");
                        }else{
                            $(".null_mes").hide();
                            $(".search_res .con_box").setTemplateElement("search_temp").processTemplate(data.data.result);
                            searchflag=true;
                        }
                        // pageResize();
                        $(".content").niceScroll({
                            railpadding : {top : 0,right : 0,left : 0,bottom : 0}
                        });
                    }
                }
            });
        } else {
            $(".null_mes").html('请输入查询内容').show();
            $(".search_res .con_box").html("");
        }
    });
    //点击跳转宣教详情
    $("body").on("click",".con_box .list_inner",function(){
        var hgId=query.hgId||sessionStorage.getItem("hgId");
        var id=$(this).siblings(".id").val();
        location.href=LOCALHOST_URL+'/web-bin/m/nosen/followup/education/to_noSendEducation_page?id='+id+"&app=1"+"&hugId="+hgId;
    });
    //编辑手机号
    $(".edit_btn").click(function(){
        artDialog.confirm("<input type='number' value='"+phone+"' autofocus class='input_num' style='border-bottom:1px solid #ddd;height:25px;width:100px;line-height:25px;text-align:center;font-size:16px;'/>",function(){
            var phone_input=$(".input_num").val();
            if(!(/^1[34578]\d{9}$/.test(phone_input))){
                art.dialog({
                    content: "手机号错误",
                    lock:true,
                    icon: 'error',
                    time: 1.5
                });
                return false;
            }else{
                $(".footer .phone_num").text(phone_input);
                phone=phone_input;
                isNewPhone=1;
            }
            }
        );
    });
});
