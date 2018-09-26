/**
 * Created by 风殇 on 2018/4/24.
 */
var localhostUrl=window.location.origin;
var query=getRequest();
var usId=query.usId;
var hgId=query.hgId;
var accessToken=query.accessToken;
var partnerType=query.partnerType;
var app=query.app;
var deptcode="";
$(function(){
    //输入框
    $(".css_search").click(function(){
        $(".search_res").show();
        $(".searchInput").val("").focus();
        $(".searchList_result").html("");
        $(".main_body").hide();
        $("body").addClass("body_white");
    });
    $(".searchInput").on('input',function(){
        $(".cancle").hide();
        $(".search_follow").show();
        if(!$(this).val()){
            $(".cancle").show();
            $(".search_follow").hide();
        }
    });
    //取消按钮
    $(".cancle").click(function(){
        $(".search_res").hide();
        $(".main_body").show();
        $("body").removeClass("body_white");
    });
    $.ajax({
        on: true,
        timeout:60000,
        type:"get",
        url: localhostUrl+'/web-bin/m/followup/healthCare/query_doctor_power?usId='+usId+'&accessToken='+accessToken+'&partnerType='+partnerType,
        dataType:"json",
        beforeSend:function(XMLHttpRequest ){
            //加载中
            $("#main_content").html('<div class="loaders"><img src="/web-bin/mobile/repository/drug/images/loading_2.gif"/><div>');
        },
        success: function(data){
            $(".loaders").remove();
            if(data.data&&data.res==0){
                callBack(data);
                // 进入患者列表
                if(app==0){
                    //在院宣教
                    $("body").on("click",".ward_item",function(){
                        var wardcode=$(this).find(".wardcode").val();
                        var deptcodes=$(this).find(".deptcodes").val();
                        location.href=localhostUrl+'/web-bin/m/followup/healthCare/to_hospPatientNew_page?usId='+usId+'&accessToken='+accessToken+'&partnerType='+partnerType+'&hgId='+hgId+'&wardcode='+wardcode+'&deptcodes='+deptcodes+'&deptcode='+data.data.deptCode;
                    });
                }else if(app==1){
                    //在院随访
                    $("body").on("click",".ward_item",function(){
                        var wardcode=$(this).find(".wardcode").val();
                        var deptcodes=$(this).find(".deptcodes").val();
                        location.href=localhostUrl+'/web-bin/m/followup/healthCare/to_hospFollowupNew_page?usId='+usId+'&accessToken='+accessToken+'&partnerType='+partnerType+'&hgId='+hgId+'&wardcode='+wardcode+'&deptcodes='+deptcodes+'&deptcode='+data.data.deptCode;
                    });
                }else{
                    $("body").on("click",".ward_item",function(){
                        var wardcode=$(this).find(".wardcode").val();
                        var deptcodes=$(this).find(".deptcodes").val();
                        var deptName=$(this).find(".deptName").val();
                        location.href=localhostUrl+'/web-bin/m/followup/satisSurvey/to_patientListNew_page?usId='+usId+'&accessToken='+accessToken+'&partnerType='+partnerType+'&hgId='+hgId+'&wardcode='+wardcode+'&deptcodes='+deptcodes+'&deptcode='+data.data.deptCode+'&sourseId='+query.sourseId+'&deptName='+deptName;
                    });
                }
            }else{
                $.alert(data.msg);
            }
        }
    });
    $(".search_follow").click(function(){
        $(".searchList_result").html("");
        var searchValue=$(".searchInput").val().trim();
        var searchFlag=true;
        $(".ward_item").each(function(i,item){
            var $item=$(this);
            var s=$item.find("span").text().indexOf(searchValue);
            if(s!=-1){
                $(".searchList_result").append($item.clone());
                searchFlag=false;
                return;
            }
        });
        if(searchFlag){
            $(".searchList_result").html("").append('<div id="none">'+
                '<img src="/web-bin/resources/images/nodata2x.png">'+
                '<p>暂无数据</p>'+
                '</div>');
        }
    });
});
function callBack(data){
    var msg=data.data;
    var deptcodes=msg.deptCodes?msg.deptCodes.split(",") : [];
    var wardcodes=msg.wardCodes?msg.wardCodes.split(",") : [];
    var deptNames=msg.deptNames?msg.deptNames.split(",") : [];
    var wardNames=msg.wardNames?msg.wardNames.split(",") : [];
    var wardDeptcodes=[];
    if(msg.viewAuth==3){
        //全院
        if(msg.wardFlag==1){
            //科室
            $.each(deptcodes,function(i,item){
                wardDeptcodes.push(
                    {
                        deptName:deptNames[i],
                        deptcodes:item
                    }
                )
            });
        }else{
            //病区
            $.each(wardcodes,function(i,item){
                wardDeptcodes.push(
                    {
                        wardName:wardNames[i],
                        wardcode:item
                    }
                )
            });
        }
    }else{
        // 筛选
        if(msg.wardFlag==1){
            //科室
            $.each(deptcodes,function(i,item){
                wardDeptcodes.push(
                    {
                        deptName:deptNames[i],
                        deptcodes:item
                    }
                )
            });
        }else{
            //病区
            $.each(wardcodes,function(i,item){
                wardDeptcodes.push(
                    {
                        wardName:wardNames[i],
                        wardcode:item
                    }
                )
            });
        }
    }
    $("#main_content").setTemplateElement("template_wardDept").processTemplate(wardDeptcodes);
}