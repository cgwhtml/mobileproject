/**
 * @author xyz
 * @date 20161024
 */

var parseURL = require('url').parse;

//根据http请求的type来分别保存route规则
var routes = {'pc':[],'mobile':[],'common':[]};

/**
 * 注册route规则
 * 示例：
 * route.map({
 *     pathUrl:'/web-bin/p/followup/physical',//用来匹配,判断使用哪个map
 *     type:'pc',//表示PC端
 *     url: '/interview/followup/physical/',//controller js的路径
 *     controller: 'physical',
 *     action: ['to_physicalExamList_page']
 * })
 */
exports.map = function(dict){
    if(dict && dict.url && dict.controller&& dict.type){
        var type = dict.type;
        routes[type].push({
            p_u:dict.pathUrl,//url匹配正则
            t:dict.type,
        	u: dict.url,
            c: dict.controller,
            a: dict.action
        });
    }
};

exports.getActionInfo = function(url, type){
    var r = {pathUrl:null, type:null, url:null, controller:null, action:null},
    pathname = parseURL(url).pathname;
    var m_routes = routes[type];
    for(var i in m_routes){
        //正则匹配
        //r.args = m_routes[i].p_u.exec(pathname);
    	//判断正则匹配是否是数组类型
    	if(Object.prototype.toString.call(m_routes[i].p_u)=='[object Array]'){
    		for(var j=0;j<m_routes[i].p_u.length;j++){
    			if(m_routes[i].p_u[j].exec(pathname)){
                	r.pathUrl=m_routes[i].p_u[j];
                	r.type=m_routes[i].t;
                	r.url = m_routes[i].u;
                	r.controller = m_routes[i].c;
                    r.action = m_routes[i].a;
                    break;
                }
    		}
    	}else{
    		if(m_routes[i].p_u.exec(pathname)){
            	r.pathUrl=m_routes[i].p_u;
            	r.type=m_routes[i].t;
            	r.url = m_routes[i].u;
            	r.controller = m_routes[i].c;
                r.action = m_routes[i].a;
                //r.args.shift(); //第一个值为匹配到的整个url，去掉
                break;
            }
    	}
    }
    return r;
};