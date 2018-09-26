var pageNumber = 30;//每页30行
var pagination;
var query=getRequest();//方法在config配置文件中
var localhostUrl=window.location.origin;//window.HUGPAGE_CONFIG.LOCALHOST_URL;
var x_point=["早餐前","早餐后","午餐前","午餐后","晚餐前","晚餐后","睡前"];
var color=['#a6cf45','#f056d8','#e5943d','#19c369','#f66181','#6164e3','#aa60d9'];
var symbol=['circle','square','diamond','triangle','triangle-down','url(/web-bin/resources/images/5.png)','url(/web-bin/resources/images/6.png)'];
$(function(){
	pagination=$("#page").myPagination({
        currPage: 1,
        pageNumber: pageNumber,
        ajax: { 
    		on: true, 
    		cache: false,
    		callback: ajaxCallBack,
    		type: "GET", 
    		url: localhostUrl+'/web-bin/p/followup/healthMonitor/query_health_data_by_type?healthType=3&hugId='+query.hugId+"&docHugId="+query.docHugId,
    		ajaxStart:function(XMLHttpRequest){
                $("#loading").html("<img src='/resources/images/loading.gif'/>");
            },
    		dataType: "json"
    	},
    	panel: {
            tipInfo_on: true,
            tipInfo: '<div class="i_box">到第{input}{sumPage}页</div>'
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
	if(data.data!=null){
		var result=data.data.result;
		var x_data=[];//时间轴
		var data1=[];//血糖
		$("#dataTable").setTemplateElement("Template-ListRows").processTemplate(data.data.result);
		for(var i=0;i<result.length;i++){
			x_data.push(result[i].measuringTime.substring(0,16)+"&"+(result[i].measuringPoint-1));
			var obj={};
			obj.y=parseFloat(result[i].healthValue);
			obj.marker={};
			obj.marker.fillColor=color[result[i].measuringPoint-1];
			obj.marker.lineColor=color[result[i].measuringPoint-1];
			obj.marker.lineWidth='2';
			obj.marker.symbol=symbol[result[i].measuringPoint-1];
			data1.push(obj);
		}
	}
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
            max:15,
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
                from: 4.4,
                to: 9.9,
                color: '#d7f6f9'
            }, {
                from: 4.4,
                to: 6.9,
                color: '#FDFDC2'
            }]
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
            name:'早餐前',
            marker: {
                fillColor: color[0],
                lineWidth: 2,
                lineColor: color[0],
                symbol:symbol[0]
            },
            z_index:1,
            data: data1
        },{
            name:'早餐后',
            marker: {
            	fillColor: color[1],
            	lineWidth: 2,
				lineColor: color[1],
				symbol:symbol[1]
            }
        },{
            name:'午餐前',
            marker: {
            	fillColor: color[2],
            	lineWidth: 2,
                lineColor: color[2],
                symbol:symbol[2]
            }
        },{
            name:'午餐后',
            marker: {
				fillColor: color[3],
                lineWidth: 2,
                lineColor: color[3],
                symbol:symbol[3]
            }
        },{
            name:'晚餐前',
            marker: {
				fillColor: color[4],
                lineWidth: 2,
                lineColor: color[4],
                symbol:symbol[4]
            }
        },{
            name:'晚餐后',
            marker: {
				fillColor: color[5],
                lineWidth: 2,
                lineColor: color[5],
                symbol:symbol[5]
            }
        },{
        	name:'睡前',
			marker: {
                lineWidth: 2,
                fillColor: color[6],
				lineColor: color[6],
				symbol:symbol[6]
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



