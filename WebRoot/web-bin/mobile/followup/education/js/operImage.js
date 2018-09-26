/**
 * Created by xyz
 * Created time 2017/9/22 15:34
 * Description
 */
function initImage(){
    $(".form_head_desc").find("img").each(function(){
        var theImage = new Image();
        theImage.src = $(this).attr("src");
        var _this=this;
        theImage.onload = function() {
            //图片自适应屏幕大小
            var width=parseInt(theImage.width,10);
            var q_width=parseInt($(".form_head_desc").width(),10);
            var height=parseInt(theImage.height,10);
            if(width>q_width){
                $(_this).width(q_width);
                $(_this).height(q_width/width*height);
            }
        }
        $(this).on("click",function() {
            if($(".con_back").hasClass("hide")){
                $(_this).css({
                    zIndex:9999,
                    position:'relative'
                });
                $(".con_back").removeClass("hide");
                $(_this).myTouch({
                    "left":0,
                    "top":0
                });
            }else{
                $(_this).css({
                    zIndex:'',
                    position:'',
                    'transform': 'scale(1) rotate(0deg)',
                    '-webkit-transform': 'scale(1) rotate(0deg)'
                });
                $(_this).destroy();
                $(".con_back").addClass("hide");
            }
        });
    });
    $(".con_back").off("touchmove.myTouch").on("touchmove.myTouch",function(event){
        event.preventDefault();//会阻止滚动效果
    });
}
