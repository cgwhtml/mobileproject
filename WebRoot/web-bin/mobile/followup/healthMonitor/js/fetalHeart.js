var query=window.location.search;
var localhostUrl=window.location.origin;
$(function(){
	$.ajax({
		type: "GET",
		//url: localhostUrl+':1014/mobile/health/fetalHeart'+query,
		url: localhostUrl+'/web-bin/m/followup/healthMonitor/query_oneHealth_data'+query,
	    beforeSend:function(XMLHttpRequest){
	    	$("#loading").html("<img src='/web-bin/resources/images/loading_1.gif' width='30%' height='30%'/>");
        },
	    success: function(data){
	    	ajaxCallBack(data);
	    },
	    error:function(){
	        return;
        }
	});
});
function ajaxCallBack(data){
	$("#loading").html("");
	Report.initMusicPlayer(data);
}





