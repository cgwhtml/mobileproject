var localhostUrl=window.location.origin;//window.HUGPAGE_CONFIG.LOCALHOST_URL;
var query=getRequest();//方法在config配置文件中
var fetalHeartUrl=window.HUGPAGE_CONFIG.FETALHEART_URL;//胎心录音文件读取的url
$(function(){
	$("#doctorName").text(unescape(query.userName));
	$("#hospCode").val(query.hospCode);
	$("#healthId").val(query.healthId);
	//查询某一个健康数据
	$.ajax({
		type: "GET",
	    url: localhostUrl+'/web-bin/p/followup/healthMonitor/query_oneHealth_data?healthId='+query.healthId,
		beforeSend:function(XMLHttpRequest){
	    	$("#loading").html("<img src='/web-bin/resources/images/loading_1.gif' width='30%' height='30%'/>");
        },
	    success: function(data){
	    	ajaxCallBack(data);
	    },
	    error:function(){
	        return;
        }
	});
	//查询病人设置的监测信息
	$.ajax({
		type: "GET",
		url: localhostUrl+'/web-bin/p/followup/healthMonitor/query_fetalHeart_configure_data?healthType=1&phone='+query.phone+"&hospCode="+query.hospCode,
	    success: function(data){
	    	$("#name").text(data.data.name);
	    	$("#age").text(data.data.age);
	    	$("#phone").text(data.data.phone);
	    },
	    error:function(){
	        return;
        }
	});
	$("body").changeCheckbox({name:'checkbox1'});
	$("body").changeCheckbox({name:'checkbox2'});
});
function ajaxCallBack(data){
	$("#loading").html("");
	if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)){
		$("#flash_nav").show();
		//-----基本信息处理-----//
		$("#gestationalWeeks").text(data.data.instruction.split("/")[3]);
	    //---------- 监测是时间处理----------//
	    var measuringTime=data.data.measuringTime;
	    var measuringLong=data.data.instruction.split("/")[2];//监测时长
	    var audioDuration=parseInt(measuringLong.split(":")[0]*60,10)+parseInt(measuringLong.split(":")[1],10);
	    $("#measuringBeginTime").text(measuringTime);
		//监护结束时间处理
		var endStr =  measuringTime.replace(/-/g,"/");
		var endDate = new Date(endStr);
		var newTime = new Date(endDate.getTime()+audioDuration*1000); //毫秒转普通时间
		$("#measuringEndTime").text(newTime.format("yyyy-MM-dd hh:mm:ss"));
		//--------------胎心，胎动，宫缩数据的处理-----------///
	    var fetalMoveDataArray=new Array();//以左侧为准的刻度
	    var fetalHeartDataArray=new Array();
	    var uterusDataArray=new Array();
	
		var resourceId=data.data.resourceId+".mp3";//音频文件id
  //    var  musicFile = "/resources/swf/"+resourceId;//
		var musicFile = fetalHeartUrl+resourceId;
	    //replace(/\s/ig,'')去除前后空格
	  	var fetalHeartArray=data.data.healthValue.substring(1,data.data.healthValue.length-1).replace(/\s/ig,'').split(",");
	  	if(fetalHeartArray!=null&&fetalHeartArray!="undefined"&&fetalHeartArray.length>0&&fetalHeartArray!=""){
	  		for(var i=0;i<fetalHeartArray.length;i++){
    		 fetalHeartDataArray[i]=fetalHeartArray[i].substring(1,fetalHeartArray[i].length-1);
     		}
	  	}
	     
	    var  uterusArray=data.data.instruction.split("/")[4].replace("[","").replace("]","").replace(/\s/ig,'').split(",");
	    if(uterusArray!=null&&uterusArray!="undefined"&&uterusArray.length>0&&uterusArray!=""){
	    	for(var i=0;i<uterusArray.length;i++){
	    	uterusDataArray[i]=uterusArray[i].substring(1,uterusArray[i].length-1);
	    	}
	    }
	    var befetalMoveArray=data.data.instruction.split("/")[1].replace("[","").replace("]","").replace(/\s/ig,'').split(",");
	    if(befetalMoveArray!=null&&befetalMoveArray!="undefined"&&befetalMoveArray.length>0&&befetalMoveArray!=""){//
	    	for(var i=0;i<befetalMoveArray.length;i++){
        		fetalMoveDataArray[i] =parseInt(befetalMoveArray[i].split(":")[0].substring(1,befetalMoveArray[i].split(":")[0].length)*60)+
                parseInt(befetalMoveArray[i].split(":")[1].substring(0,befetalMoveArray[i].split(":")[1].length-1));
	        }
	    }
	    var flex=document.getElementById("print");
	    var bmptimer=null;
	    var circle=null;
	    var timer= null;
	    var flage=false;//控制动画转不转的变量
	    //--------------bmp处理-------------//
	    timer=setInterval(function () { 
	    	if(flex!==null&&flex!=="undefined"){
	    		if(getFlex()==1){
	    			window.clearInterval(timer);
	    			circle=setInterval(begin,500);
	    			function begin(){
	    				if(flex.getClearRing()){
	    					$(".valueNow").text(0);
	    				}
	    				if(flex.getPlayStatus()==2){//开始
	    					window.clearInterval(circle);
	    					flage=true;
	    					bmptimer=setInterval(play,500);
	    				}
	    			}
	    			function play(){
	    				$(".valueNow").text(flex.getBmp());
	    				if(flex.getPlayStatus()==4){//结束
	    					$(".ring").removeClass("playRing");
	    					flage=false;
	    					window.clearInterval(bmptimer);
	    					circle=setInterval(begin,500);
	    				}
	    				if(flex.getPlayStatus()==1){// 暂停
	    					$(".ring").removeClass("playRing");
	    					flage=false;
	    					window.clearInterval(bmptimer);
	    					circle=setInterval(begin,500);
	    				}else{
	    					if(flage){
	    						$(".ring").addClass("playRing");
	    					}
	    					flage=false;
	    				}       
	    			}
	    		}
	    	}
	    }, 2000); 
		   
	 	function getFlex(){
	    	if(fetalMoveDataArray.toString()!=""){
	   		flex.setFetalMove(fetalMoveDataArray.toString());
	 		}
	       if(fetalHeartDataArray.toString()!=""){
	  	       flex.setFetalHeart(fetalHeartDataArray.toString());
	       }
	      if(uterusDataArray.toString()!=""){
	          flex.setUterus(uterusDataArray.toString());
	       }
		   flex.setRequstUrl(musicFile);
		   flex.initDraw();
		   return 1;
		}
	
	}else{
	      Report.initMusicPlayer(data);
	}
}
function submit(){
	var obj={};
	var result={};
	var arr1=[];
	var arr2=[];	
	$("input[name='checkbox1']").each(function(i){
		if($(this).is(":checked")){
			arr1.push(i);
		}
	});
	$("input[name='checkbox2']").each(function(i){
		if($(this).is(":checked")){
			arr2.push(i);
		}
	});
	obj.NTS=arr1.toString();
	obj.OCT=arr2.toString();
	obj.KREB=$("#score").val();//评分
	result.remark=$("#remark").val();//备注
	result.reportTime=new Date().format("yyyy-MM-dd hh:mm:ss");
	result.docName=$("#doctorName").text();//监护医生姓名
	result.value=obj;
	result.startTime=$("#measuringBeginTime").text();//监护开始时间
	result.endTime=$("#measuringEndTime").text();//监护结束时间
	result.phone=$("#phone").text();//手机号码
	result.healthId=$("#healthId").val();
	result.hospCode=$("#hospCode").val();
	result.gestationalWeeks=$("#gestationalWeeks").text()=="--"?"":$("#gestationalWeeks").text();//孕周
	result.name=$("#name").text();//姓名
	result.age=$("#age").text()=="--"?"":$("#age").text();//年龄
	result.takeTime=$("#timeTotal").text();//时长
	result.minWidth=$("#minWidth").val();
	result.reportType="2";
	art.dialog.confirm("确认生成报告？",function(){
		$.ajax({
			type: "POST",
			url: localhostUrl+'/web-bin/p/followup/healthMonitor/submit_fetalHeart_report',
			data:JSON.stringify(result),
		    success: function(data){
		    	if(data.res=='0'){
		    		art.dialog({content: '操作成功！', icon: 'succeed', time: 1.5});
		    		$("#reportTime").text(result.reportTime);
		    	}else{
		    		art.dialog({
						 time: 1.5,  
						 content: data.msg,
						 icon: 'error' 
					});
		    	}
		    	//刷新父页面列表
	        	if(window.opener){
	        		window.opener.flush();
	        	}
		    },
		    error:function(){
		        return;
	        }
		});
	});
}
//日期格式化
Date.prototype.format = function(format)
{
 var o = {
 "M+" : this.getMonth()+1, //month
 "d+" : this.getDate(),    //day
 "h+" : this.getHours(),   //hour
 "m+" : this.getMinutes(), //minute
 "s+" : this.getSeconds(), //second
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








