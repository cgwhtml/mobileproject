var localhostUrl=window.location.origin;//window.HUGPAGE_CONFIG.LOCALHOST_URL;
var query=getRequest();//方法在config配置文件中
//父页面window对象
var parent = art.dialog.opener;
//当前dialog
var dialog = art.dialog.open.api;
$(function(){
	$("#patName").text(unescape(query.patName));
	if(query.age=="undefined"||query.age==""){
        $("#age").text("未知几");
	}else{
        $("#age").text(query.age);
	}
	$("#phone").val(query.phone);
	//查询病人设置的监测信息
	$.ajax({
		type: "GET",
		url: localhostUrl+'/web-bin/p/followup/healthMonitor/query_fetalHeart_configure_data?healthType=1&phone='+query.phone+"&hospCode="+query.hospCode+"&time="+Math.random(),
	    success: function(data){
	    	if(data.data!=null){
	    		$("#valueTotal").text(data.data.value+"次");
	    		$("#nowValueTotal").val(data.data.value);
	    	}else{
	    		$("#valueTotal").text("0次");
                $("#nowValueTotal").val(0);
	    	}
	    },
	    error:function(){
	        return;
        }
	});
});
function submit(){
	$("#phoneText").text("");
	$("#valueText").text("");
	//手机验证
    var isMobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;//手机号正则表达式
    var phone = $("#phone").val();
    if($.trim(phone)=='' || !isMobile.test(phone)){
    	$("#phoneText").text("手机号码格式不正确");
    	$("#phone").focus();
        return false;
    }
    var isInteger = /^(0|[1-9][0-9]*|-[1-9][0-9]*)$/;
    var value = $("#value").val();
    if($.trim(value)=='' || !isInteger.test(value)){
    	$("#valueText").text("服务次数必须是整数");
    	$("#value").focus();
        return false;
    }
	var result={};
	result.hospCode=query.hospCode;
	result.phone=$("#phone").val();
	result.name=unescape(query.patName);
	result.age=query.age;
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
		    		art.dialog({
		    			content: '设置成功！',
						icon: 'succeed',
						time: 1.0,
						close:function(){
                            cancel();
						}
		    		});
		    		$("#valueTotal").text((parseInt($("#nowValueTotal").val())+parseInt(data.data.value))+"次");
                    if(parent && typeof(parent.flushList)=="function"){
                        parent.flushList();
                    }
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
function cancel(){
	if(query.crossDomainSrc){
        var iframe = document.createElement("iframe");
        iframe.width='0px';
        iframe.height='0px';
        iframe.style.display="none";
        iframe.src=query.crossDomainSrc+"?closeId="+query.closeId;
        document.body.appendChild(iframe);
	}else{
        dialog.close();
	}
}
