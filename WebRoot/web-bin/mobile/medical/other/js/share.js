var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query=getRequest();//方法在config配置文件中
console.log(query);

$(function(){
	var SERVER_URL=window.HUGPAGE_CONFIG.SERVER_URL;//读取图片服务器路径
	var FILE_URL=window.HUGPAGE_CONFIG.FILE_URL;//读取图片文件路径
	$.ajax({
		on: true,
		timeout:60000,
		type:"post",
		url: LOCALHOST_URL+'/web-bin/m/nosen/medical/other/query_shareList_data?hgId='+query.hgId,
		dataType:"json",
		success: function(data){
			callBack(data,SERVER_URL,FILE_URL);
		}
	});
});

function callBack(data,server,file){
	if(data&& data.data){
		if(data.data.sex==1){
			$("#photo").attr("src","/web-bin/resources/images/woman.png");
		}
		$(".s1").setTemplateElement("Template-info").processTemplate(data.data);
		data.data.head && $("#photo").attr("src",server+file+data.data.head);
		//加载二维码
		$("#qrCode").attr("src",server+"/hug-web/r/file/getQRCode/"+query.hgId);
	}
}

$(".downLoad_jk").on("click",function(e){
	window.open("http://www.lanniuh.com/XYZ/LnJk");
	e.preventDefault();
});

$(".downLoad_yh").on("click",function(e){
	window.open("http://www.lanniuh.com/XYZ/LnYs");
	e.preventDefault();
});