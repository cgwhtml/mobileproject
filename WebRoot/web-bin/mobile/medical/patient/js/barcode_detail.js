var query=window.location.search;
var datas=query.split("?")[1];
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;

$(function(){
	datas=decodeURIComponent(datas,"UTF-8");
	var data = JSON.parse(datas); 
	data&&(data.hideTop==0)&&($("#top").show(),$("#main_head").css({"top":"60px"}),$("#main_body").css({"margin-top":"115px"}));
	$("#top_in").find("div").bind("click",function(){
		location.href = LOCALHOST_URL+'/web-bin/m/medical/patient/to_hosp_case_page'+data.url;
	});
	
	if(data){
		$("#p0").html(data.name);
		$("#sp1").html(data.sex);
		$(".s1").setTemplateElement("Template-List3").processTemplate(data);
		$(".bcTarget").JsBarcode(data.barCode);
	}else{
         $(".main_body").html("暂无数据");
		
	}
	
});