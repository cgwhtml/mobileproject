var u = navigator.userAgent;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var appVersion="";
//-----------------创建节点，存放页面传来的数据，前缀lanniuhJsBridge
$("body").append('<input type="hidden" class="lanniuhJsBridge_data" value="">');
// 回调隐藏数据节点
$("body").append('<input type="hidden" class="lanniuhJsBridge_backData">');


//容器支持后台版本触发节点
$("body").append('<div class="lanniuhJsBridge_basicVersion" style="display:none"></div>');
//获取用户信息触发节点
$("body").append('<div class="lanniuhJsBridge_userInfo" style="display:none"></div>');
//普通弹框触发节点
$("body").append('<div class="lanniuhJsBridge_a" style="display:none"></div>');
//超级弹框
$("body").append('<div class="lanniuhJsBridge_b" style="display:none"></div>');
//吐司
$("body").append('<div class="lanniuhJsBridge_d" style="display:none"></div>');
//返回上一页触发节点
$("body").append('<div class="lanniuhJsBridge_e" style="display:none"></div>');
//关闭当前页触发节点
$("body").append('<div class="lanniuhJsBridge_f" style="display:none"></div>');
//跳转url触发节点
$("body").append('<div class="lanniuhJsBridge_g" style="display:none"></div>');
//带参数跳转url触发节点
$("body").append('<div class="lanniuhJsBridge_h" style="display:none"></div>');
//日期选择器触发节点
$("body").append('<div class="lanniuhJsBridge_datePicker" style="display:none"></div>');
//时间日期选择器触发节点
$("body").append('<div class="lanniuhJsBridge_datePickerDateTime" style="display:none"></div>');
//时间选择器触发节点
$("body").append('<div class="lanniuhJsBridge_datePickerTime" style="display:none"></div>');
//自定义选择器触发节点
$("body").append('<div class="lanniuhJsBridge_customPicker" style="display:none"></div>');
//选择弹出项触发节点
$("body").append('<div class="lanniuhJsBridge_actionSheet" style="display:none"></div>');
//获取存储触发节点
$("body").append('<div class="lanniuhJsBridge_storageGet" style="display:none"></div>');
//设置存储触发节点
$("body").append('<div class="lanniuhJsBridge_storageSet" style="display:none"></div>');
//删除存储触发节点
$("body").append('<div class="lanniuhJsBridge_storageDelete" style="display:none"></div>');



setupWebViewJavascriptBridge(function(bridge) {
    // registerHandler回调方法创建节点
    //高级弹框回调创建节点
    $("body").append('<div class="lanniuhJsBridge_alertSuper_back" style="display:none"></div>');
    //日期选择器拨动回调创建节点
    $("body").append('<div class="lanniuhJsBridge_datePicker_back" style="display:none"></div>');
    //时间日期选择器拨动回调创建节点
    $("body").append('<div class="lanniuhJsBridge_datePickerDateTime_back" style="display:none"></div>');
    //时间选择器拨动回调创建节点
    $("body").append('<div class="lanniuhJsBridge_datePickerTime_back" style="display:none"></div>');
    //自定义选择器拨动回调创建节点
    $("body").append('<div class="lanniuhJsBridge_customPicker_back" style="display:none"></div>');
    //选择弹出项回调创建节点
    $("body").append('<div class="lanniuhJsBridge_actionSheet_back" style="display:none"></div>');


    // 注册回调方法
    // 高级弹框回调
    if(!isiOS){
        bridge.init(function (message, responseCallback) {
            var data = {
                'Javascript Responds': '测试中文!'
            };
            responseCallback(data);
        });
        window.WebViewJavascriptBridge.registerHandler('lanniuhAlertBack',function (data, responseCallback) {
            $(".lanniuhJsBridge_backData").val(data);
            $(".lanniuhJsBridge_alertSuper_back").click();
        });
    }else{
        bridge.registerHandler('lanniuhAlertBack',function (data, responseCallback) {
            $(".lanniuhJsBridge_backData").val(JSON.stringify(data))
            $(".lanniuhJsBridge_alertSuper_back").click();
        });
    }
    // 日期选择器拨动回调
    if(!isiOS){
        window.WebViewJavascriptBridge.registerHandler('lanniuhDatePickerDateChangeBack',function (data, responseCallback) {
            $(".lanniuhJsBridge_backData").val(data);
            $(".lanniuhJsBridge_datePicker_back").click();
        });
        window.WebViewJavascriptBridge.registerHandler('lanniuhDatePickerDatePickBack',function (data, responseCallback) {
            $(".lanniuhJsBridge_backData").val(data);
            $(".lanniuhJsBridge_datePicker_back").click();
        });
    }else{
        bridge.registerHandler('lanniuhDatePickerDateChangeBack',function (data, responseCallback) {
            $(".lanniuhJsBridge_backData").val(JSON.stringify(data))
            $(".lanniuhJsBridge_datePicker_back").click();
        });
        bridge.registerHandler('lanniuhDatePickerDatePickBack',function (data, responseCallback) {
            $(".lanniuhJsBridge_backData").val(JSON.stringify(data))
            $(".lanniuhJsBridge_datePicker_back").click();
        });
    }
    // 时间日期选择器拨动回调
    if(!isiOS){
        window.WebViewJavascriptBridge.registerHandler('lanniuhDatePickerDateTimeChangeBack',function (data, responseCallback) {
            $(".lanniuhJsBridge_backData").val(data);
            $(".lanniuhJsBridge_datePickerDateTime_back").click();
        });
        window.WebViewJavascriptBridge.registerHandler('lanniuhDatePickerDateTimePickBack',function (data, responseCallback) {
            $(".lanniuhJsBridge_backData").val(data);
            $(".lanniuhJsBridge_datePickerDateTime_back").click();
        });
    }else{
        bridge.registerHandler('lanniuhDatePickerDateTimeChangeBack',function (data, responseCallback) {
            $(".lanniuhJsBridge_backData").val(JSON.stringify(data))
            $(".lanniuhJsBridge_datePickerDateTime_back").click();
        });
        bridge.registerHandler('lanniuhDatePickerDateTimePickBack',function (data, responseCallback) {
            $(".lanniuhJsBridge_backData").val(JSON.stringify(data))
            $(".lanniuhJsBridge_datePickerDateTime_back").click();
        });
    }
    // 时间选择器拨动回调
    if(!isiOS){
        window.WebViewJavascriptBridge.registerHandler('lanniuhDatePickerTimeChangeBack',function (data, responseCallback) {
            $(".lanniuhJsBridge_backData").val(data);
            $(".lanniuhJsBridge_datePickerTime_back").click();
        });
        window.WebViewJavascriptBridge.registerHandler('lanniuhDatePickerTimePickBack',function (data, responseCallback) {
            $(".lanniuhJsBridge_backData").val(data);
            $(".lanniuhJsBridge_datePickerTime_back").click();
        });
    }else{
        bridge.registerHandler('lanniuhDatePickerTimeChangeBack',function (data, responseCallback) {
            $(".lanniuhJsBridge_backData").val(JSON.stringify(data))
            $(".lanniuhJsBridge_datePickerTime_back").click();
        });
        bridge.registerHandler('lanniuhDatePickerTimePickBack',function (data, responseCallback) {
            $(".lanniuhJsBridge_backData").val(JSON.stringify(data))
            $(".lanniuhJsBridge_datePickerTime_back").click();
        });
    }
    // 自定义选择器拨动回调
    if(!isiOS){
        window.WebViewJavascriptBridge.registerHandler('lanniuhCustomPickerChangeBack',function (data, responseCallback) {
            $(".lanniuhJsBridge_backData").val(data);
            $(".lanniuhJsBridge_customPicker_back").click();
        });
        window.WebViewJavascriptBridge.registerHandler('lanniuhCustomPickerPickBack',function (data, responseCallback) {
            $(".lanniuhJsBridge_backData").val(data);
            $(".lanniuhJsBridge_customPicker_back").click();
        });
    }else{
        bridge.registerHandler('lanniuhCustomPickerChangeBack',function (data, responseCallback) {
            $(".lanniuhJsBridge_backData").val(JSON.stringify(data))
            $(".lanniuhJsBridge_customPicker_back").click();
        });
        bridge.registerHandler('lanniuhCustomPickerPickBack',function (data, responseCallback) {
            $(".lanniuhJsBridge_backData").val(JSON.stringify(data))
            $(".lanniuhJsBridge_customPicker_back").click();
        });
    }
    // 弹出选择项拨动回调
    if(!isiOS){
        window.WebViewJavascriptBridge.registerHandler('lanniuhActionSheetBack',function (data, responseCallback) {
            $(".lanniuhJsBridge_backData").val(data);
            $(".lanniuhJsBridge_actionSheet_back").click();
        });
    }else{
        bridge.registerHandler('lanniuhActionSheetBack',function (data, responseCallback) {
            $(".lanniuhJsBridge_backData").val(JSON.stringify(data))
            $(".lanniuhJsBridge_actionSheet_back").click();
        });
    }



    //网页调用原生
    // 容器环境基本信息
    $("body").append('<div class="lanniuhJsBridge_phoneBasic"></div>');
    $(".lanniuhJsBridge_phoneBasic").hide();
    $(".lanniuhJsBridge_phoneBasic").click(function(){
        alert("基本信息")
        if(!isiOS){
            window.WebViewJavascriptBridge.callHandler('lanniuhBasicPhoneInfo',{} ,function(response) {
                alert(response)
            });
        }else{
            bridge.callHandler('lanniuhBasicPhoneInfo',function(response) {
                alert(JSON.stringify(response))
            });
        }
    });
    // 容器支持后台版本
    $(document).on('click','.lanniuhJsBridge_basicVersion',function(){
        // event.stopPropagation();
        if(!isiOS){
            window.WebViewJavascriptBridge.callHandler('lanniuhBasicVersion', {},function(response) {
                var versionData=JSON.parse(response);
                if(versionData.res==0){
                    appVersion=versionData.data.version;
                    $.alertNormal();
                }
            });
        }else{
            bridge.callHandler('lanniuhBasicVersion',function(response) {
                if(response.res==0){
                    appVersion=versionData.data.version;
                    $.alertNormal();
                }
            });
        }
    });
    //  获取用户信息
    $(".lanniuhJsBridge_userInfo").click(function(){
        if(!isiOS){
            window.WebViewJavascriptBridge.callHandler('lanniuhUserInfo',{} ,function(response) {
                alert(response)
            });
        }else{
            bridge.callHandler('lanniuhUserInfo',function(response) {
                alert(JSON.stringify(response))
            });
        }
    });
    //普通弹框
    $(document).on('click','.lanniuhJsBridge_a',function(){
        // var getData=JSON.parse($(".lanniuhJsBridge_alertNormal_data").val())
        var getData=JSON.parse($(".lanniuhJsBridge_data").val());
        if(!isiOS){
            window.WebViewJavascriptBridge.callHandler('lanniuhAlertNormal', getData, function(response) {
                alert(response)
            });
        }else{
            bridge.callHandler('lanniuhAlertNormal',getData, function(response) {});
        }
    });

    //超级弹框
    $(".lanniuhJsBridge_b").click(function(){
        // var getData=JSON.parse($(".lanniuhJsBridge_alertSuper_data").val())
        var getData=JSON.parse($(".lanniuhJsBridge_data").val());
        if(!isiOS){
            window.WebViewJavascriptBridge.callHandler('lanniuhAlertSuper',getData, function(response) {});
        }else{
            bridge.callHandler('lanniuhAlertSuper',getData,function(response){});
        }
    });

    //吐司
    $(".lanniuhJsBridge_d").click(function(){
        // var getData=JSON.parse($(".lanniuhJsBridge_makeToast_data").val())
        var getData=JSON.parse($(".lanniuhJsBridge_data").val());
        if(!isiOS){
            window.WebViewJavascriptBridge.callHandler('lanniuhMakeToast', getData, function(response) {});
        }else{
            bridge.callHandler('lanniuhMakeToast',getData, function(response) {});
        }
    });
    //返回上一页
    $(".lanniuhJsBridge_e").click(function(){
        if(!isiOS){
            window.WebViewJavascriptBridge.callHandler('lanniuhWebViewBack', function(response) {});
        }else{
            bridge.callHandler('lanniuhWebViewBack', function(response) {});
        }
    });
    //关闭当前页
    $(".lanniuhJsBridge_f").click(function(){
        if(!isiOS){
            window.WebViewJavascriptBridge.callHandler('lanniuhPCloseViewController', function(response) {});
        }else{
            bridge.callHandler('lanniuhPCloseViewController', function(response) {});
        }
    });
    //跳转url
    $(".lanniuhJsBridge_g").click(function(){
        // var getData=JSON.parse($(".lanniuhJsBridge_pushWithUrl_data").val())
        var getData=JSON.parse($(".lanniuhJsBridge_data").val());
        if(!isiOS){
            window.WebViewJavascriptBridge.callHandler('lanniuhPushWithUrl',getData,function(response) {});
        }else{
            bridge.callHandler('lanniuhPushWithUrl', function(response) {});
        }
    });
    //带参数跳转url
    $(".lanniuhJsBridge_h").click(function(){
        var getData=JSON.parse($(".lanniuhJsBridge_data").val());
        if(!isiOS){
            window.WebViewJavascriptBridge.callHandler('lanniuhPushWithPostParam',getData,function(response) {});
        }else{
            bridge.callHandler('lanniuhPushWithPostParam', function(response) {});
        }
    });
    //日期选择器
    $(".lanniuhJsBridge_datePicker").click(function(){
        var getData=JSON.parse($(".lanniuhJsBridge_data").val())
        if(!isiOS){
            window.WebViewJavascriptBridge.callHandler('lanniuhDatePickerDate',getData, function(response) {});
        }else{
            bridge.callHandler('lanniuhDatePickerDate',getData,function(response){});
        }
    });
    //时间日期选择器
    $(".lanniuhJsBridge_datePickerDateTime").click(function(){
        var getData=JSON.parse($(".lanniuhJsBridge_data").val())
        alert($(".lanniuhJsBridge_data").val())
        if(!isiOS){
            window.WebViewJavascriptBridge.callHandler('lanniuhDatePickerDateTime',getData, function(response) {});
        }else{
            bridge.callHandler('lanniuhDatePickerDateTime',getData,function(response){});
        }
    });
    //时间选择器
    $(".lanniuhJsBridge_datePickerTime").click(function(){
        var getData=JSON.parse($(".lanniuhJsBridge_data").val())
        if(!isiOS){
            window.WebViewJavascriptBridge.callHandler('lanniuhDatePickerTime',getData, function(response) {});
        }else{
            bridge.callHandler('lanniuhDatePickerTime',getData,function(response){});
        }
    });
    //自定义选择器
    $(".lanniuhJsBridge_customPicker").click(function(){
        var getData=JSON.parse($(".lanniuhJsBridge_data").val())
        if(!isiOS){
            window.WebViewJavascriptBridge.callHandler('lanniuhCustomPicker',getData, function(response) {});
        }else{
            bridge.callHandler('lanniuhCustomPicker',getData,function(response){});
        }
    });
    //选择弹出项
    $(".lanniuhJsBridge_actionSheet").click(function(){
        var getData=JSON.parse($(".lanniuhJsBridge_data").val())
        if(!isiOS){
            window.WebViewJavascriptBridge.callHandler('lanniuhActionSheetNormal',getData, function(response) {});
        }else{
            bridge.callHandler('lanniuhActionSheetNormal',getData,function(response){});
        }
    });
    //获取本地存储
    $(".lanniuhJsBridge_storageGet").click(function(){
        if(!isiOS){
            window.WebViewJavascriptBridge.callHandler('lanniuhStorageGet',{}, function(response) {
                alert(response)
            });
        }else{
            bridge.callHandler('lanniuhStorageGet',getData,function(response){});
        }
    });
    //设置本地存储
    $(".lanniuhJsBridge_storageSet").click(function(){
        var getData=JSON.parse($(".lanniuhJsBridge_data").val());
        if(!isiOS){
            window.WebViewJavascriptBridge.callHandler('lanniuhStorageSet',getData, function(response) {
                alert(response)
            });
        }else{
            bridge.callHandler('lanniuhStorageSet',getData,function(response){});
        }
    });
    //删除本地存储
    $(".lanniuhJsBridge_storageDelete").click(function(){
        var getData=JSON.parse($(".lanniuhJsBridge_data").val());
        if(!isiOS){
            window.WebViewJavascriptBridge.callHandler('lanniuhStorageDelete',getData, function(response) {});
        }else{
            bridge.callHandler('lanniuhStorageDelete',getData,function(response){});
        }
    });
})


// 初始化js桥
function setupWebViewJavascriptBridge(callback) {
    if(!isiOS){
        if (window.WebViewJavascriptBridge) {
            callback(WebViewJavascriptBridge);
        } else {
            document.addEventListener(
                'WebViewJavascriptBridgeReady'
                , function() {
                    callback(WebViewJavascriptBridge);
                },
                false
            );
        }
    }else{
        if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe);}, 0);
    }

}

var lanniuhJsBridge=(function($){
    //js桥
    // 当前容器环境基本信息
    $.phoneBasicInfo = function(){
        var version=2.15;
        // 检验方法是否符合app版本
        if(appVersion==""){
            $(".lanniuhJsBridge_basicVersion").click();
            return false;
        }
        if(version>appVersion){
            alert("暂不支持普通弹框");
            return false;
        }
        $(".lanniuhJsBridge_phoneBasic").click();
    };
    // 容器支持后台版本
    $.basicVersion = function(){
        $(".lanniuhJsBridge_basicVersion").click();
    };
    // 获取用户信息
    $.userInfo = function(){
        var version=2.15;
        // 检验方法是否符合app版本
        if(appVersion==""){
            $(".lanniuhJsBridge_basicVersion").click();
            return false;
        }
        if(version>appVersion){
            alert("暂不支持普通弹框");
            return false;
        }
        $(".lanniuhJsBridge_userInfo").click();
    };
    // 返回上一页
    $.webViewBack = function(){
        var version=2.15;
        // 检验方法是否符合app版本
        if(appVersion==""){
            $(".lanniuhJsBridge_basicVersion").click();
            return false;
        }
        if(version>appVersion){
            alert("暂不支持普通弹框");
            return false;
        }
        $(".lanniuhJsBridge_e").click();
    };
    // 关闭当前页
    $.closeView = function(){
        var version=2.15;
        // 检验方法是否符合app版本
        if(appVersion==""){
            $(".lanniuhJsBridge_basicVersion").click();
            return false;
        }
        if(version>appVersion){
            alert("暂不支持普通弹框");
            return false;
        }
        $(".lanniuhJsBridge_f").click();
    };
    // get跳转url
    $.pushWithUrl = function(datas){
        var version=2.15;
        // 检验方法是否符合app版本
        if(appVersion==""){
            $(".lanniuhJsBridge_basicVersion").click();
            return false;
        }
        if(version>appVersion){
            alert("暂不支持普通弹框");
            return false;
        }
        if(datas){
            $(".lanniuhJsBridge_data").val(JSON.stringify(datas));
            $(".lanniuhJsBridge_g").click();
        }else{
            alert("请传入地址")
        }
    };
    // 带参数跳转url
    $.pushWithPostParam = function(datas){
        var version=2.15;
        // 检验方法是否符合app版本
        if(appVersion==""){
            $(".lanniuhJsBridge_basicVersion").click();
            return false;
        }
        if(version>appVersion){
            alert("暂不支持普通弹框");
            return false;
        }
        if(datas){
            $(".lanniuhJsBridge_data").val(JSON.stringify(datas));
            $(".lanniuhJsBridge_h").click();
        }else{
            alert("请传入地址");
        }
    };
    // 普通弹框
    $.alertNormal = function(datas){
        var version=2.15;
        // 检验方法是否符合app版本
        if(appVersion==""){
            $(".lanniuhJsBridge_basicVersion").click();
            return false;
        }
        if(version>appVersion){
            alert("暂不支持普通弹框");
            return false;
        }
        $(".lanniuhJsBridge_data").val(JSON.stringify(datas));
        $(".lanniuhJsBridge_a").click();
    };
    // 超级弹框
    $.alertSuper = function(datas){
        var version=2.15;
        // 检验方法是否符合app版本
        if(appVersion==""){
            $(".lanniuhJsBridge_basicVersion").click();
            return false;
        }
        if(version>appVersion){
            alert("暂不支持高级弹框");
            return false;
        }
        if(!datas){

        }
        $(".lanniuhJsBridge_data").val(JSON.stringify(datas));
        $(".lanniuhJsBridge_b").click();
        $(".lanniuhJsBridge_alertSuper_back").unbind('click').click(function(){
            var data=JSON.parse($(".lanniuhJsBridge_backData").val());
            datas.success(data);
        });
    };
    // 吐司
    $.makeToast = function(datas){
        var version=2.16;
        // 检验方法是否符合app版本
        if(appVersion==""){
            $(".lanniuhJsBridge_basicVersion").click();
            return false;
        }
        if(version>appVersion){
            alert("暂不支持吐司");
            return false;
        }
        $(".lanniuhJsBridge_data").val(JSON.stringify(datas));
        $(".lanniuhJsBridge_d").click();
    };
    // 日期选择器
    $.datePicker = function(datas){
        var version=2.16;
        // 检验方法是否符合app版本
        if(appVersion==""){
            $(".lanniuhJsBridge_basicVersion").click();
            return false;
        }
        if(version>appVersion){
            alert("暂不支持日期选择器");
            return false;
        }
        $(".lanniuhJsBridge_data").val(JSON.stringify(datas));
        $(".lanniuhJsBridge_datePicker").click();
        $(".lanniuhJsBridge_datePicker_back").unbind('click').click(function(){
            var data=JSON.parse($(".lanniuhJsBridge_backData").val());
            datas.success(data);
        });
    };
    // 时间日期选择器
    $.datePickerDateTime = function(datas){
        var version=2.16;
        // 检验方法是否符合app版本
        if(appVersion==""){
            $(".lanniuhJsBridge_basicVersion").click();
            return false;
        }
        if(version>appVersion){
            alert("暂不支持时间日期选择器");
            return false;
        }
        $(".lanniuhJsBridge_data").val(JSON.stringify(datas));
        $(".lanniuhJsBridge_datePickerDateTime").click();
        $(".lanniuhJsBridge_datePickerDateTime_back").unbind('click').click(function(){
            var data=JSON.parse($(".lanniuhJsBridge_backData").val());
            datas.success(data);
        });
    };
    // 时间选择器
    $.datePickerTime = function(datas){
        var version=2.16;
        // 检验方法是否符合app版本
        if(appVersion==""){
            $(".lanniuhJsBridge_basicVersion").click();
            return false;
        }
        if(version>appVersion){
            alert("暂不支持时间选择器");
            return false;
        }
        $(".lanniuhJsBridge_data").val(JSON.stringify(datas));
        $(".lanniuhJsBridge_datePickerTime").click();
        $(".lanniuhJsBridge_datePickerTime_back").unbind('click').click(function(){
            var data=JSON.parse($(".lanniuhJsBridge_backData").val());
            datas.success(data);
        });
    };
    // 自定义选择器
    $.customPicker = function(datas){
        var version=2.16;
        // 检验方法是否符合app版本
        if(appVersion==""){
            $(".lanniuhJsBridge_basicVersion").click();
            return false;
        }
        if(version>appVersion){
            alert("暂不支持自定义选择器");
            return false;
        }
        $(".lanniuhJsBridge_data").val(JSON.stringify(datas));
        $(".lanniuhJsBridge_customPicker").click();
        $(".lanniuhJsBridge_customPicker_back").unbind('click').click(function(){
            var data=JSON.parse($(".lanniuhJsBridge_backData").val());
            datas.success(data);
        });
    };
    // 选择弹出项
    $.actionSheet = function(datas){
        var version=2.16;
        // 检验方法是否符合app版本
        if(appVersion==""){
            $(".lanniuhJsBridge_basicVersion").click();
            return false;
        }
        if(version>appVersion){
            alert("暂不支持选择弹出项");
            return false;
        }
        $(".lanniuhJsBridge_data").val(JSON.stringify(datas));
        $(".lanniuhJsBridge_actionSheet").click();
        $(".lanniuhJsBridge_actionSheet_back").unbind('click').click(function(){
            var data=JSON.parse($(".lanniuhJsBridge_backData").val());
            datas.success(data);
        });
    };
    // 获取存储
    $.storageGet = function(datas){
        var version=2.16;
        // 检验方法是否符合app版本
        if(appVersion==""){
            $(".lanniuhJsBridge_basicVersion").click();
            return false;
        }
        if(version>appVersion){
            alert("暂不支持选择本地存储");
            return false;
        }
        $(".lanniuhJsBridge_data").val(JSON.stringify(datas));
        $(".lanniuhJsBridge_storageGet").click();
    };
    // 设置存储
    $.storageSet = function(datas){
        var version=2.16;
        // 检验方法是否符合app版本
        if(appVersion==""){
            $(".lanniuhJsBridge_basicVersion").click();
            return false;
        }
        if(version>appVersion){
            alert("暂不支持选择本地存储");
            return false;
        }
        $(".lanniuhJsBridge_data").val(JSON.stringify(datas));
        $(".lanniuhJsBridge_storageSet").click();
    };
    // 删除存储
    $.storageDelete = function(datas){
        var version=2.16;
        // 检验方法是否符合app版本
        if(appVersion==""){
            $(".lanniuhJsBridge_basicVersion").click();
            return false;
        }
        if(version>appVersion){
            alert("暂不支持选择本地存储");
            return false;
        }
        $(".lanniuhJsBridge_data").val(JSON.stringify(datas));
        $(".lanniuhJsBridge_storageDelete").click();
    };
    return $;
})(jQuery);
