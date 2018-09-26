var query=window.location.search;
var id=query.split("?")[1];
var localhostUrl=window.location.origin;//window.HUGPAGE_CONFIG.LOCALHOST_URL;
//console.log(window.location);
$(function(){
    //体检预约提交验证提示加载
    formTips();

	laydate({
        elem: '#examDate',
        format: 'YYYY-MM-DD',
        festival: true
    });
});
function submit(){
    //新建我的表单类别信息验证
    $('#description').poshytip('hide');
    var description = $.trim($("#description").val());
    if (description.length > 200) {
        $('#description').poshytip('show');
        $("#description").focus();
        return false;
    }
	//父页面window对象
	var parent = art.dialog.opener;
	//当前dialog
	var dialog = art.dialog.open.api;

	var examDate=$("#examDate").val();
	$.ajax({
		type: "POST",
	    url: localhostUrl+"/web-bin/p/followup/physical/submit_physicalHandle_data",
	    data: "description="+description+"&examDate="+examDate+"&"+id,
	    success: function(data){
	    	if(data.res==0){
	    		parent.flush();//刷新列表
	    		dialog.close();
	    		parent.art.dialog({content: '操作成功！', icon: 'succeed', time: 1.5});
	    	}else{
	    		art.dialog({
					 time: 1.5,
					 content: "操作失败",
					 icon: 'error'
				});
	    	}
	    },
	    error:function(){
	        return;
        } 
	});
}
//新建我的表单类别提交验证提示信息
function formTips(){
    $('#description').poshytip({
        content: '处理说明长度不能超过200个字符！',
        showOn: 'none',
        alignTo: 'target',
        alignX: 'inner-left',
        offsetX: 0,
        offsetY: 6
    });
    $('#description').blur(function(){
        var description = $("#description").val();
        if(description.length<=200){
            $('#description').poshytip('hide');
        }
    });
}
