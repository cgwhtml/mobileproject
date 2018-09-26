var query=window.location.search;
var datas=query.split("?")[1];
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;


$(function(){
	datas=decodeURIComponent(datas,"UTF-8");
	var data = JSON.parse(datas); 
	
	$("#top_in").find("div").bind("click",function(){
		location.href = LOCALHOST_URL+'/web-bin/m/medical/angel/to_visit_case_page'+data.url;
	});
	
	$("#p0").html(data.result.drugName);
	$("#p2").html(data.result.doseWayName+"，"+data.result.frequencyName+"，每次 "+data.result.oneDosage+data.result.oneDosageUnit);
	$("#p4").html("总剂量："+data.result.drugSpe);
	$("#p5").html('数量：'+data.result.drugAmount+data.result.drugUnit);
	$("#p6").html('单价（元）：'+data.result.drugUnitPrice);
	
	
});
