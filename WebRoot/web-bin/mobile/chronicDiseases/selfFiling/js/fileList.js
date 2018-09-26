/**
 * Created by heyating
 * Created time 2018/4/13 18:02
 * Description
 */
$(function(){
    var url = window.location.origin;
    var query = getRequest(true);
    var hospCode=query.hospCode;
    var menuId=query.menuId;
    var empiId=query.empiId;
    //加载列表内容
    $.ajax({
        type:"post",
        url: url+'/web-bin/m/nosen/chronicDiseases/selfFiling/query_archivesList_data',
        data:"hospCode="+$.trim(hospCode)+"&empiId="+$.trim(empiId),
        contentType:'application/json;charset=UTF-8',
        success:function(data){
            if(data.res==0){
                var msg = data.data;
                $("#data_table").setTemplateElement("Template-ListRows").processTemplate(msg);
            }else{
                $.alert("请求失败！请检查网络是否正常。");
            }
        },
        error:function () {
            $.alert("请求失败！请检查网络是否正常。");
            return;
        }
    });
    $('.main').on('click','.menu',function(){
        var empiId=$(this).find('#empiId').val();
        var menuId=$(this).attr('id');
        var pcAuditFlag=$(this).find('#pcAuditFlag').val();
        window.location=url+"/web-bin/m/nosen/oneparam/followup/form/to_replyForm_page/sfg?hospCode="+$.trim(hospCode)+"&empiId="+$.trim(empiId)+"&menuId="+$.trim(menuId)+"&pcAuditFlag="+pcAuditFlag;
    })
})