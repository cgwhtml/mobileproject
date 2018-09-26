/*
 * @author xyz
 * @date 20170526
 */
var qs = require('querystring'),
	url=require('url'),
	parseURL = require('url').parse;
/*var partnerType=0;
var headers={
   	'partnerType':'0',
   	//'usId':'c9c5a1408f3948b7b0a141e245325d8e',//cf3a1d1f4a01483684a8d805843fa9c9//153ce6c2d52f43849b46d721af35118f--认证//1ef2997c32884772bbce714e3aa64d7d
   	//'accessToken':'7216d83f550743e983462104b89edbb8',//ae0abfff8a40403b9e829cf011895ba3//bf76ebf8dd0b4d3b9aaa1238de96cb9e//cdba38f6ff5c4680b4dfd49607e2f688
   	'Content-Type':'application/json;charset=utf-8',
};*/
/*
 * 
 * 母子健康手册阅读模块
 * 
 * */
exports.to_menu_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/basic/menu.html');//跳转到阅读页面菜单页
};
exports.to_readWrap_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/basic/read_wrap.html');//跳转到阅读模块外壳页面
};
exports.to_read_index_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/basic/index.html');//基础篇
};
exports.to_read_basicInfo_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/basic/basicInfo.html');
};
exports.to_read_bm1_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/basic/message_1.html');
};
exports.to_read_bm2_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/basic/message_2.html');
};
exports.to_read_beforeMater0_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/beforeMater/beforeMater_0.html');//孕前篇
};
exports.to_read_beforeMater1_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/beforeMater/beforeMater_1.html');
};
exports.to_read_beforeMater2_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/beforeMater/beforeMater_2.html');
};
exports.to_read_beforeMater3_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/beforeMater/beforeMater_3.html');
};
exports.to_read_beforeMater4_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/beforeMater/beforeMater_4.html');
};
exports.to_read_beforeMater5_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/beforeMater/beforeMater_5.html');
};
exports.to_read_beforeMater6_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/beforeMater/beforeMater_6.html');
};
exports.to_read_beforeMater7_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/beforeMater/beforeMater_7.html');
};
exports.to_read_beforeMater8_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/beforeMater/beforeMater_8.html');
};
exports.to_read_beforeMater9_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/beforeMater/beforeMater_9.html');
};
exports.to_read_beforeMater10_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/beforeMater/beforeMater_10.html');
};
exports.to_read_beforeMater11_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/beforeMater/beforeMater_11.html');
};
exports.to_read_beforeMater12_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/beforeMater/beforeMater_12.html');
};
exports.to_read_maternity0_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_0.html');//孕产篇
};
exports.to_read_maternity1_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_1.html');
};
exports.to_read_maternity2_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_2.html');
};
exports.to_read_maternity3_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_3.html');
};
exports.to_read_maternity4_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_4.html');
};
exports.to_read_maternity5_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_5.html');
};
exports.to_read_maternity6_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_6.html');
};
exports.to_read_maternity7_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_7.html');
};
exports.to_read_maternity8_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_8.html');
};
exports.to_read_maternity9_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_9.html');
};
exports.to_read_maternity10_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_10.html');
};
exports.to_read_maternity11_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_11.html');
};
exports.to_read_maternity12_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_12.html');
};
exports.to_read_maternity13_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_13.html');
};
exports.to_read_maternity14_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_14.html');
};
exports.to_read_maternity15_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_15.html');
};
exports.to_read_maternity16_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_16.html');
};
exports.to_read_maternity17_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_17.html');
};
exports.to_read_maternity18_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_18.html');
};
exports.to_read_maternity19_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_19.html');
};
exports.to_read_maternity20_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_20.html');
};
exports.to_read_maternity21_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_21.html');
};
exports.to_read_maternity22_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_22.html');
};
exports.to_read_maternity23_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_23.html');
};
exports.to_read_maternity24_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_24.html');
};
exports.to_read_maternity25_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_25.html');
};
exports.to_read_maternity26_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_26.html');
};
exports.to_read_maternity27_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_27.html');
};
exports.to_read_maternity28_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_28.html');
};
exports.to_read_maternity29_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_29.html');
};
exports.to_read_maternity30_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_30.html');
};
exports.to_read_maternity31_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_31.html');
};
exports.to_read_maternity32_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_32.html');
};
exports.to_read_maternity33_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_33.html');
};
exports.to_read_maternity34_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_34.html');
};
exports.to_read_maternity35_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_35.html');
};
exports.to_read_maternity36_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/maternity/maternity_36.html');
};
exports.to_read_child0_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_0.html');//儿童篇
};
exports.to_read_child1_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_1.html');
};
exports.to_read_child2_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_2.html');
};
exports.to_read_child3_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_3.html');
};
exports.to_read_child4_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_4.html');
};
exports.to_read_child5_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_5.html');
};
exports.to_read_child6_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_6.html');
};
exports.to_read_child7_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_7.html');
};
exports.to_read_child8_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_8.html');
};
exports.to_read_child9_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_9.html');
};
exports.to_read_child10_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_10.html');//11页面重复，跳过
};
exports.to_read_child12_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_12.html');
};
exports.to_read_child13_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_13.html');
};
exports.to_read_child14_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_14.html');
};
exports.to_read_child15_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_15.html');
};
exports.to_read_child16_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_16.html');
};
exports.to_read_child17_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_17.html');
};
exports.to_read_child18_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_18.html');
};
exports.to_read_child19_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_19.html');
};
exports.to_read_child20_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_20.html');
};
exports.to_read_child21_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_21.html');
};
exports.to_read_child22_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_22.html');
};
exports.to_read_child23_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_23.html');
};
exports.to_read_child24_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_24.html');
};
exports.to_read_child25_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_25.html');
};
exports.to_read_child26_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_26.html');
};
exports.to_read_child27_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_27.html');
};
exports.to_read_child28_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_28.html');
};
exports.to_read_child29_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_29.html');
};
exports.to_read_child30_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_30.html');
};
exports.to_read_child31_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_31.html');
};
exports.to_read_child32_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_32.html');
};
exports.to_read_child33_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_33.html');
};
exports.to_read_child34_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_34.html');
};
exports.to_read_child35_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_35.html');
};
exports.to_read_child36_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_36.html');
};
exports.to_read_child37_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_37.html');
};
exports.to_read_child38_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_38.html');
};
exports.to_read_child39_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_39.html');
};
exports.to_read_child40_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_40.html');
};
exports.to_read_child41_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_41.html');
};
exports.to_read_child42_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_42.html');
};
exports.to_read_child43_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_43.html');
};
exports.to_read_child44_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_44.html');
};
exports.to_read_child45_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_45.html');
};
exports.to_read_child46_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_46.html');
};
exports.to_read_child47_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_47.html');
};
exports.to_read_child48_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_48.html');
};
exports.to_read_child49_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_49.html');
};
exports.to_read_child50_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_50.html');
};
exports.to_read_child51_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/child/child_51.html');
};
exports.to_read_prevent0_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/prevent/index.html');//预防接种篇
};
exports.to_read_prevent1_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/prevent/prevent_1.html');
};
exports.to_read_prevent2_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/prevent/prevent_2.html');
};
exports.to_read_prevent3_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/prevent/prevent_3.html');
};
exports.to_read_prevent4_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/prevent/prevent_4.html');
};
exports.to_read_prevent5_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/prevent/prevent_5.html');
};
exports.query_readIndex_data = function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/readingPage/1000","获取阅读篇封面信息接口调用",null,headers);//获取阅读篇封面信息
};
exports.query_basicInfo_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/readingPage/1001", "获取阅读基本信息页面",null,headers);//获取阅读基本信息
};
exports.query_readHealthRecord_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/readingPage/1002", "获取4~7月或8~10月健康检查记录",null,headers);//获取4~7月或8~10月健康检查记录
};
exports.query_readAfter42DoctorResearch_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/readingPage/1003", "获取产后42天医生检查表",null,headers);//获取产后42天医生检查表
};
exports.query_readOneMonthRecord_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/readingPage/1010", "获取一个月记录",null,headers);//获取一个月记录
};
exports.query_readThreeMonthRecord_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/readingPage/1011", "获取三个月记录",null,headers);//获取三个月记录
};
exports.query_readSixMonthRecord_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/readingPage/1012", "获取六个月记录",null,headers);//获取六个月记录
};
exports.query_readEightMonthRecord_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/readingPage/1013", "获取八个月记录",null,headers);//获取八个月记录
};
exports.query_readBabyTeethRecord_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/readingPage/1027", "获取宝宝出牙记录",null,headers);//获取宝宝出牙记录
};
exports.query_readOneYearRecord_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/readingPage/1014", "获取一岁记录",null,headers);//获取一岁记录
};
exports.query_readOneYearSixMonthRecord_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/readingPage/1015", "获取一岁六个月记录",null,headers);//获取一岁六个月记录
};
exports.query_readTwoYearRecord_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/readingPage/1016", "获取两岁记录",null,headers);//获取两岁记录
};
exports.query_readTwoYearSixMonthRecord_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/readingPage/1017", "获取两岁六个月记录",null,headers);//获取两岁六个月记录
};
exports.query_readThreeYearRecord_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/readingPage/1018", "获取三岁记录",null,headers);//获取三岁记录
};
exports.query_readFourYearRecord_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/readingPage/1019", "获取四岁记录",null,headers);//获取四岁记录
};
exports.query_readFiveYearRecord_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/readingPage/1020", "获取五岁记录",null,headers);//获取五岁记录
};
exports.query_readSixYearRecord_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/readingPage/1021", "获取六岁记录",null,headers);//获取六岁记录
};
exports.query_readBabyBirthRecord_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/readingPage/1023", "获取宝宝出生记录",null,headers);//获取宝宝出生记录
};
exports.query_readNewBabyEarlyRearingRecord_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/readingPage/1024", "获取新生儿早期育儿记录",null,headers);//获取新生儿早期育儿记录
};
exports.query_readNewBabyEarlyVaccinum_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/readingPage/1025", "获取新生儿早期育儿记录(疫苗与筛选)",null,headers);//获取新生儿早期育儿记录(疫苗与筛选)
};
exports.query_readNewBabyEarlyHealthRecord_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/readingPage/1026", "获取新生儿早期健康检查记录",null,headers);//获取新生儿早期健康检查记录
};
exports.query_readBabyBrand_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/readingPage/1028", "获取宝宝印记",null,headers);//获取宝宝印记记录
};
// 四川母子健康手册
exports.to_sixQuestion_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/siChuanProvince/sixQuestion.html');//跳转到母子健康手册六问页面
};
exports.to_sixQuestion1_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/siChuanProvince/sixQuestion1.html');//跳转到母子健康手册六问页面第二页
};
exports.to_siChuanPlicy_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/siChuanProvince/siChuanPolicy.html');//跳转到四川母子健康手册政策与项目第一页
};
exports.to_siChuanPlicy1_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/siChuanProvince/siChuanPolicy1.html');//跳转到四川母子健康手册政策与项目第二页
};
exports.to_siChuanPlicy2_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/siChuanProvince/siChuanPolicy2.html');//跳转到四川母子健康手册政策与项目第三页
};
/*
 * 
 * 母子健康手册填写模块
 * 
 * */
exports.to_start_route = function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var partnerType=query.urlType==1 ? '7' : typeof query.partnerType!="undefined" ? query.partnerType : "0";//微信和其他登陆调用的接口不一样
    var headers={
        'partnerType':partnerType,
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8',
    };
    query =JSON.stringify(query);
    var _this=this;
    this.postAjax("/hug-web/r/maternalchildbook/healthBookPage/1000","判断母子健康手册是否创建接口调用",query,headers,null,sfn);
    function sfn(data){
        data=JSON.parse(data);
        if(data.res==0){
            if(data.data&&data.data.length>0){
                _this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/basic/allNewBook.html');//进入缩略图页面
            }else{
                _this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/basic/addBook.html');//跳转到新建手册页面
            }
        }else{
            _this.render('../../web-bin/mobile/followup/maternalChild/handBook/read/basic/read_wrap.html');//跳转到阅读模块外壳页面
        }
    }
};
exports.query_handBookList_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    var headers=query_header_data(this.req);
    this.postAjax("/hug-web/r/maternalchildbook/healthBookPage/1000","获取母子健康手册列表",query,headers);

};
exports.to_addBook_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/basic/addBook.html');//跳转到新建手册页面
};
exports.to_whetherLink_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/basic/whetherLink.html');//跳转到是否授权/跳过
};
exports.query_isCertify_data = function(){
    var headers=query_header_data(this.req);
	this.postAjax("/hug-web/r/maternalchildbook/healthBookPage/1001","判断用户是否已经认证",null,headers);//判断用户是否认证
};
exports.to_addCertify_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/basic/addCertify.html');//跳转到用户点击认证页面
};
exports.to_fastIdentification_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/basic/fastIdentification.html');//跳转到认证信息填写页面
};
exports.query_userInfoByHugId_data = function(){
    var headers=query_header_data(this.req);
    this.postAjax("/hug-web/r/user/1025","获取关联医院信息",null,headers);//根据hugId获取蓝牛用户信息
};
exports.submit_fastIdentification_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/user/1027","快速认证接口调用",query,headers);//快速认证接口调用
    });
};
exports.to_linkHosp_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/basic/linkHosp.html');//跳转到关联医院页面
};
exports.query_hospConfig_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/progestationPage/1003", "获取授权医院的保存信息",null,headers);//获取授权医院的保存信息
};
exports.to_chooseHos_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/basic/choseHos.html');//跳转到选择医院页面
};
exports.query_chooseHos_data = function(){
    var headers=query_header_data(this.req);
    this.postAjax("/hug-web/r/hos/1004","获取配置的医院信息列表",null,headers);//获取配置的医院信息列表
};
exports.submit_hospInfo_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query.hospInfoList&&(query.hospInfoList=JSON.parse(query.hospInfoList));
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/healthBookPage/1002","授权医院保存接口调用",query,headers);//授权医院保存方法
    });
};
exports.to_pBasicInfo_page = function(){
	this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/beforeMater/basicInfo_parent.html');//跳转到备孕爸爸妈妈基本情况填写页面
};
exports.submit_parentMsg_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query.hospInfoList&&(query.hospInfoList=JSON.parse(query.hospInfoList));
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/progestationPage/1000","上传备孕父母基本信息接口调用",query,headers);
    });
};
exports.to_beforeMater_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/beforeMater/beforeMater100.html');//跳转到孕前篇页面
};
exports.query_beforeMaterPercent_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/healthBookPage/1004", "获取孕前信息填写百分比",null,headers);//获取孕前信息填写百分比
};
exports.update_parentMsg_data = function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/progestationPage/1002","更新备孕父母信息接口",query,headers);//更新备孕父母信息
    });
};
exports.query_parentMsg_data = function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/progestationPage/1001", "回显备孕父母信息接口",null,headers);//回显备孕父母信息
};
exports.query_maternityStatus_data = function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/healthBookPage/1003", "判断是否处于孕产期接口",null,headers);//判断是否在孕产期,孕前，还是儿童
};
exports.query_statistics_data = function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/healthBookPage/1006", "统计阅读量",null,headers);//统计阅读量
};
exports.to_sweetTime_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/beforeMater/beforeMater210.html');//跳转到孕前篇页面
};
exports.submit_sweetTime_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/pregnancyPage/1000","上传甜蜜时刻信息接口调用",query,headers);//甜蜜时刻信息保存
    });
};
exports.update_sweetTime_data = function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/pregnancyPage/1002","更新甜蜜时刻信息接口",query,headers);//更新甜蜜时刻信息
    });
};
exports.query_sweetTime_data = function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/pregnancyPage/1001", "回显甜蜜时刻接口",null,headers);//回显甜蜜时刻信息
};
exports.to_matherMsg_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/beforeMater/beforeMater220.html');//跳转到准妈妈基本信息页面
};
exports.submit_mather_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/pregnancyPage/1003","上传准妈妈工作情况接口调用",query,headers);//准妈妈工作情况保存
    });
};
exports.query_mather_data = function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/pregnancyPage/1004", "回显准妈妈工作情况",null,headers);//准妈妈工作情况回显
};
exports.update_mather_data = function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/pregnancyPage/1005","更新准妈妈工作情况接口",query,headers);//准妈妈工作情况更新
    });
};
exports.query_maternityPercent_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/healthBookPage/1005", "获取孕产信息填写百分比",null,headers);//获取孕产信息填写百分比
};
exports.to_oneThreePregnantRecord_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/beforeMater/beforeMater260.html');//跳转到孕1~3月自我记录页面
};
exports.submit_oneThreePregnantRecord_data =function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/pregnancyPage/1018","上传孕1~3月自我记录信息接口调用",query,headers);//孕1~3月自我记录保存
    });
};
exports.query_oneThreePregnantRecord_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/pregnancyPage/1019", "获取孕1~3月自我记录信息",null,headers);//孕1~3月自我记录回显
};
exports.update_oneThreePregnantRecord_data = function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/pregnancyPage/1020","更新孕1~3月自我记录信息",query,headers);//孕1~3月自我记录更新
    });
};
exports.to_weightSelfTest_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/beforeMater/beforeMater230.html');//跳转到孕期体重自测页面
};
exports.query_weightSelfTest_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/pregnancyPage/1007", "获取孕期体重自测信息",null,headers);//孕期体重自测回显
};
exports.to_addWeightSelfTest_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/beforeMater/beforeMater231.html');//跳转到新增孕期体重自测页面
};
exports.submit_addWeightSelfTest_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/pregnancyPage/1006","上传新增孕期体重自测接口调用",query,headers);//新增孕期体重自测保存
    });
};
exports.query_count_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/pregnancyPage/1053", "自动计算出得出和上周比体重增长",null,headers);//自动计算出得出和上周比体重增长
};
exports.query_simplyWeight_record_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/pregnancyPage/1008", "回显单条孕期体重自测",null,headers);//单条孕期体重自测回显
};
exports.update_simplyWeight_record_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/pregnancyPage/1009","主键id更新单条体重自测记录",query,headers);//主键id更新单条体重自测记录
    });
};
exports.to_quickening_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/beforeMater/beforeMater240.html');//跳转到胎动记录页面
};
exports.query_quickening_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/pregnancyPage/1011", "回显胎动记录列表",null,headers);//胎动记录列表回显
};
exports.to_addQuickening_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/beforeMater/beforeMater241.html');//跳转到新增胎动记录页面
};
exports.submit_simplyQuickening_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/pregnancyPage/1010","上传一个新增胎动记录接口调用",query,headers);//一个新增胎动记录保存
    });
};
exports.update_simplyQuickening_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/pregnancyPage/1013","胎动记录单条更新",query,headers);//胎动记录单条更新
    });
};
exports.query_simplyQuickening_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/pregnancyPage/1012", "回显单条胎动记录",null,headers);//单条胎动记录回显
};
exports.to_classRecord_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/beforeMater/beforeMater250.html');//跳转到听课记录页面
};
exports.query_classRecord_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/pregnancyPage/1015", "回显听课记录列表",null,headers);//听课记录列表回显
};
exports.to_addClassRecord_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/beforeMater/beforeMater251.html');//跳转到新增听课记录页面
};
exports.submit_addClassRecord_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/pregnancyPage/1014","上传一个听课记录接口调用",query,headers);//一个听课记录保存
    });
};
exports.update_addClassRecord_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/pregnancyPage/1017","听课记录单条更新",query,headers);//听课记录单条更新
    });
};
exports.query_simplyClassRecord_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/pregnancyPage/1016", "回显单条听课记录列表",null,headers);//单条听课记录列表回显
};
exports.to_oneThreePregnantHealthRecord_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/beforeMater/beforeMater270.html');//跳转到孕1~3月健康检查记录页面
};
exports.query_oneThreePregnantHealthRecord_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/pregnancyPage/1022", "回显孕1~3月健康检查记录",null,headers);//孕1~3月健康检查记录回显
};
exports.submit_oneThreePregnantHealthRecord_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/pregnancyPage/1021","上传孕1~3月健康检查记录",query,headers);//孕1~3月健康检查记录保存
    });
};
exports.update_oneThreePregnantHealthRecord_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/pregnancyPage/1023","孕1~3月健康检查记录更新",query,headers);//孕1~3月健康检查记录更新
    });
};
exports.to_fourSevenSelfRecord_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/beforeMater/beforeMater280.html');//跳转到孕4~7月自我记录页面
};
exports.submit_fourSevenSelfRecord_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/pregnancyPage/1024","上传孕4~7月自我记录",query,headers);//孕4~7月自我记录保存
    });
};
exports.query_fourSevenSelfRecord_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/pregnancyPage/1025", "回显孕4~7月自我记录",null,headers);//孕4~7月自我记录回显
};
exports.update_fourSevenSelfRecord_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/pregnancyPage/1026","更新孕4~7月自我记录",query,headers);//孕4~7月自我记录更新
    });
};
exports.to_fourTenHealthRecord_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/beforeMater/beforeMater290.html');//跳转到孕4~10月健康检查记录页面
};
exports.to_addFourTenHealthRecord_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/beforeMater/beforeMater291.html');//跳转到新增孕4~10月健康检查记录页面
};
exports.query_fourTenHealthRecord_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/pregnancyPage/1030", "回显孕4~10月健康检查记录",null,headers);//孕4~10月健康检查记录回显
};
exports.query_simplyFourTenHealthRecord_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/pregnancyPage/1031", "回显单条孕4~10月健康检查记录",null,headers);//单条孕4~10月健康检查记录回显
};
exports.submit_simplyFourTenHealthRecord_data=function(){//有数组
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query.fetalHeartFetusPosition&&(query.fetalHeartFetusPosition=JSON.parse(query.fetalHeartFetusPosition));
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/pregnancyPage/1028","保存孕4~10月健康检查记录",query,headers);//4~10月健康检查记录保存
    });
};
exports.update_simplyFourTenHealthRecord_data=function(){//有数组
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query.fetalHeartFetusPosition&&(query.fetalHeartFetusPosition=JSON.parse(query.fetalHeartFetusPosition));
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/pregnancyPage/1032","更新孕4~10月健康检查记录",query,headers);//4~10月健康检查记录更新
    });
};
exports.query_pregnancyWeek_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/pregnancyPage/1029", "孕4-10月点击检查日期计算孕周",null,headers);//孕4-10月点击检查日期计算孕周
};
exports.to_eightTenSelfRecord_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/beforeMater/beforeMater2100.html');//跳转到8~10月自我记录页面
};
exports.submit_eightTenSelfRecord_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/pregnancyPage/1033","上传孕8~10月自我记录",query,headers);//孕8~10月自我记录保存
    });
};
exports.update_eightTenSelfRecord_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/pregnancyPage/1035","更新孕8~10月自我记录",query,headers);//孕8~10月自我记录更新
    });
};
exports.query_eightTenSelfRecord_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/pregnancyPage/1034", "回显孕8~10月自我记录",null,headers);//孕8~10月自我记录回显
};
exports.to_deliverSelfRecord_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/beforeMater/beforeMater2110.html');//跳转到分娩情况自我记录页面
};
exports.submit_deliverSelfRecord_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/pregnancyPage/1036","上传分娩情况自我记录",query,headers);//分娩情况自我记录保存
    });
};
exports.update_deliverSelfRecord_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/pregnancyPage/1038","更新分娩情况自我记录",query,headers);//分娩情况自我记录更新
    });
};
exports.query_deliverSelfRecord_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/pregnancyPage/1037", "回显分娩情况自我记录",null,headers);//分娩情况自我记录回显
};
exports.to_deliverDoctorRecord_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/beforeMater/beforeMater2120.html');//跳转到分娩情况医生记录页面
};
exports.submit_deliverDoctorRecord_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/pregnancyPage/1039","上传分娩情况医生记录",query,headers);//分娩情况医生记录保存
    });
};
exports.update_deliverDoctorRecord_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/pregnancyPage/1041","更新分娩情况医生记录",query,headers);//分娩情况医生记录更新
    });
};
exports.query_deliverDoctorRecord_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/pregnancyPage/1040", "回显分娩情况医生记录",null,headers);//分娩情况医生记录回显
};
exports.to_materSelfRecord_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/afterMater/afterMater2130.html');//跳转到产褥期情况自我记录页面
};
exports.submit_materSelfRecord_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/pregnancyPage/1042","上传产褥期自我记录",query,headers);//产褥期自我记录保存
    });
};
exports.update_materSelfRecord_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/pregnancyPage/1044","更新产褥期自我记录",query,headers);//产褥期自我记录更新
    });
};
exports.query_materSelfRecord_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/pregnancyPage/1043", "回显产褥期自我记录",null,headers);//产褥期自我记录回显
};
exports.to_afterMaterDoctorRecord_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/afterMater/afterMater2140.html');//跳转到产后访视医生页面
};
exports.submit_afterMaterDoctorRecord_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/pregnancyPage/1045","上传产后访视医生记录",query,headers);//产后访视医生记录保存
    });
};
exports.update_afterMaterDoctorRecord_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/pregnancyPage/1047","更新产后访视医生记录",query,headers);//产后访视医生记录更新
    });
};
exports.query_afterMaterDoctorRecord_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/pregnancyPage/1046", "回显产后访视医生记录",null,headers);//产后访视医生记录回显
};
exports.to_afterMaterFortyTwoDoctorTest_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/afterMater/afterMater2150.html');//跳转到产后42天医生检查页面
};
exports.query_afterMaterFortyTwoDoctorTest_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/pregnancyPage/1049", "回显产后42天医生检查列表",null,headers);//产后42天医生检查列表回显
};
exports.to_addAfterMaterFortyTwoDoctorTest_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/afterMater/afterMater2152.html');//跳转到新增产后42天医生检查页面
};
exports.submit_simplyAfterMaterFortyTwoDoctorTest_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/pregnancyPage/1048","上传单条产后42天医生检查记录",query,headers);//单条产后42天医生检查保存
    });
};
exports.update_simplyAfterMaterFortyTwoDoctorTest_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/pregnancyPage/1051","更新单条产后42天医生检查记录",query,headers);//单条产后42天医生检查记录更新
    });
};
exports.query_simplyAfterMaterFortyTwoDoctorTest_data=function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/pregnancyPage/1050", "回显单条产后42天医生检查列表",null,headers);//单条产后42天医生检查列表回显
};
exports.to_baby_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/child/babyMsg310.html');//跳转到儿童篇页面
};
exports.query_babyBasicMsg_data =function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/childPage/1001", "回显宝宝基本信息列表",null,headers);//宝宝基本信息回显
};
exports.to_addBabyBasicMsg_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/child/babyMsg311.html');//跳转到新增儿童基本信息页面
};
exports.submit_babyBasicMsg_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/childPage/1000","上传单条儿童基本信息",query,headers);//单条儿童基本信息保存
    });
};
exports.update_babyBasicMsg_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/childPage/1003","更新单条儿童基本信息",query,headers);//单条儿童基本信息更新
    });
};
exports.query_simplyBabyBasicMsg_data =function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/childPage/1002", "回显单条宝宝基本信息",null,headers);//单条宝宝基本信息回显
};
exports.to_parentSelfRecord_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/beforeMater/beforeMater120.html');//跳转到备孕爸妈自我记录页面
};
exports.to_beforeMaterEugenincsTest_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/beforeMater/beforeMater130.html');//跳转到孕前优生检查记录页面
};
exports.to_addEugenincsRecord_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/beforeMater/beforeMater131.html');//跳转到孕前优生检查记录填写页面
};
exports.to_babyBirthRecord_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/child/babyMsg320.html');//跳转到宝宝出生记录页面
};
exports.to_updateBabyBirthRecord_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/child/babyMsg321.html');//跳转到修改宝宝出生记录页面
};
exports.to_hasTeethRecord_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/child/babyMsg330.html');//跳转到宝宝出牙记录页面
};
exports.to_addHasTeethRecord_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/child/babyMsg331.html');//跳转到修改宝宝出牙记录页面
};
exports.to_babyBrand_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/child/babyMsg340.html');//跳转到宝宝印记页面
};
exports.to_addBabyBrand_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/child/babyMsg341.html');//跳转到修改宝宝印记页面
};
exports.to_homeTree_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/child/babyMsg350.html');//跳转到家庭树页面
};
exports.to_newBabyRecord_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/child/babyMsg361.html');//跳转到新生儿早期育儿记录列表页面
};
exports.to_addNewBabyRecord_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/child/babyMsg362.html');//跳转到填写新生儿早期育儿记录列表页面
};
exports.to_bacterinAndScreen_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/child/babyMsg363.html');//跳转到填写疫苗与筛查页面
};
exports.to_newBabyHealthRecord_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/child/babyMsg370.html');//跳转到新生儿早期健康检查记录页面
};
exports.to_addNewBabyHealthRecord_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/child/babyMsg371.html');//跳转到填写新生儿早期健康检查记录页面
};
exports.to_oneMonthRecord_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/child/babyMsg381.html');//跳转到一个月记录页面
};
exports.to_threeMonthRecord_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/child/babyMsg391.html');//跳转到三个月记录页面
};
exports.to_sixMonthRecord_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/child/babyMsg3101.html');//跳转到六个月记录页面
};
exports.to_eightMonthRecord_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/child/babyMsg3111.html');//跳转到八个月记录页面
};
exports.to_oneYearRecord_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/child/babyMsg3121.html');//跳转到一岁记录页面
};
exports.to_oneYearSixMonthRecord_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/child/babyMsg3131.html');//跳转到一岁六个月记录页面
};
exports.to_twoYearRecord_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/child/babyMsg3141.html');//跳转到两岁记录页面
};
exports.to_twoYearSixMonthRecord_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/child/babyMsg3151.html');//跳转到两岁六个月记录页面
};
exports.to_threeYearRecord_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/child/babyMsg3161.html');//跳转到三岁记录页面
};
exports.to_fourYearRecord_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/child/babyMsg3171.html');//跳转到四岁记录页面
};
exports.to_fiveYearRecord_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/child/babyMsg3181.html');//跳转到五岁记录页面
};
exports.to_sixYearRecord_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/child/babyMsg3191.html');//跳转到六岁记录页面
};
exports.query_parentSelfRecord_data =function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/progestationPage/1005", "回显备孕爸妈自我记录",null,headers);//备孕爸妈自我记录回显
};
exports.submit_parentSelfRecord_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/progestationPage/1004","上传备孕爸妈自我记录",query,headers);//备孕爸妈自我记录保存
    });
};
exports.query_beforeMaterEugenicsHealthTestList_data =function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/progestationPage/1006", "回显孕前优生健康检查记录列表",null,headers);//孕前优生健康检查记录列表回显
};
exports.query_beforeMaterEugenicsHealthTest_data =function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/progestationPage/1008", "回显编辑孕前优生健康检查记录",null,headers);//孕前优生健康检查记录编辑回显
};
exports.submit_beforeMaterEugenicsHealthTest_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/progestationPage/1007","保存孕前优生健康检查记录",query,headers);//孕前优生健康检查记录保存
    });
};
exports.query_babyBirthRecordList_data =function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/childPage/1004", "回显宝宝出生记录列表",null,headers);//宝宝出生记录列表回显
};
exports.query_babyBirthRecord_data =function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/childPage/1005", "回显宝宝出生记录",null,headers);//宝宝出生记录回显
};
exports.submit_babyBirthRecord_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/childPage/1006","保存宝宝出生记录",query,headers);//保存宝宝出生记录
    });
};
exports.query_babyTeethRecordList_data =function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/childPage/1007", "回显宝宝出牙记录列表",null,headers);//宝宝出牙记录列表回显
};
exports.query_babyTeethRecord_data =function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/childPage/1008", "回显宝宝出牙记录",null,headers);//宝宝出牙记录回显
};
exports.submit_babyTeethRecord_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/childPage/1009","保存宝宝出牙记录",query,headers);//保存宝宝出牙记录
    });
};
exports.query_babyBrand_data =function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/childPage/1010", "回显宝宝印记",null,headers);//宝宝印记回显
};
exports.submit_babyBrand_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/childPage/1011","保存宝宝印记",query,headers);//保存宝宝印记
    });
};
exports.query_babyBrandImg_data =function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/file/download/{resourceId}/{imageType}", "回显宝宝印记图片",null,headers);//回显宝宝印记图片
};
exports.query_homeTree_data =function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/childPage/1012", "回显家庭树图片",null,headers);//回显家庭树图片
};
exports.submit_homeTree_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/childPage/1013","保存家庭树",query,headers);//保存家庭树
    });
};
exports.query_childRearingRecordVaccine_data =function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/childPage/1014", "回显新生儿早期育儿记录（疫苗与筛选）",null,headers);//回显新生儿早期育儿记录（疫苗与筛选）
};
exports.submit_childRearingRecordVaccine_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/childPage/1015","保存新生儿早期育儿记录（疫苗与筛选）",query,headers);//新生儿早期育儿记录（疫苗与筛选）保存
    });
};
exports.query_newBabyEarlyChildRearingRecord_data =function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/childPage/1016", "回显新生儿早期育儿记录（育儿记录）",null,headers);//回显新生儿早期育儿记录（育儿记录）
};
exports.query_simplyNewBabyEarlyChildRearingRecord_data =function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/childPage/1045", "回显单条新生儿早期育儿记录（育儿记录）",null,headers);//回显单条新生儿早期育儿记录（育儿记录）
};
exports.submit_simplyNewBabyEarlyChildRearingRecord_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/childPage/1017","保存新生儿早期育儿记录（育儿记录）",query,headers);//新生儿早期育儿记录（育儿记录）保存
    });
};
exports.query_newBabyEarlyHealthRecord_data =function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/childPage/1018", "回显新生儿早期健康检查记录",null,headers);//回显新生儿早期健康检查记录
};
exports.query_simplyNewBabyEarlyHealthRecord_data =function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/childPage/1019", "回显单条新生儿早期健康检查记录",null,headers);//回显单条新生儿早期健康检查记录
};
exports.submit_simplyNewBabyEarlyHealthRecord_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/childPage/1020","保存单条新生儿早期健康检查记录",query,headers);//单条新生儿早期健康检查记录保存
    });
};
exports.query_oneMonthRecord_data =function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/childPage/1021", "回显一个月记录",null,headers);//回显一个月记录
};
exports.submit_oneMonthRecord_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/childPage/1022","保存一个月记录",query,headers);//一个月记录保存
    });
};
exports.query_threeMonthRecord_data =function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/childPage/1023", "回显三个月记录",null,headers);//回显三个月记录
};
exports.submit_threeMonthRecord_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/childPage/1024","保存三个月记录",query,headers);//三个月记录保存
    });
};
exports.query_sixMonthRecord_data =function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/childPage/1025", "回显六个月记录",null,headers);//回显六个月记录
};
exports.submit_sixMonthRecord_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/childPage/1026","保存六个月记录",query,headers);//六个月记录保存
    });
};
exports.query_eightMonthRecord_data =function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/childPage/1027", "回显八个月记录",null,headers);//回显八个月记录
};
exports.submit_eightMonthRecord_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/childPage/1028","保存八个月记录",query,headers);//八个月记录保存
    });
};
exports.query_oneYearRecord_data =function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/childPage/1029", "回显一岁记录",null,headers);//回显一岁记录
};
exports.submit_oneYearRecord_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/childPage/1030","保存一岁记录",query,headers);//一岁记录保存
    });
};
exports.query_oneYearSixMonthRecord_data =function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/childPage/1031", "回显一岁六个月记录",null,headers);//回显一岁六个月记录
};
exports.submit_oneYearSixMonthRecord_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/childPage/1032","保存一岁六个月记录",query,headers);//一岁六个月记录保存
    });
};
exports.query_twoYearRecord_data =function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/childPage/1033", "回显两岁记录",null,headers);//回显两岁记录
};
exports.submit_twoYearRecord_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/childPage/1034","保存两岁记录",query,headers);//两岁记录保存
    });
};
exports.query_twoYearSixMouthRecord_data =function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/childPage/1035", "回显两岁六个月记录",null,headers);//回显两岁六个月记录
};
exports.submit_twoYearSixMouthRecord_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/childPage/1036","保存两岁六个月记录",query,headers);//两岁六个月记录保存
    });
};
exports.query_threeYearRecord_data =function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/childPage/1037", "回显三岁记录",null,headers);//回显三岁记录
};
exports.submit_threeYearRecord_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/childPage/1038","保存三岁记录",query,headers);//三岁记录保存
    });
};
exports.query_fourYearRecord_data =function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/childPage/1039", "回显四岁记录",null,headers);//回显四岁记录
};
exports.submit_fourYearRecord_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/childPage/1040","保存四岁记录",query,headers);//四岁记录保存
    });
};
exports.query_fiveYearRecord_data =function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/childPage/1041", "回显五岁记录",null,headers);//回显五岁记录
};
exports.submit_fiveYearRecord_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/childPage/1042","保存五岁记录",query,headers);//五岁记录保存
    });
};
exports.query_sixYearRecord_data =function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildbook/childPage/1043", "回显六岁记录",null,headers);//回显六岁记录
};
exports.submit_sixYearRecord_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        var headers=query_header_data(_t.req);
        _t.postAjax("/hug-web/r/maternalchildbook/childPage/1044","保存六岁记录",query,headers);//六岁记录保存
    });
};
exports.to_choseCity_page = function(){
    this.render('../../web-bin/mobile/followup/maternalChild/handBook/write/basic/choseCity.html');//跳转到选择医院页面
};
exports.query_useOrganiztion_data = function(){
    var headers=query_header_data(this.req);
    this.getAjax("/hug-web/r/maternalchildInstitution/1000", "获取发放机构",null,headers);//获取发放机构
};
//获取浏览器缓存的cookie,并组装headers
function query_header_data(req){
    var cookies = {}; // 保存请求中所有的cookie数据,之后直接可以cookies.name获取cookie的值
    var cookieString = req.headers.cookie; // 因为这里直接把cookie的字符串返回了,所以要方便用的话得处理一下
    // 下边解析一下cookie字符串,保存到cookies对象中
    var pairs = cookieString.split(/[;,] */);
    for (var i =0; i < pairs.length; i++){
        var idx = pairs[i].indexOf('=');
        var key = pairs[i].substr(0, idx);
        var val = pairs[i].substr(++idx, pairs[i].length).trim();
        cookies[key] = val;
    }
    var headers={
        'partnerType':cookies.partnerType,
        'usId':cookies.usId,
        'accessToken':cookies.accessToken,
        'Content-Type':'application/json;charset=utf-8',
    };
    return headers;
};