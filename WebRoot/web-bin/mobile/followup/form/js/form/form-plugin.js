define("form/form-plugin", ["form/component/topic"],
function(p, s, u) {
	p("form/component/topic");
	window.formPlugin = {};
	formPlugin.renderForm=function(e){
		(function(d) {
			var c = d.parentEl;
			var g = d.notDefault,
			k = d.layoutDetail,
			n = d.callback,
			e = d.formData,
			b = d.readOnly,
			m = d.replyStatus,
			w = d.answerDetail;
			null != k ? (f = {},f.layoutDetail = k,formPlugin.analyseLayout(f, c, g, b, null, m, w),e ? null : n && n()) : null;
		})(e);
	};
	formPlugin.analyseLayout = function(e, d, c, a, f, m, w) {
        d.html("").hide();
        if (e && e.layoutDetail) {
            var b = JSON.parse(e.layoutDetail);
            formPlugin.analyseComponent(b, d, c, a, e, f, m, w);
        }
        d.show();
    };
    formPlugin.analyseComponent = function(e, d, c, a, f, b, m, w) {
        if(("true" == e.hideForMobile || 1 == e.hideForMobile) || ("true" == e.isHideQuestion || 1 == e.isHideQuestion)){//题目不显示在手机端
        	return false;
        }
    	var g = e.componentKey,//题目类型
        k = new window[g](e),
        r = a;
        var n;
        n = k.renderPreview(d, c, r, w);
        k.checkEvents(b,r,m);
        //m&&k.autoSaveEvents();
        if ("ColumnPanel" == g && null != e.layoutDetail) for (g = 0; g < e.layoutDetail.length; g++) if (k = e.layoutDetail[g]) r = "",
        r = 1 == e.size ? d: $(n[g]),
        formPlugin.analyseComponent(k, r, c, a, f, b, m, w),
        k = r.parents("[componentkey='ColumnPanel']"),
        0 != k.find(".field_js").size() && 0 == k.find(".field_js").not(".hide").size() ? k.hide() : k.show();
    };
    formPlugin.saveFormData = function(e) {
        var d = e.parentEl,
            c = e.callback,
            url = e.url,
            eb = e.errorCallback;
        !formPlugin.submitCheck(d, eb)&&(e = formPlugin.submitAssembleForm(e),formPlugin.confirm('请确认是否提交？',e,c,eb,url));
	};
    formPlugin.submitCheck = function(e, eb) {
        var c = 0;
        e.find(".field_js").not(".fieldReadOnly,.jump_hide,.subset_hide").find(".check_js").each(function() {
            c=$(this).data("componentData").submitCheck($(this));
            //1表示特殊提示，9是必选提示
            if(c==1){
            	window.scrollTo(0,$(this).offset().top-40);
                eb();
                return false;
            }else if(c==9){
                formPlugin.alert('请回答完所有的必填项再提交！');
                window.scrollTo(0,$(this).offset().top-40);
                eb();
                return false;
            }
        });
        return c;
    };
    formPlugin.submitAssembleForm = function(e, d) {
        var c = e.parentEl;
        if (null != e) {
            var a = {
                relationId: e.relationId,
                relationType:e.relationType,
                questionnaireId: e.questionnaireId,
                hospCode: e.hospCode,
                replyType:e.replyType,
                id:e.id,
                patSourceType:e.patSourceType,
                phone:e.phone,
                patName:e.patName,
                deptCode:e.deptCode,
                deptName:e.deptName,
                wardCode:e.wardCode,
                wardName:e.wardName,
                empiId: e.empiId,
                menuId: e.menuId,
                pcAuditFlag: e.pcAuditFlag
            };
            var b = formPlugin.assembleFormFieldData(c, d,e.getPcValue);
            if(e.getPcValue){
                a.dataDetails = b;
            }else {
                a.answers = b;
            }
            return a;
        }
    };
    formPlugin.assembleFormFieldData = function(e,d,v) {
        var c = [],
            a=0,
            f = e.find(".field_js").not(".fieldReadOnly").find(".check_js");
        f.each(function(b) {
            b = $(this).data("componentData");
            if(v==1){
                var f=b.getPCValue($(this), d);
                c[a] = f;
                a++;
            }else {
                var f=b.getValue($(this), d);
                if(Object.prototype.toString.call(f)=='[object Array]'){
                    c=c.concat(f);
                }else{
                    c.push(f);
                }
            }
        });
        return c;
    };
    formPlugin.alert = function(tip){
    	$(".alert_content").text(tip);
    	$(".alert_box").css({"left":($(window).width()-$(".alert_box").width())/2,"top":($(window).height()-$(".alert_box").height())/2});	
    	$(".con_back").show();
    	$(".alert_box").show();	
    	$(".alert_footer").on("click",function(e){
    		$(".alert_box").hide();
    		$(".con_back").hide();
    		e.preventDefault();
    	});
    };
    formPlugin.confirm = function(tip,answer,c,eb,url){
    	$(".confirm_content").text(tip);
    	$(".confirm_box").css({"left":($(window).width()-$(".confirm_box").width())/2,"top":($(window).height()-$(".confirm_box").height())/2});
    	$(".con_back").show();
    	$(".confirm_box").show();
    	$(".cancel_btn").off("click").on("click",function(e){
            eb();
    		$(".confirm_box").hide();
    		$(".con_back").hide();
    		e.preventDefault();
    	});
    	$(".ok_btn").off("click").on("click",function(e){
            var data={};
    	    if(url.split("/").pop()=="submit_form_data_satisfaction"){//二维码满意度
                data={"answers":JSON.stringify(answer),"hospCode":answer.hospCode,"id":answer.id,"phone":answer.phone,"patName":answer.patName,"deptCode":answer.deptCode,"deptName":answer.deptName,"wardCode":answer.wardCode,"wardName":answer.wardName};
            }else if(url.split("/").pop()=="submit_replyForm_data"){//慢病自助建档
                data={"formJson":JSON.stringify(answer),"hospCode":answer.hospCode,"empiId":answer.empiId,"menuId":answer.menuId,"pcAuditFlag":answer.pcAuditFlag};
            }else {
                data={"answers":JSON.stringify(answer),"hospCode":answer.hospCode};
            }
    		$.ajax({
                type: "POST",
                dataType: "json",
                url: url,
                data: data,
                success: function(b) {
                	if(b.res==0){
                		c(b);
                    }else{
                        eb(b);
                    	formPlugin.alert('提交失败！');
                    }
                },
                error: function(b) {
                    eb(b);
                	formPlugin.alert('提交失败！');
                }
            });
    		$(".confirm_box").hide();
    		$(".con_back").hide();
    		e.preventDefault();
    	});
    };
	u.exports = window.formPlugin;
});