// fontSize ：html中的font-size
// designwidth :设计稿的宽度
// relwidth：当前浏览器的宽度
// relfontSize :计算出实际的在html 中的font-size
function fontsize(designWidth){
    function getfontsize(){
        var initalFontsize=100;
        var relwidth=document.documentElement.clientWidth;
        relFontsize=initalFontsize*relwidth/designWidth;
        document.getElementsByTagName("html")[0].style.fontSize=relFontsize+"px";
    }
    getfontsize();
    window.onresize=getfontsize;
}

fontsize(750);