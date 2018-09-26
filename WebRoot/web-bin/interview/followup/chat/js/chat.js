$(function(){
    var localhostUrl=window.location.origin;//window.HUGPAGE_CONFIG.localhostUrl;
	// var PORT=window.HUGPAGE_CONFIG.PORT;//读取ajax的配置路径，读取url里的PORT
	var SERVER_URL=window.HUGPAGE_CONFIG.SERVER_URL;//读取图片服务器路径
	var FILE_URL=window.HUGPAGE_CONFIG.FILE_URL;//读取图片文件路径
    patId='';
	if(window.location.search){
        var query=window.location.search;
        query=decodeURIComponent(query,"UTF-8");
        if(query.indexOf("?")!=-1){
            var sourseId=query&&query.split("&")[1].split("sourceId=")[1];
            if(query.indexOf("patId")>0){
                patId=query&&query.split("&")[2].split("patId=")[1];
                var patName=query&&query.split("&")[3].split("patName=")[1];
            }
        }
	}
    if (!window.sessionStorage) {
	    art.dialog({
            content: "您当前浏览器存在风险，请升级浏览器！",
            icon: 'error'
        });
    }else{
        if(sourseId){
            //如果有参数，则样式改变
            $(".wrapper").css({padding:0});
            $(".friend_in").css({borderRadius:0});
            $(".chat_class_box").css({borderRadius:0});
            chat()
        }else{
            //-------------------------------------华丽的分割线-----------------------------------------------------------------------------------
            //sourceId没有传过来，则需要登录
            var userMsg=sessionStorage.userMsg?JSON.parse(sessionStorage.userMsg):{};
            if(userMsg.accessToken){
                $(".login_back").hide();
                var phone=userMsg.phone;
                var pwd=userMsg.pwd;
                chat(phone,pwd);
            }else{
                $(".login_back").show();
            }
            $("#account").focus();
            $(".sign-in").click(function(){
                var phone=$("#account").val();
                var pwd=$("#password").val();
                chat(phone,pwd);
            });
        }
        function chat(phone,pwd,url){
            if(phone && pwd){
                var url='/web-bin/p/followup/chat/query_userData_data?phone='+phone+'&pwd='+pwd+'&type=3&partnerType=10';
            }else{
                var url='/web-bin/p/followup/chat/query_sourceId_data?sourseId='+sourseId+'&partnerType=10';
            }
            $.ajax({
                on: true,
                type:"post",
                url: localhostUrl+url,
                dataType:"json",
                success: function(data){
                    if(data.res!=0){
                        art.dialog({
                            content:data.msg,
                            icon: 'error'
                        });
                        return;
                    }
                    if(data.res==0){
                        $(".login_back").hide();
                        var voipAmount=data.data.voipAmount;
                        var voipPwd=data.data.voipPwd;
                        var id=data.data.id;
                        var accessToken=data.data.accessToken;
                        var verify=data.data.verify;
                        hugId=data.data.hgId;
                        var interviewUser=data.data.interviewUser;
                        var myHead=data.data.head;
                        var sourseId=data.data.sourseId
                        userMsg={
                            accessToken:accessToken,
                            phone:phone,
                            pwd:pwd
                        };
                        sessionStorage.userMsg=JSON.stringify(userMsg);

                        // 医医数据表
                        var docMsgList=sessionStorage['docMsgList'+hugId]?JSON.parse(sessionStorage['docMsgList'+hugId]):[];
                        // 医患数据表
                        var patientMsgList=sessionStorage['patientMsgList'+hugId]?JSON.parse(sessionStorage['patientMsgList'+hugId]):[];
                        // ---------------医患聊天
                        // 医患聊天界面
                        $(".doctor_patient").click(function(){
                            patientMsgList=sessionStorage['patientMsgList'+hugId]?JSON.parse(sessionStorage['patientMsgList'+hugId]):[];
                            $(".doctor_contain").load( localhostUrl+"/web-bin/p/followup/chat/to_doctorPatient_page");
                            $(".active_class").removeClass("active_class");
                            $(this).addClass("active_class");
                            $(".patient_spot,.msg_patient_spot").hide();
                            // 查询医生粉丝
                            $(document).on("click",".choosen_model li:last",function(){
                                $(".search_fans_list").hide();
                            });
                            var size=20;
                            $.ajax({
                                on: true,
                                type:"post",
                                url: localhostUrl+'/web-bin/p/followup/chat/query_fans_data?accessToken='+accessToken+'&usId='+id+'&partnerType=10'+'&pageNumber=1'+'&pageSize='+size,
                                dataType:"json",
                                success: function(data){
                                    if(data.res==0 && data.data.result.length!=0){
                                        var fanslist1=[],fanslist2=[],fanslist3=[],fanslist4=[],fanslist5=[],fanslist6=[];
                                        var nowTime=new Date().getTime();
                                        var $fansList=$(".fans_group_list");
                                        function fanshow(data){
                                            $.each(data.data.result,function(index){
                                                var followTime=new Date(data.data.result[index].followTime).getTime();
                                                if((nowTime-followTime)/1000/60/60/24/30<=6){
                                                    if((nowTime-followTime)/1000/60/60/24/30>3&&(nowTime-followTime)/1000/60/60/24/30<=6){
                                                        fanslist5.push(data.data.result[index]);
                                                    }else if((nowTime-followTime)/1000/60/60/24/30>1&&(nowTime-followTime)/1000/60/60/24/30<=3){
                                                        fanslist4.push(data.data.result[index]);
                                                    }else{
                                                        if((nowTime-followTime)/1000/60/60/24>7&&(nowTime-followTime)/1000/60/60/24<=30){
                                                            fanslist3.push(data.data.result[index]);
                                                        }else if((nowTime-followTime)/1000/60/60/24>3&&(nowTime-followTime)/1000/60/60/24<=7){
                                                            fanslist2.push(data.data.result[index]);
                                                        }else{
                                                            fanslist1.push(data.data.result[index]);
                                                        }
                                                    }
                                                }else{
                                                    fanslist6.push(data.data.result[index]);
                                                }
                                            });
                                            $(".fans_list1").setTemplateElement("template_fansList").processTemplate(fanslist1);
                                            $(".fans_list2").setTemplateElement("template_fansList").processTemplate(fanslist2);
                                            $(".fans_list3").setTemplateElement("template_fansList").processTemplate(fanslist3);
                                            $(".fans_list4").setTemplateElement("template_fansList").processTemplate(fanslist4);
                                            $(".fans_list5").setTemplateElement("template_fansList").processTemplate(fanslist5);
                                            $(".fans_list6").setTemplateElement("template_fansList").processTemplate(fanslist6);
                                            for(var i=0;i<data.data.result.length;i++){
                                                if(data.data.result[i].head){
                                                    $(".friend_head_item").eq(i).html('<img src='+SERVER_URL+FILE_URL+data.data.result[i].head+'/>');
                                                }else{
                                                    $(".friend_head_item").eq(i).html('<div class="design_icon"></div>');
                                                }
                                            }
                                        };
                                        fanshow(data);
                                        // 与粉丝对话
                                        $fansList.find("ul").on("click","li",function(){
                                            var $sender=$(this);
                                            var sender=$sender.find(".patient_name").text();
                                            var targetHugId=$sender.attr("data-hugId");
                                            var patientMsgList=sessionStorage['patientMsgList'+hugId]?JSON.parse(sessionStorage['patientMsgList'+hugId]):[];
                                            $.each(patientMsgList,function(index){
                                                if(patientMsgList[index].sender==hugId+'-'+$sender.attr("data-hugid")){
                                                    patientMsgList[index].number=0;
                                                }
                                            });

                                            sessionStorage['patientMsgList'+hugId]=JSON.stringify(patientMsgList);
                                            $("#mainFrame").attr("src",localhostUrl+'/web-bin/p/followup/chat/to_patientChat_page?sender='+sender+'&targetHugId='+targetHugId+'&usId='+id+'&accessToken='+accessToken+'&hugId='+hugId+'&head='+$sender.find("img").attr("src")+'&keys='+hugId+'-'+$sender.attr("data-hugid")+'&myHead='+myHead+'&sourseId='+sourseId);
                                        });
                                        var pagenumber=1;
                                        $fansList.on('scroll',function(e){
                                            var p=$(this).scrollTop();
                                            var fansScroll=$(".fans_group_item").outerHeight()*6+$(".fans_group_list li").outerHeight()*$(".fans_group_list li").length-$fansList.height();
                                            if(p==fansScroll){
                                                pagenumber++;
                                                page='&pageNumber='+pagenumber+'&pageSize='+size;
                                                $.ajax({
                                                    on: true,
                                                    type:"post",
                                                    url: localhostUrl+'/web-bin/p/followup/chat/query_fans_data?accessToken='+accessToken+'&usId='+id+'&partnerType=10'+page,
                                                    dataType:"json",
                                                    success: function(data){
                                                        if(data.res==0 && data.data.result.length!=0){
                                                            $.each(data.data.result,function(index){
                                                                var followTime=new Date(data.data.result[index].followTime).getTime();
                                                                if((nowTime-followTime)/1000/60/60/24/30<=6){
                                                                    if((nowTime-followTime)/1000/60/60/24/30>3&&(nowTime-followTime)/1000/60/60/24/30<=6){
                                                                        fanslist5.append('<li data-hugId="'+data.data.result[index].targetHugId+'"><div class="friend_head_item"><div class="design_icon"></div></div><div class="msg_nameBox"><div class="patient_name substr">'+data.data.result[index].remarkName+'</div></div></li>');
                                                                    }else if((nowTime-followTime)/1000/60/60/24/30>1&&(nowTime-followTime)/1000/60/60/24/30<=3){
                                                                        fanslist4.append('<li data-hugId="'+data.data.result[index].targetHugId+'"><div class="friend_head_item"><div class="design_icon"></div></div><div class="msg_nameBox"><div class="patient_name substr">'+data.data.result[index].remarkName+'</div></div></li>');
                                                                    }else{
                                                                        if((nowTime-followTime)/1000/60/60/24>7&&(nowTime-followTime)/1000/60/60/24<=30){
                                                                            fanslist3.append('<li data-hugId="'+data.data.result[index].targetHugId+'"><div class="friend_head_item"><div class="design_icon"></div></div><div class="msg_nameBox"><div class="patient_name substr">'+data.data.result[index].remarkName+'</div></div></li>');
                                                                        }else if((nowTime-followTime)/1000/60/60/24>3&&(nowTime-followTime)/1000/60/60/24<=7){
                                                                            fanslist2.append('<li data-hugId="'+data.data.result[index].targetHugId+'"><div class="friend_head_item"><div class="design_icon"></div></div><div class="msg_nameBox"><div class="patient_name substr">'+data.data.result[index].remarkName+'</div></div></li>');
                                                                        }else{
                                                                            fanslist1.append('<li data-hugId="'+data.data.result[index].targetHugId+'"><div class="friend_head_item"><div class="design_icon"></div></div><div class="msg_nameBox"><div class="patient_name substr">'+data.data.result[index].remarkName+'</div></div></li>');
                                                                        }
                                                                    }
                                                                }else{
                                                                    fanslist6.append('<li data-hugId="'+data.data.result[index].targetHugId+'"><div class="friend_head_item"><div class="design_icon"></div></div><div class="msg_nameBox"><div class="patient_name substr">'+data.data.result[index].remarkName+'</div></div></li>');
                                                                }
                                                            });
                                                            for(var i=0;i<data.data.result.length;i++){
                                                                if(data.data.result[i].head){
                                                                    $(".friend_head_item").eq(i).html('<img src='+SERVER_URL+FILE_URL+data.data.result[i].head+'/>');
                                                                }else{
                                                                    $(".friend_head_item").eq(i).html('<div class="design_icon"></div>');
                                                                }
                                                            }
                                                        }
                                                    }
                                                });
                                            }
                                        });
                                        $(".fans_input").blur(function(){
                                            var searchFansValue=$(this).val();
                                            if(searchFansValue!="查找粉丝"){
                                                $(".search_fans_list").show();
                                                $.ajax({
                                                    on: true,
                                                    type:"post",
                                                    url: localhostUrl+'/web-bin/p/followup/chat/query_searchFans_data?accessToken='+accessToken+'&usId='+id+'&partnerType=10'+'&value='+searchFansValue,
                                                    dataType:"json",
                                                    success: function(data){
                                                        if(data.data){
                                                            $(".search_fans_list").setTemplateElement("template_fansList").processTemplate(data.data);
                                                            for(var i=0;i<data.data.length;i++){
                                                                if(data.data[i].head){
                                                                    $(".friend_head_item").eq(i).html('<img src='+SERVER_URL+FILE_URL+data.data[i].head+'/>');
                                                                }else{
                                                                    $(".friend_head_item").eq(i).html('<div class="design_icon"></div>');
                                                                }
                                                            }
                                                        }
                                                    }
                                                });
                                            }
                                        });
                                    }else{
                                        art.dialog({
                                            content:data.msg,
                                            time:1.5,
                                            icon:"error"
                                        });
                                    }
                                }
                            });
                        });
                        $(".doctor_patient").click();
                        // 点击患者管理，加载收藏患者
                        $(document).on("click",".choosen_model li:odd",function(){
                            if(interviewUser){
                                $.ajax({
                                    on: true,
                                    type:"post",
                                    url: localhostUrl+'/web-bin/p/followup/chat/query_patient_data?accessToken='+accessToken+'&usId='+id+'&partnerType=10',
                                    dataType:"json",
                                    success: function(data){
                                        if(data&&data.res==0){
                                            $(".patient_group_list").setTemplateElement("template_patientList").processTemplate(data.data);
                                            // 点击患者列表，与患者对话
                                            $(document).on("click",".people_list li,.search_patient_list li",function(){
                                                var $sender=$(this);
                                                var sender=$sender.find(".patient_name").text();
                                                var targetHugId=$sender.attr("data-hugId");
                                                var patientMsgList=sessionStorage['patientMsgList'+hugId]?JSON.parse(sessionStorage['patientMsgList'+hugId]):[];
                                                if(targetHugId){
                                                    // 将未阅读消息记录添加到已阅读医医消息记录
                                                    $.each(patientMsgList,function(index){
                                                        if(patientMsgList[index].sender==hugId+'-'+$sender.attr("data-hugid")){
                                                            patientMsgList[index].number=0;
                                                        }
                                                    });
                                                    sessionStorage['patientMsgList'+hugId]=JSON.stringify(patientMsgList);
                                                    if(targetHugId){
                                                        $("#mainFrame").attr("src",localhostUrl+'/web-bin/p/followup/chat/to_patientChat_page?sender='+sender+'&targetHugId='+targetHugId+'&usId='+id+'&accessToken='+accessToken+'&hugId='+hugId+'&head='+$sender.find("img").attr("src")+'&keys='+hugId+'-'+$sender.attr("data-hugid")+'&myHead='+myHead+'&sourseId='+sourseId);
                                                    }
                                                }else{
                                                    art.dialog({
                                                        content: "对方还没有注册蓝牛号，不能聊天！",
                                                        icon: 'error',
                                                        time: 1.8
                                                    });
                                                }
                                            });
                                        }else if(data.res==90002){
                                            art.dialog({
                                                content: data.msg,
                                                icon: 'error',
                                                time: 3.8
                                            });
                                        }
                                    }
                                });
                            }else{
                                art.dialog({
                                    content: "未绑定随访账号，不能查看收藏患者！",
                                    icon: 'error',
                                    time: 1.8
                                });
                            }
                            $(".patient_input").focus(function(){
                            }).blur(function(){
                                var searchPatientValue=$(this).val();
                                if(searchPatientValue!="查找患者"){
                                    $(".search_patient_list").show().html("");
                                    $(".people_list li").each(function(index){
                                        var $patient=$(this);
                                        var s=$patient.find(".patient_name").text().indexOf(searchPatientValue);
                                        if(s!=-1){
                                            $patient.clone().appendTo('.search_patient_list');
                                        }
                                    });
                                }
                            });
                        });
                        // -------------------------医医聊天
                        // 点击好友列表---------------------加载好友
                        // 医医聊天界面
                        $(".doctor_doc").click(function(){
                            docMsgList=sessionStorage['docMsgList'+hugId]?JSON.parse(sessionStorage['docMsgList'+hugId]):[];
                            $(".doctor_contain").load(localhostUrl+"/web-bin/p/followup/chat/to_doctorDoc_page");
                            $(".active_class").removeClass("active_class");
                            $(this).addClass("active_class");
                            $(".doctor_spot,.msg_doctor_spot").hide();
                            $.ajax({
                                on: true,
                                type:"post",
                                url: localhostUrl+'/web-bin/p/followup/chat/query_friend_data?accessToken='+accessToken+'&usId='+id+'&partnerType=10'+'&hugId='+hugId,
                                dataType:"json",
                                success: function(data){
                                    if(data&&data.data){
                                        var $doctorList=$(".doctor_group_list");
                                        var msgarr=[];
                                        var friendIdarr=[];
                                        $doctorList.setTemplateElement("template_friendNameList").processTemplate(data.data);
                                        for(var i=0;i<data.data.length;i++){
                                            if(data.data[i].head){
                                                $(".friend_head_item").eq(i).html('<img src='+SERVER_URL+FILE_URL+data.data[i].head+'/>');
                                            }else{
                                                $(".friend_head_item").eq(i).html('<div class="design_icon"></div>');
                                            }
                                        }
                                        // 将发来的消息与好友的friendId匹配
                                        $(".doc_msg_list li").each(function(index){
                                            var $li=$(this);
                                            msgarr.push($li.attr("data-hugid"));
                                        });
                                        $(".doctor_group_list li").each(function(index){
                                            var $li=$(this);
                                            friendIdarr.push($li.attr("data-hugid"));
                                        });
                                        for(var i=0;i<msgarr.length;i++){
                                            for(var j=0;j<friendIdarr.length;j++){
                                                if(msgarr[i]==friendIdarr[j]){
                                                    var friendMsgId=$(".doctor_group_list li").eq(j).find(".friend_id").val();
                                                    $(".doc_msg_list li").eq(i).find(".msg_id").val(friendMsgId);
                                                }
                                            }
                                        }
                                        // 点击好友列表，与好友对话
                                        $doctorList.on("click","li",function(){
                                            var $sender=$(this);
                                            var sender=$sender.find(".doctor_name").text();
                                            var friendId=$sender.find(".friend_id").val();
                                            $(".active_msgli").removeClass("active_msgli");
                                            $sender.addClass("active_msgli");
                                            var targetHugId=$sender.attr("data-hugId");
                                            docMsgList=sessionStorage['docMsgList'+hugId]?JSON.parse(sessionStorage['docMsgList'+hugId]):[];
                                            $.each(docMsgList,function(index){
                                                if(docMsgList[index].sender==hugId+'-'+$sender.attr("data-hugid")){
                                                    docMsgList[index].number=0;
                                                }
                                            });
                                            sessionStorage['docMsgList'+hugId]=JSON.stringify(docMsgList);
                                            $("#mainFrame").attr("src",localhostUrl+'/web-bin/p/followup/chat/to_doctorChat_page?sender='+sender+'&targetHugId='+targetHugId+'&usId='+id+'&accessToken='+accessToken+'&hugId='+hugId+'&head='+$sender.find("img").attr("src")+'&keys='+hugId+'-'+$sender.attr("data-hugid")+'&friendId='+friendId+'&myHead='+myHead);
                                        });
                                    }else{
                                        art.dialog({
                                            content:data.msg,
                                            time:1.5,
                                            icon:"error"
                                        });
                                    }
                                }
                            });
                        });
                        // 点击好友，重新加载好友列表
                        $(document).on("click",".doc_choosen_model li:last",function(){
                            var docFriendRequest=sessionStorage['docFriendRequest'+hugId]?JSON.parse(sessionStorage['docFriendRequest'+hugId]):[];
                            if(docFriendRequest.length==0){
                                $(".red_spot_request,.red_spot").hide();
                            }else{
                                $(document).find(".red_spot_request,.red_spot").show();
                            }
                            $.ajax({
                                on: true,
                                type:"post",
                                url: localhostUrl+'/web-bin/p/followup/chat/query_friend_data?accessToken='+accessToken+'&usId='+id+'&partnerType=10'+'&hugId='+hugId,
                                dataType:"json",
                                success: function(data){
                                    if(data&&data.data){
                                        var $doctorList=$(".doctor_group_list");
                                        $doctorList.setTemplateElement("template_friendNameList").processTemplate(data.data);
                                        for(var i=0;i<data.data.length;i++){
                                            if(data.data[i].head){
                                                $(".friend_head_item").eq(i).html('<img src='+SERVER_URL+FILE_URL+data.data[i].head+'/>');
                                            }else{
                                                $(".friend_head_item").eq(i).html('<div class="design_icon"></div>');
                                            }
                                        }
                                        $(".friend_input").blur(function(){
                                            var searchFriendValue=$(this).val();
                                            var searchFlag=true;
                                            if(searchFriendValue!="查找好友"){
                                                $(".search_friend_list").show().html("");
                                                $(".doctor_item").each(function(index){
                                                    var $friend=$(this);
                                                    var s=$friend.find(".doctor_name").text().indexOf(searchFriendValue);
                                                    if(s!=-1){
                                                        $friend.clone().appendTo('.search_friend_list');
                                                        searchFlag=false;
                                                        return;
                                                    }
                                                });
                                                if(searchFlag){
                                                    art.dialog({
                                                        content:"抱歉，暂无相关医生",
                                                        time:1.5,
                                                        icon:"error"
                                                    });
                                                }
                                            }
                                        });
                                    }else{
                                        art.dialog({
                                            content:data.msg,
                                            time:1.5,
                                            icon:"error"
                                        });
                                    }
                                }
                            });
                        });
                        // 点击医患信息列表，展示患者或粉丝消息
                        $(document).on("click",".msg_list li",function(event){
                            var $sender=$(this);
                            var sender=$sender.find(".msg_name").text();
                            var targetHugId=$sender.attr("data-hugId");
                            var patientMsgList=sessionStorage['patientMsgList'+hugId]?JSON.parse(sessionStorage['patientMsgList'+hugId]):[];
                            $(".active_msgli").removeClass("active_msgli");
                            $sender.addClass("active_msgli");
                            $(".patient_spot,.msg_patient_spot").hide();
                            $sender.find(".msg_number").html("0");
                            $sender.find(".msg_number").hide().html("0");
                            $.each(patientMsgList,function(index){
                                if(patientMsgList[index].sender==hugId+'-'+$sender.attr("data-hugid")){
                                    patientMsgList[index].number=0;
                                }
                            });
                            sessionStorage['patientMsgList'+hugId]=JSON.stringify(patientMsgList);
                            $("#mainFrame").attr("src",localhostUrl+'/web-bin/p/followup/chat/to_patientChat_page?sender='+sender+'&targetHugId='+targetHugId+'&usId='+id+'&accessToken='+accessToken+'&hugId='+hugId+'&head='+$sender.find("img").attr("src")+'&keys='+hugId+'-'+$sender.attr("data-hugid")+'&myHead='+myHead+'&sourseId='+sourseId);
                            event.stopPropagation();
                        });
                        // 点击医医信息列表，展示好友消息
                        $(document).on("click",".doc_msg_list li",function(){
                            var $sender=$(this);
                            var sender=$sender.find(".msg_name").text();
                            var targetHugId=$sender.attr("data-hugId");
                            var friendId=$sender.find(".msg_id").val();
                            docMsgList=sessionStorage['docMsgList'+hugId]?JSON.parse(sessionStorage['docMsgList'+hugId]):[];
                            $(".active_msgli").removeClass("active_msgli");
                            $sender.addClass("active_msgli");
                            $(".doctor_spot,.msg_doctor_spot").hide();
                            $sender.find(".msg_number").hide().html("0");
                            $.each(docMsgList,function(index){
                                if(docMsgList[index].sender==hugId+'-'+$sender.attr("data-hugid")){
                                    docMsgList[index].number=0;
                                }
                            });
                            sessionStorage['docMsgList'+hugId]=JSON.stringify(docMsgList);
                            $("#mainFrame").attr("src",localhostUrl+'/web-bin/p/followup/chat/to_doctorChat_page?sender='+sender+'&targetHugId='+targetHugId+'&usId='+id+'&accessToken='+accessToken+'&hugId='+hugId+'&head='+$sender.find("img").attr("src")+'&keys='+hugId+'-'+$sender.attr("data-hugid")+'&friendId='+friendId+'&myHead='+myHead);
                        });
                        // 弹框
                        // 添加好友
                        $(document).on("click",".friend_add",function(){
                            art.dialog.open(localhostUrl+'/web-bin/p/followup/chat/to_addFriend_page?applyHugId='+hugId+'&accessToken='+accessToken+'&usId='+id,{
                                width : 439,
                                height: 180,
                                lock : true,
                                resize : false,
                                title : '新建好友'
                            });
                        });
                        // 好友请求
                        $(document).on("click",".friend_request" ,function(){
                            art.dialog.open(localhostUrl+'/web-bin/p/followup/chat/to_friendRequest_page?hugId='+hugId+'&accessToken='+accessToken+'&usId='+id+'&verify='+verify,{
                                width : 400,
                                maxHeight:80,
                                lock : true,
                                resize : false,
                                title : '好友请求'
                            });
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
                        //登录成功回调：列表初始化
                        $.ajax({
                            on: true,
                            type: "post",
                            url: localhostUrl  + '/web-bin/p/followup/chat/query_list_data?accessToken=' + accessToken + '&usId=' + id + '&hugId='+hugId,
                            dataType: "json",
                            success: function (data) {
                                if(data.res==0){
                                    var msgLeft4=[];
                                    var docMsgList=sessionStorage['docMsgList'+hugId]?JSON.parse(sessionStorage['docMsgList'+hugId]):[];
                                    var patientMsgList=sessionStorage['patientMsgList'+hugId]?JSON.parse(sessionStorage['patientMsgList'+hugId]):[];
                                    $.each(data.data,function(i,item){
                                        // var msgDomain=JSON.parse(item.msgDomain);
                                        var key=hugId+'-'+item.targetHugId;
                                        msgLeft4.push(item.targetHugId);
                                        if(item.type==0){
                                            var patientArr=[];
                                            $.each(patientMsgList,function(i,item){
                                                patientArr.push(item.sender);
                                            });
                                            var patientIndex=$.inArray(key,patientArr);
                                            if(patientIndex==-1){
                                                patientMsgList.push({
                                                    sender:key,
                                                    number:item.unreadMessages,
                                                    targetHugId:item.targetHugId,
                                                    nickName:item.name,
                                                    lastmsg:item.msgContent,
                                                    head:item.head
                                                });
                                                sessionStorage['patientMsgList'+hugId]=JSON.stringify(patientMsgList);
                                            }
                                        }else{
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
                                        }
                                    });
                                    $(".doctor_patient").click();
                                    //点击患者头像，直接进入聊天界面------------------
                                    if(patId){
                                        setTimeout(function(){
                                            var msgLeft3=[];
                                            $(".msg_list li").each(function(){
                                                msgLeft3.push($(this).attr("data-hugid"))
                                            })
                                            if(msgLeft3.length==0){
                                                msgLeft3=msgLeft4
                                            }
                                            var msgIndex=$.inArray(patId,msgLeft3);
                                            if(msgIndex==-1){
                                                patientMsgList.unshift({
                                                    sender:hugId+'-'+patId,
                                                    number:0,
                                                    targetHugId:patId,
                                                    nickName:patName
                                                });
                                                sessionStorage['patientMsgList'+hugId]=JSON.stringify(patientMsgList);
                                            }
                                        },0)
                                    }
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
                            RL_YTX.onMsgReceiveListener(function (obj) {
                                var docMsgList=sessionStorage['docMsgList'+hugId]?JSON.parse(sessionStorage['docMsgList'+hugId]):[];
                                var patientMsgList=sessionStorage['patientMsgList'+hugId]?JSON.parse(sessionStorage['patientMsgList'+hugId]):[];
                                // 发来的消息处理
                                console.log(obj)
                                var msgDomain=JSON.parse(obj.msgDomain);
                                var key=hugId+'-'+msgDomain.sd;
                                // 保存消息记录函数
                                function savedata(msgDomain){
                                    if(msgDomain.sd){
                                        if(msgDomain.userType==0||msgDomain.protocol==814000){
                                            if(patientMsgList.length==0){
                                                patientMsgList.unshift({
                                                    sender:key,
                                                    number:1,
                                                    targetHugId:msgDomain.sd,
                                                    nickName:msgDomain.name,
                                                    lastmsg:obj.msgContent,
                                                    head:msgDomain.head
                                                });
                                            }else{
                                                var pasteDoc1=[];
                                                $.each(patientMsgList,function(index){
                                                    pasteDoc1.push(patientMsgList[index].sender);
                                                });
                                                var arrIndex=$.inArray(key,pasteDoc1);
                                                if(arrIndex==-1){
                                                    patientMsgList.unshift({
                                                        sender:key,
                                                        number:1,
                                                        targetHugId:msgDomain.sd,
                                                        nickName:msgDomain.name,
                                                        lastmsg:obj.msgContent,
                                                        head:msgDomain.head
                                                    });
                                                }else{
                                                    patientMsgList[arrIndex].number++;
                                                    patientMsgList[arrIndex].lastmsg=obj.msgContent;
                                                    var patientIndex=patientMsgList.splice(arrIndex,1);
                                                    patientMsgList.unshift(patientIndex[0]);
                                                }
                                            }
                                            sessionStorage['patientMsgList'+hugId]=JSON.stringify(patientMsgList);
                                        }else{
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
                                if(msgDomain.protocol==820004){
                                    if(verify==1){
                                        $(".red_spot_request,.red_spot").show();
                                        docFriendRequest=sessionStorage['docFriendRequest'+hugId]?JSON.parse(sessionStorage['docFriendRequest'+hugId]):[];
                                        var requestNum=$.inArray(hugId+'-'+msgDomain.hugId,docFriendRequest);
                                        if(requestNum==-1){
                                            docFriendRequest.push(hugId+'-'+msgDomain.hugId);
                                        }
                                        sessionStorage['docFriendRequest'+hugId]=JSON.stringify(docFriendRequest);
                                    }else{
                                        if(msgDomain.head){
                                            $(".red_spot_request,.red_spot").hide();
                                            $(".doctor_group_list").prepend('<li class="doctor_item" data-hugId='+msgDomain.hugId+'><div class="friend_head_item"><img src='+SERVER_URL+FILE_URL+msgDomain.head+'/></div><div class="msg_nameBox"><div class="doctor_name substr">'+msgDomain.name+'</div><input  type="hidden" value='+msgDomain.applyId+' class="friend_id"/></div></li>');
                                        }else{
                                            $(".doctor_group_list").prepend('<li class="doctor_item" data-hugId='+msgDomain.hugId+'><div class="friend_head_item"><div class="design_icon"></div></div><div class="msg_nameBox"><div class="doctor_name substr">'+msgDomain.name+'</div><input  type="hidden" value='+msgDomain.applyId+' class="friend_id"/></div></li>');
                                        }
                                    }
                                }else if(msgDomain.protocol==820005){
                                    art.dialog({
                                        content: "对方已经通过您的好友申请！",
                                        icon: 'succeed',
                                        time: 1.5
                                    });
                                    if(msgDomain.head){
                                        $(".doctor_group_list").prepend('<li class="doctor_item" data-hugId='+msgDomain.targetHugId+'><div class="friend_head_item"><img src='+SERVER_URL+FILE_URL+msgDomain.head+'/></div><div class="msg_nameBox"><div class="doctor_name substr">'+msgDomain.remarkName+'</div><input  type="hidden" value='+msgDomain.friendId+' class="friend_id"/></div></li>');
                                    }else{
                                        $(".doctor_group_list").prepend('<li class="doctor_item" data-hugId='+msgDomain.targetHugId+'><div class="friend_head_item"><div class="design_icon"></div></div><div class="msg_nameBox"><div class="doctor_name substr">'+msgDomain.remarkName+'</div><input  type="hidden" value='+msgDomain.friendId+' class="friend_id"/></div></li>');
                                    }
                                }else if(msgDomain.protocol==820001){
                                    art.dialog({
                                        content: "有系统消息，请在手机端查收！",
                                        icon: 'warning',
                                        time: 3.5
                                    });
                                }else{
                                    var lastMsgBox=$('#mainFrame').contents().find(".chat_top");
                                    //清空未读消息
                                    function clearMsg(){
                                        $.ajax({
                                            on: true,
                                            type: "post",
                                            url: localhostUrl  + '/web-bin/p/followup/chat/query_doing_data?accessToken=' + accessToken + '&usId=' + id + '&hugId='+hugId+'&targetHugId='+msgDomain.sd,
                                            dataType: "json",
                                            success: function (data) {
                                                console.log(data)
                                            }
                                        });
                                    }
                                    // 与当前好友正在对话,将发来的消息展示
                                    if(msgDomain.partnerType){
                                        if(msgDomain.partnerType==10){
                                            //清空未读消息
                                            clearMsg();
                                        }
                                        if(msgDomain.partnerType!=10){
                                            // 移动端同步消息判断
                                            if ($('#mainFrame').contents().find(".index_friend_account").text().slice(1,-1)==msgDomain.sd){
                                                //清空未读消息
                                                clearMsg();
                                                if(msgDomain.protocol==820006){
                                                    if(myHead){
                                                        lastMsgBox.append('<li><div class="send_head"><img src='+SERVER_URL+FILE_URL+myHead+'/></div><div class="sended_msg"><div class="send_triangle design_icon design_icon"></div><span>'+obj.msgContent+'</span></div></li>');
                                                    }else{
                                                        lastMsgBox.append('<li><div class="send_head  design_icon"></div><div class="sended_msg"><div class="send_triangle design_icon design_icon"></div><span>'+obj.msgContent+'</span></div></li>');
                                                    }
                                                }else if(msgDomain.protocol==820010){
                                                    //宣传问卷
                                                    if(msgDomain.categType==6){
                                                        if(myHead){
                                                            lastMsgBox.append('<li><div class="send_head"><img src='+SERVER_URL+FILE_URL+myHead+'/></div><div class="sended_question" data-type="6"><div class="send_triangle design_icon"></div><span style="display:none" class="question_id">'+msgDomain.id+'</span><div class="question_title">'+msgDomain.title+'</div><div class="education_png"></div></div></li>');
                                                        }else{
                                                            lastMsgBox.append('<li><div class="send_head design_icon"></div><div class="sended_question" data-type="6"><div class="send_triangle design_icon"></div><span style="display:none" class="question_id">'+msgDomain.id+'</span><div class="question_title">'+msgDomain.title+'</div><div class="education_png"></div></div></li>');
                                                        }
                                                    }else{
                                                        if(myHead){
                                                            lastMsgBox.append('<li><div class="send_head"><img src='+SERVER_URL+FILE_URL+myHead+'/></div><div class="sended_question" data-type=0><div class="send_triangle design_icon"></div><span style="display:none" class="question_id">'+msgDomain.id+'</span><div class="question_title">'+msgDomain.title+'</div><div class="question_png"></div></div></li>');
                                                        }else{
                                                            lastMsgBox.append('<li><div class="send_head design_icon"></div><div class="sended_question" data-type=0><div class="send_triangle design_icon"></div><span style="display:none" class="question_id">'+msgDomain.id+'</span><div class="question_title">'+msgDomain.title+'</div><div class="question_png"></div></div></li>');
                                                        }
                                                    }
                                                }else if(msgDomain.protocol==820007){
                                                    //多媒体
                                                    if(msgDomain.msgType==1){
                                                        if(myHead) {
                                                            lastMsgBox.append('<li><div class="send_head"><img src='+SERVER_URL+FILE_URL+myHead+'/></div><div class="audio_controller float_right"><div class="send_triangle design_icon"></div><div class="audio_img"><img src="/web-bin/interview/followup/chat/images/audio.png"/></div><span>'+msgDomain.chatLength+'s</span><audio src="'+ SERVER_URL+ FILE_URL+msgDomain.id+'"></audio></div></li>');
                                                        }else{
                                                            lastMsgBox.append('<li><div class="send_head  design_icon"></div><div class="audio_controller float_right"><div class="send_triangle design_icon"></div><div class="audio_img"><img src="/web-bin/interview/followup/chat/images/audio.png"/></div><span>'+msgDomain.chatLength+'s</span><audio src="'+ SERVER_URL+ FILE_URL+msgDomain.id+'"></audio></div></li>');
                                                        }
                                                    }else if(msgDomain.msgType==2) {
                                                        if(myHead){
                                                            lastMsgBox.append('<li><div class="send_head"><img src='+SERVER_URL+FILE_URL+myHead+'/></div><div class="video_controller float_right"><div class="play_video"><img src="/web-bin/resources/images/play.png"/></div><div class="send_triangle design_icon"></div><video src="'+ SERVER_URL+ FILE_URL+msgDomain.id+'" height="200px"></video></div></li>');
                                                        }else{
                                                            lastMsgBox.append('<li><div class="send_head  design_icon"></div><div class="video_controller float_right"><div class="play_video"><img src="/web-bin/resources/images/play.png"/></div><div class="send_triangle design_icon"></div><video src="'+ SERVER_URL+ FILE_URL+msgDomain.id+'" height="200px"></video></div></li>');
                                                        }
                                                    }else {
                                                        if(myHead){
                                                            lastMsgBox.append('<li><div class="send_head"><img src='+SERVER_URL+FILE_URL+myHead+'/></div><div class="img_box float_right"><div class="send_triangle design_icon"></div><img src="'+ SERVER_URL+ FILE_URL+msgDomain.id+'" height="200px"/></div></li>');
                                                        }else{
                                                            lastMsgBox.append('<li><div class="send_head  design_icon"></div><div class="img_box float_right"><div class="send_triangle design_icon"></div><img src="'+ SERVER_URL+ FILE_URL+msgDomain.id+'" height="200px"/></div></li>');
                                                        }
                                                    }
                                                }
                                            }
                                            // 移动端端发送消息推送置顶
                                            if(msgDomain.userType==0){
                                                var msgLeft2=[];
                                                //清空未读消息
                                                clearMsg();
                                                $(".msg_list li").each(function(){
                                                    var $msgReceiver=$(this);
                                                    msgLeft2.push($msgReceiver.attr("data-hugid"));
                                                    if ($msgReceiver.attr("data-hugid")==msgDomain.sd){
                                                        $msgReceiver.find(".msg_time").html(obj.msgContent);
                                                    }
                                                });
                                                var msgIndex=$.inArray(msgDomain.sd,msgLeft2);
                                                if(msgIndex==-1){
                                                    if(msgDomain.head){
                                                        $(".msg_list").prepend('<li data-hugId='+msgDomain.sd+'><div class="friend_head"><div class="design_icon icon_head"><img src='+SERVER_URL+FILE_URL+msgDomain.head+'/></div><div class="msg_number" style="display:none">0</div></div><div class="msg_nameBox"><div class="msg_name substr">'+msgDomain.name+'</div><div class="msg_time substr">'+obj.msgContent+'</div></div><input  type="hidden" value="" class="msg_id"/></li>');
                                                    }else{
                                                        $(".msg_list").prepend('<li data-hugId='+msgDomain.sd+'><div class="friend_head"><div class="design_icon icon_head"></div><div class="msg_number" style="display:none">0</div></div><div class="msg_nameBox"><div class="msg_name substr">'+msgDomain.name+'</div><div class="msg_time substr">'+obj.msgContent+'</div></div><input  type="hidden" value="" class="msg_id"/></li>');
                                                    };
                                                }else{
                                                    $(".msg_list").prepend($(".msg_list li").eq(msgIndex));
                                                }
                                                if(patientMsgList.length==0){
                                                    patientMsgList.unshift({
                                                        sender:key,
                                                        number:0,
                                                        targetHugId:msgDomain.sd,
                                                        nickName:msgDomain.name,
                                                        lastmsg:obj.msgContent,
                                                        head:msgDomain.head
                                                    });
                                                }else{
                                                    var pasteDoc=[];
                                                    $.each(patientMsgList,function(index){
                                                        pasteDoc.push(patientMsgList[index].sender);
                                                    });
                                                    var arrIndex=$.inArray(key,pasteDoc);
                                                    if(arrIndex==-1){
                                                        patientMsgList.unshift({
                                                            sender:key,
                                                            number:0,
                                                            targetHugId:msgDomain.sd,
                                                            nickName:msgDomain.name,
                                                            lastmsg:obj.msgContent,
                                                            head:msgDomain.head
                                                        });
                                                    }else{
                                                        patientMsgList[arrIndex].lastmsg=obj.msgContent;
                                                        var patientIndex=patientMsgList.splice(arrIndex,1);
                                                        patientMsgList.unshift(patientIndex[0]);
                                                    }
                                                }
                                                sessionStorage['patientMsgList'+hugId]=JSON.stringify(patientMsgList);
                                            }else{
                                                // 移动端医生好友发送消息置顶
                                                var msgLeft3=[];
                                                //清空未读消息
                                                clearMsg();
                                                $(".doc_msg_list li").each(function(){
                                                    var $msgReceiver=$(this);
                                                    msgLeft3.push($msgReceiver.attr("data-hugid"));
                                                    if ($msgReceiver.attr("data-hugid")==msgDomain.sd){
                                                        $msgReceiver.find(".msg_time").html(obj.msgContent);
                                                    }
                                                });
                                                var msgIndex=$.inArray(msgDomain.sd,msgLeft3);
                                                if(msgIndex==-1){
                                                    if(msgDomain.head){
                                                        $(".doc_msg_list").prepend('<li data-hugId='+msgDomain.sd+'><div class="friend_head"><div class="design_icon icon_head"><img src='+SERVER_URL+FILE_URL+msgDomain.head+'/></div><div class="msg_number" style="display:none">0</div></div><div class="msg_nameBox"><div class="msg_name substr">'+msgDomain.name+'</div><div class="msg_time substr">'+obj.msgContent+'</div></div><input  type="hidden" value="" class="msg_id"/></li>');
                                                    }else{
                                                        $(".doc_msg_list").prepend('<li data-hugId='+msgDomain.sd+'><div class="friend_head"><div class="design_icon icon_head"></div><div class="msg_number" style="display:none">0</div></div><div class="msg_nameBox"><div class="msg_name substr">'+msgDomain.name+'</div><div class="msg_time substr">'+obj.msgContent+'</div></div><input  type="hidden" value="" class="msg_id"/></li>');
                                                    }
                                                }else{
                                                    $(".doc_msg_list").prepend($(".doc_msg_list li").eq(msgIndex));
                                                }
                                                if(docMsgList.length==0){
                                                    docMsgList.unshift({
                                                        sender:key,
                                                        number:0,
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
                                                            number:0,
                                                            targetHugId:msgDomain.sd,
                                                            nickName:msgDomain.name,
                                                            lastmsg:obj.msgContent,
                                                            head:msgDomain.head
                                                        });
                                                    }else{
                                                        docMsgList[arrIndex].lastmsg=obj.msgContent;
                                                        var docIndex=docMsgList.splice(arrIndex,1);
                                                        docMsgList.unshift(docIndex[0]);
                                                    }
                                                }
                                                sessionStorage['docMsgList'+hugId]=JSON.stringify(docMsgList);
                                            }
                                            // lastMsgBox.animate({scrollTop:msgScroll},0);
                                            var msgScroll=lastMsgBox.scrollTop();
                                            var sendHeight=$('#mainFrame').contents().find(".sended_msg:last").outerHeight()+20;
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
                                            msgScroll+=sendHeight;
                                            lastMsgBox.animate({scrollTop:msgScroll},0);
                                        }else{
                                            // pc端发送消息推送置顶
                                            if(msgDomain.userType==0){
                                                var msgLeft2=[];
                                                $(".msg_list li").each(function(){
                                                    var $msgReceiver=$(this);
                                                    msgLeft2.push($msgReceiver.attr("data-hugid"));
                                                    if ($msgReceiver.attr("data-hugid")==msgDomain.sd){
                                                        $msgReceiver.find(".msg_time").html(obj.msgContent);
                                                    };
                                                });
                                                var msgIndex=$.inArray(msgDomain.sd,msgLeft2);
                                                if(msgIndex==-1){
                                                    if(msgDomain.head){
                                                        $(".msg_list").prepend('<li data-hugId='+msgDomain.sd+'><div class="friend_head"><div class="design_icon icon_head"><img src='+SERVER_URL+FILE_URL+msgDomain.head+'/></div><div class="msg_number" style="display:none">0</div></div><div class="msg_nameBox"><div class="msg_name substr">'+msgDomain.name+'</div><div class="msg_time substr">'+obj.msgContent+'</div></div><input  type="hidden" value="" class="msg_id"/></li>');
                                                    }else{
                                                        $(".msg_list").prepend('<li data-hugId='+msgDomain.sd+'><div class="friend_head"><div class="design_icon icon_head"></div><div class="msg_number" style="display:none">0</div></div><div class="msg_nameBox"><div class="msg_name substr">'+msgDomain.name+'</div><div class="msg_time substr">'+obj.msgContent+'</div></div><input  type="hidden" value="" class="msg_id"/></li>');
                                                    }
                                                }else{
                                                    $(".msg_list").prepend($(".msg_list li").eq(msgIndex));
                                                }
                                                if(patientMsgList.length==0){
                                                    patientMsgList.unshift({
                                                        sender:key,
                                                        number:0,
                                                        targetHugId:msgDomain.sd,
                                                        nickName:msgDomain.name,
                                                        lastmsg:obj.msgContent,
                                                        head:msgDomain.head
                                                    });
                                                }else{
                                                    var pasteDoc=[];
                                                    $.each(patientMsgList,function(index){
                                                        pasteDoc.push(patientMsgList[index].sender);
                                                    });
                                                    var arrIndex=$.inArray(key,pasteDoc);
                                                    if(arrIndex==-1){
                                                        patientMsgList.unshift({
                                                            sender:key,
                                                            number:0,
                                                            targetHugId:msgDomain.sd,
                                                            nickName:msgDomain.name,
                                                            lastmsg:obj.msgContent,
                                                            head:msgDomain.head
                                                        });
                                                    }else{
                                                        patientMsgList[arrIndex].lastmsg=obj.msgContent;
                                                        var patientIndex=patientMsgList.splice(arrIndex,1);
                                                        patientMsgList.unshift(patientIndex[0]);
                                                    }
                                                }
                                                sessionStorage['patientMsgList'+hugId]=JSON.stringify(patientMsgList);
                                            }else{
                                                // 医生好友发送消息置顶
                                                var msgLeft1=[];
                                                $(".doc_msg_list li").each(function(){
                                                    var $msgReceiver=$(this);
                                                    msgLeft1.push($msgReceiver.attr("data-hugid"));
                                                    if ($msgReceiver.attr("data-hugid")==msgDomain.sd){
                                                        $msgReceiver.find(".msg_time").html(obj.msgContent);
                                                    };
                                                });
                                                var msgIndex=$.inArray(msgDomain.sd,msgLeft1);
                                                if(msgIndex==-1){
                                                    if(msgDomain.head){
                                                        $(".doc_msg_list").prepend('<li data-hugId='+msgDomain.sd+'><div class="friend_head"><div class="design_icon icon_head"><img src='+SERVER_URL+FILE_URL+msgDomain.head+'/></div><div class="msg_number" style="display:none">0</div></div><div class="msg_nameBox"><div class="msg_name substr">'+msgDomain.name+'</div><div class="msg_time substr">'+obj.msgContent+'</div></div><input  type="hidden" value="" class="msg_id"/></li>');
                                                    }else{
                                                        $(".doc_msg_list").prepend('<li data-hugId='+msgDomain.sd+'><div class="friend_head"><div class="design_icon icon_head"></div><div class="msg_number" style="display:none">0</div></div><div class="msg_nameBox"><div class="msg_name substr">'+msgDomain.name+'</div><div class="msg_time substr">'+obj.msgContent+'</div></div><input  type="hidden" value="" class="msg_id"/></li>');
                                                    }
                                                }else{
                                                    $(".doc_msg_list").prepend($(".doc_msg_list li").eq(msgIndex));
                                                };
                                                if(docMsgList.length==0){
                                                    docMsgList.unshift({
                                                        sender:key,
                                                        number:0,
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
                                                            number:0,
                                                            targetHugId:msgDomain.sd,
                                                            nickName:msgDomain.name,
                                                            lastmsg:obj.msgContent,
                                                            head:msgDomain.head
                                                        });
                                                    }else{
                                                        docMsgList[arrIndex].lastmsg=obj.msgContent;
                                                        var docIndex=docMsgList.splice(arrIndex,1);
                                                        docMsgList.unshift(docIndex[0]);
                                                    }
                                                }
                                                sessionStorage['docMsgList'+hugId]=JSON.stringify(docMsgList);
                                            }
                                        }
                                    }else{
                                        //正在通话时消息接受处理
                                        if ($('#mainFrame').contents().find(".index_friend_account").text().slice(1,-1)==msgDomain.sd){
                                            //清空未读消息
                                            clearMsg();
                                            if(msgDomain.userType==0){
                                                $.each(patientMsgList,function(index){
                                                    if(patientMsgList[index].sender==hugId+'-'+msgDomain.sd){
                                                        patientMsgList[index].number=-1;
                                                    }
                                                });
                                            }else{
                                                $.each(docMsgList,function(index){
                                                    if(docMsgList[index].sender==hugId+'-'+msgDomain.sd){
                                                        docMsgList[index].number=-1;
                                                    }
                                                });
                                            }
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
                                                        lastMsgBox.append('<li><div class="send_head"><img src='+SERVER_URL+FILE_URL+msgDomain.head+'/></div><div class="sended_question" data-type="6"><div class="send_triangle design_icon"></div><span style="display:none" class="question_id">'+msgDomain.id+'</span><div class="question_title">'+msgDomain.title+'</div><div class="education_png"></div></div></li>');
                                                    }else{
                                                        lastMsgBox.append('<li><div class="send_head design_icon"></div><div class="sended_question" data-type="6"><div class="send_triangle design_icon"></div><span style="display:none" class="question_id">'+msgDomain.id+'</span><div class="question_title">'+msgDomain.title+'</div><div class="education_png"></div></div></li>');
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
                                                        lastMsgBox.append('<li><div class="receive_head"><img src='+SERVER_URL+FILE_URL+msgDomain.head+'/></div><div class="audio_controller"><div class="receive_triangle design_icon"></div><div class="audio_img"><img src="/web-bin/interview/followup/chat/images/audio.png"/></div><span>'+msgDomain.chatLength+'s</span><audio src="'+ SERVER_URL+ FILE_URL+msgDomain.id+'"></audio></div></li>');
                                                    }else{
                                                        lastMsgBox.append('<li><div class="receive_head  design_icon"></div><div class="audio_controller"><div class="receive_triangle design_icon"></div><div class="audio_img"><img src="/web-bin/interview/followup/chat/images/audio.png"/></div><span>'+msgDomain.chatLength+'s</span><audio src="'+ SERVER_URL+ FILE_URL+msgDomain.id+'"></audio></div></li>');
                                                    }
                                                }else if(msgDomain.msgType==2) {
                                                    if(msgDomain.head){
                                                        lastMsgBox.append('<li><div class="receive_head"><img src='+SERVER_URL+FILE_URL+msgDomain.head+'/></div><div class="video_controller"><div class="play_video"><img src="/web-bin/resources/images/play.png"/></div><div class="receive_triangle design_icon"></div><video src="'+ SERVER_URL+ FILE_URL+msgDomain.id+'" height="200px"></video></div></li>');
                                                    }else{
                                                        lastMsgBox.append('<li><div class="receive_head  design_icon"></div><div class="video_controller"><div class="play_video"><img src="/web-bin/resources/images/play.png"/></div><div class="receive_triangle design_icon"></div><video src="'+ SERVER_URL+ FILE_URL+msgDomain.id+'" height="200px"></video></div></li>');
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
                                            // 在线消息提醒
                                            var msgLeft=[];
                                            if(msgDomain.userType==3||msgDomain.userType==1){
                                                $(".doctor_spot,.msg_doctor_spot").show();
                                                $(".doc_msg_list li").each(function(){
                                                    var $msgReceiver=$(this);
                                                    msgLeft.push($msgReceiver.attr("data-hugid"));
                                                    if ($msgReceiver.attr("data-hugid")==msgDomain.sd){
                                                        $msgReceiver.find(".msg_number").show();
                                                        var msgNum=$msgReceiver.find(".msg_number").text();
                                                        msgNum++;
                                                        $msgReceiver.find(".msg_number").html(msgNum);
                                                        $msgReceiver.find(".msg_time").html(obj.msgContent);
                                                    };
                                                });
                                                var msgIndex=$.inArray(msgDomain.sd,msgLeft);
                                                if(msgIndex==-1){
                                                    if(msgDomain.head){
                                                        $(".doc_msg_list").prepend('<li data-hugId='+msgDomain.sd+'><div class="friend_head"><div class="design_icon icon_head"><img src='+SERVER_URL+FILE_URL+msgDomain.head+'/></div><div class="msg_number">1</div></div><div class="msg_nameBox"><div class="msg_name substr">'+msgDomain.name+'</div><div class="msg_time substr">'+obj.msgContent+'</div></div><input  type="hidden" value="" class="msg_id"/></li>');
                                                    }else{
                                                        $(".doc_msg_list").prepend('<li data-hugId='+msgDomain.sd+'><div class="friend_head"><div class="design_icon icon_head"></div><div class="msg_number">1</div></div><div class="msg_nameBox"><div class="msg_name substr">'+msgDomain.name+'</div><div class="msg_time substr">'+obj.msgContent+'</div></div><input  type="hidden" value="" class="msg_id"/></li>');
                                                    };
                                                }else{
                                                    $(".doc_msg_list").prepend($(".doc_msg_list li").eq(msgIndex));
                                                }
                                            }else{
                                                $(".patient_spot,.msg_patient_spot").show();
                                                $(".msg_list li").each(function(){
                                                    var $msgReceiver=$(this);
                                                    msgLeft.push($msgReceiver.attr("data-hugid"));
                                                    if ($msgReceiver.attr("data-hugid")==msgDomain.sd){
                                                        $msgReceiver.find(".msg_number").show();
                                                        var msgNum=$msgReceiver.find(".msg_number").text();
                                                        msgNum++;
                                                        $msgReceiver.find(".msg_number").html(msgNum);
                                                        $msgReceiver.find(".msg_time").html(obj.msgContent);
                                                    }
                                                });
                                                var msgIndex=$.inArray(msgDomain.sd,msgLeft);
                                                if(msgIndex==-1){
                                                    if(msgDomain.head){
                                                        $(".msg_list").prepend('<li data-hugId='+msgDomain.sd+'><div class="friend_head"><div class="design_icon icon_head"><img src='+SERVER_URL+FILE_URL+msgDomain.head+'/></div><div class="msg_number">1</div></div><div class="msg_nameBox"><div class="msg_name substr">'+msgDomain.name+'</div><div class="msg_time substr">'+obj.msgContent+'</div></div><input  type="hidden" value="" class="msg_id"/></li>');
                                                    }else{
                                                        $(".msg_list").prepend('<li data-hugId='+msgDomain.sd+'><div class="friend_head"><div class="design_icon icon_head"></div><div class="msg_number">1</div></div><div class="msg_nameBox"><div class="msg_name substr">'+msgDomain.name+'</div><div class="msg_time substr">'+obj.msgContent+'</div></div><input  type="hidden" value="" class="msg_id"/></li>');
                                                    };
                                                }else{
                                                    $(".msg_list").prepend($(".msg_list li").eq(msgIndex));
                                                }
                                            }
                                        }
                                        savedata(msgDomain);
                                    }
                                }
                            });
                            RL_YTX.onConnectStateChangeLisenter(function (obj) {
                                //连接状态变更
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
    }
});