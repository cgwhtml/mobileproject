var query=window.location.search;
var datas=query.split("?")[1];
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;

$(function(){
	datas=decodeURIComponent(datas,"UTF-8");
	var data = JSON.parse(datas); 
	data&&(data.hideTop==0)&&($("#top").show(),$("#main_head").css({"top":"60px"}),$("#main_body").css({"margin-top":"115px"}));
	$("#top_in").find("div").bind("click",function(){
		location.href = LOCALHOST_URL+'/web-bin/m/medical/patient/to_cost_page'+data.url;
	});
	
	if(data.record!=null){
		$("#p0").html(data.name+"费用明细");
		if(data.record.length>0){
			$(".s1").setTemplateElement("Template-List1").processTemplate(data.record);
			$("#d1").hide();
		}else{
			$("#p1").text("暂无数据");
			$("#t1,t2,t3,t4").text("无");
		}
	}else{
		if(data.result.feeCategName){
			$("#p0").text(data.result.feeCategName+"费用明细");
		}
		if(data.result.chargeItemName){
			$("#p1").text(data.result.chargeItemName);
		}
		if(data.result.drugCatalogType){
			$("#t1").text(data.result.drugCatalogType);
		}
		if(data.result.drugAmount){
			$("#t2").text(data.result.drugAmount);
		}
		if(data.result.totalMoney){
			$("#t3").text(data.result.totalMoney+"元");
		}
		if(data.result.selfPercent){
			$("#t4").text(data.result.selfPercent);
		}
		
		
	}
	
});