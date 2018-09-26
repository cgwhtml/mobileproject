$(function(){
	//ajax调用返回修改内容
    var localhostUrl=window.location.origin;
    var query=getRequest();//方法在config配置文件中
    if(query&&query.app==1){
    	$(".app_foot_download").hide(),$(".blank_div").height(40);
    }
	$.ajax({
        type:"post",
        url: localhostUrl+'/web-bin/m/nosen/followup/education/query_noSendEducation_data?id='+query.id+'&hugId='+query.hugId,
        success:function(data){
        	if(!(data.data&&data.data.id)){
        		$(".noFound").show();
        		return false;
        	}
        	$(".wrapper").show();
            document.title = data.data.title;
        	$(".form_head_title").html(data.data.title);
        	$(".form_head_desc").html(data.data.beginContent);
            initImage();
        },
        error:function () {
            return;
        }
    });
});