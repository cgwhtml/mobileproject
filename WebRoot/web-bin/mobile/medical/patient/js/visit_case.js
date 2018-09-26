var url=window.location;
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var back=window.location.search.split("&indexNoId=")[0];
var query=getRequest();//方法在config配置文件中
var name=decodeURIComponent(query.name);
var sex=decodeURIComponent(query.sex);
console.log(query.id);

$(function(){
	var SERVER_URL=window.HUGPAGE_CONFIG.SERVER_URL;//读取图片服务器路径
	var FILE_URL=window.HUGPAGE_CONFIG.FILE_URL;//读取图片文件路径

	$("#p1").html(name);
	$("#sp1").html(sex);
	if(query.hospName){
        $("#p2").html(decodeURIComponent(query.hospName));
	}

	
	if(query.photo){
		$("#photo").attr("src",SERVER_URL+FILE_URL+query.photo);
	}
	
	$("#main_body").hide();
	
	$.ajax({
		on: true,
		timeout:60000,
		type:"get",
		url: LOCALHOST_URL+'/web-bin/m/medical/patient/query_visitList_data?id='+query.id,
		dataType:"json",
        beforeSend:function(){
            $("#loading").show();
        },
		success: function(data){
			console.log(data);
			$("#main_body").show();
			callBack(data);
		},
		complete:function(){
            $("#loading").hide();
		}
	});
	
	$("#top_in").find("div").bind("click",function(){
		//location.href = LOCALHOST_URL+'/web-bin/m/medical/patient/to_medicalRecordList_page'+back;
        history.back();
	});
	
});

function callBack(data){
	console.log(data);
	
	if(data && data.data){
		
		//加载基本信息
		if(data.data.visitInfo){
			$("#sp2").html(data.data.visitInfo.visitDate.substring(0,11));
			$("#p3").html(
				'<span id="sp3">【门诊】</span>'//+data.data.visitInfo.deptName+'&nbsp;'+data.data.visitInfo.docotorName+'&nbsp;'+data.data.visitInfo.diagName
			);
			if(data.data.visitInfo.deptName){
                $("#p3").append('&nbsp;'+data.data.visitInfo.deptName);
			}
			if(data.data.visitInfo.docotorName){
                $("#p3").append('&nbsp;'+data.data.visitInfo.docotorName);
			}
            if(data.data.visitInfo.diagName){
                $("#p3").append('&nbsp;'+data.data.visitInfo.diagName);
            }
			$("#c4").setTemplateElement("Template-Info").processTemplate(data.data.visitInfo);
			$("#i1").find("p").each(function(){
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
			if(data.data.medicalOuthospFee){
				$("#block_fee").setTemplateElement("Template-Fee").processTemplate(data.data.medicalOuthospFee);
				
				$("#toCost").bind("click",function(){
					var medicalCategory=data.data.medicalOuthospFee.medicalCategory;
					var name=$("#p1").html();
					var sex=$("#sp1").html();
					var index=data.data.medicalOuthospFee.id;
					var result="?outhospFeeId="+index+"&name="+name+"&sex="+sex+"&medicalCategory="+medicalCategory+"&url="+url;
					location.href = LOCALHOST_URL+'/web-bin/m/medical/patient/to_cost_page'+result;
				});	
			}else{
				$("#fee").hide();
			}
		}
		
		
		
		
		//加载医嘱用药以及其跳转
		if(data.data.medicalOrderInfos && data.data.medicalOrderInfos.length!=0){
			$(".s1").setTemplateElement("Template-List1").processTemplate(data.data.medicalOrderInfos);
			
			$(".medicine_list").html(
				'<p style="display:none"><textarea id="Template-List4" rows="0" cols="0">'+
				'{#foreach $T as Row}'+
					'<div class="toMedicine">'+
						'<p id="index">{$T.Row$index+1}</p>'+
						'<p>{$T.Row.drugName}</p>'+
						'<img src="/web-bin/mobile/medical/patient/images/blue.png">'+
					'</div>'+
				'{/for}'+
				'</textarea></p>'+
				'<div class="s4"></div>'
			);
			
			var length=data.data.medicalOrderInfos.length;
			for(var i=0;i<length;i++){
				var id="?orderInfoId="+data.data.medicalOrderInfos[i].id;
				$.ajax({
					async:false,
					on: true,
					type:"get",
					url: LOCALHOST_URL+'/web-bin/m/medical/patient/query_visitOrder_data'+id,
					dataType:"json",
					success: function(data1){
						console.log(data1);
						var record=data1.data.infos;
						$("#m"+i).find(".s4").setTemplateElement("Template-List4").processTemplate(record);
						
						$("#m"+i).find(".toMedicine").bind("click",function(){
							var index=$(this).find("#index").html()-1;
							var result={
								url:window.location.search,
								result:record[index],
								hideTop:query.hideTop
							};
							var data2=JSON.stringify(result);
							data2="?"+encodeURIComponent(data2);
							location.href = LOCALHOST_URL+'/web-bin/m/medical/patient/to_visit_medicine_page'+data2;
						});	
					}
				});
			}
			
		}else{
			$("#medicine").hide();
		}
		
		
		
		
		//加载检查结果以及其跳转
		if(data.data.examReqs && data.data.examReqs.length!=0){
			$(".s2").setTemplateElement("Template-List2").processTemplate(data.data.examReqs);
			$(".id_examination").hide();
			
			$(".toExamination").bind("click",function(){
				var result="?reqId="+$(this).find(".id_examination").html()+"&url="+url;
				location.href = LOCALHOST_URL+'/web-bin/m/medical/patient/to_examination_page'+result;
			});	
		}else{
			$("#examination").hide();
		}
		
		
		
		
		//加载检验结果以及其跳转
		if(data.data.medicalTestReqs && data.data.medicalTestReqs.length>0){
			$(".s3 #inspect_data").setTemplateElement("Template-List3").processTemplate(data.data.medicalTestReqs);
			var cfSize=$(".s3 .c4").size();
			var sum=0;
			$(".s3 .c4").each(function(i){
				var b=$(this).find(".id_inspection").text();
				console.log(b);
				var $this=$(this);
				var t=$(this).find(".bcTarget");
				var $code=$(this).find(".barCodeNo");
				$.ajax({
					on: true,
					timeout:60000,
					type:"get",
					url: LOCALHOST_URL+'/web-bin/m/medical/patient/query_barcode_data?id='+b,
					dataType:"json",
                    beforeSend:function(){
                        $("#loading_inspect").show();
                    },
					success: function(data){
						console.log(data);
                        var regExp=/(\+)|(\%)|(\|)|(\*)|(\&)|(\.)/g;
						if(data.data){
							$code.val(data.data.barCodeNo);
							var barcode=$code.val();
							console.log(barcode);
							if($(".s3").find("#"+barcode.replace(regExp, "_")).length>0){
								$("#"+data.data.barCodeNo.replace(regExp, "_")).find(".item_name").append("+"+$this.find(".item_name span").text());
								$this.remove();
							}else{
								$this.attr("id",data.data.barCodeNo.replace(regExp, "_"));
                                t.JsBarcode(data.data.barCodeNo);
								$this.show();
							}
						}else{
                            $this.find(".bcTarget_info").html("<p>暂无条码信息</p>");
                            $this.show();
						}
						sum++;
						sum==cfSize&&$("#loading_inspect").hide();//把转圈去掉
					},
                    complete:function(){
                        $("#loading_inspect").hide();
                    }
				});
				
			});
			//跳转至检验报告
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
		
		if(data && data.res!=0){
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