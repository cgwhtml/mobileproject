/**
 * Created by heyating
 * Created time 2018/4/4 15:17
 * Description
 */
var qs = require('querystring'),
    url=require('url');
exports.to_filingEntrance_page = function(){
    this.render('../../web-bin/mobile/chronicDiseases/selfFiling/filingEntrance.html');
};
exports.submit_basic_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        _t.postAjax("/hug-web/r/archive/getSelfArchiveEmpiId","保存建档基本信息",query);//保存建档基本信息
    });
};
exports.to_archivesList_page = function(){
    this.render('../../web-bin/mobile/chronicDiseases/selfFiling/fileList.html');//跳转到档案列表页面
};
exports.query_archivesList_data=function(){
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        _t.postAjax("/hug-web/r/archive/getSelfArchiveMenu","获取档案列表信息",query);//获取档案列表信息
    });
};
exports.query_checkForm_data=function(){//参数带在url后
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/archive/getSelfArchiveFormJson","获取档案表单数据接口调用",query);//获取档案表单数据接口调用
};
exports.submit_replyForm_data=function(){//参数放在data里
    var query ='';
    var _t=this;
    this.req.addListener('data', function(data){
        query += data;
    }).addListener('end', function(){
        query = qs.parse(query);
        query=JSON.stringify(query);
        _t.postAjax("/hug-web/r/archive/saveSelfArchive","保存档案表单数据接口调用",query);//保存档案表单数据接口调用
    });
};