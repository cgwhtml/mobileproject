var query=window.location.search;
query=datas=decodeURIComponent(query,"UTF-8");
var datas=query.split("?")[1];
var result=datas.split("=")[0];
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;

$(function(){
	$("#pat").html(datas.split("name=")[1].split("&")[0]+'<span>'+datas.split("sex=")[1].split("&")[0]+'</span><span>'+datas.split("medicalCategory=")[1].split("&")[0]+'</span>');
	var url="?"+query.split("?")[2];
	
	//门诊病历接入
	if(result=="outhospFeeId"){
//		$("#top_in").find("div").bind("click",function(){
//			location.href ="/HugPage/web-bin/mobile/medical/hospital/visit_case.html"+url;
//		});
		
		$.ajax({
			async:false,
			on: true,
			type:"get",
			url: LOCALHOST_URL+'/web-bin/m/medical/hospital/query_visit_cost_data'+query,
			dataType:"json",
			success: function(data){
				callBack_visit(data);
			},
		});
	}else if(result=="feeId"){  //住院病历接入
//		$("#top_in").find("div").bind("click",function(){
//			location.href ="/HugPage/web-bin/mobile/medical/hospital/hosp_case.html"+url;
//		});
		$.ajax({
			async:false,
			on: true,
			type:"get",
			url: LOCALHOST_URL+'/web-bin/m/medical/hospital/query_hosp_cost_data'+query,
			dataType:"json",
			success: function(data){
				console.log(data);
				callBack_hosp(data);
			},
		});
		
	}
	
	
	$(".index").hide();
});


function callBack_visit(data){
	if(data.data!=null){
		$(".s1").setTemplateElement("Template-List1").processTemplate(data.data.localFinish);
		
		//跳转费用明细
		$(".c2").bind("click",function(){
			var index=$(this).find(".index").html();
			var result={
					url:query,
					result:data.data.localFinish[index],
			}
			result=JSON.stringify(result);
			result="?"+encodeURIComponent(result);
			location.href= LOCALHOST_URL+'/web-bin/m/medical/hospital/to_cost_detail_page'+result;
		});	
	}else if(data.res!=0){
		$(".s1").html(
			'<div class="c2">'+
	    		'<p id="name">'+data.msg+'</p>'+
	    	'</div>'
		);
	}else{
		$(".s1").html(
			'<div class="c2">'+
	    		'<p id="name">没有数据</p>'+
	    	'</div>'
		);
	}
	
};

function callBack_hosp(data){
	if(data!=null && data.data!=null){
		$(".s1").setTemplateElement("Template-List2").processTemplate(data.data.feeBalances);
		
		//二次加载数据并跳转费用明细
		$.ajax({
			on: true,
			type:"get",
			url: LOCALHOST_URL+'/web-bin/m/medical/hospital/query_hosp_cost_detail_data'+query,
			dataType:"json",
			success: function(datas){
				console.log(datas);
				$(".c2").bind("click",function(){
					
					var index=$(this).find(".name").html();
					alert(index);
					var result=datas.data.feeDetails;
					var record=[];
					for(var i=0;i<result.length;i++){
						if(result[i].feeChargeName==index){
							var message={
								"chargeItemName":result[i].chargeItemName,
								"drugCatalogType":result[i].drugCatalogType,
								"drugAmount":result[i].drugAmount,
								"drugUnit":result[i].drugUnit,
								"totalPrice":result[i].totalPrice,
								"selfPercent":result[i].selfPercent,
							};
							
							record.push(message);
						}
					}
					
					var json={
						url:query,
						name:$(this).find(".name").html(),
						record:record,
					};
					json=JSON.stringify(json);
					json="?"+encodeURIComponent(json);
					location.href= LOCALHOST_URL+'/web-bin/m/medical/hospital/to_cost_detail_page'+json;
				});	
				
			},
		});
	}else if(data!=null && data.res!=0){
		$(".s1").html(
				'<div class="c2">'+
		    		'<p id="name">'+data.msg+'</p>'+
		    	'</div>'
			);
	}else{
		$(".s1").html(
			'<div class="c2">'+
	    		'<p id="name">没有数据</p>'+
	    	'</div>'
		);
	}
	
	
	
}


