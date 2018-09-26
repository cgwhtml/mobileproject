/**
 * Created by xyz
 * Created time 2017/7/22 15:34
 * Description
 */
function initImage(){
    var isopen=false;
    $(".form_head_desc").find("img").each(function(){
        var theImage = new Image();
        theImage.src = $(this).attr("src");
        var _this=this;
        theImage.onload = function() {
            $(_this).data("widthBefore",theImage.width);
            $(_this).data("heightBefore",theImage.height);
            //图片自适应屏幕大小
            var width=parseInt(theImage.width,10);
            var q_width=parseInt($(".form_head_desc").width(),10);
            var height=parseInt(theImage.height,10);
            if(width>q_width){
                $(_this).width(q_width);
                $(_this).height(q_width/width*height);
            }
        }
    });
    $(".form_head_desc").find("img").bind({
        "click":function(){
            if(!isopen){
                isopen=true;
                $(this).data("widthAfter",$(this).width());
                $(this).data("heightAfter",$(this).height());
                $(".con_back").css("display","block");
                $(this).after("<div id='d1'></div>");
                $("#d1").css({
                    "width":$(this).data("widthAfter"),
                    "height":$(this).data("heightAfter"),
                    "display":"inline-block",
                });
                if($(this).data("widthBefore")<$(window).width()){
                    $(this).css({
                        "position":"absolute",
                        "width":$(this).data("widthBefore"),
                        "height":$(this).data("heightBefore"),
                        "left":$(window).scrollLeft()+($(window).width()-$(this).data("widthBefore"))/2,
                        "top":$(window).scrollTop()+($(window).height()-$(this).data("heightBefore"))/2,
                        "z-index":"9999"
                    });
                }else{
                    $(this).css({
                        "position":"absolute",
                        "width":$(this).data("widthBefore"),
                        "height":$(this).data("heightBefore"),
                        "left":0,
                        "top":$(window).scrollTop()+($(window).height()-$(this).data("heightBefore"))/2,
                        "z-index":"9999"
                    });
                    $(".con_back").css({"width":$(this).data("widthBefore")});
                }
            }else{
                isopen=false;
                $(".con_back").css("display","none");
                $("#d1").remove();
                $(this).css({
                    "position":"",
                    "width":$(this).data("widthAfter"),
                    "height":$(this).data("heightAfter"),
                });
            }
        }
    });
}
