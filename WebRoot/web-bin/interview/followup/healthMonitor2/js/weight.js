var pageNumber = 30;//每页30行
var pagination;
var query=getRequest();//方法在config配置文件中
var localhostUrl=window.location.origin;//window.HUGPAGE_CONFIG.LOCALHOST_URL;
var limit1=[18.5,23.9,27.9];//体重默认正常范围,最后一个是肥胖范围
$(function(){
    var s_data="?healthType=6&docHugId="+query.docHugId;
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
		var data1=[];//体重
		$("#dataTable").setTemplateElement("Template-ListRows").processTemplate(data.data.healthPage.result);
        var h_set=data.data.threshold&&JSON.parse(data.data.threshold);
        if(h_set) {
            if (h_set.thin && h_set.normol) {
                limit1[0] = h_set.thin;
                limit1[1] = h_set.normol;
            }
            if (h_set.fat) {
                limit1[3] = h_set.fat;
            }
        }
		for(var i=0;i<result.length;i++){
			x_data.push(result[i].measuringTime);
            var obj={};
            obj.y=parseFloat(result[i].instruction.split("/")[1]);
            obj.p_x=result[i].measuringTime;
            data1.push(obj);
			//data1.push(parseFloat(result[i].healthValue));
		}
	}
    data1.sort(function(a,b){
        return new Date(a.p_x.replace(/-/g,'/')).getTime()-new Date(b.p_x.replace(/-/g,'/')).getTime();
    });
    x_data.sort(function(a,b){
        return new Date(a.replace(/-/g,'/')).getTime()-new Date(b.replace(/-/g,'/')).getTime();
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
            max:40,
        	lineWidth: 1,
            tickWidth: 1,
            tickInterval:5,
            title: {
                text: 'BMI',
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
            }, {
                from: limit1[3],
                to: 40,
                color: '#FDFDC2'
            }]
        },
        tooltip: {
            crosshairs: true,//竖线
            headerFormat: '日期：{point.x}<br/>',
            pointFormat: 'BMI：{point.y}'
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
            name:'体重',
            marker: {
                fillColor: '#71C0EE',
                lineWidth: 2,
                lineColor: '#71C0EE'
            },
            z_index:1,
            data: data1
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



