var query=window.location.search;
var datas=query.split("?")[1];
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;

$(function(){
	datas=decodeURIComponent(datas,"UTF-8");
	var data = JSON.parse(datas); 
	
	$("#top_in").find("div").bind("click",function(){
		location.href = LOCALHOST_URL+'/web-bin/m/medical/angel/to_cost_page'+data.url;
	});
	
	if(data.record!=null){
		$("#p0").html(data.name+"费用明细");
		if(data.record.length>0){
			$(".s1").setTemplateElement("Template-List1").processTemplate(data.record);
			$("#d1").hide();
		}else{
			$("#p1").html("暂无数据");
			$("#t1").html("无");
			$("#t2").html("无");
			$("#t3").html("无");
			$("#t4").html("无");
		}
	}else{
		if(data.result.feeCategName!=null){
			$("#p0").html(data.result.feeCategName+"费用明细");
		}
		if(data.result.chargeItemName!=null){
			$("#p1").html(data.result.chargeItemName);
		}
		if(data.result.drugCatalogType!=null){
			$("#t1").html(data.result.drugCatalogType);
		}
		if(data.result.drugAmount!=null){
			$("#t2").html(data.result.drugAmount);
		}
		if(data.result.totalMoney!=null){
			$("#t3").html(data.result.totalMoney+"元");
		}
		if(data.result.selfPercent!=null){
			$("#t4").html(data.result.selfPercent);
		}
		
		
	}
	
});