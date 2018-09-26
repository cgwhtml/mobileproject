/**
 * Created by CGT on 2017/9/15.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query=getRequest();
console.log(query);
var bindIf=query.bindIf==="true";
var account_num=decodeURI(query.account_num);
$(function(){
    firstShow();
});
function firstShow(){
    if($(".bind_first").css("display")!=="none"){
        $(".bind_if_number").text(account_num);
        pageShow();
        $(".bind_btn").unbind("click").click(function(){
            if(!bindIf){
                $(".bind_first").hide();
                $(".bind_second").show();
                secondShow();
            }else{
                art.dialog({
                    content:"请确定是否解除绑定。",
                    lock:true,
                    ok:function(){//请求解绑
                        $.ajax({
                            on: true,
                            timeout:60000,
                            type:"get",
                            url: LOCALHOST_URL+'/web-bin/m/followup/followupTask/post_unbindFollowUp_data?usId='+query.usId+'&accessToken='+query.accessToken+"&hgId="+query.hgId,
                            dataType:"json",
                            success: function(data){
                                console.log(data);
                                if(data.res==0){
                                    account_num="未绑定";
                                    $(".bind_if_number").text(account_num);
                                    bindIf=false;
                                    pageShow();
                                }else{
                                    alert(data.msg);
                                }
                            }
                        });
                    },
                    cancel:function(){
                        return;
                    }
                });
            }
        });
    }
}
function secondShow(){
    if($(".bind_second").css("display")!=="none"){
        $(".verify_btn").unbind("click").click(function(){
            var account=$(".account_num input").val();
            var pwd=$(".account_pwd input").val();
            if(account==""){
                art.dialog({
                    content:"请填写随访账号",
                    lock:true,
                    time:1.5,
                    icon:"warning"
                });
            }else if(pwd==""){
                art.dialog({
                    content:"请填写随访密码",
                    lock:true,
                    time:1.5,
                    icon:"warning"
                });
            }else{//请求绑定
                $.ajax({
                    on: true,
                    timeout:60000,
                    type:"get",
                    url: LOCALHOST_URL+'/web-bin/m/followup/followupTask/post_bindFollowUp_data?usId='+query.usId+'&accessToken='+query.accessToken+"&hgId="+query.hgId+"&interviewAccount="+account+"&interviewPwd="+pwd+"&type=3",
                    dataType:"json",
                    success: function(data){
                        console.log(data);
                        if(data.data&&data.res==0){
                            bindIf=true;
                            account_num=account;
                            $(".bind_first").show();
                            $(".bind_second").hide();
                            firstShow();
                        }else{
                            alert(data.msg);
                        }
                    }
                });
            }
        });
    }
}
function pageShow(){
    if(!bindIf){//未绑定
        $(".bind_header").css({"background-color":"#d9e7ec"});
        $(".bind_icon").css({"background":'url("/web-bin/mobile/followup/followupTask/img/icon_20.png")',"background-size":"100% 100%"});
        $(".bind_btn").text("马上绑定");
        $(".bind_tips").text("绑定随访账号，获取在院患者及随访任务信息。");
    }else{//已绑定
        $(".bind_header").css({"background-color":"#D9E6EC"});
        $(".bind_icon").css({"background":'url("/web-bin/mobile/followup/followupTask/img/icon_21.png")',"background-size":"100% 100%"});
        $(".bind_btn").text("解除绑定");
        $(".bind_tips").text("解除绑定后，将获取不到在院患者及随访任务信息。");
    }
}

