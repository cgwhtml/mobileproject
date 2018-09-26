$(function(){
    var localhostUrl=window.location.origin;//window.HUGPAGE_CONFIG.localhostUrl;
	var query=window.location.search;
	query=decodeURIComponent(query,"UTF-8");
	var accessToken=query&&query.split("&")[0].split("?accessToken=")[1];
	var usId=query&&query.split("&")[1].split("usId=")[1];
    var friendId=query&&query.split("&")[2].split("friendId=")[1];
    var key=query&&query.split("&")[3].split("key=")[1];
    var hugId=key.split("-")[0];
    var docMsgList=localStorage['docMsgList'+hugId]?JSON.parse(localStorage['docMsgList'+hugId]):[];
	$(".blue_highlight").click(function(){
		var reviseName=$(".revise_input input").val();
		if(reviseName){
			$.ajax({
		        type: "POST",
		        url:localhostUrl+'/web-bin/p/followup/chat/query_reviseName_data?accessToken='+accessToken+'&usId='+usId+'&friendId='+friendId+'&remarkName='+reviseName,
		        dataType:"json",
		        cache: false,
		        beforeSend:function(XMLHttpRequest){
		        	status=false;
		        },
		        success: function(msg){
		        	if(msg.res==0){
		        	    parent.art.dialog({
			            	content: "修改备注成功！",
			                icon: 'succeed',
			                time: 1.5
			            });
		        	    parent.$(".doctor_doc").click();
		        	    $.each(docMsgList,function(index){
                        	if(docMsgList[index].sender==key){
                        		docMsgList[index].nickName=reviseName;
                        	}
                        });
                        localStorage['docMsgList'+hugId]=JSON.stringify(docMsgList);
					}else{
						parent.art.dialog({
			            	content: "操作失败！",
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
		}else{
			parent.art.dialog({
	        	content: "操作失败！",
	            icon: 'error',
	            time: 1.5
	        });
			 art.dialog.close();
		}
	});
	$(".gray_highlight").click(function(){
		art.dialog.close();
	});
});