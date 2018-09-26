var express = require('express'),
	url=require('url'),
	actions = require('./actions'),
    config = require('./config'),
	route = require('./route'),
	fs=require('fs'),
	ng = require('nodegrass'),
	crypto = require('crypto'),//加密模块
    qs = require('querystring'),
    httpProxy = require('http-proxy'),
	session = require('express-session'),//首先引入 express-session 这个模块
	favicon=require('serve-favicon'),//serve-favicon中间件的路径
	connect=require('connect'),
	domain = require('domain'),
	log4js = require("log4js"),
	multer  = require('multer'),
	upload = multer({ dest: 'uploads/' });
	
var log4js_config = require("./log4js.json");
log4js.configure(log4js_config);
var LogFile = log4js.getLogger('log_file');


var keyObj={"wx_gzfnetylzx":"76a42dc029ef43b9bc8d56f3831015ed","tianshiyisheng":"7c0e395581e5428c8b85b85199760369","wx_pyrmyy":"03ae873244074b7780825c4f6cc741c5","jhkj_ysf":"pv6zrc92kjxbmnt1a5w8e70hiquygdls3of4"};//第三方存储partnerId:key

var app = express();
var SERVER_URL=config.hugPageConfigObj.server_url;//hug-web访问路径
var salt='9c932a4ead1444ef84b206658f9ed3cf';//md5=partnerId+time+salt 格林尼治时间，精确到毫秒
var partnerId='hug_page';
var partnerType='3';
var res_header={
 	'Content-Type':'application/json;charset=utf-8',
 	'Access-Control-Allow-Origin':'*',
 	"Access-Control-Allow-Headers":"X-Requested-With",
 	"Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS",
    'P3P': 'CP=CAO PSA OUR'
};

var proxy = httpProxy.createProxyServer({});

proxy.on('error', function(err, req, res) {
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.end('代理失败！');
});
//捕获之后可以有效防止node进程退出
process.on('uncaughtException', function (err) {
	//打印出错误
	console.log(err);
	LogFile.error(err);
});

var querys;


//页面静态资源加载配置
app.use(express.static('../../../../hugPage/WebRoot'));
//自定义浏览器角标
app.use(connect().use(favicon('../../web-bin/resources/images/favicon.ico')));
//按照上面的解释，设置 session 的可选参数
app.use(session({
   resave: true,
   saveUninitialized: false,
   secret: 'recommand 128 bytes random string by xuyunzhan', // 建议使用 128 个字符的随机字符串
   cookie: { maxAge: 12* 60 *60 * 1000 }
}));
app.all('/*', upload.any(), function (req, res) {
	try{
		var d = domain.create();
		d.on('error',function(err){
			logger(err,req,res);
			res.end();
		});
		querys="";
		d.run(function(){
			var pathname = url.parse(req.url).pathname;
			var urlRexg=/^\/web-bin\/?/i;
		    //浏览器首次打开HugPage页面的路径，添加cookie
		    //检查 session 中的 isVisit 字段
		    //如果存在则增加一次，否则为 session 设置 isVisit 字段，并初始化为 1。
			if(urlRexg.exec(pathname)){
			    /*if(pathname==="/web-bin/p/followup/physical/to_physicalExamList_page" || pathname==="/web-bin/m/medical/patient/to_medicalRecordList_page"
			    	||pathname==="/web-bin/m/medical/doctor/to_medicalRecordList_page" || pathname==="/web-bin/m/medical/hospital/to_medicalRecordList_page"
			    	||pathname==="/web-bin/m/medical/angel/to_medicalRecordList_page" || pathname==="/web-bin/m/followup/chat/to_question_page"
			    	||pathname==='/web-bin/p/followup/healthMonitor/to_healthMonitorErrorList_page'|| pathname==='/web-bin/p/followup/healthMonitor/to_fetalHeartHandleList_page'
			    	||pathname==='/web-bin/p/followup/healthMonitor/to_fetalHeart_page'||pathname==='/web-bin/m/followup/healthMonitor/to_fetalHeart_page'
			    	||pathname==='/web-bin/m/weChat/chat/to_index_page' || pathname==='/web-bin/m/weChat/chat/to_information_page'
			    	|| pathname==='/web-bin/m/weChat/chat/to_content_page'){
				   if(req.session.isVisit){
					   req.session.isVisit++;
				   }else{
					   req.session.isVisit = 1;
				   }
			    }else{
				   if(!req.session.isVisit){
					   handler401(req,res);
			       	   return;
				   }else{
					   req.session.isVisit++;
				   }
			    }*/
			    handlerRequest(req,res);
			}else{
				handler404(req,res);
			}
		});
	}catch(err){
		logger(err,req,res);
	}
	
});
exports.runServer = function(port){
    port = port || 3002;
    app.listen(port, function (){
    	console.log('Server running at http://127.0.0.1:'+ port +'/');    
    });
};
/**
 * 所有请求的统一入口
 */
var handlerRequest = function(req, res){
	//通过route来获取controller和action信息
	var pathname = url.parse(req.url).pathname;
	var path_arr=pathname.split("/");
	var type=path_arr[2]=='p'?'pc':(path_arr[2]=='m')?'mobile':"common";
	var actionName=path_arr.pop();
	if(pathname.indexOf("/oneparam/")>=0){
		actionName=path_arr[path_arr.length-1];
	}
	var actionInfo = route.getActionInfo(req.url, type);
    //如果route中有匹配的action，则分发给对应的action
    if(actionInfo.action&&actionInfo.action.indexOf(actionName)>=0){
    	//controller都放到当前目录的 相对路径下
        try{
        	var controller = require('./'+actionInfo.url+actionInfo.controller); //示例./interview/followup/physical/physical.js
            var ct = new controllerContext(req, res);
            //通过apply将controller的上下文对象传递给action
            controller[actionName].apply(ct,null);
        }catch(e){
        	handler500(req,res);
        	console.log(e);
        }
    }else{
    	handler404(req,res);
    }
};
//controller的上下文对象
var controllerContext = function(req, res){
    this.req = req;
    this.res = res;
    this.md5Fail = md5Fail;
    this.handler401 = handler401;
    this.handler404 = handler404;
    this.handler500 = handler500;
};
controllerContext.prototype.testMD5 = function(viewName, context){
    viewEngine.testMD5(this.req, this.res, viewName, context);
};
controllerContext.prototype.render = function(viewName, context){
    viewEngine.render(this.req, this.res, viewName, context);
};
controllerContext.prototype.postAjax = function(req_url,msg,query,h,_url,_fn){
    viewEngine.postAjax(this.req, this.res, req_url, msg, query,h,_url,_fn);
};
controllerContext.prototype.getAjax = function(req_url,msg,query,h,_url){
    viewEngine.getAjax(this.req, this.res, req_url, msg, query,h,_url);
};
controllerContext.prototype.uploadFile = function(req_url,msg,query,h,_url){
    viewEngine.uploadFile(this.req, this.res, req_url, msg,query, h,_url);
};
controllerContext.prototype.proxyUrl = function(){
    viewEngine.proxyUrl(this.req, this.res);
};
var viewEngine = {
	testMD5:function(req, res, viewName, context){
		var query = url.parse(req.url).query;
		var query_str=JSON.stringify(query);
		query_str=query_str.replace(/\"/g,"");//引号替换处理
		if(query!=null){
			query=qs.parse(query);//字符串转json对象	
			if(query.partnerId!=null&&query.md5!=null&&query.time!=null){
				var partnerId=query.partnerId;//厂商id
				var md5=query.md5.toLowerCase();//加密结果（全部作转小写处理）
				var time=query.time;//第三方服务器时间

				var key=keyObj[partnerId];//属性是变量的对象取值方式	
				var localTime=Date.now();
				
				var str=partnerId+time+key;
				var md5Obj = crypto.createHash('md5');//创建md5加密模块对象
				md5Obj.update(str);
				var md5_r = md5Obj.digest('hex').toLowerCase();//自己的md5加密结果（全部作转小写处理）
				if(md5==md5_r){
					var timeDiff=Math.abs(localTime-time);
					if(timeDiff/1000<600){//验证10分钟有效时间
						console.log("校验成功");
						this.render(req, res, viewName, context);
					}else{
						console.log("时间过期");
						md5Fail(req,res);
					}
				}else{
					console.log("校验MD5失败");
					md5Fail(req,res);
				}
			}else{
				console.log("缺少参数");
				md5Fail(req,res);
			}
		}else{
			console.log("缺少参数");
			md5Fail(req,res);
		}
	},
    render: function(req, res, viewName, context){
        fs.exists(viewName, function (exists){
 	       if(!exists){
 	    	   handler404(req,res);
 	       }else{
 	           fs.readFile(viewName, function (err, file){
 	               if(err){
 	            	   handler500(req,res);
 	               }else{
 	                   var contentType = "text/html;charset=utf-8";
 	                   res.writeHead(200, {
 	                       'Content-Type': contentType,
 	                       'P3P': 'CP=CAO PSA OUR'
 	                   });
 	                   res.write(file);
 	                   res.end();
 	               }
 	           });
 	       }
 	    });
    },
    postAjax: function(req,res,req_url,msg,query,h,_url,_fn){
    	querys=query;
    	if(!query){
    		query = url.parse(req.url).query;
    		query=qs.parse(query);//反序列化为对象
    		query =JSON.stringify(query);
    	}
    	
    	var SERVER = _url || SERVER_URL;
    	
 	    var time=Date.now();
 	    var str=partnerId+time+salt;
 	    var md5 = crypto.createHash('md5');
 	    md5.update(str);
 	    var md5_r = md5.digest('hex');//md5加密结果
 		
 	    var headers= h || {
 	       	'Accept':"*/*",
 	       	'Content-Type':'application/json;charset=utf-8',
 	        'Content-Length':Buffer.byteLength(query, 'utf8'),
 	       	'partnerType':partnerType,
 	       	'partnerId':partnerId,
 	       	'time':time,
 	       	'md5':md5_r
 	    };
        ng.post(SERVER+req_url,function(data){
            if(!_fn) {
                res.writeHeader(200, res_header);
                res.write(data);
                res.end();
            }else{
                _fn(data);
			}
            console.log(msg);
            console.log(data);
            logger(data,req,res);
        },headers,query,'utf8').on('error', function(e) {
        	console.log("错误：" + e.message);
        });
    },
    getAjax: function(req,res,req_url,msg,query,h,_url){
    	if(!query){
    		query = url.parse(req.url).query;
    		query=qs.parse(query);//反序列化为对象
    	    query = qs.stringify(query);//序列化为字符串
    	}
    	
    	var SERVER = _url || SERVER_URL;
    	
 	    var time=Date.now();
 	    var str=partnerId+time+salt;
 	    var md5 = crypto.createHash('md5');
 	    md5.update(str);
 	    var md5_r = md5.digest('hex');//md5加密结果
 		
 	    var headers= h || {
	       	'Accept':"*/*",
	       	'Content-Type':'application/json;charset=utf-8',
	       	'Content-Length':Buffer.byteLength(query, 'utf8'),
	       	'partnerType':partnerType,
	       	'partnerId':partnerId,
	       	'time':time,
	       	'md5':md5_r
	    };
        ng.get(SERVER+req_url+'?'+query,function(data){
        	res.writeHeader(200,res_header);
            res.write(data);
            res.end();
            console.log(msg);
            console.log(data);
            logger(data,req,res);
        },headers,'utf8').on('error', function(e) {
        	console.log("错误：" + e.message);
        });
    },
    uploadFile: function(req,res,req_url,msg,query,h,_url){
        var SERVER = _url || SERVER_URL;

        var time=Date.now();
        var str=partnerId+time+salt;
        var md5 = crypto.createHash('md5');
        md5.update(str);
        var md5_r = md5.digest('hex');//md5加密结果
		if(query){
            var queryObj=JSON.parse(query);
            var queryUrls=urlEncode(queryObj);
            var queryUrl="?"+queryUrls.substring(1);
		}else{
            var queryUrl="";
		}
        var headers= h || {
			'Accept':"*/*",
			'Content-Type':'application/json;charset=utf-8',
			'partnerType':partnerType,
			'partnerId':partnerId,
			'time':time,
			'md5':md5_r
		};
        ng.uploadFile(SERVER+req_url+queryUrl,function(data){
            for (var i=0;i<req.files.length;i++){
                fs.unlinkSync(req.files[i].path);//删除文件
            }
			res.writeHeader(200,res_header);
            res.write(data);
            res.end();
            logger(data,req,res);
        },headers,req,'utf8').on('error', function(e) {
            for (var i=0;i<req.files.length;i++){
                fs.unlinkSync(req.files[i].path);//删除文件
            }
            console.log("错误：" + e.message);
        });
    },
    proxyUrl:function(req,res){
    	proxy.web(req, res, {target: SERVER_URL});
 	    console.log("代理成功");
    }
};
var md5Fail=function(req,res){
	res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8'
    });
    var html=
	'<div style="width:100%;text-align:center;height:100%;position:relative;">' +
        '<div style="background-image: url(/web-bin/resources/images/404@2x.png);background-size: 3.47rem 3.8rem;background-repeat: no-repeat;background-position: 50% 35%;position:absolute;width: 100%;height: 100%;">' +
        	'<p style="font-size:0.4rem;color:#666666;top:40%;margin-top:2rem;position:absolute;width:100%">请求数据失败，请检查参数或稍后再试！</p>' +
        '</div>' +
	'</div>' +
	'<link rel="stylesheet" href="/web-bin/resources/flexible/flexible.css">' +
	'<script type="text/javascript" src="/web-bin/resources/flexible/flexible.js"></script>';
    res.write(html);
    res.end();
};

//json对象转url字符串
var urlEncode = function (param, key, encode) {
    if(param==null) return '';
    var paramStr = '';
    var t = typeof (param);
    if (t == 'string' || t == 'number' || t == 'boolean') {
        paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);
    } else {
        for (var i in param) {
            var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
            paramStr += urlEncode(param[i], k, encode);
        }
    }
    return paramStr;
};
var handler401 = function(req, res){
	logger(401,req,res);
	res.writeHead(401, {
        'Content-Type': 'text/html;charset=utf-8'
    });
    var html=
    '<div style="width:100%;text-align:center;height:100%;position:relative;">' +
    	'<div style="background-image: url(/web-bin/resources/images/404@2x.png);background-size: 3.47rem 3.8rem;background-repeat: no-repeat;background-position: 50% 35%;position:absolute;width: 100%;height: 100%;">' +
    		'<p style="font-size:0.4rem;color:#666666;top:40%;margin-top:2rem;position:absolute;width:100%">页面过期，请重新登陆！</p>' +
    	'</div>' +
    '</div>' +
    '<link rel="stylesheet" href="/web-bin/resources/flexible/flexible.css">' +
    '<script type="text/javascript" src="/web-bin/resources/flexible/flexible.js"></script>';
    res.write(html);
    res.end();
};

var handler404 = function(req, res){
	logger(404,req,res);
	res.writeHead(404, {
        'Content-Type': 'text/html;charset=utf-8'
    });
	var html=
	'<div style="width:100%;text-align:center;height:100%;position:relative;">' +
		'<div style="background-image: url(/web-bin/resources/images/404@2x.png);background-size: 3.47rem 3.8rem;background-repeat: no-repeat;background-position: 50% 35%;position:absolute;width: 100%;height: 100%;">' +
			'<p style="font-size:0.4rem;color:#666666;top:40%;margin-top:2rem;position:absolute;width:100%">很抱歉，您所访问的页面不存在！</p>' +
		'</div>' +
	'</div>' +
	'<link rel="stylesheet" href="/web-bin/resources/flexible/flexible.css">' +
	'<script type="text/javascript" src="/web-bin/resources/flexible/flexible.js"></script>';
	res.write(html);
    res.end();
};

var handler500 = function(req, res){
	logger(500,req,res);
	res.writeHead(500, {
        'Content-Type': 'text/html;charset=utf-8'
    });
	var html=
    '<div style="width:100%;text-align:center;height:100%;position:relative;">' +
    	'<div style="background-image: url(/web-bin/resources/images/404@2x.png);background-size: 3.47rem 3.8rem;background-repeat: no-repeat;background-position: 50% 35%;position:absolute;width: 100%;height: 100%;">' +
    		'<p style="font-size:0.4rem;color:#666666;top:40%;margin-top:2rem;position:absolute;width:100%">很抱歉，服务器内部错误！</p>' +
		'</div>' +
    '</div>' +
    '<link rel="stylesheet" href="/web-bin/resources/flexible/flexible.css">' +
    '<script type="text/javascript" src="/web-bin/resources/flexible/flexible.js"></script>';
    res.write(html);
    res.end();
};

var logger =function(err,req,res){
	console.log(err);
	LogFile.error(err);
	console.log(req._parsedUrl.pathname);
	LogFile.info(req._parsedUrl.pathname);
	if(req._parsedUrl.query!="" && req._parsedUrl.query!=null){
		console.log(req._parsedUrl.query);
		LogFile.info(req._parsedUrl.query);
	}
	if(querys!=""){
		LogFile.info(querys);
		console.log(querys);
	}
};