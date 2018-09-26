/**
 * Created by 风殇 on 2018/3/23.
 */
var localHostURL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var url=window.location.search.split("&indexNoId=")[0];
var query=getRequest();//方法在config配置文件中
var hospCode=query.hospCode;
var phone=query.phone;
var usId=query.usId;
var accessToken=query.accessToken;
var suggestArr=[];
$(function(){
    $("#phone").val(phone);
    $.ajax({
        on: true,
        timeout:60000,
        type:"get",
        url: localHostURL+'/web-bin/m/weChat/weChatPublic/query_suggestType_data?hospCode='+hospCode,
        dataType:"json",
        success: function(data){
            if(data.res==0 && data.data.length>0){
                $.each(data.data,function(i,item){
                    suggestArr.push(item.name)
                });
                var mobileSelect1 = new MobileSelect({
                    trigger: '#select',
                    title: '单项选择',
                    wheels: [
                        {data:suggestArr}
                    ],
                    position:[0] //初始化定位
                });
            }
        }
    });
    $("#submit").click(function(){
        var categoryName=$("#select").text();
        var suggestion=$("#describe_box").val();
        var phone=$("#phone").val();
        if(categoryName=="请选择反馈类型"){
            $.alert("请选择反馈类型");
            return;
        }
        if(!suggestion){
            $.alert("请具体描述问题");
            return;
        }
        if(!(/^1[34578]\d{9}$/.test(phone))){
            $.alert("手机号错误");
            return;
        }
        $.ajax({
            on: true,
            timeout:60000,
            type:"get",
            url: localHostURL+'/web-bin/m/weChat/weChatPublic/query_suggestSubmit_data?hospCode='+hospCode+'&accessToken='+accessToken+'&usId='+usId+'&categoryName='+categoryName+'&suggestion='+suggestion+'&phone='+phone,
            dataType:"json",
            beforeSend:function(){
                $("body").append('<div id="loaders_box"><div class="loaders"><img src="/web-bin/mobile/repository/drug/images/loading_2.gif"/><div></div>')
            },
            success: function(data){
                $("#loaders_box").remove();
                if(data.res==0){
                    $.alert("提交成功！")
                }else{
                    $.alert(data.msg)
                }
            }
        });
    })
});
