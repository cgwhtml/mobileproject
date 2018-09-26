$(function(){
    var localhostUrl=window.location.origin;//window.HUGPAGE_CONFIG.localhostUrl;
	var query=window.location.search;
	query=decodeURIComponent(query,"UTF-8");
	var applyHugId=query.split("?applyHugId=")[1];
	var accessToken=query&&query.split("&")[1].split("accessToken=")[1];
	var usId=query&&query.split("&")[2].split("usId=")[1];
	$(".content_table").height($(window).height()-50);
	$(".content_table").niceScroll({
		railpadding: { top:0, right: -15, left: 0, bottom:0 },
		cursoropacitymin: 0.4,
		cursoropacitymax: 0.4,
		cursorcolor:"#515153",
		zindex: "99",
		cursorwidth: "6px"
	});
	$(".s_input").inputer({
		css:{"width":"390px"},
		callback:function(){
			return false;
		}
	});
	// 搜索某人
	$('.csm_search_btn').click(function(){
		var seachValue=$(".s_input").val();
		$.ajax({
			on: true,
		    type:"post",
		    url: localhostUrl+'/web-bin/p/followup/chat/query_person_data?seachValue='+seachValue+'&accessToken='+accessToken+'&usId='+usId,
		    dataType:"json",
		    success: function(data){
		    	if(data.data.length!=0){
			    	$.each(data.data,function(index){
				    	if(data.data[index].type==3){
				    		var arr=[];
				    		arr.push(data.data[index]);
				    		$(".content_table").setTemplateElement("template_friendNameList").processTemplate(arr);
				    	}else{
				    		parent.art.dialog({
				            	content: "患者号不能添加好友，已屏蔽！",
				                icon: 'error',
				                time: 1.5
				            });
				    	}
			    	});
		    	}else{
		    		  parent.art.dialog({
			            	content: "查无此人！",
			                icon: 'error',
			                time: 1.5
			            });
		    	}
		    }
		});
	});
	// 添加好友
	$(".content_table").on("click",".a_color1",function(){
		var targetHugId=$(this).parent().siblings(".hug_id").text();
		$.ajax({
			on: true,
		    type:"post",
		    url: localhostUrl+'/web-bin/p/followup/chat/query_newFriend_data?applyHugId='+applyHugId+'&targetHugId='+targetHugId+'&applyDesc=123'+'&accessToken='+accessToken+'&usId='+usId,
		    dataType:"json",
		    success: function(msg){
	        	if(msg.res==0){
	        	    parent.art.dialog({
		            	content: "好友请求已发出！",
		                icon: 'succeed',
		                time: 1.5
		            });
	        	    artDialog.confirm("确认删除该同行好友吗？",function(){

	                });
				}else{
					parent.art.dialog({
		            	content: "对方已经是您的好友！",
		                icon: 'error',
		                time: 1.5
		            });
				}
	        	art.dialog.close();
	        },
	        error:function(msg){
	        	parent.art.dialog({
	            	content: "操作失败！",
	                icon: 'error',
	                time: 1.5
	            });
	        	status="true";
	        }
		});
	});
});