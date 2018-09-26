var pageNumber = 12;//每页12行
var pagination;

var localhostUrl=window.location.origin;//window.HUGPAGE_CONFIG.LOCALHOST_URL;

//var serverUrl=window.HUGPAGE_CONFIG.SERVER_URL;
var query=getRequest();//方法在config配置文件中
$(function(){
	if("1"==query.fetalMonitorSetAuth){
		$("#frequency").show();
	}
	var s_data="?healthType=1&docHugId="+query.docHugId;
    if(query.phone!=null && query.phone!=""){
        s_data=s_data+'&phone='+query.phone;
    }
    if(query.idCardNo!=null && query.idCardNo!=""){
        s_data=s_data+'&idCardNo='+query.idCardNo;
    }
    $("#beginDate").val(query.beginDate);
    $("#endDate").val(query.endDate);
	pagination=$("#page").myPagination({
        currPage: 1,
        pageNumber: pageNumber,
        pageObj: "data.healthPage",
        ajax: { 
    		on: true, 
    		cache: false,
    		callback: ajaxCallBack,
    		type: "GET", 
            url: localhostUrl+'/web-bin/p/followup/two/healthMonitor/query_health_data_by_type'+s_data,
            param:"beginDate="+$("#beginDate").val()+"&endDate="+$("#endDate").val(),
    		ajaxStart:function(XMLHttpRequest){
                $("#loading").html("<img src='/resources/images/loading.gif'/>");
            },
    		dataType: "json"
    	},
        panel: {
            tipInfo_on: true,
            tipInfo: '<div class="i_box">到第{input}{sumPage}页</div>',
            totalInfo_on: true,
            totalInfo: '<p class="total_info">当前为{lower}-{upper}条记录——总记录为{total}条</p>'
        }
	});
	$("#chartQusery").click(function(){
		var obj=more_obj();
		pagination.onLoad({param:obj});
	});
	//设置胎心监测服务次数
	$("#frequency").click(function(){
		art.dialog.open(localhostUrl+'/web-bin/p/followup/healthMonitor/to_setFrequency_page?patName='+query.patName+"&hospCode="+query.hospCode+"&age="+query.age+"&phone="+query.phone,{
			width : 430,
			height : 300,
			lock : true,
			resize : false,
			title : '胎心监测服务次数设置'
		});
	});
	$(".report").click(function(){
		var healthId=$(this).attr("healthId");
		var hospCode=$(this).attr("hospCode");
		//window.open(serverUrl+"/hug-web/r/health/1014?healthId="+healthId+"&hospCode="+hospCode,"胎心报告查看");
		window.open(localhostUrl+"/web-bin/p/followup/healthMonitor/to_checkReport_page?healthId="+healthId+"&hospCode="+hospCode);
	});
	//搜索时间
    laydate({
        elem: '#beginDate',
        format: 'YYYY-MM-DD',
        festival: true
    });
    laydate({
        elem: '#endDate',
        format: 'YYYY-MM-DD',
        festival: true
    });
});
function more_obj(){
	var beginDate=$("#beginDate").val();
	var endDate=$("#endDate").val();	
	var obj="";

	if($.trim(beginDate)!=null&&$.trim(beginDate)!=""){
		obj+="&beginDate="+beginDate;
	}
	if($.trim(endDate)!=null&&$.trim(endDate)!=""){
		obj+="&endDate="+endDate;
	}
	obj=obj.substring(1,obj.length);
	return obj;
}
function ajaxCallBack(data){
    if(data.data!=null&&data.data.healthPage){
		$("#dataTable").setTemplateElement("Template-ListRows").processTemplate(data.data.healthPage.result);
		var fetalMoveArray;
		$(".fetalMoveData").each(function(){
			var arr2=[];
			var value;
			if($(this).val()!="[]"){
				fetalMoveArray=$(this).val().replace("[","").replace("]","").replace(/\"/g,"").split(",");
				//胎动数据遍历处理
				for(var i=0;i<fetalMoveArray.length;i++){
		    		arr1=fetalMoveArray[i].replace(/\'/g,"").split(":");
		    		value=parseInt(arr1[0],10)*60+parseInt(arr1[1],10);
		    		arr2.push(value);
		    	}
				$(this).val(arr2);
			}
		});
	
		if(data.data.healthPage.result.length>0){
			
			if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)){
				$("#flash_nav").show();
				$(".switch").eq(0).trigger("click");
			}else{
				$(".panel-head").show();
				$("#baseinfo").show();
				$(".switch").eq(0).trigger("click");
			}
			
		}
	}


	$("#loading").html("");
    //跨域返回iframe内容高度
    if(query.crossDomainSrc && query.iframeId) {
        var iframe = document.createElement("iframe");
        iframe.width = '0px';
        iframe.height = '0px';
        iframe.style.display="none";
        var iframeHeight = document.body.scrollHeight;
        iframe.src = query.crossDomainSrc + '?iframeHeight=' + iframeHeight + '&iframeId=' + query.iframeId;
        document.body.appendChild(iframe);
    }
}

	
//查看处理意见
function showHandle(healthId){
	art.dialog.open(localhostUrl+'/web-bin/p/followup/healthMonitor/to_showHandle_page?healthId='+healthId+"&hospCode="+query.hospCode+"&docHugId="+query.docHugId,{
		width : 430,
		height : 254,
		lock : true,
		resize : false,
		title : '查看监测处理'
	});
}





