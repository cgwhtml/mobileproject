(function () {
	window.HUGPAGE_CONFIG={
        // LOCALHOST_URL:"http://gongsi.haage.cn",//HugPage的服务器地址，外网专用（没有IP限制）
		LOCALHOST_URL:"http://192.168.3.40",//HugPage的服务器地址，外网专用（没有IP限制）
		PORT:'3002',//服务器端口
        SERVER_URL:"http://www.lanniuh.com",//hug-web访问路径
        // SERVER_URL:"http://116.62.29.166:9190",//hug-web访问路径
		FETALHEART_URL:"http://www.lanniuh.com/health/",//胎心录音文件读取的url
		FILE_URL:"/hug-web/r/file/download/",//文件相关路径，包括图片
		QUESTION_URL:"http://www.joinhealth.cn:8080",
		IMG_URL:"http://www.lanniuh.com:9090"
	};
})();