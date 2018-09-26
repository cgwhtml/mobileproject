/**
 * Created by 风殇 on 2018/4/10.
 */
var localHostURL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var SERVER_URL=window.HUGPAGE_CONFIG.SERVER_URL;//读取图片服务器路径
var FILE_URL=window.HUGPAGE_CONFIG.FILE_URL;//读取图片文件路径
var id=window.location.pathname.split("/").pop();
$(function(){
    $.ajax({
        on: true,
        timeout:60000,
        type:"get",
        url: localHostURL+'/web-bin/m/weChat/weChatPublic/query_complaintsPraise_data?id='+id,
        dataType:"json",
        success: function(data){
            if(data.res==0){
                var msg=data.data.cpRecord;
                // 投诉内容
                var complaintsStr="";
                if(msg.cpDeptName){
                    complaintsStr+='<li>被<span class="cptype">投诉</span>科室：'+msg.cpDeptName+'</li>'
                }
                if(msg.cpPersonName){
                    complaintsStr+='<li>被<span class="cptype">投诉</span>人：'+msg.cpPersonName+'</li>'
                }
                if(msg.cpDetail){
                    complaintsStr+='<li><span class="cptype">投诉</span>事件陈诉：'+msg.cpDetail+'</li>'
                }
                if(msg.cpPoint){
                    complaintsStr+='<li><span class="cptype">投诉</span>重点：'+msg.cpPoint+'</li>'
                }
                $(".title_box").eq(0).append('<ul>'+complaintsStr+'</ul>');
                // 患者信息
                var patientStr="";
                if(msg.patientName){
                    patientStr+='<li>患者姓名：'+msg.patientName+'</li>'
                }
                if(msg.complainantMobile){
                    patientStr+='<li>联系方式：'+msg.complainantMobile+'</li>'
                }
                if(msg.patientCategoryName){
                    patientStr+='<li>患者分类：'+msg.patientCategoryName+'</li>'
                }
                if(msg.cpDate){
                    patientStr+='<li><span class="cptype">投诉</span>日期：'+msg.cpDate+'</li>'
                }
                if(msg.complainant){
                    patientStr+='<li><span class="cptype">投诉</span>者：'+msg.complainant+'</li>'
                }
                if(msg.patientRelationName){
                    patientStr+='<li>与患者关系：'+msg.patientRelationName+'</li>'
                }
                if(msg.cpPurposeName){
                    patientStr+='<li><span class="cptype">投诉</span>目的：'+msg.cpPurposeName+'</li>'
                }
                if(msg.cpDeptName){
                    patientStr+='<li>登记科室：'+msg.recorderDeptName+'</li>'
                }
                if(msg.assignerName){
                    patientStr+='<li>登记人：'+msg.recorderName+'</li>'
                }
                if(msg.pushTime){
                    patientStr+='<li>登记时间：<span class="ass_date">'+msg.recordTime+'</span></li>'
                }
                $(".title_box").eq(1).append('<ul>'+patientStr+'</ul>');
                // 投诉处理详情
                $(".handel_ul").setTemplateElement("detail_temp").processTemplate(data.data.cpHandelList);
                // 区分投诉表扬
                if(msg.acceptType==2){
                    $(".cp_state").remove();
                    $(".cptype").html("表扬");
                }
                var status=['待审核','待处理','处理中','已归档','处理完成','终止']
                $(".handel_status").find("span").text(status[msg.processStatus-1])
                if(msg.processStatus==4 || msg.processStatus==5 || msg.processStatus==6){
                    $("#addBottom").remove();
                }
                $(".ass_date").each(function(){
                    var $this=$(this);
                    $this.text($this.text().substring(0,10));
                });
                // 文件下载
               $(".document_li").click(function(){
                   var imgUrl=$(this).find(".file_url").val();
                   location.href=SERVER_URL+'/hug-web/r/complaint/1007?id='+imgUrl+'&hospCode='+msg.hospCode;
               });
                $("#addPraise").click(function(){
                    if(!msg.hospCode){
                        $.alert("暂无法新增");
                        return;
                    }
                    location.href=localHostURL+'/web-bin/m/weChat/weChatPublic/to_addComplaintsPraise_page?hospCode='+msg.hospCode+'&recordId='+msg.id+'&assignerName='+msg.assignerName+'&cpDate='+data.time.substring(0,10)+'&acceptType='+msg.acceptType;
                });
            }else{
                $.alert(data.msg);
            }
            $(".handel_li").click(function(event){
                $(this).next(".handel_detail").toggleClass("handelShow");
                $(this).find(".gray_arrow").toggleClass("gray_arrow_down");
                event.stopPropagation();//阻止冒泡事件，上级的单击事件不会被调用
            });
        }
    });
});