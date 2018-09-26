var LOCALHOST_URL=window.HUGPAGE_CONFIG.LOCALHOST_URL;
var QUESTION_URL=window.HUGPAGE_CONFIG.QUESTION_URL;
var PORT=window.HUGPAGE_CONFIG.PORT;
var locationUrl = window.location.origin;
var SERVER_URL=window.HUGPAGE_CONFIG.SERVER_URL;//读取图片服务器路径
var query_info=getRequest();
var hospCode=query_info.hospCode||sessionStorage.getItem("hospCode");
var hgId=query_info.hugId||sessionStorage.getItem("hugId");
var usId=query_info.usId||sessionStorage.getItem("usId");
var accessToken=query_info.accessToken||sessionStorage.getItem("accessToken");
var hospName;
var clickflag=false;
var query=window.location.search;
query=decodeURIComponent(query,"UTF-8");
var num;//需要加载的页码标号
var size=10;//每页的数据条数
var hasNextPage=true;

$(function(){
	$(".main_body").height($(window).height()-$(".main_head").height()-$(".main_bottom").height()-10).css({'margin-top':$(".main_head").height()});
    $(".main_body").niceScroll({
        railpadding : {top: 0,right : 0,left : 0,bottom : 0}
    });
	var name="";
	var sex="";
	var card="";
	var pwd="";
	var hospCardList=[];
	var phone;
	var categType;
	var protocol="&protocol=121021";
	var pageSize="&pageSize=10";
	var page;
	var canChange=0;
	num=1;
	
	query.split("name=")[1] && $(".name_js").val(query.split("name=")[1].split("&")[0]);
	query.split("card=")[1] && $(".card_js").val(query.split("card=")[1].split("&")[0]);
	query.split("phone=")[1] && $(".phone_js").val(query.split("phone=")[1].split("&")[0].substring(0,3)+"****"+query.split("phone=")[1].split("&")[0].substring(query.split("phone=")[1].split("&")[0].length-4,query.split("phone=")[1].split("&")[0].length));
	query.split("sex=")[1] && $(".sex_js").val(query.split("sex=")[1].split("&")[0]=="1"?"女":"男");
	if(query.split("&hospCard=")[1]){
		var hospCards=query.split("&hospCard=")[1].split("&")[0].split(",");
		for(var i=0;i<hospCards.length-1;i++){
			i>0 && $(".information_content").append('<div class="more_js"><span>就诊卡号/住院号</span><input type="text" class="hospCard hospCard_js" readonly="readonly"></div>');
			$(".hospCard_js").each(function(){
				$(this).val()=="" && $(this).val(hospCards[i]);
				return;
			});
		}
	}
	
	$(document).on("click",".delete_js",function(){
		$(this).parent().remove();
	});

    hospCode="&hospCode="+query.split("hospCode=")[1].split("&")[0];
	phone="?phone="+query.split("phone=")[1].split("&")[0];
	categType="&category=6";
	page="&pageNumber="+num+"&pageSize="+size;
	querys=phone+categType+hospCode+protocol+page+'&hugId='+hgId;
	console.log(querys);
	setTimeout(function(){
		$.ajax({
			type:"get",
			url: locationUrl+'/web-bin/m/weChat/chat/query_education_newdata'+querys,
			dataType:"json",
			success: function(data){
				console.log(data);
				CallBack(data,6);
			}
		});
	}, 1000);
	
	$(".contentImg3_js").click(function(){
		$(this).parent().parent().append('<div class="more_js"><span>就诊卡号/住院号</span><input type="text" class="hospCard hospCard_js" readonly="readonly"></div>');
	});
	
	$(".chooseEducation_js").click(function(){
		$(".education_js").show();
		$(".personal_info").hide();
		num=1;
        hasNextPage=true;
		if($(this).hasClass("unchosen")){
			$(".e1").remove();
			$(".e").html("");
			$(".chosen").removeClass("chosen").addClass("unchosen");
			$(this).removeClass("unchosen").addClass("chosen");

			phone="?phone="+query.split("phone=")[1].split("&")[0];
			categType="&category=6";
			hospCode="&hospCode="+query.split("hospCode=")[1].split("&")[0];
			pageNumber="&pageNumber=1";
            page="&pageNumber="+num+"&pageSize="+size;
            querys=phone+categType+hospCode+protocol+page+'&hugId='+hgId;
			$.ajax({
				type:"get",
				url: locationUrl+'/web-bin/m/weChat/chat/query_education_newdata'+querys,
				dataType:"json",
				success: function(data){
					console.log(data);
					CallBack(data,6);
				}
			});
		}
		
		
		
	});
	
	$(".chooseQuestion_js").click(function(){
		num=1;
        hasNextPage=true;
		$(".education_js").show();
		$(".personal_info").hide();
		
		if($(this).hasClass("unchosen")){
			$(".e1").remove();
			$(".e").html("");
			$(".chosen").removeClass("chosen").addClass("unchosen");
			$(this).removeClass("unchosen").addClass("chosen");
			
			phone="?phone="+query.split("phone=")[1].split("&")[0];
			categType="&category=0";
			hospCode="&hospCode="+query.split("hospCode=")[1].split("&")[0];
			pageNumber="&pageNumber=1";
            page="&pageNumber="+num+"&pageSize="+size;
            querys=phone+categType+hospCode+protocol+page+'&hugId='+hgId;
			$.ajax({
				type:"get",
				url: locationUrl+'/web-bin/m/weChat/chat/query_education_newdata'+querys,
				dataType:"json",
				success: function(data){
					CallBack(data,0);
				}
			});
		}
		
	});
	
	$(".chooseInformation_js").click(function(){
		$(".education_js").hide();
		$(".personal_info").show();
		$(".phone_js").attr("readonly","readonly");
		
		if($(this).hasClass("unchosen")){
			$(".chosen").removeClass("chosen").addClass("unchosen");
			$(this).removeClass("unchosen").addClass("chosen");
            //加载二维码
            $("#QRcode img").attr("src",SERVER_URL+"/hug-web/r/file/getQRCode/"+hgId);
            //查询医院名字
            // $.ajax({
            //     on: true,
            //     type:"get",
            //     url:LOCALHOST_URL+':'+PORT+'/web-bin/m/weChat/weChatPublic/query_hospName_data?hospCode='+hospCode,
            //     dataType:"json",
            //     success: function(data){
            //         console.log(data);
            //         if(data.data&&data.res==0){
            //             hospName=data.data[0].name;
            //             $("#hospName").text(hospName);
            //         }
            //     }
            // });
            $.ajax({
                on: true,
                type:"get",
                url: locationUrl +'/web-bin/m/weChat/WeChatPublic/get_userInfo_data?hgId='+hgId+'&hospCode='+hospCode,
                dataType:"json",
                success: function(data){
                    console.log(data);
                    if(data.data&&data.res==0){
                        $("#name").text(data.data.name);
                        if(data.data.sex==2){
                            $("#sex").text("男")
                        }else if(data.data.sex==1){
                            $("#sex").text("女");
                        }
                        $("#card").text(data.data.card);
                        $("#phone").text(data.data.phone);
                        $("#card").text(data.data.card);
                        if(data.data.medicalCards){
                            for(var i=0;i<data.data.medicalCards.length;i++){
                                if(data.data.medicalCards[i].cardType==1){
                                    data.data.medicalCards[i].cardTypeTxt="就诊卡号"
                                }else if(data.data.medicalCards[i].cardType==2){
                                    data.data.medicalCards[i].cardTypeTxt="住院号"
                                }
                            }
                            $(".hospCard_box").setTemplateElement("hospCard_temp").processTemplate(data.data.medicalCards);
                        }
                        if(data.data.checkStatus!==0){//0可修改，其他不可修改
                            clickflag=false;
                            $(".user_input .user_arrow").hide();
                            $(".user_input .QRcode .user_arrow").show();
                        }else{
                            clickflag=true;
                        }
                    }
                }
            });
            //二维码大图
            $("body").on("tap",".QRcode",function(event){
                var qr_title=$("#name").text()+"的二维码"||"二维码";
                art.dialog({
                    title:qr_title,
                    content:"<img class='qrcode_show' src='' alt='二维码' style='display:block;width:200px;height:200px;margin:0 auto !important;padding:0 !important;'>医生扫描二维码，更好的管理患者。",
                    lock:true
                });
                $(".qrcode_show").attr("src",SERVER_URL+"/hug-web/r/file/getQRCode/"+hgId);
                event.stopPropagation();
            });
            $("body").on("tap",".name,.sex,.card",function(event){
                if(clickflag){
                    location.href=locationUrl+'/web-bin/m/weChat/WeChatPublic/to_userInfoImprove_page?hgId='+hgId+"&hospCode="+hospCode+"&urlType=5";
                    event.stopPropagation();
                }else{
                    return false;
                }
            });
            $("body").on("tap",".footer",function(event){
                location.href=locationUrl+'/web-bin/m/weChat/WeChatPublic/to_addHospCard_page?hgId='+hgId+"&hospCode="+hospCode+'&fromType=0'+'&usId='+usId+'&accessToken='+accessToken;
                event.stopPropagation();
            });
		}
	});
	
	
	
	$(".submit_js").click(function(){
		name="&name="+$(".name_js").val();
		sex="&sex="+($(".sex_js").val()=="男"?2:1);
		card="&card="+$(".card_js").val();
		checkStatus="&checkStatus="+canChange;
		hospCards="&hospCards="+JSON.stringify(hospCardList);
		
		var pageBefore="&pageBefore="+1;

		location.href = locationUrl+"/web-bin/m/weChat/chat/to_information_page"+query+pageBefore;
		
	});
	
	$(document).on("tap",".education_list",function(){
		var categType=$(this).attr("categType");
		if(categType=="6"){
            location.href = locationUrl+"/web-bin/m/nosen/oneparam/followup/education/to_checkEducation_page/"+$(this).find(".id").html();
		}else{
			location.href = locationUrl+"/web-bin/m/nosen/oneparam/followup/form/to_replyForm_page/"+$(this).find(".id").html();
		}
		/*($(this).find(".isRead").html()=="未回复" || $(this).find(".isRead").html()=="未读")
			&& (location.href = QUESTION_URL+"/Hug/frame/questionnaire.jsp?id="+$(this).find(".id").html())
			|| (location.href = QUESTION_URL+"/Hug/frame/questionnaireAnswer.jsp?id="+$(this).find(".id").html());*/
	});
	
	
	// $('.main').on("scroll",function(){
	// 	console.log(111);
	// 	var a=$(document).scrollTop();
	// 	var b=$(document).height()-$(window).height();
	// 	var type=$(".chooseEducation_js").hasClass("chosen")?6:($(".chooseQuestion_js").hasClass("chosen")?0:1);
	// 	if((a-b)>-90 && hasNextPage==true && type!=1){
	// 		$("#loading").show();
	// 		var $div=$('<div class="e"><div>');
	// 		$(".e").removeClass("e").addClass("e1").after($div);
	// 		num++;
	// 		page="&pageNumber="+num+"&pageSize="+size;
	// 		querys=phone+categType+hospCode+hgId+protocol+page;
	// 		$.ajax({
	// 			async:true,
	// 			on: true,
	// 			type:"get",
	// 			url: QUESTION_URL+'/Hug/index.html'+querys,
	// 			dataType:"json",
	// 			beforeSend:function(){
	// 				$("#loading").show();
	// 			},
	// 			success: function(data){
	// 				console.log(data);
	// 				CallBack(data,type);
	// 			}
	// 		});
	// 	}
	// });
    //滚动加载列表页面
    $(".main_body").scroll(function(){
        var scrollTop = $(this).scrollTop();
        var scrollHeight = sessionStorage.getItem('scrollHeight')||$(".e").height();
        var windowHeight =$(this).height();
        sessionStorage.setItem('scrollHeight',scrollHeight);
        var yushu=(scrollTop+windowHeight)%scrollHeight;
        var type=$(".chooseEducation_js").hasClass("chosen")?6:($(".chooseQuestion_js").hasClass("chosen")?0:1);
        if(yushu==0&& hasNextPage==true && type!=1){
            // $("#loading").show();
            var $div=$('<div class="e"><div>');
            $(".e").removeClass("e").addClass("e1").after($div);
            // var $div=$('<div class="e"><div>');
            // $(".e").removeClass("e").addClass("e1").after($div);
            num++;
            hospCode="&hospCode="+query.split("hospCode=")[1].split("&")[0];
            page="&pageNumber="+num+"&pageSize="+size;
            querys=phone+categType+hospCode+protocol+page+'&hugId='+hgId;
            $.ajax({
                async:true,
                on: true,
                type:"get",
                url: locationUrl+'/web-bin/m/weChat/chat/query_education_newdata'+querys,
                dataType:"json",
                beforeSend:function(){
                    $("#loading").show();
                },
                success: function(data){
                    console.log(data);
                    CallBack(data,type);
                }
            });
        }
    });
	
});






function CallBack(data,type){
	if(data.data && data.data.result.length>0){
		//data.page.result.length==0 && alert("暂无数据");
		$(".e").setTemplateElement("education").processTemplate(data.data.result);
		
		$(".read").each(function(){
			($(this).html()=="已读" || $(this).html()=="已回复") && $(this).removeClass("read").addClass("unRead");
		});
		type==6 && $(".contentImg2").removeClass().addClass("contentImg1") || $(".contentImg1").removeClass().addClass("contentImg2");
		hasNextPage=data.page.hasNextPage;
	}else{
		$(".e").html('<div class="nodata"><img src="/web-bin/resources/images/nodata.png" alt=""><br/><span >暂无宣教/表单</span></div>');
	}
}