var pageNumber = 30;//每页30行
var pagination;
var query=getRequest();//方法在config配置文件中
var localhostUrl=window.location.origin;//window.HUGPAGE_CONFIG.LOCALHOST_URL;
$(function(){
	pagination=$("#page").myPagination({
        currPage: 1,
        pageNumber: pageNumber,
        ajax: { 
    		on: true, 
    		cache: false,
    		callback: ajaxCallBack,
    		type: "GET", 
    		url: localhostUrl+'/web-bin/p/followup/healthMonitor/query_health_data_by_type?healthType=5&hugId='+query.hugId+"&docHugId="+query.docHugId,
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
		var data1=[];//心率
		var data2=[];//血氧
		$("#dataTable").setTemplateElement("Template-ListRows").processTemplate(data.data.result);
		for(var i=0;i<result.length;i++){
			x_data.push(result[i].measuringTime.substring(0,16));
			data1.push(parseFloat(result[i].healthValue));
			data2.push(parseFloat((result[i].instruction?result[i].instruction.split("/")[0]:0)));
		}
	}
    drawHighCharts(x_data,data1,data2);
	$("#loading").html("");
}
function  drawHighCharts(x_data,data1,data2){
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
            crosshair: true,//竖线
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
            max:200,
        	lineWidth: 1,
            tickWidth: 1,
            tickInterval:10,
            title: {
                text: 'BPM/%',
                style: {
                    color: '#666',
                    fontSize: '14px',
                    fontFamily: 'Microsoft YaHei'
                }
            },
            plotBands: [{
                from: 60,
                to: 100,
                color: '#d7f6f9'
            }]
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
            name:'心率',
            marker: {
                fillColor: '#71C0EE',
                lineWidth: 2,
                lineColor: '#71C0EE'
            },
            tooltip: {
                headerFormat: '日期：{point.x}<br/>',
                pointFormat: '{series.name}：{point.y}bpm'
            },
            z_index:1,
            data: data1
        },{
			color:'#F9A070',
            name:'血氧饱和度',
            marker: {
                fillColor: '#F9A070',
                lineWidth: 2,
                lineColor: '#F9A070'
            },
            tooltip: {
                headerFormat: '日期：{point.x}<br/>',
                pointFormat: '{series.name}：{point.y}%'
            },
            z_index:1,
            data: data2
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



