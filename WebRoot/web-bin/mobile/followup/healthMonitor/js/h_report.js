/** 胎心音频播放对象 **/
var media = new Audio();
var timer;
var fetalHeartUrl=window.HUGPAGE_CONFIG.FETALHEART_URL;//胎心录音文件读取的url
$(function(){
	addListenTouch();
	var isChat = false;
	/** 初始化所有chart **/
	$(".chart-div").each(function(){
    	var element = $(this).attr("id");
    	Chart.init(element);
    });
	/** 播放按钮绑定事件 **/
	$(".play").bind("click", Report.musicPlayer);
	/** 查看按钮绑定事件 **/
	$(".switch").live("click", Report.newMusicPlayer);
	/** 详情的显示隐藏 **/
	$(".up-down-operate").bind("click", Report.changeDetailState);
	/** 点击保存生成报告 **/
	$(".generate-report").bind("click", Report.generateReport);
	$(".go-back").click(function(){
		if(isChat){
			if(navigator.userAgent.indexOf("Firefox") > -1){
				history.go(-3);
			}else{
				history.go(-2);
			}
			return false;
		}else{
			history.go(-1);
			return false;
		}
	});
	$(".report-chat").click(function(){
		isChat = true;
		var userId = $(this).attr("userId");
		var hospitalId = $(this).attr("hospitalId");
		var userName = $(this).attr("userName");
		if(userName==null){
			userName = "该用户暂无昵称";
		}
		var orderId = $(this).attr("orderId");
		var consumerId = $(this).attr("consumerId");
		var monitorTimes = $(this).attr("monitorTimes");
		$.post(baseURL+"/report/checkConsumer",{consumerId:consumerId},function(data){
			data = eval("("+data+")");
			if(!isNaN(data.state)){
				if (data.report != "") {
					$(".reportUrl").attr("href", data.report);
					$('.report').show();
				}
	    		/** 用户类型/是否有效/消费订单ID/订单ID/第几次监测/医院ID/用户ID/用户名 **/
				var src = chatURL+"/chat/1/"+ data.state+"/"+consumerId+"/"+orderId +"/"+monitorTimes+"/"+hospitalId+"/"+userId+"/"+userName;
	        	$('#messageModalLabel').html("正在和【" +userName +"】对话中");
	        	$('#chatIframe').attr("src",src);
	        	$('#messageModal').modal('show');	
			}
		});
	});
});

/**********************************************************************************************/
//进度条
var startX, x, aboveX = 0,progress=(window.innerWidth-20)*0.6-7; //触摸时的坐标 //滑动的距离  //设一个全局变量记录上一次内部块滑动的位置 //进度条长度-滑块宽度的一半

//1拖动监听touch事件
function addListenTouch() {
    document.getElementById("drag").addEventListener("touchstart", touchStart, false);
    //document.getElementById("drag").addEventListener("touchmove", touchMove, false);
    //document.getElementById("drag").addEventListener("touchend", touchEnd, false);
}

//touchstart,touchmove,touchend事件函数
function touchStart(e) {  
    e.preventDefault();
    var touch = e.touches[0];
    startX = touch.pageX; 
    document.getElementById("drag").addEventListener("touchmove", touchMove, false);
    document.getElementById("drag").addEventListener("touchend", touchEnd, false);
}
 function touchMove(e) { //滑动          
    if($(".play").hasClass("played")&&media.played.length>0){
		e.preventDefault();
	    var touch = e.touches[0];
	    x = touch.pageX - startX; //滑动的距离
	    if((aboveX+x)<0){
	    	drag.style.left="0px";
	    	speed.style.width="0px";
	    }else if((aboveX+x)>progress){
	    	drag.style.left=progress+"px";
	    	speed.style.width=progress+"px";
	    }else{
	    	drag.style.left = aboveX + x + "px";
	    	speed.style.width = aboveX + x + "px";
	    }
	    var dragPaddingLeft = drag.style.left;
	    var change = dragPaddingLeft.replace("px", "");
	    numDragpaddingLeft = parseInt(change);
	    var currentTime = (numDragpaddingLeft / progress) * Report.audioDuration;
	    offsetX=-(currentTime/20)*40;
	    offsetX=Math.ceil(offsetX);
	    offsetY=0;
	    Report.chartCurrentTime($(".healthData").attr("id"));
    	Chart.draw($(".chart").attr("id"),"drag");
    	media.currentTime=currentTime;
	    if (media.paused) {
	    	$(".play").click();
	    }
    }
}
function touchEnd(e) { //手指离开屏幕
	if($(".play").hasClass("played")){
		e.preventDefault();
		document.getElementById("drag").removeEventListener("touchmove",null,false);
		document.getElementById("drag").removeEventListener("touchend",null,false);
		aboveX = parseInt(drag.style.left);
	}
}
//3拖动的滑动条前进
function dragMove(audio) {
	//setInterval(function() {
    drag.style.left = (audio.currentTime / Report.audioDuration) * progress + "px";
    speed.style.width = (audio.currentTime / Report.audioDuration) * progress + "px";
    //}, 1000);
}
/**********************************************************************************************/

var Report = function(){
	
	/** 是否是第一次播放，此处控制资源多次加载音频不能暂停问题 **/
	var isFirst = true;
	/** 是否是当前对象，如果不是当前对象，则将offsetX重置为0 **/
	var currentId;
	
	return {
		audioDuration:null,
		initMusicPlayer:function(dataObj){
			isFirst = true;
			var arr1;
			var value;
			var arr2=[];
			var prevId = dataObj.data.healthId;//记录id
			var resourceId=dataObj.data.resourceId+".mp3";//音频文件id
			var musicFile = fetalHeartUrl+resourceId;
			var measuringTime=dataObj.data.measuringTime;//监测日期
			var measuringLong=dataObj.data.instruction.split("/")[2];//监测时长
			$(".chart").attr("id","chart"+prevId);//修改画布id
			$(".play").attr("value",prevId);//修改播放按钮值
			$(".music").val(musicFile);//修改音乐文件路径
			$(".healthData").attr("id",prevId);
			$(".week").text("孕周："+dataObj.data.instruction.split("/")[3]);
			$(".healthData .data").val(dataObj.data.healthValue);//胎心数据
			if(dataObj.data.instruction.split("/")[1]!="[]"){
				var fetalMoveArray=dataObj.data.instruction.split("/")[1].replace("[","").replace("]","").replace(/\"/g,"").split(",");//字符串转数组——胎动数据
				//胎动数据遍历处理
				for(var i=0;i<fetalMoveArray.length;i++){
		    		arr1=fetalMoveArray[i].replace(/\'/g,"").split(":");
		    		value=parseInt(arr1[0],10)*60+parseInt(arr1[1],10);
		    		arr2.push(value);
		    	}
				$(".moveNow").text(dataObj.data.instruction.split("/")[1].split(",").length);//胎动数
				$(".healthData .fetalMoveData").val(arr2);//胎动数据
			}else{
				$(".moveNow").text(0);//胎动数
				$(".healthData .fetalMoveData").val("");//胎动数据
			}
			$(".healthData .uterusData").val(dataObj.data.instruction.split("/")[4]);//宫缩数据
	    	Chart.init("chart"+prevId);
	    	clearInterval(timer);
			offsetX = 0;
			media.setAttribute("src", musicFile);
			Report.chartCurrentTime(prevId);
			Chart.draw("chart"+prevId, "auto");
			Report.audioDuration=parseInt(measuringLong.split(":")[0]*60,10)+parseInt(measuringLong.split(":")[1],10);
			/** 重新加载默认暂停状态**/
			$(".measuringTime").text("监测日期："+measuringTime.substring(0,10));//初始化监测日期
			$(".measuringLong").text(measuringLong);//初始化监测时长
			$(".timeTotal").text(measuringLong);//初始化监测时长
			$(".averageValueNow").text(dataObj.data.instruction.split("/")[0]+"次/分");//平均胎心率
			$(".play").attr("src", "/web-bin/resources/images/9.png");
            $(".play").attr("title", "播放");
		},
		newMusicPlayer:function(){
			isFirst = true;
			var prevId = $(this).attr("value");//记录id
			var resourceId=$(this).attr("resourceId")+".mp3";//音频文件id
			var musicFile = fetalHeartUrl+resourceId;
			$(".chart").attr("id","chart"+prevId);//修改画布id
			$(".play").attr("value",prevId);//修改播放按钮值
			$(".music").val(musicFile);//修改音乐文件路径
			var data=$("#"+prevId).find(".data").val().replace("[","").replace("]","").replace(/\"/g,"").split(",");//字符串转数组
			var measuringTime=$("#"+prevId).find("#measuringTime").val();//监测日期
			var measuringLong=$("#"+prevId).find("#measuringLong").val();//监测时长
			Chart.resultArray=data;	    	
	    	Chart.init("chart"+prevId);
	    	clearInterval(timer);
			offsetX = 0;
			media.setAttribute("src", musicFile);
			Report.chartCurrentTime(prevId);
			Chart.draw("chart"+prevId, "auto");
			/** 重新加载默认暂停状态**/
			$(".measuringTime").text("监测日期："+measuringTime.substring(0,16));//初始化监测日期
			$(".measuringLong").text("监测时长："+measuringLong);//初始化监测时长
			$(".play").attr("src", "/web-bin/resources/images/9.png");
            $(".play").attr("title", "播放");
		},
		/** 胎心播放暂停 **/
		musicPlayer : function(){
			var _t=this;
			var prevId = $(this).attr("value");
			$(this).addClass("played");//表示点击过一次播放
			var musicFile = $("#chart"+prevId).find(".music").val();
			if(prevId != currentId){
				offsetX = 0;
				media.setAttribute("src", musicFile);
			}
			currentId = prevId;
			
			/** 如果状态为暂停则点击继续播放，播放则点击暂停 **/
			if (media.paused) {
				if(isFirst){
					media.setAttribute("src", musicFile);
				}
				timer = self.setInterval(function(){
					if(media.played.length>0){
						offsetX--;
						if(!media.ended){
							Report.chartCurrentTime(prevId);
							Chart.draw("chart"+prevId, "auto");
							dragMove(media);
						}else{
							media.load();
							offsetX=0;
							Report.chartCurrentTime(prevId);
							Chart.draw("chart"+prevId, "auto");
							clearInterval(timer);
							$(_t).attr("src", "/web-bin/resources/images/9.png");
			                $(_t).attr("title", "播放");
						}
					}
				},500);
				media.play();
				isFirst = false;
				$(this).attr("src", "/web-bin/resources/images/10.png");
				$(this).attr("title", "暂停");
            }else{
                media.pause();
                clearInterval(timer);
                $(this).attr("src", "/web-bin/resources/images/9.png");
                $(this).attr("title", "播放");
            }
		},
		chartCurrentTime : function(element){
			var data = $("#"+element).find(".data").val();
			var dataArray;
			if(data.indexOf("[") != -1 && data.indexOf("]") != -1){
				dataArray = eval('(' + data + ')');
			}else{
				data.replace("[", "");
				data.replace("]", "");
				dataArray = data.split(",");
			}
			/** 渲染当前时间 **/
			var absOffsetX = Math.abs(offsetX);
			if(absOffsetX > dataArray.length){
				$($("#chart"+element).parent("div").find(".timeNow")).text("--:--");
				$($("#chart"+element).parent("div").find(".valueNow")).text("--");
			}else{
				var timeNow = Math.floor(absOffsetX / 2);
				//var hour = Math.floor(timeNow / 3600);
			    var minute = Math.floor( timeNow / 60);
			    var second = timeNow % 3600 % 60;
			    //hour = hour < 10 ? "0" + hour : hour;
			    minute = minute < 10 ? "0" + minute : minute;
			    second = second < 10 ? "0" + second : second;
			    /** 渲染当前值 **/
			    $($("#chart"+element).parent("div").find(".timeNow")).text(minute+":"+second);
	            $($("#chart"+element).parent("div").find(".valueNow")).text(dataArray[absOffsetX]);
			}
		},
		changeDetailState : function(){
			var operateId = $(this).attr("value");
			var detailObj = $("#panel"+operateId).find(".detail-info");
			if(detailObj.is(":hidden")){
				detailObj.show();
				$($(this).children("i")).removeClass("icon-double-angle-down");
				$($(this).children("i")).addClass("icon-double-angle-up");
			}else{
				detailObj.hide();
				$($(this).children("i")).removeClass("icon-double-angle-up");
				$($(this).children("i")).addClass("icon-double-angle-down");
			}
		},
		generateReport : function(){
			var id = $(this).attr("value");
			var data = $($("#chart"+id).children(".data")).val();
			
			var start_index = (start_point - default_start) * 2;
            var end_index = (end_point - default_start) * 2;
            var start_offset = start_index + Math.abs(offsetX) - Math.abs(offset_can);
            var end_offset = end_index + Math.abs(offsetX);
            
            var dataArray = data.split(",");
            if(start_offset >= dataArray.length){
            	App.dialog_show("", "请选择生成报告区域！", function(){
					$(".info-dialog-close").trigger("click");
				});
            	return;
            }
            
			App.confirm_show("", "确认生成报告？", function(){
				$(".info-confirm-cancel").trigger("click");
				var remark = $($("#panel"+id).find(".descContent")).val();
				var check_value = "";
				$($("#panel"+id).find("input[name='result_item']:checked")).each(function(){
					if(this.checked){
						check_value+=$(this).val()+",";
					}
				});
				if(check_value.length > 0){
					check_value = check_value.substring(0, check_value.length - 1);
				}
				var source = $($("#panel"+id).find(".source_input")).val();
				var speed = $($("#panel"+id).find(".speed")).val();
				
				if(remark.length > 50){
					App.dialog_show("", "备注信息在50字以内！", function(){
						$(".info-dialog-close").trigger("click");
					});
					return;
				}
				
				$.ajax({
                    type : "POST",
                    url : baseURL+'/report/xgenerate',
                    data : {'id' : id, 'remark' : remark, 'offset' : offsetX, 'resultItem' : check_value, 'source' : source, 'speed':speed, 'start':start_offset, 'end':end_offset},
                    dataType : "json", 
                    timeout : 60000,
                    success : function(data){
                    	if(data == 'success'){
                    		App.dialog_show("", "报告信息生成成功！", function(){
    							$(".info-dialog-close").trigger("click");
    							location.reload();
    						});
                    	}else if(data == 'failed'){
                    		App.dialog_show("", "报告生成失败！", function(){
    							$(".info-dialog-close").trigger("click");
    						});
                    	}
                    }
                });
			});
		}
	}
}();