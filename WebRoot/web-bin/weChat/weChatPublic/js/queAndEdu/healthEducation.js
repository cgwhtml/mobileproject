var LOCALHOST_URL=window.location.origin;
var QUESTION_URL=window.HUGPAGE_CONFIG.QUESTION_URL;
var PORT=window.HUGPAGE_CONFIG.PORT;
var SERVER_URL=window.HUGPAGE_CONFIG.SERVER_URL;//读取图片服务器路径
var query_info=getRequest();
console.log(query_info);
var hospCode=query_info.hospCode||sessionStorage.getItem("hospCode");
var hgId=query_info.hugId||sessionStorage.getItem("hugId");
var usId=query_info.usId||sessionStorage.getItem("usId");
var accessToken=query_info.accessToken||sessionStorage.getItem("accessToken");
var hospName;
var query=window.location.search;
query=decodeURIComponent(query,"UTF-8");
var num;//需要加载的页码标号
var size=10;//每页的数据条数
var hasNextPage=true;

$(function(){
    $(".main_body").height($(window).height()-40);
    $(".main_body").niceScroll({
        railpadding : {top : 0,right : 0,left : 0,bottom : 0}
    });
    var name="";
    var sex="";
    var card="";
    var phone;
    var categType;
    var protocol="&protocol=121021";
    var pageSize="&pageSize=10";
    var page;
    num=1;
    query.split("name=")[1] && $(".name_js").val(query.split("name=")[1].split("&")[0]);
    query.split("card=")[1] && $(".card_js").val(query.split("card=")[1].split("&")[0]);
    query.split("phone=")[1] && $(".phone_js").val(query.split("phone=")[1].split("&")[0].substring(0,3)+"****"+query.split("phone=")[1].split("&")[0].substring(query.split("phone=")[1].split("&")[0].length-4,query.split("phone=")[1].split("&")[0].length));
    query.split("sex=")[1] && $(".sex_js").val(query.split("sex=")[1].split("&")[0]=="1"?"女":"男");
    if(query.split("&hospCard=")[1]){
        var hospCards=query.split("&hospCard=")[1].split("&")[0].split(",");
        for(var i=0;i<hospCards.length-1;i++){
            i>0 && $(".information_content").append('<div class="more_js"><span>就诊卡号/住院号</span><input type="text" class="hospCard hospCard_js" readonly="readonly"></div>');
            $(".hospCard_js").each(function(){
                $(this).val()=="" && $(this).val(hospCards[i]);
                return;
            });
        }
    }
    hospCode="&hospCode="+query.split("hospCode=")[1].split("&")[0];
    phone="?phone="+query.split("phone=")[1].split("&")[0];
    categType="&category=6";
    page="&pageNumber="+num+"&pageSize="+size;
    querys=phone+categType+hospCode+page+'&patHugId='+hgId;
    console.log(querys);
    $.ajax({
        type:"get",
        url: LOCALHOST_URL+":"+PORT+'/web-bin/m/weChat/chat/query_education_newdata'+querys,
        dataType:"json",
        success: function(data){
            console.log(data);
            if(data&&data.res==0&&data.data.result.length>0){
                CallBack(data,6);
            }else{
                $('.main_body').html('<div class="nodata"><img src="/web-bin/resources/images/nodata.png" alt=""><br/><span >找不到宣教</span></div>');
            }
        }
    });
    $(document).on("tap",".education_list",function(){
        var categType=$(this).attr("categType");
        if(categType=="6"){
            location.href = LOCALHOST_URL+":"+PORT+"/web-bin/m/nosen/oneparam/followup/education/to_checkEducation_page/"+$(this).find(".id").html();
        }else{
            location.href = LOCALHOST_URL+":"+PORT+"/web-bin/m/nosen/oneparam/followup/form/to_replyForm_page/"+$(this).find(".id").html();
        }
    });
    //滚动加载列表页面
    $(".main_body").scroll(function(){
        var scrollTop = $(this).scrollTop();
        var scrollHeight =$(".e").height();
        var windowHeight =$(this).height();
        // console.log('scrollTop='+scrollTop);
        // console.log('windowHeight='+windowHeight);
        // console.log('scrollHeight='+scrollHeight);
        var yushu=(scrollTop+windowHeight)%scrollHeight;
        console.log(yushu);
        if(yushu==0&& hasNextPage==true){
            var $div=$('<div class="e"><div>');
            $(".e").removeClass("e").addClass("e1").after($div);
            num++;
            hospCode="&hospCode="+query.split("hospCode=")[1].split("&")[0];
            page="&pageNumber="+num+"&pageSize="+size;
            querys=phone+categType+hospCode+page+'&patHugId='+hgId;
            $.ajax({
                async:true,
                on: true,
                type:"get",
                url: LOCALHOST_URL+":"+PORT+'/web-bin/m/weChat/chat/query_education_newdata'+querys,
                dataType:"json",
                beforeSend:function(){
                    $("#loading").show();
                },
                success: function(data){
                    console.log(data);
                    CallBack(data,6);
                }
            });
        }
    });

});
function CallBack(data,type){
    console.log(data);
    if(data.data){
        $(".e").setTemplateElement("education").processTemplate(data.data.result);
        $(".read").each(function(){
            ($(this).html()=="已读" || $(this).html()=="已回复") && $(this).removeClass("read").addClass("unRead");
        });
        type==6 && $(".contentImg2").removeClass().addClass("contentImg1") || $(".contentImg1").removeClass().addClass("contentImg2");
        hasNextPage=data.data.hasNextPage;
    }
}