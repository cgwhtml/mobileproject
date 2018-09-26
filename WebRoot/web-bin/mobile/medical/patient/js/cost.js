var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query=getRequest();//方法在config配置文件中
console.log(decodeURI(query.name));

$(function(){
	query&&(query.hideTop==0)&&($("#top").show(),$("#main_head").css({"top":"60px"}),$("#main_body").css({"margin-top":"120px"}));
	$("#pat").html('<span>'+decodeURIComponent(query.name)+'</span><span>'+decodeURIComponent(query.sex)+'</span>');
	if(query.medicalCategory != "undefined"){
		$("#pat").append('<span>'+decodeURIComponent(query.medicalCategory)+'</span>');
	}

	var url="?"+window.location.search.split("?")[1];
	console.log(url);
	var result="";
	if((window.location.search).indexOf("outhospFeeId=") != -1){
		result="outhospFeeId";
	}else if((window.location.search).indexOf("feeId=") != -1){
		result="feeId";
	}
	//门诊病历接入
	if(result=="outhospFeeId"){
		$("#top_in").find("div").bind("click",function(){
			location.href = LOCALHOST_URL+'/web-bin/m/medical/patient/to_visit_case_page'+url;
		});
		
		$.ajax({
            timeout:60000,
			on: true,
			type:"get",
			url: LOCALHOST_URL+'/web-bin/m/medical/patient/query_visit_cost_data?outhospFeeId='+query.outhospFeeId,
			dataType:"json",
            beforeSend:function(XMLHttpRequest){
                //加载中
                $(".s1").html('<div class="loading"><img class="loading_img" src="/web-bin/mobile/followup/followupTask/img/loading.gif"/></div>');
            },
			success: function(data){
				console.log(data);
				if(data.res==0&&data.data){
                    callBack_visit(data);
				}else{
					alert(data.msg);
				}
			},
            complete:function(){
                $(".s1 .loading").hide();
            }
		});
	}else if(result=="feeId"){   //住院病历接入
		
		$("#top_in").find("div").bind("click",function(){
			location.href = LOCALHOST_URL+'/web-bin/m/medical/patient/to_hosp_case_page'+url;
		});
		
		$.ajax({
			async:false,
			on: true,
			type:"post",
			url: LOCALHOST_URL+'/web-bin/m/medical/patient/query_hosp_cost_data?id='+query.feeId,
			dataType:"json",
            beforeSend:function(XMLHttpRequest){
                //加载中
                $(".s1").html('<div class="loading"><img class="loading_img" src="/web-bin/mobile/followup/followupTask/img/loading.gif"/></div>');
            },
			success: function(data){
				callBack_hosp(data);
			},
            complete:function(){
                $(".s1 .loading").hide();
            }
		});
		
	}
	
	$(".index").hide();
});


function callBack_visit(data){

	if(data.data){
		$(".s1").setTemplateElement("Template-List1").processTemplate(data.data);
		$(".c2").hide();
		var sum=0;
		$(".c2").each(function(){

			if($(".s1").find("#"+data.data[sum].feeCategCode).length>0){
				var old_money=($("#"+data.data[sum].feeCategCode).find(".total_money").text()-0);
				var new_money=($(this).find(".total_money").text()-0);
				var total_money=old_money+new_money;
				$("#"+data.data[sum].feeCategCode).find(".total_money").text(total_money);
				$(this).remove();
			}else{
				$(this).attr("id",data.data[sum].feeCategCode);
				$(this).show();
			}
			sum++;
		});

		if(data.data){
			var arr=data.data;
			var t={};
			for(var i=0;i<arr.length;i++){
				var n=arr[i].feeCategName;
				if(t[n]){
					t[n].push(arr[i]);
				}else{
					t[n]=[];
					t[n].push(arr[i]);
				}
			}
		}

		//跳转费用明细
		$(".c2").bind("click",function(){
			var name=$(this).find(".name").html();
			var result={
					name:name,
					url:window.location.search,
					record:t[name],
					hideTop:query.hideTop,

			}

			result=JSON.stringify(result);
			result="?"+encodeURIComponent(result);

			location.href= LOCALHOST_URL+'/web-bin/m/medical/patient/to_cost_detail_page'+result;
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
	if(data && data.data){
		$(".s1").setTemplateElement("Template-List2").processTemplate(data.data);
		
		//跳转住院费用明细
		$(".c2").bind("click",function(){
			var index=$(this).find(".name").html();
			var did=$(this).find("input").val();
			$.ajax({
				on: true,
				type:"get",
				url: LOCALHOST_URL+'/web-bin/m/medical/patient/query_hosp_cost_detail_data?id='+did,
				dataType:"json",
				success: function(datas){
					var result=datas.data;
					var record=[];
					for(var i=0;i<result.length;i++){
							var message={
								"chargeItemName":result[i].chargeItemName,
								"drugCatalogType":result[i].drugCatalogType,
								"drugAmount":result[i].drugAmount,
								"drugUnit":result[i].drugUnit,
								"totalMoney":result[i].totalPrice,
								"selfPercent":result[i].selfPercent,
							};
							
							record.push(message);
					}
		      
				var json={
					url:window.location.search,
					name:index,
					record:record,
					hideTop:query.hideTop,
				};
				json=JSON.stringify(json);
				json="?"+encodeURIComponent(json);
				location.href= LOCALHOST_URL+'/web-bin/m/medical/patient/to_cost_detail_page'+json;
			  }
			});
		});	
					

	}else if(data && data.res!=0){
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


