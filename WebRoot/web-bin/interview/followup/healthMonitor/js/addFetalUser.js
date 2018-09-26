var localhostUrl=window.location.origin;//window.HUGPAGE_CONFIG.LOCALHOST_URL;
var query=getRequest();//方法在config配置文件中
//父页面window对象
var parent = art.dialog.opener;
//当前dialog
var dialog = art.dialog.open.api;
function submit(){
    $("#patNameText").text("");
    $("#phoneText").text("");
    $("#idCardText").text("");
    $("#valueText").text("");
    //姓名验证
    var patName = $.trim($("#patName").val());
    if(patName==''){
        $("#patNameText").text("必填");
        $("#patName").focus();
        return false;
    }
    //手机验证
    var isMobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;//手机号正则表达式
    var phone = $.trim($("#phone").val());
    if(phone==''){
        $("#phoneText").text("必填");
        $("#phone").focus();
        return false;
    }
    if(phone!='' && !isMobile.test(phone)){
        $("#phoneText").text("格式错误");
        $("#phone").focus();
        return false;
    }
    //身份证验证
    var idCard = $.trim($("#idCard").val());
    if(idCard!=''&& !IdCardValidate(idCard)){
        $("#idCardText").text("格式错误");
        $("#idCard").focus();
        return false;
    }
    var isInteger = /^[1-9]\d*$/;
    var value = $.trim($("#value").val());
    if(value=='' || !isInteger.test(value)){
        $("#valueText").text("服务次数必须是正整数");
        $("#value").focus();
        return false;
    }
    var result={};
    result.hospCode=query.hospCode;
    result.phone=$("#phone").val();
    result.name=$("#patName").val();
    result.idCard=idCard;
    if(idCard==""){
        result.age=0;
    }else{
        result.age=personInfoByIdCard(idCard,3);
    }
    result.sex=1;//默认女
    result.healthType=1;//默认写死1
    result.value=$("#value").val();
    art.dialog.confirm("确认提交监测设置？",function(){
        $.ajax({
            type: "POST",
            url: localhostUrl+'/web-bin/p/followup/healthMonitor/submit_fetalHeart_configure_data',
            data:JSON.stringify(result),
            success: function(data){
                if(data.res=='0'){
                    art.dialog({content: '添加成功！', icon: 'succeed', time: 1.5});
                    parent.flushList();
                }else{
                    art.dialog({
                        time: 0.5,
                        content: data.msg,
                        icon: 'error'
                    });
                }
            },
            error:function(){
                return;
            }
        });
    });
}