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
		url: LOCALHOST_URL+'/web-bin/m/nosen/repository/drug/query_drugMsg_data?id='+id,
		dataType:"json",
		success: function(data){
			$(".loaders").remove();
			//药品标题
			$(".drug_title").html(data.data.title);
			//药品具体名字
			$(".component").html(data.data.component);
			//药品类型
			$(".sub").html(data.data.type);
			//禁忌
            $(".contraindications").html(data.data.contraindications);
			//药物剂量
            $(".dosage").html(data.data.dosage);
			//适应症
            $(".indication").html(data.data.indication);
			//注意事项
			$(".precautions").html(data.data.precautions);
			//不良反应
			$(".adverseReactions").html(data.data.adverseReactions);
		}
	});
	$(".drugItem").tap(function(){
		var $item=$(this);
		$item.children(".arrow").toggleClass("activeJian");
		$item.siblings(".detail").toggleClass("hiddenDetail");
	});
});	