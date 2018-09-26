/**
 * Created by 风殇 on 2018/1/23.
 */
/**
 * Created by 风殇 on 2018/1/20.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var SERVER_URL=window.HUGPAGE_CONFIG.SERVER_URL;//读取图片服务器路径
var FILE_URL=window.HUGPAGE_CONFIG.FILE_URL;//读取图片文件路径
var query=getRequest();
var usId=query.usId||sessionStorage.getItem("usId");
var accessToken=query.accessToken||sessionStorage.getItem("accessToken");
var organCode=query.organCode;
var surgeryNo=query.surgeryNo;
$(function(){
    $("#surgeryOperName").text(decodeURI(query.surgeryOperName));
    $("#surgeryDrName").text(decodeURI(query.surgeryDrName));
    $("#surgeryBeginDate").text(decodeURI(query.surgeryBeginDate));
    $("#anesDrName").text(decodeURI(query.anesDrName));
    $("#surgeryLevelName").text(decodeURI(query.surgeryLevelName));
    $("#woundHealingLevelName").text(decodeURI(query.woundHealingLevelName));
    function medicDetail(){
        $.ajax({
            async:true,
            on: true,
            type:"post",
            url: LOCALHOST_URL+ '/web-bin/m/weChat/weChatPublic/get_medicDetail_data?accessToken=' + accessToken + '&usId=' + usId+'&organCode='+organCode+'&surgeryNo='+surgeryNo,
            dataType: "json",
            beforeSend:function(XMLHttpRequest ){
                //加载中
                $(".medic_progress").html('<div class="loaders"><img src="/web-bin/mobile/repository/drug/images/loading_2.gif"/><div>');
            },
            success: function(data){
                $(".loaders").remove();
                if(data.res==0) {
                    var result=[];
                    for(var i=0;i<data.data.length;i++){
                        result.unshift(data.data[i]);
                    }
                    $(".medic_progress").setTemplateElement("template_medicProess").processTemplate(result);
                    for(var j=0;j<result.length;j++){
                        var times=result[j].time.split(" ");
                        $(".medic_progress li").eq(j).find(".medic_date").text(times[0]);
                        $(".medic_progress li").eq(j).find(".medic_time").text(times[1]);
                    }
                }else{
                    $.alert(data.msg)
                }
            }
        });
    }
    $(".fresh").click(function(){
        medicDetail();
    });
    $(".fresh").click();
    $(".wrapper ul li").click(function(){
        location.href=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/to_medicDetail_page?accessToken='+accessToken+'&usId='+usId+'&surgeryNo='+$(".surgeryNo").val()+'&organCode='+organCode;
    });
});

