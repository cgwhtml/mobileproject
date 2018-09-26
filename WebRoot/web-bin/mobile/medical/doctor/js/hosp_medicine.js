var query=window.location.search;
var datas=query.split("?")[1];
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;

$(function(){
	datas=decodeURIComponent(datas,"UTF-8");
	var data = JSON.parse(datas); 
	
	$("#top_in").find("div").bind("click",function(){
		location.href = LOCALHOST_URL+'/web-bin/m/medical/doctor/to_hosp_case_page'+data.url;
	});
	
	var drEntrust=data.result.drEntrust==""?"无":data.result.drEntrust;
	
	$("#p0").html(data.result.drugName);
	$("#time").html(data.result.orderPlanBeginDate.substring(0,11)+" - "+data.result.orderPlanEndDate.substring(0,11));
	$("#p1").html(data.result.doseWayName+"，"+data.result.frequencyName+"，每次 "+data.result.oneDosage+data.result.oneDosageUnit);
	$("#p2").html("总剂量："+data.result.drugSpe);
	$("#p3").html('数量：'+data.result.drugAmount+data.result.drugUnit);
	$("#p4").html('单价（元）：'+data.result.drugUnitPrice);
	$("#p5").html(drEntrust);
	$("#p6").html(data.result.drugDesc);
	
	
});