define("form/component/secondOption", ["form/component", "form/tplutil"],
function(p, s, u) {
    s = p("form/component");
    var h = p("form/tplutil");
    window.SecondOption = s.extend({
        initialize: function(e) {
            this.componentSetup = {
                componentKey: "SecondOption",
                order: 0,
                index: 0,
                selectionId: "",
                errorContent:"",
                isError:!1
            };
            null != e && (this.componentSetup.order = e.order, this.componentSetup.index = e.index, this.componentSetup.selectionId = e.selectionId,this.componentSetup.errorContent = e.errorContent,this.componentSetup.isError = e.isError);
            this.tpl = h.get("secondOption");
        },
        setComponentKey:function(e){
        	this.componentSetup.componentKey=e;
        },
        setIndex: function(e) {
            this.componentSetup.index = e;
        },
        setOrder: function(e) {
            this.componentSetup.order = e;
        },
        render: function(e, d) {
            
        },
        renderEditor: function(e, d, c) {
        	var f = $(this.tpl).siblings("#editor_secondOption");
        	f=f.find("." + d + "_js").clone();
            f.find(".secondOptionError_js").attr("value", this.componentSetup.errorContent);
            "true" == this.componentSetup.isError || 1 == this.componentSetup.isError ? 
            		(f.find("input:checkbox[name='error_secondOption']").next().removeClass("sc_unchecked").addClass("sc_checked"),f.find("input:checkbox[name='error_secondOption']").attr("checked", true)):
            		(f.find("input:checkbox[name='error_secondOption']").next().removeClass("sc_checked").addClass("sc_unchecked"),f.find("input:checkbox[name='error_secondOption']").attr("checked", false));
            c ? f.insertAfter(c) : e.append(f);
        },
        renderPreview: function(e, d) {
        	
        }
    });
    u.exports = window.SecondOption;
});