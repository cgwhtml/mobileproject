var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query=getRequest();//方法在config配置文件中
$(function(){
	var data =query;
    console.log(data);
	// $("#top_in").find("div").bind("click",function(){
	// 	location.href = LOCALHOST_URL+'/web-bin/m/medical/patient/to_hosp_case_page'+data.url;
	// });
	$("#p0").text(decodeURI(data.surgeryOpenName));
	$("#p2").html('<span>'+decodeURIComponent(data.surgeryBeginDate).replace("+",' ')+'</span><span>'+decodeURIComponent(data.surgeryEndDate).replace("+",' ')+'</span>');
	$("#p3").text('手术医生：'+decodeURI(data.surgeryDrName));
	$("#p4").html('麻醉医生：'+decodeURI(data.anesDrName)+'<span>麻醉方法：'+decodeURIComponent(data.anesMethodName)+'</span>');
	$("#p5").text('手术等级：'+decodeURI(data.surgeryLvName));
	$("#p6").text('切口愈合等级：'+decodeURI(data.whln));
	if(!data.surgeryLvName){
        $("#p5").hide();
	}
    if(!data.whln){
        $("#p6").hide();
    }
    var time=parseFloat((new Date(decodeURIComponent(data.surgeryEndDate).replace("+",' '))-new Date(decodeURIComponent(data.surgeryBeginDate).replace("+",' ')))/(1000*60));
    console.log(time);
    $("#p1 .time").text(time);
});