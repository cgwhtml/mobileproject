var query=window.location.search;
var datas=query.split("?")[1];
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;

$(function(){
	datas=decodeURIComponent(datas,"UTF-8");
	var data = JSON.parse(datas); 
	
	$("#top_in").find("div").bind("click",function(){
		location.href = LOCALHOST_URL+'/web-bin/m/medical/hospital/to_hosp_case_page'+data.url;
	});
	
	$("#p0").html(data.result.surgeryOpenName);
	$("#p1").html(data.result.drugName);
	$("#p2").html('<span>'+data.result.surgeryBeginDate+'</span><span>'+data.result.surgeryEndDate+'</span>');
	$("#p3").html('手术医生：'+data.result.surgeryDrName);
	$("#p4").html('麻醉医生：'+data.result.anesDrName+'<span>麻醉方法：'+data.result.anesMethodName+'</span>');
	$("#p5").html('手术等级：'+data.result.surgeryLvName);
	$("#p6").html('切口愈合等级：'+data.result.whln);
	
});