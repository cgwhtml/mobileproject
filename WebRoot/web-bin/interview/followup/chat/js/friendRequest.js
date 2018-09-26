$(function(){
    var localhostUrl=window.location.origin;//window.HUGPAGE_CONFIG.localhostUrl;
	var query=window.location.search;
	var SERVER_URL=window.HUGPAGE_CONFIG.SERVER_URL;//读取图片服务器路径
	var FILE_URL=window.HUGPAGE_CONFIG.FILE_URL;//读取图片文件路径
	query=decodeURIComponent(query,"UTF-8");
	var hugId=query&&query.split("&")[0].split("?hugId=")[1];
	var accessToken=query&&query.split("&")[1].split("accessToken=")[1];
	var usId=query&&query.split("&")[2].split("usId=")[1];
	var verify=query&&query.split("&")[2].split("verify=")[1];
	var docFriendRequest=localStorage['docFriendRequest'+hugId]?JSON.parse(localStorage['docFriendRequest'+hugId]):[];
	$(".new_friend").niceScroll({
		railpadding: { top:0, right: -15, left: 0, bottom:0 },
		cursoropacitymin: 0.4,
		cursoropacitymax: 0.4,
		cursorcolor:"#515153",
		zindex: "99",
		cursorwidth: "6px"
	});
	$.ajax({
		on: true,
	    type:"post",
	    url: localhostUrl+'/web-bin/p/followup/chat/query_applyFriend_data?hugId='+hugId+'&accessToken='+accessToken+'&usId='+usId+'&partnerType=10&pageNumber=1&pageSize=10',
	    dataType:"json",
	    success: function(data){
	    	if(data.data.result.length>0){
	    		$(".new_friend").setTemplateElement("template_friendRequest").processTemplate(data.data.result);
	    		for(var i=0;i<data.data.result.length;i++){
	    		    if(data.data.result[i].head){
	    		    	$(".new_friend li").eq(i).find(".new_head").html('<img src='+SERVER_URL+FILE_URL+data.data.result[i].head+'/>');
	    	        }else{
	    	            $(".new_friend li").eq(i).find(".new_head").html('');
	    	        }
	    		}
	    	}
        }
	});
	$(".new_friend").on("click",".flat_blue_highlight",function(index){
        var applyId=$(this).parent().siblings(".applyId").val();
        docFriendRequest.splice(index,1);
        localStorage['docFriendRequest'+hugId]=JSON.stringify(docFriendRequest);
        parent.$(".red_spot_request,.red_spot").hide();
		$.ajax({
			on: true,
		    type:"post",
		    url: localhostUrl+'/web-bin/p/followup/chat/query_agree_data?applyId='+applyId+'&accessToken='+accessToken+'&usId='+usId+'&partnerType=10',
		    dataType:"json",
		    success: function(msg){
	        	if(msg.res==0){
	        		parent.art.dialog({
		            	content: "已添加对方为好友！",
		                icon: 'succeed',
		                time: 1.5
		            });
	        		parent.$(".doc_choosen_model li:last").click();
				}else{
					parent.art.dialog({
		            	content: "添加失败！",
		                icon: 'error',
		                time: 1.5
		            });
				}
	        	art.dialog.close();
	        },
	        error:function(msg){
	        	parent.art.dialog({
	            	content: "添加失败！",
	                icon: 'error',
	                time: 1.5
	            });
	        	status="true";
	    }
		});
	});
	$(".wrapper").on("click",".flat_gray_highlight",function(index){
        var applyId=$(this).parent().siblings(".applyId").val();
        docFriendRequest.splice(index,1);
        localStorage['docFriendRequest'+hugId]=JSON.stringify(docFriendRequest);
        parent.$(".red_spot_request,.red_spot").hide();
		$.ajax({
			on: true,
		    type:"post",
		    url: localhostUrl+'/web-bin/p/followup/chat/query_refuse_data?applyId='+applyId+'&refuseReason=454545545'+'&accessToken='+accessToken+'&usId='+usId+'&partnerType=10',
		    dataType:"json",
		    success: function(msg){
	        	if(msg.res==0){
	        		parent.art.dialog({
		            	content: "已拒绝对方好友申请！",
		                icon: 'succeed',
		                time: 1.5
		            });
				}else{
					parent.art.dialog({
		            	content: "拒绝失败！",
		                icon: 'error',
		                time: 1.5
		            });
				}
	        },
	        error:function(msg){
	        	parent.art.dialog({
	            	content: "拒绝失败！",
	                icon: 'error',
	                time: 1.5
	            });
	        	status="true";
	    }
		});
	});
});