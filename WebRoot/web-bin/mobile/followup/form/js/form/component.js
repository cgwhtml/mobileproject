define("form/component",
function(p, s, u) {
    p = Backbone.View.extend({
        el: "#form",
        componentSetup: {},
        initialize: function(h) {
            this.name = h.name;
            this.componentmodel = null;
        },
        render: function(h) {
            console.error("you need to rewrite the method : render");
        },
        renderEditor: function() {
            console.error("you need to rewrite the method : renderSetUp");
        },
        renderPreview: function(h, e, d) {
            console.error("you need to rewrite the method : renderPreview");
        },
        renderEditPreview: function(h) {
            console.error("you need to rewrite the method : renderEditPreview");
        },
        submitCheck: function(h, e) {
            console.error("you need to rewrite the method : submitCheck");
        },
        checkEvents: function(h) {
            console.error("you need to rewrite the method : checkEvents");
        },
        autoSaveEvents: function() {},
        readOnly: function(h, e) {
            console.error("you need to rewrite the method : readOnly");
        },
        stringify: function(h) {
            return JSON.stringify(h);
        },
        toStringify: function() {
            return null != this.componentSetup ? this.stringify(this.componentSetup) : null;
        },
        toComponent: function(h) {
            if (null == JSON.parse(h).componentKey) return null;
        },
        saveComponentValue: function(h, e) {
            var d = h.closest(".field_js");
            0 < d.length && (e.parentEl = d, formPlugin.saveFieldData(e));
        },
        setComponentModel: function(h) {
            this.componentmodel = h;
        }
    });
    u.exports = p;
});