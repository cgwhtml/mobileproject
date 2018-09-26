var query=window.location.search;
query=decodeURIComponent(query,"UTF-8");
var url=window.location;
var name=query.split("patName=")[1].split("&")[0];
var sex=query.split("sex=")[1].split("&")[0];
var hospName=query.split("hospName=")[1].split("&")[0];
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var back=query.split("&indexNoId=")[0];
console.log(query);
$(function(){
	
	$("#p1").html(name);
	$("#sp1").html(sex);
	$("#p2").html(hospName);
	
	if(sex=="（女）"){
		$("#photo").attr("src","/web-bin/resources/images/woman.png");
	}
	
	$("#main_body").hide();
	
	$.ajax({
		on: true,
		timeout:60000,
		type:"get",
		url: LOCALHOST_URL+'/web-bin/m/medical/doctor/query_hospList_data'+query,
		dataType:"json",
		success: function(data){
			$("#main_body").show();
			$("#loading").hide();
			callBack(data);
		},
	});
	
	$("#top_in").find("div").bind("click",function(){
		location.href = LOCALHOST_URL+'/web-bin/m/medical/doctor/to_medicalRecordList_page'+back;
	});
	
});

function callBack(data){
	
	if(data!=null && data.data!=null){
		
		//加载基本信息
		if(data.data.inhospRecord!=null){
			$("#sp2").html(data.data.inhospRecord.admitDate.substring(0,11)+'-'+data.data.inhospRecord.disChargeDate.substring(0,11));
			$("#p3").html(
				'<span id="sp3">【住院】</span>'+data.data.inhospRecord.deptName+'&nbsp;'+data.data.inhospRecord.attendDrName+'&nbsp;'+data.data.inhospRecord.admitDiagName
			);
			$("#i1").html(
					"<p>患者姓名："+data.data.inhospRecord.patName+"</p>"+
					"<p>出生日期："+data.data.inhospRecord.birthDate.substring(0,11)+"</p>"+
					"<p>主治医生："+data.data.inhospRecord.attendDrName+"</p>"+
					"<p>入院科室："+data.data.inhospRecord.deptName+"</p>"+
					"<p>住院病区："+data.data.inhospRecord.wardName+"</p>"+
					"<p>病床号："+data.data.inhospRecord.sickRoomNo+"</p>"+
					"<p>出院诊断："+data.data.inhospRecord.disChargeDiagName+"</p>"
			);
			$("#i1").find("p").each(function(){
				if($(this).html().split("：")[1]==""){
					$(this).hide();
				}
			});
			
		}else{
			$("#message").hide();
		}
		
		
		
		//加载费用以及其跳转
		/*
		if(data.data.inhospFee!=null){
			var medicalFee=data.data.inhospFee.medicalFee==""?0:data.data.inhospFee.medicalFee;
			var selfPaymentFee=data.data.inhospFee.selfPaymentFee==""?0:data.data.inhospFee.selfPaymentFee;
			var reduceFee=data.data.inhospFee.reduceFee==""?0:data.data.inhospFee.reduceFee;
			$("#toCost").html(
				'<p id="p4">医保类别：'+data.data.inhospFee.medicalCategory+'<img src="/HugPage/web-bin/mobile/medical/doctor/images/blue.png"></p>'+
				'<div id="cost">'+
					'<img alt="" src="/HugPage/web-bin/mobile/medical/doctor/images/cost.png">'+
					'<div>'+
						'<p>总费用</p>'+
						'<p>'+data.data.inhospFee.medicalTotalFee+'</p>'+
					'</div>'+
					'<div>'+
						'<p>医保报销费用：'+medicalFee+'元</p>'+
						'<p>个人现金支付：'+selfPaymentFee+'元</p>'+
						'<p>医院优惠费用：'+reduceFee+'元</p>'+
					'</div>'+
				'</div>'
			);
			
			$("#toCost").bind("click",function(){
				var medicalCategory=data.data.inhospFee.medicalCategory;
				var name=$("#p1").html();
				var sex=$("#sp1").html();
				var id=data.data.inhospFee.id;
				var result="?feeId="+id+"&name="+name+"&sex="+sex+"&medicalCategory="+medicalCategory+"&url="+query;
				location.href ="/HugPage/web-bin/mobile/medical/doctor/cost.html"+result;
			});	
			
			$(".fee").hide();
		}else{
			$(".fee").hide();
		}
		*/
		
		
		
		
		//加载医嘱用药以及其跳转
		if(data.data.orders!=null && data.data.orders.length!=0){
			$(".s1").setTemplateElement("Template-List1").processTemplate(data.data.orders);
			
			$(".toMedicine").bind("click",function(){
				
				var name=$(this).find("#p1").html();
				var sex=$(this).find("#sp1").html();
				
				var index=$(this).find("#index").text()-1;
				var result={
					url:query,
					sex:sex,
					name:name,
					result:data.data.orders[index],
				};
				var data1=JSON.stringify(result);
				data1="?"+encodeURIComponent(data1);
				
				location.href = LOCALHOST_URL+'/web-bin/m/medical/doctor/to_hosp_medicine_page'+data1;
			});	
			
		}else{
			$("#orders").hide();
		}
		
		
		
		
		//加载手术信息以及其跳转
		if(data.data.surgeryRecords!=null && data.data.surgeryRecords.length!=0){
			
			$(".s4").setTemplateElement("Template-List4").processTemplate(data.data.surgeryRecords);
			$(".index_operation").hide();
			$(".toOperation").bind("click",function(){
				var index=$(this).find(".index_operation").html();
				var result={
					url:query,
					result:data.data.surgeryRecords[index],
				};
				result=JSON.stringify(result);
				result="?"+encodeURIComponent(result);
				location.href = LOCALHOST_URL+'/web-bin/m/medical/doctor/to_hosp_operation_page'+result;
			});	
			
		}else{
			$("#operation").hide();
		}
		
		
		
		
		//加载检查结果以及其跳转
		if(data.data.examReqs!=null && data.data.examReqs.length!=0){
			$(".s2").setTemplateElement("Template-List2").processTemplate(data.data.examReqs);
			$(".id_examination").hide();
			
			$(".toExamination").bind("click",function(){
				var result="?reqId="+$(this).find(".id_examination").html()+"&url="+url;
				location.href = LOCALHOST_URL+'/web-bin/m/medical/doctor/to_examination_page'+result;
			});	
		}else{
			$("#examination").hide();
		}
		
		
		
		
		//加载检验结果以及其跳转
		if(data.data.testReqs!=null && data.data.testReqs.length!=0){
			$(".s3").setTemplateElement("Template-List3").processTemplate(data.data.testReqs);
			$(".id_inspection").hide();
			
			$(".bcTarget").each(function(){
				if($(this).html()!=""){
					$(this).barcode($(this).html(), "ean13",{barWidth:2, barHeight:60});
				}else{
					$(this).html("<p>暂无条码信息</p>");
				}
			});
			
			$(".toInspection").bind("click",function(){
				var result="?reqId="+$(this).find(".id_inspection").html()+"&url="+url;
				location.href = LOCALHOST_URL+'/web-bin/m/medical/doctor/to_inspection_page'+result;
			});	
		}else{
			$("#inspect").hide();
		}
	}else{
		
		$("#main_body").html(
				'<div id="none">'+
					'<img src="/web-bin/mobile/medical/hospital/images/prompt_icon_data.png">'+
					'<p>暂无数据</p>'+
				'</div>'
		);
		$("#none").css({
			'position':'fixed',
			'width':'80px',
			'height':'80px',
			'top':'50%',
			'left':'50%',
			'margin-top':'-40px',
			'margin-left':'-40px',
			'text-align':'center'
		});
		$("#none").find("img").css('width','80px');
		$("#none").find("p").css({
			'color':'#888',
			'font-size':'16px',
		});
		$("body").css("background-color","#f4f4f4");
		
		$("#line1").hide();
		$("#line2").hide();
		
		if(data!=null && data.res!=0){
			alert(data.msg);
		}
		
	}
	
}