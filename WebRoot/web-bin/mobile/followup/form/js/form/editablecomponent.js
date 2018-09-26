//控件基础方法，可重写公用
define("form/editablecomponent",["form/component"],
function(p, s, u) {
    p = p("form/component").extend({
    	initialize: function(h) {
            this.componentSetup = {
                titleLayout: "field_hoz",
                order: 0,
                index: 0,
                describe: "",
                required: !1,
                size: "medium",
                jumpProp: "",//是否为子题
                fieldId: "",
                isReadOnly: !1,
                isDefault: !1,
                content: "",
                isHideTitle: !1,
                tempId: "",
                isHideBorder: !1,
                hideForMobile: !1,//题型是否不发送手机端
                alias: "",//标题别名
                textAlign: "text_control_left",//文字位置
                questionAnswers: [],
                quoteQuestionId: "",//引用题型id
                isHideQuestion: !1, //隐藏题目
                notStatistics: !1 ,//不纳入统计
                selfId: ""//前端操作自用id,用于处理逻辑
            };
            null != h && (this.componentSetup.titleLayout = h.titleLayout, this.componentSetup.describe = h.describe, this.componentSetup.order = h.order, this.componentSetup.index = h.index, this.componentSetup.required = h.required, this.componentSetup.size = h.size, this.componentSetup.fieldId = h.fieldId, this.componentSetup.jumpProp = h.jumpProp, this.componentSetup.isReadOnly = h.isReadOnly, this.componentSetup.isDefault = h.isDefault, this.componentSetup.content = h.content, this.componentSetup.isHideTitle = h.isHideTitle, this.componentSetup.isHideBorder=h.isHideBorder, this.componentSetup.hideForMobile = h.hideForMobile, this.componentSetup.alias = h.alias, this.componentSetup.textAlign = h.textAlign, this.componentSetup.questionAnswers = h.questionAnswers, this.componentSetup.quoteQuestionId = h.quoteQuestionId, this.componentSetup.isHideQuestion = h.isHideQuestion, this.componentSetup.notStatistics = h.notStatistics, this.componentSetup.selfId = h.selfId);
        },
        renderPreview:function(h, e, d, c){
        	c.find(".check_js").length>0&&(c.find(".check_js").data("componentData",this),c.find(".check_js").attr("id",this.componentSetup.fieldId));
        	if(this.componentSetup.alias !=null && this.componentSetup.alias !=""){
        		c.find(".widget_title .widget_title_js").text(this.componentSetup.alias);
        	}else{
        		//解决老版本包含标签错乱的问题
            	var $c=$("<p></p>");
            	$c.html(this.componentSetup.title);
        	    c.find(".widget_title .widget_title_js").text($c.text());
        	}
        	c.addClass(this.componentSetup.titleLayout);
        	c.attr("componentkey",this.componentSetup.componentKey);
            c.attr("selfId",this.componentSetup.selfId);
        	c.attr("id", "field_" + (this.componentSetup.fieldId || this.componentSetup.tempId));
        	c.removeAttr("title");
            2 == this.componentSetup.jumpProp && c.addClass("subset_hide");
        	"true" != this.componentSetup.required && 1 !=this.componentSetup.required ||(c.find(".widget_title .widget_required_js").text(" *"),c.addClass("field_required"));
        	"true" != this.componentSetup.isHideTitle && 1 !=this.componentSetup.isHideTitle ||(c.addClass("field_notitle"),c.find(".widget_title .widget_title_js")).addClass("hide");
        	"true" != this.componentSetup.isHideBorder && 1 !=this.componentSetup.isHideBorder ||c.find(".text_control").addClass("nobd");
        },
        setTitle: function(h) {
            this.componentSetup.title = h;
        },
        setTitleLayout: function(h) {
            this.componentSetup.titleLayout = h;
        },
        setRequired: function(h) {
            this.componentSetup.required = h;
        },
        setJumpProp: function(h) {
            this.componentSetup.jumpProp = h;
        },
        setSize: function(h) {
            this.componentSetup.size = h;
        },
        setIsHideTitle: function(h) {
            this.componentSetup.isHideTitle = h;
        },
        setIsDefault: function(h) {
            this.componentSetup.isDefault = h;
        },
        setContent: function(h) {
            this.componentSetup.content = h;
        },
        getContent: function() {
            return this.componentSetup.content;
        },
        setIsReadOnly: function(h) {
            this.componentSetup.isReadOnly = h;
        },
        setIsHideBorder: function(h) {
            this.componentSetup.isHideBorder = h;
        }
    });
    u.exports = p;
});
