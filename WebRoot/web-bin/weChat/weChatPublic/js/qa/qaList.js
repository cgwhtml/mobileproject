/**
 * Created by znn on 2018/3/17.
 */

var LOCALHOST_URL=window.location.origin+"/web-bin/m/weChat/weChatPublic/query_qaList_data?pageNumber=";
var query=getRequest();
var pageNum=1;//需要加载的页码标号
var pageSize=15;//每页的数据条数
var hasNextPage=false;
var infinite_scroll  = document.getElementById("infinite_scroll_id");

var hospCode = query.hospCode;

$(function(){
    $("body").niceScroll({
        railpadding : {top : 0,right : 0,left : 0,bottom : 0}
    });
    var url=LOCALHOST_URL+pageNum+"&pageSize="+pageSize+"&hospCode="+hospCode;
    getQaList(url);
   // 滚动加载
    $(document.body).infinite();
    var loading = false;  //状态标记
    $(document.body).infinite().on("infinite", function() { /!*滚动的是 屏幕高度，要设置样式高100%  qa_list=总的高度，被撑开的高度*!/
        if(loading) return;
        loading = true;

        setTimeout(function() {
            pageNum+=1;
            var url=LOCALHOST_URL+pageNum+"&pageSize="+pageSize;
            getQaList(url);
            loading = false;
        });
    });
});

function getQaList(url){
  //  alert("url="+url)
    if(pageNum != 1 && !hasNextPage){ // 没有数据了
        return;
    }
    $.ajax({
        on: true,
        type:"get",
        url:url,
        dataType:"json",

        success: function(data){

            if(data.data &&data.res==0&&  data.data.list && data.data.list.length != 0){
                hasNextPage =  data.data.hasNextPage;

               var result=data.data.list;

                $.each(result,function (i, item) {
                    var appendHtml=  '<ul><li>'+
                        '<input type="hidden" value="'+item.url+'" class="url">'+
                        '<div class="question">'+
                        '<span>'+item.name+'</span>'+
                        '</div>'+
                        '<div class="gray_arrow"></div>'+
                        '</li></ul>'
                    $(".qa_list").append(appendHtml);
                })
                if(!hasNextPage){
                    infinite_scroll.style.display="none";
                    var appendHtml=  '<img height="10px"></img>'
                    $(".qa_list").append(appendHtml);
                }
            }else if(pageNum == 1){
                infinite_scroll.style.display="none";
                $(".qa_list").append("<img src='/web-bin/resources/images/nodata.png' style='height:200px;display: flex;align-items:center;margin-top: 50px; auto;'/><p style='font-size:14px;color:#929292;text-align: center;margin:0.3rem auto 0.2rem;display: inline-block;width: 100%;'>暂无数据");
            }
        }
    });
}

/*点击事件*/
$("body").on('click','.qa_list ul li',function(event){
    var $_this=$(this);
    var url=$_this.find(".url").val();
    location.href = url;
});


