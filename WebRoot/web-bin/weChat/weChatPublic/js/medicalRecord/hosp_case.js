var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var url=window.location.search.split("&indexNoId=")[0];
var query=getRequest();//方法在config配置文件中
console.log(query);
$(function(){
	var SERVER_URL=window.HUGPAGE_CONFIG.SERVER_URL;//读取图片服务器路径
	var FILE_URL=window.HUGPAGE_CONFIG.FILE_URL;//读取图片文件路径
	
	$("#pat_name").text(decodeURIComponent(query.name));
	$("#pat_sex").text(decodeURIComponent(query.sex));
	$("#hosp_name").text(decodeURIComponent(query.hospName));
	
	if(query.photo){
		$("#photo").attr("src",SERVER_URL+FILE_URL+query.photo);
	}
	
	$("#main_body").hide();
	
	$.ajax({
		on: true,
		timeout:60000,
		type:"get",
		url: LOCALHOST_URL+'/web-bin/m/medical/patient/query_hospList_data?id='+query.id,
		dataType:"json",
		success: function(data){
			console.log(data);
			$("#main_body").show();
			$("#loading").hide();
			callBack(data);
		}
	});
	
	$("#top_in").find("div").bind("click",function(){
		//location.href = LOCALHOST_URL+'/web-bin/m/medical/patient/to_medicalRecordList_page'+url;
        history.back();
	});
	
});

function callBack(data){console.log(data);
	var basic=data.data.medicalInhospRecord;
	var reg=/-/g;//改日期格式
	if(data && data.data){
		
		//加载基本信息
		if(basic){
			$("#admit_date").html(basic.admitDate.substring(0,11).replace(reg,"/")+'- '+(basic.disChargeDate ? basic.disChargeDate.substring(0,11).replace(reg,"/"):" "));
			$("#base_info").html(
				'<span id="in_hosp">【住院】</span>'+basic.deptName+'&nbsp;'+$.trim(basic.attendDrName)+'&nbsp;'+basic.admitDiagName
			);
			$("#block_mess").setTemplateElement("Template-Info").processTemplate(basic);
			$("#mes_det").find("p").each(function(){
				if($(this).html().split("：")[1]==""){
					$(this).hide();
				}
			});
		}else{
			$("#message").hide();
		}	
		
		//加载费用以及其跳转
		if(query && query.hideFee==1){ //如果hideFee=1费用信息不显示
			$("#fee").hide();
		}else{
			if(data.data.medicalInhospFee){
				$("#block_fee").setTemplateElement("Template-Fee").processTemplate(data.data.medicalInhospFee);
				
				$("#toCost").bind("click",function(){
					var medicalCategory=data.data.medicalInhospFee.medicalCategory;
					var name=$("#pat_name").text();
					var sex=$("#pat_sex").text();
					var id=data.data.medicalInhospFee.id;
					var result="?feeId="+id+"&name="+name+"&sex="+sex+"&medicalCategory="+medicalCategory+"&url="+window.location.search;
					location.href = LOCALHOST_URL+'/web-bin/m/medical/patient/to_cost_page'+result;
				});	
			}else{
				$("#fee").hide();
			}
		}
		

		//加载医嘱用药以及其跳转
		if(data.data.medicalInhospOrders && data.data.medicalInhospOrders.length!=0){
			$(".temp_ord").setTemplateElement("Template-Orders").processTemplate(data.data.medicalInhospOrders);
			
			$(".toMedicine").bind("click",function(){

				var name=$(this).find("#pat_name").text();
				var sex=$(this).find("#pat_sex").text();
				
				var index=$(this).find("#index").text()-1;
				var result={
					url:window.location.search,
					sex:sex,
					name:name,
					result:data.data.medicalInhospOrders[index],
					hideTop:query.hideTop,
				};
				var record=JSON.stringify(result);
				record="?"+encodeURIComponent(record);
				location.href = LOCALHOST_URL+'/web-bin/m/medical/patient/to_hosp_medicine_page'+record;
			});	
			
			
		}else{
			$("#orders").hide();
		}
		
		
		
		
		//加载手术信息以及其跳转
		if(data.data.medicalSurgeryRecords && data.data.medicalSurgeryRecords.length!=0){
			
			$(".temp_ope").setTemplateElement("Template-Operation").processTemplate(data.data.medicalSurgeryRecords);
			$(".index_operation").hide();
			$(".toOperation").bind("click",function(){
				var index=$(this).find(".index_operation").text();
				var result={
					url:window.location.search,
					result:data.data.medicalSurgeryRecords[index],
				};
				result=JSON.stringify(result);
				result="?"+encodeURIComponent(result);
				location.href = LOCALHOST_URL+'/web-bin/m/medical/patient/to_hosp_operation_page'+result;
			});	
			
		}else{
			$("#operation").hide();
		}
		
		
		
		
		//加载检查结果以及其跳转
		if(data.data.medicalExamReqs && data.data.medicalExamReqs.length!=0){
			$(".temp_exa").setTemplateElement("Template-Examination").processTemplate(data.data.medicalExamReqs);
			$(".id_examination").hide();
			
			$(".toExamination").bind("click",function(){
				var result="?reqId="+$(this).find(".id_examination").html()+"&url="+url;
				location.href = LOCALHOST_URL+'/web-bin/m/medical/patient/to_examination_page'+result;
			});	
		}else{
			$("#examination").hide();
		}
		
		
		
		
		//加载检验结果以及其跳转
		if(data.data.medicalTestReqs && data.data.medicalTestReqs.length!=0){
			$(".s3 #inspect_data").setTemplateElement("Template-Inspect").processTemplate(data.data.medicalTestReqs);
			var cfSize=$(".s3 .block_info").size();
			var sum=0;
			$(".s3 .block_info").each(function(i){
				var b=$(this).find(".id_inspection").text();
				var $this=$(this);
				var t=$(this).find(".bcTarget");
				var $code=$(this).find(".barCodeNo");
				$.ajax({
						on: true,
						timeout:60000,
						type:"get",
						url: LOCALHOST_URL+'/web-bin/m/medical/patient/query_barcode_data?id='+b,
						dataType:"json",
						success: function(data){
							var regExp=/(\+)|(\%)|(\|)|(\*)|(\&)|(\.)/g;
							if(data.data){
								$code.val(data.data.barCodeNo);
								if($(".s3").find("#"+data.data.barCodeNo.replace(regExp, "_")).length>0){
									$("#"+data.data.barCodeNo.replace(regExp, "_")).find(".item_name").append("+"+$this.find(".item_name span").text());
									$this.remove();
								}else{
									$this.attr("id",data.data.barCodeNo.replace(regExp, "_"));
									t.JsBarcode(data.data.barCodeNo);
									$this.show();
								}
							}else{
                                $(".bcTarget_info").html("<p>暂无条码信息</p>");
                                $this.show();
							}
							sum++;
							sum==cfSize&&$("#loading_inspect").remove();//把转圈去掉
						}
			   });
			});
			
			
			$(".toInspection").bind("click",function(){
				var result="?reqId="+$(this).find(".id_inspection").html()+"&url="+url;
				location.href = LOCALHOST_URL+'/web-bin/m/medical/patient/to_inspection_page'+result;
			});
			//跳转至条码报告
			$(".bcTarget").bind("click",function(){
				var name=decodeURIComponent(query.name);
				var sex=decodeURIComponent(query.sex);
				var itemName=$(this).parents(".inspect").find(".item_name span").text();
				var applyDate=$(this).parents(".inspect").find(".apply_date span").text();
				var barCode=$(".barCodeNo").val();
				var samplingDate=$(this).parents(".inspect").find(".sampling_date").val();
				var samplingLocation=$(this).parents(".inspect").find(".sampling_location").val();
				var takeReportLocation=$(this).parents(".inspect").find(".take_report_location").val();
				var takeReportDate=$(this).parents(".inspect").find(".take_report_date").val();
				var result={
						url:window.location.search,
						name:name,
						sex:sex,
						hideTop:query.hideTop,
						itemName:itemName,
						barCode:barCode,
						applyDate:applyDate,
						samplingDate:samplingDate,
						samplingLocation:samplingLocation,
						takeReportLocation:takeReportLocation,
						takeReportDate:takeReportDate,
					};
					result=JSON.stringify(result);
					result="?"+encodeURIComponent(result);
				location.href = LOCALHOST_URL+'/web-bin/m/medical/patient/to_barcode_detail_page'+result;
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
		$("body").css("background-color","#f4f4f4");
		
		$("#line1").hide();
		$("#line2").hide();
		
		if(data!=null && data.res!=0){
			alert(data.msg);
		}
		
	}
	if(query&&query.hideTop==0){
		$("#top").show();
		if(query.hideBasic==0){
			$("#main_head").show();
			$("#main_head").css({"top":"60px"});
			$("#main_body").css({"margin-top":"160px"});
		}else{
			$("#main_body").css({"margin-top":"70px"});
			$(".doc_name").text("XXX");
		}
	}else{
		if(query.hideBasic==0){
			$("#main_head").show();
			$("#main_body").css({"margin-top":"100px"});
		}else{
			$(".doc_name").text("XXX");
		}
	}
}