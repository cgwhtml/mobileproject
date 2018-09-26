/**
 * Created by CGT on 2017/7/12.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query=getRequest();
var hospCode=query.hospCode||sessionStorage.getItem("hospCode");
var hgId=query.hgId||sessionStorage.getItem("hgId");
var usId=query.usId||sessionStorage.getItem("usId");
var accessToken=query.accessToken||sessionStorage.getItem("accessToken");
var fromType=query.fromType;
var Timer1;
var Timer2;
var url;
$(function(){
    $(".footer").click(function(event){
        var hospCard=$("#hospCard").val();
        console.log(hospCard);
        if(hospCard==""){
            $.alert("请输入就诊卡！");
        }else{
            if(query.id&&query.id!=='undefined'){
                url=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/post_addHospCard_data?hospCode='+hospCode+"&hospCard="+hospCard+"&usId="+usId+"&accessToken="+accessToken+"&memberId="+query.id;
            }else{
                url=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/post_addHospCard_data?hospCode='+hospCode+"&hospCard="+hospCard+"&usId="+usId+"&accessToken="+accessToken;
            }
            $.ajax({
                on: true,
                type:"get",
                url:url,
                dataType:"json",
                success: function(data){
                    console.log(data);
                    if(data&&data.res==0){
                        if(query.switchFlag==1){
                            location.href = LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/to_hospCardSwitch_page?selectType=0'+"&schId="+query.schId+"&takeIndex="+query.takeIndex+"&hospCode="+query.hospCode+"&staffName="+query.staffName+"&schDate="+query.schDate+"&dayStr="+query.dayStr+"&expectStime="+query.expectStime+"&regFee="+query.regFee+"&deptName="+query.deptName+"&pageShow=0"+'&name='+query.name+'&card='+query.card+'&phone='+query.phone+'&usId='+query.usId+'&accessToken='+query.accessToken+'&hospCard='+hospCard+'&id='+query.id+'&hgId='+hgId+'&hospName='+query.hospName;
                        }else{
                            if(query.id&&query.id!=='undefined'){
                                location.href = LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/to_userHospCardList_page?hgId='+hgId+"&hospCode="+hospCode+'&usId='+usId+'&accessToken='+accessToken+'&openId='+query.openId+'&id='+query.id;
                            }else{
                                location.href = LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/to_userHospCardList_page?hgId='+hgId+"&hospCode="+hospCode+'&usId='+usId+'&accessToken='+accessToken+'&openId='+query.openId;
                            }
                        }
                    }else{
                        $.alert(data.msg||"添加失败");
                    }
                }
            });
        }
        event.stopPropagation();
    });
});