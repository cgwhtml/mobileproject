/**
 * Created by Jialiang Fei
 * Created time 2018/3/15 18:01
 * Description
 */
var url = window.location.origin;
$(function() {
    // 获取医院编码
    var query = getRequest(true);
    $('.hospCode').val(query.hospCode);
    //获取验证码
    $(".main").on('click', '.pass_code:not(.cannot)', function() {
        if ($.trim($(".phone").val()) == '') {
            $.alert('请填写手机号码');
        } else if (!mobileNoValidateNew($.trim($(".phone").val()))) {
            $.alert('请填写正确格式的手机号码');
        } else {
            $.ajax({
                async:false,
                type:"get",
                url: url +'/web-bin/c/nosen/common/messageCode/send_messageCode_data?phone=' + $(".phone").val() + '&smsType=5',
                dataType:"json",
                success: function(data){
                    if (data.res == '0') {
                        $(".pass_code").addClass('cannot');
                        var time = 30; //重复发送验证码等待时间
                        $(".pass_code").text(time + 's 获取验证码');
                        var interval = setInterval(function() {
                            time--;
                            $(".pass_code").text(time + 's 获取验证码');
                            if (time <= 0) {
                                $(".pass_code").removeClass('cannot');
                                $(".pass_code").text('获取验证码');
                                clearInterval(interval);
                            }
                        }, 1000);
                    } else {
                        $.alert(data.msg || '获取验证码失败');
                    }
                },
                error: function() {
                    $.alert('获取验证码失败');
                }
            });
        }
    });
    //提交
    $(".submit").click(function() {
        if ($.trim($(".name").val()) == '') {
            $.alert('请填写姓名');
        } else if ($.trim($(".name").val()).length > 20) {
            $.alert('姓名不超过20个字');
        } else if ($.trim($(".idCard").val()) == '') {
            $.alert('请填写身份证号码');
        } else if (!IdCardValidate($.trim($(".idCard").val()))) {
            $.alert('请填写正确格式的身份证号码');
        } else if ($.trim($(".phone").val()) == '') {
            $.alert('请填写手机号码');
        } else if (!mobileNoValidateNew($.trim($(".phone").val()))) {
            $.alert('请填写正确格式的手机号码');
        } else if ($.trim($(".code_input").val()) == '') {
            $.alert('请填写验证码');
        } else {
            //检验验证码
            $.ajax({
                async:false,
                type:"get",
                url: url +'/web-bin/c/nosen/common/messageCode/test_messageCode_data?phone=' + $(".phone").val() + '&vCode='+$('.code_input').val()+"&smsType=5",
                dataType:"json",
                success: function(data){
                    if (data.res == '0') {
                        //提交
                        submitData();
                    }else {
                        $.alert(data.msg || '请重新获取验证码！');
                    }
                },
                error: function() {
                    $.alert('请求失败');
                }
            });
        }
    });
});
function submitData(){
    var JsonObj=$("#mother_content").serializeObject();
    $.ajax({
        type:"post",
        url: url+'/web-bin/m/nosen/chronicDiseases/selfFiling/submit_basic_data',
        data:JsonObj,
        contentType:'application/json;charset=UTF-8',
        success:function(data){
            if(data.res==0){
                // $.alert("保存成功");
                // setTimeout(function(){
                    window.location=url+"/web-bin/m/nosen/chronicDiseases/selfFiling/to_archivesList_page?hospCode="+$.trim(data.data.hospCode)+"&empiId="+$.trim(data.data.empiId);
                // },500)
            }else{
                $.alert("保存失败！请检查网络是否正常。");
            }
        },
        error:function () {
            $.alert("保存失败！请检查网络是否正常。");
            return;
        }
    });
}