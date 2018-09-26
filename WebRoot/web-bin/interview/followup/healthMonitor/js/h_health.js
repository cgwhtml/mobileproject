var flex=null;
var musicFile=null;
var data=null;
var fetalHeartUrl=window.HUGPAGE_CONFIG.FETALHEART_URL;//胎心录音文件读取的url
$(function(){

	/** 查看按钮绑定事件 **/

	$(".switch").live("click", HealthR.health);
	
});
var HealthR = function(){
	return {
		
		

		health : function(){
			//alert(data.length);
	 		var prevId=$(this).attr("value");
	 		var week=$(this).attr("week");
	 	
	 		  //---------- 基本信息处理----------//
	 		var fetalHealthData=$("#"+prevId).find(".data").val();
	 		var  fetalMoveData=$("#"+prevId).find(".fetalMoveData").val();
		   var  uterusData=$("#"+prevId).find(".uterusData").val();
			var measuringTime=$("#"+prevId).find("#measuringTime").val();//监测日期  
			var measuringLong=$("#"+prevId).find("#measuringLong").val();//监测时长
		    var healthUnit="次/分";
			var resourceId=$(this).attr("resourceId");//音频文件id
			 musicFile = fetalHeartUrl+resourceId+".mp3";
		   // musicFile = "/resources/swf/"+resourceId+".mp3";
			//--------------胎心，胎动，宫缩数据的处理-----------///
			flex=document.getElementById("print");
			var fetalHeartArray=fetalHealthData.replace("[","").replace("]","").replace(/\"/g,"").split(",");
		    var uterusArray=uterusData.replace("[","").replace("]","").replace(/\"/g,"").split(",");
		 

		    var timer= null;
		    //--------------bmp处理-------------//
		    timer=setInterval(function () { 
		    	if(flex!==null&&flex!=="undefined"){
		    	
		    		if(getFlex()==1){
		    			flex.setMesureTime(measuringTime);
		    			flex.setMesureLong(measuringLong);
		    			flex.setWeek(week);
		    			flex.setHealthUit(healthUnit);
		    			window.clearInterval(timer);
		    		}
		    	}
		    }, 1000); //1000毫秒可以进入加载到，  1500也是可以的，500毫秒不可以
		    function getFlex(){
		    	   if(fetalHeartArray.toString()!=""){
			       flex.setFetalHeart(fetalHeartArray.toString());
		    	   }
		    	   if(uterusArray.toString()!=""){
			       flex.setUterus(uterusArray.toString());
		    	   }
		    	   if(fetalMoveData.toString()!=""){
			       flex.setFetalMove(fetalMoveData.toString());
		    	   }
				   flex.setRequstUrl(musicFile);
				   flex.initDraw();
				    return 1;
				}	
		    $(".report").attr("healthId",prevId);
	        $(".report").attr("hospCode",query.hospCode);
		    $.ajax({
	    		type: "POST",
	    		url: localhostUrl+'/web-bin/p/followup/healthMonitor/query_report_data?hospCode='+query.hospCode+"&healthId="+prevId,
	    	    success: function(data){
	    	    	if(data.res="0"){
	    	    		if(data.data!=null){
	    	    			$(".report").parent().show();//--有什么就出现
	    	    		}else{
	    	    			$(".report").parent().hide();
	    	    		}
	    	    	}
	    	    },
	    	    error:function(){
	    	        return;
	            }
	    	}); 
		}
	

	}
	
}();


