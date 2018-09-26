/**
 * Created by CGT on 2017/7/13.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var IMG_URL=window.HUGPAGE_CONFIG.IMG_URL;
var query=getRequest();
var hospCode=query.hospCode||sessionStorage.getItem("hospCode");
var usId=query.usId||sessionStorage.getItem("usId");
var accessToken=query.accessToken||sessionStorage.getItem("accessToken");
var hugId=query.hugId||sessionStorage.getItem("hgId");
var sex;
var id=query.id;
var healthCare=query.healthCare;
var hospCard=query.hospCard;
$(function(){
    if(hospCard){
        $.ajax({
            on: true,
            type:"get",
            url:LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/query_caseNoMedicalRecordList_data?hospCode='+hospCode+"&hospCard="+hospCard,
            dataType:"json",
            success: function(data){
                $("#main_body").css("marginTop",0).show();
                $("#loading").hide();
                if(data.data.length==0){
                    $("#main_body").html(
                        '<div id="none">'+
                        '<img src="/web-bin/mobile/medical/patient/images/prompt_icon_data.png">'+
                        '<p>暂无数据</p>'+
                        '</div>'
                    );
                }
                if(data.data.length>0){
                    $("#main_head").remove();
                    CallBack(data);
                }
            }
        });
    }else{
        if(id&&id!=='undefined'){
            $("#id").val(id);
            CallBack3();
            var url=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/query_medicalRecordList_data?hugId='+id+'&hospCode='+hospCode;
            dataShow(url);
        }else{
            $.ajax({
                on: true,
                type:"get",
                url:LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/get_userInfo_data?hospCode='+hospCode+"&hgId="+hugId,
                dataType:"json",
                success: function(data){
                    console.log(data);
                    if(data.data&&data.res==0){
                        console.log("获取到用户信息");
                        CallBack2(data);
                    }else{
                        console.log("获取不到用户信息");
                        $("#name").text("");
                        $(".error").show().addClass("improveFlag");
                        $(".error .error_content span").text("请先完善个人信息");
                    }
                }
            });
            var url=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/query_medicalRecordList_data?hugId='+hugId+'&hospCode='+hospCode;
            dataShow(url);
        }
    }
    sessionStorage.setItem("hospCode",hospCode);
    sessionStorage.setItem("usId",usId);
    sessionStorage.setItem("accessToken",accessToken);
    $("body").on("tap",".improveFlag .error_close",function(event){
        $(".error").hide();
        location.href=LOCALHOST_URL+'/web-bin/m/weChat/WeChatPublic/to_userInfoImprove_page?urlType=2'+'&usId='+query.usId+'&accessToken='+query.accessToken;
        event.stopPropagation();
    });
    $("#main_body").hide();
    $("#main_body").css({"border-bottom":"0px solid #ccc",'margin-top':$("#main_head").height()});
    $(".head_right").on("tap",function(event){
        var id=$("#id").val();
        location.href = LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/to_userHospCardList_page?hgId='+hugId+"&hospCode="+hospCode+'&usId='+query.usId+'&accessToken='+query.accessToken+'&id='+id;
        event.stopPropagation();
    });
    $("body").on('tap','#head_left',function(event){
        var id=$("#id").val();
        location.href=LOCALHOST_URL+'/web-bin/m/weChat/WeChatPublic/to_memberSwitch_page?selectType=1'+'&hgId='+hugId+'&id='+id+'&hospCode='+hospCode+'&usId='+query.usId+'&accessToken='+query.accessToken;
        event.stopPropagation();
    });
});
function dataShow(url){
    $.ajax({
        on: true,
        type:"get",
        url: url,
        dataType:"json",
        success: function(data){
            if(data.data.length>0){
                CallBack(dataSort(data));
            }
            $("#main_body").show();
            $("#loading").hide();
        }
    });
}
function CallBack3(){
    $("#name").text(decodeURI(query.name));
    sex=query.sex;
    if(sex==1){
        $("#photo").attr("src","/web-bin/resources/images/woman.png");
    }
}
function CallBack2(data){
    $("#name").text(data.data.name);
    sex=data.data.sex;
    if(sex==1){
        $("#photo").attr("src","/web-bin/resources/images/woman.png");
    }
}
function CallBack(data){
    console.log(12);
    if(data.data&&data.res==0&&data.data.length!==0){

        $("#main_body").css({"border-bottom":"1px solid #ccc"});

        $(".d2").setTemplateElement("Template-ListRows").processTemplate(data.data);
        $(".img").each(function(){
            $(this).attr("src",IMG_URL+$(this).attr("src"));
        });

        //住院跳转
        $("body").on("tap",".hosp",function(event){
            var name="&name="+$("#name").html();

            var id="id="+$(this).find(".id").html();
            if(sex==1){
                var sexStr="女";
            }else{
                var sexStr="男";
            }
            var sexShow="&sex="+sexStr;
            var hospName="&hospName="+$(this).find(".p1").text();
            var top="&hideTop=1"+"&hideBasic=0"+"&hideFee=0";
            var result=id+hospName+sexShow+name+top;
            console.log(result);
            location.href = LOCALHOST_URL+"/web-bin/m/medical/patient/to_hosp_case_page?"+result;
            event.stopPropagation();
        });
        //门诊跳转
        $("body").on("tap",".visit",function(event){
            var name="&name="+$("#name").html();

            var id="id="+$(this).find(".id").html();
            if(sex==1){
                var sexStr="女";
            }else{
                var sexStr="男";
            }
            var sexShow="&sex="+sexStr;
            var hospName="&hospName="+$(this).find(".p1").text();
            var top="&hideTop=1"+"&hideBasic=0"+"&hideFee=0";
            var result=id+hospName+sexShow+name+top;
            location.href = LOCALHOST_URL+"/web-bin/m/medical/patient/to_visit_case_page?"+result;
            event.stopPropagation();
        });
        $(".id").hide();
        $(".hugId").hide();

    }else{
        if(data && data.res!=0){
            alert(data.msg);
        }
        $("#main_body").css({"border-top":"0px solid #ccc","border-bottom":"0px solid #ccc"});
        $("#main_body").html(
            '<div id="none">'+
            '<img src="/web-bin/mobile/medical/patient/images/prompt_icon_data.png">'+
            '<p>暂无数据</p>'+
            '</div>'
        );
        $("body").css("background-color","#f4f4f4");
    }
}
function dataSort(data){//时间倒序
    data.data.sort(function(a,b){
        return Date.parse(b.beginTime.replace(/-/g,"/"))-Date.parse(a.beginTime.replace(/-/g,"/"));
    });
    console.log(data);
    return data;
}
