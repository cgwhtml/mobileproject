/**
 * Created by CGT on 2017/10/20.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query=getRequest();
$(function(){
    $.ajax({
        on: true,
        type:"get",
        url:LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/query_familyList_data?hugId='+query.hgId,
        dataType:"json",
        success: function(data){
            console.log(data);
            if(data.data&&data.res==0){
                $(".member_list").setTemplateElement("member_temp").processTemplate(data.data);
                $.ajax({
                    on: true,
                    type:"get",
                    url:LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/get_userInfo_data?hospCode='+query.hospCode+"&hgId="+query.hgId,
                    dataType:"json",
                    success: function(data){
                        console.log(data);
                        if(data.data&&data.res==0){
                            console.log("获取到个人信息");
                            $(".member_list ul").prepend('<li><input type="hidden" value="'+data.data.sex+'" class="sex"><input type="hidden" value="'+data.data.phone+'" class="phone"><div class="list_span_left"></div><div class="list_span_right"><h2><label class="relation">我</label>: <span class="name">'+data.data.name+'</span></h2><label>身份证号</label>： <span class="card">'+data.data.card+'</span></div><i class="icon arrow"></i></li>');
                            console.log(query.id);
                            if(!query.id||query.id=='undefined'){
                                $(".member_list ul li").eq(0).addClass('active').siblings('li').removeClass('active');
                            }
                            $(".member_list ul li").each(function(){
                                var $_this=$(this);
                                var hcard=$_this.find(".card").text();
                                var hid=$_this.find(".id").val();
                                console.log(hid);
                                if(hid==query.id){
                                    $_this.addClass('active').siblings('li').removeClass('active');
                                }
                                idCardHandle($_this,hcard);
                                if($_this.find('.sex').val()==1){
                                    $_this.find('.list_span_left').css({"background":"url(/web-bin/resources/images/female.png)",'background-size':'100% 100%'});
                                }else if($_this.find('.sex').val()==2){
                                    $_this.find('.list_span_left').css({"background":"url(/web-bin/resources/images/male.png)",'background-size':'100% 100%'});
                                }else{
                                    $_this.find('.list_span_left').css({"background":"url(/web-bin/resources/images/male.png)",'background-size':'100% 100%'});
                                }
                            });
                        }else{
                            alert(data.msg);
                        }
                    }
                });
            }else{
                alert(data.msg);
            }
        }
    });
    //点击选中
    $("body").on('tap','.member_list ul li',function(event){
        var $_this=$(this);
        $_this.addClass('active').siblings().removeClass('active');
        var name=$_this.find(".name").text();
        var card=$_this.find(".card").text();
        var id=$_this.find(".id").val();
        var phone=$_this.find(".phone").val();
        var sex=$_this.find(".sex").val();
        if(query.selectType==0){
            var url=LOCALHOST_URL+'/web-bin/m/weChat/WeChatPublic/to_appointConfirm_page?selectType=0'+"&schId="+query.schId+"&takeIndex="+query.takeIndex+"&hospCode="+query.hospCode+"&schDate="+query.schDate+"&dayStr="+query.dayStr+"&expectStime="+query.expectStime+"&regFee="+query.regFee+"&deptName="+query.deptName+"&pageShow=0"+'&name='+name+'&card='+card+'&id='+id+'&phone='+phone+'&usId='+query.usId+'&accessToken='+query.accessToken+ 'hospCard=' + query.hospCard;
            if(query.staffName){
                location.href=url+"&staffName="+query.staffName;
            }else{
                location.href=url;
            }
        }else if(query.selectType==1){
            location.href=LOCALHOST_URL+'/web-bin/m/weChat/WeChatPublic/to_medicalRecordList_page?selectType=1'+'&hugId='+query.hgId+'&name='+name+'&card='+card+'&id='+id+'&phone='+phone+'&sex='+sex+'&hospCode='+query.hospCode+'&usId='+query.usId+'&accessToken='+query.accessToken;
        }
        event.stopPropagation();
    });
});
function idCardHandle(box,idCard){
    var card=idCard.slice(0,2)+"**************"+idCard.slice(idCard.length-2);
    box.find(".card").text(card);
}
