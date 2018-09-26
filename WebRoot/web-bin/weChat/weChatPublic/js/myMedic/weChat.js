/**
 * Created by 风殇 on 2017/11/2.
 */
//禁止iPhone的缩放，弹性滚动
window.onload=function () {
    document.addEventListener('touchstart',function (event) {
        if(event.touches.length>1){
            event.preventDefault();
        }
    });
    var lastTouchEnd=0;
    document.addEventListener('touchend',function (event) {
        var now=(new Date()).getTime();
        if(now-lastTouchEnd<=300){
            event.preventDefault();
        }
        lastTouchEnd=now;
    },false);
    document.body.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, false);
};

// 计算聊天区域高度
/*function calctop() {
    $(".chat_top").height($(window).height()-$(".sender").outerHeight()-$(".chat_input").outerHeight());
}*/
// calctop();
//ios虚拟键盘弹出时，input会被遮挡
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var windowHeight=$(window).height();
/*$(window).resize(function(){
    setTimeout(function(){
        calctop();
    },100)
});*/
/*$(".input_area").focus(function(){
    if(isiOS){
        $(".chat_top").css("bottom","80px");
        $(".chat_input").css("bottom","30px")
    }
});*/
$(function(){
    var LOCALHOST_URL=window.location.origin;
    var localhostUrl='http://test.joinhealth.cn';
    var query=getRequest();
    var SERVER_URL=window.HUGPAGE_CONFIG.SERVER_URL;//读取图片服务器路径
    var FILE_URL=window.HUGPAGE_CONFIG.FILE_URL;//读取图片文件路径
    // var hospCode=query.hospCode;
    var usId=query.usId;
    var accessToken=query.accessToken;
    var hugId=query.hugId;
    var targetHugId=query.targetHugId;
    var head=query.head;
    var doctorName=query.doctorName;
    var size=20;
    var pagenumber=1;
    $(".chat_top").niceScroll({
        railpadding: { top:0, right: -1, left: 0},
        cursoropacitymin: 0.4,
        cursoropacitymax: 0.4,
        cursorcolor:"#515153",
        zindex: "99",
        cursorwidth: "6px"
    });
    // 判断用户免费随访时限是否过期
    if(usId){
        $.ajax({
            on: true,
            type:"post",
            url: LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/query_sendPatient_data?usId='+usId+'&accessToken='+accessToken+'&hugId='+hugId+'&targetHugId='+targetHugId,
            dataType:"json",
            success: function(data){
                if(data.res==0 && data.data){
                    var status=data.data.status;
                    $("#status").val(status);
                    if(status){
                        if(status==1){
                            var feeIm=data.data.feeIm;
                            $(".sender").html("剩余<span>"+data.data.left+"</span>条咨询,将在"+data.data.freeEnd+"结束,点击续买>>");
                            $(".sender").addClass("buyBox");
                        }else if(status==2 || status==7){
                            $(".sender").html("医生没有开放咨询服务，暂时不能聊天");
                            $("input").attr("disabled","disabled");
                            $(".add_functon").remove();
                            $(".speak").remove();
                            $(".input_box").css("width","97%");
                        } else if(status==3 || status==4){
                            var feeIm=data.data.feeIm;
                            $(".sender").html("当前无法咨询医生,点击购买咨询服务>>");
                            $(".sender").addClass("buyBox");
                            $("input").attr("disabled","disabled");
                            $(".add_functon").remove();
                            $(".speak").remove();
                            $(".input_box").css("width","97%");
                        }else if(status==5){
                            $(".sender").html("医生开放免费咨询中，将在"+data.data.freeEnd+"结束");
                        }else if(status==6){
                            $(".sender").html("医生对你开放无限制免费咨询");
                        }else if(status==24){
                            $(".sender").html("尚未关注该医生，点击关注");
                            $(".add_functon").remove();
                            $(".speak").remove();
                            $(".input_box").css("width","97%");
                        }
                        // 购买咨询
                        $(".buyBox").tap(function(){
                            var toBuyUrl=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/to_buyWexin_page?hugId='+hugId+'&targetHugId='+targetHugId+'&feeIm='+feeIm+'&doctorName='+doctorName;
                            location.href='http://test.joinhealth.cn/hug-web/c/wechat/47174063-8/1000?redirectUri='+encodeURIComponent(toBuyUrl);
                        });
                    }
                }
                if(data.res==13001){
                    $(".sender").html("尚未关注该医生，请到‘找医生’去关注");
                    $("input").attr("disabled","disabled");
                    $(".add_functon").remove();
                    $(".input_box").css("width","97%");
                }
            }
        });
    }
    // 播放语音
    $(".chat_top").on("tap",".audio_controller",function(){
        var $audio=$(this);
        var audio=$(this).children("audio")[0];
        audio.play();
        $audio.find("img").attr("src","/web-bin/weChat/weChatPublic/img/audio_play.gif");
        audio.onended = function() {
            $audio.find("img").attr("src","/interview/followup/chat/images/audio.png");
        };
    });
    $(".chat_top").on("tap",".video_controller",function(){
        var video=$(this).children("video")[0];
        // $(this).find(".play_video").hide();
        // $(this).find(".firstImage").hide();
        video.play();
        video.onended = function() {
            // $(".play_video").show();
            // $(".firstImage").show();
        };
    });
    // 发送图片
    $("#file").change(function(e){
        var source=$(this)[0];
        var file = source.files[0];
        if(window.FileReader) {
            uploadByForm();
        }
        function uploadByForm() {
            var formData = new FormData($("#myForm")[0]);
            $.ajax({
                url: LOCALHOST_URL + '/web-bin/c/nosen/common/file/file_upload_send?chatType=2&msgType=0&targetHugId='+targetHugId+'&hugId='+hugId+'&accessToken='+accessToken+'&usId='+usId+'&content=图片'+'&partnerType=7',
                type: 'POST',
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function(data){
                    if(data.res==0) {
                        if(myHead!="undefined"){
                            $(".chat_top").append('<li><div class="send_head"><img src='+SERVER_URL+FILE_URL+$("#myHead").val()+'/></div><div class="img_box float_right"><div class="send_triangle design_icon"></div><input type="hidden" value="'+SERVER_URL+FILE_URL+data.files[0].filename+'" class="id_src"><img src="'+SERVER_URL+FILE_URL+data.files[0].filename+'"  height="200px"/></div></li>');
                        }else{
                            $(".chat_top").append('<li><div class="send_head design_icon"></div><div class="img_box float_right"><div class="send_triangle design_icon"></div><input type="hidden" value="'+SERVER_URL+FILE_URL+data.files[0].filename+'" class="id_src"><img src="'+SERVER_URL+FILE_URL+data.files[0].filename+'"  height="200px"/></div></li>');
                        }
                        var msgScroll=$(".chat_top").scrollTop();
                        var sendHeight=$(".chat_top .sended_msg:last").outerHeight()+200;
                        msgScroll+=sendHeight;
                        $(".chat_top").animate({scrollTop:msgScroll},0);
                    }
                }
            });
        }
    });
    //发送视频

    // 发送消息
    $(".send").tap(function() {
        var inputContain=$(".input_area").val();
        if(inputContain && usId){
            // 与粉丝和患者聊天
            $.ajax({
                on: true,
                type:"post",
                url: LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/query_sendText_data?usId='+usId+'&accessToken='+accessToken+'&hugId='+hugId+'&targetHugId='+targetHugId+'&content='+encodeURI(inputContain)+'&chatType=2',
                dataType:"json",
                beforeSend:function(){
                    if($("#myHead").val()){
                        $(".chat_top").append('<li><div class="send_head"><img src='+SERVER_URL+FILE_URL+$("#myHead").val()+'/></div><div class="sended_msg"><div class="send_triangle design_icon"></div><span>'+inputContain+'</span></div><div class="loader"><img src="/web-bin/resources/images/loading_1.gif" width="20px"/></div></li>');
                    }else{
                        $(".chat_top").append('<li><div class="send_head design_icon"></div><div class="sended_msg"><div class="send_triangle design_icon"></div><span>'+inputContain+'</span></div><div class="loader"><img src="/web-bin/resources/images/loading_1.gif" width="20px"/></div></li>');
                    }
                },
                success: function(data){
                    if(data.res==0){
                        $(".chat_top").find(".loader").remove();
                        var msgScroll=$(".chat_top").scrollTop();
                        var sendHeight=$(".chat_top .sended_msg:last").outerHeight()+20;
                        var status=$("#status").val();
                        msgScroll+=sendHeight;
                        $(".chat_top").animate({scrollTop:msgScroll},0);
                        // 发送消息置顶
                        var key=hugId+'-'+targetHugId;
                        var docMsgList=sessionStorage['docMsgList'+hugId]?JSON.parse(sessionStorage['docMsgList'+hugId]):[];
                        if(docMsgList.length==0){
                            docMsgList.unshift({
                                sender:key,
                                number:0,
                                targetHugId:targetHugId,
                                lastmsg:inputContain,
                                head:head
                            });
                        }else{
                            var pasteDoc=[];
                            $.each(docMsgList,function(index){
                                pasteDoc.push(docMsgList[index].sender);
                            });
                            var arrIndex=$.inArray(key,pasteDoc);
                            if(arrIndex==-1){
                                docMsgList.unshift({
                                    sender:key,
                                    number:0,
                                    targetHugId:targetHugId,
                                    lastmsg:inputContain,
                                    head:head
                                });
                            }else{
                                docMsgList[arrIndex].lastmsg=inputContain;
                                var docIndex=docMsgList.splice(arrIndex,1);
                                docMsgList.unshift(docIndex[0]);
                            }
                        }
                        sessionStorage['docMsgList'+hugId]=JSON.stringify(docMsgList);
                        // 判断免费条数
                        if(status==1){
                            $.ajax({
                                on: true,
                                type:"post",
                                url: LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/query_sendPatient_data?usId='+usId+'&accessToken='+accessToken+'&hugId='+hugId+'&targetHugId='+targetHugId,
                                dataType:"json",
                                success: function(data){
                                    if(data.res==0 && data.data){
                                        console.log(data.data.left)
                                        $(".sender").find("span").html(data.data.left);
                                    }
                                }
                            });
                        }
                    }else{
                        $(".chat_top").find(".loader img").attr("src","/web-bin/resources/images/sendError.png");
                        var msgScroll=$(".chat_top").scrollTop();
                        var sendHeight=$(".chat_top .sended_msg:last").outerHeight()+20;
                        msgScroll+=sendHeight;
                        $(".chat_top").animate({scrollTop:msgScroll},0);
                        art.dialog({
                            content:data.msg,
                            icon: 'error',
                            time: 1.5
                        });
                    }
                },
                error: function(){
                    $(".chat_top").find(".loader img").attr("src","/web-bin/resources/images/sendError.png");
                    var msgScroll=$(".chat_top").scrollTop();
                    var sendHeight=$(".chat_top .sended_msg:last").outerHeight()+20;
                    msgScroll+=sendHeight;
                    $(".chat_top").animate({scrollTop:msgScroll},0);
                }
            });
            $(".input_area").val("");
        }else{
            art.dialog({
                content: "发送内容不能为空！",
                icon: 'error',
                time: 1.5
            });
        }
    });
    // 重新发送
    $(".chat_top").on("tap",".loader",function(){
        var loaderMsg=$(this);
        var inputContainError=$(this).siblings(".sended_msg").find("span").text();
        $.ajax({
            on: true,
            type:"post",
            url: LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/query_sendText_data?usId='+usId+'&accessToken='+accessToken+'&hugId='+hugId+'&targetHugId='+targetHugId+'&content='+inputContainError+'&chatType=1',
            dataType:"json",
            beforeSend:function(){
                loaderMsg.find("img").attr("src","/web-bin/resources/images/loading_1.gif");
            },
            success: function(data){
                if(data.res==0){
                    loaderMsg.remove();
                }else{
                    loaderMsg.find("img").attr("src","/web-bin/resources/images/sendError.png");
                }
            },
            error: function(){
                loaderMsg.find("img").attr("src","/web-bin/resources/images/sendError.png");
            }
        });
    });
    $(".chat_top").on("tap",".receive_question[data-type=0]",function(){
        var id=$(this).find(".question_id").html();
        location.href=LOCALHOST_URL+"/web-bin/m/nosen/oneparam/followup/form/to_replyForm_page/"+id
    });
    $(".chat_top").on("tap",".receive_question[data-type=6]",function(){
        var id=$(this).find(".question_id").html();
        location.href=LOCALHOST_URL+"/web-bin/m/nosen/oneparam/followup/education/to_checkEducation_page/"+id
    });
    $(".chat_top").on("tap",".sended_question[data-type=0]",function(){
        var id=$(this).find(".question_id").html();
        location.href=LOCALHOST_URL+"/web-bin/m/nosen/oneparam/followup/form/to_replyForm_page/"+id
    });
    //清空未读消息
    function clearMsg1(){
        //清空未读消息
        $.ajax({
            on: true,
            type: "post",
            url: LOCALHOST_URL  + '/web-bin/m/weChat/weChatPublic/query_doing_data?accessToken=' + accessToken + '&usId=' + usId + '&hugId='+hugId+'&targetHugId='+targetHugId,
            dataType: "json",
            success: function (data) {
                console.log(data)
            }
        });
    }
    if(targetHugId){
        clearMsg1();
    }
    /////////////////////接收消息以及展示
    chat();
    function chat(){
        var url='/web-bin/m/weChat/weChatPublic/query_userMsg_data?hgId='+hugId+'&partnerType=7';
        $.ajax({
            on: true,
            type:"post",
            url: LOCALHOST_URL+url,
            dataType:"json",
            success: function(data){
                if(data.res==0){
                    $(".login_back").hide();
                    var voipAmount=data.data.voipAmount;
                    var voipPwd=data.data.voipPwd;
                    var id=data.data.id;
                    var verify=data.data.verify;
                    var myHead=data.data.head;
                    // var sourseId=data.data.sourseId
                    $("#myHead").val(myHead);
                    // 消息记录展示
                    var newResult=[];
                    function msgShow() {
                        $.ajax({
                            on: true,
                            type: "post",
                            url: LOCALHOST_URL  + '/web-bin/m/weChat/weChatPublic/query_msg_data?accessToken=' + accessToken + '&usId=' + usId + '&hugId='+hugId+'&targetHugId='+targetHugId+'&pageNumber='+pagenumber+'&pageSize='+size,
                            beforeSend:function(){
                                $(".show_more_box").show();
                            },
                            dataType: "json",
                            success: function (data) {
                                $(".show_more_box").hide();
                                if(data.res==0 && data.data.result.length==0){
                                    $(".show_more_box").remove();
                                    return;
                                }
                                if(data.res==0){
                                    $.each(data.data.result,function(i,item){
                                        if(item.hugId==hugId){
                                            item.type=0
                                        }else{
                                            item.type=1
                                        }
                                        item.msgDomain=JSON.parse(item.msgDomain);
                                        newResult.unshift(item)
                                    });
                                    $(".chat_top").setTemplateElement("session_template_msgList").processTemplate(newResult);
                                    $(".chat_top .img_box").find("img").each(function(){
                                        var idSrc=$(this).siblings(".id_src").val();
                                        $(this).prop("src",SERVER_URL+FILE_URL+idSrc)
                                    });
                                    $(".chat_top .audio_controller").find("audio").each(function(){
                                        var idSrc=$(this).siblings(".id_src").val();
                                        $(this).prop("src",SERVER_URL+FILE_URL+idSrc);
                                    });
                                    $(".chat_top .video_controller").find("video").each(function(){
                                        var idSrc=$(this).siblings(".id_src").val();
                                        var imgSrc=$(this).siblings(".video_imgSrc").val();
                                        $(this).siblings(".firstImage").attr("src",SERVER_URL+FILE_URL+imgSrc);
                                        $(this).find("source").prop("src",localhostUrl+'/dynamicVideo/'+idSrc+'.mp4');
                                    });
                                    if(head=="undefined"){
                                        $(".chat_top").find(".receive_head").addClass("design_icon");
                                    }else{
                                        if(head.indexOf("hug-web")>0){
                                            $(".chat_top").find(".receive_head").removeClass("design_icon").append('<img src='+head+' alt="">');
                                        }else{
                                            $(".chat_top").find(".receive_head").removeClass("design_icon").append('<img src='+SERVER_URL+FILE_URL+head+' alt="">');
                                        }
                                    }
                                    $('.receive_head img').on('error', function () {
                                        $(this).prop('src', '/web-bin/weChat/weChatPublic/img/docHead.png');
                                    });
                                    if(!myHead){
                                        $(".chat_top").find(".send_head").html("");
                                    }else{
                                        $(".chat_top").find(".send_head").removeClass("design_icon").append('<img src='+SERVER_URL+FILE_URL+myHead+' alt="">');
                                    }
                                    $('.send_head img').on('error', function () {
                                        $(this).prop('src', '/web-bin/weChat/weChatPublic/img/docHead.png');
                                    });
                                    if(pagenumber==1){
                                        if($(".chat_top li:last").offset()){
                                            var lastHeight=$(".chat_top li:last").offset().top;
                                            $(".chat_top").animate({scrollTop:lastHeight},0);
                                        }
                                    }else{
                                        if($(".chat_top li:last").offset()){
                                            var lastHeight=$(".chat_top li:last").offset().top;
                                            $(".chat_top").animate({scrollTop:lastHeight/3},0);
                                        }
                                    }
                                }
                            },
                            error:function(){
                                $(".show_more_box").hide();
                            }
                        });
                    }
                    if(targetHugId){
                        msgShow();
                    }
                    // 查看更多消息
                    $(".chat_top").on('scroll',function(){
                        var p=$(this).scrollTop();
                        $(".input_area").blur();
                        if(p==0) {
                            pagenumber++;
                            msgShow();
                        }
                    });
                    // 医患数据表
                    var patientMsgList=sessionStorage['patientMsgList'+hugId]?JSON.parse(sessionStorage['patientMsgList'+hugId]):[];
                    // ---------------医患聊天
                    // 点击医患信息列表，展示患者或粉丝消息
                    $(document).on("tap",".list_box li",function(event){
                        var $sender=$(this);
                        var doctorName=$sender.find(".doctor_name").text();
                        var targetHugId=$(this).attr("data-hugId");
                        var docMsgList=sessionStorage['docMsgList'+hugId]?JSON.parse(sessionStorage['docMsgList'+hugId]):[];
                      /*  $(".active_msgli").removeClass("active_msgli");
                        $sender.addClass("active_msgli");*/
                        // $(".doctor_spot,.msg_doctor_spot").hide();
                        $sender.find(".msg_number").hide().html("0");
                        $.each(docMsgList,function(index){
                            if(docMsgList[index].sender==hugId+'-'+$sender.attr("data-hugid")){
                                docMsgList[index].number=0;
                            }
                        });
                        sessionStorage['docMsgList'+hugId]=JSON.stringify(docMsgList);
                        location.href=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/to_chat_page?accessToken=' + accessToken +'&usId=' + usId + '&targetHugId='+targetHugId+'&hugId='+hugId+'&head='+$sender.find("img").attr("src")+'&myHead='+myHead+'&doctorName='+doctorName;
                        event.stopPropagation();
                    });
                    $(document).on("tap",".doc_list li",function(event){
                        var $sender=$(this);
                        var doctorName=$sender.find(".doctor_name").text();
                        var targetHugId=$sender.attr("data-hugId");
                        location.href=LOCALHOST_URL+'/web-bin/m/weChat/weChatPublic/to_chat_page?accessToken=' + accessToken +'&usId=' + usId + '&targetHugId='+targetHugId+'&hugId='+hugId+'&head='+$sender.find("img").attr("src")+'&myHead='+myHead+'&doctorName='+doctorName;
                        event.stopPropagation();
                    });
                    // 接受消息------------------------------------------------------------------------------初始化SDK
                    var resp=RL_YTX.init("aaf98f894dae9c16014db81e4e16084d");
                    if(170002== resp.code){
                        alert('缺少必要参数，详情见msg参数');
                        //缺少必要参数，详情见msg参数
                        //用户逻辑处理
                    }else if(174001 == resp.code){
                        //不支持HTML5，关闭页面
                        alret('不支持HTML5，关闭页面');
                        //用户逻辑处理
                    }else if(200 == resp.code){
                        //初始化成功
                        //用户逻辑处理
                        //判断不支持的功能，屏蔽页面展示
                        var unsupport = resp.unsupport;
                    }
                    // 登录成功回调：消息列表初始化
                    $.ajax({
                        on: true,
                        type: "post",
                        url: LOCALHOST_URL+ '/web-bin/m/weChat/weChatPublic/query_list_data?accessToken=' + accessToken +'&usId=' + usId + '&hugId='+hugId,
                        dataType: "json",
                        success: function (data) {
                            if(data.res==0){
                                var docMsgList=sessionStorage['docMsgList'+hugId]?JSON.parse(sessionStorage['docMsgList'+hugId]):[];
                                $.each(data.data,function(i,item){
                                    var key=hugId+'-'+item.targetHugId;
                                    if(item.type==3){
                                        var docArr=[];
                                        $.each(docMsgList,function(i,item){
                                            docArr.push(item.sender);
                                        });
                                        var docIndex=$.inArray(key,docArr)
                                        if(docIndex==-1){
                                            docMsgList.push({
                                                sender:key,
                                                number:item.unreadMessages,
                                                targetHugId:item.targetHugId,
                                                nickName:item.name,
                                                lastmsg:item.msgContent,
                                                head:item.head
                                            });
                                            sessionStorage['docMsgList'+hugId]=JSON.stringify(docMsgList);
                                        }
                                        if(item.unreadMessages!=0){
                                            $(".spot_msg").show();
                                        }
                                    }
                                });
                            }
                        }
                    });
                    //账号登录参数设置
                    var loginBuilder = new RL_YTX.LoginBuilder();
                    loginBuilder.setType(3);//登录类型 1账号登录，3通讯账号密码登录
                    loginBuilder.setUserName(voipAmount);//设置用户名
                    loginBuilder.setPwd(voipPwd);//type值为1时，密码可以不赋值
                    //执行用户登录
                    RL_YTX.login(loginBuilder, function () {
                        console.log("登陆成功");
                        RL_YTX.onMsgReceiveListener(function (obj) {
                            console.log(obj);
                            var docMsgList=sessionStorage['docMsgList'+hugId]?JSON.parse(sessionStorage['docMsgList'+hugId]):[];
                            // 发来的消息处理
                            var msgDomain=JSON.parse(obj.msgDomain);
                            var key=hugId+'-'+msgDomain.sd;
                            // 获取本地时间，过滤未知消息
                            var myDate = new Date();
                            var msgTime=myDate.getTime()-obj.msgDateCreated;
                            if(msgTime/1000>20){
                                console.log(msgTime)
                                // 解决ios页面不刷新
                                var isPageHide = false;
                                window.addEventListener('pageshow', function () {
                                    if (isPageHide) {
                                        window.location.reload();
                                    }
                                });
                                window.addEventListener('pagehide', function () {
                                    isPageHide = true;
                                });
                                return;
                            }
                            // 保存消息记录函数
                            function savedata(msgDomain){
                                if(msgDomain.sd){
                                    if(msgDomain.userType==3){
                                        $(".spot_msg").show();
                                        if(docMsgList.length==0){
                                            docMsgList.unshift({
                                                sender:key,
                                                number:1,
                                                targetHugId:msgDomain.sd,
                                                nickName:msgDomain.name,
                                                lastmsg:obj.msgContent,
                                                head:msgDomain.head
                                            });
                                        }else{
                                            var pasteDoc=[];
                                            $.each(docMsgList,function(index){
                                                pasteDoc.push(docMsgList[index].sender);
                                            });
                                            var arrIndex=$.inArray(key,pasteDoc);
                                            if(arrIndex==-1){
                                                docMsgList.unshift({
                                                    sender:key,
                                                    number:1,
                                                    targetHugId:msgDomain.sd,
                                                    nickName:msgDomain.name,
                                                    lastmsg:obj.msgContent,
                                                    head:msgDomain.head
                                                });
                                            }else{
                                                docMsgList[arrIndex].number++;
                                                docMsgList[arrIndex].lastmsg=obj.msgContent;
                                                var docIndex=docMsgList.splice(arrIndex,1);
                                                docMsgList.unshift(docIndex[0]);
                                            }
                                        }
                                        sessionStorage['docMsgList'+hugId]=JSON.stringify(docMsgList);
                                    }
                                }
                            }
                            // ------------------------------消息分类
                            if(msgDomain.protocol==820004 || msgDomain.protocol==820005 || msgDomain.protocol==820006 || msgDomain.protocol==820007 || msgDomain.protocol==820010){
                                var lastMsgBox=$('.chat_in').find(".chat_top");
                                //清空未读消息
                                function clearMsg(){
                                    $.ajax({
                                        on: true,
                                        type: "post",
                                        url: LOCALHOST_URL+ '/web-bin/m/weChat/weChatPublic/query_doing_data?accessToken=' + accessToken + '&usId=' + id + '&hugId='+hugId+'&targetHugId='+msgDomain.sd,
                                        dataType: "json",
                                        success: function (data) {
                                            if(data.res==0){
                                                console.log("清除未读消息成功")
                                            }
                                        }
                                    });
                                }
                                // 与当前好友正在对话,将发来的消息展示
                                if(!msgDomain.partnerType){
                                    //正在通话时消息接受处理
                                    if (targetHugId==msgDomain.sd){
                                        //清空未读消息
                                        clearMsg();
                                        // session消息对应未读清0
                                        $.each(docMsgList, function (index) {
                                            if (docMsgList[index].sender == hugId + '-' + msgDomain.sd) {
                                                docMsgList[index].number = -1;
                                            }
                                        });
                                        sessionStorage['docMsgList'+hugId]=JSON.stringify(docMsgList);
                                        if(msgDomain.protocol==820006){
                                            if(msgDomain.head){
                                                lastMsgBox.append('<li><div class="receive_head"><img src='+SERVER_URL+FILE_URL+msgDomain.head+'/></div><div class="receive_msg"><div class="receive_triangle design_icon design_icon"></div><span>'+obj.msgContent+'</span></div></li>');
                                            }else{
                                                lastMsgBox.append('<li><div class="receive_head  design_icon"></div><div class="receive_msg"><div class="receive_triangle design_icon design_icon"></div><span>'+obj.msgContent+'</span></div></li>');
                                            }
                                        }else if(msgDomain.protocol==820010){
                                            //宣传问卷
                                            if(msgDomain.categType==6){
                                                //宣教
                                                if(msgDomain.head){
                                                    lastMsgBox.append('<li><div class="receive_head"><img src='+SERVER_URL+FILE_URL+msgDomain.head+'/></div><div class="receive_question" data-type="6"><div class="receive_triangle design_icon"></div><span style="display:none" class="question_id">'+msgDomain.id+'</span><div class="question_title">'+msgDomain.title+'</div><div class="education_png"></div></div></li>');
                                                }else{
                                                    lastMsgBox.append('<li><div class="receive_head design_icon"></div><div class="receive_question" data-type="6"><div class="receive_triangle design_icon"></div><span style="display:none" class="question_id">'+msgDomain.id+'</span><div class="question_title">'+msgDomain.title+'</div><div class="education_png"></div></div></li>');
                                                }
                                            }else{
                                                //问卷
                                                if(msgDomain.head){
                                                    lastMsgBox.append('<li><div class="receive_head"><img src='+SERVER_URL+FILE_URL+msgDomain.head+'/></div><div class="receive_question" data-type=0><div class="receive_triangle design_icon"></div><span style="display:none" class="question_id">'+msgDomain.id+'</span><div class="question_title">'+msgDomain.title+'</div><div class="question_png"></div></div></li>');
                                                }else{
                                                    lastMsgBox.append('<li><div class="receive_head design_icon"></div><div class="receive_question" data-type=0><div class="receive_triangle design_icon"></div><span style="display:none" class="question_id">'+msgDomain.id+'</span><div class="question_title">'+msgDomain.title+'</div><div class="question_png"></div></div></li>');
                                                }
                                            }
                                        }else if(msgDomain.protocol==820007){
                                            //多媒体
                                            if(msgDomain.msgType==1){
                                                if(msgDomain.head) {
                                                    lastMsgBox.append('<li><div class="receive_head"><img src='+SERVER_URL+FILE_URL+msgDomain.head+'/></div><div class="audio_controller"><div class="receive_triangle design_icon"></div><div class="audio_img"><img src="/interview/followup/chat/images/audio.png"/></div><span>'+msgDomain.chatLength+'s</span><audio src="'+ SERVER_URL+ FILE_URL+msgDomain.id+'"></audio></div></li>');
                                                }else{
                                                    lastMsgBox.append('<li><div class="receive_head  design_icon"></div><div class="audio_controller"><div class="receive_triangle design_icon"></div><div class="audio_img"><img src="/interview/followup/chat/images/audio.png"/></div><span>'+msgDomain.chatLength+'s</span><audio src="'+ SERVER_URL+ FILE_URL+msgDomain.id+'"></audio></div></li>');
                                                }
                                            }else if(msgDomain.msgType==2) {
                                                if(msgDomain.head){
                                                    lastMsgBox.append('<li><div class="receive_head"><img src='+SERVER_URL+FILE_URL+msgDomain.head+'/></div><div class="video_controller"><div class="play_video"><img src="/web-bin/resources/images/play.png"/></div><div class="receive_triangle design_icon"></div><input type="hidden" value="'+msgDomain.firstImage+'" class="video_imgSrc"><img src="'+SERVER_URL+ FILE_URL+msgDomain.firstImage+'" alt="" class="firstImage"><video width="1" height="1"><source src="'+ localhostUrl+'/dynamicVideo/'+msgDomain.id+'.mp4" type="video/mp4" /></video></div></li>');
                                                }else{
                                                    lastMsgBox.append('<li><div class="receive_head  design_icon"></div><div class="video_controller"><div class="play_video"><img src="/web-bin/resources/images/play.png"/></div><div class="receive_triangle design_icon"></div><input type="hidden" value="'+msgDomain.firstImage+'" class="video_imgSrc"><img src="'+SERVER_URL+ FILE_URL+msgDomain.firstImage+'" alt="" class="firstImage"><video width="1" height="1"><source src="'+ localhostUrl+'/dynamicVideo/'+msgDomain.id+'.mp4" type="video/mp4" /></video></div></li>');
                                                }
                                            }else {
                                                if(msgDomain.head){
                                                    lastMsgBox.append('<li><div class="receive_head"><img src='+SERVER_URL+FILE_URL+msgDomain.head+'/></div><div class="img_box"><div class="receive_triangle design_icon"></div><img src="'+ SERVER_URL+ FILE_URL+msgDomain.id+'" height="200px"/></div></li>');
                                                }else{
                                                    lastMsgBox.append('<li><div class="receive_head  design_icon"></div><div class="img_box"><div class="receive_triangle design_icon"></div><img src="'+ SERVER_URL+ FILE_URL+msgDomain.id+'" height="200px"/></div></li>');
                                                }
                                            }
                                        }
                                        var msgScroll=lastMsgBox.scrollTop();
                                        if(msgDomain.protocol==820006){
                                            msgScroll+=62;
                                        }else if(msgDomain.protocol==820010){
                                            msgScroll+=125;
                                        } if(msgDomain.protocol==820007){
                                            if(msgDomain.msgType==1){
                                                msgScroll+=62;
                                            }else if(msgDomain.msgType==2) {
                                                msgScroll+=200;
                                            }else {
                                                msgScroll+=200;
                                            }
                                        }
                                        lastMsgBox.animate({scrollTop:msgScroll},0);
                                    }else{
                                        // 微信端发送消息推送置顶
                                        var msgLeft=[];
                                        $(document).find(".list_box li").each(function(){
                                            var $msgReceiver=$(this);
                                            msgLeft.push($msgReceiver.attr("data-hugid"));
                                            if ($msgReceiver.attr("data-hugid")==msgDomain.sd){
                                                $msgReceiver.find(".msg_number").show();
                                                var msgNum=$msgReceiver.find(".msg_number").text();
                                                msgNum++;
                                                $msgReceiver.find(".msg_number").html(msgNum);
                                                $msgReceiver.find(".bottom_msg").html(obj.msgContent);
                                            };
                                        });
                                        var msgIndex=$.inArray(msgDomain.sd,msgLeft);
                                        if(msgIndex==-1){
                                            if(msgDomain.head){
                                                $(document).find(".list_box").prepend(' <li data-hugId='+msgDomain.sd+'><div class="head_box"><div class="head doc_head"><img src='+SERVER_URL+FILE_URL+msgDomain.head+'/></div>' +
                                                    '</div><div class="msg_number">1</div><div class="person_msg"><div class="top_msg">' +
                                                    '<div class="left_name substr doctor_name">'+msgDomain.name+'</div></div>' +
                                                    '<div class="bottom_msg substr">'+obj.msgContent+'</div></div></li>');
                                            }else{
                                                $(document).find(".list_box").prepend(' <li data-hugId='+msgDomain.sd+'><div class="head_box"><div class="head doc_head"></div>' +
                                                    '</div><div class="msg_number">1</div><div class="person_msg"><div class="top_msg">' +
                                                    '<div class="left_name substr doctor_name">'+msgDomain.name+'</div></div>' +
                                                    '<div class="bottom_msg substr">'+obj.msgContent+'</div></div></li>');
                                            };
                                        }else{
                                            $(document).find(".list_box").prepend($(".list_box li").eq(msgIndex));
                                        }

                                    }
                                    savedata(msgDomain);
                                }
                            }
                        });
                        RL_YTX.onConnectStateChangeLisenter(function (obj) {
                            //连接状态变更
                            console.log(obj)
                            console.log(obj.code)
                            // obj.code;//变更状态 1 断开连接 2 重连中 3 重连成功 4 被踢下线 5 断开连接，需重新登录
                            // 断线需要人工重连
                        });
                    }, function (obj) {
                        //登录失败方法回调
                        alert('登陆失败');
                    });
                }else{
                    $(".rememberMeBox").html(data.msg)
                }
            }
        });
    }
});