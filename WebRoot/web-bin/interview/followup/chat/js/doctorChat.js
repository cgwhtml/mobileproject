/*
 	* Created by cgw
 	* Created time 2017.3.20
	* Description 医患聊天
*/
var localhostUrl=window.location.origin;//window.HUGPAGE_CONFIG.localhostUrl;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query=window.location.search;
query=decodeURIComponent(query,"UTF-8");
var SERVER_URL=window.HUGPAGE_CONFIG.SERVER_URL;//读取图片服务器路径
var FILE_URL=window.HUGPAGE_CONFIG.FILE_URL;//读取图片文件路径
$(window).resize(function(){
	change();
});
function change(){
    $(".chat_top").height($(window).height()-$(".chat_input").height()-155);
}
$(function(){
	change();
	var sender=query&&query.split("&")[0].split("?sender=")[1];
	var targetHugId=query&&query.split("&")[1].split("targetHugId=")[1];
	var usId=query&&query.split("&")[2].split("usId=")[1];
	var accessToken=query&&query.split("&")[3].split("accessToken=")[1];
	var hugId=query&&query.split("&")[4].split("hugId=")[1];
	var head=query&&query.split("&")[5].split("head=")[1];
    var keys=query&&query.split("&")[6].split("keys=")[1];
    var friendId=query&&query.split("&")[7].split("friendId=")[1];
    var myHead=query&&query.split("&")[8].split("myHead=")[1];
    var KEY=keys.split('-')[0]+'-'+targetHugId;
    var size=10;
    var pagenumber =1;
    // var map = {};
    // var docMsgListShow=[];
	$(".chat_top").niceScroll({
		railpadding: { top:0, right: -1, left: 0},
		cursoropacitymin: 0.4,
		cursoropacitymax: 0.4,
		cursorcolor:"#515153",
		zindex: "99",
		cursorwidth: "6px"
	});
	$("#user_input").niceScroll({
		railpadding: { top:0, right: -6, left: 0, bottom:0 },
		cursoropacitymin: 0.4,
		cursoropacitymax: 0.4,
		cursorcolor:"#515153",
		zindex: "99",
		cursorwidth: "6px"
	});
	// 展示当前好友信息
	$(".index_friend_name").html(sender);
	$(".index_friend_account").text('('+targetHugId+')');
	if(head){
		if(head=="undefined"){
			$(".index_friend_head").addClass("design_icon");
		}else{
			$(".index_friend_head").removeClass("design_icon").append('<img src='+head+' alt="">');
		}
	}else{
		$(".index_friend_head").addClass("design_icon");
	}
    // 键盘选择效果
    $(".send_code").on("click","li",function(){
        $(".active_send_choosen").removeClass("active_send_choosen");
        $(this).addClass("active_send_choosen");
    });
    // 播放语音
    $(".chat_top").on("click",".audio_controller",function(){
    	var audio=$(this).children("audio")[0];
    	audio.play();
        var $audio=$(this);
        $audio.find("img").attr("src","/web-bin/weChat/weChatPublic/img/audio_play.gif");
        audio.onended = function() {
            $audio.find("img").attr("src","/web-bin/interview/followup/chat/images/audio.png");
        };
    });
    $(".chat_top").on("click",".video_controller",function(){
    	var video=$(this).children("video")[0];
    	$(this).find(".play_video").hide();
    	video.play();
    	video.onended = function() {
    		$(".play_video").show();
    	};
    });
    // 短消息
    $(document).on("click",".icon_msg" ,function(){
        $(".send_short_msg").toggleClass("active_short_msg");
        $(".short_li").unbind('click').click(function(){
            $(".active_short_choosen").removeClass("active_short_choosen");
            $(this).addClass("active_short_choosen");
            var shortMsg=$(".active_short_choosen").find("span").text();
            $("#user_input").html(shortMsg);
            $(".send_btn").click();
            $(".send_short_msg").removeClass("active_short_msg");
        });
    });
    //图片发送
    $(".file").change(function(e){
        var source=$(this)[0];
        var file = source.files[0];
        if(window.FileReader) {
            uploadByForm();
        }
        function uploadByForm() {
            var formData = new FormData($("#myForm")[0]);
            $.ajax({
                url: localhostUrl + '/web-bin/c/nosen/common/file/file_upload_send?chatType=2&msgType=0&targetHugId='+targetHugId+'&hugId='+hugId+'&partnerType=10'+'&accessToken='+accessToken+'&usId='+usId+'&content=图片',
                type: 'POST',
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function(data){
                    if(data.res==0) {
                        if(myHead!="undefined"){
                            $(".chat_top").append('<li><div class="send_head"><img src='+SERVER_URL+FILE_URL+myHead+'/></div><div class="img_box float_right"><div class="send_triangle design_icon"></div><input type="hidden" value="'+SERVER_URL+FILE_URL+data.files[0].filename+'" class="id_src"><img src="'+SERVER_URL+FILE_URL+data.files[0].filename+'"  height="200px"/></div></li>');
                        }else{
                            $(".chat_top").append('<li><div class="send_head design_icon"></div><div class="img_box float_right"><div class="send_triangle design_icon"></div><input type="hidden" value="'+SERVER_URL+FILE_URL+data.files[0].filename+'" class="id_src"><img src="'+SERVER_URL+FILE_URL+data.files[0].filename+'"  height="200px"/></div></li>');
                        }
                        var msgScroll=$(".chat_top").scrollTop();
                        var sendHeight=$(".chat_top .sended_msg:last").outerHeight()+200;
                        msgScroll+=sendHeight;
                        $(".chat_top").animate({scrollTop:msgScroll},0);
                    }
                }
            });
        }
    });
    // 视频发送
    $(".file_video").change(function(event){
        var source=$(this)[0];
        var file = source.files[0];
        var formDataVideo = new FormData($("#videoForm")[0]);
        $.ajax({
            url: localhostUrl + '/web-bin/c/nosen/common/file/file_upload_materChild',
            type: 'POST',
            data: formDataVideo,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function(data){
                if(data.res==0) {
                    $('#videoSend').attr("src",SERVER_URL+FILE_URL+data.files[0].filename);
                    var videoSend = $('#videoSend')[0];
                    var canvas = document.createElement("canvas");
                    var canvasFill = canvas.getContext('2d');
                    console.log(videoSend)
                    canvasFill.drawImage(videoSend, 0, 0, 200, 200);
                    var src = canvas.toDataURL("image/jpeg");
                    var arr = src.split(','), mime = arr[0].match(/:(.*?);/)[1],
                        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                    while(n--){
                        u8arr[n] = bstr.charCodeAt(n);
                    }
                    var obj = new Blob([u8arr], {type:mime});
                    formDataVideo.append("upfile", obj,"image.png");
                    uploadVideo();
                }
            }
        });
        function uploadVideo() {
            $.ajax({
                url: localhostUrl + '/web-bin/c/nosen/common/file/file_upload_send_send?chatType=2&msgType=2&targetHugId='+targetHugId+'&hugId='+hugId+'&partnerType=10'+'&accessToken='+accessToken+'&usId='+usId+'&content=小视频',
                type: 'POST',
                data: formDataVideo,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function(data){
                    if(data.res==0) {
                        if(myHead!="undefined"){
                            $(".chat_top").append('<li><div class="send_head"><img src='+SERVER_URL+FILE_URL+myHead+'/></div><div class="video_controller float_right"><div class="send_triangle design_icon"></div><div class="play_video"><img src="/web-bin/resources/images/play.png"/></div><input type="hidden" value="'+SERVER_URL+FILE_URL+data.files[0].filename+'" class="id_src"><video src="'+SERVER_URL+FILE_URL+data.files[0].filename+'" height="200px" ></video></div></li>');
                        }else{
                            $(".chat_top").append('<li><div class="send_head design_icon"></div><div class="video_controller float_right"><div class="send_triangle design_icon"></div><div class="play_video"><img src="/web-bin/resources/images/play.png"/></div><input type="hidden" value="'+SERVER_URL+FILE_URL+data.files[0].filename+'" class="id_src"><video src="'+SERVER_URL+FILE_URL+data.files[0].filename+'" height="200px" ></video></div></li>');
                        }
                        var msgScroll=$(".chat_top").scrollTop();
                        var sendHeight=$(".chat_top .sended_msg:last").outerHeight()+200;
                        msgScroll+=sendHeight;
                        $(".chat_top").animate({scrollTop:msgScroll},0);
                    }
                }
            });
        }
    });
    // 发送消息
    $(".send_btn").click(function() {
        var inputContain=$("#user_input").text();
        KEY=keys.split('-')[0]+'-'+targetHugId;
        // var str = $("#saytext").val();
        // $("#user_input").html(replace_em(str))
        if(inputContain&&usId){
	        $.ajax({
	            on: true,
	            type:"post",
	            url: localhostUrl+'/web-bin/p/followup/chat/query_sendText_data?usId='+usId+'&accessToken='+accessToken+'&hugId='+hugId+'&targetHugId='+targetHugId+'&content='+encodeURI(inputContain)+'&chatType=1',
	            dataType:"json",
	            beforeSend:function(){
					if(myHead!="undefined"){
						$(".chat_top").append('<li><div class="send_head"><img src='+SERVER_URL+FILE_URL+myHead+'/></div><div class="sended_msg"><div class="send_triangle design_icon"></div><span>'+inputContain+'</span></div><div class="loader"><img src="/web-bin/resources/images/loading_1.gif" width="20px"/></div></li>');
					}else{
						$(".chat_top").append('<li><div class="send_head design_icon"></div><div class="sended_msg"><div class="send_triangle design_icon"></div><span>'+inputContain+'</span></div><div class="loader"><img src="/web-bin/resources/images/loading_1.gif" width="20px"/></div></li>');
					}
	            },
	            success: function(data){
	            	if(data.res==0){
	              		$(".chat_top").find(".loader").remove();
		            	var msgScroll=$(".chat_top").scrollTop();
		            	var sendHeight=$(".chat_top .sended_msg:last").outerHeight()+20;
		            	msgScroll+=sendHeight;
		            	$(".chat_top").animate({scrollTop:msgScroll},0);
	            	}else{
	            		$(".chat_top").find(".loader img").attr("src","/web-bin/resources/images/sendError.png");
	            		var msgScroll=$(".chat_top").scrollTop();
	    	            var sendHeight=$(".chat_top .sended_msg:last").outerHeight()+20;
	                	msgScroll+=sendHeight;
	                	$(".chat_top").animate({scrollTop:msgScroll},0);
	                	art.dialog({
			            	content:data.msg,
			                icon: 'error',
			                time: 1.5
			            });
	            	}
	            },
	            error: function(){
	            	$(".chat_top").find(".loader img").attr("src","/web-bin/resources/images/sendError.png");
            		var msgScroll=$(".chat_top").scrollTop();
    	            var sendHeight=$(".chat_top .sended_msg:last").outerHeight()+20;
                	msgScroll+=sendHeight;
                	$(".chat_top").animate({scrollTop:msgScroll},0);
	            }
	        });
			$("#user_input").html("");
        }else if(str){
        	// 表情发送
         /*   $.ajax({
                on: true,
                type:"post",
                url: localhostUrl+'/web-bin/p/followup/chat/query_sendText_data?usId='+usId+'&accessToken='+accessToken+'&hugId='+hugId+'&targetHugId='+targetHugId+'&content='+str+'&chatType=1',
                dataType:"json",
                beforeSend:function(){
                    if(myHead=="undefined"){
                        $(".chat_top").append('<li><div class="send_head"><img src='+SERVER_URL+FILE_URL+myHead+'/></div><div class="sended_msg qq_face"><div class="send_triangle design_icon"></div><span>'+replace_em(str)+'</span></div><div class="loader"><img src="/web-bin/resources/images/loading_1.gif" width="20px"/></div></li>');
                    }else{
                        $(".chat_top").append('<li><div class="send_head design_icon"></div><div class="sended_msg qq_face"><div class="send_triangle design_icon"></div><span>'+replace_em(str)+'</span></div><div class="loader"><img src="/web-bin/resources/images/loading_1.gif" width="20px"/></div></li>');
                    }
                },
                success: function(data){
                    if(data.res==0){
                        $(".chat_top").find(".loader").remove();
                        if(myHead!="undefined"){
                            docMsgListSend.push({sender:KEY,msgSendContentFace:str,myHead:SERVER_URL+FILE_URL+myHead,time:data.time});
                        }else{
                            docMsgListSend.push({sender:KEY,msgSendContentFace:str,time:data.time});
                        }
                        localStorage['docMsgListSend'+hugId]=JSON.stringify(docMsgListSend);
                        var msgScroll=$(".chat_top").scrollTop();
                        var sendHeight=$(".chat_top .sended_msg:last").outerHeight()+20;
                        msgScroll+=sendHeight;
                        $(".chat_top").animate({scrollTop:msgScroll},0);
                    }else{
                        $(".chat_top").find(".loader img").attr("src","/web-bin/resources/images/sendError.png");
                        var msgScroll=$(".chat_top").scrollTop();
                        var sendHeight=$(".chat_top .sended_msg:last").outerHeight()+20;
                        msgScroll+=sendHeight;
                        $(".chat_top").animate({scrollTop:msgScroll},0);
                        if(myHead!="undefined"){
                            docMsgListSend.push({sender:KEY,msgSendContentFace:str,myHead:SERVER_URL+FILE_URL+myHead,time:data.time,error:1});
                        }else{
                            docMsgListSend.push({sender:KEY,msgSendContentFace:str,time:data.time,error:1});
                        }
                        localStorage['docMsgListSend'+hugId]=JSON.stringify(docMsgListSend);
                        art.dialog({
                            content:data.msg,
                            icon: 'error',
                            time: 1.5
                        });
                    }
                },
                error: function(){
                    $(".chat_top").find(".loader img").attr("src","/web-bin/resources/images/sendError.png");
                    var msgScroll=$(".chat_top").scrollTop();
                    var sendHeight=$(".chat_top .sended_msg:last").outerHeight()+20;
                    msgScroll+=sendHeight;
                    $(".chat_top").animate({scrollTop:msgScroll},0);
                    if(myHead!="undefined"){
                        docMsgListSend.push({sender:KEY,msgSendContentFace:str,myHead:SERVER_URL+FILE_URL+myHead,time:data.time,error:1});
                    }else{
                        docMsgListSend.push({sender:KEY,msgSendContentFace:str,time:data.time,error:1});
                    }
                    localStorage['docMsgListSend'+hugId]=JSON.stringify(docMsgListSend);
                }
            });
            $("#saytext").val("");
            $("#user_input").html("");*/
		}else if(usId==""){
        	art.dialog({
	        	content: "请选择好友发送！",
	            icon: 'error',
	            time: 1.5
       	    });
        }else{
           	art.dialog({
	        	content: "发送内容不能为空！",
	            icon: 'error',
	            time: 1.5
       	    });
        }
    });
    // 重新发送
    $(".chat_top").on("click",".loader",function(){
    	var loaderMsg=$(this);
		var inputContainError=$(this).siblings(".sended_msg").find("span").text();
		$.ajax({
            on: true,
            type:"post",
            url: localhostUrl+'/web-bin/p/followup/chat/query_sendText_data?usId='+usId+'&accessToken='+accessToken+'&hugId='+hugId+'&targetHugId='+targetHugId+'&content='+inputContainError+'&chatType=1',
            dataType:"json",
            beforeSend:function(){
            	loaderMsg.find("img").attr("src","/web-bin/resources/images/loading_1.gif");
            },
            success: function(data){
            	if(data.res==0){
            		loaderMsg.remove();
            	}else{
            		loaderMsg.find("img").attr("src","/web-bin/resources/images/sendError.png");
            	}
            },
            error: function(){
            	loaderMsg.find("img").attr("src","/web-bin/resources/images/sendError.png");
            }
		});
	});
    $(document).keydown(function(event){
    	if($(".active_send_choosen span").text()=='按Enter发送'){
			if(event.keyCode==13){
				$(".send_btn").click();
			}
    	}else{
    		if(event.ctrlKey&&event.keyCode == 13){
				$(".send_btn").click();
			}
    	}
    });
    //清空未读消息
    $.ajax({
        on: true,
        type: "post",
        url: localhostUrl  + '/web-bin/p/followup/chat/query_doing_data?accessToken=' + accessToken + '&usId=' + usId + '&hugId='+hugId+'&targetHugId='+targetHugId,
        dataType: "json",
        success: function (data) {
            console.log(data)
        }
    });
    function msgShow() {
        var newResult=[];
        $.ajax({
            on: true,
            type: "post",
            url: localhostUrl  + '/web-bin/p/followup/chat/query_msg_data?accessToken=' + accessToken + '&usId=' + usId + '&hugId='+hugId+'&targetHugId='+targetHugId+'&pageNumber='+pagenumber+'&pageSize='+size,
            dataType: "json",
            success: function (data) {
                console.log(data)
                if(data.res==0){
                    $.each(data.data.result,function(i,item){
                        if(item.hugId==hugId){
                            item.type=0
                        }else{
                            item.type=1
                        }
                        item.msgDomain=JSON.parse(item.msgDomain);
                        newResult.unshift(item)
                    });
                    $(".chat_top").setTemplateElement("session_template_msgList").processTemplate(newResult);
                    $(".chat_top .img_box").find("img").each(function(){
                        var idSrc=$(this).siblings(".id_src").val();
                        $(this).prop("src",SERVER_URL+FILE_URL+idSrc)
                    });
                    $(".chat_top .audio_controller").find("audio").each(function(){
                        var idSrc=$(this).siblings(".id_src").val();
                        $(this).prop("src",SERVER_URL+FILE_URL+idSrc)
                    });
                    $(".chat_top .video_controller").find("video").each(function(){
                        var idSrc=$(this).siblings(".id_src").val();
                        $(this).prop("src",SERVER_URL+FILE_URL+idSrc)
                    });
                    if(head=="undefined"){
                        $(".chat_top").find(".receive_head").addClass("design_icon");
                    }else{
                        $(".chat_top").find(".receive_head").removeClass("design_icon").append('<img src='+head+' alt="">');
                    }
                    if(myHead=="undefined"){
                        $(".chat_top").find(".send_head").html("");
                    }else{
                        $(".chat_top").find(".send_head").removeClass("design_icon").append('<img src='+SERVER_URL+FILE_URL+myHead+' alt="">');
                    }
                    if($(".chat_top li:last").offset()){
                        var lastHeight=$(".chat_top li:last").offset().top;
                        $(".chat_top").animate({scrollTop:lastHeight});
                    }
                    // 查看更多消息
                    $(".chat_top").on("click",".show_more_box",function(){
                        pagenumber++;
                        $.ajax({
                            on: true,
                            type: "post",
                            url: localhostUrl  + '/web-bin/p/followup/chat/query_msg_data?accessToken=' + accessToken + '&usId=' + usId + '&hugId='+hugId+'&targetHugId='+targetHugId+'&pageNumber='+pagenumber+'&pageSize='+size,
                            dataType: "json",
                            success: function (data) {
                                if(data.res==0  && data.data.result.length!=0){
                                    $.each(data.data.result,function(i,item){
                                        if(item.hugId==hugId){
                                            item.type=0
                                        }else{
                                            item.type=1
                                        }
                                        item.msgDomain=JSON.parse(item.msgDomain);
                                        newResult.unshift(item)
                                    });
                                    $(".chat_top").html("").setTemplateElement("session_template_msgList").processTemplate(newResult);
                                    $(".chat_top .img_box").find("img").each(function(){
                                        var idSrc=$(this).siblings(".id_src").val();
                                        $(this).prop("src",SERVER_URL+FILE_URL+idSrc)
                                    });
                                    $(".chat_top .audio_controller").find("audio").each(function(){
                                        var idSrc=$(this).siblings(".id_src").val();
                                        $(this).prop("src",SERVER_URL+FILE_URL+idSrc)
                                    });
                                    $(".chat_top .video_controller").find("video").each(function(){
                                        var idSrc=$(this).siblings(".id_src").val();
                                        $(this).prop("src",SERVER_URL+FILE_URL+idSrc)
                                    });
                                    if(head=="undefined"){
                                        $(".chat_top").find(".receive_head").addClass("design_icon");
                                    }else{
                                        $(".chat_top").find(".receive_head").removeClass("design_icon").append('<img src='+head+' alt="">');
                                    }
                                    if(myHead=="undefined"){
                                        $(".chat_top").find(".send_head").html("");
                                    }else{
                                        $(".chat_top").find(".send_head").removeClass("design_icon").append('<img src='+SERVER_URL+FILE_URL+myHead+' alt="">');
                                    }
                                }else if(data.data.result.length==0){
                                    art.dialog({
                                        content: "无更多消息记录！",
                                        icon: 'error',
                                        time: 1.5
                                    });
                                }
                            }
                        });
                    });
                }
            }
        });
    }
    msgShow();
	// 发送模式选择以及修改以及删除好友
    $(document).on("click",function(e){
        var event=e.srcElement||e.target;
        if($(event).hasClass("send_choosen")){
            $(".send_code").addClass("active_send_code");
        }else if($(event).hasClass("delete_arrow")){
            $(".revise_box").show();
        }else{
            $(".send_code").removeClass("active_send_code");
            $(".revise_box").hide();
        }
    });
    $(".revise_box").on("click","li",function(){
        $(".revise_box li").removeClass("active_text");
        $(this).addClass("active_text");
    });
    $(".send_code").on("click","li",function(){
        $(".active_send_choosen").removeClass("active_send_choosen");
        $(this).addClass("active_send_choosen");
    });
    // 图片处理
    $(".chat_top").on("click",".img_box img",function(e){
    	$(this).viewer();
    });
    // 修改备注
    $(".revise_remark").click(function(){
        art.dialog.open(localhostUrl+'/web-bin/p/followup/chat/to_revise_page?accessToken='+accessToken+'&usId='+usId+'&friendId='+friendId+'&key='+KEY,{
            width : 300,
            height :157,
            lock : true,
            resize : false,
            title : '修改备注'
        });
    });
    var docMsgList=sessionStorage['docMsgList'+hugId]?JSON.parse(sessionStorage['docMsgList'+hugId]):[];
    // 删除好友
    $(".delete_friend").click(function(){
        artDialog.confirm("确认删除该同行好友吗？",function(){
     			$.ajax({
     		        type: "POST",
     		        url:localhostUrl+'/web-bin/p/followup/chat/query_deleteFriend_data?accessToken='+accessToken+'&usId='+usId+'&friendId='+friendId,
     		        dataType:"json",
     		        cache: false,
     		        beforeSend:function(XMLHttpRequest){
     		        	status=false;
     		        },
     		        success: function(msg){
     		        	if(msg.res==0){
     		        	    art.dialog({
     			            	content: "操作成功！",
     			                icon: 'succeed',
     			                time: 1.5
     		        	    });
	 		        	    parent.$(".doctor_group_list li").each(function(index){
	 		        	    	var $liDelete=parent.$(".doctor_group_list li");
		 		        		if($liDelete.eq(index).attr("data-hugid")==targetHugId){
		 		        			$liDelete.eq(index).remove();
		 		        		}
	 		        	    });
	 		        	    parent.$(".doc_msg_list li").each(function(index){
	 		        	    	var $liDelete=parent.$(".doc_msg_list li");
		 		        		if($liDelete.eq(index).attr("data-hugid")==targetHugId){
		 		        			$liDelete.eq(index).remove();
		 		        		}
			        	    });
 		        	   var docMsgList=sessionStorage['docMsgList'+hugId]?JSON.parse(sessionStorage['docMsgList'+hugId]):[];
 		        	    for(var i=0;i<docMsgList.length;i++){
 		        	    	if(docMsgList[i].sender==KEY){
 		        	    		docMsgList.splice(i,1);
                                sessionStorage['docMsgList'+hugId]=JSON.stringify(docMsgList);
 		        	    	}
 		        	    }
     					}else{
     					    art.dialog({
     			            	content: "操作失败！",
     			                icon: 'error',
     			                time: 1.5
     			            });
     					}
     		        	status="true";
     		        	setTimeout(function(){
     		        		location.href = localhostUrl+'/web-bin/interview/followup/chat/doctorChat.html';
     		        	},2000);
     		        },
     		        error:function(msg){
     		        	art.dialog({
     		            	content: "操作失败！",
     		                icon: 'error',
     		                time: 1.5
     		            });
     		        	status="true";
     		        }
     		    });
        });
    });
});
/*
function replace_em(str){
    str = str.replace(/\</g,'&lt;');
    str = str.replace(/\>/g,'&gt;');
    str = str.replace(/\n/g,'<br/>');
    str = str.replace(/\[em_([0-9]*)\]/g,'<img src="/web-bin/interview/followup/chat/arclist/$1.gif" border="0" />');
    return str;
}*/
