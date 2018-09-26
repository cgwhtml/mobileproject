var query=window.location.search;
var datas=query.split("?")[1];
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;

$(function(){
	datas=decodeURIComponent(datas,"UTF-8");
	var data = JSON.parse(datas);
	data&&(data.hideTop==0)&&($("#top").show(),$("#main_head").css({"top":"60px"}),$("#main_body").css({"padding-top":"115px"}));
	$("#top_in").find("div").bind("click",function(){
		location.href = LOCALHOST_URL+"/web-bin/m/medical/patient/to_visit_case_page"+data.url;
	});
	
	$("#p0").text(data.result.drugName);
	var usedetailStr="";
	if(data.result.doseWayName){
        usedetailStr+=data.result.doseWayName;
	}
    if(data.result.frequencyName){
		if(data.result.doseWayName){
            usedetailStr+=','+data.result.frequencyName;
		}else{
            usedetailStr+=data.result.frequencyName;
		}
    }
    if(data.result.drugUseOneDosage){
        if(data.result.doseWayName || data.result.frequencyName){
            usedetailStr+=','+data.result.drugUseOneDosage+data.result.drugUseOneDosageUnit;
        }else{
            usedetailStr+=data.result.drugAmount+data.result.drugUnit;
        }
    }
    $("#p2").html(usedetailStr)
    i/*f($.trim(data.result.frequencyName)!=""){
		$("#p2").append(","+data.result.frequencyName);
	}
	if($.trim(data.result.oneDosage)!="" && $.trim(data.result.drugUnit)!=""){
		$("#p2").append("，每次 "+data.result.oneDosage+data.result.drugUnit);
		
	}*/
	if($.trim(data.result.drugSpe)!=""){
		$("#p4").text("总剂量："+data.result.drugSpe);
	}
	
	$("#p5").text('数量：'+data.result.drugAmount+data.result.drugUnit);
	// $("#p6").text('单价（元）：'+data.result.drugUnitPrice);
	
	
});
