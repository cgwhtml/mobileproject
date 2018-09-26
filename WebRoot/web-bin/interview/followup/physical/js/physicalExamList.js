var pageNumber = 19;//每页19行
var pagination;
var query=getRequest();
var localhostUrl=window.location.origin;//window.HUGPAGE_CONFIG.LOCALHOST_URL;
$(function(){
    var regStatus = $("#regStatus").val();//体检状态
	pagination=$("#page").myPagination({
        currPage: 1,
        pageNumber: pageNumber,
        ajax: { 
    		on: true,
    		type: "GET",
    		cache: false,
    		callback: ajaxCallBack,
    		url: localhostUrl+'/web-bin/p/followup/physical/query_physicalExamList_data?hospCode='+query.hospCode,
            param:"regStatus="+regStatus,
    		dataType: "json",
    		ajaxStart: function() {
                ZENG.msgbox.show(" 正在加载中，请稍后...",6,100000000000);
            },
            ajaxStop: function() {
            	//隐藏加载提示
            	setTimeout(function(){
            		ZENG.msgbox.hide();
            	}, 300);
            },
    	},
        panel: {
            tipInfo_on: true,
            tipInfo: '<div class="i_box">到第{input}{sumPage}页</div>',
            totalInfo_on: true,
            totalInfo: '<p class="total_info">当前为{lower}-{upper}条记录——总记录为{total}条</p>'
        }
	});

	//根据输入框条件检索用户列表
  	$("#basicQusery").click(function(){
  		var obj=more_obj();
		pagination.onLoad({param:obj});
  	});
  	// 浏览器兼容支持 placeholder
	if(!('placeholder' in document.createElement('input'))){   // 判断浏览器是否支持 placeholder
	    $('[placeholder]').focus(function() {
	        var input = $(this);
	        if (input.val() == input.attr('placeholder')) {
	            input.val('');
	            input.removeClass('placeholder');
	            input.css({"color":"#333333"});
	        }
	    }).blur(function() {
	        var input = $(this);
	        if (input.val() == '' || input.val() == input.attr('placeholder')) {
	            input.addClass('placeholder');
	            input.val(input.attr('placeholder'));
	            input.css({"color":"#999999"});
	        }
	    }).blur();
	}
	//搜索时间
    laydate({
        elem: '#startDate',
        format: 'YYYY-MM-DD',
        festival: true
    });
    laydate({
        elem: '#endDate',
        format: 'YYYY-MM-DD',
        festival: true,
        cssEvent:function (a, b) {
            b.left = a.left - 130;
            return b;
        }
    });
});
function more_obj(){
	var patName = $.trim($("#patName").val());//患者姓名
	var phone = $.trim($("#phone").val());//联系号码
	var packageName = $.trim($("#packageName").val());//体检套餐
	var card = $("#card").val();//身份证
	var startDate = $("#startDate").val();//体检预约开始时间
	var endDate = $("#endDate").val();//体检预约结束时间
	var regStatus = $("#regStatus").val();//体检状态
	var obj="";
	if($.trim(patName)!=null&&$.trim(patName)!=""&&patName!=$("#patName").attr('placeholder')){
		obj+="&patName="+encodeURI(patName);
	}
	if($.trim(phone)!=null&&$.trim(phone)!=""){
		obj+="&phone="+phone;
	}
	if($.trim(packageName)!=null&&$.trim(packageName)!=""){
		obj+="&packageName="+encodeURI(packageName);
	}
	if($.trim(card)!=null&&$.trim(card)!=""){
		obj+="&card="+card;
	}
	if($.trim(startDate)!=null&&$.trim(startDate)!=""){
		obj+="&startDate="+startDate;
	}
	if($.trim(endDate)!=null&&$.trim(endDate)!=""){
		obj+="&endDate="+endDate;
	}
    obj+="&regStatus="+regStatus;
	obj=obj.substring(1,obj.length);
	return obj;
}
function ajaxCallBack(data){
	var thisPageFirstElementNumber = data.data.thisPageFirstElementNumber;
	$("#dataTable").setTemplateElement("Template-ListRows").processTemplate(data.data.result);
	$("#total").text("总计："+data.data.totalCount);
	//填充序号
	for(var i=0;i<pageNumber;i++){
		var xhid = "#xuhao_" + i;
		var xh = thisPageFirstElementNumber + i;
		$(xhid).text(xh);
	}
}
function flush(){
	pagination.onReload();//刷新列表
}
function handlePhysical(id){
	art.dialog.open(localhostUrl+'/web-bin/p/followup/physical/to_physicalHandle_page?id='+id,{
		width : 400,
        height : 300,
		lock : true,
		resize : false,
		title : '预约处理'
	});
}
