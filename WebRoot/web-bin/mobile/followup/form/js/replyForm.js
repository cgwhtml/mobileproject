/**
 * Created by xyz
 * Created time 2017/4/6 15:15
 * Description  新增
 */
var url = window.location.origin;
//表单方法入口--p,s,u(require, exports, module)
define("form/formlayout", ["form/component/topic","form/form-plugin"],
    function(p,s,u){
        p("form/component/topic");
        var h = p("form/form-plugin");
        var a = {
            currentDrag: null,
            localhostUrl: "",
            port: "",
            hospCode: "",
            questionnaireId: "",
            readOnly:false,
            relationType:"",
            replyType:"",
            canSubmit:true,
            patSourceType:""
        };
        //清空跳题之间的答案内容
        a.clearContent=function(o1,o2,fieldJumpId){
            if (fieldJumpId) {
                $.each(fieldJumpId, function(i, item) {
                    var _this = $("div.subset_hide[selfId="+item+"]");
                    _this.find("textarea").val("");
                    _this.find("input[type='text']").val("");
                    _this.find("input[type='checkbox']").attr("checked", false).next().removeClass("sc_checked").addClass("sc_unchecked");
                    _this.find("input[type='radio']").attr("checked", false).next().removeClass("r_checked").addClass("r_unchecked");
                    _this.find(".raty_star_checked").parent().children().attr("class","raty_star_unchecked").attr("src","/hug_interview/resources/images/raty_star_unchecked.png");
                    _this.find("select").val("").trigger("chosen:updated");
                });
            } else {
                o1.nextUntil(o2).each(function(){
                    $(this).find("textarea").val("");
                    $(this).find("input[type='text']").val("");
                    $(this).find("input[type='checkbox']").attr("checked", false).next().removeClass("sc_checked").addClass("sc_unchecked");
                    $(this).find("input[type='radio']").attr("checked", false).next().removeClass("r_checked").addClass("r_unchecked");
                    $(this).find(".raty_star_checked").parent().children().attr("class","raty_star_unchecked").attr("src","/hug_interview/resources/images/raty_star_unchecked.png");
                    $(this).find("select").val("").trigger("chosen:updated");
                });
            }
        };
        // 隐藏本题下所有后代题集  返回所有后代题集的selfId
        a.setSubset=function(field, fieldJumpId, kids, notFirst) {
            fieldJumpId = fieldJumpId || [];
            kids = kids || [];
            if (fieldJumpId.length == 0) {
                $.each(field.find("input[type='radio'], input[type='checkbox']"), function(i, item) {
                    $(item).data("componentData").componentSetup.jumpId && (fieldJumpId = fieldJumpId.concat($(item).data("componentData").componentSetup.jumpId.split(',')));
                });
            }
            a.clearContent('','', fieldJumpId);
            kids = kids.concat(fieldJumpId);
            $.each(fieldJumpId, function(i, item) {
                notFirst && field.parent().find('.field_js[selfId='+item+']').addClass('subset_hide');
                kids = a.setSubset(field.parent().find(".field_js.subset_hide[selfId=" + item + "]"), [], kids, true);
            });
            return kids;
        };
        //预览方法集合-bind
        a.previewEvents=function(){
            $(document).on("ifChecked","#widget_control input[type='radio']",function(b){
                $(this).parents(".widget_content").find(".widget_tip").html("");
                var $p_obj=$(this).parents("li");
                var optionData=$p_obj.find(".option_title").data("componentData").componentSetup,
                    field = $(this).parents(".field_js"),
                    selfId = field.attr("selfId");
                if (a.jumpType == 1) {
                    field.nextUntil('div[jump_fieldId='+selfId+']').removeClass("jump_hide");
                    field.parent().find('div[jump_fieldId='+selfId+']').attr("jump_fieldId","");
                    if(optionData.jumpId && field.parent().find('div[selfId='+optionData.jumpId+']').length>0){
                        a.clearContent(field,'div[selfId='+optionData.jumpId+']');
                        field.nextUntil('div[selfId='+optionData.jumpId+']').addClass("jump_hide");
                        field.parent().find('div[selfId='+optionData.jumpId+']').attr("jump_fieldId",selfId);
                    }
                } else {
                    var optionJumpId = optionData.jumpId ? $.trim(optionData.jumpId).split(',') : [];
                    var fieldJumpId = [];
                    $.each(field.find("input[type='radio']"), function(i, item) {
                        $(item).data("componentData").componentSetup.jumpId && (fieldJumpId = fieldJumpId.concat($(item).data("componentData").componentSetup.jumpId.split(',')));
                    });
                    $.each(fieldJumpId, function(i, item) {
                        field.parent().find('div[selfId='+item+']').addClass('subset_hide')
                    });
                    if (optionJumpId.length>0) {
                        $.each(optionJumpId, function(i, item) {
                            field.parent().find('div[selfId='+item+']').removeClass('subset_hide');
                        });
                    }
                    var kids = a.setSubset(field, fieldJumpId);
                    a.clearContent([], [], kids);
                }
                var $t_obj=$p_obj.find(".widget_tip");
                if("true" == optionData.isError || 1 == optionData.isError){
                    optionData.errorContent && $t_obj.html('提示：'+optionData.errorContent);
                }
                $(this).parents("li").find(".input_otherchoice").length>0?($(this).parents(".field_js").find(".input_otherchoice").addClass("hide"),$(this).parents("li").find(".input_otherchoice").removeClass("hide"))
                    :$(this).parents(".field_js").find(".input_otherchoice").addClass("hide");
            });
            $(document).on("ifChecked","#widget_control input[type='checkbox']",function(b){
                var $p_obj=$(this).parents("li");
                var optionData=$p_obj.find(".option_title").data("componentData").componentSetup;
                var $t_obj=$p_obj.find(".widget_tip");
                if("true" == optionData.isError || 1 == optionData.isError){
                    optionData.errorContent && $t_obj.html('提示：'+optionData.errorContent);
                }
                $(this).parents("li").find(".input_otherchoice").length>0?$(this).parents("li").find(".input_otherchoice").removeClass("hide"):null;
                if (a.jumpType == 2) {
                    var optionData=$(this).data("componentData").componentSetup,
                        field = $(this).parents(".field_js"),
                        selfId = field.attr("selfId");
                    var optionJumpId = optionData.jumpId ? $.trim(optionData.jumpId).split(',') : [];
                    if (optionJumpId.length>0) {
                        if ($(this).next().hasClass('sc_checked')) {
                            $.each(optionJumpId, function(i, item) {
                                field.parent().find('div[selfId='+item+']').removeClass('subset_hide');
                            });
                        } else {
                            optionJumpId = [];
                            $.each(field.find("input[type='checkbox']:checked"), function(i, item) {
                                $(item).data("componentData").componentSetup.jumpId && (optionJumpId = optionJumpId.concat($(item).data("componentData").componentSetup.jumpId.split(',')));
                            });
                            var fieldJumpId = [];
                            $.each(field.find("input[type='checkbox']"), function(i, item) {
                                $(item).data("componentData").componentSetup.jumpId && (fieldJumpId = fieldJumpId.concat($(item).data("componentData").componentSetup.jumpId.split(',')));
                            });
                            $.each(fieldJumpId, function(i, item) {
                                field.parent().find('div[selfId='+item+']').addClass('subset_hide')
                            });
                            if (optionJumpId.length>0) {
                                $.each(optionJumpId, function(i, item) {
                                    field.parent().find('div[selfId='+item+']').removeClass('subset_hide');
                                });
                            }
                            var kids = a.setSubset(field, fieldJumpId);
                            a.clearContent([], [], kids);
                        }
                    }
                }
            });
            $(document).on("ifUnchecked","#widget_control input[type='checkbox']",function(b){
                var $t_obj=$(this).parents("li").find(".widget_tip");
                $t_obj.html("");
                $(this).parents("li").find(".input_otherchoice").length>0?$(this).parents("li").find(".input_otherchoice").addClass("hide"):null;
                if (a.jumpType == 2) {
                    var optionData=$(this).data("componentData").componentSetup,
                        field = $(this).parents(".field_js"),
                        selfId = field.attr("selfId");
                    var optionJumpId = optionData.jumpId ? $.trim(optionData.jumpId).split(',') : [];
                    if (optionJumpId.length>0) {
                        if ($(this).next().hasClass('sc_checked')) {
                            $.each(optionJumpId, function(i, item) {
                                field.parent().find('div[selfId='+item+']').removeClass('subset_hide');
                            });
                        } else {
                            optionJumpId = [];
                            $.each(field.find("input[type='checkbox']:checked"), function(i, item) {
                                $(item).data("componentData").componentSetup.jumpId && (optionJumpId = optionJumpId.concat($(item).data("componentData").componentSetup.jumpId.split(',')));
                            });
                            var fieldJumpId = [];
                            $.each(field.find("input[type='checkbox']"), function(i, item) {
                                $(item).data("componentData").componentSetup.jumpId && (fieldJumpId = fieldJumpId.concat($(item).data("componentData").componentSetup.jumpId.split(',')));
                            });
                            $.each(fieldJumpId, function(i, item) {
                                field.parent().find('div[selfId='+item+']').addClass('subset_hide')
                            });
                            if (optionJumpId.length>0) {
                                $.each(optionJumpId, function(i, item) {
                                    field.parent().find('div[selfId='+item+']').removeClass('subset_hide');
                                });
                            }
                            var kids = a.setSubset(field, fieldJumpId);
                            a.clearContent([], [], kids);
                        }
                    }
                }
            });
            $(document).on("click.preview","#widget_control .MatrixRaty_js img",function(){
                if(!a.readOnly){
                    $(this).parent().children().attr("src","/web-bin/mobile/followup/form/images/raty_star_unchecked.png").attr("class","raty_star_unchecked")
                    &&$(this).attr("src","/web-bin/mobile/followup/form/images/raty_star_checked.png").attr("class","raty_star_checked")
                    &&$(this).prevAll().attr("src","/web-bin/mobile/followup/form/images/raty_star_checked.png");
                    $(this).parents(".widget_content").find(".widget_tip").addClass("hide").html("提示：");
                    $(this).parents(".field_js ").find("li").each(function(b){
                        b=$(this).find(".raty_star_checked:last");
                        var $p_obj=$(this).parents(".widget_content");
                        var $t_obj=$p_obj.find(".widget_tip");
                        if("true" == b.attr("isError") || 1 == b.attr("isError")){
                            var errorContent=b.attr("errorContent");
                            if(errorContent!=null&&errorContent!="") {
                                $t_obj.hasClass("hide") ? ($t_obj.append(errorContent + '；').removeClass("hide")) :
                                    ($t_obj.append(errorContent + '；'));
                            }
                        }
                    });
                }
            });
        };
        //提交表单答案
        a.submitForm=function(){
            var relationId=window.location.pathname.split("/").pop();
            if(relationId=="sfg"){//慢病自助建档表单
                var submitUrl="/web-bin/m/nosen/chronicDiseases/selfFiling/submit_replyForm_data";
            }else if(relationId=="sqr"){//满意度表单
                var submitUrl="/web-bin/m/nosen/followup/form/submit_form_data_satisfaction";
            }else{//普通表单
                var submitUrl="/web-bin/m/nosen/followup/form/submit_form_data";
            }
            $("#submitForm").click(function(){
                if(a.canSubmit) {
                    a.canSubmit=false;
                    if(relationId=="sfg"){//慢病自助建档表单
                        var requestObj=a.analyseRequest();
                        h.saveFormData({
                            parentEl: $("#widget_control"),
                            dataStatus: 1,
                            relationId: relationId,
                            questionnaireId: a.questionnaireId,
                            hospCode: a.hospCode,
                            relationType: a.relationType,
                            replyType: a.replyType,
                            empiId:requestObj.empiId,
                            menuId:requestObj.menuId,
                            pcAuditFlag:requestObj.pcAuditFlag,
                            url: a.localhostUrl+submitUrl,
                            getPcValue:1,//1 按照pc端表单格式保存表单内容
                            callback: function (data) {
                                if(relationId=="sfg"){//慢病自助建档保存成功后跳转到列表
                                    setTimeout(function(){
                                        window.location=url+"/web-bin/m/nosen/chronicDiseases/selfFiling/to_archivesList_page?hospCode="+requestObj.hospCode+"&empiId="+requestObj.empiId;
                                    },500);
                                    a.canSubmit=true;
                                }else{
                                    $(".back_box").show();
                                    $(".jugeSummary").remove();
                                    jugeConfigData[a.hospCode] && $(".jugeSummary,.downloadTip").remove();
                                    $("#widget_control").addClass("hide");
                                    $("#submitForm").remove();
                                    if (a.appType == "ios") {
                                        $("#submitFormForIOS").click();
                                    } else if (a.appType == "android") {
                                        $("#submitFormForAndroid").click();
                                    }
                                    a.canSubmit=true;
                                }
                            },
                            errorCallback:function(data){
                                a.canSubmit=true;
                            }
                        });
                    }else if(relationId=="sqr"){//二维码满意度表单
                        var requestObj=a.analyseRequest();
                        var isMobile=/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;
                        if($.trim($("#patName").val())==""||$.trim($("#phone").val())==""){
                            formPlugin.alert('请回答完所有的必填项再提交！');
                            a.canSubmit=true;
                            return false;
                        }
                        if(!isMobile.test($("#phone").val())){
                            formPlugin.alert('手机格式有误，请输入有效的手机号码！');
                            a.canSubmit=true;
                            return false;
                        }
                        h.saveFormData({
                            parentEl: $("#widget_control"),
                            dataStatus: 1,
                            hospCode: a.hospCode,
                            id:requestObj.id,
                            questionnaireId:a.questionnaireId,
                            patSourceType:a.patSourceType,
                            patName:$("#patName").val(),
                            phone:$("#phone").val(),
                            deptCode:$("#deptCode").val(),
                            deptName:$("#deptCode").find("option:selected").text(),
                            wardCode:$("#wardCode").val(),
                            wardName :$("#wardCode").find("option:selected").text(),
                            url: a.localhostUrl+submitUrl,
                            callback: function (data) {
                                $(".back_box").show();
                                $(".jugeSummary").remove();
                                jugeConfigData[a.hospCode] && $(".jugeSummary,.downloadTip").remove();
                                $("#widget_control").addClass("hide");
                                $("#submitForm").remove();
                                if (a.appType == "ios") {
                                    $("#submitFormForIOS").click();
                                } else if (a.appType == "android") {
                                    $("#submitFormForAndroid").click();
                                }
                                $("#satisfaction_form").hide();
                                a.canSubmit=true;
                                a.id=data.data.id;
                            },
                            errorCallback:function(data){
                                a.canSubmit=true;
                            }
                        });
                    }else {//普通表单
                        h.saveFormData({
                            parentEl: $("#widget_control"),
                            dataStatus: 1,
                            relationId: relationId,
                            questionnaireId: a.questionnaireId,
                            hospCode: a.hospCode,
                            relationType: a.relationType,
                            replyType: a.replyType,
                            url: a.localhostUrl+submitUrl,
                            callback: function (data) {
                                $(".back_box").show();
                                $(".jugeSummary").remove();
                                jugeConfigData[a.hospCode] && $(".jugeSummary,.downloadTip").remove();
                                $("#widget_control").addClass("hide");
                                $("#submitForm").remove();
                                if (a.appType == "ios") {
                                    $("#submitFormForIOS").click();
                                } else if (a.appType == "android") {
                                    $("#submitFormForAndroid").click();
                                }
                                a.canSubmit=true;
                            },
                            errorCallback:function(data){
                                a.canSubmit=true;
                            }
                        });
                    }
                }
            });
        };
        //查看表单答案
        a.checkAnswers=function(){
            $("#toShowAnswer").click(function(){
                var query=decodeURI(window.location.search);
                if(window.location.pathname.split("/").pop()=="sqr"){//二维码
                        window.location.href=window.location.pathname.replace("sqr",a.id)+"?noJuge=1&number="+Math.random();
                }else if(window.location.pathname.split("/").pop()=="sfg"){//慢病自助建档
                    a.readOnly=true;
                    window.location.href=window.location.toString()+"&noJuge=1&number="+Math.random();
                }else {
                    if(query!=""){
                        window.location.href=window.location.toString()+"&noJuge=1&number="+Math.random();
                    }else {
                        window.location.href=window.location.toString()+"?noJuge=1&number="+Math.random();
                    }
                }
            });
        };
        //get请求参数转对象
        a.analyseRequest=function(){
            var url = decodeURI(window.location.search); //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                var strs = str.split("&");
                for(var i = 0; i < strs.length; i ++) {
                    theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        };
        //获取总得分
        a.totalScore=function(){
            var total=0;
            $("[componentkey='ScoreRadioBox']").find("input[type='radio']:checked").parents("li").find(".scoreValue_js").each(function(i){
                total+=parseInt($(this).val());
            });
            return total;
        };
        //问卷回答结果渲染
        a.analyReplyResult=function(q){
            var total=a.totalScore();
            var limit,top,cur;
            for(var i=0;i<q.judgStandard.length;i++){
                cur = q.judgStandard[i];
                top = cur.top;
                limit = cur.limit;
                if(total>=limit&&total<=top){
                    $(".jugeSummary .totalScore").text("总得分--"+total);
                    $(".jugeSummary .jugeResult").text("评判结果--"+cur.name);
                    $(".jugeSummary .jugeExcept").html(cur.except==1?"<span style=\"color:red\">问卷状态--异常</span>":"问卷状态--正常");
                    $(".jugeSummary .jugeDesc").text("评判说明--"+cur.desc);
                    return false;
                }
            }
        };
        //慢病问卷回答结果渲染
        a.analyChronicFormReplyResult=function(q){
            var total=a.totalScore();
            var limit,top,cur;
            for(var i=0;i<q.formJudgs.length;i++){
                cur = q.formJudgs[i];
                top = cur.upperLimit;
                limit = cur.lowerLimit;
                if(total>=limit&&total<=top){
                    $(".jugeSummary .totalScore").text("总得分--"+total);
                    $(".jugeSummary .jugeResult").text("评判结果--"+cur.judgName);
                    $(".jugeSummary .jugeExcept").html(cur.except==1?"<span style=\"color:red\">问卷状态--异常</span>":"问卷状态--正常");
                    $(".jugeSummary .jugeDesc").text("评判说明--"+cur.judgDesc);
                    return false;
                }
            }
        };
        //表单内容渲染
        a.analyFormResult=function(data,requestObj,port,localhostUrl){
            if(!(data.data&&data.data.questionnaire)){
                $(".noFound").show();
                return false;
            }
            if(!data.data.isBack) {
                if (data.data && data.data.validFlag) {
                    $(".noFound").text("问卷已过期").show();
                    return false;
                }
            }
            $(".wrapper").show();
            document.title = data.data.title;
            //题目
            var q=eval("(" + data.data.questionnaire + ")"),
                questions=q.questions;
            a.jumpType = q.jumpType || 1;
            var m={
                title:"",
                index:"0",
                order:"0",
                size:"1",
                componentKey:"ColumnPanel",
                layoutDetail:[]
            };
            var qType=["Text","RadioBox","CheckBox","MatrixRaty","","ScoreRadioBox","MultipleTextArea","","ImageRadioBox","Select","DateComponent","Mobile","ImageComponent",
                "TextArea","ImageCheckBox"];//题目类型数组
            if(questions){
                for(var i=0;i<questions.length;i++){
                    var o={
                        componentKey:qType[questions[i].type-1],
                        title:questions[i].title,
                        fieldId:questions[i].id,
                        jumpProp:questions[i].jumpProp,
                        required:questions[i].required,
                        isDefault:questions[i].isDefault,
                        isReadOnly:questions[i].isReadOnly,
                        content:questions[i].content,
                        isHideTitle:questions[i].isHideTitle,
                        isSystemDate:questions[i].isSystemDate,
                        format:questions[i].format,
                        hideForMobile:questions[i].hideForMobile,
                        alias:questions[i].alias,
                        textAlign:questions[i].textAlign,
                        quoteQuestionId:questions[i].quoteQuestionId,
                        isHideQuestion:questions[i].isHideQuestion,
                        notStatistics:questions[i].notStatistics,
                        selfId: questions[i].selfId,
                        isSingle: questions[i].isSingle,
                        options:[]
                    };
                    if(questions[i].questions){
                        for(var j=0;j<questions[i].questions.length;j++){
                            o.options.push({
                                fieldId:questions[i].questions[j].id,
                                order:"0",
                                componentKey:"Option",
                                name:questions[i].questions[j].title,
                                quoteQuestionId:questions[i].questions[j].quoteQuestionId,
                                children:[]
                            });
                            if(questions[i].questions[j].options){
                                for(var k=0;k<questions[i].questions[j].options.length;k++){
                                    var s_o=questions[i].questions[j].options[k];
                                    o.options[j].children.push({
                                        fieldId:s_o.questionId,
                                        selectionId:s_o.id,
                                        except:(s_o.except=="true"||s_o.except=="1").toString(),
                                        errorContent:questions[i].questions[0].options[k].tip,
                                        quoteOptionId:s_o.quoteOptionId
                                    });
                                }
                            }
                        }
                    }
                    if(questions[i].options){
                        for(var j=0;j<questions[i].options.length;j++){
                            o.options.push({
                                other:(questions[i].options[j].other=="true"||questions[i].options[j].other=="1").toString(),
                                selectionId:questions[i].options[j].id,
                                order:"0",
                                componentKey:"Option",
                                required:questions[i].options[j].required,
                                name:questions[i].options[j].title,
                                errorContent:questions[i].options[j].tip,
                                isError:(questions[i].options[j].except=="true"||questions[i].options[j].except=="1").toString(),
                                scoreValue:questions[i].options[j].score,
                                quoteOptionId:questions[i].options[j].quoteOptionId,
                                selfId:questions[i].options[j].selfId,
                                jumpId:questions[i].options[j].jumpId,
                                filePath:questions[i].options[j].filePath
                            });
                        }
                    }
                    m.layoutDetail.push(o);
                }
                m=JSON.stringify(m);
            }
            //答案
            var n={};
            if(data.data.isBack){
                a.readOnly=true;
                q.type==0 && $(".jugeSummary").remove();
                jugeConfigData[data.data.hospCode] && $(".jugeSummary,.downloadTip").remove();
                !parseInt(requestObj["noJuge"]) && ($(".back_box").show(),$("#widget_control").addClass("hide"));
                var s=eval("(" + data.data.backMsg + ")"),
                    answers=s&&s.answers;
                if(answers){
                    for(var i=0;i<answers.length;i++){
                        //多选题以答案id为key
                        if(answers[i].questionType==3||answers[i].questionType==15){
                            n[answers[i].questionAnswer]={
                                questionAnswer:answers[i].questionAnswer,
                                content:answers[i].content,
                            };
                        }else if(answers[i].questionType==13){//图片题，questionAnswer组成数组
                            var c=n[answers[i].questionId]?n[answers[i].questionId].questionAnswer:[],
                                d=n[answers[i].questionId]?n[answers[i].questionId].content:[];
                            c.push(answers[i].questionAnswer);
                            d.push(answers[i].content);
                            n[answers[i].questionId]={
                                questionAnswer:c,
                                content:d,
                            };
                        }else{
                            n[answers[i].questionId]={
                                questionAnswer:answers[i].questionAnswer,
                                content:answers[i].content,
                            };
                        }
                    }
                }
                //查看二维码表单额外题目答案
                if(data.data.relationType==10){
                    $("#dept_block").hide();
                    ($.trim(data.data.patName)!="")&&$("#patName").val(data.data.patName).attr("disabled",true);
                    ($.trim(data.data.phone)!="")&&$("#phone").val(data.data.phone).attr("disabled",true);
                    ($.trim(data.data.deptName)!="")&&($("#deptCode").append('<option value="'+data.data.deptCode+'" selected>'+data.data.deptName+'</option>').attr("disabled",true),$("#dept_block").show());
                    ($.trim(data.data.wardName)!="")&& ($("#wardCode").append('<option value="'+data.data.wardCode+'" selected>'+data.data.wardName+'</option>').attr("disabled",true),$("#ward_block").show());
                    $("#satisfaction_form").show();
                }
            }
            parseInt(requestObj["isDoc"])&&(a.readOnly=true);
            !a.readOnly&&$("#submitForm").show();
            parseInt(requestObj["app"])&&($(".app_foot_download").hide(),$(".blank_div").height(40));
            noAdvertData[data.data.hospCode]&&($(".app_foot_download").hide(),$(".blank_div").height(40));
            imageConfigData[data.data.hospCode]&&($(".advert_img img").attr("src","/web-bin/resources/hospConfig/images/"+imageConfigData[data.data.hospCode]));
            titleConfigData[data.data.hospCode]&&$(".form_head_title").remove();
            h.renderForm({
                parentEl: $("#widget_control") ,
                layoutDetail: m,
                answerDetail: n,
                readOnly: a.readOnly,
                replyStatus: true,
                callback: function(b) {
                    data.data.isBack&&q.type==1&&a.analyReplyResult(q);
                    if (a.jumpType == 1) {
                        //初始化跳题题目
                        $("#widget_control input[type='radio']:checked").each(function () {
                            var optionData = $(this).parents("li").find(".option_title").data("componentData").componentSetup,
                                field = $(this).parents(".field_js"),
                                selfId = field.attr("selfId");
                            field.nextUntil('div[jump_fieldId=' + selfId + ']').removeClass("jump_hide");
                            field.parent().find('div[jump_fieldId=' + selfId + ']').attr("jump_fieldId", "");
                            if(optionData.jumpId && field.parent().find('div[selfId='+optionData.jumpId+']').length>0){
                                a.clearContent(field, 'div[selfId=' + optionData.jumpId + ']');
                                field.nextUntil('div[selfId=' + optionData.jumpId + ']').addClass("jump_hide");
                                field.parent().find('div[selfId=' + optionData.jumpId + ']').attr("jump_fieldId", selfId);
                            }
                        });
                    } else if (a.jumpType == 2) {
                        $("#widget_control input[type='radio']:checked").each(function () {
                            var optionData=$(this).data("componentData").componentSetup,
                                field = $(this).parents(".field_js"),
                                selfId = field.attr("selfId");
                            var optionJumpId = optionData.jumpId ? $.trim(optionData.jumpId).split(',') : [];
                            var fieldJumpId = [];
                            $.each(field.find("input[type='radio']"), function(i, item) {
                                $(item).data("componentData").componentSetup.jumpId && (fieldJumpId = fieldJumpId.concat($(item).data("componentData").componentSetup.jumpId.split(',')));
                            });
                            $.each(fieldJumpId, function(i, item) {
                                field.parent().find('div[selfId='+item+']').addClass('subset_hide');
                            });
                            if (optionJumpId.length>0) {
                                $.each(optionJumpId, function(i, item) {
                                    field.parent().find('div[selfId='+item+']').removeClass('subset_hide');
                                });
                            }
                        });
                        $("#widget_control input[type='checkbox']:checked").each(function () {
                            var optionData=$(this).data("componentData").componentSetup,
                                field = $(this).parents(".field_js"),
                                selfId = field.attr("selfId");
                            var optionJumpId = optionData.jumpId ? $.trim(optionData.jumpId).split(',') : [];
                            if (optionJumpId.length>0) {
                                if ($(this).next().hasClass('sc_checked')) {
                                    $.each(optionJumpId, function(i, item) {
                                        field.parent().find('div[selfId='+item+']').removeClass('subset_hide');
                                    });
                                } else {
                                    optionJumpId = [];
                                    $.each(field.find("input[type='checkbox']:checked"), function(i, item) {
                                        $(item).data("componentData").componentSetup.jumpId && (optionJumpId = optionJumpId.concat($(item).data("componentData").componentSetup.jumpId.split(',')));
                                    });
                                    var fieldJumpId = [];
                                    $.each(field.find("input[type='checkbox']"), function(i, item) {
                                        $(item).data("componentData").componentSetup.jumpId && (fieldJumpId = fieldJumpId.concat($(item).data("componentData").componentSetup.jumpId.split(',')));
                                    });
                                    $.each(fieldJumpId, function(i, item) {
                                        field.parent().find('div[selfId='+item+']').addClass('subset_hide');
                                    });
                                    if (optionJumpId.length>0) {
                                        $.each(optionJumpId, function(i, item) {
                                            field.parent().find('div[selfId='+item+']').removeClass('subset_hide');
                                        });
                                    }
                                }
                            }
                        });
                    }
                }
            });
            $(".hospName").text(data.data.hospName);
            $(".form_head_title").html(data.data.title);
            $(".form_head_desc").html(q.beginContent);
            $(".form_foot").html(q.endContent);
            a.localhostUrl=localhostUrl;
            a.port=port;
            a.questionnaireId=data.data.questionnaireId;
            a.hospCode=data.data.hospCode;
            a.relationType=data.data.relationType;
            a.appType=requestObj["appType"];
            if(a.appType!="undefined"&&typeof(a.appType)!="undefined"&&a.appType!=""){
                a.replyType="1";
            }else{
                if(requestObj["replyType"]=="2"){
                    a.replyType="2";
                }else if(requestObj["replyType"]=="4"){
                    a.replyType="4";
                }else{
                    a.replyType="3";
                }
            }
            //加载二维码满意度额外题目
            if(resourseType=="sqr"){
                a.questionnaireId=JSON.parse(data.data.questionnaire).id;
                (requestObj.name)&&$("#patName").val(requestObj.name);
                (requestObj.phone)&&$("#phone").val(requestObj.phone);
                var deptList=data.data.deptList;
                $.each(deptList,function (i,item) {
                    $("#deptCode").append('<option value="'+item.deptCode+'">'+item.deptName+'</option>')
                });
                ($.trim(data.data.deptCode)!="")&&$("#deptCode").val(data.data.deptCode);
                if(data.data.patSource!=1){
                    a.patSourceType=data.data.patSource;
                    var wardList=data.data.wardList;
                    $.each(wardList,function (i,item) {
                        $("#wardCode").append('<option value="'+item.deptCode+'">'+item.deptName+'</option>')
                    });
                    $("#ward_block").show();
                }
                ($.trim(data.data.wardCode)!="")&&$("#wardCode").val(data.data.wardCode);
                $("#satisfaction_form").show();
            }
        };
        //慢病自助建档渲染
        a.analyChronicFormResult=function(data,requestObj,port,localhostUrl){
            var formObj=eval("(" + data.data.formJson + ")");
            if(data.data.pcAuditFlag==0){
                a.readOnly=false;
            }else {
                a.readOnly=true;
            }
            $(".wrapper").show();
            a.jumpType = formObj.jumpType;
            h.renderForm({
                parentEl: $("#widget_control") ,
                layoutDetail: formObj.layoutDetail,
                answerDetail: "",
                readOnly: a.readOnly,
                replyStatus: true,
                callback: function(b) {
                    a.readOnly&&formObj.formType==1&&a.analyChronicFormReplyResult(formObj);
                    if (a.jumpType == 1) {
                        //初始化跳题题目
                        $("#widget_control input[type='radio']:checked").each(function () {
                            var optionData = $(this).parents("li").find(".option_title").data("componentData").componentSetup,
                                field = $(this).parents(".field_js"),
                                selfId = field.attr("selfId");
                            field.nextUntil('div[jump_fieldId=' + selfId + ']').removeClass("jump_hide");
                            field.parent().find('div[jump_fieldId=' + selfId + ']').attr("jump_fieldId", "");
                            if(optionData.jumpId && field.parent().find('div[selfId='+optionData.jumpId+']').length>0){
                                a.clearContent(field, 'div[selfId=' + optionData.jumpId + ']');
                                field.nextUntil('div[selfId=' + optionData.jumpId + ']').addClass("jump_hide");
                                field.parent().find('div[selfId=' + optionData.jumpId + ']').attr("jump_fieldId", selfId);
                            }
                        });
                    } else if (a.jumpType == 2) {
                        $("#widget_control input[type='radio']:checked").each(function () {
                            var optionData=$(this).data("componentData").componentSetup,
                                field = $(this).parents(".field_js"),
                                selfId = field.attr("selfId");
                            var optionJumpId = optionData.jumpId ? $.trim(optionData.jumpId).split(',') : [];
                            var fieldJumpId = [];
                            $.each(field.find("input[type='radio']"), function(i, item) {
                                $(item).data("componentData").componentSetup.jumpId && (fieldJumpId = fieldJumpId.concat($(item).data("componentData").componentSetup.jumpId.split(',')));
                            });
                            $.each(fieldJumpId, function(i, item) {
                                field.parent().find('div[selfId='+item+']').addClass('subset_hide');
                            });
                            if (optionJumpId.length>0) {
                                $.each(optionJumpId, function(i, item) {
                                    field.parent().find('div[selfId='+item+']').removeClass('subset_hide');
                                });
                            }
                        });
                        $("#widget_control input[type='checkbox']:checked").each(function () {
                            var optionData=$(this).data("componentData").componentSetup,
                                field = $(this).parents(".field_js"),
                                selfId = field.attr("selfId");
                            var optionJumpId = optionData.jumpId ? $.trim(optionData.jumpId).split(',') : [];
                            if (optionJumpId.length>0) {
                                if ($(this).next().hasClass('sc_checked')) {
                                    $.each(optionJumpId, function(i, item) {
                                        field.parent().find('div[selfId='+item+']').removeClass('subset_hide');
                                    });
                                } else {
                                    optionJumpId = [];
                                    $.each(field.find("input[type='checkbox']:checked"), function(i, item) {
                                        $(item).data("componentData").componentSetup.jumpId && (optionJumpId = optionJumpId.concat($(item).data("componentData").componentSetup.jumpId.split(',')));
                                    });
                                    var fieldJumpId = [];
                                    $.each(field.find("input[type='checkbox']"), function(i, item) {
                                        $(item).data("componentData").componentSetup.jumpId && (fieldJumpId = fieldJumpId.concat($(item).data("componentData").componentSetup.jumpId.split(',')));
                                    });
                                    $.each(fieldJumpId, function(i, item) {
                                        field.parent().find('div[selfId='+item+']').addClass('subset_hide');
                                    });
                                    if (optionJumpId.length>0) {
                                        $.each(optionJumpId, function(i, item) {
                                            field.parent().find('div[selfId='+item+']').removeClass('subset_hide');
                                        });
                                    }
                                }
                            }
                        });
                    }
                }
            });
            $(".form_head_title").html(formObj.formTitle);
            $(".form_head_desc").html(formObj.beginContent);
            $(".form_foot").html(formObj.endContent);
            document.title = formObj.formTitle;
            parseInt(requestObj["isDoc"])&&(a.readOnly=true);
            !a.readOnly&&$("#submitForm").show();
            parseInt(requestObj["app"])&&($(".app_foot_download").hide(),$(".blank_div").height(40));
            noAdvertData[data.data.hospCode]&&($(".app_foot_download").hide(),$(".blank_div").height(40));
            imageConfigData[data.data.hospCode]&&($(".advert_img img").attr("src","/web-bin/resources/hospConfig/images/"+imageConfigData[data.data.hospCode]));
            titleConfigData[data.data.hospCode]&&$(".form_head_title").remove();
            a.localhostUrl=localhostUrl;
            a.port=port;
            a.hospCode=data.data.hospCode;
        };
        $(function(){
            a.previewEvents();
            a.submitForm();
            a.checkAnswers();
            //ajax调用返回修改内容
            var localhostUrl=window.location.origin;//window.HUGPAGE_CONFIG.localhostUrl;
            var port=window.HUGPAGE_CONFIG.PORT;
            var requestObj=a.analyseRequest();
            resourseType=window.location.pathname.split("/").pop();
            if(resourseType=="sqr"){//sqr为二维码满意度表单
                var ajaxUrl=localhostUrl+'/web-bin/m/nosen/followup/form/query_form_data_satisfaction?id='+requestObj.id;
            }else if(resourseType=="sfg"){//sfg为慢病自助建档档案表单
                var ajaxUrl=localhostUrl+'/web-bin/m/nosen/chronicDiseases/selfFiling/query_checkForm_data?empiId='+requestObj.empiId+'&menuId='+requestObj.menuId+'&hospCode='+requestObj.hospCode;
            }else {
                var ajaxUrl=localhostUrl+'/web-bin/m/nosen/followup/form/query_form_data?id='+resourseType;
            }
            $.ajax({
                type:"post",
                url: ajaxUrl,
                success:function(data){
                    if(resourseType=="sfg"){
                        a.analyChronicFormResult(data,requestObj,port,localhostUrl);
                    }else{
                        a.analyFormResult(data,requestObj,port,localhostUrl);
                    }
                },
                error:function () {
                    return;
                }
            });
            //禁止页面缩放
            window.onload=function () {
                document.addEventListener('touchstart',function (event) {
                    if(event.touches.length>1){
                        event.preventDefault();
                    };
                });
                var lastTouchEnd=0;
                document.addEventListener('touchend',function (event) {
                    var now=(new Date()).getTime();
                    if(now-lastTouchEnd<=300){
                        event.preventDefault();
                    }
                    lastTouchEnd=now;
                },false);
            };
        });
        //日期格式化
        Date.prototype.format = function(format){
            var o = {
                "M+" : this.getMonth()+1, //month
                "D+" : this.getDate(),    //day
                "h+" : this.getHours(),   //hour
                "m+" : this.getMinutes(), //minute
                "s+" : this.getSeconds(), //second
                "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
                "S" : this.getMilliseconds() //millisecond
            };
            if(/(Y+)/.test(format)) format=format.replace(RegExp.$1,
                (this.getFullYear()+"").substr(4 - RegExp.$1.length));
            for(var k in o)if(new RegExp("("+ k +")").test(format))
                format = format.replace(RegExp.$1,
                    RegExp.$1.length==1 ? o[k] :
                        ("00"+ o[k]).substr((""+ o[k]).length));
            return format;
        };
        u.exports = a;
    });