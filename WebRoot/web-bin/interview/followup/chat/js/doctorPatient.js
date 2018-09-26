function change(){
    var paddingWidth=parseInt($(".wrapper").css('padding-left'));
	$(".chat_box").width($(window).width()-240-2*paddingWidth);
}
$(function(){
	$(window).resize(function(){
		change();
	});
	change();
    var localhostUrl=window.location.origin;//window.HUGPAGE_CONFIG.localhostUrl;
	var PORT=window.HUGPAGE_CONFIG.PORT;//读取ajax的配置路径，读取url里的PORT
	var SERVER_URL=window.HUGPAGE_CONFIG.SERVER_URL;//读取图片服务器路径
	var FILE_URL=window.HUGPAGE_CONFIG.FILE_URL;//读取图片文件路径
	var hugId=window.hugId;
	var patId=window.patId;
	var patientMsgList=sessionStorage['patientMsgList'+hugId]?JSON.parse(sessionStorage['patientMsgList'+hugId]):[];
	$(".msg_list").height($(".doctor_contain").height()-72);
	$(".patient_manage,.fans_manage").height($(".patient_manage").height()-92);
	$(".patient_group_list").height($(".patient_manage").height()-38);
	$(".fans_group_list").height($(".fans_manage").height()-38);
	$("#mainFrame").attr("src","/web-bin/interview/followup/chat/noChat.html");
   // 滚动条
    $(".msg_list,.patient_group_list,.fans_group_list").niceScroll({
        railpadding: { top:0, right: 0, left: 0, bottom:0 },
        cursoropacitymin: 0.4,
        cursoropacitymax: 0.4,
        cursorcolor:"#515153",
        zindex: "99",
        cursorwidth: "6px"
    });
    // 输入框
    $(".s_input").inputer({
        css:{"width":"210px"},
        callback:function(){
            return false;
        }
    });
	for(var i=0;i<patientMsgList.length;i++){
		if(patientMsgList[i].number!=0){
			$(".patient_spot").show();
		}
	}
    // 切换消息，患者和粉丝
    $(".choosen_model").on("click","li",function(){
        $(".choosen_model").siblings().not(".chat_class_box").hide();
        $(".active_model").removeClass("active_model");
        $(this).addClass("active_model");
        var $class=$(this).attr("data-role");
        $('.'+$class).show();
    });
    $(".choosen_model li").first().click();
    $(".patient_group_list").on("click",".patient_group_item",function(){
        var $item=$(this);
        $(".active_item").removeClass("active_item");
        $item.addClass("active_item").siblings(".people_list").toggleClass("active_show");
        $item.find(".arrow").toggleClass("active_arrow");
    });
    // 医患信息列表数据
    $(".msg_list").html("").setTemplateElement("template_msgList").processTemplate(patientMsgList);
    for(var i=0;i<patientMsgList.length;i++){
        if(patientMsgList[i].head){
            $(".friend_head").eq(i).children(".icon_head").html('<img src='+SERVER_URL+FILE_URL+patientMsgList[i].head+'/>');
        }else{
            $(".friend_head_item").eq(i).children(".icon_head").html('');
        }
    }
    // 点击消息模块，重新渲染消息列表
    $(document).on("click",".choosen_model li:first",function(){
        patientMsgList=sessionStorage['patientMsgList'+hugId]?JSON.parse(sessionStorage['patientMsgList'+hugId]):[];
        $(".msg_list").setTemplateElement("template_msgList").processTemplate(patientMsgList);
        for(var i=0;i<patientMsgList.length;i++){
            if(patientMsgList[i].head){
                $(".friend_head").eq(i).children(".icon_head").html('<img src='+SERVER_URL+FILE_URL+patientMsgList[i].head+'/>');
            }else{
                $(".friend_head_item").eq(i).children(".icon_head").html('');
            }
        }
    });
    if(patId){
        $(".msg_list li").each(function(){
            if(patId==$(this).attr("data-hugid")){
                $(this).click();
            }
        });
    }
});