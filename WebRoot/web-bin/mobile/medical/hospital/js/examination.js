var query=window.location.search;
var url=query.split("&url=")[1];
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;

$(function(){
	if(/visit/.test(url)){
		$("#top_in").find("div").bind("click",function(){
			location.href = LOCALHOST_URL+'/web-bin/m/medical/hospital/to_visit_case_page?'+url.split("?")[1];
		});
	}else{
		$("#top_in").find("div").bind("click",function(){
			location.href = LOCALHOST_URL+'/web-bin/m/medical/hospital/to_hosp_case_page?'+url.split("?")[1];
		});
	}
	
	
	$.ajax({
		async:false,
		on: true,
		type:"get",
		url: LOCALHOST_URL+'/web-bin/m/medical/hospital/query_examination_data'+query,
		dataType:"json",
		success: function(data){
			callBack(data);
		},
	});
});

function callBack(data){
	if(data!=null && data.data!=null){
		if(data.res!=0){
			alert(data.msg);
		}
		if(data.data.examItemName!=null){
			$("#p0").html('项目名称：'+data.data.examItemName);
		}
		$("#p1").html(data.data.examResult);
		$("#p2").html(data.data.examDesc);
	}else if(data!=null && data.res!=0){
		alert(data.msg);
	}else{
		alert ("暂无数据");
	}
	
}