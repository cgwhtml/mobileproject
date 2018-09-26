var canSubmit=true;
var query=getRequest();//方法在config配置文件中
var pathname=window.location.pathname;
$(function(){
	document.getElementById("background").addEventListener("touchmove", function(event){
		event.preventDefault();
	}, false);
	document.getElementById("textarea").addEventListener("touchmove", function(event){
		event.preventDefault();
	}, false);
	document.getElementById("fake_alert").addEventListener("touchmove", function(event){
		event.preventDefault();
	}, false);
	document.getElementById("loading").addEventListener("touchmove", function(event){
		event.preventDefault();
	}, false);
	
	
	$(".input").each(function(){
		$(this).click(function(){
			$("#main_head").css("position","absolute");
		});
		$(this).blur(function(){
			$("#main_head").css("position","fixed");
		});
	});
	//户口所在地
  	var area1 = new LArea();
    area1.init({
        'trigger': '#householdCode',
        'keys': {
            id: 'value',
            name: 'text'
        },
        'fontClass':"area_current1",
        'type': 2,
        'data': [provs_data, citys_data, dists_data],
        'callBack':function(result){
            if(result.countyCode!=null) {
                $("#householdCodeValue").val(result.countyCode);
            }else{
                $("#householdCodeValue").val(result.cityCode);
            }
        	$("#householdCode").text(result.text);
        }
    });
	//家庭地址
    var area2 = new LArea();
    area2.init({
        'trigger': '#areaCode',
        'keys': {
            id: 'value',
            name: 'text'
        },
        'fontClass':"area_current1",
        'type': 2,
        'data': [provs_data, citys_data, dists_data],
        'callBack':function(result){
            if(result.countyCode!=null) {
                $("#areaCodeValue").val(result.countyCode);
            }else{
                $("#areaCodeValue").val(result.cityCode);
            }
        	$("#areaCode").text(result.text);
        }
    });
	//弹框选择
	$("#check").click(function(){
		var obj=$("#check").data("checkObj");
		var obj_id=obj.attr("id");
		var val="",
			text="";
		if($('input:radio').length>0){
			val=$('input:radio[name="radio"]:checked').val();
			text=$('input:radio[name="radio"]:checked').parent().next().text();
		}else{
			$('input:checkbox[name="checkbox"]:checked').each(function(){
				val+=","+$(this).val();
				text+=","+$(this).parent().next().text();
			});
			val=val.substr(1);
			text=text.substr(1);
		}
		if(text==""){
			text=$("#check").data("checkText");
		}
		obj.text(text);
		// if(obj_id=="check_mNation"||obj_id=="check_hNation"){//民族code不存，用中文
         //    obj.next().val(text);
		// }else{
         //    obj.next().val(val);
		// }
        obj.next().val(val);
		$("#background").hide();
		$("#window").hide();
	});
	//打开弹框初始化选择
	function initChecked(a){
		$("#check").data("checkObj",a);
		$("#check").data("checkText",a.text());
		if($('input:radio').length>0){
			$("#window_in").find("input[name='radio'][value='" + a.next().val() + "']").attr("checked",true);
		}else{
			var str=a.next().val().split(",");
			for(var i=0;i<str.length;i++){
				$('#window_in input:checkbox[name="checkbox"][value='+str[i]+']').attr("checked",true);
			}
		}
		$("input").iCheck({
		    checkboxClass: 'icheckbox_square-blue',
		    radioClass: 'iradio_square-blue',
		    increaseArea: '20%'
		});
		$("#background").show();
		$("#window").show();
	}
	//多选框联系关系
	function checkLink(t){
		$('input').on('ifClicked', function(b){
		    b=$(this).val();
		    if(b==t){
		    	$('input').iCheck('uncheck');
		    }else{
		    	$('input[value="'+t+'"]').iCheck('uncheck');
		    }
		});
	}
	//选择职业
	$("#check_mJob,#check_hJob").click(function(){
		$("#window_in").html(jobDataType);
		initChecked($(this));
	});
	//选择民族
	$("#check_mNation,#check_hNation").click(function(){
		$("#window_in").html(nationData);
		initChecked($(this));
	});
	//选择文化程度
	$("#check_education").click(function(){
		$("#window_in").html(educationDataType);
		initChecked($(this));
	});
	//选择婚姻状况
	$("#check_marriage").click(function(){
		$("#window_in").html(marriageDataType);
		initChecked($(this));
	});
	//选择本次怀孕方式
	$("#check_thisPregWayName").click(function(){
		$("#window_in").html(thisPregWayNameDataType);
		initChecked($(this));
	});
	//选择早孕反应
	$("#check_earlyPregReactionName").click(function(){
		$("#window_in").html(earlyPregReactionNameDataType);
		initChecked($(this));
	});
	//选择一般症状
	$("#check_generalSymptomsName").click(function(){
		$("#window_in").html(generalSymptomsNameData);
		initChecked($(this));
		checkLink("无");
	});
	//选择发病情况
	$("#check_onsetStatusName").click(function(){
		$("#window_in").html(onsetStatusNameData);
		initChecked($(this));
		checkLink("无");
	});
	//选择ABO血型
	$("#check_abo").click(function(){
		$("#window_in").html(aboBloodTypeDateType);
		initChecked($(this));
	});
	//选择Rh血型
	$("#check_rh").click(function(){
		$("#window_in").html(rhBloodTypeDateType);
		initChecked($(this));
	});
	//选择月经量
	$("#check_menstruationLevelName").click(function(){
		$("#window_in").html(menstruationLevelNameDataType);
		initChecked($(this));
	});
	//选择痛经程度
	$("#check_dysmenorrheaLevelName").click(function(){
		$("#window_in").html(dysmenorrheaLevelNameDataType);
		initChecked($(this));
	});
	//个人病史
	$("#check_patientIllnessHisName,#check_fatherIllnessHisName,#check_motherIllnessHisName,#check_husbandIllnessName,#check_husbandFatherIllnessHisName,#check_husbandMontherIllnessHisName").click(function(){
		$("#window_in").html(inllnessHisData);
		initChecked($(this));
		checkLink("无疾病史");
	});
	//过敏史
	$("#check_allergyHisName").click(function(){
		$("#window_in").html(allergyHisNameData);
		initChecked($(this));
		checkLink("无过敏史");
	});
	//妊娠并发史
	$("#check_pregComplicatedHisName").click(function(){
		$("#window_in").html(pregComplicatedHisNameData);
		initChecked($(this));
		checkLink("无");
	});
	//孕产状况
	$(document).on("click",".maternityStatus",function(){
		$("#window_in").html(maternityStatusDataType);
		initChecked($(this));
	});
	//小孩性别
	$(document).on("click",".childSex",function(){
		$("#window_in").html(childSexData);
		initChecked($(this));
	});
    //删除孕产史
    $(document).on("click",".delete_maternity",function(){
        $(this).parent().remove();
    });
	
	//新增孕产史
	$("#add_maternity").click(function(){
		var str='<div class="childItem"><div class="c3"><p><span>生产年月</span><input placeholder="请选择日期" class="input birthDate"></p></div><div class="c3"><p><span>孕产状况</span><span></span><span class="like_input maternityStatus" onclick="">请选择孕产状况</span><input type="hidden" class="maternityStatusValue"></p></div><div class="c3"><p><span>小孩性别</span><span></span><span class="like_input childSex" onclick="">请选择小孩性别</span><input type="hidden" class="childSexValue"></p></div><div class="c3"><p><span>备注</span><input placeholder="点击输入" class="input remarkValue"></p></div><div class="delete_maternity_history delete_maternity" onclick=""><div>删除</div></div></div>';
		$("#content4").append($(str));
		$(".birthDate").mobiscroll($.extend(opt['date'], opt['default1']));
	});
	//顶部选择栏动作
	$("#item1").click(function(){
		$("html,body").animate({scrollTop:$("#content1").offset().top-65},500);
		$(".menu_item_current").removeClass("menu_item_current");
		$(this).addClass("menu_item_current");
	});
	$("#item2").click(function(){
		$("html,body").animate({scrollTop:$("#content2").offset().top-65},500);
		$(".menu_item_current").removeClass("menu_item_current");
		$(this).addClass("menu_item_current");
	});
	$("#item3").click(function(){
		$("html,body").animate({scrollTop:$("#content3").offset().top-65},500);
		$(".menu_item_current").removeClass("menu_item_current");
		$(this).addClass("menu_item_current");
	});
	$("#item4").click(function(){
		$("html,body").animate({scrollTop:$("#content4").offset().top-65},500);
		$(".menu_item_current").removeClass("menu_item_current");
		$(this).addClass("menu_item_current");
	});
	$("#item5").click(function(){
		$("html,body").animate({scrollTop:$("#content5").offset().top-65},500);
		$(".menu_item_current").removeClass("menu_item_current");
		$(this).addClass("menu_item_current");
	});

	//判断孕次产次
	/*$("#pregnancyTimes").change(function(){
		if($("#pregnancyTimes").val()<1){
			$("#pregnancyTimes").val(1);
		}
	});
	$("#bornTimes").change(function(){
		if(parseInt($("#bornTimes").val(),10)>=parseInt($("#pregnancyTimes").val(),10)){
			$("#bornTimes").val(0);
			fake_alert("此项必须小于孕次");
		}
	});*/

	$("#lastMenstruationDate").change(function(){
		if($("#lastMenstruationDate").val()!=""){
			var strTime=$("#lastMenstruationDate").val();
			var date= new Date(Date.parse(strTime.replace(/-/g,"/")));
			if(date<=new Date()){
				var newDate=new Date(date.getFullYear(), (date.getMonth()), date.getDate()+280);
				var month=newDate.getMonth()+1+"";
				var day=newDate.getDate()+"";
				if(month.length==1){
					month=0+month;
				}
				if(day.length==1){
					day=0+day;
				}
				$("#expectedDate").val(newDate.getFullYear()+"-"+month+"-"+day);
			}else{
				fake_alert("末次月经日期不能大于当前日期");
				$("#lastMenstruationDate").val("");
			}
			
		}
	});
	$("#expectedDate").change(function(){
		if($("#expectedDate").val()!=""){
			var strTime=$("#expectedDate").val();
			var date= new Date(Date.parse(strTime.replace(/-/g,"/")));
			var newDate=new Date(date.getFullYear(), (date.getMonth()), date.getDate()-280);
			if(newDate<=new Date()){
				var str = newDate.format("yyyy-MM-dd");
				$("#lastMenstruationDate").val(str);
			}else{
				fake_alert("末次月经日期不能大于当前日期");
				$("#lastMenstruationDate").val("");
				$("#expectedDate").val("");
			}
		}
	});
	
	$("#address").bind({"click":function(){
			$(this).attr("text",$(this).val());
			$(this).val("");
		},
		"blur":function(){
			if($(this).val()==""){
				$(this).val("请输入家庭住址详细信息  如（XXX街道XXX小区）");
			}
		}
	});
		
	//填写描述
	$("#textarea").find("textarea").css({
		"text-align":"left",
		"color":"#000",
	});
	$("#textarea").find("textarea").bind({"click":function(){
  			if($(this).val()=="点击输入描述内容"){
  				$(this).val("");
  				$(this).css({
  		  			"text-align":"left",
  		  			"color":"#000",
  		  		});
  			}
		},
		"blur":function(){
			if($(this).val()==""){
				$(this).val("点击输入描述内容");
				$(this).css({
		  			"text-align":"left",
		  			"color":"#aaa",
		  		});
			}
		}
	});
	$(".button").each(function(){
		$(this).attr("name",$(this).prev().prev().prev().prev().html());
		if($(this).next().val()!=""){
			$(this).attr("text",$(this).next().val());
		}else{
			$(this).attr("text","点击输入描述内容");
		}
		$(this).click(function(){
			
			$("#background").show();
			$("#textarea").show();
			$("#textarea_head").html($(this).attr("name"));
			$("#textarea").find("textarea").val($(this).attr("text"));
			
			if($("#textarea").find("textarea").val()=="点击输入描述内容"){
				$("#textarea").find("textarea").css({
					"text-align":"left",
					"color":"#aaa",
				});
			}
			
			var e=$(this);
			
			$("#submit2").click(function(){
				$("#textarea").find("textarea").css({
					"text-align":"left",
  		  			"color":"#000",
				});
				e.attr("text",$("#textarea").find("textarea").val());
				e.next().val($("#textarea").find("textarea").val());
				$("#background").hide();
				$("#textarea").hide();
				$("#submit2").unbind("click");
			});
		});
	});
	$(".window_in").css("height",$(".window").height()-100);
});
function fake_alert(text,element){
	$("#background").show();
	$("#fake_alert").show();
	$("#msg").html(text);
	$("#sure").click(function(){
		$("#background").hide();
		$("#fake_alert").hide();
		canSubmit=true;
	});
	element&&$("html,body").animate({scrollTop:$(element).offset().top-75},500);
}
//表单提交加验证
function checkForm(){
	if(canSubmit){
		canSubmit=false;

		var patName = $("#patName").val();
		if($.trim(patName)==''){
			fake_alert("姓名必填","#patName");
			return false;
		}
		if(patName.length>25){
			fake_alert("姓名长度不能超过25个字","#patName");
			return false;
		}
		
		var idCard = $("#patIdcard").val();
		if($.trim(idCard)==''){
			fake_alert("身份证号码必填","#patIdcard");
			return false;
		}
		if (!IdCardValidate(idCard)) {
			fake_alert("请输入正确格式的身份证号","#patIdcard");
	        return false;
	    }
		
		var mobileNumber = $("#patMobile").val();
		var isMobile=/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;
		if($.trim(mobileNumber)==''){
			fake_alert("联系电话必填","#patMobile");
			return false;
		}
		if(!isMobile.test(mobileNumber)){
			fake_alert("请输入正确格式的联系电话","#patMobile");
			return false;
		}
		
		var job = $("#career").val();
		if($.trim(job)==''){
			fake_alert("职业必填","#check_mJob");
			return false;
		}
		
		var nation = $("#nation").val();
		if($.trim(nation)==''){
			fake_alert("民族必填","#check_mNation");
			return false;
		}
		
		var education = $("#education").val();
		if($.trim(education)==''){
			fake_alert("文化程度必填","#check_education");
			return false;
		}
		
		var maritalStatus = $("#maritalStatus").val();
		if($.trim(maritalStatus)==''){
			fake_alert("婚姻状况必填","#check_marriage");
			return false;
		}
		
		var workUnit = $("#workUnit").val();
		if($.trim(workUnit)==''){
			fake_alert("工作单位必填","#workUnit");
			return false;
		}
		if(workUnit.length>50){
			fake_alert("工作单位不能超过50个字","#workUnit");
			return false;
		}
		
		var householdCodeValue = $("#householdCodeValue").val();
		if($.trim(householdCodeValue)==''){
			fake_alert("户口所在必填","#householdCode");
			return false;
		}
		
		var addressDetail = $("#addressDetail").val();
		var areaCodeValue = $("#areaCodeValue").val();
		if(addressDetail==""||areaCodeValue==""){
			fake_alert("家庭地址必填","#areaCode");
			return false;
		}
		
		var husbandAge = $("#husbandAge").val();
		if(!IsNumberValidateFun(husbandAge)){
			fake_alert("年龄必须是数字","#husbandAge");
			return false;
		}
		
		var contactsMobile = $("#contactsMobile").val();
		if(contactsMobile!=""&&!isMobile.test(contactsMobile)){
			fake_alert("请输入正确格式的丈夫电话","#contactsMobile");
			return false;
		}

        var husbandIdcard = $("#husbandIdcard").val();
        if (husbandIdcard!=""&&!IdCardValidate(husbandIdcard)) {
            fake_alert("请输入正确格式的丈夫身份证号","#husbandIdcard");
            return false;
        }
		
		var lastMenstrualPeriod = $("#lastMenstruationDate").val();
		if($.trim(lastMenstrualPeriod)==''){
			fake_alert("末次月经日期必填","#lastMenstruationDate");
			return false;
		}
		
		var babyMoveWeeks = $("#babyMoveWeeks").val();
		if(!IsNumberValidateFun(babyMoveWeeks)){
			fake_alert("胎动孕周必须是数字","#babyMoveWeeks");
			return false;
		}
		
		var earlyPregReactionWeeks = $("#earlyPregReactionWeeks").val();
		if(!IsNumberValidateFun(earlyPregReactionWeeks)){
			fake_alert("早孕反应孕周必须是数字","#earlyPregReactionWeeks");
			return false;
		}
		
		var pregnancyTimes = $("#pregnancyTimes").val();
		if(!IsNumberValidateFun(pregnancyTimes)){
			fake_alert("孕次必须是数字","#pregnancyTimes");
			return false;
		}
		
		var menarcheAge = $("#menarcheAge").val();
		if(!IsNumberValidateFun(menarcheAge)){
			fake_alert("初潮年龄必须是数字","#menarcheAge");
			return false;
		}
		
		var menstrualCycle = $("#menstrualCycle").val();
		if(!IsNumberValidateFun(menstrualCycle)){
			fake_alert("月经周期必须是数字","#menstrualCycle");
			return false;
		}
		
		var menstruationDays = $("#menstruationDays").val();
		if(!IsNumberValidateFun(menstruationDays)){
			fake_alert("经期必须是数字","#menstruationDays");
			return false;
		}

        var pregnancyTimes=$("#pregnancyTimes").val();
        if(!IsNumberValidateFun(pregnancyTimes)){
            fake_alert("孕次必须是数字","#pregnancyTimes");
            return false;
        }

        var bornTimes = $("#bornTimes").val();
        if(!IsNumberValidateFun(bornTimes)){
            fake_alert("产次必须是数字","#bornTimes");
            return false;
        }
        if(parseInt(bornTimes,10)>=parseInt(pregnancyTimes,10)){
            fake_alert("产次必须小于孕次","#pregnancyTimes");
            return false;
        }
		
		if($("#pregnancyTimes").val()==null){
			$("#pregnancyTimes").val(1);
		}
		if($("#bornTimes").val()==null){
			$("#bornTimes").val(0);
		}
		//组织机构代码
        if(pathname.indexOf("/oneparam/")>=0){
            $("#hospCode").val(pathname.split("/").pop());
        }else{
            $("#hospCode").val(query.hospCode);
		}
		//孕产史
	    var gestationHistoryList=[];
	    $(".childItem").each(function(b){
	    	var birthDate=$.trim($(this).find(".birthDate").val());
	    	var maternityStatusCode=$(this).find(".maternityStatusValue").val();
	    	var maternityStatusName=$(this).find(".maternityStatus").text();
	    	var childSexCode=$(this).find(".childSexValue").val();
	    	var remark=$.trim($(this).find(".remarkValue").val());
	    	if(birthDate !="" || maternityStatusCode !="" || childSexCode !="" || remark !=""){
	    		b={
	    	    	"birthDate":birthDate,
	    	    	"maternityStatusName":maternityStatusName,
	    	    	"maternityStatusCode":maternityStatusCode,
	    	    	"childSexCode":childSexCode,
	    	    	"remark":remark
		    	};
	    		gestationHistoryList.push(b);
	    	}
	    });

        var localhostUrl=window.location.origin;
	    //var port=window.HUGPAGE_CONFIG.PORT;
	    var jsonObj=$("#myForm").serializeObject();
	    jsonObj.gestationHistoryList=JSON.stringify(gestationHistoryList);
	    jsonObj.education=$.trim($('#check_education').text());
	    jsonObj.career=$.trim($('#check_mJob').text());
	    jsonObj.nation=$.trim($('#check_mNation').text());
	    jsonObj.maritalStatus=$.trim($('#check_marriage').text());
	    var husbandCareerName=$.trim($('#check_hJob').text());
		(husbandCareerName=="请选择职业") && (husbandCareerName="");
	    jsonObj.husbandCareerName=husbandCareerName;
        var abcBloodName=$.trim($('#check_abo').text());
        (abcBloodName=="请选择ABO血型") && (abcBloodName="");
        jsonObj.abcBloodName=abcBloodName;
        var rhBloodName=$.trim($('#check_rh').text());
        (rhBloodName=="请选择Rh血型") && (rhBloodName="");
        jsonObj.rhBloodName=rhBloodName;
        var husbandNationName=$.trim($('#check_hNation').text());
        (husbandNationName=="请选择民族") && (husbandNationName="");
        jsonObj.husbandNationName=husbandNationName;
        var earlyPregReactionName=$.trim($('#check_earlyPregReactionName').text());
        (earlyPregReactionName=="请选择") && (earlyPregReactionName="");
        jsonObj.earlyPregReactionName=earlyPregReactionName;
        var thisPregWayName=$.trim($('#check_thisPregWayName').text());
        (thisPregWayName=="请选择") && (thisPregWayName="");
        jsonObj.thisPregWayName=thisPregWayName;
		var menstruationLevelName=$.trim($('#check_menstruationLevelName').text());
        (menstruationLevelName=="请选择月经量") && (menstruationLevelName="");
        jsonObj.menstruationLevelName=menstruationLevelName;
        var dysmenorrheaLevelName=$.trim($('#check_dysmenorrheaLevelName').text());
        (dysmenorrheaLevelName=="请选择痛经程度") && (dysmenorrheaLevelName="");
        jsonObj.dysmenorrheaLevelName=dysmenorrheaLevelName;
        console.log(jsonObj);
		//提交
		$.ajax({
	        type:"post",
	        url: localhostUrl+'/web-bin/m/nosen/followup/maternalChild/system/submit_maternityFiling_data',
	        data:jsonObj,
	        success:function(data){
	        	if(data.res==0){
	        		fake_alert("提交成功！");
	        	}else{
	        		fake_alert("提交失败！请检查网络是否正常。");
	        	}
	        	canSubmit=true;
	        },
	        error:function () {
	        	fake_alert("提交失败！请检查网络是否正常。");
	        	canSubmit=true;
	            return;
	        }
	    });
	}
}
//日期格式化
Date.prototype.format = function(format)
{
 var o = {
 "M+" : this.getMonth()+1, //month
 "d+" : this.getDate(),    //day
 "h+" : this.getHours(),   //hour
 "m+" : this.getMinutes(), //minute
 "s+" : this.getSeconds(), //Second
 "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
 "S" : this.getMilliseconds() //millisecond
 }
 if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
 (this.getFullYear()+"").substr(4 - RegExp.$1.length));
 for(var k in o)if(new RegExp("("+ k +")").test(format))
 format = format.replace(RegExp.$1,
 RegExp.$1.length==1 ? o[k] :
 ("00"+ o[k]).substr((""+ o[k]).length));
 return format;
}
//表单转json对象
$.fn.serializeObject = function()
{
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};
//数字校验
var numberValidate = /^[0-9]*$/;
function IsNumberValidateFun(num) {
    return numberValidate.test(num);
}