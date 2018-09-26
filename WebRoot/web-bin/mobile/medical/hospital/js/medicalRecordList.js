// var query=window.location.search;
// query=decodeURIComponent(query,"UTF-8");
// var name=query.split("patName=")[1];
// var idCard=query.split("idCard=")[1];
// var cardType=query.split("cardType=")[1];
// var hospCode=query.split("hospCode=")[1];
// var hospCard=query.split("cardNo=")[1];
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var IMG_URL=window.HUGPAGE_CONFIG.IMG_URL;
var sex="&sex= ";
var queryObj=getRequest();
var hospCode=queryObj.hospCode;
var cardType=queryObj.cardType;
var hospCard=queryObj.cardNo;
var name=queryObj.patName;
var idCard=queryObj.idCard;
// var hospCard=query1.hospCard;
$(function(){
    // $.ajax({
    //     on: true,
    //     type:"get",
    //     url: LOCALHOST_URL+'/web-bin/m/medical/patient/query_patient_data?patId='+query1.patId,
    //     dataType:"json",
    //     success: function(result){
    //         CallBack2(result);
    //     }
    // });

	
	$("#main_body").hide();
	$("#main_body").css({"border-top":"0px solid #ccc","border-bottom":"0px solid #ccc"});
	console.log(LOCALHOST_URL+'/web-bin/m/medical/hospital/query_medicalRecordList_data?hospCode='+hospCode+"&cardType="+cardType+"&hospCard="+hospCard);
	$.ajax({
		on: true,
		type:"get",
		url: LOCALHOST_URL+'/web-bin/m/medical/hospital/query_medicalRecordList_data?hospCode='+hospCode+"&cardType="+cardType+"&hospCard="+hospCard,
		dataType:"json",
		success: function(data){
			console.log(data);
			$("#main_body").show();
			$("#loading").hide();
			CallBack(data);
		},
	});

//	$("#head_right").bind("click",function(){
//		location.href ="/HugPage/web-bin/mobile/medical/hospital/refresh.html"+query;
//	});	
});
function CallBack2(data){
    if(name!=null){
        name=name.split("&")[0];
        $("#name").html(name.replace("\"",""));
    }else{
        name=data.data.patName.replace("\"","");
        $("#name").html(name);
    }


    if(idCard!=null){
        var id=idCard.split("&")[0];
    }else{
        var id=data.data.idCard;
    }

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
function CallBack(data){
	if(data!=null && data.data!=null && data.data.length!=0){
		$("#main_body").css({"border-top":"1px solid #ccc","border-bottom":"1px solid #ccc"});
		if(data.data){
            for(var i=0;i<data.data.length;i++){
                if(!(data.data[i].image)){
                    data.data[i].image=data.data[i].hospImage;
                }
            }
		}
		$(".d2").setTemplateElement("Template-ListRows").processTemplate(data.data);
		$(".img").each(function(){
			$(this).attr("src",IMG_URL+$(this).attr("src"));
		});
		
		//住院跳转
		$(".hosp").bind("click",function(){
            var name="&name="+name;

            var id="id="+$(this).find(".id").html();

            var hospName="&hospName="+$(this).find(".p1").html();
            var top="&hideTop=0"+"&hideBasic=1"+"&hideFee=0";
            var result=id+hospName+sex+name+top;

			location.href = LOCALHOST_URL+'/web-bin/m/medical/patient/to_hosp_case_page?'+result;
		});	
		//门诊跳转
		$(".visit").bind("click",function(){
            var name="&name="+name;

            var id="id="+$(this).find(".id").html();

            var hospName="&hospName="+$(this).find(".p1").html();
            var top="&hideTop=0"+"&hideBasic=1"+"&hideFee=0";
            var result=id+hospName+sex+name+top;
            location.href = LOCALHOST_URL+"/web-bin/m/medical/patient/to_visit_case_page?"+result;
		});	
		
		$(".id").hide();
		$(".hugId").hide();
		
	}else{
		if(data!=null && data.res!=0){
			alert(data.msg);
		}
		$("#main_body").css({"border-top":"0px solid #ccc","border-bottom":"0px solid #ccc"});
		$("#main_body").html(
				'<div id="none">'+
					'<img src="/web-bin/mobile/medical/hospital/images/prompt_icon_data.png">'+
					'<p>暂无数据</p>'+
				'</div>'
		);
		$("#none").css({
			'position':'absolute',
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
	}
	
}