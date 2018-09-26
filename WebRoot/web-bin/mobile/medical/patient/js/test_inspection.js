var query=window.location.search;
var datas=query.split("?")[1];
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;

$(function(){
	datas=decodeURIComponent(datas,"UTF-8");
	var data = JSON.parse(datas); 
	data&&(data.hideTop==0)&&($("#top").show(),$("#main_head").css({"top":"60px"}),$("#main_body").css({"margin-top":"115px"}));
	$("#top_in").find("div").bind("click",function(){
		location.href = LOCALHOST_URL+'/web-bin/m/medical/patient/to_test_case_page'+data.url;
	});
	
	if(data.result!=null){
		$("#p0").html(data.name+"检查明细");
		if(data.result.length>0){
			$(".s1").setTemplateElement("Template-testInsp").processTemplate(data.result);
			$("tr:gt(0)").each(function(i){
				if(data.result[i].normalFlag!=""){
					$(this).find(".result").css("color","#f00");
				}
			});
		}
	}else{
		alert ("暂无数据"); 
	}
	
});