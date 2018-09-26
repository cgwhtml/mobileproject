var LOCALHOST_URL=window.HUGPAGE_CONFIG.LOCALHOST_URL;
var PORT=window.HUGPAGE_CONFIG.PORT;
var locationUrl = window.location.origin;
var query=window.location.search;
query=decodeURIComponent(query,"UTF-8");
var hasSubmit=true;
$(function(){
	var hospCardList=[];
	
	$(".sex_js").click(function(){
		$(".sex_js").removeClass("indexImg2").addClass("indexImg1");
		$(this).removeClass("indexImg1").addClass("indexImg2");
	});
	
	
	var phoneNum;
	$(".getCode_js").click(function(){
		if($(".num_js").val()==""){
			alert("请填写手机号码");
			return;
		}
		if(!$(this).hasClass("unable")){
			phoneNum=$(".num_js").val();
			$.ajax({
				type:"get",
				url: locationUrl +'/web-bin/m/weChat/chat/get_code_data'+"?phone="+phoneNum,
				dataType:"json",
				success: function(data){
					data.msg && alert(data.msg);
					if(data.res==0){
						$(".getCode_js").css("background-color","#aaa");
						$(".getCode_js").addClass("unable");
						$(".second_js").show().html(60);
						var second=60;
						var time=setInterval(function(){
							second-=1;
							$(".second_js").html(second);
							second==0 && ($(".getCode_js").css("background-color","#46C0EB"),$(".getCode_js").removeClass("unable"),$(".second_js").hide(),clearInterval(time));
						},1000);
					}
				}
			});
		}
		
	});
	
	var vCode;
	$(".next_js").click(function(){
		if(hasSubmit) {
            hasSubmit=false;
			vCode = $(".codeNum_js").val();
            phoneNum = $(".num_js").val();
            if (phoneNum == "") {
                alert("请填写手机号");
                return;
            }
            if (vCode == "") {
                alert("请填写验证码");
                return;
            }

            $.ajax({
                type: "get",
                url: locationUrl + '/web-bin/m/weChat/chat/next_step_data' + query + "&phone=" + phoneNum + "&vCode=" + vCode,
                dataType: "json",
                success: function (data) {
                    if (data.data) {
                        var hugId = "&hugId=" + data.data.hgId;
                        var accessToken = "&accessToken=" + data.data.accessToken;
                        var usId = "&usId=" + data.data.id;
                        var isNew = "&isNew=" + data.data.isNew;
                        hospCards = "&hospCards=" + JSON.stringify(hospCardList);
                        query = window.location.search + "&phone=" + phoneNum + "&vCode=" + vCode + isNew + hugId + usId + accessToken;
                        location.href = locationUrl + '/web-bin/m/weChat/chat/to_information_page' + query;
                        return;
                    }
                    alert(data.msg);
                    hasSubmit=true;
                },
                error:function () {
                    hasSubmit=true;
                }
            });
        }
	});
});