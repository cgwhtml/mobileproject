/**
 * Created by 风殇 on 2017/7/6.
 */
$(function(){
    var localhostUrl=window.location.origin;//window.HUGPAGE_CONFIG.localhostUrl;
    var query=window.location.search;
    query=decodeURIComponent(query,"UTF-8");
    var SERVER_URL=window.HUGPAGE_CONFIG.SERVER_URL;//读取图片服务器路径
    var FILE_URL=window.HUGPAGE_CONFIG.FILE_URL;//读取图片文件路径
    // 父页面window对象
    var parent = art.dialog.opener;
    // 当前dialog
    var dialog = art.dialog.open.api;
    // var QUESTION_URL=window.HUGPAGE_CONFIG.QUESTION_URL;
    var usId=query&&query.split("&")[0].split("?usId=")[1];
    var accessToken=query&&query.split("&")[1].split("accessToken=")[1];
    var hugId=query&&query.split("&")[2].split("hugId=")[1];
    var targetHugId=query&&query.split("&")[3].split("targetHugId=")[1];
    var myHead=query&&query.split("&")[4].split("myHead=")[1];
    if(query.split("&")[5]){
        var type=query&&query.split("&")[5].split("type=")[1];
    }
    var patientMsgListSend=localStorage['patientMsgListSend'+hugId]?JSON.parse(localStorage['patientMsgListSend'+hugId]):[];
    var size=6;
    var pagenumber=1;

    $(".question_box").niceScroll({
        railpadding: { top:0, right: 0, left: 0, bottom:0 },
        cursoropacitymin: 0.4,
        cursoropacitymax: 0.4,
        cursorcolor:"#515153",
        zindex: "99",
        cursorwidth: "6px"
    });
    // 输入框
    $(".s_input").inputer({
        css:{"width":"380px"},
        callback:function(){
            return false;
        }
    });
    //宣教
    if(type==2){
        $(".csm_search_btn").click(function(){
            var title=$(".query_question ").val();
            if(title=="查找宣传问卷"){
                var queryTitle='&title=';
            }else{
                var queryTitle='&title='+title;
            }
            $.ajax({
                async:true,
                on: true,
                type:"post",
                url: localhostUrl+'/web-bin/p/followup/chat/query_educate_data?pageSize=6&pageNumber=1&usId='+usId+'&accessToken='+accessToken+queryTitle,
                dataType:"json",
                beforeSend:function(){
                    $("#loading").show();
                },
                success: function(data){
                    if(data.res==0){
                        $("#loading").hide();
                        $(".question_box").setTemplateElement("template_question").processTemplate(data.data.result);
                    }
                }
            });
        });
        $(".csm_search_btn").click();
        $(".question_box").on('scroll',function(e){
            var p=$(this).scrollTop();
            var questionLength=$(".question_box li").length;
            var questionScroll=$(".question_box li").outerHeight()*questionLength-$(".question_box").height();
            if(p==questionScroll){
                pagenumber++;
                page='&pageNumber='+pagenumber+'&pageSize='+size;
                $.ajax({
                    async:true,
                    on: true,
                    type:"post",
                    url: localhostUrl+'/web-bin/p/followup/chat/query_educate_data?usId='+usId+'&accessToken='+accessToken+page,
                    dataType:"json",
                    beforeSend:function(){
                        $("#loading").show();
                    },
                    success: function(data){
                        if(data.res==0) {
                            $("#loading").hide();
                            $.each(data.data.result, function (i, item) {
                                $(".question_box").append('<li data-role="0"><div class="questionPng"></div><div class="question_name"><span>' + item.title + '</span></div><input type="hidden" class="question_id" value=' + item.id + '><div class="spot"></div></li>');
                            });
                        }
                    }
                });
            }
        });
        $(".question_box").on("click",function(e){
            var event=e.srcElement||e.target;
            if($(event).hasClass("send_choosen") || $(event).hasClass("active_send_choosen")){
                $(".send_code").addClass("active_send_code");
            }else{
                $(".send_code").removeClass("active_send_code");
            }
        });
        $(".question_box").on("click",".spot",function(event){
            $(".spot_active").removeClass("spot_active");
            $(".question_box li").attr("data-role",0);
            $(this).addClass("spot_active");
            $(this).parent().attr("data-role",1);
            event.stopPropagation();
        });
        /*    $(".question_box").on("click","li",function(e){
         var  id=$(this).find(".question_id").val();
         $.ajax({
         async:false,
         on: true,
         type:"get",
         url: localhostUrl+'/web-bin/p/followup/chat/query_questionContain_data?usId='+usId+'&accessToken='+accessToken+'&hugId='+hugId+'&id='+id,
         dataType:"json",
         success: function(data){
         console.log(data)
         }
         });
         });*/
        $(".send").click(function(){
            var  $sendQuestion=$(".question_box li[data-role=1]");
            var  id=$sendQuestion.find(".question_id").val();
            var  patHugId=targetHugId;
            var  title=$sendQuestion.find("span").text();
            $.ajax({
                async:false,
                on: true,
                type:"post",
                url: localhostUrl+'/web-bin/p/followup/chat/submit_educate_data?usId='+usId+'&accessToken='+accessToken+'&patHugId='+patHugId+'&id='+id,
                dataType:"json",
                success: function(data){
                    if(data.res==0){
                        var questionId=data.data.id;
                        if(myHead!="undefined"){
                            parent.$(".chat_top").append('<li><div class="send_head"><img src='+SERVER_URL+FILE_URL+myHead+'/></div><div class="sended_question" data-type="6"><div class="send_triangle design_icon"></div><span style="display:none" class="question_id">'+questionId+'</span><div class="question_title">'+title+'</div><div class="education_png"></div></div></li>');
                        }else{
                            parent.$(".chat_top").append('<li><div class="send_head design_icon"></div><div class="sended_question" data-type="6"><div class="send_triangle design_icon"></div><span style="display:none" class="question_id">'+questionId+'</span><div class="question_title">'+title+'</div><div class="education_png"></div></div></li>');
                        }
          /*              if(myHead!="undefined"){
                            patientMsgListSend.push({sender:KEY,questionId:questionId,title:title,myHead:SERVER_URL+FILE_URL+myHead,categType:6,time:data.time});
                        }else{
                            patientMsgListSend.push({sender:KEY,questionId:questionId,title:title,categType:6,time:data.time});
                        }
                        localStorage['patientMsgListSend'+hugId]=JSON.stringify(patientMsgListSend);*/
                        dialog.close();
                        var msgScroll=parent.$(".chat_top").scrollTop();
                        var sendHeight=parent.$(".chat_top .sended_msg:last").outerHeight()+125;
                        msgScroll+=sendHeight;
                        parent.$(".chat_top").animate({scrollTop:msgScroll},0);
                    }else{
                        art.dialog({
                            content:data.msg,
                            icon: 'error',
                            time: 1.5
                        });
                    }
                }
            });
        });
    }else{
        //--------------------------------------------------华丽的分割线------------------------------------
        // 问卷
        $(".csm_search_btn").click(function(){
            var title=$(".query_question").val();
            if(title=="查找宣传问卷"){
                var queryTitle='&title=';
            }else{
                var queryTitle='&title='+title;
            }
            $.ajax({
                async:true,
                on: true,
                type:"post",
                url: localhostUrl+'/web-bin/p/followup/chat/query_question_data?pageSize=6&pageNumber=1&usId='+usId+'&accessToken='+accessToken+queryTitle,
                dataType:"json",
                beforeSend:function(){
                    $("#loading").show();
                },
                success: function(data){
                    if(data.res==0) {
                        $("#loading").hide();
                        $(".question_box").setTemplateElement("template_question").processTemplate(data.data.result);
                    }
                }
            });
        });
        $(".csm_search_btn").click();
        $(".question_box").on('scroll',function(e){
            var p=$(this).scrollTop();
            var questionLength=$(".question_box li").length;
            var questionScroll=$(".question_box li").outerHeight()*questionLength-$(".question_box").height();
            if(p==questionScroll){
                pagenumber++;
                page='&pageNumber='+pagenumber+'&pageSize='+size;
                $.ajax({
                    async:true,
                    on: true,
                    type:"post",
                    url: localhostUrl+'/web-bin/p/followup/chat/query_question_data?usId='+usId+'&accessToken='+accessToken+page,
                    dataType:"json",
                    beforeSend:function(){
                        $("#loading").show();
                    },
                    success: function(data){
                        $("#loading").hide();
                        $.each(data.data.result,function(i,item){
                            $(".question_box").append('<li data-role="0"><div class="questionPng"></div><div class="question_name"><span>'+item.formTitle+'</span></div><input type="hidden" class="question_id" value='+item.id+'><div class="spot"></div></li>');
                        });
                    }
                });
            }
        });
        $(".question_box").on("click",function(e){
            var event=e.srcElement||e.target;
            if($(event).hasClass("send_choosen") || $(event).hasClass("active_send_choosen")){
                $(".send_code").addClass("active_send_code");
            }else{
                $(".send_code").removeClass("active_send_code");
            }
        });
        $(".question_box").on("click",".spot",function(event){
            $(".spot_active").removeClass("spot_active");
            $(".question_box li").attr("data-role",0);
            $(this).addClass("spot_active");
            $(this).parent().attr("data-role",1);
            event.stopPropagation();
        });
        /*    $(".question_box").on("click","li",function(e){
         var  id=$(this).find(".question_id").val();
         $.ajax({
         async:false,
         on: true,
         type:"get",
         url: localhostUrl+'/web-bin/p/followup/chat/query_questionContain_data?usId='+usId+'&accessToken='+accessToken+'&hugId='+hugId+'&id='+id,
         dataType:"json",
         success: function(data){
         console.log(data)
         }
         });
         });*/
        $(".send").click(function(){
            var  $sendQuestion=$(".question_box li[data-role=1]");
            var  id=$sendQuestion.find(".question_id").val();
            var  patHugId=targetHugId;
            var  title=$sendQuestion.find("span").text();
            $.ajax({
                async:false,
                on: true,
                type:"post",
                url: localhostUrl+'/web-bin/p/followup/chat/submit_question_data?usId='+usId+'&accessToken='+accessToken+'&patHugId='+patHugId+'&id='+id,
                dataType:"json",
                success: function(data){
                    if(data.res==0){
                        var questionId=data.data.id;
                        if(myHead!="undefined"){
                            parent.$(".chat_top").append('<li><div class="send_head"><img src='+SERVER_URL+FILE_URL+myHead+'/></div><div class="sended_question" data-type=0><div class="send_triangle design_icon"></div><span style="display:none" class="question_id">'+questionId+'</span><div class="question_title">'+title+'</div><div class="question_png"></div></div></li>');
                        }else{
                            parent.$(".chat_top").append('<li><div class="send_head design_icon"></div><div class="sended_question" data-type=0><div class="send_triangle design_icon"></div><span style="display:none" class="question_id">'+questionId+'</span><div class="question_title">'+title+'</div><div class="question_png"></div></div></li>');
                        }
                       /* if(myHead!="undefined"){
                            patientMsgListSend.push({sender:KEY,questionId:questionId,title:title,myHead:SERVER_URL+FILE_URL+myHead,time:data.time});
                        }else{
                            patientMsgListSend.push({sender:KEY,questionId:questionId,title:title,time:data.time});
                        }*/
                        // localStorage['patientMsgListSend'+hugId]=JSON.stringify(patientMsgListSend);
                        dialog.close();
                        var msgScroll=parent.$(".chat_top").scrollTop();
                        var sendHeight=parent.$(".chat_top .sended_msg:last").outerHeight()+125;
                        msgScroll+=sendHeight;
                        parent.$(".chat_top").animate({scrollTop:msgScroll},0);
                    }else{
                        art.dialog({
                            content:data.msg,
                            icon: 'error',
                            time: 1.5
                        });
                    }
                }
            });
        });
    }
});





