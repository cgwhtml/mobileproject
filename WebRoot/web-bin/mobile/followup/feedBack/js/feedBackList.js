/**
 * Created by CGT on 2017/10/20.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query=getRequest();
var num=1;
var hospCode=query.hospCode||sessionStorage.getItem("hospCode");
var usId=query.usId||sessionStorage.getItem("usId");
var accessToken=query.accessToken||sessionStorage.getItem("accessToken");
var hgId=query.hgId||sessionStorage.getItem("hgId");
var acceptDate;
$(function(){
    $(".member_box").height($(window).height()).niceScroll({
        railpadding : {top : 0,right : 0,left : 0,bottom : 0}
    });
    var page='&pageNumber='+num+'&pageSize=15';
    dataAjax(page);
    // 滚动加载
    $(".member_box").scroll(function(){
        var scrollTop = $(this).scrollTop();
        var scrollHeight =$(".e").height();
        var windowHeight =$(this).height();
        var yushu=(scrollTop+windowHeight)%scrollHeight;
        if(yushu==0){
            num++;
            var $div=$("<div class='member_list e'></div>");
            $(".e").removeClass("e").after($div);
            var page='&pageNumber='+num+'&pageSize=15';
            dataAjax(page);
        }
    });
    //点击选中
    $("body").on('tap','.member_list ul li',function(event){
        var $_this=$(this);
        var recordId=$_this.find(".id").val();
        location.href = LOCALHOST_URL+"/web-bin/m/followup/feedBack/to_feedBackDetail_page?hospCode="+hospCode+"&recordId="+recordId+'&usId='+usId+'&accessToken='+accessToken;
        event.stopPropagation();
    });
});
function timeChange(time){
    var time=new Date(time);
    var year=time.getFullYear();
    var month=(time.getMonth()+1)>9?time.getMonth()+1:'0'+(time.getMonth()+1);
    var date=time.getDate()>9?time.getDate():'0'+time.getDate();
    acceptDate=year.toString()+'-'+month.toString()+'-'+date.toString();
    return acceptDate;
}
function dataAjax(page){
    $.ajax({
        on: true,
        type:"get",
        url:LOCALHOST_URL+'/web-bin/m/followup/feedBack/query_feedBackList_data?hospCode='+hospCode+'&cpHugId='+hgId+'&usId='+usId+'&accessToken='+accessToken+page,
        dataType:"json",
        beforeSend:function(XMLHttpRequest){
            //加载中
            $(".e").html('<div class="load_followup"><img src="/web-bin/mobile/followup/followupTask/img/loading.gif"/><div>');
        },
        success: function(data){
            console.log(data);
            if(data.data&&data.res==0&&data.data.list.length>0){
                $.each(data.data.list,function(i){
                    timeChange(data.data.list[i].cpDate);
                    data.data.list[i].cpDatrStr=acceptDate;
                    if(data.data.list[i].processStatus==4){
                        data.data.list[i].statusStr='待处理';
                    }else{
                        data.data.list[i].statusStr='已受理 ';
                    }
                    if(data.data.list[i].acceptType==1){
                        data.data.list[i].imgSrc='/web-bin/mobile/followup/feedBack/img/icon_03.png';
                    }else if(data.data.list[i].acceptType==2){
                        data.data.list[i].imgSrc='/web-bin/mobile/followup/feedBack/img/icon_04.png';
                    }
                });
                console.log(data.data.list);
                $(".e").setTemplateElement("member_temp").processTemplate(data.data.list);
                $(".processStatus").each(function(){
                    var $this=$(this);
                    console.log($this.val());
                    if($this.val()!=4){
                        $this.siblings('.status').css({'color':'rgb(117,186,119)'});
                    }
                });
            }else{
                // alert(data.msg||'页面过时');
                $(".e").append('<div id="none">'+
                    '<img src="/web-bin/mobile/medical/patient/images/prompt_icon_data.png">'+
                    '<p>暂无数据</p>'+
                    '</div>');
            }
        },
        complete:function(){
            $(".e .load_followup").remove();
        }
    });
}