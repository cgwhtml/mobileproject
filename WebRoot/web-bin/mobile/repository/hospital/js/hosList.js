/*
 	* Created by cgw
 	* Created time 2017.3.20
	* Description  药品列表页js
*/
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
$(function(){
	var LOCALHOST_URL=window.location.origin;//读取ajax的localhost路径，读取url里的LOCALHOST_URL
	var PORT=window.HUGPAGE_CONFIG.PORT;//读取ajax的配置路径，读取url里的PORT
	var SERVER_URL=window.HUGPAGE_CONFIG.SERVER_URL;//读取图片服务器路径
	var FILE_URL=window.HUGPAGE_CONFIG.FILE_URL;//读取图片文件路径
	//页面滚动条
	$("#partList_result,#searchList_result,#drugList_result").niceScroll({
        cursoropacitymin: 0,
        cursoropacitymax: 0
    });
	//获取专科分类
	$.ajax({
		on: true,
		type:"post",
		url: LOCALHOST_URL+'/web-bin/m/nosen/repository/hospital/query_hosTypeList_data',
		beforeSend:function(){
			$("body").append('<div class="loader"><img src="/web-bin/mobile/repository/drug/images/loading_2.gif"/><div>');
		},
		dataType:"json",
		success: function(data){
			console.log(data)
			$(".loader").remove();
			$("#partList_result").setTemplateElement("template_ListRows").processTemplate(data.data);
			$(".imgBox img").each(function(index){	
				var href=SERVER_URL+FILE_URL+data.data[index].imageUnclick;
				$(this).attr("src",href);
			});
			//初始化药品列表
			$(".partItem:first").tap();
		}
	});
	//点击医院类别
	$("#partList_result").on("tap",".partItem",function(){
		type=$(this).find(".drug_type").text();
		//获取当前图片路径
		var indexhref=SERVER_URL+FILE_URL+$(this).find(".onclickImg").val();
		var $active=$(".activeBox");
		var unsrc=$active.find(".unclickImg").val();
		$active.removeClass("activeBox").find(".imgBox img").attr("src",SERVER_URL+FILE_URL+unsrc);
		$(this).addClass("activeBox").find(".imgBox img").attr("src",indexhref);
		$.ajax({
			on: true,
			type:"post",
			beforeSend:function(){
				//加载中过渡动画
				$("#drugList_result").html('<div class="loader"><img src="/web-bin/mobile/repository/drug/images/loading_2.gif"/><div>');
			},
			url: LOCALHOST_URL+'/web-bin/m/nosen/repository/hospital/query_hosNameList_data?deptName='+type,
			dataType:"json",
			success: function(data){
				$("#drugList_result").setTemplateElement("template_drugNameList").processTemplate(data.data);
			}
		});
	});
    //跳转医院详情---右边点击列表跳转页面
	$("#drugList_result").on("tap",".drugItem",function(){
		var name=$(this).text();
		$(this).css({"background-color":"#F4F4F4"});
		var _this=this;
		setTimeout(function(){
			$(_this).css({background:"#FFFFFF"});
			location.href = LOCALHOST_URL+'/web-bin/m/nosen/repository/hospital/to_hosMsg_page?name='+name+'&type='+type;
		}, 200);
	});
});