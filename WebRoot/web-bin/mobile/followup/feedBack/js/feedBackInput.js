/**
 * Created by CGT on 2017/10/24.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query=getRequest();
var data_purpose={};
var name;
var hospCode=query.hospCode||sessionStorage.getItem("hospCode");
var usId=query.usId||sessionStorage.getItem("usId");
var accessToken=query.accessToken||sessionStorage.getItem("accessToken");
var hgId=query.hgId||sessionStorage.getItem("hgId");
var tel;
var revisitExcp;
$(function(){
    $("body").height($(window).height()).niceScroll({
        railpadding : {top : 0,right : 0,left : 0,bottom : 0}
    });
    //禁止iPhone的缩放，弹性滚动
    window.onload=function () {
        document.addEventListener('touchstart',function (event) {
            if(event.touches.length>1){
                event.preventDefault();
            }
        });
        var lastTouchEnd=0;
        document.addEventListener('touchend',function (event) {
            var now=(new Date()).getTime();
            if(now-lastTouchEnd<=300){
                event.preventDefault();
            }
            lastTouchEnd=now;
        },false);
        document.body.addEventListener('touchmove', function (event) {
            event.preventDefault();
        }, false);
    };
    $('.main').height($(window).height());
    $("#event_describe_input,.content").niceScroll({
        railpadding : {top : 0,right : 0,left : 0,bottom : 0}
    });
    //开关
    var $div2=$("#div2");
    var $div1=$("#div1");
    $div2.click(function () {
        if($div1.attr("class")=="close1"){
            $div1.attr("class","open1");
            revisitExcp=1;
        }else {
            $div1.attr("class","close1");
            revisitExcp=0;
        }
        if($div2.attr("class")=="close2"){
            $div2.attr("class","open2");
        }else {
            $div2.attr("class","close2");
        }
    });
    //查询用户信息
    $.ajax({
        on: true,
        type: "get",
        url: LOCALHOST_URL + ':' + PORT + '/web-bin/m/followup/feedBack/query_userInfo_data?hgId='+hgId+'&hospCode='+hospCode,
        dataType: "json",
        success: function (data) {
            console.log(data);
            if(data.data&&data.res==0){
                name=data.data.name;
                tel=data.data.phone;
            }
        }
    });
    //获取下拉框数据
    $.ajax({
        on: true,
        type:"get",
        url: LOCALHOST_URL+'/web-bin/m/followup/feedBack/get_slideDown_data?hospCode='+hospCode+'&usId='+usId+'&accessToken='+accessToken,
        dataType:"json",
        success: function(data){
            console.log(data);
            if(data.data&&data.res==0){
                if(data.data.cpCategoryList.length>0){
                    $(".header .category select").setTemplateElement("category_temp").processTemplate(data.data.cpCategoryList);
                }
                if(data.data.patientSourceList.length>0){
                    $(".header .patient_type select").setTemplateElement("patient_type_temp").processTemplate(data.data.patientSourceList);
                $(".header .purpose select").setTemplateElement("purpose_temp").processTemplate(data.data.compPurposeList);
                }
                if(data.data.compPurposeList.length>0){
                    data_purpose.compPurposeList=data.data.compPurposeList;
                }
                if(data.data.praisePurposeList.length>0){
                    data_purpose.praisePurposeList=data.data.praisePurposeList;
                }
            }
        }
    });

    //输入
    $(".header .event_type").change(function(){
        var event_type=$(this).find('option:checked').val();
        if(event_type==1){
            $(".header .category label").text('投诉类别');
            $(".header .target label").text('投诉对象');
            $(".header .purpose label").text('投诉目的');
            $(".header .purpose select").setTemplateElement("purpose_temp").processTemplate(data_purpose.compPurposeList);
        }else if(event_type==2){
            $(".header .category label").text('表扬类别');
            $(".header .target label").text('表扬对象');
            $(".header .purpose label").text('表扬目的');
            $(".header .purpose select").setTemplateElement("purpose_temp").processTemplate(data_purpose.praisePurposeList);
        }
    });
    //提交
    $("body").on('tap','.footer',function(event){
        var acceptType=$(".event_type select option:checked").val();
        var categoryId=$(".category select option:checked").val();
        var categoryName=$(".category select option:checked").text();
        var cpPersonName=$(".target input").val();
        var cpDetail=$("#event_describe_input").val();
        var patientCategory=$(".patient_type select option:checked").val();
        var patientCategoryName=$(".patient_type select option:checked").text();
        var cpPurpose=$(".purpose select option:checked").val();
        var cpPurposeName=$(".purpose select option:checked").text();
        var regRule = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
        if(cpPersonName==''){
            art.dialog({
                content:'投诉对象未添加',
                time:1.5,
                icon:'warning'
            });
            return false;
        }else if(cpDetail==''){
            art.dialog({
                content:'请填写事件描述',
                time:1.5,
                icon:'warning'
            });
            return false;
        }else if(cpPersonName.match(regRule)){
            art.dialog({
                content:'投诉对象不支持表情',
                time:1.5,
                icon:'warning'
            });
            return false;
        }else if(cpDetail.match(regRule)){
            art.dialog({
                content:'事件描述不支持表情',
                time:1.5,
                icon:'warning'
            });
            return false;
        }else{
            var obj={
                'hospCode':hospCode,
                'usId':usId,
                'accessToken':accessToken,
                'acceptType':acceptType,
                'cpDeptCode':query.deptcode,
                'cpDeptName':query.deptName,
                'categoryId':categoryId,
                'categoryName':categoryName,
                'cpDetail':cpDetail,
                'patientName':'匿名',
                'patientCategory':patientCategory,
                'patientCategoryName':patientCategoryName,
                'cpHugId':hgId,
                'complainantMobile':tel,
                'cpPurpose':cpPurpose,
                'cpPurposeName':cpPurposeName,
                'cpPersonName':cpPersonName,
                'complainant':'匿名'
            };
            if(revisitExcp!==1){
                obj.patientName=name;
                obj.complainant=name;
            }
            var url=LOCALHOST_URL+'/web-bin/m/followup/feedBack/post_formInfo_data?'+returnUrl(obj);
            console.log(url);
            $.ajax({
                on:'true',
                type:'get',
                url:url,
                dataType:'json',
                success:function(data){
                    console.log(data);
                    alert(JSON.stringify(data));
                    if(data.res==0){
                        art.dialog({
                            title:'提交成功',
                            content:'本院已收到您登记的投诉表扬，再次感谢您对本院的支持',
                            width:'90%',
                            height:100,
                            icon:'succeed'
                        });
                        $(".header ul li select option").eq(0).attr("checked");
                        $(".header ul li.target input,#event_describe_input").val('');
                    }else{
                        alert(data.msg);
                    }
                }
            });
        }
        event.stopPropagation();
    });
    //点击输入
    $("body").on('click','.header ul li',function(event){
        var $this=$(this);
        var $inp=$this.find('input');
        $inp.trigger('focus');
        event.stopPropagation();
    });
});
function returnUrl(obj){
    var str='';
    $.each(obj,function(i,val){
        str=str+'&'+i+'='+val;
    });
    str=str.substring(1);
    console.log(str);
    return str;
}
