var query=window.location.search;
var url=query.split("&url=")[1];
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;

$(function(){
	if(/visit/.test(url)){
		$("#top_in").find("div").bind("click",function(){
			location.href = LOCALHOST_URL+'/web-bin/m/medical/angel/to_visit_case_page?'+url.split("?")[1];
		});
	}else{
		$("#top_in").find("div").bind("click",function(){
			location.href = LOCALHOST_URL+'/web-bin/m/medical/angel/to_hosp_case_page?'+url.split("?")[1];
		});
	}
	
	$.ajax({
		async:false,
		on: true,
		type:"get",
		url: LOCALHOST_URL+'/web-bin/m/medical/angel/query_inspection_data'+query,
		dataType:"json",
		success: function(data){
			if(data!=null && data.data!=null){
				if(data.data.report!=null){
					$("#name").html('项目名称：'+data.data.report.testItemName);
				}
				if(data.res!=0){
					alert(data.msg);
				}
				
				if(data.data.flag==0){
					$(".s1").setTemplateElement("Template-List1").processTemplate(data.data.tr);
				}else{
					$(".s1").setTemplateElement("Template-List2").processTemplate(data.data.tr);
				}
			}else if(data!=null && data.res!=0){
				alert(data.msg);
			}else{
				alert ("暂无数据");
			}
		},
	});
});
