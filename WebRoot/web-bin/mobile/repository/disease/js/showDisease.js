/*
 	* Created by cgw
 	* Created time 2017.3.20
	* Description 药品详情页js
*/
$(function(){
	var query=window.location.search;
	query=decodeURIComponent(query,"UTF-8");
	var LOCALHOST_URL=window.location.origin;
	var PORT=window.HUGPAGE_CONFIG.PORT;
	var id=query.split("?id=")[1];
	$.ajax({
		on: true,
		type:"post",
		beforeSend:function(){
			$("section").append('<div class="loaders"><img src="/web-bin/mobile/repository/drug/images/loading_2.gif"/><div>');
		},
		url: LOCALHOST_URL+'/web-bin/m/nosen/repository/disease/query_diseaseMsg_data?id='+id,
		dataType:"json",
		success: function(data){
			$(".loaders").remove();
			$(".drug_title").html(data.data.title);
			//疾病介绍
			$(".component").html(data.data.introduction);
			//疾病科室
			$(".sub").html(data.data.deptname);
			//临床表现
			$(".symptomDescription").html(data.data.symptomDescription);
			//检查
			$(".checking").html(data.data.checking);
			//治疗
			$(".treatment").html(data.data.treatment);
			//预防
			$(".precautions").html(data.data.prevention);
		}
	});
	$(".drugItem").tap(function(){
		var $item=$(this);
		$item.children(".arrow").toggleClass("activeJian");
		$item.siblings(".detail").toggleClass("hiddenDetail");
	});
});	