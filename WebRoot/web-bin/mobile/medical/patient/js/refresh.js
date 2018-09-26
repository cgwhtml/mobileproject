var query=window.location.search;
var id;
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var canRefresh=true;
var num=0;
var time;
var times=null;

$(function(){
	
	if(query.split("patId=")[1]!=null){
		id="?patId="+query.split("patId=")[1].split("&")[0];
	}
	
	$("#top_in").find("div").bind("click",function(){
		location.href = LOCALHOST_URL+'/web-bin/m/medical/patient/to_medicalRecordList_page'+query;
	});
	
	times=setInterval(function(){
		num+=1;
		$("#img2").rotate(num);
	},1);
	
	refresh();

	$("#d2 div").bind("click",function(){
		if($(this).hasClass("c1")){
			if(canRefresh){
				$.ajax({
					async:false,
					on: true,
					type:"get",
					url: LOCALHOST_URL+'/web-bin/m/medical/patient/query_startRefresh_data'+id,
					dataType:"json",
					success: function(data){
						console.log(0);
						refresh();
                        time=setInterval(function(){
                            refresh();
                        },2000);
					}
				});
			}else{
				alert("已是最新数据！");
			}
			
		}else if($(this).hasClass("c3")){
			location.href = LOCALHOST_URL+'/web-bin/m/medical/patient/to_medicalRecordList_page'+query;
		}
		
	});
});

function refresh(){
    $("#p1").html("0%");
	console.log(1);
	$.ajax({
		on: true,
		type:"get",
		url: LOCALHOST_URL+'/web-bin/m/medical/patient/query_refresh_data'+id,
		dataType:"json",
		success: function(data){
			console.log(2);
			console.log(data.data);
			if(data.data){
				if(data.data.left!==0){
					canRefresh=false;
					$("#p1").show();
					$("#d2 div").removeClass().addClass("c2");
					$(".c2").find("p").html("正在刷新中...");
					$("#img2").show();
					var per=isNaN(data.data.newCount/data.data.totle)?0:data.data.newCount/data.data.totle;
					$("#p1").html(per*100+"%");
					$(".c2").prev().html('共'+data.data.newCount+'条数据，刷新数据需要一定时间');
					console.log(3);
				}else{
					canRefresh=true;
					num=0;
					$("#img2").hide();
					$("#p1").show();
					$("#d2 div").removeClass().addClass("c3");
					$(".c3").find("p").html("立即查看");
					$(".c3").prev().html('已检测到您的'+data.data.newCount+'条新医疗数据');
					$("#p1").html("100%");
					$("#d3").hide();
					$("body").css({
						"background-color":"#f4f4f4"
					});
					clearInterval(times);
					clearInterval(time);
					console.log(4);
				}
			}else{
				console.log(5);
                clearInterval(time);
			}
		}
	});
}