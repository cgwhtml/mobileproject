;(function($){
    var Carousel=function(poster){
        var self=this;
        //保存单个旋转木马对象
        this.poster=poster;
        this.posterItemMain=poster.find("ul.poster-list");
        this.posterItems=poster.find("li.poster-item");
        this.posterFirstItem=this.posterItems.first();
        this.firstItemData={
            width:this.posterFirstItem.width(),
            height:this.posterFirstItem.height()
        };
        this.posterFirstItem.addClass("current-item");
        this.rotateFlag = true;
        //默认配置参数
        this.setting={
            "width":1000,  		//幻灯片的宽度
            "height":270,  		//幻灯片的高度
            "posterWidth":640,     //第一张幻灯片的宽度
            "posterHeight":270,    //第一张幻灯片的高度
            "scale":0.9,   		   //幻灯片显示的比例
            "speed":500,           //点击切换速度
            "autoPlay":false,      //是否自动播放
            "delay":1000,          //自动播放速度
            "verticalAlign":"middle"     //top,bottom幻灯片位置关系
        };
        $.extend(this.setting,this.getSetting());
        this.setSettingValue();
        this.setPosterPos();
        this.initEvent();
    };
    Carousel.prototype={
        initEvent:function(){
            //手机端拖动
            document.getElementById("poster-wrap").addEventListener("touchstart", touchStart, false);
            var startPos={},
                endPos={},
                isScrolling= 0;//isScrolling为1时，表示纵向滑动，0为横向滑动
            var _this_=this;
            var zIndexArr = [];
            function touchStart(e) {
                if(!_this_.rotateFlag){
                    return false;
                }
                //e.preventDefault();
                var touch = e.touches[0];
                startPos={
                    x:touch.pageX,
                    y:touch.pageY,
                    time:+new Date
                };
                document.getElementById("poster-wrap").addEventListener("touchmove", touchMove, false);
                document.getElementById("poster-wrap").addEventListener("touchend", touchEnd, false);
            }
            function touchMove(e){
                e.preventDefault();
                var touch = e.touches[0];
                //当屏幕有多个touch或者页面被缩放过，就不执行move操作
                if(event.touches.length > 1 || event.scale && event.scale !== 1) return;
                endPos={
                    x:startPos.x-touch.pageX,
                    y:startPos.y-touch.pageY
                };
                isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1:0;
                if(isScrolling === 0){
                    event.preventDefault(); //阻止触摸事件的默认行为，即阻止滚屏
                }
            }
            function touchEnd(e){
                //e.preventDefault();
                document.getElementById("poster-wrap").removeEventListener("touchmove",touchMove,false);
                document.getElementById("poster-wrap").removeEventListener("touchend",touchEnd,false);
                var duration = +new Date - startPos.time;//滑动的持续时间
                if(isScrolling === 0){
                    if(Number(duration) > 50){
                        //判断是左移还是右移，当偏移量大于10时执行
                        if(endPos.x > 20){
                            _this_.rotateFlag=false;
                            if($(".current-item").next().get(0)){
                                var _next=$(".current-item").next();
                                $(".current-item").removeClass("current-item").next().addClass("current-item");
                            }else{
                                _this_.rotateFlag=true;
                                return false;
                            }
                            _this_.posterItems.each(function(){
                                var self=$(this),
                                    next=_this_.posterFirstItem,
                                    width=0,
                                    height=0,
                                    top=0,
                                    left=0;
                                if(self.hasClass("current-item")){
                                    width=_this_.firstItemData.width;
                                    height=_this_.firstItemData.height;
                                    left=parseInt($(this).css("left"))-parseInt(0.764*$(window).width());
                                }else{
                                    next=_next;
                                    width=next.width();
                                    height=next.height();
                                    top=next.css("top");
                                    if(self.next().hasClass("current-item")){
                                        left=parseInt($(this).css("left"))-parseInt(0.698*$(window).width());
                                    }else{
                                        left=parseInt($(this).css("left"))-parseInt(0.764*$(window).width());
                                    }
                                }
                                var zIndex=next.css("zIndex");
                                zIndexArr.push(zIndex);
                                self.animate({
                                    width:width,
                                    height:height,
                                    left:left,
                                    top:top
                                },_this_.setting.speed,function(){
                                    _this_.rotateFlag=true;
                                });
                            });
                            //zIndex需要单独保存再设置，防止循环时候设置再取的时候值永远是最后一个的zindex
                            _this_.posterItems.each(function(i){
                                $(this).css("zIndex",zIndexArr[i]);
                            });
                        }else if(endPos.x < -20){
                            _this_.rotateFlag=false;
                            if($(".current-item").prev().get(0)){
                                var _prev=$(".current-item").prev();
                                $(".current-item").removeClass("current-item").prev().addClass("current-item");
                            }else{
                                _this_.rotateFlag=true;
                                return false;
                            }
                            _this_.posterItems.each(function(){
                                var self=$(this),
                                    prev=_this_.posterFirstItem,
                                    width=0,
                                    height=0,
                                    top=0,
                                    left=0;
                                if(self.hasClass("current-item")){
                                    width=_this_.firstItemData.width;
                                    height=_this_.firstItemData.height;
                                    left=parseInt($(this).css("left"))+parseInt(0.698*$(window).width());
                                }else{
                                    prev=_prev;
                                    width=prev.width();
                                    height=prev.height();
                                    top=prev.css("top");
                                    if(self.prev().hasClass("current-item")){
                                        left=parseInt($(this).css("left"))+parseInt(0.764*$(window).width());
                                    }else{
                                        left=parseInt($(this).css("left"))+parseInt(0.764*$(window).width());
                                    }
                                }
                                var zIndex=prev.css("zIndex");
                                zIndexArr.push(zIndex);
                                self.animate({
                                    width:width,
                                    height:height,
                                    left:left,
                                    top:top
                                },_this_.setting.speed,function(){
                                    _this_.rotateFlag=true;
                                });
                            });
                            //zIndex需要单独保存再设置，防止循环时候设置再取的时候值永远是最后一个的zindex
                            _this_.posterItems.each(function(i){
                                $(this).css("zIndex",zIndexArr[i]);
                            });
                        }
                    }
                }
                endPos.x=0;
                endPos.y=0;
            }
        },
        //设置垂直排列对齐
        setVerticalAlign:function(height){
            var verticalType=this.setting.verticalAlign,
                top=0;
            if(verticalType === "middle"){
                top = (this.setting.posterHeight-height)/2;
            }else if(verticalType === "top"){
                top = 0;
            }else if(verticalType === "bottom"){
                top = this.setting.posterHeight-height;
            }else{
                top = (this.setting.posterHeight-height)/2;
            };
            return top;
        },
        //设置剩余的帧的位置关系
        setPosterPos:function(){
            var self=this;
            var sliceItems=this.posterItems,
                sliceSize=sliceItems.size(),
                rightSlice=sliceItems.slice(0,sliceSize),
                level=Math.floor(this.posterItems.size());
            //设置右边帧的位置关系和宽度高度top
            var rw=this.setting.posterWidth,
                rh=this.setting.posterHeight,
                gap=((10-this.setting.posterWidth)/2);

            var firstLeft=(10-this.setting.posterWidth)/2;
            var fixOffsetLeft=Number(firstLeft);
            rightSlice.each(function(i){
                level--;
                var _rw=rw;
                var _rh=rh;
                if(i!=0){
                    _rw=rw*self.setting.scale;
                    _rh=rh*self.setting.scale;
                }
                $(this).css({
                    width:_rw+"rem",
                    height:_rh+"rem",
                    zIndex:level,
                    top:self.setVerticalAlign(_rh)+"rem",
                    left:fixOffsetLeft+i*gap+i*_rw+"rem"
                });
                i++;
            });
        },
        //设置配置参数值去控制基本的宽度高度
        setSettingValue:function(){
            this.poster.css({
                width:this.setting.width,
                height:this.setting.height
            });
            this.posterItemMain.css({
                width:this.setting.width,
                height:this.setting.height
            });
            var w=(10-this.setting.posterWidth)/2;
            this.posterFirstItem.css({
                width:this.setting.posterWidth,
                height:this.setting.posterHeight,
                zIndex:Math.floor(this.posterItems.size()/2),
                left:w+"rem"
            });
        },
        //获取人工配置参数
        getSetting:function(){
            var setting=this.poster.attr("data-setting");
            if(setting&&setting!=""){
                return $.parseJSON(setting);
            }else{
                return {};
            };
        }
    };
    Carousel.init=function(posters){
        var _this_=this;
        posters.each(function(){
            new _this_($(this));
        });
    };
    window["Carousel"]=Carousel;
})(jQuery);