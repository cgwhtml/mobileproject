(function($){
	$.fn.extend({
		viewer:function(){
			return new MyImage($(this));
		}
	});
	function isNumber(n) {
	    return typeof n === 'number' && !isNaN(n);
	}
	var MyImage=function(obj){
		this.defaults={
			minZoomRatio:0.05,
			maxZoomRatio:5
		};
		this.image={
			width:null,
			height:null,
			left:null,
			top:null,
			naturalWidth:null,
			naturalHeight:null,
			ratio:null
		};
		this.template='<div class="viewer_container viewer_fixed"><div class="viewer_canvas"><img src=""/></div><div class="viewer_overlay"></div><div class="viewer_tooltip"></div><div class="viewer_footer"><ul class="viewer_toolbar"><li class="viewer_zoom_in" title="放大图片"></li><li class="viewer_zoom_out" title="缩小图片"></li><li class="viewer_rotate_right" title="向右旋转"></li><li class="viewer_delete" title="关闭"></li></ul></div></div>';
		this.$image=null;
		this.fading=false;
		this.window_h=parseInt($(window).height(),10);
		this.window_w=parseInt($(window).width(),10);
		this.init(obj);
	};
	MyImage.prototype={
		init:function(obj){
			var link='<link type="text/css" rel="stylesheet" href="'+$("[src*='viewer.js']").attr("src").replace(/js/g,"css")+'">';
			$("[href*='viewer.css']").length>0?null:$("head").append(link);
			$("html").append(this.template);
			this.$image=$("html").find(".viewer_container .viewer_canvas img");
			this.$image.attr("src",obj.attr("src"));
			var theImage = new Image();
			theImage.src = obj.attr("src");
			this.image.width=parseInt(theImage.width,10);
			this.image.height=parseInt(theImage.height,10);
			this.image.naturalWidth=parseInt(theImage.width,10);
			this.image.naturalHeight=parseInt(theImage.height,10);
			this.bind();
			this.renderImage();
		},
		renderImage:function(){
			this.image.left=(this.window_w-this.image.width)/2;
			this.image.top=(this.window_h-this.image.height)/2;
			this.$image.css({
				"left":this.image.left,
				"top":this.image.top,
				"width":this.image.width,
				"height":this.image.height
			});
		},
		zoom:function(ratio, hasTooltip){
			var options=this.defaults;
			var minZoomRatio = Math.max(0.05, options.minZoomRatio);
	        var maxZoomRatio = Math.min(5, options.maxZoomRatio);
	        var width;
	        var height;
	        ratio = parseFloat(ratio);
	        if(isNumber(ratio)){
	        	if(ratio<0){
	                ratio= 1/(1-ratio);
	            }else{
	                ratio=1+ratio;
	            }
	        	width = this.image.width * ratio;
	            height = this.image.height * ratio;
	            ratio = width / this.image.naturalWidth;
	            ratio = Math.min(Math.max(ratio, minZoomRatio), maxZoomRatio);
	            if(ratio<maxZoomRatio&&ratio>minZoomRatio){
		            if (ratio > 0.95 && ratio < 1.05) {
		            	ratio = 1;
		            	width = this.image.naturalWidth;
		            	height = this.image.naturalHeight;
		            }
	
		            this.image.left -= (width - this.image.width) / 2;
		            this.image.top -= (height - this.image.height) / 2;
		            this.image.width = width;
		            this.image.height = height;
		            this.image.ratio = ratio;
		            this.$image.css({
						"left":this.image.left,
						"top":this.image.top,
						"width":this.image.width,
						"height":this.image.height
					});
	            }
	            if(hasTooltip){
	            	this.tooltip();
	            }
	        }
		},
		tooltip:function(){
			var _this=this;
			var per=Math.round(this.image.ratio * 100);
			$(".viewer_container .viewer_tooltip").text(per+'%');
			if(!this.fading){
				$(".viewer_container .viewer_tooltip").animate({"opacity":'0.8'});
				$(".viewer_container .viewer_tooltip").css({"position":"absolute"});
			}else{
				clearTimeout(this.fading);
			}
			this.fading=setTimeout(function(){
				$(".viewer_container .viewer_tooltip").animate({"opacity":'0'});
				$(".viewer_container .viewer_tooltip").css({"position":"relative"});
				_this.fading=false;
			},1000);
		},
		bind:function(){
			var _this=this;
			$(window).on("resize.viewer", function(){
				_this.window_h=parseInt($(window).height(),10);
				_this.window_w=parseInt($(window).width(),10);
				_this.renderImage();
			});
			//放大图片
			$(document).on("click.viewer",".viewer_container .viewer_toolbar .viewer_zoom_in",function(){
				_this.zoom(0.1,true);
			});
			//缩小图片
			$(document).on("click.viewer",".viewer_container .viewer_toolbar .viewer_zoom_out",function(){
				_this.zoom(-0.1,true);
			});
			//向右旋转
			$(document).on("click.viewer",".viewer_container .viewer_toolbar .viewer_rotate_right",function(c){
				if(_this.$image.hasClass("rotate90")){
					_this.$image.removeClass("rotate90").addClass("rotate180");
				}else if(_this.$image.hasClass("rotate180")){
					_this.$image.removeClass("rotate180").addClass("rotate270");
				}else if(_this.$image.hasClass("rotate270")){
					_this.$image.removeClass("rotate270").addClass("rotate360");
				}else if(_this.$image.hasClass("rotate360")){
					_this.$image.removeClass("rotate360").addClass("rotate90");
				}else{
					_this.$image.addClass("rotate90");
				}
			});
			//关闭
			$(document).on("click.viewer",".viewer_container .viewer_toolbar .viewer_delete",function(){
				$("html .viewer_container").remove();
				_this.unbind();
			});
			//图片拖动
			$(document).on("mousedown.viewer",".viewer_container .viewer_canvas img",function(event){
				var isMove = true;
				var start_x=event.pageX;
				var start_y=event.pageY;
				$(document).on("mousemove.viewer",function(event){
					if(isMove){
						_this.$image.css({
							"left":_this.image.left+event.pageX-start_x,
							"top":_this.image.top+event.pageY-start_y,
							"width":_this.image.width,
							"height":_this.image.height
						});
					}
					event.preventDefault();
				});
				$(document).on("mouseup.viewer",function(){
					isMove = false;
					_this.image.left=_this.$image.offset().left;
					_this.image.top=_this.$image.offset().top;
					$(document).off("mouseup.viewer");
					$(document).off("mousemove.viewer");
				});
			});
		},
		unbind:function(){
			$(window).off("resize.viewer");
			$(document).off("click.viewer");
			$(document).off("mousedown.viewer");
		}
	};
})(jQuery);




