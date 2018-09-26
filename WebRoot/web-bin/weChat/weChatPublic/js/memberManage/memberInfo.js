/**
 * Created by CGT on 2017/10/18.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query=getRequest();
var card=query.card;
var phone=query.phone;
$(function(){
    $(".relation span").text(decodeURI(query.relation));
    $(".name span").text(decodeURI(query.name));
    $(".sex span").text(decodeURI(query.sexStr));
    idCardHandle(card);
    telHandle(phone);
    //添加就诊卡
    $(".addCard").click(function(event){
        location.href = LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/to_userHospCardList_page?hgId='+query.hgId+"&hospCode="+query.hospCode+"&usId="+query.usId+"&accessToken="+query.accessToken+'&fromType=0'+'&id='+query.id;
        event.stopPropagation();
    });
    //删除成员
    $(".deleteMember").click(function(event){
        art.dialog({
            content:"确认删除该成员吗?",
            ok:function(){
                $.ajax({
                    on: true,
                    type:"get",
                    url:LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/post_deleteFamilyMember_data?id='+query.id,
                    dataType:"json",
                    success: function(data){
                        console.log(data);
                        if(data.res==0){
                            location.href=LOCALHOST_URL+'/web-bin/m/weChat/WeChatPublic/to_memberList_page?hgId='+query.hgId+"&hospCode="+query.hospCode+"&usId="+query.usId+"&accessToken="+query.accessToken;
                        }
                    }
                });
            },
            cancel:function(){},
            lock:true
        });
        event.stopPropagation();
    });
});
function idCardHandle(idCard){
    card=idCard.slice(0,2)+"**************"+idCard.slice(idCard.length-2);
    $(".card span").text(card);
}
function telHandle(tel){
    console.log(tel);
    phone=tel.slice(0,4)+"*******";
    $(".phone span").text(phone);
}