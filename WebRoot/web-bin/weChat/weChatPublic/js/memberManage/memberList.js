/**
 * Created by CGT on 2017/10/17.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query=getRequest();
var hgId=query.hgId||sessionStorage.getItem("hgId");
var isidCard=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
var isPhone=/^1[34578]\d{9}$/;
sessionStorage.setItem('usId',query.usId);
sessionStorage.setItem('accessToken',query.accessToken);
$(function(){
    $(".member_box").height($(window).height()-$(".footer").height()-30);
    $(".member_box").niceScroll({
        railpadding : {top : 0,right : 0,left : 0,bottom : 0}
    });
    memberListShow();
    $(".footer").click(function(event){
        $(".member_box").hide();
        $(".add_box").show();
        addMember();
        event.stopPropagation();
    });
    //点击查看详情
    $("body").on('tap','.member_list ul li',function(event){
        var $_this=$(this);
        var id=$_this.find(".id").val();
        var relation=$_this.find(".relation").text();
        var name=$_this.find(".name").text();
        var sex=$_this.find(".sex").val();
        if(sex==1){
            var sexStr="女";
        }else if(sex==2){
            var sexStr="男";
        }
        var phone=$_this.find(".phone").val();
        var idCard=$_this.find(".card").text();
        location.href=LOCALHOST_URL+'/web-bin/m/weChat/WeChatPublic/to_memberInfo_page?hgId='+hgId+"&hospCode="+query.hospCode+'&fromType=0'+'&id='+id+'&relation='+relation+'&name='+name+'&sexStr='+sexStr+'&card='+idCard+'&phone='+phone+"&usId="+query.usId+"&accessToken="+query.accessToken;
        event.stopPropagation();
    });
    var clickflag=true;
    $('body').on('tap','.question_icon',function(event){
        console.log(1);
        if(clickflag){
            clickflag=false;
            $(".slideDown_answer").slideDown();
            event.stopPropagation();
        }else{
            clickflag=true;
            $(".slideDown_answer").slideUp();
            event.stopPropagation();
        }
    });
});
function memberListShow(){
    if($(".member_box").css("display")!=="none"){
        $.ajax({
            on: true,
            type:"get",
            url:LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/query_familyList_data?hugId='+hgId,
            dataType:"json",
            success: function(data){
                console.log(data);
                if(data.data&&data.res==0&&data.data.length!==0){
                    $(".member_list").setTemplateElement("member_temp").processTemplate(data.data);
                    $(".member_list ul li").each(function(){
                        var $_this=$(this);
                        var hcard=$_this.find(".card").text();
                        idCardHandle($_this,hcard);
                        if($_this.find('.sex').val()==1){
                            $_this.find('.list_span_left').css({"background":"url(/web-bin/resources/images/female.png)",'background-size':'100% 100%'});
                        }else if($_this.find('.sex').val()==2){
                            $_this.find('.list_span_left').css({"background":"url(/web-bin/resources/images/male.png)",'background-size':'100% 100%'});
                        }
                    });
                }else{
                    $(".member_list").append('<div id="none">'+
                        '<img src="/web-bin/resources/images/nodata2x.png">'+
                        '<p>暂无成员<br/>点击下方按钮添加新成员</p></p>'+
                        '</div>');
                }
            }
        });
    }
}
function addMember(){
    if($(".add_box").css("display")!=="none"){
        $(".save_btn").click(function(event){
            var relation=$("#relation").val();
            var name=$("#name").val();
            var idCard=$("#idCard").val();
            var tel=$("#tel").val();
            if(relation=="未编辑"){
                art.dialog({
                    lock:true,
                    content:"请选择关系",
                    icon:'warning',
                    time:1.5
                });
                return false;
            }else if(name==""){
                art.dialog({
                    lock:true,
                    content:"请填写姓名",
                    icon:'warning',
                    time:1.5
                });
                return false;
            }
            else if(idCard==""){
                art.dialog({
                    lock:true,
                    content:"请填写身份证号",
                    icon:'warning',
                    time:1.5
                });
                return false;
            }
            else if(tel==""){
                art.dialog({
                    lock:true,
                    content:"请填写手机号",
                    icon:'warning',
                    time:1.5
                });
                return false;
            }else if(!(isidCard.test(idCard))){
                art.dialog({
                    lock:true,
                    content:"身份证号格式错误",
                    icon:'warning',
                    time:1.5
                });
                return false;
            }
            else if(!(isPhone.test(tel))){
                art.dialog({
                    lock:true,
                    content:"手机号格式错误",
                    icon:'warning',
                    time:1.5
                });
                return false;
            }else{
                // console.log(idCard);
                var sex=Getsex(idCard);
                // console.log(sex);
                if(sex==1){
                    sexStr='女';
                }else{
                    sexStr='男';
                }
                // console.log(sexStr);
                $.ajax({
                    on: true,
                    type:"get",
                    url:LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/post_addFamilyMember_data?hugId='+hgId+'&relation='+relation+'&name='+name+'&card='+idCard+'&phone='+tel+'&sex='+sex,
                    dataType:"json",
                    success: function(data){
                        console.log(data);
                        if(data.data&&data.res==0){
                            location.href=LOCALHOST_URL+'/web-bin/m/weChat/WeChatPublic/to_memberInfo_page?hgId='+data.data.hugId+"&hospCode="+query.hospCode+'&fromType=0'+'&id='+data.data.id+'&relation='+relation+'&name='+name+'&sexStr='+sexStr+'&card='+idCard+'&phone='+tel+"&usId="+query.usId+"&accessToken="+query.accessToken;
                        }else{
                            alert(data.msg);
                        }
                    }
                });
            }
            event.stopPropagation();
        });
    }
}
function idCardHandle(box,idCard){
    var card=idCard.slice(0,2)+"**************"+idCard.slice(idCard.length-2);
    box.find(".card").text(card);
}
function Getsex(psidno){
    var sexno,sex,sexStr;
    if(psidno.length==18){
        sexno=psidno.substring(16,17)
    }else if(psidno.length==15){
        sexno=psidno.substring(14,15)
    }else{
        alert("错误的身份证号码，请核对！")
        return false;
    }
    var tempid=sexno%2;
    if(tempid==0){
        sex=1;
    }else{
        sex=2;
    }
    return sex;
}