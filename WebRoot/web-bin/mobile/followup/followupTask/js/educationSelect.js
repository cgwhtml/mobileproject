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
var url=LOCALHOST_URL+'/web-bin/m/followup/followupTask/get_educationList_data?usId='+query.usId+'&accessToken='+query.accessToken;
var hasNextPage=true;
var searchflag=false;
var isNewPhone=query.isNewPhone;
var phone=query.phone;
var patName=decodeURI(query.patName);
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
    var h=$(window).height();
    $(window).resize(function() {
        if($(window).height()<h){
            $('.footer').hide();
        }
        if($(window).height()>=h){
            $('.footer').show();
        }
    });
    $(".search_res").height($(window).height()-$(".footer").height());
};
$(function(){
    $(".content").height($(window).height()-$(".search_box").height()-$(".footer").height());
    $(".patName").text(patName);
    $(".footer .phone_num").text(phone);
    // 查询手机号
    $.ajax({
        on:true,
        type:"get",
        url:LOCALHOST_URL+'/web-bin/m/followup/healthCare/get_patientPhone_data?usId='+query.usId+'&accessToken='+query.accessToken+'&partnerType=11'+"&inhospNo="+query.inhospNo+"&inhospSerialNo="+query.inhospSerialNo+"&patIndexNo="+query.patIndexNo+"&patName="+patName,
        dataType:"json",
        success:function(data){
            if(data.data && data.res==0){
                if(data.data.mobileNo){
                    $(".footer .phone_num").html(data.data.mobileNo);
                }else{
                    $(".footer .phone_num").html("");
                }
            }
        }
    });
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
                // pageResize();
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
        if((scrollTop + windowHeight)%scrollHeight == 0){
            var $div=$('<div class="pat con_box"><div>');
            $(".pat").removeClass("pat").after($div);
            pageNumber++;
            page="&pageNumber="+pageNumber+"&pageSize="+pageSize;
            $.ajax({
                on: true,
                timeout:60000,
                type:"get",
                url: url+page,
                dataType:"json",
                success: function(data){
            // var data={data:{result:[{title:11},{title:12},{title:13},{title:14},{title:15},{title:16},{title:17},{title:18},{title:19},{title:20}]},res:0};
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
                $.alert("请先选择要发送的宣教！");
            }else{
                clickflag=false;
                if(query.hgId=="LN12199218"){
                    $.toast("发送成功！");
                    clickflag=true;
                    return;
                }
                $.ajax({
                    on: true,
                    timeout:60000,
                    type:"get",
                    url:LOCALHOST_URL+'/web-bin/m/followup/followupTask/post_educationList_data?usId='+query.usId+'&accessToken='+query.accessToken+"&idList="+JSON.stringify(idList)+'&patName='+patName+"&phone="+phone+"&inhospNo="+query.inhospNo+"&idCard="+query.idCard+"&deptCode="+query.deptCode+"&deptName="+decodeURI(query.deptName)+"&wardCode="+query.wardCode+"&visitCardNo="+query.visitCardNo+"&wardName="+decodeURI(query.wardName)+"&inhospSerialNo="+query.inhospSerialNo+"&isNewPhone="+isNewPhone+"&bedNo="+query.bed,
                    dataType:"json",
                    success: function(data){
                        console.log(data);
                        if(data.res==0){
                            $.toast("发送成功！");
                            clickflag=true;
                            // location.href =LOCALHOST_URL+'/web-bin/m/followup/followupTask/to_educationDetail_page?bed='+query.bed+'&wardName='+query.wardName+'&admitDate='+query.admitDate+'&patName='+query.patName+"&phone="+phone+"&inhospNo="+query.inhospNo+"&idCard="+query.idCard+"&deptCode="+query.deptCode+"&deptName="+query.deptName+"&wardCode="+query.wardCode+"&visitCardNo="+query.visitCardNo+"&patIndexNo="+query.patIndexNo+"&inhospSerialNo="+query.inhospSerialNo+"&admitDate="+decodeURI(query.admitDate)+'&usId='+query.usId+'&accessToken='+query.accessToken;
                        }else{
                            clickflag=true;
                            alert(data.msg);
                        }
                    }
                });
            }
        }
    });
    //输入框
    $(".css_search").click(function(){
        $(".search_res").show();
        $(".searchInput").val("").focus();
        $(".search_res .con_box").html("");
    });
    $(".searchInput").on('input',function(){
        $(".cancle").hide();
        $(".search_follow").show();
        if(!$(this).val()){
            $(".cancle").show();
            $(".search_follow").hide();
        }
    });
    //取消按钮
    $(".cancle").click(function(){
        $(".search_res").hide();
        searchflag=false;
    });
    //搜索按钮
    $(".search_follow").click(function(){
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
        var hgId=sessionStorage.getItem("hgId");
        var id=$(this).siblings(".id").val();
        location.href=LOCALHOST_URL+'/web-bin/m/nosen/followup/education/to_noSendEducation_page?id='+id+"&app=1"+"&hugId="+query.hgId;
    });
    //编辑手机号
    $(".edit_btn").click(function(){
        dd.ready(function(){
            dd.device.notification.prompt({
                message: "请填写手机号？",
                title: "编辑",
                defaultText:phone,
                buttonLabels: ['取消', '确定'],
                onSuccess : function(result) {
                    if(result.buttonIndex==1){
                        if(!(/^1[34578]\d{9}$/.test(result.value))){
                            $.alert("手机号错误");
                            // return false;
                        }else{
                            $(".footer .phone_num").text(result.value);
                            if(phone==result.value){
                                isNewPhone=0;
                            }else{
                                phone=result.value;
                                isNewPhone=1;
                            }
                        }
                    }
                },
                onFail : function(err) {}
            });
        });
        /*$.prompt({
            title: '编辑',
            text: '请填写正确手机号',
            input: phone,
            empty: false, // 是否允许为空
            onOK: function (text) {
                if(!(/^1[34578]\d{9}$/.test(text))){
                    $.alert("手机号错误");
                    // return false;
                }else{
                    $(".footer .phone_num").text(text);
                    if(phone==text){
                        isNewPhone=0;
                    }else{
                        phone=text;
                        isNewPhone=1;
                    }
                }
            },
            onCancel: function () {
                $.closeModal()
            }
        });*/
    });
});
