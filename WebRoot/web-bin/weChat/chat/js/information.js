var LOCALHOST_URL=window.HUGPAGE_CONFIG.LOCALHOST_URL;
var PORT=window.HUGPAGE_CONFIG.PORT;
var locationUrl = window.location.origin;
var query=window.location.search;
query=decodeURIComponent(query,"UTF-8");
var SERVER_URL=window.HUGPAGE_CONFIG.SERVER_URL;

$(function(){
	var isNew=1;
	
	$(".sex_js").click(function(){
		$(".sex_js").removeClass("informationImg2").addClass("informationImg1");
		$(this).removeClass("informationImg1").addClass("informationImg2");
	});
	$(".informationImg3_js").click(function(){
		$(this).parent().parent().append('<div><select class="choseType choseType_js"><option>点此选择卡类型</option><option value="1">就诊卡号</option><option value="2">住院号</option></select><input placeholder="请填写正在使用的卡号" type="text" class="hospCard_js"><div class="delete delete_js">删除</div></div>');
	});
	
	
	var hospCode="?hospCode="+query.split("hospCode=")[1].split("&")[0];
	var hgId="&hgId="+query.split("hugId=")[1].split("&")[0];
	
	var querys=hospCode+hgId;
	
	$.ajax({
		type:"get",
		url: locationUrl +'/web-bin/m/weChat/chat/query_information_data'+querys,
		dataType:"json",
		success: function(data){
			if(data.res==0 && data.data){
				data.data.name && $(".name_js").val(data.data.name);
				data.data.card && $(".card_js").val(data.data.card);
				if(data.data.sex){
					var sex=data.data.sex;
					sex=="1" && $(".female").removeClass("informationImg1").addClass("informationImg2") || $(".male").removeClass("informationImg1").addClass("informationImg2");
				}
				
				if(data.data.medicalCards){
					var hospCards=data.data.medicalCards;
					for(var i=0;i<hospCards.length;i++){
						i>0 
							&& $(".information_js").append('<div><select class="choseType choseType_js"><option>点此选择卡类型</option><option value="1">就诊卡号</option><option value="2">住院号</option></select><input placeholder="请填写正在使用的卡号" type="text" class="hospCard_js"><div class="delete delete_js">删除</div></div>')
							|| $(".hospCard_js").attr("readonly",false);
						$(".hospCard_js:last").val()=="" && $(".hospCard_js:last").val(hospCards[i].hospCard);
						$(".hospCard_js:last").prev().val(hospCards[i].cardType);
					}
				}
				
				if(data.data.checkStatus==3){
					$(".name_js").attr("readonly",true);
					$(".card_js").attr("readonly",true);
					$(".sex_js").unbind("click");
				}
				
			}else if(data.msg){
				alert(data.msg);
			}
		}
	});
	
	if(query.split("&pageBefore=")[1] && query.split("&pageBefore=")[1].split("&")[0]==1){
		isNew=0;
		$(".pwd_js").parent().hide();
		
	}else{
		if(query.split("isNew=")[1]){
			isNew=query.split("&isNew=")[1].split("&")[0].split(",");
			if(isNew==0){
				$(".pwd_js").val("******").attr("readonly",true);
			}
		}
	}
	
	

	
	$(document).on("change",".choseType_js",function(){
		$(this).val()!="1" && $(this).val()!="2" && $(this).next().val("");
	});
	
	$(document).on("click",".delete_js",function(){
		$(this).parent().remove();
	});
	
	$(document).on("click",".hospCard_js",function(){
		if($(this).prev().val()!="1" && $(this).prev().val()!="2"){
			$(this).attr("readonly",true);
			alert("请选择卡类型");
			return;
		}else{
			$(this).attr("readonly",false);
		}
	});
	
	
	var name="";
	var sex="";
	var card="";
	var pwd="";
    var hugId="&hugId="+query.split("hugId=")[1].split("&")[0];
    var usId="&usId="+query.split("usId=")[1].split("&")[0];
    var accessToken="&accessToken="+query.split("accessToken=")[1].split("&")[0];
    var phone="&phone="+query.split("phone=")[1].split("&")[0];
    var urlType="&urlType="+query.split("urlType=")[1].split("&")[0];
    $(".pass_js").click(function(){
        var queryStr=hospCode+hugId+usId+accessToken+phone+urlType;
    	if(queryStr.split("urlType=")[1].split("&")[0]==1){
            location.href = locationUrl +'/web-bin/m/nosen/followup/maternalChild/handBook/to_start_route'+queryStr;
        }else{
            location.href = locationUrl +'/web-bin/m/weChat/chat/to_content_page'+queryStr;
        }
    });
	$(".submit_js").click(function(){
		
		if($(".name_js").val()==""){
			return(alert("请填写姓名！"));
		}
		if(!$(".informationImg2").hasClass("sex_js")){
			return(alert("请选择性别！"));
		}
		if($(".card_js").val()==""){
			return(alert("请填写身份证号！"));
		}
		if($(".pwd_js").val()=="" && isNew==1){
			return(alert("请填写密码！"));
		}

		name="&name="+$(".name_js").val();
		sex="&sex="+($(".informationImg2").hasClass("male")?2:1);
		card="&card="+$(".card_js").val();
		if(isNew==1){
			pwd="&pwd="+$(".pwd_js").val();
		}
		isNew==0 && (pwd="");

        var hospCards=[];
		var hospCard;
		$(".hospCard_js").each(function(){
			if(!$(this).val()==""){
				hospCard = {
						hospCard:$(this).val(),
						cardType:$(this).prev().val(),
				};
				hospCards.push(hospCard);
			}
		});
		
		var data= {
				hospCode:query.split("hospCode=")[1].split("&")[0],
				hgId:query.split("hugId=")[1].split("&")[0],
				usId:query.split("usId=")[1].split("&")[0],
				accessToken:query.split("accessToken=")[1].split("&")[0],
				phone:query.split("phone=")[1].split("&")[0],
				name:$(".name_js").val(),
				sex:($(".informationImg2").hasClass("male")?2:1),
				card:$(".card_js").val(),
				pwd:$(".pwd_js").val(),
				medicalCards:hospCards
		};
		var strJSON=JSON.stringify(data);
		
		var queryStr=hospCode+hugId+usId+accessToken+phone+name+sex+card+pwd+urlType;
		$.ajax({
			type:"post",
			data: strJSON,
			url: locationUrl +'/web-bin/m/weChat/chat/submit_information_data',
			dataType:"json",
			success: function(data){
				if(data.res==0){
                    if(queryStr.split("urlType=")[1].split("&")[0]==1){
                        location.href = locationUrl +'/web-bin/m/nosen/followup/maternalChild/handBook/to_start_route'+queryStr;
					}else{
                        location.href = locationUrl +'/web-bin/m/weChat/chat/to_content_page'+queryStr;
					}
					return;
				}
				alert(data.msg);
			}
		});
	});
	
});