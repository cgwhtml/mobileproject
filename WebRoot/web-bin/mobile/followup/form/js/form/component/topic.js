define("form/component/topic", ["form/component/text","form/component/textarea","form/component/radiobox","form/component/checkbox","form/component/imageradiobox","form/component/imagecheckbox"
                           ,"form/component/matrixraty","form/component/imagecomponent","form/component/scoreradiobox","form/component/select","form/component/datecomponent","form/component/mobile"
                           ,"form/component/multipleTextArea","form/component/columnpanel","form/component/tablelayout"],
		function(p,s,u){
	p("form/component/text");
	p("form/component/textarea");
	p("form/component/radiobox");
	p("form/component/checkbox");
	p("form/component/imageradiobox");
	p("form/component/imagecheckbox");
	p("form/component/matrixraty");
	p("form/component/imagecomponent");
	p("form/component/scoreradiobox");
	p("form/component/select");
	p("form/component/datecomponent");
	p("form/component/mobile");
	p("form/component/multipleTextArea");
	p("form/component/columnpanel");
	p("form/component/tablelayout");
});
//文本输入框
define("form/component/text", ["form/editablecomponent","form/tplutil"],
		function(p,s,u){
	var h=p("form/editablecomponent"),
	e=p("form/tplutil");
	window.Text = h.extend({
		initialize:function(d){
			h.prototype.initialize.call(this, d);
			var c = {
				componentKey: "Text",
				title: "文本输入框"
            };
			null != d && (c.title = d.title);
			this.componentSetup = $.extend(this.componentSetup, c);
			this.tpl = e.get("text");
		},
        renderPreview:function(d, c, a, w){
        	var f = $(this.tpl).siblings("#form_text");
        	h.prototype.renderPreview.call(this, d, c, a, f);
            this.componentSetup.questionAnswers&&this.componentSetup.questionAnswers[0]&&f.find(".text_control").val(this.componentSetup.questionAnswers[0].questionAnswer);//慢病自助建档答案

            w&&w[this.componentSetup.fieldId]&&f.find(".text_control").val(w[this.componentSetup.fieldId].questionAnswer);
        	f.find(".text_control").addClass(this.componentSetup.size).attr("id",this.componentSetup.fieldId || ("preview_"+this.cid));
            "true" != this.componentSetup.isDefault && 1 !=this.componentSetup.isDefault ||f.find(".field_value_js").attr("value",this.componentSetup.content);
        	"true" != this.componentSetup.isDefault && 1 !=this.componentSetup.isDefault||"true" != this.componentSetup.isReadOnly && 1 !=this.componentSetup.isReadOnly||(f.addClass("fieldReadOnly"),f.find(".field_value_js").attr("disabled","disabled"));
        	a&&f.find(".text_control").attr("disabled","disabled");
        	d.append(f);
        },
        checkEvents:function(e,r,m){
            var id=this.componentSetup.fieldId || ("preview_"+this.cid),
                str="#preview_widget_control #"+id;
            if(m){
                str="#widget_control #"+id;
            }
            $(document).on("blur.preview", str,function(b){
                b=$.trim($(this).val());
                if(b.length>200){
                    formPlugin.alert('文本输入框最大支持输入200个文字！');
                }
            });
        },
        submitCheck: function(e) {
            var v=e.val();
            if(v.length>200){
            	formPlugin.alert('文本输入框最大支持输入200个文字！');
                return 1;
            }
            if(("true" == this.componentSetup.required || 1 ==this.componentSetup.required)&&$.trim(v)==""){
                return 9;
            }
            return 0;
        },
        getValue: function(d) {
            var c = $.trim(d.val());
            var f = {
                questionAnswer: c,
                questionId: this.componentSetup.fieldId,
                questionType: 1,
                quoteQuestionId: this.componentSetup.quoteQuestionId
            };
            return f;
        },
        getPCValue: function(d) {
            var c = $.trim(d.val());
            var f = {
                fieldId2: this.componentSetup.fieldId2,
                fieldName: this.componentSetup.fieldName,
                componentKey: this.componentSetup.componentKey,
                questionId: this.componentSetup.fieldId,
                quoteQuestionId: this.componentSetup.quoteQuestionId,//引用单题
                questionAnswers: [{
                    questionId: "",
                    questionAnswer: c,
                    content: "",
                    quoteQuestionAnswer: ""
                }]
            };
            return f;
        }
	});
	u.exports = window.Text;
});
//多行文本框
define("form/component/textarea", ["form/editablecomponent","form/tplutil"],
		function(p,s,u){
	var h=p("form/editablecomponent"),
	e=p("form/tplutil");
	window.TextArea = h.extend({
		initialize:function(d){
			h.prototype.initialize.call(this, d);
			var c = {
				componentKey: "TextArea",
				title: "多行文本框"
            };
			null != d && (c.title = d.title);
			this.componentSetup = $.extend(this.componentSetup, c);
			this.tpl = e.get("textarea");
		},
        renderPreview:function(d, c, a, w){
        	var f = $(this.tpl).siblings("#form_textarea");
        	h.prototype.renderPreview.call(this, d, c, a, f);
            this.componentSetup.questionAnswers && this.componentSetup.questionAnswers[0] && f.find(".text_control").val(this.componentSetup.questionAnswers[0].questionAnswer);//慢病自助建档答案

            w&&w[this.componentSetup.fieldId]&&f.find(".text_control").val(w[this.componentSetup.fieldId].questionAnswer);
            f.find(".text_control").addClass(this.componentSetup.size);
        	"true" != this.componentSetup.isDefault && 1 !=this.componentSetup.isDefault ||f.find(".field_value_js").text(this.componentSetup.content);
        	"true" != this.componentSetup.isDefault && 1 !=this.componentSetup.isDefault||"true" != this.componentSetup.isReadOnly && 1 !=this.componentSetup.isReadOnly||(f.addClass("fieldReadOnly"),f.find(".field_value_js").attr("disabled","disabled"));
        	a&&f.find(".text_control").attr("disabled","disabled");
        	d.append(f);
        },
        checkEvents:function(e){},
        submitCheck: function(e) {
            var v=e.val();
            if(("true" == this.componentSetup.required || 1 ==this.componentSetup.required)&&$.trim(v)==""){
                return 9;
            }
            return 0;
        },
        getValue: function(d) {
            var c = $.trim(d.val());
            var f = {
                questionAnswer: c,
                questionId: this.componentSetup.fieldId,
                questionType: 14,
                quoteQuestionId: this.componentSetup.quoteQuestionId
            };
            return f;
        },
        getPCValue: function(d) {
            var c = $.trim(d.val());
            var f = {
                fieldId2: this.componentSetup.fieldId2,
                fieldName: this.componentSetup.fieldName,
                componentKey: this.componentSetup.componentKey,
                questionId: this.componentSetup.fieldId,
                quoteQuestionId: this.componentSetup.quoteQuestionId,
                questionAnswers: [{
                    questionId: "",
                    questionAnswer: c,
                    content: "",
                    quoteQuestionAnswer: ""
                }]
            };
            return f;
        }
	});
	u.exports = window.TextArea;
});
//单选框
define("form/component/radiobox", ["form/editablecomponent","form/tplutil","form/component/option"],
		function(p,s,u){
	var h=p("form/editablecomponent"),
	e=p("form/tplutil"),
	d = p("form/component/option");
	window.RadioBox = h.extend({
		initialize:function(c){
			h.prototype.initialize.call(this, c);
			var a = {
				componentKey: "RadioBox",
				title: "单选框",
                layout: "choicelist_inline",
                options: []
            };
			null != c && (a.title = c.title, a.layout = c.layout, a.options = c.options);
			this.componentSetup = $.extend(this.componentSetup, a);
			if (!this.componentSetup.options || 0 == this.componentSetup.options.length) {
                c = new d;
                c.setName("选项1");
                c.setOrder(0);
                a = new d;
                a.setName("选项2");
                a.setOrder(1);
                var f = new d;
                f.setName("选项3");
                f.setOrder(2);
                this.componentSetup.options = [];
                this.componentSetup.options[0] = c.componentSetup;
                this.componentSetup.options[1] = a.componentSetup;
                this.componentSetup.options[2] = f.componentSetup;
            }
			this.tpl = e.get("radiobox");
		},
        setLayout: function(c){
            this.componentSetup.layout = c;
        },
        setOptions: function(c) {
            this.componentSetup.options = c;
        },
        renderPreview:function(c, a, f, w){
        	var b = $(this.tpl).siblings("#form_radiobox"),
        		g = b.find(".choicelist_js");
        	g.addClass(this.componentSetup.layout);
        	for (var k = 0; k < this.componentSetup.options.length; k++){
        		(new d(this.componentSetup.options[k])).renderPreview(g, this, w);
        	}
            h.prototype.renderPreview.call(this, c, a, f, b);
            if(this.componentSetup.questionAnswers&&this.componentSetup.questionAnswers[0]){
                var q=g.find("input:radio[id='"+this.componentSetup.questionAnswers[0].questionAnswer+"']");
                q.attr("checked", true);
                q.parent().next(".input_otherchoice").length>0&&(q.parent().next(".input_otherchoice").removeClass("hide"),
                    q.parent().next(".input_otherchoice").val(this.componentSetup.questionAnswers[0].content).attr("title",this.componentSetup.questionAnswers[0].content));
            }
            c.append(b);
            f&&c.find("input").attr("disabled","disabled");
            b.find("input:radio").iCheck({
        	    radioClass: 'iradio_square-blue',
        	    increaseArea: '20%'
            });
        },
        checkEvents:function(e){},
        submitCheck: function(e) {
            var b = e.find("input:radio[name='" + this.cid + "']:checked"),
                c = $.trim(b.val());
            if(("true" == this.componentSetup.required || 1 ==this.componentSetup.required)&&c==""){
                return 9;
            }
            var text=b.parents("li").find("input:text"),
                t=$.trim(text.val());
            b = b.parents("li").find(".option_title").data("componentData");
            if(b && ("true" == b.componentSetup.required || 1 ==b.componentSetup.required) &&
                ("true" == b.componentSetup.other || 1 == b.componentSetup.other) && t==""){
                formPlugin.alert('其他选项内容不能为空！');
                text.focus();
                return 1;
            }
            return 0;
        },
        getValue: function(d) {
            var b = d.find("input:radio[name='" + this.cid + "']:checked"),
                c = $.trim(b.val());
            b = b.parents("li").find(".option_title").data("componentData");
            var k = "",
            	quoteQuestionAnswer = "",
                isError = "";
            b && (quoteQuestionAnswer = b.componentSetup.quoteOptionId,isError = b.componentSetup.isError,
            ("true" == b.componentSetup.other || 1 == b.componentSetup.other) && (k = d.find("input:radio[name='" + this.cid + "']:checked").closest("li").find("input:text").val()));
            var f = {
                questionAnswer: c,
                questionId: this.componentSetup.fieldId,
                content: k,
                except: isError,
                questionType: 2,
                quoteQuestionId: this.componentSetup.quoteQuestionId,
                quoteQuestionAnswer: quoteQuestionAnswer
            };
            return f;
        },
        getPCValue: function(d) {
            var b = d.find("input:radio[name='" + this.cid + "']:checked"),
                c = $.trim(b.val());
            b = b.data("componentData");
            var k = "",
                quoteQuestionAnswer = "",
                isError = "";
            b && (quoteQuestionAnswer = b.componentSetup.quoteOptionId,isError = b.componentSetup.isError,
            ("true" == b.componentSetup.other || 1 == b.componentSetup.other) && (k = d.find("input:radio[name='" + this.cid + "']:checked").parent().next("input:text").val()));
            var f = {
                componentKey: this.componentSetup.componentKey,
                questionId: this.componentSetup.fieldId,
                quoteQuestionId: this.componentSetup.quoteQuestionId,
                questionAnswers: [{
                    questionId: "",
                    questionAnswer: c,
                    content: k,
                    except: isError,
                    quoteQuestionAnswer: quoteQuestionAnswer
                }]
            };
            return f;
        }
	});
	u.exports = window.RadioBox;
});
//多选框
define("form/component/checkbox", ["form/editablecomponent","form/tplutil","form/component/option"],
		function(p,s,u){
	var h=p("form/editablecomponent"),
	e=p("form/tplutil"),
	d = p("form/component/option");
	window.CheckBox = h.extend({
		initialize:function(c){
			h.prototype.initialize.call(this, c);
			var a = {
				componentKey: "CheckBox",
				title: "多选框",
                layout: "choicelist_inline",
                options: []
            };
			null != c && (a.title = c.title, a.layout = c.layout, a.options = c.options);
			this.componentSetup = $.extend(this.componentSetup, a);
			if (!this.componentSetup.options || 0 == this.componentSetup.options.length) {
                c = new d;
                c.setName("选项1");
                c.setOrder(0);
                a = new d;
                a.setName("选项2");
                a.setOrder(1);
                var f = new d;
                f.setName("选项3");
                f.setOrder(2);
                this.componentSetup.options = [];
                this.componentSetup.options[0] = c.componentSetup;
                this.componentSetup.options[1] = a.componentSetup;
                this.componentSetup.options[2] = f.componentSetup;
            }
			this.tpl = e.get("checkbox");
		},
        setLayout: function(c){
            this.componentSetup.layout = c;
        },
        setOptions: function(c) {
            this.componentSetup.options = c;
        },
        renderPreview:function(c, a, f, w){
        	var b = $(this.tpl).siblings("#form_checkbox"),
        		g = b.find(".choicelist_js");
        	g.addClass(this.componentSetup.layout);
        	for (var k = 0; k < this.componentSetup.options.length; k++){
        		(new d(this.componentSetup.options[k])).renderPreview(g, this, w);
        	}
            h.prototype.renderPreview.call(this, c, a, f, b);
            c.append(b);
            f&&c.find("input").attr("disabled","disabled");
            b.find("input:checkbox").iCheck({
        	    checkboxClass: 'icheckbox_square-blue',
        	    increaseArea: '20%'
            });
        },
        checkEvents:function(e){},
        submitCheck: function(e) {
            var b = "";//e.find("input:checkbox[name='" + this.cid + "']:checked");
            var c="";
            var s=true;
            e.find("input:checkbox[name='" + this.cid + "']:checked").each(function(){
                b = $(this).parents("li").find(".option_title").data("componentData");
                c += ","+$(this).val();
                var t=$.trim($(this).parents("li").find("input:text").val());
                if(b && ("true" == b.componentSetup.required || 1 ==b.componentSetup.required) &&
                    ("true" == b.componentSetup.other || 1 == b.componentSetup.other) && t==""){
                    formPlugin.alert('其他选项内容不能为空！');
                    $(this).parents("li").find("input:text").focus();
                    s=false;
                    return false;
                }
            });
            if(("true" == this.componentSetup.required || 1 ==this.componentSetup.required)&&c==""){
                return 9;
            }
            if(!s){
                return 1;
            }
            return 0;
        },
        getValue: function(d) {
            var f=[];
            var _this=this;
            d.find("input:checkbox[name='" + this.cid + "']:checked").each(function(b){
            	f.push({
                    questionAnswer: $(this).val(),
                    questionId: _this.componentSetup.fieldId,
                    content: $.trim($(this).closest("li").find("input:text").val()),
                    except: $(this).parents("li").find(".option_title").data("componentData").componentSetup.isError,
                    questionType: 3,
                    quoteQuestionId: _this.componentSetup.quoteQuestionId,
                    quoteQuestionAnswer: $(this).parents("li").find(".option_title").data("componentData").componentSetup.quoteOptionId
                });
            });
            return f;
        },
        getPCValue: function(d) {
            var f = {
                componentKey: this.componentSetup.componentKey,
                questionId: this.componentSetup.fieldId,
                quoteQuestionId: this.componentSetup.quoteQuestionId,
                questionAnswers:[]
            };
            d.find("input:checkbox[name='" + this.cid + "']:checked").each(function(b){
                f.questionAnswers[b]={
                    questionId: "",
                    questionAnswer: $(this).val(),
                    content: $.trim($(this).closest("li").find("input:text").val()),
                    except: $(this).data("componentData").componentSetup.isError,
                    quoteQuestionAnswer: $(this).data("componentData").componentSetup.quoteOptionId
                };
            });
            return f;
        }
	});
	u.exports = window.CheckBox;
});
//图文选择框(单选)
define("form/component/imageradiobox", ["form/editablecomponent","form/tplutil","form/component/option"],
		function(p,s,u){
	var h=p("form/editablecomponent"),
	e=p("form/tplutil"),
	d = p("form/component/option");
	window.ImageRadioBox = h.extend({
		initialize:function(c){
			h.prototype.initialize.call(this, c);
			var a = {
				componentKey: "ImageRadioBox",
				title: "图文选择框",
				formId: "",
                layout: "choicelist_inline",
                options: []
            };
			null != c && (a.title = c.title, a.layout = c.layout, a.formId = c.formId, a.options = c.options);
			this.componentSetup = $.extend(this.componentSetup, a);
			this.tpl = e.get("imageradiobox");
		},
        setLayout: function(c){
            this.componentSetup.layout = c;
        },
        setOptions: function(c) {
            this.componentSetup.options = c;
        },
        renderPreview:function(c, a, f,w){
        	var b = $(this.tpl).siblings("#form_imageradiobox"),
        		g = b.find(".choicelist_js");
        	g.addClass(this.componentSetup.layout);
            for (var k = 0; k < this.componentSetup.options.length; k++){
                (new d(this.componentSetup.options[k])).renderPreview(g,this,w);
            }
            h.prototype.renderPreview.call(this, c, a, f, b);
            if(this.componentSetup.questionAnswers&&this.componentSetup.questionAnswers[0]){
                var q=g.find("input:radio[id='"+this.componentSetup.questionAnswers[0].questionAnswer+"']");
                q.attr("checked", true);
            }
            c.append(b);
            f&&c.find("input").attr("disabled","disabled");
            b.find("input:radio").iCheck({
                radioClass: 'iradio_square-blue',
                increaseArea: '20%'
            });
        },
        checkEvents:function(e){},
        submitCheck: function(e) {
            var b = e.find("input:radio[name='" + this.cid + "']:checked"),
                c = $.trim(b.val());
            if(("true" == this.componentSetup.required || 1 ==this.componentSetup.required)&&c==""){
                return 9;
            }
            return 0;
        },
        getValue: function(d) {
            var b = d.find("input:radio[name='" + this.cid + "']:checked"),
                c = $.trim(b.val());
            b = b.parents("li").find(".option_title").data("componentData");
            var quoteQuestionAnswer = "",
                isError = "";
            b && (quoteQuestionAnswer = b.componentSetup.quoteOptionId,isError = b.componentSetup.isError);
            var f = {
                questionAnswer: c,
                questionId: this.componentSetup.fieldId,
                except: isError,
                questionType: 9,
                quoteQuestionId: this.componentSetup.quoteQuestionId,
                quoteQuestionAnswer: quoteQuestionAnswer
            };
            return f;
        },
        getPCValue: function(d) {
            var b = d.find("input:radio[name='" + this.cid + "']:checked"),
                c = $.trim(b.val());
            b = b.data("componentData");
            var k = "",
                quoteQuestionAnswer = "",
                isError = "";
            b && (quoteQuestionAnswer = b.componentSetup.quoteOptionId,isError = b.componentSetup.isError,
            ("true" == b.componentSetup.other || 1 == b.componentSetup.other) && (k = d.find("input:radio[name='" + this.cid + "']:checked").parent().next("input:text").val()));

            var f = {
                componentKey: this.componentSetup.componentKey,
                questionId: this.componentSetup.fieldId,
                quoteQuestionId: this.componentSetup.quoteQuestionId,
                questionAnswers: [{
                    questionId: "",
                    questionAnswer: c,
                    content: "",
                    except: isError,
                    quoteQuestionAnswer: quoteQuestionAnswer
                }]
            };
            return f;
        }
	});
	u.exports = window.ImageRadioBox;
});
//图文选择框(多选)
define("form/component/imagecheckbox", ["form/editablecomponent","form/tplutil","form/component/option"],
		function(p,s,u){
	var h=p("form/editablecomponent"),
	e=p("form/tplutil"),
	d = p("form/component/option");
	window.ImageCheckBox = h.extend({
		initialize:function(c){
			h.prototype.initialize.call(this, c);
			var a = {
				componentKey: "ImageCheckBox",
				title: "图文选择框",
				formId: "",
                layout: "choicelist_inline",
                options: []
            };
			null != c && (a.title = c.title, a.layout = c.layout, a.formId = c.formId, a.options = c.options);
			this.componentSetup = $.extend(this.componentSetup, a);
			this.tpl = e.get("imagecheckbox");
		},
        setLayout: function(c){
            this.componentSetup.layout = c;
        },
        setOptions: function(c) {
            this.componentSetup.options = c;
        },
        renderPreview:function(c, a, f,w){
        	var b = $(this.tpl).siblings("#form_imagecheckbox"),
        		g = b.find(".choicelist_js");
        	g.addClass(this.componentSetup.layout);
            for (var k = 0; k < this.componentSetup.options.length; k++){
                (new d(this.componentSetup.options[k])).renderPreview(g, this,w);
            }
            h.prototype.renderPreview.call(this, c, a, f, b);
            c.append(b);
            f&&c.find("input").attr("disabled","disabled");
            b.find("input:checkbox").iCheck({
                checkboxClass: 'icheckbox_square-blue',
                increaseArea: '20%'
            });
        },
        checkEvents:function(e){},
        submitCheck: function(e) {
          //  var b = "";//e.find("input:checkbox[name='" + this.cid + "']:checked");
            var c="";
          //  var s=true;
            e.find("input:checkbox[name='" + this.cid + "']:checked").each(function(){
                b = $(this).parents("li").find(".option_title").data("componentData");
                c += ","+$(this).val();
                var t=$.trim($(this).parents("li").find("input:text").val());
              /*  if(b && ("true" == b.componentSetup.required || 1 ==b.componentSetup.required) &&
                    ("true" == b.componentSetup.other || 1 == b.componentSetup.other) && t==""){
                    formPlugin.alert('其他选项内容不能为空！');
                    $(this).parents("li").find("input:text").focus();
                    s=false;
                    return false;
                }*/
            });
            if(("true" == this.componentSetup.required || 1 ==this.componentSetup.required)&&c==""){
                return 9;
            }
          /*  if(!s){
                return 1;
            }*/
            return 0;
        },
        getValue: function(d) {
            var f=[];
            var _this=this;
            d.find("input:checkbox[name='" + this.cid + "']:checked").each(function(b){
                f.push({
                    questionAnswer: $(this).val(),
                    questionId: _this.componentSetup.fieldId,
                    except: $(this).parents("li").find(".option_title").data("componentData").componentSetup.isError,
                    questionType: 15,
                    quoteQuestionId: _this.componentSetup.quoteQuestionId,
                    quoteQuestionAnswer: $(this).parents("li").find(".option_title").data("componentData").componentSetup.quoteOptionId
                });
            });
            return f;
        },
        getPCValue: function(d) {
            var f = {
                componentKey: this.componentSetup.componentKey,
                questionId: this.componentSetup.fieldId,
                quoteQuestionId: this.componentSetup.quoteQuestionId,
                questionAnswers:[]
            };
            d.find("input:checkbox[name='" + this.cid + "']:checked").each(function(b){
                f.questionAnswers[b]={
                    questionId: "",
                    questionAnswer: $(this).val(),
                    content: "",
                    except: $(this).data("componentData").componentSetup.isError,
                    quoteQuestionAnswer: $(this).data("componentData").componentSetup.quoteOptionId
                };
            });
            return f;
        }
	});
	u.exports = window.ImageCheckBox;
});
//矩阵评级框
define("form/component/matrixraty", ["form/editablecomponent","form/tplutil","form/component/option","form/component/secondOption"],
		function(p,s,u){
	var h=p("form/editablecomponent"),
	e=p("form/tplutil"),
	d = p("form/component/option"),
	x= p("form/component/secondOption");
	window.MatrixRaty = h.extend({
		initialize:function(c){
			h.prototype.initialize.call(this, c);
			var a = {
				componentKey: "MatrixRaty",
				title: "矩阵评级框",
                layout: "",
                options: []
            };
			null != c && (a.title = c.title, a.layout = c.layout, a.options = c.options);
			this.componentSetup = $.extend(this.componentSetup, a);
			if (!this.componentSetup.options || 0 == this.componentSetup.options.length) {
                c = new d;
                c.setName("选项1");
                c.setOrder(0);
                //第二层选项-不用new一个，不然引用的怎么改都会变成一样的
                var s_a=new x;
                s_a.setComponentKey("MatrixRatyStar");
                var s_b=new x;
                s_b.setComponentKey("MatrixRatyStar");
                var s_c=new x;
                s_c.setComponentKey("MatrixRatyStar");
                var s_d=new x;
                s_d.setComponentKey("MatrixRatyStar");
                var s_e=new x;
                s_e.setComponentKey("MatrixRatyStar");
                c.setChildren([s_a.componentSetup,s_b.componentSetup,s_c.componentSetup,s_d.componentSetup,s_e.componentSetup]);
                this.componentSetup.options = [];
                this.componentSetup.options[0] = c.componentSetup;
            }
			this.tpl = e.get("matrixraty");
		},
        setOptions: function(c) {
            this.componentSetup.options = c;
        },
        renderPreview:function(c, a, f, w){
        	var b = $(this.tpl).siblings("#form_matrixraty"),
        		g = b.find(".choicelist_js");
        	g.addClass(this.componentSetup.layout);
        	for (var k = 0; k < this.componentSetup.options.length; k++){
        		(new d(this.componentSetup.options[k])).renderPreview(g, this, w);
        	}
            h.prototype.renderPreview.call(this, c, a, f, b);
            c.append(b);
        },
        checkEvents:function(e){},
        submitCheck: function(e) {
            var r = e.find(".raty_star_checked").size(),
                l = e.find("li").size();
            if(("true" == this.componentSetup.required || 1 ==this.componentSetup.required)&&r!=l){
                return 9;
            }
            return 0;
        },
        getValue: function(d) {
            var f=[];
            d.find(".raty_star_checked").each(function(b){
                f.push({
                	questionAnswer: $(this).attr("id"),
                    questionId: $(this).attr("fieldId"),
                    questionType: 5,
                    except: $(this).attr("isError"),
                    quoteQuestionId: $(this).attr("quoteQuestionId"),
                    quoteQuestionAnswer: $(this).attr("quoteOptionId")
                });
            });
            return f;
        },
        getPCValue: function(d) {
            var f = {
                componentKey: this.componentSetup.componentKey,
                questionId: this.componentSetup.fieldId,
                quoteQuestionId: this.componentSetup.quoteQuestionId,
                questionAnswers:[]
            };
            d.find(".raty_star_checked").each(function(b){
                f.questionAnswers[b]={
                    questionId: $(this).attr("fieldId"),
                    questionAnswer: $(this).attr("id"),
                    content: "",
                    except: $(this).attr("isError"),
                    quoteQuestionId: $.trim($(this).attr("quoteQuestionId")),
                    quoteQuestionAnswer: $.trim($(this).attr("quoteOptionId"))
                };
            });
            return f;
        }
	});
	u.exports = window.MatrixRaty;
});
//图片
define("form/component/imagecomponent", ["form/editablecomponent","form/tplutil"],
		function(p,s,u){
	var h=p("form/editablecomponent"),
	e=p("form/tplutil");
	window.ImageComponent = h.extend({
		initialize:function(d){
			h.prototype.initialize.call(this, d);
			var c = {
				componentKey: "ImageComponent",
				title: "图片",
                isSingle: !1
            };
			null != d && (c.title = d.title, c.isSingle = d.isSingle);
			this.componentSetup = $.extend(this.componentSetup, c);
			this.tpl = e.get("imagecomponent");
		},
		setIsSingle: function(c) {
            this.componentSetup.isSingle = c;
        },
        renderPreview:function(c, a, f,w){
        	var b = $(this.tpl).siblings("#form_imagecomponent");
            h.prototype.renderPreview.call(this, c, a, f, b);
            b.find(".form_img_upload .img_add").attr("id","preview_"+this.cid);
            if(this.componentSetup.questionAnswers&&this.componentSetup.questionAnswers[0]){
                for(var i=0;i<this.componentSetup.questionAnswers.length;i++){
                    b.find(".imagescomponentlist_js").append('<li class="image_radiobox"><div class="box"><img src="'+this.componentSetup.questionAnswers[i].questionAnswer+'" id="'+this.componentSetup.questionAnswers[i].questionAnswer+'"></div><div class="design_icon delete_red_circle img_delete"></div></li>');
                }
            }
            if(w&&w[this.componentSetup.fieldId]){
                var questionAnswers=w[this.componentSetup.fieldId].questionAnswer;
                for(var i=0;i<questionAnswers.length;i++){
                    b.find(".imagescomponentlist_js").append('<li class="image_radiobox"><div class="box"><img src="'+questionAnswers[i]+'" id="'+questionAnswers[i]+'"></div><div class="img_delete"></div></li>');
                }
            }
            f&&(b.find(".form_img_upload").remove(),b.find(".image_radiobox .img_delete").remove());
            c.append(b);
        },
        checkEvents:function(e,r){
            if(!r){
        	    this.initUploader("preview_"+this.cid);
            }
        },
        initUploader:function(a){
            var ul=$("#"+a).parents("ul"),
                isSingle="true" == this.componentSetup.isSingle || 1 ==this.componentSetup.isSingle;
            var uploader = WebUploader.create({
                auto: true,
                swf: '/web-bin/resources/webuploader/Uploader.swf',
                server: window.location.origin+'/web-bin/m/nosen/followup/form/upload_img',
                pick: {
                    id:'#'+a,
                    multiple:!isSingle,
                },
                accept: {
                    title: 'Images',
                    extensions: 'gif,jpg,jpeg,png',
                    mimeTypes: 'image/*'
                },
                compress:{
                    width: 1600,
                    height: 1600,
                    quality: 90,
                    allowMagnify: false,
                    crop: false,
                    preserveHeaders: true,
                    noCompressIfLarger: false,
                    compressSize: 0
                },
                fileSizeLimit:20*1024*1024,
                duplicate:false
            });
            uploader.on( 'filesQueued', function( file ) {
                if((isSingle&&file.length>1)||(isSingle && ul.find("li").length>0)){
                    formPlugin.alert('此题目仅能上传一张图片！');
                    uploader.removeFile(file,true);
                }
            });
            uploader.on( 'uploadBeforeSend', function( file, percentage ) {
                var $percent = ul.find(".progress_percent");
                if ( !$percent.length ) {
                    ul.append('<div class="progress">图片加载中，请稍后<span class="progress_percent"></span></div>');
                }
            });
            uploader.on( 'uploadComplete', function( file ) {
                ul.find('.progress').remove();
            });
            uploader.on( 'uploadSuccess', function(file,response) {
                if (response.res==0) {
                    ul.append('<li class="image_radiobox"><div class="box"><img src="'+response.data[0]+'" id="'+response.data[0]+'" width="100%" height="100%"></div><div class="img_delete"></div></li>');
                }else {
                    formPlugin.alert(response.msg);
                    uploader.removeFile(file,true);
                }
            });
            uploader.on( 'uploadError', function( file,reason ) {
                formPlugin.alert("图片上传失败");
                uploader.removeFile(file,true);
            });
            $(document).on("click",".img_delete",function () {
                $(this).parents(".image_radiobox").remove();
                uploader.reset();
            });
        },
        submitCheck: function(e) {
            var d = e.find(".image_radiobox").length;
            if(("true" == this.componentSetup.required || 1 ==this.componentSetup.required) && d<1){
                return 9;
            }
            return 0;
        },
        getValue: function(d) {
            var f=[];
            var _this=this;
            d.find(".image_radiobox img").each(function(b){
                f.push({
                    questionAnswer: $(this).attr("id"),
                    questionId: _this.componentSetup.fieldId,
                    questionType: 13,
                });
            });
            return f;
        },
        getPCValue: function(d) {
            var f = {
                componentKey: this.componentSetup.componentKey,
                questionId: this.componentSetup.fieldId,
                questionAnswers:[]
            };
            d.find(".image_radiobox img").each(function(b){
                f.questionAnswers[b]={
                    questionId: "",
                    questionAnswer: $(this).attr("id"),
                    content: ""
                };
            });
            return f;
        }
	});
	u.exports = window.ImageComponent;
});
//评分单选框
define("form/component/scoreradiobox", ["form/editablecomponent","form/tplutil","form/component/option"],
		function(p,s,u){
	var h=p("form/editablecomponent"),
	e=p("form/tplutil"),
	d = p("form/component/option");
	window.ScoreRadioBox = h.extend({
		initialize:function(c){
			h.prototype.initialize.call(this, c);
			var a = {
				componentKey: "ScoreRadioBox",
				title: "评分单选框",
                layout: "choicelist_inline",
                options: []
            };
			null != c && (a.title = c.title, a.layout = c.layout, a.options = c.options);
			this.componentSetup = $.extend(this.componentSetup, a);
			if (!this.componentSetup.options || 0 == this.componentSetup.options.length) {
                c = new d;
                c.setName("选项1");
                c.setOrder(0);
                a = new d;
                a.setName("选项2");
                a.setOrder(1);
                var f = new d;
                f.setName("选项3");
                f.setOrder(2);
                this.componentSetup.options = [];
                this.componentSetup.options[0] = c.componentSetup;
                this.componentSetup.options[1] = a.componentSetup;
                this.componentSetup.options[2] = f.componentSetup;
            }
			this.tpl = e.get("scoreradiobox");
		},
        setLayout: function(c){
            this.componentSetup.layout = c;
        },
        setOptions: function(c) {
            this.componentSetup.options = c;
        },
        getScoreTable: function(){
            return e.get("scoretable");
        },
        renderPreview:function(c, a, f, w){
        	var b = $(this.tpl).siblings("#form_scoreradiobox"),
        		g = b.find(".choicelist_js");
        	g.addClass(this.componentSetup.layout);
        	for (var k = 0; k < this.componentSetup.options.length; k++){
        		(new d(this.componentSetup.options[k])).renderPreview(g, this, w);
        	}
            h.prototype.renderPreview.call(this, c, a, f, b);
            if(this.componentSetup.questionAnswers&&this.componentSetup.questionAnswers[0]){
                var q=g.find("input:radio[id='"+this.componentSetup.questionAnswers[0].questionAnswer+"']");
                q.attr("checked", true);
                q.parent().next(".input_otherchoice").length>0&&(q.parent().next(".input_otherchoice").removeClass("hide"),
                    q.parent().next(".input_otherchoice").val(this.componentSetup.questionAnswers[0].content).attr("title",this.componentSetup.questionAnswers[0].content));
            }
            c.append(b);
            f&&c.find("input").attr("disabled","disabled");
            b.find("input:radio").iCheck({
        	    radioClass: 'iradio_square-blue',
        	    increaseArea: '20%'
            });
        },
        checkEvents:function(e){},
        submitCheck: function(e) {
            var b = e.find("input:radio[name='" + this.cid + "']:checked"),
                c = $.trim(b.val());
            if(("true" == this.componentSetup.required || 1 ==this.componentSetup.required)&&c==""){
                return 9;
            }
            var text=b.parents("li").find("input:text"),
                t=$.trim(text.val());
            b = b.parents("li").find(".option_title").data("componentData");
            if(b && ("true" == b.componentSetup.required || 1 ==b.componentSetup.required) &&
                ("true" == b.componentSetup.other || 1 == b.componentSetup.other) && t==""){
                formPlugin.alert('其他选项内容不能为空！');
                text.focus();
                return 1;
            }
            return 0;
        },
        getValue: function(d) {
            var b = d.find("input:radio[name='" + this.cid + "']:checked"),
                c = $.trim(b.val());
            b = b.parents("li").find(".option_title").data("componentData");
            var k = "",
                quoteQuestionAnswer = "",
                isError = "";
            b && (quoteQuestionAnswer = b.componentSetup.quoteOptionId,isError = b.componentSetup.isError,
            ("true" == b.componentSetup.other || 1 == b.componentSetup.other) && (k = d.find("input:radio[name='" + this.cid + "']:checked").closest("li").find("input:text").val()));
            var f = {
                questionAnswer: c,
                questionId: this.componentSetup.fieldId,
                content: k,
                except: isError,
                questionType: 6,
                quoteQuestionId: this.componentSetup.quoteQuestionId,
                quoteQuestionAnswer: quoteQuestionAnswer
            };
            return f;
        },
        getPCValue: function(d) {
            var b = d.find("input:radio[name='" + this.cid + "']:checked"),
                c = $.trim(b.val());
            b = b.data("componentData");
            var k = "",
                quoteQuestionAnswer = "",
                isError = "";
            b && (quoteQuestionAnswer = b.componentSetup.quoteOptionId,isError = b.componentSetup.isError,
            ("true" == b.componentSetup.other || 1 == b.componentSetup.other) && (k = d.find("input:radio[name='" + this.cid + "']:checked").parent().next("input:text").val()));
            var f = {
                componentKey: this.componentSetup.componentKey,
                questionId: this.componentSetup.fieldId,
                quoteQuestionId: this.componentSetup.quoteQuestionId,
                questionAnswers: [{
                    questionId: "",
                    questionAnswer: c,
                    content: k,
                    except: isError,
                    quoteQuestionAnswer: quoteQuestionAnswer
                }]
            };
            return f;
        }
	});
	u.exports = window.ScoreRadioBox;
});
//下拉菜单
define("form/component/select", ["form/editablecomponent","form/tplutil","form/component/option"],
		function(p,s,u){
	var h=p("form/editablecomponent"),
	e=p("form/tplutil"),
	d = p("form/component/option");
	window.Select = h.extend({
		initialize:function(c){
			h.prototype.initialize.call(this, c);
			var a = {
				componentKey: "Select",
				title: "下拉菜单",
                layout: "",
                options: []
            };
			null != c && (a.title = c.title, a.layout = c.layout, a.options = c.options);
			this.componentSetup = $.extend(this.componentSetup, a);
			if (!this.componentSetup.options || 0 == this.componentSetup.options.length) {
                c = new d;
                c.setName("选项1");
                c.setOrder(0);
                a = new d;
                a.setName("选项2");
                a.setOrder(1);
                var f = new d;
                f.setName("选项3");
                f.setOrder(2);
                this.componentSetup.options = [];
                this.componentSetup.options[0] = c.componentSetup;
                this.componentSetup.options[1] = a.componentSetup;
                this.componentSetup.options[2] = f.componentSetup;
            }
			this.tpl = e.get("select");
		},
        setLayout: function(c){
            this.componentSetup.layout = c;
        },
        setOptions: function(c) {
            this.componentSetup.options = c;
        },
        renderPreview:function(c, a, f, w){
        	var b = $(this.tpl).siblings("#form_select"),
        		g = b.find("select").attr("disabled",false).addClass("preview_chosen_select_deselect");
        	g.html("<option value=''>请选择</option>");
        	for (var k = 0; k < this.componentSetup.options.length; k++){
        		(new d(this.componentSetup.options[k])).renderPreview(g, this);
        	}
            h.prototype.renderPreview.call(this, c, a, f, b);
            this.componentSetup.questionAnswers&&this.componentSetup.questionAnswers[0] && g.val(this.componentSetup.questionAnswers[0].questionAnswer);
            w&&w[this.componentSetup.fieldId]&&g.val(w[this.componentSetup.fieldId].questionAnswer);
            f&&g.attr("disabled","disabled");
            c.append(b);
        },
        checkEvents:function(e){},
        submitCheck: function(e) {
            var c = $.trim(e.val());
            if(("true" == this.componentSetup.required || 1 ==this.componentSetup.required)&&c==""){
                return 9;
            }
            return 0;
        },
        getValue: function(d) {
            var c = $.trim(d.val());
            var f = {
	            questionAnswer: c,
	            questionId: this.componentSetup.fieldId,
	            questionType: 10
	        };
            return f;
        },
        getPCValue: function(d) {
            var c = $.trim(d.val());
            var f = {
                componentKey: this.componentSetup.componentKey,
                questionId: this.componentSetup.fieldId,
                questionAnswers: [{
                    questionId: "",
                    questionAnswer: c,
                    content: ""
                }]
            };
            return f;
        }
	});
	u.exports = window.Select;
});
//日期
define("form/component/datecomponent", ["form/editablecomponent","form/tplutil"],
		function(p,s,u){
	var h=p("form/editablecomponent"),
	e=p("form/tplutil");
	window.DateComponent = h.extend({
		initialize:function(d){
			h.prototype.initialize.call(this, d);
			var c = {
				componentKey: "DateComponent",
				title: "日期",
				format: "YYYY-MM-DD",
                isSystemDate: !1
            };
			null != d && (c.title = d.title, c.format = d.format, c.isSystemDate = d.isSystemDate);
			this.componentSetup = $.extend(this.componentSetup, c);
			this.tpl = e.get("datecomponent");
		},
        setFormat: function(c) {
            this.componentSetup.format = c;
        },
        setIsSystemDate: function(c) {
            this.componentSetup.isSystemDate = c;
        },
        renderPreview:function(c, a, f, w){
        	var b = $(this.tpl).siblings("#form_datecomponent");
            h.prototype.renderPreview.call(this, c, a, f, b);
            this.componentSetup.questionAnswers&&this.componentSetup.questionAnswers[0] && b.find(".text_control").val(this.componentSetup.questionAnswers[0].questionAnswer);
            w&&w[this.componentSetup.fieldId]&&b.find(".text_control").val(w[this.componentSetup.fieldId].questionAnswer);
            b.find(".text_control").addClass(this.componentSetup.size).attr("id", "preview_"+this.cid);
            var dateFormat="yyyy-mm-dd";
            var dateOrder="yyyymmdd";
            var dateType="date";
            if(this.componentSetup.format=="YYYY-MM-DD hh:mm"){
            	b.find(".field_value_js").attr("placeholder","年-月-日  时:分").attr("readonly","readonly");
            	dateType="datetime";
            }else if(this.componentSetup.format=="YYYY-MM-DD"){
            	b.find(".field_value_js").attr("placeholder","年-月-日").attr("readonly","readonly");
            }else if(this.componentSetup.format=="YYYY-MM"){
            	b.find(".field_value_js").attr("placeholder","年-月").attr("readonly","readonly");
            	dateFormat="yyyy-mm";
            	dateOrder="yyyymm";
            }
            "true" != this.componentSetup.isSystemDate && 1 !=this.componentSetup.isSystemDate||b.find(".field_value_js").attr("value",new Date().format(this.componentSetup.format));
            "true" != this.componentSetup.isSystemDate && 1 !=this.componentSetup.isSystemDate||"true" != this.componentSetup.isReadOnly && 1 !=this.componentSetup.isReadOnly||b.find(".field_value_js").attr("disabled","disabled");
            c.append(b);
            if(!f){
	            //时间插件加载
	            var currYear = (new Date()).getFullYear();
				var opt={};
				opt.date = {preset : dateType};
				opt.default1 = {
					theme: 'android-ics light', //皮肤样式
			        display: 'modal', //显示方式 
			        mode: 'scroller', //日期选择模式
			        dateFormat: dateFormat,
			        dateOrder:dateOrder,
					lang: 'zh',
					showNow: true,
					nowText: "今天",
			        startYear: currYear - 80, //开始年份
			        endYear: currYear+4  //结束年份
				};
				b.find(".field_value_js").mobiscroll($.extend(opt['date'], opt['default1']));
            }else{
            	b.find(".text_control").attr("disabled","disabled");
            }
        },
        checkEvents:function(e,r,m){},
        submitCheck: function(e) {
            var v=e.val();
            if(("true" == this.componentSetup.required || 1 ==this.componentSetup.required)&&$.trim(v)==""){
                return 9;
            }
            return 0;
        },
        getValue: function(d) {
            var c = $.trim(d.val());
            var f = {
                questionAnswer: c,
                questionId: this.componentSetup.fieldId,
                questionType: 11
            };
            return f;
        },
        getPCValue: function(d) {
            var c = $.trim(d.val());
            var f = {
                fieldId2: this.componentSetup.fieldId2,
                fieldName: this.componentSetup.fieldName,
                componentKey: this.componentSetup.componentKey,
                questionId: this.componentSetup.fieldId,
                questionAnswers: [{
                    questionId: "",
                    questionAnswer: c,
                    content: ""
                }]
            };
            return f;
        }
	});
	u.exports = window.DateComponent;
});
//手机
define("form/component/mobile", ["form/editablecomponent","form/tplutil"],
		function(p,s,u){
	var h=p("form/editablecomponent"),
	e=p("form/tplutil");
	window.Mobile = h.extend({
		initialize:function(d){
			h.prototype.initialize.call(this, d);
			var c = {
				componentKey: "Mobile",
				title: "手机"
            };
			null != d && (c.title = d.title);
			this.componentSetup = $.extend(this.componentSetup, c);
			this.tpl = e.get("mobile");
		},
        renderPreview:function(d, c, a, w){
        	var f = $(this.tpl).siblings("#form_mobile");
        	h.prototype.renderPreview.call(this, d, c, a, f);
            this.componentSetup.questionAnswers&&this.componentSetup.questionAnswers[0] && f.find(".text_control").val(this.componentSetup.questionAnswers[0].questionAnswer);
            w&&w[this.componentSetup.fieldId]&&f.find(".text_control").val(w[this.componentSetup.fieldId].questionAnswer);
        	f.find(".text_control").addClass(this.componentSetup.size).attr("id", "preview_"+this.cid);
        	a&&f.find(".text_control").attr("disabled","disabled");
            d.append(f);
        },
        checkEvents:function(e,r,m){
        	if(!m){
                var isMobile=/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;
                var id="#preview_"+this.cid,
                str="#preview_widget_control "+id,
                required="true" == this.componentSetup.required || 1 ==this.componentSetup.required;
                $(document).on("blur.preview", str,function(b){
                    b=$.trim($(this).val());
                    if(b==""&&required){
                        formPlugin.alert('手机号码不能为空！');
                    }else{
                        if(!isMobile.test(b)&&b!=""){
                            formPlugin.alert('手机格式有误，请输入有效的手机号码！');
                        }
                    }
                });
            }
        },
        submitCheck: function(e) {
            var v=$.trim(e.val());
            var isMobile=/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;
            if(!isMobile.test(v) && v!=""){
            	formPlugin.alert('手机格式有误，请输入有效的手机号码！');
                return 1;
            }
            if(("true" == this.componentSetup.required || 1 ==this.componentSetup.required) && v==""){
                return 9;
            }
            return 0;
        },
        getValue: function(d) {
            var c = $.trim(d.val());
            var f = {
                questionAnswer: c,
                questionId: this.componentSetup.fieldId,
                questionType: 12
            };
            return f;
        },
        getPCValue: function(d) {
            var c = $.trim(d.val());
            var f = {
                fieldId2: this.componentSetup.fieldId2,
                fieldName: this.componentSetup.fieldName,
                componentKey: this.componentSetup.componentKey,
                questionId: this.componentSetup.fieldId,
                questionAnswers: [{
                    questionId: "",
                    questionAnswer: c,
                    content: ""
                }]
            };
            return f;
        }
	});
	u.exports = window.Mobile;
});
//多行多选输入框
define("form/component/multipleTextArea", ["form/editablecomponent","form/tplutil","form/component/option"],
		function(p,s,u){
	var h=p("form/editablecomponent"),
	e=p("form/tplutil"),
	d = p("form/component/option");
	window.MultipleTextArea = h.extend({
		initialize:function(c){
			h.prototype.initialize.call(this, c);
			var a = {
				componentKey: "MultipleTextArea",
				title: "多选输入框",
                layout: "choicelist_inline",
                options: []
            };
			null != c && (a.title = c.title, a.layout = c.layout, a.options = c.options);
			this.componentSetup = $.extend(this.componentSetup, a);
			if (!this.componentSetup.options || 0 == this.componentSetup.options.length) {
                c = new d;
                c.setName("选项1");
                c.setOrder(0);
                a = new d;
                a.setName("选项2");
                a.setOrder(1);
                var f = new d;
                f.setName("选项3");
                f.setOrder(2);
                this.componentSetup.options = [];
                this.componentSetup.options[0] = c.componentSetup;
                this.componentSetup.options[1] = a.componentSetup;
                this.componentSetup.options[2] = f.componentSetup;
            }
			this.tpl = e.get("multipleTextArea");
		},
        setLayout: function(c){
            this.componentSetup.layout = c;
        },
        setOptions: function(c) {
            this.componentSetup.options = c;
        },
        renderPreview:function(c, a, f, w){
        	var b = $(this.tpl).siblings("#form_multipleTextArea"),
        		g = b.find(".choicelist_js");
        	g.addClass(this.componentSetup.layout);
        	for (var k = 0; k < this.componentSetup.options.length; k++){
        		(new d(this.componentSetup.options[k])).renderPreview(g, this, w);
        	}
            h.prototype.renderPreview.call(this, c, a, f, b);
            f&&g.find(".text_control").attr("disabled","disabled");
            c.append(b);
        },
        checkEvents:function(e){},
        submitCheck: function(e) {
            var c=true;
            e.find("textarea").each(function(b){
                b=$.trim($(this).val());
                if(b==""){
                    c=false;
                    return c;
                }
            });
            if(("true" == this.componentSetup.required || 1 ==this.componentSetup.required) && !c){
                return 9;
            }
            return 0;
        },
        getValue: function(d) {
            var f=[];
            d.find("textarea").each(function(b){
                f.push({
            		questionId: $(this).attr("id"),
            		questionAnswer: $.trim($(this).val()),
                    questionType: 8,
                    quoteQuestionId: $(this).attr("quoteQuestionId")
                });
            });
            return f;
        },
        getPCValue: function(d) {
            var f = {
                componentKey: this.componentSetup.componentKey,
                questionId: this.componentSetup.fieldId,
                quoteQuestionId: this.componentSetup.quoteQuestionId,
                questionAnswers:[]
            };
            d.find("textarea").each(function(b){
                f.questionAnswers[b]={
                    questionId: $(this).attr("id"),
                    questionAnswer: $.trim($(this).val()),
                    content: "",
                    quoteQuestionId: $(this).attr("quoteQuestionId"),
                    quoteQuestionAnswer: ""
                };
            });
            return f;
        }
	});
	u.exports = window.MultipleTextArea;
});
//一行几列布局
define("form/component/columnpanel", ["form/component","form/tplutil"],
		function(p,s,u){
	var h=p("form/component"),
	e=p("form/tplutil");
	window.ColumnPanel = h.extend({
		initialize:function(d){
			this.componentSetup = {
	            componentKey: "ColumnPanel",
	            title: "",
	            layoutDetail: [],
	            order: 0,
	            index: 0,
	            size: "1"
	        };
			null != d && (this.componentSetup.title = d.title, this.componentSetup.layoutDetail = d.layoutDetail, this.componentSetup.order = d.order, this.componentSetup.index = d.index, this.componentSetup.size = d.size);
			this.tpl = e.get("columnpanel");
		},
		render: function(d){
			var c = $(this.tpl);
            this.componentSetup.size = d.attr("componentsize");
            c = c.siblings("#layout_columnPanel_" + this.componentSetup.size);
            d.attr("class", c.attr("class"));
            d.html(c.html());
        },
        renderEditor:function(){},
        renderPreview:function(e){
        	if (1 < this.componentSetup.size) {
                var d = $(this.tpl).siblings("#layout_columnPanel_" + this.componentSetup.size);
                d.attr("componentkey",this.componentSetup.componentKey);
                d.find(".form_layout_toolbar").remove();
                d.removeAttr("id");
                e.append(d);
                return d.find(".columns_js").children();
            }
        },
        renderEditPreview: function(e) {
        	if (1 < this.componentSetup.size) {
                var d = $(this.tpl).siblings("#layout_columnPanel_" + this.componentSetup.size);
                d.attr("id", "");
                d.data("componentData", this);
                e.append(d);
                return d.find(".columns_js").children();
            }
        },
        checkEvents: function(e){}
	});
	u.exports = ColumnPanel;
});
//表格布局
define("form/component/tablelayout", ["form/component", "form/tplutil", "form/component/table"],
		function(p, s, u) {
	var h = p("form/component"),
    e = p("form/tplutil");
    p("form/component/table");
    window.TableLayout = h.extend({
		initialize:function(d){
			this.componentSetup = {
                componentKey: "TableLayout",
                layoutDetail: [],
                order: 0,
                index: 0,
                rows: 4,
                cols: 3,
                thArray: [],
                tableId: "",
                fieldReads: [],
                fieldWrites: []
            };
            null != d && (this.componentSetup.title = d.title, this.componentSetup.layoutDetail = d.layoutDetail, this.componentSetup.order = d.order, this.componentSetup.index = d.index, this.componentSetup.rows = d.rows, this.componentSetup.cols = d.cols, this.componentSetup.thArray = d.thArray, this.componentSetup.tableId = d.tableId, this.componentSetup.fieldReads = d.fieldReads, this.componentSetup.fieldWrites = d.fieldWrites);
            this.tpl = e.get("tablelayout");
		},
		render: function(e){
			var d = $(this.tpl).siblings("#table_layout");
            e.attr("class", d.attr("class"));
            e.html(d.html());
            this.table = e.find(".j_table").table({
                rows: this.componentSetup.rows,
                cols: this.componentSetup.cols,
                afterCreateCell: function(c, a) {
                    $(document).trigger("afterCreateCell", {
                        cell: a
                    });
                },
                beforeChangeCell: function(c, a) {
                    return !0;
                },
                afterChangeWidth: function(c, a) {
                	return !0;
                },
                afterDeleteCol: function(c) {
                    0 == c.options.cols && c.$table.closest(".table_layout_js").remove();
                },
                afterDeleteRow: function(c) {
                    0 == c.options.rows && c.$table.closest(".table_layout_js").remove();
                }
            });
        },
        renderEditor:function(){},
        renderPreview: function(e, d, c, a) {
            var f = $(this.tpl),
            b = this.componentSetup.layoutDetail;
            this.isReadOnly = c;
            if ("mobile" != window.systemInfo_form) {
                f = f.siblings("#preview_tablelayout");
                e.append(f);
                var g = this.componentSetup.layoutDetail.length,
                k = $("<div class='table table-bordered'></div>");
                f.find(".j_tablelayout").append(k);
                if (g && 0 < g) for (var r = 0; r < g; r++) k.append($("<div class='tr_class_"+r+"'></div>"));
                if (b && 0 < b.length) for (r = 0; r < b.length; r++) {
                    var g = b[r];
                    // if (g && 0 < g.rowSpan && 0 < g.colSpan) {
                        var n = $("<p></p>"),
                        l = g.coordinate.split("_")[0];
                        k.find(".tr_class_"+r+"").append(n);
                        if (g.layoutDetail && 0 < g.layoutDetail.length) {
                            l = g.layoutDetail[0].componentKey;
                            var l = new window[l](g.layoutDetail[0]),
                            m = c;
                            if (!c && g.layoutDetail[0].fieldId && this.componentSetup.fieldWrites) {
                                var h = this.componentSetup.fieldWrites[g.layoutDetail[0].fieldId];
                                "undefined" == typeof h || h || (m = !0);
                            }
                            l.renderPreview(n, d, m);
                            (g.layoutDetail[0].fieldId && this.componentSetup.fieldReads
                            && (h = this.componentSetup.fieldReads[g.layoutDetail[0].fieldId], "undefined" == typeof h || h || n.find(".field_js").addClass("hide")));
                        }
                        n = n.parent();
                        //"TdLayout" == g.componentKey && 0 == n.find(".field_js").not(".hide").size() ? n.hide() : n.show();//判断到底要不要掩藏空tr
                    // }
                }
                f.attr("id", "");
                f.attr("cid", this.cid);
            }
            this.el = e;
        },
        renderEditPreview: function(e) {
            var d = $(this.tpl).siblings("#table_layout");
            this.table = d.find(".j_table").table({
                rows: this.componentSetup.rows,
                cols: this.componentSetup.cols,
                tdArray: this.componentSetup.layoutDetail,
                thArray: this.componentSetup.thArray,
                afterCreateCell: function(c, a) {
                    $(document).trigger("afterCreateCell", {
                        cell: a
                    });
                },
                beforeChangeCell: function(c, a) {
                    return !0;
                },
                afterCreateBodyTd: function(c, a, f) {
                    f.layoutDetail && 0 < f.layoutDetail.length && (new window[f.layoutDetail[0].componentKey](f.layoutDetail[0])).renderEditPreview(a);
                },
                afterChangeWidth: function(c, a) {
                	return !0;
                },
                afterDeleteCol: function(c) {
                	0 == c.options.cols && c.$table.closest(".table_layout_js").remove();
                },
                afterDeleteRow: function(c) {
                	0 == c.options.rows && c.$table.closest(".table_layout_js").remove();
                }
            });
            d.attr("id", "");
            d.attr("cid", this.cid);
            d.data("componentData", this);
            e.append(d);
        },
        checkEvents: function(e){},
        getTableSerialize: function(e, d) {
            var c = this.table,
            a = c.persist.storage,
            f = c.options,
            b = [],
            g = [];
            if (a && 0 < a.length) for (var k = 0; k < a.length; k++) {
                var r = k,
                n = a[k];
                if (n && 0 < n.length) for (var l = 0; l < n.length; l++) {
                    var m = n[l],
                    h = {
                        coordinate: r + f.separator + l,
                        rowSpan: 0,
                        colSpan: 0,
                        width: null,
                        height: null
                    };
                    if (m) {
                        h.rowSpan = m.rowSpan;
                        h.colSpan = m.colSpan;
                        h.width = $(m).width();
                        l == n.length - 1 && (h.width = $(m).width());
                        h.height = $(m).height();
                        var m = e.assemComponent(d, $(m).find(".field_js")),
                        p = [];
                        null != m && p.push(m.componentSetup);
                        h.componentKey = "TdLayout";
                        h.layoutDetail = p;
                    }
                    b.push(h);
                }
            } (c = c.$table.find("thead th")) && 0 < c.length && c.each(function() {
                g.push($(this).width() + 17);
            });
            this.componentSetup.layoutDetail = b;
            this.componentSetup.rows = f.rows;
            this.componentSetup.cols = f.cols;
            this.componentSetup.thArray = g;
        }
	});
	u.exports = TableLayout;
});