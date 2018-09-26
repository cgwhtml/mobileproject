define("form/component/option", ["form/component", "form/tplutil"],
function(p, s, u) {
    s = p("form/component");
    var h = p("form/tplutil");
    window.Option = s.extend({
        initialize: function(e) {
            this.componentSetup = {
                componentKey: "Option",
                name: "选项",
                order: 0,
                index: 0,
                required: !1,
                selectionId: "",
                fieldId: "",
                defOption: !1,
                other: !1,
                objId: "",
                parent: "",
                children: [],
                errorContent:"",
                isError:!1,
                filePath:"",
                scoreValue:"",
                questionAnswers: [],
                quoteQuestionId: "",
                quoteOptionId: "",
                selfId: "",//前端操作自用id,用于处理逻辑
                jumpId: "" //逻辑跳转的题目id
            };
            null != e && (this.componentSetup.name = e.name, this.componentSetup.order = e.order, this.componentSetup.index = e.index, this.componentSetup.required = e.required, this.componentSetup.selectionId = e.selectionId, this.componentSetup.defOption = e.defOption, this.componentSetup.other = e.other, this.componentSetup.objId = e.objId, this.componentSetup.parent = e.parent, this.componentSetup.children = e.children, this.componentSetup.fieldId = e.fieldId,this.componentSetup.errorContent = e.errorContent,this.componentSetup.isError = e.isError,this.componentSetup.filePath=e.filePath,this.componentSetup.scoreValue=e.scoreValue, this.componentSetup.questionAnswers=e.questionAnswers, this.componentSetup.quoteOptionId = e.quoteOptionId, this.componentSetup.quoteQuestionId = e.quoteQuestionId, this.componentSetup.selfId = e.selfId, this.componentSetup.jumpId = e.jumpId);
            this.tpl = h.get("option");
        },
        setName: function(e) {
            this.componentSetup.name = e;
        },
        setOrder: function(e) {
            this.componentSetup.order = e;
        },
        setOther: function(e) {
            this.componentSetup.other = e;
        },
        setObjId: function(e) {
            this.componentSetup.objId = e;
        },
        setFilePath: function(e) {
            this.componentSetup.filePath = e;
        },
        setScoreValue:function(e) {
        	this.componentSetup.scoreValue = e;
        },
        setChildren: function(e) {
            this.componentSetup.children = e;
        },
        renderPreview: function(e, d, w) {
        	var c = $(this.tpl).siblings("#form_option");
            c = c.find("." + d.componentSetup.componentKey + "_js").clone();
            c.find("input").attr("name", d.cid).attr("disabled",false).attr("id",this.componentSetup.selectionId).val(this.componentSetup.selectionId)
                .data("componentData",this);
            //解决老版本包含标签错乱的问题
        	var $c=$("<p></p>");
        	$c.html(this.componentSetup.name);
            c.find(".option_title").text($c.text());
            "true" != this.componentSetup.other && 1 != this.componentSetup.other || (c.addClass("otherchoice"),c.append('<div class="input_box"><input type="text" class="text_control input_otherchoice hide"/></div>'));
            if("ImageRadioBox"==d.componentSetup.componentKey){
                c.find(".option_title").data("componentData",this);//解决选择框代码动态添加找不到数据的问题
                c.find("img").attr("src", this.componentSetup.filePath);
                c.find(".content").attr("title",this.componentSetup.name);
                w&&w[d.componentSetup.fieldId]&&w[d.componentSetup.fieldId].questionAnswer==this.componentSetup.selectionId&&(c.find("#"+w[d.componentSetup.fieldId].questionAnswer).attr("checked", true),
                    (this.componentSetup.errorContent && ("true" == this.componentSetup.isError || 1 == this.componentSetup.isError) && c.find(".widget_tip").text("提示："+this.componentSetup.errorContent)));
            }else if("ImageCheckBox"==d.componentSetup.componentKey){
                c.find(".option_title").data("componentData",this);
                c.find("img").attr("src", this.componentSetup.filePath);
                c.find(".content").attr("title",this.componentSetup.name);
                w&&w[this.componentSetup.selectionId]&&w[this.componentSetup.selectionId].questionAnswer==this.componentSetup.selectionId&&(c.find("#"+w[this.componentSetup.selectionId].questionAnswer).attr("checked", true),
                    (this.componentSetup.errorContent && ("true" == this.componentSetup.isError || 1 == this.componentSetup.isError) && c.find(".widget_tip").text("提示："+this.componentSetup.errorContent)));
            }else if("MatrixRaty" == d.componentSetup.componentKey){
            	c.html("<p></p>");
                var r=this.componentSetup.children;
        		for(var i=0;i<r.length;i++){
        			c.append("<img src='/web-bin/mobile/followup/form/images/raty_star_unchecked.png' value='"+(i+1)+"' fieldId='"+this.componentSetup.fieldId+"' id='"+r[i].selectionId+"' quoteOptionId='"+$.trim(r[i].quoteOptionId)+"' quoteQuestionId='"+$.trim(this.componentSetup.quoteQuestionId)+"' isError='"+r[i].except+"' errorContent='"+r[i].errorContent+"' onclick=''>");
        		}
        		// pc端格式回显
        		c.find("p").text(this.componentSetup.name);
                d.componentSetup.options[0].questionAnswers && d.componentSetup.options[0].questionAnswers[0] && c.find("#"+d.componentSetup.options[0].questionAnswers[0].questionAnswer).attr("src","/web-bin/mobile/followup/form/images/raty_star_checked.png").attr("class","raty_star_checked")
                    .prevAll().attr("src","/web-bin/mobile/followup/form/images/raty_star_checked.png");


        		var j;
        		var q;
        		w&&w[this.componentSetup.fieldId]&&((q=c.find("#"+w[this.componentSetup.fieldId].questionAnswer),j=q.index()-1,
        			("true"==this.componentSetup.children[j].except || 1==this.componentSetup.children[j].except)?
                        (this.componentSetup.children[j].errorContent!=null&&this.componentSetup.children[j].errorContent!="")?
                        e.parents(".field_js").find(".widget_tip").removeClass("hide").append(this.componentSetup.children[j].errorContent+"；"):null:null),
        			q.attr("src","/web-bin/mobile/followup/form/images/raty_star_checked.png").attr("class","raty_star_checked").prevAll().attr("src","/web-bin/mobile/followup/form/images/raty_star_checked.png"));
            }else if("Select" == d.componentSetup.componentKey){
                var v = this.componentSetup.selectionId || this.cid;
                c="<option value="+ v +">"+this.componentSetup.name+"</option>";//解决IE8兼容问题
            }else if("MultipleTextArea" == d.componentSetup.componentKey){
                this.componentSetup.questionAnswers&&this.componentSetup.questionAnswers[0]&&c.find(".text_control").val(this.componentSetup.questionAnswers[0].questionAnswer);//慢病自助建档答案

                w&&w[this.componentSetup.fieldId]&&c.find(".text_control").val(w[this.componentSetup.fieldId].questionAnswer);
                c.find(".text_control").addClass(d.componentSetup.size).attr("id",this.componentSetup.fieldId).attr("quoteQuestionId",this.componentSetup.quoteQuestionId);
            }else if("RadioBox" == d.componentSetup.componentKey){
            	c.find(".option_title").data("componentData",this);//解决选择框代码动态添加找不到数据的问题
                d.componentSetup.questionAnswers&&d.componentSetup.questionAnswers[0]&&d.componentSetup.questionAnswers[0].questionAnswer==this.componentSetup.selectionId
                &&c.find("#"+this.componentSetup.selectionId).attr("checked", true);


            	w&&w[d.componentSetup.fieldId]&&w[d.componentSetup.fieldId].questionAnswer==this.componentSetup.selectionId&&(c.find("#"+w[d.componentSetup.fieldId].questionAnswer).attr("checked", true),
            		(this.componentSetup.errorContent && ("true" == this.componentSetup.isError || 1 == this.componentSetup.isError) && c.find(".widget_tip").text("提示："+this.componentSetup.errorContent)),
        			c.find(".input_otherchoice").length>0?(c.find(".input_otherchoice").removeClass("hide"),c.find(".input_otherchoice").attr("value",w[d.componentSetup.fieldId].content)):null);
            }else if("CheckBox" == d.componentSetup.componentKey){
                c.find(".option_title").data("componentData",this);
                if(d.componentSetup.questionAnswers){
                    for(var i=0;i<d.componentSetup.questionAnswers.length;i++){
                        d.componentSetup.questionAnswers[i].questionAnswer==this.componentSetup.selectionId&&c.find("#"+this.componentSetup.selectionId).attr("checked", true);
                    }
                }


            	w&&w[this.componentSetup.selectionId]&&w[this.componentSetup.selectionId].questionAnswer==this.componentSetup.selectionId&&(c.find("#"+w[this.componentSetup.selectionId].questionAnswer).attr("checked", true),
        			(this.componentSetup.errorContent && ("true" == this.componentSetup.isError || 1 == this.componentSetup.isError) && c.find(".widget_tip").text("提示："+this.componentSetup.errorContent)),
        			c.find(".input_otherchoice").length>0?(c.find(".input_otherchoice").removeClass("hide"),c.find(".input_otherchoice").attr("value",w[this.componentSetup.selectionId].content)):null);
            }else if("ScoreRadioBox" == d.componentSetup.componentKey){
            	c.find(".option_title").data("componentData",this);
            	c.find(".scoreValue_js").val(this.componentSetup.scoreValue);
            	w&&w[d.componentSetup.fieldId]&&w[d.componentSetup.fieldId].questionAnswer==this.componentSetup.selectionId&&(c.find("#"+w[d.componentSetup.fieldId].questionAnswer).attr("checked", true),
            	(this.componentSetup.errorContent && ("true" == this.componentSetup.isError || 1 == this.componentSetup.isError) && c.find(".widget_tip").text("提示："+this.componentSetup.errorContent)),
                    c.find(".input_otherchoice").length>0?(c.find(".input_otherchoice").removeClass("hide"),c.find(".input_otherchoice").attr("value",w[d.componentSetup.fieldId].content)):null);
            }
            e.append(c);
        }
    });
    u.exports = window.Option;
});