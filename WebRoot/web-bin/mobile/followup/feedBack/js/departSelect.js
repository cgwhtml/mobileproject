/**
 * Created by CGT on 2017/10/23.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query=getRequest();
var hospCode=query.hospCode||sessionStorage.getItem("hospCode");
var usId=query.usId||sessionStorage.getItem("usId");
var accessToken=query.accessToken||sessionStorage.getItem("accessToken");
var hgId=query.hgId||sessionStorage.getItem("hgId");
var deptArr=[];
var hospName;
$(function(){
    sessionStorage.setItem("hospCode",hospCode);
    sessionStorage.setItem("usId",usId);
    sessionStorage.setItem("accessToken",accessToken);
    sessionStorage.setItem("hgId",hgId);
    console.log(hospCode);
    console.log(hgId);
    console.log(usId);
    console.log(accessToken);
    $(".con_left,.con_right").height($(window).height()-45);
    $(".con_left,.con_right").niceScroll({
        cursoropacitymin: 0,
        cursoropacitymax: 0
    });
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
    // 登录
    // $.ajax({
    //     on: true,
    //     type:"get",
    //     url: LOCALHOST_URL+'/web-bin/m/followup/feedBack/post_userLogin_data?phone=15700186384&pwd=369a369',
    //     dataType:"json",
    //     success: function(data){
    //         console.log(data);
    //         usId=data.data.id;
    //         accessToken=data.data.accessToken;
    //         accessToken=data.data.accessToken;
    //         hgId=data.data.hgId;
            // 获取列表
            $.ajax({
                on: true,
                type:"get",
                url: LOCALHOST_URL+'/web-bin/m/followup/feedBack/get_departList_data?hospCode='+hospCode+'&usId='+usId+'&accessToken='+accessToken,
                dataType:"json",
                success: function(data){
                    console.log(data);
                    if(data.data&&data.res==0){
                        CallBack(data);
                    }else{
                        alert(data.msg);
                    }
                }
            });
    //     }
    // });


    // 查看记录
    $(".record").on('tap',function(event){
        location.href = LOCALHOST_URL+"/web-bin/m/followup/feedBack/to_feedBackList_page?hospCode="+hospCode+"&hgId="+hgId+'&usId='+usId+'&accessToken='+accessToken;
        event.stopPropagation();
    });
});
function CallBack(data){
    $(".con_left").setTemplateElement("con_left_temp").processTemplate(data.data);
    $(".con_left ul li:first-child").addClass("active");
    //右列表取值
    $.each(data.data,function(i,n){
        deptArr.push(n.deptList);
    });
    console.log(deptArr);
    $(".con_right").setTemplateElement("con_right_temp").processTemplate(deptArr[0]);
    var Cheight=$(".content").height();
    $(".con_left").css({"height":Cheight+"px"});
    //点击左列表
    $("body").on("click",".con_left ul li",function(event){
        var Rindex=$(this).index();
        $(this).addClass("active").siblings("li").removeClass("active");
        console.log(deptArr[Rindex]);
        $(".con_right").setTemplateElement("con_right_temp").processTemplate(deptArr[Rindex]);
        event.stopPropagation();
    });
    //点击右列表
    $("body").on("click",".con_right ul li",function(event){
        var deptcode=$(this) .find("input").val();
        var deptName=$(this).text();
        console.log(deptName);
        location.href = LOCALHOST_URL+"/web-bin/m/followup/feedBack/to_feedBackInput_page?deptcode="+deptcode+"&deptName="+deptName+'&hospCode='+hospCode+'&usId='+usId+'&accessToken='+accessToken+'&hgId='+hgId;
        event.stopPropagation();
    });
}