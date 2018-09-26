var query=window.location.search;
var url=query.split("&url=")[1];
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query1=getRequest();//方法在config配置文件中

$(function(){
	query1&&(query1.hideTop==0)&&($("#top").show(),$("#main_head").css({"top":"60px"}),$("#main_body").css({"padding-top":"115spx"}));
	if(/visit/.test(url)){
		$("#top_in").find("div").bind("click",function(){
			location.href = LOCALHOST_URL+'/web-bin/m/medical/patient/to_visit_case_page?'+url.split("?")[1];
		});
	}else{
		$("#top_in").find("div").bind("click",function(){
			location.href = LOCALHOST_URL+'/web-bin/m/medical/patient/to_hosp_case_page?'+url.split("?")[1];
		});
	}
	
	
	$.ajax({
		async:false,
		on: true,
		type:"post",
		url: LOCALHOST_URL+'/web-bin/m/medical/patient/query_examination_data?reqId='+query1.reqId,
		dataType:"json",
		success: function(data){
			callBack(data);
		}
	});
});

function callBack(data){
	if(data && data.data){
		if(data.data.examItemName){
			$("#p0").text('项目名称：'+data.data.examItemName);
		}
		$("#p1").text(data.data.examResult);
		$("#p2").text(data.data.examDesc);
		if(data.data.pictureWeb){
			$("#picUrl").show();
            $("#picUrl").click(function(){
				location.href=data.data.pictureWeb;
			})
		}
	}else if(data && data.res!=0){
        $("#main_body").html('<p style="text-align: center;margin: 10px auto;">'+data.msg+'</p>');
	}else{
        $("#main_body").html('<p style="text-align: center;margin: 10px auto;">暂无数据</p>');
	}
	
}