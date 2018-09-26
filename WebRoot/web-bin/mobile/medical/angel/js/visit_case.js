var query=window.location.search;
query=decodeURIComponent(query,"UTF-8");
var name=query.split("patName=")[1].split("&")[0];
var sex=query.split("sex=")[1].split("&")[0];
var hospName=query.split("hospName=")[1].split("&")[0];
var url=window.location;
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var back=query.split("&patId=")[0];

$(function(){
	
	$("#p1").html(name);
	$("#sp1").html(sex);
	$("#p2").html(hospName);
	
	if(sex=="（女）"){
		$("#photo").attr("src","/web-bin/resources/images/woman.png");
	}
	if(sex=="（男）"){
		$("#photo").attr("src","/web-bin/resources/images/men.png");
	}
	
	$("#main_body").hide();
	
	$.ajax({
		on: true,
		timeout:60000,
		type:"get",
		url: LOCALHOST_URL+'/web-bin/m/medical/angel/query_visitList_data'+query,
		dataType:"json",
		success: function(data){
			$("#main_body").show();
			$("#loading").hide();
			callBack(data);
		},
	});
	
	
	$("#top_in").find("div").bind("click",function(){
		location.href = LOCALHOST_URL+'/web-bin/m/medical/angel/to_medicalRecordList_page'+back;
	});
	
	
});

function callBack(data){
	
	if(data!=null && data.data!=null){
		
		//加载基本信息
		if(data.data.visitInfo!=null){
			$("#sp2").html(data.data.visitInfo.visitDate.substring(0,11));
			$("#p3").html(
				'<span id="sp3">【门诊】</span>'+data.data.visitInfo.deptName+'&nbsp;'+data.data.visitInfo.docotorName+'&nbsp;'+data.data.visitInfo.diagName
			);
			$("#i1").html(
					"<p>接诊医生："+data.data.visitInfo.docotorName+"</p>"+
					"<p>接诊科室："+data.data.visitInfo.deptName+"</p>"+
					"<p>诊断名称："+data.data.visitInfo.diagName+"</p>"+
					"<p>主诉："+data.data.visitInfo.chiefDescr+"</p>"+
					"<p>现病史："+data.data.visitInfo.currDiseaseHistory+"</p>"+
					"<p>既往史："+data.data.visitInfo.pastDiseaseHistory+"</p>"
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
		if(data.data.outhospFee!=null){
			var medicalFee=data.data.outhospFee.medicalFee==""?0:data.data.outhospFee.medicalFee;
			var selfPayMentFee=data.data.outhospFee.selfPayMentFee==""?0:data.data.outhospFee.selfPayMentFee;
			var reduceFee=data.data.outhospFee.reduceFee==""?0:data.data.outhospFee.reduceFee;
			$("#toCost").html(
				'<p id="p4">医保类别：'+data.data.outhospFee.medicalCategory+'<img src="/web-bin/mobile/medical/angel/images/blue.png"></p>'+
				'<div id="cost">'+
					'<img alt="" src="/web-bin/mobile/medical/angel/images/cost.png">'+
					'<div>'+
						'<p>总费用</p>'+
						'<p>'+data.data.outhospFee.medicalTotalFee+'</p>'+
					'</div>'+
					'<div>'+
						'<p>医保报销费用：'+medicalFee+'元</p>'+
						'<p>个人现金支付：'+selfPayMentFee+'元</p>'+
						'<p>医院优惠费用：'+reduceFee+'元</p>'+
					'</div>'+
				'</div>'
			);
			
			$("#toCost").bind("click",function(){
				var medicalCategory=data.data.outhospFee.medicalCategory;
				var name=$("#p1").html();
				var sex=$("#sp1").html();
				var index=data.data.outhospFee.id;
				var result="?outhospFeeId="+index+"&name="+name+"&sex="+sex+"&medicalCategory="+medicalCategory+"&url="+query;
				location.href = LOCALHOST_URL+'/web-bin/m/medical/angel/to_cost_page'+result;
			});	
		}else{
			$("#fee").hide();
		}
		
		
		
		
		//加载医嘱用药以及其跳转
		if(data.data.orderInfos!=null && data.data.orderInfos.length!=0){
			$(".s1").setTemplateElement("Template-List1").processTemplate(data.data.orderInfos);
			
			$(".medicine_list").html(
				'<p style="display:none"><textarea id="Template-List4" rows="0" cols="0">'+
				'{#foreach $T as Row}'+
					'<div class="toMedicine">'+
						'<p id="index">{$T.Row$index+1}</p>'+
						'<p>{$T.Row.drugName}</p>'+
						'<img src="/web-bin/mobile/medical/angel/images/blue.png">'+
					'</div>'+
				'{/for}'+
				'</textarea></p>'+
				'<div class="s4"></div>'
			);
			
			var length=data.data.orderInfos.length;
			for(var i=0;i<length;i++){
				var id="?orderInfoId="+data.data.orderInfos[i].id;
				$.ajax({
					async:false,
					on: true,
					type:"get",
					url: LOCALHOST_URL+'/web-bin/m/medical/angel/query_visitOrder_data'+id,
					dataType:"json",
					success: function(data1){
						var record=data1.data.infos;
						$("#m"+i).find(".s4").setTemplateElement("Template-List4").processTemplate(record);
						
						$("#m"+i).find(".toMedicine").bind("click",function(){
							var index=$(this).find("#index").html()-1;
							var result={
								url:query,
								result:record[index],
							};
							var data2=JSON.stringify(result);
							data2="?"+encodeURIComponent(data2);
							location.href = LOCALHOST_URL+'/web-bin/m/medical/angel/to_visit_medicine_page'+data2;
						});	
					},
				});
			}
			
		}else{
			$("#medicine").hide();
		}
		
		
		
		
		//加载检查结果以及其跳转
		if(data.data.examReqs!=null && data.data.examReqs.length!=0){
			$(".s2").setTemplateElement("Template-List2").processTemplate(data.data.examReqs);
			$(".id_examination").hide();
			
			$(".toExamination").bind("click",function(){
				var result="?reqId="+$(this).find(".id_examination").html()+"&url="+url;
				location.href = LOCALHOST_URL+'/web-bin/m/medical/angel/to_examination_page'+result;
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
				var result="?reqId="+$(this).find(".id_inspection").html();
				location.href = LOCALHOST_URL+'/web-bin/m/medical/angel/to_inspection_page'+result;
			});	
		}else{
			$("#inspect").hide();
		}
		
	}else{
		
		$("#main_body").html(
				'<div id="none">'+
					'<img src="/web-bin/mobile/medical/angel/images/prompt_icon_data.png">'+
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