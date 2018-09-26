/**
 * Created by xyz
 * Created time 2017/4/6 15:15
 * Description
 */
//表单方法入口--p,s,u(require, exports, module)
define("form/formlayout", ["form/component/topic","form/form-plugin"],
		function(p,s,u){
	p("form/component/topic");
    var h = p("form/form-plugin");
	var a = {
	    currentDrag: null
    };
    //get请求参数转对象
    a.analyseRequest=function(){
        var url = decodeURI(window.location.search); //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    };
    $(function(){
        //ajax调用返回修改内容
        var localhostUrl=window.location.origin;
        var requestObj=a.analyseRequest();
        if(requestObj!=null&&requestObj["id"]!=null&&requestObj["id"]!=""){
            $.ajax({
                type:"post",
                url: localhostUrl+'/web-bin/m/nosen/followup/form/query_checkForm_data?hugId='+requestObj["hugId"]+'&id='+requestObj["id"],
                success:function(data){
                	if(!(data.data&&data.data.id)){
                		$(".noFound").show();
                		return false;
                	}
                	$(".wrapper").show();
                    document.title = data.data.title;
                	//题目
                	var questions=data.data.questions;
                	var m={
            			title:"",
            		    index:"0",
            		    order:"0",
            		    size:"1",
            		    componentKey:"ColumnPanel",
        		    	layoutDetail:[]
                	};
                	var qType=["Text","RadioBox","CheckBox","MatrixRaty","","ScoreRadioBox","MultipleTextArea","","ImageRadioBox","Select","DateComponent","Mobile","ImageComponent",
                	           "TextArea","ImageCheckBox"];//题目类型数组
                	if(questions){
    	            	for(var i=0;i<questions.length;i++){
                			var o={
    	            			componentKey:qType[questions[i].type-1],
    	            			title:questions[i].title,
    	            			fieldId:questions[i].id,
    	            			required:questions[i].required,
    	            			isDefault:questions[i].isDefault,
    	            			isReadOnly:questions[i].isReadOnly,
    	            			content:questions[i].content,
    	            			isHideTitle:questions[i].isHideTitle,
    	            			isSystemDate:questions[i].isSystemDate,
    	            			format:questions[i].format,
    	            			hideForMobile:questions[i].hideForMobile,
    	            			alias:questions[i].alias,
    	            			textAlign:questions[i].textAlign,
    	            			options:[]
    	            		};
                			if(questions[i].questions){
                				for(var j=0;j<questions[i].questions.length;j++){
    		            			o.options.push({
    		            				fieldId:questions[i].questions[j].id,
    		                            order:"0",
    		                            componentKey:"Option",
    		                            name:questions[i].questions[j].title,
    		                            children:[]
    		            			});
    		            			if(questions[i].questions[j].options){
    		            				for(var k=0;k<questions[i].questions[j].options.length;k++){
    		            					var s_o=questions[i].questions[j].options[k];
    		            					o.options[j].children.push({
    		            						fieldId:s_o.questionId,
    		            						selectionId:s_o.id,
    		            						except:(s_o.except=="true"||s_o.except=="1").toString(),
    		            						errorContent:s_o.tip
    		            					});
    		            				}
    		            			}
    		            		}
                			}
    	            		if(questions[i].options){
    		            		for(var j=0;j<questions[i].options.length;j++){
    		            			o.options.push({
    		            				other:(questions[i].options[j].other=="true"||questions[i].options[j].other=="1").toString(),
    		                            selectionId:questions[i].options[j].id,
    		                            order:"0",
    		                            componentKey:"Option",
    		                            name:questions[i].options[j].title,
    		                            errorContent:questions[i].options[j].tip,
    		                            isError:(questions[i].options[j].except=="true"||questions[i].options[j].except=="1").toString(),
    		                            scoreValue:questions[i].options[j].score
    		            			});
    		            		}
    	            		}
    	            		m.layoutDetail.push(o);
    	            	}
    	            	m=JSON.stringify(m);
                	}
                	h.renderForm({
                        parentEl: $("#widget_control"),
                        layoutDetail: m,
                        readOnly: true,
                        replyStatus: false,
                        callback: function(b) {}
                    });
                	$(".form_head_title").html(data.data.title);
                	$(".form_head_desc").html(data.data.beginContent);
                	$(".form_foot").html(data.data.endContent);
                },
                error:function () {
                    return;
                }
            });
        }else{
        	$(".noFound").show();
        }
        //禁止页面缩放
        window.onload=function () {
            document.addEventListener('touchstart',function (event) {
                if(event.touches.length>1){
                    event.preventDefault();
                };
            });
            var lastTouchEnd=0;
            document.addEventListener('touchend',function (event) {
                var now=(new Date()).getTime();
                if(now-lastTouchEnd<=300){
                    event.preventDefault();
                }
                lastTouchEnd=now;
            },false);
        };
	});
    //日期格式化
    Date.prototype.format = function(format){
        var o = {
            "M+" : this.getMonth()+1, //month
            "D+" : this.getDate(),    //day
            "h+" : this.getHours(),   //hour
            "m+" : this.getMinutes(), //minute
            "s+" : this.getSeconds(), //second
            "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
            "S" : this.getMilliseconds() //millisecond
        };
        if(/(Y+)/.test(format)) format=format.replace(RegExp.$1,
            (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(var k in o)if(new RegExp("("+ k +")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length==1 ? o[k] :
                    ("00"+ o[k]).substr((""+ o[k]).length));
        return format;
    };
	u.exports = a;
});