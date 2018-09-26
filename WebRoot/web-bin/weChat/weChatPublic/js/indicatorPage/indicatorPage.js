
/*
$(function(){
    $('#dowebok').fullpage({
        sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#f90','#f90']
    });


});
*/


$(function(){
    $('#dowebok').fullpage();
    var div=document.getElementById("page04_des012");

    function getElementByClassName(className){
        var elems = [];
        if(!document.getElementsByClassName){
       //     alert("no exit");
            var dom = document.getElementByTagName('*');
            for(var i = 0;i<dom.length;i++){
                if(dom[i].className == className)
                    elems.push(dom[i]);
            }
        }else{
            elems = document.getElementsByClassName(className);
      //      alert('exit');
        }
        return elems;
    }
    var adom = document.getElementsByClassName('my_text');

    for(var i = 0;i<adom.length;i++){
        adom[i].style.fontSize = 32+"px";
    }




    // iphone
    if(window.devicePixelRatio == 2 && window.screen.width==375 && window.screen.height==667){ // 6,7,8
        div.style.width=(675)+"px";
        div.style.height=(897)+"px";
        div.style.backgroundSize ="675px 897px";
        for(var i = 0;i<adom.length;i++){
            adom[i].style.fontSize = 35+"px";
        }
    //    alert("111111" );



    }else if(window.devicePixelRatio == 3 && window.screen.width==414 && window.screen.height==736){//6,7,8PLUS
        div.style.width=(675)+"px";
        div.style.height=(897)+"px";
        div.style.backgroundSize ="675px 897px";
        for(var i = 0;i<adom.length;i++){
            adom[i].style.fontSize = 35+"px";
        }
     //   alert("22222" );
    }else if(window.devicePixelRatio == 3 && window.screen.width==375 && window.screen.height==812){//x
        div.style.width=(675)+"px";
        div.style.height=(897)+"px";
        div.style.backgroundSize ="675px 897px";
        for(var i = 0;i<adom.length;i++){
            adom[i].style.fontSize = 37+"px";
        }
      // alert("333333333" );
    }
//    alert("height="+window.screen.height + ";width="+window.screen.width +"KK"+window.devicePixelRatio );

 //   alert("height="+window.screen.height + ";width="+window.screen.width +":"+window.width+";"+ window.screen.availWidth
  //      +";"+window.devicePixelRatio);
  //  alert("jdijd="+w + ";"+h);
   /* alert("height="+window.screen.height + ";width="+window.screen.width +":"+window.width+";"+ window.screen.availWidth
    +";"+window.devicePixelRatio);
*/
/*
css  用 device-width 判断
@media (min-device-width: 360px) {
*/






});
