//默认选中第一条记录
var clickFirstRowFlag = true;
var pageNumber = 10;//每页10行
var pagination;
var LOCALHOST_URL=window.location.origin;//读取ajax的localhost路径，读取url里的LOCALHOST_URL
var PORT=window.HUGPAGE_CONFIG.PORT;//读取ajax的配置路径，读取url里的PORT
var SERVER_URL=window.HUGPAGE_CONFIG.SERVER_URL;//读取图片服务器路径
var FILE_URL=window.HUGPAGE_CONFIG.FILE_URL;//读取图片文件路径
var query=getRequest();
var hospCode=query.hospCode;
$(function(){
	pagination=$("#page").myPagination({
    	currPage: 1,
    	pageNumber: pageNumber,
    	showPage:3,
        pageObj:"result.models.rolePage",
    	info:{
    		cookie_currPage:true,
    		cookie_currPageKey:"xml"
    	},
    	ajax: {
			on: true,
			callback: ajaxCallBack,
			type: "GET",
            data:"hospCode="+hospCode,
			url: LOCALHOST_URL+':'+PORT+'/web-bin/p/followup/appRole/query_allRole_data?hospCode='+hospCode,
			dataType: "json"
		},
        panel:{
            tipInfo_on: true,
            first_on:false,
            last_on:false,
            next_on:false,
            prev_on:false,
            tipInfo: '<div class="i_box">{input}/&nbsp;{sumPage}页</div>'
        }
    });
	//角色列表搜索
	$(".search_js").inputer({
  		css:{"width":"180px"},
  		callback:function(){
            clickFirstRowFlag = true;
  			var roleName =$("#roleName").val();
            if(roleName==$("#roleName").attr('t_placeholder')){
                roleName="";
            }
  			pagination.onLoad({param:"roleDTO.roleName="+roleName});
  		}
  	});
	//跳转到角色添加页面
	$(".create_js").click(function(){
        clickFirstRowFlag = false;
		$("tr").removeClass("chosen");
        $("#mainFrame").attr("src","toAddRole.htm");
	});
	//跳转到角色修改页面
	$(document).on("click",".name,.index",function(){
		$("tr").removeClass("chosen");
		$(this).parent().addClass("chosen");
		//随机时间防止修改页面被缓存
        $("#mainFrame").attr("src","toUpdateRole.htm?roleDTO.id="+$(this).parent().attr("id"));
	});
    //删除角色
    $("#delete_js").click(function(){
        var ids = [];
        $(".list_table tr:gt(0) .sc_checked").each(function(b){
            b=$(this).parents("tr");
            ids.push(b.attr("id"));
		});
        if(ids.length == 0){
            art.dialog({
                content: '请勾选要删除的数据！',
                icon: 'warning',
                time: 1.5
            });
        }else{
            art.dialog.confirm("请确认是否删除？",function (){
                multDel(ids);//批量删除角色
            });
        }
    });
	//全选
    $(document).on("click",".checkAll",function(){
        $(this).toggleClass("sc_unchecked").toggleClass("sc_checked");
        $(this).hasClass("sc_unchecked") && $(".checkOne").removeClass("sc_checked").addClass("sc_unchecked")
        || $(".checkOne").removeClass("sc_unchecked").addClass("sc_checked");
    });
    //选择框状态变化
	$(document).on("click",".checkOne",function(){
		$(this).toggleClass("sc_unchecked").toggleClass("sc_checked");
	});
});
//角色数据返回方法
function ajaxCallBack(data){
    rows = data.result.models.rolePage.list
	var thisPageFirstElementNumber=data.result.models.rolePage.startRow;
	$("#data_table").setTemplateElement("Template-ListRows").processTemplate(rows);
    //填充序号
    for(var i=0;i<pageNumber;i++){
        var xhid = "#xuhao_" + i;
        var xh = thisPageFirstElementNumber + i;
        $(xhid).text(xh);
    }
    if(rows && rows.length>0){
		//True则默认选中第一条记录
        if(clickFirstRowFlag){
            $(".name")[0].click();
        }
    }else{
        $(".create_js").click();
    }
}
//批量删除角色
function multDel(ids){
	$.ajax({
		type: "POST",
	    url: "deleteRole.htm",
	    data: {"roleDTO.jsonIds":JSON.stringify(ids)},
	    success: function(data){
		    if(data.result.resultCode == 0){
                art.dialog({
                    content: '删除成功！',
                    icon: 'succeed',
                    time: 1.5
                });
                //删除角色后重新加载列表
                flushList();
            }else{
                art.dialog({
                    content: '删除失败！',
                    icon: 'error',
                    time: 1.5
                });
            }
	    },
	    error:function(){ 
	    	art.dialog({
            	content: '删除失败！',
                icon: 'error',
                time: 1.5
            });
        } 
	});
}
//列表刷新方法
function flushList(){
    pagination.onReload();
}