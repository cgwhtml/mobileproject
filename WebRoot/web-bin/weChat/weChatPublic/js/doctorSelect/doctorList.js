/**
 * Created by CGT on 2017/7/5.
 */
var LOCALHOST_URL=window.location.origin;
var PORT=window.HUGPAGE_CONFIG.PORT;
var query=getRequest();
var hospCode=sessionStorage.getItem("hospCode");
var usId=sessionStorage.getItem("usId");
var accessToken=sessionStorage.getItem("accessToken");
var deptCode=query.deptcode;
var deptName=decodeURI(query.deptName);
var staffName=decodeURI(query.staffName);
var da;
var time_arr=[];
$(function(){
    console.log(query);
    console.log(hospCode);
    console.log(usId);
    console.log(accessToken);
    console.log(deptName);
    console.log(staffName);
    firstShow();
    //点击日期
    $("body").on("tap",".single_list ul li",function(event){
        var $this=$(this);
        $this.addClass("active").siblings("li").removeClass("active");
        $(".all_list").removeClass("active");
        var date=$this.find("input").val();
        $.ajax({
            on: true,
            type:"get",
            url: LOCALHOST_URL+'/web-bin/m/weChat/WeChatPublic/get_doctorList_data?hospCode='+hospCode+"&deptCode="+deptCode+"&schDate="+date+"&pageNumber=1&pageSize=10",
            dataType:"json",
            success: function(data){
                console.log(data);
                if(data.data&&data.res==0){
                    CallBack(data);
                }
            }
        });
        event.stopPropagation();
    });
    //点击全部
    $(".all_list").click(function(event){
        $(this).addClass("active");
        $(".single_list ul li").removeClass("active");
        $.ajax({
            on: true,
            type:"get",
            url: LOCALHOST_URL+'/web-bin/m/weChat/WeChatPublic/get_doctorList_data?hospCode='+hospCode+"&deptCode="+deptCode+"&pageNumber=1&pageSize=10",
            dataType:"json",
            success: function(data){
                console.log(data);
                if(data.data&&data.res==0){
                    CallBack(data);
                }
            }
        });
        event.stopPropagation();
    });
    // 点击医生跳转
    $("body").on("tap",".content ul li",function(event){
        var $this=$(this);
        var staffCode=$this.find("input").val();
        var staffName=$this.find(".staffName").text();
        var titleName=$this.find(".titleName").text();
        console.log(staffName);
        console.log(titleName);
        if($(".all_list").hasClass("active")){
            location.href = LOCALHOST_URL+"/web-bin/m/weChat/WeChatPublic/to_appointment_page?deptCode="+deptCode+"&staffCode="+staffCode+"&staffName="+staffName+"&titleName="+titleName+"&deptName="+deptName;
        }else if($(".single_list ul li").hasClass("active")){
            var schDate=$(".single_list li.active").find("input").val();
            location.href = LOCALHOST_URL+"/web-bin/m/weChat/WeChatPublic/to_appointment_page?deptCode="+deptCode+"&staffCode="+staffCode+"&schDate="+schDate+"&staffName="+staffName+"&titleName="+titleName+"&deptName="+deptName;
        }
        event.stopPropagation();
    });
    //点击普通门诊
    $("body").on("tap",".normalSch",function(event){
        location.href = LOCALHOST_URL+"/web-bin/m/weChat/WeChatPublic/to_appointment_page?deptCode="+deptCode+"&deptName="+deptName;
        event.stopPropagation();
    });
});
function firstShow(){
    //获取列表
    $.ajax({
        on: true,
        type:"get",
        url: LOCALHOST_URL+'/web-bin/m/weChat/WeChatPublic/get_doctorList_data?hospCode='+hospCode+"&deptCode="+deptCode+"&pageNumber=1&pageSize=10",
        dataType:"json",
        success: function(data){
            console.log(data);
            if(data.data&&data.res==0){
                CallBack(data);
                da=data.time;
                getTime();
                console.log(time_arr);
                Callback2();
            }
        }
    });
}
function CallBack(data){
    console.log("以下是普通门诊名字");
    console.log(deptName);
    $(".content").setTemplateElement("content_temp").processTemplate(data.data.pageInfo.result);
    if(data.data.hasNormalSch){
        $(".normal_deptName").text(deptName);
        $(".normalSch").show();
    }else{
        $(".normalSch").hide();
    }
}
function GetDateStr(da,AddDayCount){
    var da = (da.replace(/-/g, "/"));
    var dd = new Date(da);
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y=dd.getFullYear();
    var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
    var day= dd.getDate()<10?"0"+dd.getDate():dd.getDate(); //获取当前几号，不足10补0
    var date=y+"-"+m+"-"+day;
    var week=dd.getDay();
        if(week==0){
            week="日";
        }else if(week==1){
            week="一";
        }else if(week==2){
            week="二";
        }
        else if(week==3){
            week="三";
        }
        else if(week==4){
            week="四";
        }
        else if(week==5){
            week="五";
        }
        else if(week==6){
            week="六";
        }
    var obj={day:day,week:week,date:date};
    time_arr.push(obj);
    return time_arr;
}
function getTime(){
    for(var i=1;i<=7;i++){
        GetDateStr(da,i);
    }
    return time_arr;
}
function Callback2(){
    $(".single_list").setTemplateElement("single_temp").processTemplate(time_arr);
}
