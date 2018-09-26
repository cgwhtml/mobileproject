/**
 * Created by huang on 2017/8/4.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var SERVER_URL=window.HUGPAGE_CONFIG.SERVER_URL;
var query=getRequest();//方法在config配置文件中
console.log(query);
var agentId=query.agentId;
var corpId=query.corpId;
var appId=sessionStorage.getItem("skipNum");
$(function(){
    // var skipNum;
    // dd.util.domainStorage.getItem({
    //     name:"skipNum",
    //     onSuccess : function(info) {
    //         value: skipNum; // 获取存储的信息
    //         skipNum=info.value;
    //         // alert("token_fromType="+fromType);
    //     },
    //     onFail : function(err) {
    //         alert("first_error:"+JSON.stringify(err));
    //     }
    // });
    $("#submit").click(function () {
        var closeDesc=$("#closeDesc").val();
        $.ajax({
            on: true,
            timeout:60000,
            type:"get",
            url: LOCALHOST_URL+'/web-bin/m/followup/followupTask/submit_closeCase_data?usId='+query.usId+'&accessToken='+query.accessToken+'&empiId='+query.empiId+'&planId='+query.planId+'&closeDesc='+closeDesc,
            dataType:"json",
            success: function(data){
                console.log(data);
                if(data.res == 0){
                    // location.href = LOCALHOST_URL+'/web-bin/m/followup/followupTask/to_followUp_page?eachDate='+query.eachDate+'&usId='+query.usId+'&accessToken='+query.accessToken+'&hgId='+query.hgId+"&corpId="+corpId+"&agentId="+agentId;
                    location.href = SERVER_URL+'/hug-web/c/user/'+appId+'/1004?corpid='+corpId;
                }
            }
        });
    });
});