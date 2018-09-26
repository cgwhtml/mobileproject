/*!
 * myPagination Jquery Pagination Plug-in Library v6.0
 * 
 * http://linapex.blog.163.com/
 *
 * Date: 2013/3/24 21:20
 */
(function($) {
    function init(param, obj) {
        function getParam() {
            var a = "pageNumber=" + opts.currPage+"&pageSize="+opts.pageNumber+"&_="+Math.random();
            return opts.ajax.param && (a += "&" + opts.ajax.param), a;
        }
        function getPanelTotalInfo(){
            var a = "";
            if (opts.panel.totalInfo_on) {
                var b = document.createElement("span");
                b = $(b);
                var c = b.text(opts.panel.totalInfo).text();
                if (-1 != c.indexOf("{lower}")) {
                    var lower = (opts.currPage-1)*opts.pageNumber+1,
                        upper = opts.currPage*opts.pageNumber;
                    if(upper>opts.dataTotal){
                        upper = opts.dataTotal;
                    }
                    if(!opts.dataTotal){
                        lower=0;
                    }
                    c = c.replace("{lower}", lower),
                    c = c.replace("{upper}", upper),
                    c = c.replace("{total}", opts.dataTotal ? opts.dataTotal : 0),
                    b.html(c),
                    a = b.html();
                }
            }
            return a;
        }
        // 创建XHR对象
        function createCORSRequest(method, url) {
          var xhr = new XMLHttpRequest();
          if ("withCredentials" in xhr) {
            // 针对Chrome/Safari/Firefox.
        	xhr.onreadystatechange=false;
            xhr.open(method, url, true);
          } else if (typeof XDomainRequest != "undefined") {
            // 针对IE
            xhr = new XDomainRequest();
            xhr.onreadystatechange=false;
            xhr.open(method, url);
          } else {
            // 不支持CORS
            xhr = null;
          }
          return xhr;
        }

        //IE8.IE9跨域请求兼容
        function makeCorsRequest(method,url,data) {
              url=url+"&"+data;
        	  var xhr = createCORSRequest(method, url);
              if (!xhr) {
                alert('CORS not supported');
                return;
              }

              // 回应处理
              xhr.onload = function() {
                var text = xhr.responseText;
                var obj=JSON.parse(text);
                //alert('Response from CORS request to ' + url);
                opts.ajax.ajaxStop(),
                responseHandle(obj),
                createPageBar(obj);
              };

              xhr.onerror = function() {
                alert('Woops, there was an error making the request.');
              };

              xhr.send();
        }

        function getPanelTipInfo() {
            var a = "";
            if (opts.panel.tipInfo_on) {
                var b = document.createElement("span");
                b = $(b);
                var c = b.text(opts.panel.tipInfo).text();
                if (-1 != c.indexOf("{input}")) {
                	if(opts.currPage==0){
                		var d = "<input type='text' value='1' >";
                	}else{
                		var d = "<input type='text' value='" + opts.currPage + "' >";
                	}
                    c = c.replace("{input}", d),
                    c = c.replace("{sumPage}",opts.pageCount),
                    b.html(c),
                    d = b.find(":text:first"),
                    d.css(opts.panel.tipInfo_css),
                    a = b.html()
                } else if (-1 != c.indexOf("{select}")) {
                    for (var e = document.createElement("select"), f = 1; parseInt(opts.pageCount) >= f; f++) {
                        var g = new Option(f, f);
                        e.options.add(g)
                    }
                    b.html("");
                    var h = c.substr(0, c.indexOf("{select}")),
                        i = c.substr(c.indexOf("{select}") + "{select}".length).replace("{sumPage}", opts.pageCount);
                        b.append(h),
                        b.append(e),
                        b.append(i),
                        a = b.html()
                    }
                }
                return a
            }
            function onRequest() {
            	//ie8 ie9 跨域请求兼容
            	/*if(navigator.userAgent.indexOf("MSIE 8.0")>0||navigator.userAgent.indexOf("MSIE 9.0")>0){
            		debug(opts.id),
                    debug("ajax\u8bf7\u6c42\u53c2\u6570\u5217\u8868:"),
                    debug(getParam()),
                    opts.ajax.on ? (opts.ajax.ajaxStart(),
                    		makeCorsRequest(opts.ajax.type,opts.ajax.url,getParam())
                            ) : createPageBar()
            	}else{*/
            			debug(opts.id),
                        debug("ajax\u8bf7\u6c42\u53c2\u6570\u5217\u8868:"),
                        debug(getParam()),
                        opts.ajax.on ? (opts.ajax.ajaxStart(),
                        $.ajax({
                            url: opts.ajax.url,
                            type: opts.ajax.type,
                            data: getParam(),
                            contentType: "application/x-www-form-urlencoded;utf-8",
                            async: !0,
                            cache: !1,
                            timeout: 6e4,
                            error: function() {
                                    //alert("\u8bbf\u95ee\u670d\u52a1\u5668\u8d85\u65f6\uff0c\u8bf7\u91cd\u8bd5\uff0c\u8c22\u8c22\uff01")
                                },
                            success: function(a) {
                                opts.ajax.ajaxStop(),
                                responseHandle(a),
                                createPageBar(a);
                            }
                        }
                                )
                                ) : createPageBar()
                     //}
                 }
                    function responseHandle(data) {
                        var pageCountId = opts.ajax.pageCountId, resultPageCount = 1;
                        switch (opts.ajax.dataType) {
                            case "json":
                                try {
                                    data = eval("(" + data + ")")
                                } catch (err) {
                            } finally {
                            resultPageCount = eval("data." + pageCountId);
                        }
                        break;
                            case "xml":
                                try {
                                    resultPageCount = $(data).find(pageCountId).text()
                                } catch (e) {
                                        debug("xml\u8fd4\u56de\u6570\u636e\u89e3\u6790\u9519\u8bef\uff0c\u4f7f\u7528\u9ed8\u8ba4\u7684pageCount=1"),
                                        resultPageCount = 1
                                    }
                                    break;
                                default:
                                    try {
                                        resultPageCount = $(data).find(":hidden[id='" + pageCountId + "']").val()
                                    } catch (e) {
                                    debug("html\u8fd4\u56de\u6570\u636e\u89e3\u6790\u9519\u8bef\uff0c\u4f7f\u7528\u9ed8\u8ba4\u7684pageCount=1"),
                                        resultPageCount = 1
                                }
                        }
                        debug(opts.id),
                                        debug("\u8fd4\u56de\u603b\u9875\u6570:" + resultPageCount),
                                        opts.pageCount = resultPageCount,
                                        opts.ajax.callback(data)
                    }
                    function createPageBar(data) {
                        var a = opts.panel.links;
                        if(opts.pageObj){
                            opts.pageCount = parseInt((eval("data."+opts.pageObj).total-1)/opts.pageNumber)+1;
                            opts.dataTotal = eval("data."+opts.pageObj).total;
                        }else{
                        	var totalCount=data.data!=null?data.data.total:1;
                        	opts.pageCount = parseInt((totalCount-1)/opts.pageNumber)+1;
                            opts.dataTotal = data.data&&data.data.totalCount;
                        }
                        opts.currPage = opts.currPage > opts.pageCount ? opts.pageCount : opts.currPage;
                        var b = opts.currPage,
                        c = parseInt(opts.pageCount),
                        d = parseInt(opts.pageNumber / 2),
                        e = opts.pageNumber, 
                        h= parseInt(opts.showPage);
                        j = parseInt(h/2);
                        f = "";
                        opts.panel.first_on && (f += 1 == b ? '<a readonly="readonly" paged="' + opts.panel.prev + '">' + opts.panel.first + "</a>" :  "<a href='" + a + "' paged='1'>" + opts.panel.first + "</a>"),
                        opts.panel.prev_on && (f += 1 == b ? '<a class="prev_btn" readonly="readonly" paged="' + opts.panel.prev + '">' + opts.panel.prev + "</a>" : "<a class='prev_btn' href='" + a + "' paged='" + (b - 1) + "'>" + opts.panel.prev + "</a>");
                        var g = lastPage = 1;
                        b=parseInt(b);
                        j=parseInt(j);
                        c=parseInt(c);
                        if(b==0){
                        	b=1;
                        }
                        if(c<=h){
                        	g=1;
                        	lastPage=c+1;
                        }else{
                        	if(b==1 || b<j){
                        		g=1;
                        		lastPage=h+1;
                        	}else if((b+j)<=c){
	                        	g=b-parseInt((h-1)/2);
	                        	lastPage=b+j+1;
                        	}else{
                        		g=c-h+1;
                        		lastPage=c+1;
                        	}
                        }
                        for (g; lastPage > g; g++)
                        	f += g == b ? '<a readonly="readonly" class="current" paged="' + g + '">' + g + "</a>" : "<a href='" + a + "' paged='" + g + "'>" + g + "</a>";
                        opts.panel.next_on && (f += b == c ? '<a class="next_btn" readonly="readonly" paged="' + opts.panel.next + '">' + opts.panel.next + "</a>" : "<a class='next_btn' href='" + a + "' paged='" + (b + 1) +"'>" + opts.panel.next + "</a>"),
                        opts.panel.last_on && (f += b == c ? '<a readonly="readonly" paged="' + opts.panel.next + '">' + opts.panel.last + "</a>" : "<a href='" + a + "' paged='" + c + "'>" + opts.panel.last + "</a>"),
                        f += getPanelTotalInfo(),f += getPanelTipInfo(), debug(opts.id),
                        debug("\u6700\u7ec8\u751f\u6210\u83dc\u5355\uff1a")
                        debug(f),
                        obj.html(f),
                        obj.children("select").val(opts.currPage),
                        obj.children("select").change(function() {
                            var a = parseInt($(this).children("option:selected").val());
                            opts.currPage = a, onRequest()
                        }),
                        obj.find(":text").keyup(function() {
                            var a = $(this),
                            b = $.trim($(this).val());
                            if (0 != b.length) {
                                var c = /^\+?[0-9][0-9]*$/; c.exec(b) || a.val(1)
                            } 
                        }),
                            obj.find(":text").keypress(function(a) {
                        var b = a.which; if (13 == b) {
                            var c = $.trim($(this).val());
                            c=c>opts.pageCount?opts.pageCount:c;
                            return c = c > 0 ? c : 1,
                            obj.children("a").unbind("click"), obj.children("a").each(function() { $(this).click(function() { return !1 }) }), opts.currPage = c, onRequest(),!1
                        } 
                    }), obj.children("a").each(function() {
                        var c = $(this);
                        c.click(function() {
                            if(c.attr("paged")=="" || c.attr("paged")==""){
                        		return;
                        	}
                            var a = parseInt(c.attr("paged"));
                            return a = a > 0 ? a : 1, c.children("a").unbind("click"),
                             c.children("a").each(function() { $(this).click(function() { return !1; }); }),
                            opts.currPage = a, 
                            opts.ajax.onClick(a), 
                            onRequest(), 
                            $(this).focus(), 
                            !1;
                        });
                    });
                } function debug(a) { opts.debug && $.fn.debug(a) } 
                var defaults = { 
            		currPage: 1, 
            		pageCount: 100, 
            		pageNumber: 10,
            		showPage:8,
                    dataTotal: 0,
            		cssStyle: "badoo", 
            		debug: !1, 
            		ajax: { 
            			on: !1, 
            			type: "POST", 
            			pageCountId: "data.pages",
            			url: "jsonTest.php", 
            			dataType: "json", 
            			param: !1, 
            			onClick: function() { return !1 }, 
            			ajaxStart: function() { return !1 }, 
            			ajaxStop: function() { return !1 }, 
            			callback: function() { return !1 } 
            		}, 
        			panel: { 
        				first: "\u9996\u9875", 
        				last: "\u5c3e\u9875", 
        				next: "",
        				prev: "",
        				first_on: !0, 
        				last_on: !0, 
        				next_on: !0, 
        				prev_on: !0, 
        				links: "#",
                        totalInfo_on: !1,
                        totalInfo: '<p class="total_info">当前为{lower}-{upper}条记录——总记录为{total}条</p>',
        				tipInfo_on: !1, 
        				tipInfo: "<span>&nbsp;&nbsp;\u8df3{currText}/{sumPage}\u9875</span>", 
        				tipInfo_css: { width: "22px" }, 
        				tipSelect_on: !1, 
        				tipSelect: "\u8df3\u8f6c\u5230{select} \u5171{sumPage}\u9875"
        				} 
        			}, 
    				opts = $.extend(!0, defaults, param); 
    				opts.id = obj.attr("id"), 
    				obj.addClass(opts.cssStyle), 
    				onRequest(); 
	                var method = {}; 
	                return method.id = opts.id, 
	                method.getPage = function() { return opts.currPage }, 
	                method.onReload = function() { debug("reload()"), onRequest() }, 
	                method.onLoad = function(a) { a && a instanceof Object && (debug(a), opts.currPage = 1, opts.ajax.param = a.param, onRequest()) }, 
	                method.jumpPage = function(a) { debug("jumpPage(" + a + ")"), a = 1 > a ? 1 : a, a = a > opts.pageCount ? opts.pageCount : a, opts.currPage = a, onRequest() }, 
	                method
            } 
    $.fn.myPagination = function(a) { return init(a, $(this)) }, 
    $.fn.debug = function(a) { window.console && window.console.log && console.log(a) } 
        })(jQuery);
                            