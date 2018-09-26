var query=window.location.search;
var url=query.split("&url=")[1];
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query1=getRequest();//方法在config配置文件中
query1&&(query1.hideTop==0)&&($("#top").show(),$("#main_head").css({"top":"60px"}),$("#main_body").css({"margin-top":"115px"}));
$(function(){

	if(/visit/.test(url)){
		$("#top_in").find("div").bind("click",function(){
			location.href = LOCALHOST_URL+'/web-bin/m/medical/patient/to_visit_case_page?'+url.split("?")[1];
		});
	}else{
		$("#top_in").find("div").bind("click",function(){
			location.href = LOCALHOST_URL+'/web-bin/m/medical/patient/to_hosp_case_page?'+url.split("?")[1];
		});
	}
	
	$.ajax({
		async:false,
		on: true,
		type:"get",
		url: LOCALHOST_URL+'/web-bin/m/medical/patient/query_inspection_data?reqId='+query1.reqId,
		dataType:"json",
		success: function(data){
			console.log(data);
			if(data && data.data){
				if(data.data.testItemName){
					$("#name").html('项目名称：'+data.data.testItemName+'<span style="float: right;margin-right: 25px;">'+(data.data.reportDate).substring(0,10)+'</span>');
				}
				
				$(".s1").setTemplateElement("Template-List1").processTemplate(data.data.medicalTestResults);
			}else if(data && data.res!=0){
                $("#main_body").append('<p style="text-align: center;margin: 10px auto;">'+data.msg+'</p>');
			}else{
                $("#main_body").append('<p style="text-align: center;margin: 10px auto;">暂无数据</p>');
			}
		}
	});
});
