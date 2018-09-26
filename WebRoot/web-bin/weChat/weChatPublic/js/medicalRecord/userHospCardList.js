/**
 * Created by CGT on 2017/7/13.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var FILE_URL=window.HUGPAGE_CONFIG.FILE_URL;
var SERVER_URL=window.HUGPAGE_CONFIG.SERVER_URL;
var query=getRequest();
console.log(query);
var hgId=query.hgId||sessionStorage.getItem("hgId");
var hospCode=query.hospCode||sessionStorage.getItem("hospCode");
var usId=query.usId||sessionStorage.getItem("usId");
var accessToken=query.accessToken||sessionStorage.getItem("accessToken");
var Timer1;
var hospName;
var url;
$(function(){
    console.log(hgId);
    console.log(hospCode);
    //查询医院名字
    $.ajax({
        on: true,
        type:"get",
        url:LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/query_hospName_data?hospCode='+hospCode,
        dataType:"json",
        success: function(data){
            console.log(data);
            if(data.data&&data.res==0){
                console.log(data.data[0].name);
                hospName=data.data[0].name;
                $(".list_span_right h2").text(hospName);
            }
        }
    });
    if(query.id&&query.id!=='undefined'){
        url=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/get_userCard_data?hospCode='+hospCode+"&hugId="+query.id+'&isFamily=1';
    }else{
        url=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/get_userCard_data?hospCode='+hospCode+"&hugId="+hgId+'&isFamily=0';
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
                $(".error").show();
                $(".error .error_content span").text(data.msg||"无就诊卡号");
                Timer1=setTimeout(function(){
                    $(".error").hide();
                },3000);
            }
        }
    });
    // 添加就诊卡
    $(".footer").click(function(event){
        if(query.id&&query.id!=='undefined'){
            location.href=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/to_addHospCard_page?hgId='+hgId+"&hospCode="+hospCode+'&fromType=1'+'&usId='+usId+'&accessToken='+accessToken+'&id='+query.id;
        }else{
            location.href=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/to_addHospCard_page?hgId='+hgId+"&hospCode="+hospCode+'&fromType=1'+'&usId='+usId+'&accessToken='+accessToken;
        }
        event.stopPropagation();
    });
    //失败弹框
    $(".error_close").click(function(event){
        clearTimeout(Timer1);
        $(".error").hide();
        event.stopPropagation;
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
        }
        $(".HospCard_list").setTemplateElement("HospCard_temp").processTemplate(data.data);
        $(".list_span_right h2").text(hospName);
    }else{
        $(".HospCard_list").append("<div class='nocard'><img src='/web-bin/weChat/weChatPublic/img/icon_11.png' style='height:120px;display: inline-block;margin:-60px 0 0 -60px;position: absolute;top:40%;left:50%;'/><p style='font-size:14px;color:#929292;text-align:center;display:inline-block;width:100%;position: absolute;bottom:0;left:0;'>暂无就诊卡<br/>点击下方按钮添加就诊卡</p></div>");
    }
}