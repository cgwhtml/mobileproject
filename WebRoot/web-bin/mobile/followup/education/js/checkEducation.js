$(function(){
	//ajax调用返回修改内容
    var localhostUrl=window.location.origin;//window.HUGPAGE_CONFIG.localhostUrl;
    var id=window.location.pathname.split("/").pop();
    var query=getRequest();//方法在config配置文件中
    if(query&&query.app==1){
    	$(".app_foot_download").hide(),$(".blank_div").height(40);
    }
	$.ajax({
        type:"post",
        url: localhostUrl+'/web-bin/m/nosen/followup/education/query_education_data?id='+id+"&isDoc="+query.isDoc,
        success:function(data){
        	if(!(data&&data.data&&data.data.id)){
        		$(".noFound").show();
        		return false;
        	}
            noAdvertData[data.data.hospCode]&&($(".app_foot_download").hide(),$(".blank_div").height(40));
            imageConfigData[data.data.hospCode]&&($(".advert_img img").attr("src","/web-bin/resources/hospConfig/images/"+imageConfigData[data.data.hospCode]));
        	$(".wrapper").show();
            document.title = data.data.title;
        	$(".hospName").text(data.data.hospName);
        	if(data.data.hospCode=="47000327-3"){//省妇保
                $(".form_head_title").html(data.data.patName+"—"+data.data.title);
            }else{
                $(".form_head_title").html(data.data.title);
            }
            var questionnaire=data.data.questionnaire.replace(/":"/g,"':'").replace(/":/g,"':").replace(/","/g,"','").replace(/,"/g,",'").replace(/{"/g,"{'").replace(/"}/g,"'}");
            try{
                questionnaire=eval('(' + questionnaire + ')');
                $(".form_head_desc").html(questionnaire && questionnaire.beginContent);
            }catch (e){
                var index=data.data.questionnaire.indexOf("\"beginContent\":");
                index >0 && (questionnaire=data.data.questionnaire.substring(index+16,data.data.questionnaire.length-2));
                $(".form_head_desc").html(questionnaire);
            }
            initImage();
        },
        error:function () {
            return;
        }
    });
});