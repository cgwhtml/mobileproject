var pageNumber = 30;//每页30行
var pagination;
var query=getRequest();//方法在config配置文件中
var localhostUrl=window.location.origin;//window.HUGPAGE_CONFIG.LOCALHOST_URL;
var x_point=["凌晨","早餐前","早餐后","午餐前","午餐后","晚餐前","晚餐后","睡前"];
var color=['#a6cf45','#a6cf45','#f056d8','#e5943d','#19c369','#f66181','#6164e3','#aa60d9'];
var symbol=['square','circle','square','diamond','triangle','triangle-down','url(/web-bin/resources/images/5.png)','url(/web-bin/resources/images/6.png)'];
var limit1=[4.4,9.9];//血糖默认正常范围
$(function(){
    var s_data="?healthType=3&docHugId="+query.docHugId;
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
		var result=data.data.healthPage.result;
		var x_data=[];//时间轴
		var data1=[];//血糖
		$("#dataTable").setTemplateElement("Template-ListRows").processTemplate(data.data.healthPage.result);
        var h_set=data.data.threshold&&JSON.parse(data.data.threshold);
        if(h_set) {
            if (h_set.minBIS && h_set.maxBIS) {
                limit1[0] = h_set.minBIS;
                limit1[1] = h_set.maxBIS;
            }
        }
		for(var i=0;i<result.length;i++){
			x_data.push(result[i].measuringTime+"&"+(result[i].measuringPoint));
			var obj={};
			obj.y=parseFloat(result[i].healthValue);
            obj.p_x=result[i].measuringTime;
			obj.marker={};
			obj.marker.fillColor=color[result[i].measuringPoint];
			obj.marker.lineColor=color[result[i].measuringPoint];
			obj.marker.lineWidth='2';
			obj.marker.symbol=symbol[result[i].measuringPoint];
			data1.push(obj);
		}
	}
    data1.sort(function(a,b){
        return new Date(a.p_x.replace(/-/g,'/')).getTime()-new Date(b.p_x.replace(/-/g,'/')).getTime();
    });
    x_data.sort(function(a,b){
        return new Date(a.split("&")[0].replace(/-/g,'/')).getTime()-new Date(b.split("&")[0].replace(/-/g,'/')).getTime();
    });
    drawHighCharts(x_data,data1);
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
function  drawHighCharts(x_data,data1){
	$('#container').highcharts({
        title: {
            text: null
        },
        xAxis: {
            align:'right',
            minorGridLineColor:'rgb(241,137,168)',
            tickWidth: 1,//设置X轴坐标点宽
            pointPadding:1,
            type: 'categories',
            title: {
                text: '时间',
                style: {
                    color: '#666',
                    fontSize: '14px',
                    fontFamily: 'Microsoft YaHei'
                }
            },
            categories: x_data,
            labels: {
                enabled: true,
                formatter: function() {
                	return this.value.substring(0,10);
                },
            }
        },
        yAxis: {
        	min:0,
            max:24,
        	lineWidth: 1,
            tickWidth: 1,
            tickInterval:1,
            title: {
                text: '血糖  mmol/L',
                style: {
                    color: '#666',
                    fontSize: '14px',
                    fontFamily: 'Microsoft YaHei'
                }
            },
            plotBands: [{
                from: limit1[0],
                to: limit1[1],
                color: '#d7f6f9'
            }/*, {
                from: 4.4,
                to: 6.9,
                color: '#FDFDC2'
            }*/]
        },
        tooltip: {
            crosshairs: true,//竖线
            formatter:function(){
            	return '日期：'+this.x.substring(0,10)+'  '+x_point[this.x.split("&")[1]]+'<br/>血糖：'+this.y+'mmol/L';
            }
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        legend: {
            align: 'center', //水平方向位置
            verticalAlign: 'bottom', //垂直方向位置
            x: 30, //距离x轴的距离
            y: 0 //距离Y轴的距离
        },      
        series: [{
            name:'凌晨',
            marker: {
                fillColor: color[0],
                lineWidth: 2,
                lineColor: color[0],
                symbol:symbol[0]
            },
            z_index:1,
            data: data1
        },{
            name:'早餐前',
            marker: {
                fillColor: color[1],
                lineWidth: 2,
                lineColor: color[1],
                symbol:symbol[1]
            }
        },{
            name:'早餐后',
            marker: {
            	fillColor: color[2],
            	lineWidth: 2,
				lineColor: color[2],
				symbol:symbol[2]
            }
        },{
            name:'午餐前',
            marker: {
            	fillColor: color[3],
            	lineWidth: 2,
                lineColor: color[3],
                symbol:symbol[3]
            }
        },{
            name:'午餐后',
            marker: {
				fillColor: color[4],
                lineWidth: 2,
                lineColor: color[4],
                symbol:symbol[4]
            }
        },{
            name:'晚餐前',
            marker: {
				fillColor: color[5],
                lineWidth: 2,
                lineColor: color[5],
                symbol:symbol[5]
            }
        },{
            name:'晚餐后',
            marker: {
				fillColor: color[6],
                lineWidth: 2,
                lineColor: color[6],
                symbol:symbol[6]
            }
        },{
        	name:'睡前',
			marker: {
                lineWidth: 2,
                fillColor: color[7],
				lineColor: color[7],
				symbol:symbol[7]
            }
        }],
        credits:{
            enabled:false
        },
        exporting:{
            enabled:false
        }
    });
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



