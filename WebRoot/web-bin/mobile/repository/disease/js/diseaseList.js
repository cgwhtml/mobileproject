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
	// 顶部点击效果
	$(".classify div").each(function(){
		$(this).tap(function(){
			$(".classify div").removeClass("activeClass");
			$(this).addClass("activeClass");
		});
	});
	//获取疾病部位分类
	$(".leftClass").tap(function(){
		$.ajax({
			on: true,
			type:"post",
			url: LOCALHOST_URL+'/web-bin/m/nosen/repository/disease/query_diseaseTypeList1_data',
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
	});
	//获取疾病科室分类
	$(".rightClass").tap(function(){
		$.ajax({
			on: true,
			type:"post",
			url: LOCALHOST_URL+'/web-bin/m/nosen/repository/disease/query_diseaseTypeList2_data',
			beforeSend:function(){
				$("body").append('<div class="loader"><img src="/web-bin/mobile/repository/drug/images/loading_2.gif"/><div>');
			},
			dataType:"json",
			success: function(data){
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
	});
	$(".leftClass").tap();
	//点击药品类别
	$("#partList_result").on("tap",".partItem",function(){
		var type=$(this).find(".drug_id").val();
		//获取当前图片路径
		var indexhref=SERVER_URL+FILE_URL+$(this).find(".onclickImg").val();
		var $active=$(".activeBox");
		var unsrc=$active.find(".unclickImg").val();
		$active.removeClass("activeBox").find(".imgBox img").attr("src",SERVER_URL+FILE_URL+unsrc);
		$(this).addClass("activeBox").find(".imgBox img").attr("src",indexhref);
		if($(".leftClass").hasClass("activeClass")){
			$.ajax({
				on: true,
				type:"post",
				beforeSend:function(){
					//加载中过渡动画
					$("#drugList_result").html('<div class="loader"><img src="/web-bin/mobile/repository/drug/images/loading_2.gif"/><div>');
				},
				url: LOCALHOST_URL+'/web-bin/m/nosen/repository/disease/query_diseaseNameList1_data?position='+type,
				dataType:"json",
				success: function(data){
					$("#drugList_result").setTemplateElement("template_drugNameList").processTemplate(data.data);
				}
			});
		}else{
			$.ajax({
				on: true,
				type:"post",
				beforeSend:function(){
					//加载中过渡动画
					$("#drugList_result").html('<div class="loader"><img src="/web-bin/mobile/repository/drug/images/loading_2.gif"/><div>');
				},
				url: LOCALHOST_URL+'/web-bin/m/nosen/repository/disease/query_diseaseNameList2_data?deptname='+type,
				dataType:"json",
				success: function(data){
					$("#drugList_result").setTemplateElement("template_drugNameList").processTemplate(data.data);
				}
			});
		}
	});
    //跳转药品详情---右边点击列表跳转页面
	$("#drugList_result").on("tap",".drugItem",function(){
		var id=$(this).find(".drugId").val();
		$(this).css({"background-color":"#F4F4F4"});
		var _this=this;
		setTimeout(function(){
			$(_this).css({background:"#FFFFFF"});
			location.href = LOCALHOST_URL+'/web-bin/m/nosen/repository/disease/to_diseaseMsg_page?id='+id;
		}, 200);
	});
	//搜索疾病按钮
	$(".input_mes").tap(function(){
		var $value=$(".searchInput").val();
		if ($value) {
			$.ajax({
				on: true,
				type:"post",
				url:LOCALHOST_URL+'/web-bin/m/nosen/repository/disease/query_searchDisease_data?title='+$value,
				beforeSend:function(){
					//加载中
					$("#searchList_result").html('<div class="loaders"><img src="/web-bin/mobile/repository/drug/images/loading_2.gif"/><div>');
				},
				dataType:"json",
				success: function(data){
					console.log(data)
					if (data.data) {
						if (data.data.length==0) {
							$(".null_mes").html('没有匹配结果').show();
							$("#searchList_result").html("");
						}else{
							$(".null_mes").hide();
							$("#searchList_result").setTemplateElement("template_searchList").processTemplate(data.data);
						}
					}
				}	       	
			});	
		} else {
			$(".null_mes").html('请输入查询内容').show();
			$("#searchList_result").html("");
		}
	});
    //搜索结果点击跳转
	$("#searchList_result").on("tap",".searchItem",function(){
		var id=$(this).find(".drugId").val();
		location.href = LOCALHOST_URL+'/web-bin/m/nosen/repository/disease/to_diseaseMsg_page?id='+id;
	});
	//输入框
	$(".searchInput").focus(function(){
		$(".search").css({width:"80%",marginLeft:"0.1rem"});
		$(".cancle").show();
		$(".search_res").show();
	}).on('input',function(){
   		$(".input_mes span").html($(".searchInput").val());
    }); 
	//取消按钮
	$(".cancle").click(function(e){
	    $(".searchInput").val("").blur();
		$(".search").css({width:"95%",margin:'0.1rem auto'});
		$("#searchList_result").html("");
		$(".input_mes span").html("");
		$(".search_res").hide();
		$(".null_mes").hide();
		$(".cancle").hide();
	});
});