/**
 * Created by CGT on 2017/11/16.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query=getRequest();
var hgId=query.hgId||sessionStorage.getItem("hgId");
var hospCode=query.hospCode||sessionStorage.getItem("hospCode");
var usId=query.usId||sessionStorage.getItem("usId");
var accessToken=query.accessToken||sessionStorage.getItem("accessToken");
$(function(){
    if(query.id&&query.id!=='undefined'){
        var url=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/get_userCard_data?hospCode='+hospCode+"&hugId="+query.id+'&isFamily=1';
    }else{
        var url=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/get_userCard_data?hospCode='+hospCode+"&hugId="+hgId+'&isFamily=0';
    }
    $.ajax({
        on: true,
        type:"get",
        url:url,
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
    //点击选中
    $("body").on('tap','.HospCard_list ul li',function(event){
        var hospCard=$(this).find('.hospCard').text();
        var cardId=$(this).find('.cardId').val();
        var url=LOCALHOST_URL + '/web-bin/m/weChat/WeChatPublic/to_appointConfirm_page?selectType=0' + "&schId=" + query.schId + "&takeIndex=" + query.takeIndex + "&hospCode=" + query.hospCode + "&schDate=" + query.schDate + "&dayStr=" + query.dayStr + "&expectStime=" + query.expectStime + "&regFee=" + query.regFee + "&deptName=" + query.deptName + "&pageShow=0" + '&name=' + query.name + '&card=' + query.card + '&id=' + query.id + '&phone=' + query.phone + '&usId=' + query.usId + '&accessToken=' + query.accessToken + '&hospCard=' + hospCard+ '&cardId=' + cardId;
        if(query.staffName){
            location.href=url+"&staffName="+query.staffName;
        }else {
            location.href=url;
        }
        event.stopPropagation();
    });
    //添加就诊卡
    $(".footer").click(function(event){
        var hospCard=$(this).find('.hospCard').text();
        var url=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/to_addHospCard_page?selectType=0'+"&schId="+query.schId+"&takeIndex="+query.takeIndex+"&hospCode="+query.hospCode+"&staffName="+query.staffName+"&schDate="+query.schDate+"&dayStr="+query.dayStr+"&expectStime="+query.expectStime+"&regFee="+query.regFee+"&deptName="+query.deptName+"&pageShow=0"+'&name='+query.name+'&card='+query.card+'&phone='+query.phone+'&usId='+query.usId+'&accessToken='+query.accessToken+'&hospCard='+hospCard+'&switchFlag=1'+'&hgId='+hgId+'&hospName='+query.hospName;
        if(query.id&&query.id!=='undefined'){
            location.href=url+'&id='+query.id
        }else{
            location.href=url;
        }
        event.stopPropagation();
    });
});
function CallBack(data){
    if(data.data&&data.data.length>0){
        for(var i=0;i<data.data.length;i++){
            if(data.data[i].cardType==1){
                data.data[i].cardTypeTxt="就诊卡号"
            }else if(data.data[i].cardType==2){
                data.data[i].cardTypeTxt="住院号"
            }
            if(data.data[i].hospCard==query.hospCard){
                data.data[i].style='active';
            }
        }
        console.log(data);
        $(".HospCard_list").setTemplateElement("HospCard_temp").processTemplate(data.data);
        $(".list_span_right h2").text(decodeURI(query.hospName));
    }else{
        $(".HospCard_list").append("<img src='/web-bin/weChat/weChatPublic/img/icon_11.png' style='height:332px;display: inline-block;margin:0 auto;'/><p style='font-size:20px;color:#929292;text-align: center;margin:0.2rem auto 0.4rem;display: inline-block;width: 100%;'>暂无就诊卡<br/>点击下方按钮添加就诊卡</p>");
    }
}
