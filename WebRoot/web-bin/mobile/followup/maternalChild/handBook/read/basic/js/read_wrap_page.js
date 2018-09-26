/**
 * Created by xyz
 * Created time 2017/6/29 10:35
 * Description
 */
var loadPage=2;
for(var i=0;i<loadPage;i++){
    var $page=$("<div class='r_page'></div>");
    $page.load(p_url+arr[i]);
    $("#flipbook").append($page);
}