(function($){
	$.fn.extend({
		inputer:function(param){
			$(this).each(function(){
				new MyInput(param,$(this));
			});
		}
	});
	var MyInput=function(param,obj){
		this.defaults={
			css:"",
			callback:function(){return false;}
		};
		this.obj=obj;
		$.extend(!0,this.defaults,param);
		this.init();
	};
	MyInput.prototype={
		init:function(){
			this.obj.css(this.defaults.css);
			var html='<div class="csm_input_container">'+this.obj.prop("outerHTML")+'<i class="csm_search_btn"></i></div>';
			this.obj.clone();
			$(html).insertAfter(this.obj);
			this.obj.remove();
			this.bind();
			//var link='<link type="text/css" rel="stylesheet" href="'+$("[src*='inputer.js']").attr("src").replace(/js/g,"css")+'">';
            var link = document.createElement('link');
            link.type='text/css';
            link.rel = 'stylesheet';
            link.href = $("[src*='inputer.js']").attr("src").replace(/js/g,"css");
           	var head=document.getElementsByTagName("head")[0];
            head.insertBefore(link, head.lastChild);
			//$("[href*='inputer.css']").length>0?null:$("head").append($(link));
			$('[t_placeholder]').focus(function() {
		        var input = $(this);
		        if (input.val() == input.attr('t_placeholder')) {
		            input.val('');
		            input.removeClass('t_placeholder');
		            input.css({"color":"#3B3B3B"});
		        }
		    }).blur(function() {
		        var input = $(this);
		        if (input.val() == '' || input.val() == input.attr('t_placeholder')) {
		            input.addClass('t_placeholder');
		            input.val(input.attr('t_placeholder'));
		            input.css({"color":"#999999"});
		        }
		    }).blur();
		},
		bind:function(){
			var _this=this;
			$(document).off("click.inputer").on("click.inputer",".csm_input_container .csm_search_btn",function(){
				_this.defaults.callback();
			});
			$(document).off("keydown.inputer").on("keydown.inputer", ".csm_input_container input[type='text']",function(e){
				if(e.which==13){
					_this.defaults.callback();
				}
	        });
		}
	};
})(jQuery);
