/*
 	* Created by cgw
 	* Created time 2017.3.20
	* Description 药品详情页js
*/
var name;
$(function(){
	var query=window.location.search;
	query=decodeURIComponent(query,"UTF-8");
	var LOCALHOST_URL=window.location.origin;
	var PORT=window.HUGPAGE_CONFIG.PORT;
	if(query.split("?name=")[1]){
		 name=query.split("?name=")[1].split("&")[0];
	}
	var type=query.split("&type=")[1];
	var hospCode=query.split("?hospCode=")[1];
	if(hospCode){
		$.ajax({
			on: false,
			type:"post",
			url: LOCALHOST_URL+'/web-bin/m/nosen/repository/hospital/query_hosMsgCode_data?hospCode='+hospCode,
			dataType:"json",
			success: function(data){
				name=data.data[0].name;
				if(data.data){
					// 医院名称
					var code=data.data[0];
					$(".drug_title").html(code.name);
					// 医院科室
					$(".component").html(code.component);
					//药品类型
					if(type){
						$(".sub").html(type);
					}else{
						$(".sub").hide();
					}
					// 描述
					$(".component").html(code.hospitalIntroduce);
					//医院特色
					$(".indication").html(code.hospitalSpecial);
					//特色科室
					$(".contraindications").html(code.hospitalSpecialdepar);
					//医院荣誉
					$(".dosage").html(code.hospitalHonor);
					//地址
					$(".precautions").html(data.data.hospitalLocation);
				}
			}
		});
	}
	$.ajax({
		on: true,
		type:"post",
		beforeSend:function(){
			$("section").append('<div class="loaders"><img src="/web-bin/mobile/repository/drug/images/loading_2.gif"/><div>');
		},
		url: LOCALHOST_URL+'/web-bin/m/nosen/repository/hospital/query_hosMsg_data?name='+name,
		dataType:"json",
		success: function(data){
			$(".loaders").remove();
			if(data.data){
				// 医院名称
				$(".drug_title").html(data.data.name);
				// 医院科室
				$(".component").html(data.data.component);
				//药品类型
				if(type){
					$(".sub").html(type);
				}else{
					$(".sub").hide();
				}
				// 描述
				$(".component").html(data.data.hospitalIntroduce);
				//医院特色
				$(".indication").html(data.data.hospitalSpecial);
				//特色科室
				$(".contraindications").html(data.data.hospitalSpecialdepar);
				//医院荣誉
				$(".dosage").html(data.data.hospitalHonor);
				//地址
				$(".precautions").html(data.data.hospitalLocation);
			}
		}
	});
	$(".drugItem").tap(function(){
		var $item=$(this);
		$item.children(".arrow").toggleClass("activeJian");
		$item.siblings(".detail").toggleClass("hiddenDetail");
	});
});	