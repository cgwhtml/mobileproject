(function($){
    $.fn.extend({
        myTouch:function(param){
            return new myTouch(param,$(this));
        },
        destroy:function(){
            $(this).off("touchstart.myTouch").off("touchmove.myTouch").off("touchend.myTouch");
        }
    });
    var myTouch=function(param,obj){
        this.options={
            left:0,
            top:0,
            scale:1,
            dragStart:function(){},//拖动开始
            dragEnd:function(){},//拖动结束
            click:function(){}//点击事件
        };
        $.extend(!0,this.options,param);
        this.a=obj;
        this.isMove=true;
        this.start_x=0;//移动用
        this.start_y=0;
        this.startX=0;//缩放用
        this.endX=0;//
        this.init();
    };
    myTouch.prototype={
        init:function(){
            this.a.css({
                "left":this.options.left,
                "top":this.options.top,
                'transform': 'scale(' + this.options.scale + ') rotate(0deg)',
                '-webkit-transform': 'scale(' + this.options.scale + ') rotate(0deg)'
            });
            this.drag();
            this.click();
        },
        click:function(){
            this.options.click();
        },
        drag:function(){
            var _this=this;
            //拖动
            $(document).off("touchstart.myTouch").on("touchstart.myTouch",_this.a,function(event){
                _this.options.dragStart();
                _this.isMove=true;
                var touch1 = event.originalEvent.targetTouches[0];  // 第一根手指touch事件
                var fingers = event.originalEvent.touches.length;   // 屏幕上手指数量
                if(fingers==2){
                    var touch2 = event.originalEvent.targetTouches[1];  // 第二根手指touch事件
                    // 缩放图片的时候X坐标起始值
                    _this.startX = Math.abs(touch1.pageX - touch2.pageX);
                }else{
                    _this.start_x=touch1.pageX;
                    _this.start_y=touch1.pageY;
                }
            });
            _this.a.off("touchmove.myTouch").on("touchmove.myTouch",function(event){
                if(_this.isMove){
                    var touch1 = event.originalEvent.targetTouches[0];  // 第一根手指touch事件
                    var fingers = event.originalEvent.touches.length;   // 屏幕上手指数量
                    if(fingers==2){
                        var touch2 = event.originalEvent.targetTouches[1];  // 第二根手指touch事件
                        // 缩放图片的时候X坐标滑动变化值
                        _this.endX = Math.abs(touch1.pageX - touch2.pageX);
                        _this.options.scale += parseFloat(_this.endX - _this.startX)/parseFloat(_this.a.css("width"))/5;
                        _this.a.css({
                            'transform': 'scale(' + _this.options.scale + ') rotate(0deg)',
                            '-webkit-transform': 'scale(' + _this.options.scale + ') rotate(0deg)'
                        });
                    }else{
                        _this.a.css({
                            "left":_this.options.left+touch1.pageX-_this.start_x,
                            "top":_this.options.top+touch1.pageY-_this.start_y
                        });
                    }
                }
                event.preventDefault();//会阻止滚动效果
            });
            $(document).off("touchend.myTouch").on("touchend.myTouch",function(){
                _this.options.scale < 1 ? (
                    _this.a.css({
                        'transform': 'scale(1) rotate(0deg)',
                        '-webkit-transform': 'scale(1) rotate(0deg)'
                    }),
                    _this.options.scale=1
                ) : _this.options.scale;
                _this.isMove = false;
                _this.options.left=parseFloat(_this.a.css("left")) ? parseFloat(_this.a.css("left")) : 0;
                _this.options.top=parseFloat(_this.a.css("top")) ? parseFloat(_this.a.css("top")) : 0;
                _this.options.dragEnd();
            });
        }
    };
})(jQuery);