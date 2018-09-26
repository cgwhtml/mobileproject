var query=window.location.search;
var datas=query.split("?")[1];
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;

$(function(){
	datas=decodeURIComponent(datas,"UTF-8");
	var data = JSON.parse(datas);
	console.log(data);
	data&&(data.hideTop==0)&&($("#top").show(),$("#main_head").css({"top":"60px"}),$("#main_body").css({"padding-top":"115px"}));
	$("#top_in").find("div").bind("click",function(){
		location.href = LOCALHOST_URL+'/web-bin/m/medical/patient/to_hosp_case_page'+data.url;
	});
	
	var drEntrust=data.result.drEntrust==""?"无":data.result.drEntrust;
    
	$("#p0").text(data.result.drugName);
	$("#time").text(data.result.orderPlanBeginDate.substring(0,11)+" - "+data.result.orderPlanEndDate.substring(0,11));
	$("#p1").text(data.result.doseWayName);
	if($.trim(data.result.frequencyName)!=""){
		$("#p1").append(","+data.result.frequencyName);
	}
	if($.trim(data.result.oneDosage)!="" && $.trim(data.result.drugUnit)!=""){
		$("#p1").append("，每次 "+data.result.oneDosage+data.result.drugUnit);
		
	}
	if($.trim(data.result.drugSpe)!=""){
		$("#p2").text("总剂量："+data.result.drugSpe);
		
	}	
	$("#p3").text('数量：'+data.result.drugAmount+data.result.drugUnit);
	// $("#p4").text('单价（元）：'+data.result.drugUnitPrice);
	$("#p5").text(drEntrust);
	$("#p6").text(data.result.note);
	
	
});