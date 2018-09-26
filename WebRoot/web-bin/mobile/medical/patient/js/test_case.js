var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var url=window.location.search.split("&indexNoId=")[0];
var query=getRequest();//方法在config配置文件中
console.log(query);
$(function(){
	var SERVER_URL=window.HUGPAGE_CONFIG.SERVER_URL;//读取图片服务器路径
	var FILE_URL=window.HUGPAGE_CONFIG.FILE_URL;//读取图片文件路径
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
			$(".doc_name").text("XXX");
		}
	}
	$("#pat_name").text(decodeURIComponent(query.name));
	$("#pat_sex").text(decodeURIComponent(query.sex));
	if(query.hospName){
		$("#hosp_name").text(decodeURIComponent(query.hospName));
	}else{
		$("#hosp_name").text("");
	}
	
	
	if(query.photo){
		$("#photo").attr("src",SERVER_URL+FILE_URL+query.photo);
	}
	
	$("#main_body").hide();
	
	$.ajax({
		on: true,
		timeout:60000,
		type:"get",
		url: LOCALHOST_URL+'/web-bin/m/medical/patient/query_testList_data?id='+query.id,
		dataType:"json",
		success: function(data){
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
	var basic=data.data;
	var reg=/-/g;//改日期格式
	if(data && data.data){
		
		//加载基本信息
		if(basic){
			$("#pat_name").text(basic.patName);
			if(basic.checkDate){
                $("#admit_date").text(basic.checkDate.substring(0,11).replace(reg,"/"));
			}
			$("#block_mess").setTemplateElement("Template-Info").processTemplate(basic);
			$("#mes_det").find("p").each(function(){
				if($(this).html().split("：")[1]==""){
					$(this).hide();
				}
			});
		}else{
			$("#message").hide();
		}
		if(query&&query.hideBasic==1){//如果query.hideBasic=1基本信息不显示
			$("#main_head").hide();
			query.hideTop?$("#main_body").css({"margin-top":"0px"}):$("#main_body").css({"margin-top":"60px"});
			$(".doc_name").text("XXX");
		}
		
		
		
		//加载检查结果以及其跳转
		if(data.data.medicalPhysicalResults && data.data.medicalPhysicalResults.length!=0){
			var exam=[],
				insp=[],
			    medicalPhysicalResults=data.data.medicalPhysicalResults;
			for(var i=0;i<medicalPhysicalResults.length;i++){
				if(medicalPhysicalResults[i].groupItemTypeCode==1){
					insp.push(medicalPhysicalResults[i]);
				}else{
					exam.push(medicalPhysicalResults[i]);
				}
			}
			exam.length==0&&$("#examination").hide();
			insp.length==0&&$("#inspect").hide();
			//加载检查数据
			var examArr=[];
			for(var i=0;i<exam.length-1;i++){
                if(exam[i].groupItemCode){
                    if($.trim(exam[i].groupItemCode) !=$.trim(exam[i+1].groupItemCode)){
                        examArr.push(exam[i])
                    }
				}
			}
			$(".temp_exa").setTemplateElement("Template-Examination").processTemplate(examArr);
            //     if(exam){
            //         if(exam[i]&&$(".temp_insp").find("#"+exam[i].groupItemCode).length>0){
            //             $(this).remove();
            //         }else{
            //             if(exam[i]){
            //                 $(this).attr("id",exam[i].groupItemCode);
            //                 $(this).show();
            //             }
            //         }
            //     }
            // });
			// $(".block_info").hide();
            // for(var i=0;i<examArr.length;i++){
			// 	$(".block_info").eq(i).attr("id",exam[i].groupItemCode);
            // }
            $(".temp_exa .block_info").each(function(i){
				if($(".temp_exa").find("#"+examArr[i].groupItemCode+":visible").length>1){
					$(".temp_exa").find("#"+examArr[i].groupItemCode).hide();
					$(this).show();
				}
            });
            if(exam){
				var t={};
				for(var i=0;i<exam.length;i++){
					var n=exam[i].groupItemCode;
					if(t[n]){
						t[n].push(exam[i]);
					}else{
						t[n]=[];
						t[n].push(exam[i]);
					}
				}
            }
			
			$(".toExamination").bind("click",function(){
				var index=$(this).find(".id_examination").text();
				var name=$(this).find(".item_name").val();
				var result={
						url:window.location.search,
						name:name,
						result:t[index],
						hideTop:query.hideTop,
						hideBasic:query.hideBasic,
				};
				var record=JSON.stringify(result);
				record="?"+encodeURIComponent(record);

				location.href = LOCALHOST_URL+'/web-bin/m/medical/patient/to_test_examination_page'+record;
			});
            var inspArr=[];
            for(var i=0;i<insp.length-1;i++){
                if(insp[i].groupItemCode){
                    if(insp[i].groupItemCode !=insp[i+1].groupItemCode){
                        inspArr.push(exam[i])
                    }
                }
            }
			//加载检验数据
			$(".temp_insp").setTemplateElement("Template-Inspect").processTemplate(inspArr);
            $(".temp_insp .block_info").each(function(i){
                if($(".temp_insp").find("#"+inspArr[i].groupItemCode+":visible").length>1){
                    $(".temp_insp").find("#"+inspArr[i].groupItemCode).hide();
                    $(this).show();
                }
            });
			/*$(".block_info").each(function(i){
				if(insp[i]&&$(".temp_insp").find("#"+insp[i].groupItemCode).length>0){
					$(this).remove();
				}else{
					if(insp[i]){
						$(this).attr("id",insp[i].groupItemCode);
						$(this).show();
					}
				}
			});*/
			if(insp){
				var c={};
				for(var i=0;i<insp.length;i++){
					var c=insp[i].groupItemCode;
					if(c[n]){
						c[n].push(insp[i]);
					}else{
						c[n]=[];
						c[n].push(insp[i]);
					}
				}
			}

			$(".toInspection").bind("click",function(){
				var index=$(this).find(".id_inspection").text();
				var name=$(this).find(".item_name").val();
				var result={
						url:window.location.search,
						name:name,
						result:c[index],
						hideTop:query.hideTop,
						hideBasic:query.hideBasic,
				};
				var record=JSON.stringify(result);
				record="?"+encodeURIComponent(record);

				location.href = LOCALHOST_URL+'/web-bin/m/medical/patient/to_test_inspection_page'+record;
			});	

			
		}else{
			$("#examination").hide();
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
	
}