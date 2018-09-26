/**
 * Created by 风殇 on 2018/4/10.
 */
var localhostUrl=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query=getRequest();//方法在config配置文件中
var id=query.recordId;
var hospCode=query.hospCode;
var fileArr=[];
$(function(){
    $("#hospCode").val(hospCode);
    $(".assignerName").text(decodeURI(query.assignerName));
    $(".cpDate").text(query.cpDate);
    if(query.acceptType==2){
        $(".cp_state").remove();
        $(".five_problem").html(2);
    }
    // 上传图片
    $(".file").change(function(){
        var source=$(this)[0];
        var file = source.files[0];
        if(file.name) {
            uploadByForm();
        }
    });
    function uploadByForm(){
        var formData = new FormData($("#fileForm")[0]);
        $.ajax({
            url: localhostUrl + '/web-bin/c/nosen/common/file/file_upload_praise?hospCode='+hospCode,
            type: 'POST',
            data: formData,
            async: true,
            contentType: false,
            processData: false,
            beforeSend:function(){
            $(".wrapper").append('<div id="loaders_box" style="height:100%"><div class="loaders"><img src="/web-bin/mobile/repository/drug/images/loading_2.gif"/><div></div>');
                $("#loaders_box").height($(".wrapper").height());
        },
            success: function(data){
                $("#loaders_box").remove();
                if(data.res==0) {
                    var files=data.files[0];
                    fileArr.push(data.data);
                    if(files.mimetype.split("/")[0] =="image"){
                        $(".file_detail").append('<li><div class="file_images"><img src="/web-bin/weChat/weChatPublic/img/file_photo.png" alt=""></div><div class="file_message"><div class="substr">'+files.originalname+'</div><div>'+files.size+'kb</div></div><div class="item-delete"></div></li>');
                    }else if(files.mimetype.split("/")[0]=="video"){
                        $(".file_detail").append('<li><div class="file_images"><img src="/web-bin/weChat/weChatPublic/img/file_video.png" alt=""></div><div class="file_message"><div class="substr">'+files.originalname+'</div><div>'+files.size+'kb</div></div><div class="item-delete"></div></li>');
                    }else if(files.mimetype.split("/")[0]=="text"){
                        $(".file_detail").append('<li><div class="file_images"><img src="/web-bin/weChat/weChatPublic/img/file_word.png" alt=""></div><div class="file_message"><div class="substr">'+files.originalname+'</div><div>'+files.size+'kb</div></div><div class="item-delete"></div></li>');
                    }else if(files.mimetype=="application/vnd.ms-excel"){
                        $(".file_detail").append('<li><div class="file_images"><img src="/web-bin/weChat/weChatPublic/img/file_excel.png" alt=""></div><div class="file_message"><div class="substr">'+files.originalname+'</div><div>'+files.size+'kb</div></div><div class="item-delete"></div></li>');
                    }else{
                        $(".file_detail").append('<li><div class="file_images"><img src="/web-bin/weChat/weChatPublic/img/file_more.png" alt=""></div><div class="file_message"><div class="substr">'+files.originalname+'</div><div>'+files.size+'kb</div></div><div class="item-delete"></div></li>');
                    }
                    $('.file_detail li').touchWipe({itemDelete: '.item-delete'});
                }else{
                    $.alert(data.msg || "上传失败！");
                }
            },
            error:function(data){
                $.alert(data.msg);
            }
        });
    }
    $("body").on("click",".item-delete",function(){
        var deleteIndex=$(".deleteImg").index(this);
        $.confirm({
            title: '确认',
            text: '确认删除文件吗？',
            onOK: function () {
                $(".file_detail li").eq(deleteIndex).remove();
                fileArr.splice(deleteIndex,1);
            },
            onCancel: function () {
            }
        });
    });
    // 提交答案
    $("#addPraise").click(function(){
        if($(".subject_text").val().length>200){
            $.alert("字数超出限制");
            return;
        }
        var resultObj=$("#resultForm").serializeObject();
        $.confirm({
            title: '确认',
            text: '确认提交吗？',
            onOK: function () {
                $.ajax({
                    on: true,
                    timeout:60000,
                    type:"get",
                    url: localhostUrl+'/web-bin/m/weChat/weChatPublic/query_addComplaintsPraise_data?recordId='+id+urlEncode(resultObj)+'&fileUploadId='+fileArr,
                    dataType:"json",
                    success: function(data) {
                        if (data.res == 0) {
                            history.back(-1);
                        }else{
                            $.alert(data.msg)
                        }
                    }
                })
            },
            onCancel: function () {
            }
        });
    })
});
//json对象转url字符串
var urlEncode = function (param, key, encode) {
    if(param==null) return '';
    var paramStr = '';
    var t = typeof (param);
    if (t == 'string' || t == 'number' || t == 'boolean') {
        paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);
    } else {
        for (var i in param) {
            var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
            paramStr += urlEncode(param[i], k, encode);
        }
    }
    return paramStr;
};