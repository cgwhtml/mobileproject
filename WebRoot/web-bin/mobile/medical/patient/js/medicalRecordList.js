var query = window.location.search;
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var IMG_URL=window.HUGPAGE_CONFIG.IMG_URL;
var sex="&sex= ";
var query1=getRequest();//方法在config配置文件中
console.log(query);
$(function(){
	
	$("#main_body").hide();
	$("#main_body").css({"border-top":"0px solid #ccc","border-bottom":"0px solid #ccc"});

	$.ajax({
		on: true,
		type:"get",
		url: LOCALHOST_URL+'/web-bin/m/medical/patient/query_medicalRecordList_data?sourceId='+query1.patId,
		dataType:"json",
		success: function(data){
			console.log(data);
			$("#main_body").show();
			$("#loading").hide();
			CallBack(data);
		}
	});
    $.ajax({
        on: true,
        type:"get",
        url: LOCALHOST_URL+'/web-bin/m/medical/patient/query_patient_data?patId='+query1.patId,
        dataType:"json",
        success: function(data){
            console.log(data);
            CallBack2(data);
        }
    });
	
	
	$("#head_right").bind("click",function(){
		location.href = LOCALHOST_URL+"/web-bin/m/medical/patient/to_refresh_page"+query;
	});	
});
function CallBack2(data){
    if(data && data.data){
        $("#name").html(data.data.patName.replace("\"",""));

        var id=data.data.idCard;
        if(id.length==18){
            var num=id.charAt(16);
            if(num%2==0){
                sex="&sex=（女）";
                $("#photo").attr("src","/web-bin/resources/images/woman.png");
            }else{
                sex="&sex=（男）";
            }
        }else if(id.length==15){
            var num=id.charAt(14);
            if(num%2==0){
                sex="&sex=（女）";
                $("#photo").attr("src","/web-bin/resources/images/woman.png");
            }else{
                sex="&sex=（男）";
            }
        }
    }
}
function CallBack(data){
	if(data!=null && data.data){
		
		$("#main_body").css({"border-top":"1px solid #ccc","border-bottom":"1px solid #ccc"});
		
		$(".d2").setTemplateElement("Template-ListRows").processTemplate(data.data);
		$(".img").each(function(){
			$(this).attr("src",IMG_URL+$(this).attr("src"));
		});
		
		//住院跳转
		$(".hosp").bind("click",function(){
			var name="&name="+$("#name").html();
			
			var id="id="+$(this).find(".id").html();
			
			var hospName="&hospName="+$(this).find(".p1").html();
			var top="&hideTop=1"+"&hideBasic=0"+"&hideFee=0";
			var result=id+hospName+sex+name+top;
			console.log(result);
			location.href = LOCALHOST_URL+"/web-bin/m/medical/patient/to_hosp_case_page?"+result;
		});	
		//门诊跳转
		$(".visit").bind("click",function(){
            var name="&name="+$("#name").html();

            var id="id="+$(this).find(".id").html();

            var hospName="&hospName="+$(this).find(".p1").html();
            var top="&hideTop=1"+"&hideBasic=0"+"&hideFee=0";
            var result=id+hospName+sex+name+top;
			location.href = LOCALHOST_URL+"/web-bin/m/medical/patient/to_visit_case_page?"+result;
		});	
		
		$(".id").hide();
		$(".hugId").hide();
		
	}else{
		if(data && data.res!=0){
			alert(data.msg);
		}
		$("#main_body").css({"border-top":"0px solid #ccc","border-bottom":"0px solid #ccc"});
		$("#main_body").html(
				'<div id="none">'+
					'<img src="/web-bin/mobile/medical/patient/images/prompt_icon_data.png">'+
					'<p>暂无数据</p>'+
				'</div>'
		);
		$("body").css("background-color","#f4f4f4");
	}
	
}