var query=window.location.search;
query=decodeURIComponent(query,"UTF-8");
var LOCALHOST_URL=window.HUGPAGE_CONFIG.LOCALHOST_URL;
var PORT=window.HUGPAGE_CONFIG.PORT;
var url = window.location.origin;
var QUESTION_URL=window.HUGPAGE_CONFIG.QUESTION_URL;
var num=1;//需要加载的页码标号
var size=15;//每页的数据条数
var page="&pageNumber="+num+"&pageSize="+size;//待拼凑的url参数
var hasNextPage=true;
var results=[];//接收到的所有的数据
var jinzhi=1;
var flag=true;
$(function(){
	
	document.addEventListener("touchmove",function(e){
		if(jinzhi==0){
		e.preventDefault();
		e.stopPropagation();
		}
	},false);
	
	$.ajax({
		async:false,
		on: true,
		type:"get",
		url: url +'/web-bin/m/followup/chat/query_question_data'+query+page,
		dataType:"json",
		success: function(data){
			CallBack(data);
		},
	});
	
	
	//问卷发送
	$(".submit").click(function(){
		var ids_num=0;
		if(flag){
			flag=false;
			
		
			//获取url参数，以json返回（ret）
			var reg_url = /^[^\?]+\?([\w\W]+)$/,
			reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
			arr_url = reg_url.exec(decodeURIComponent(window.location,"UTF-8")),
			ret = {};
			if (arr_url && arr_url[1]) {
				var str_para = arr_url[1], result;
				while ((result = reg_para.exec(str_para)) != null) {
					ret[result[1]] = result[2];
				}
			}
			
			//创建json
			var data={};
			if(ret.hospCode!=null){
				data.hospCode=ret.hospCode;
			}
			if(ret.thirdDocId!=null){
				data.thirdDocId=ret.thirdDocId;
			}
			if(ret.thirdPatId!=null){
				data.thirdPatId=ret.thirdPatId;
			}
			if(ret.sourseId!=null){
				data.sourseId=ret.sourseId;
			}
			if(ret.patName!=null){
				data.patName=ret.patName;
			}
			if(ret.mobileNo!=null){
				data.mobileNo=ret.mobileNo;
			}
			if(ret.idCard!=null){
				data.idCard=ret.idCard;
			}
			
			data.ids="";
			
			//获取选中的数据
			$("#main").find("input:checked").each(function(){
				
				data.ids=data.ids+$(this).attr("self-id")+",";
				ids_num+=1;
			});
			
			
			if(data.ids!="" && ids_num<=3){
				$("#background").show();
				$("#send").show();
				jinzhi=0;
				
				
				var strJSON=JSON.stringify(data);
				
				//发送json
				$.ajax({
					type: "POST",
				    url: url +'/web-bin/m/followup/chat/submit_question_data',
				    data: strJSON,
				    success: function(data){
				    	jinzhi=1;
				    	
				    	$("input:checked").each(function(){
				    		$(this).iCheck('uncheck');
							$(this).attr("checked",false);
						}); 
				    	if(data.res==0){
				    		alert("发送成功！");
				    	}else{
				    		alert(data.msg);
				    	}
				    	flag=true;
				    	$("#background").hide();
						$("#send").hide();
						
						
						
				    },
				    error:function(){
				    	alert("发送失败！");
				    	flag=true;
				    	$("#background").hide();
						$("#send").hide();
						jinzhi=1;
				        return;
			        }
				});
				
			}else if(ids_num>3){
				alert("最多发送三条数据");
				flag=true;
			}else{
				alert("请选择要发送的内容");
				flag=true;
			}
			
			//将选中的数据整理并放入data.result
	//		for(var i=0;i<lists.length;i++){
	//			var has=false;
	//			if(data.result.length==0){
	//				data.result.push(lists[i]);
	//			}else{
	//				for(var j=0;j<data.result.length;j++){
	//					if(lists[i][0]==data.result[j].patName){
	//						data.result[j].ids=data.result[j].ids+lists[i][1]+",";
	//						has=true;
	//					}
	//				}
	//				if(!has){
	//					var one={};
	//					one.patName=lists[i][0];
	//					one.ids=[lists[i][1]]+",";
	//					data.result.push(one);
	//				}
	//			}
	//		}
		}
	});
});

//滚动加载页面
$(document).on("scroll",function(){
		var a=$(document).scrollTop();
		var b=$(document).height()-$(window).height();
		if((a-b)>-90 && hasNextPage==true){
			$("#loading").show();
			var $div=$('<div class="a1"><div>');
			$(".a1").removeClass("a1").after($div);
			num++;
			page="&pageNumber="+num+"&pageSize="+size;
			$.ajax({
				async:true,
				on: true, 
				type:"get",
				url: url +'/web-bin/m/followup/chat/query_question_data'+query+page,
				dataType:"json",
				beforeSend:function(){
					$("#loading").show();
				},
				success: function(data){
					CallBack(data);
				}
			});
		}
});


function CallBack(data){
	$("#loading").hide();
	results=$.merge(results, data.data.result);
	if(!data.data.hasNextPage){
		hasNextPage=false;
	}
	if(!hasNextPage){
		var $end=$('<p>全部加载完毕<p>');
		$("#end").html($end);
		$("#loading").hide();
	}
	if(data.res==0){
		$(".a1").setTemplateElement("Template-ListRows").processTemplate(data.data.result);
		$("input").iCheck({
		    checkboxClass: 'icheckbox_square-blue',
		    radioClass: 'iradio_square-blue',
		    increaseArea: '20%' // optional
		});
		$(".watch").each(function(){
			var id=$(this).attr("self-id");
			var hospCode=query.split("hospCode=")[1].split("&")[0];
			var sourseId=query.split("sourseId=")[1].split("&")[0];
			var datas="?sourseId="+sourseId+"&hospCode="+hospCode+"&id="+id;
			$(this).click(function(){
				location.href = QUESTION_URL+"/Hug/frame/questionnaireDetail.jsp"+datas;
			});
		});
	}else{
		alert(data.msg);
	}
	
}
function alert(content){
	jinzhi=0;
	$(".alert_content").text(content);
	$(".alert_box").css({"left":($(window).width()-$(".alert_box").width())/2,"top":($(window).height()-$(".alert_box").height())/2});	
	$(".con_back").show();
	$(".alert_box").show();	
	$(".alert_footer").on("tap",function(e){
		jinzhi=1;
		$(".alert_box").hide();
		$(".con_back").hide();
		e.preventDefault();
	});
	
}
function confirm(content,obj){
	$(".confirm_content").text(content);
	$(".confirm_box").css({"left":($(window).width()-$(".confirm_box").width())/2,"top":($(window).height()-$(".confirm_box").height())/2});
	$(".con_back").show();
	$(".confirm_box").show();
	$(".cancel_btn").on("tap",function(e){
		$(".confirm_box").hide();
		$(".con_back").hide();
		status="true";
		e.preventDefault();
	});
	$(".ok_btn").on("tap",function(e){
		ajaxCallBack(obj);
		$(".confirm_box").hide();
		$(".con_back").hide();
		e.preventDefault();
	});
}




