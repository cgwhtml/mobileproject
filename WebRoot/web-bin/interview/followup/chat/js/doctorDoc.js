$(window).resize(function(){
	change();
});
function change(){
    var paddingWidth=parseInt($(".wrapper").css('padding-left'));
	$(".chat_box").width($(window).width()-240-2*paddingWidth);
}
$(function(){
	change();
    var SERVER_URL=window.HUGPAGE_CONFIG.SERVER_URL;//读取图片服务器路径
    var FILE_URL=window.HUGPAGE_CONFIG.FILE_URL;//读取图片文件路径
    var hugId=window.hugId;
    var docMsgList=sessionStorage['docMsgList'+hugId]?JSON.parse(sessionStorage['docMsgList'+hugId]):[];
    $(".doc_msg_list").height($(".doctor_contain").height()-72);
    $(".doctor_manage").height($(".doctor_contain").height()-72);
	$(".doctor_group_list").height($(".doctor_manage").height()-38);
    $("#mainFrame").attr("src","/web-bin/interview/followup/chat/noChat.html");
    // 滚动条
	$(".chat_top").niceScroll({
		railpadding: {top:0, right: -1, left: 0, bottom:0},
		cursoropacitymin: 0.4,
		cursoropacitymax: 0.4,
		cursorcolor:"#515153",
		zindex: "99",
		cursorwidth: "6px"
	});
	$("#user_input").niceScroll({
		cursoropacitymin: 0,
		cursoropacitymax: 0
	});
	$(".doc_msg_list,.doctor_group_list").niceScroll({
		railpadding: { top:0, right: 0, left: 0, bottom:0 },
		cursoropacitymin: 0.4,
		cursoropacitymax: 0.4,
		cursorcolor:"#515153",
		zindex: "99",
		cursorwidth: "6px"
	});
    // 输入框
    $(".s_input").inputer({
        css:{"width":"149px"},
        callback:function(){
            return false;
        }
    });
    // 好友列表
    $(".doc_choosen_model").on("click","li",function(){
        $(".doc_choosen_model").siblings().hide();
        $(".active_model").removeClass("active_model");
        $(this).addClass("active_model");
        var $class=$(this).attr("data-role");
        $('.'+$class).show();
    });
    $(".doc_choosen_model li:first").click();
	for(var i=0;i<docMsgList.length;i++){
		if(docMsgList[i].number!=0){
			$(".doctor_spot").css({display:"block"});
		}
	}
    // 医医聊天信息列表数据
    $(".doc_msg_list").html("").setTemplateElement("doc_template_msgList").processTemplate(docMsgList);
    for(var i=0;i<docMsgList.length;i++){
        if(docMsgList[i].head){
            $(".friend_head").eq(i).children(".icon_head").html('<img src='+SERVER_URL+FILE_URL+docMsgList[i].head+'/>');
        }else{
            $(".friend_head_item").eq(i).children(".icon_head").html('');
        }
    }
    var msgarr=[];
    var friendIdarr=[];
    // 将发来的消息与好友的friendId匹配
    $(".doc_msg_list li").each(function(index){
    	var $li=$(this);
    	msgarr.push($li.attr("data-hugid"));
    });
    $(".doctor_group_list li").each(function(index){
    	var $li=$(this);
    	friendIdarr.push($li.attr("data-hugid"));
    });
    for(var i=0;i<msgarr.length;i++){
    	for(var j=0;j<friendIdarr.length;j++){
    		if(msgarr[i]==friendIdarr[j]){
    			var friendMsgId=$(".doctor_group_list li").eq(j).find(".friend_id").val();
              $(".doc_msg_list li").eq(i).find(".msg_id").val(friendMsgId);
    		}
    	}
    }
	// 点击消息模块，重新渲染消息列表
	$(document).on("click",".doc_choosen_model li:first",function(){
		docMsgList=sessionStorage['docMsgList'+hugId]?JSON.parse(sessionStorage['docMsgList'+hugId]):[];
		$(".doc_msg_list").setTemplateElement("doc_template_msgList").processTemplate(docMsgList);
	    for(var i=0;i<docMsgList.length;i++){
	        if(docMsgList[i].head){
	            $(".friend_head").eq(i).children(".icon_head").html('<img src='+SERVER_URL+FILE_URL+docMsgList[i].head+'/>');
	        }else{
	            $(".friend_head_item").eq(i).children(".icon_head").html('');
	        }
	    }
        var msgarr=[];
        var friendIdarr=[];
        // 将发来的消息与好友的friendId匹配
	    $(".doc_msg_list li").each(function(index){
	    	var $li=$(this);
	    	msgarr.push($li.attr("data-hugid"));
	    });
	    $(".doctor_group_list li").each(function(index){
	    	var $li=$(this);
	    	friendIdarr.push($li.attr("data-hugid"));
	    });
	    for(var i=0;i<msgarr.length;i++){
	    	for(var j=0;j<friendIdarr.length;j++){
	    		if(msgarr[i]==friendIdarr[j]){
	    			var friendMsgId=$(".doctor_group_list li").eq(j).find(".friend_id").val();
	              $(".doc_msg_list li").eq(i).find(".msg_id").val(friendMsgId);
	    		}
	    	}
	    }
	});
    // 添加以及好友请求
    $(document).on("click",function(e){
        var event=e.srcElement||e.target;
        if($(event).hasClass("add_friend") || $(event).hasClass("add_icon")){
            $(".friend_box").show();
        }else{
            $(".friend_box").hide();
        }
    });
    $(".friend_box").on("click","li",function(){
        $(".friend_box li").removeClass("active_text_friend");
        $(this).addClass("active_text_friend");
    });
    
});