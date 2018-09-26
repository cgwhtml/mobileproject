/*
 * @author xyz
 * @date 20170728
 */
var qs = require('querystring'),
    url=require('url');
exports.file_upload_send=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    var headers={
        'partnerType':query.partnerType,
        'usId':query.usId,
        'accessToken':query.accessToken,
        'Content-Type':'application/json;charset=utf-8'
    };
    query =JSON.stringify(query);
    this.uploadFile("/hug-web/r/chat/1001","发送图片/音频/视频",query,headers)
};
//投诉表扬
exports.file_upload_praise=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.uploadFile("/hug-web/r/complaint/1006","保存图片/音频/视频",query)
};
exports.file_upload=function(){
    this.uploadFile("/hug-web/r/file/upload","上传文件");
};
exports.file_upload_materChild=function(){
    this.uploadFile("/hug-web/r/file/upload/025","母子健康手册模块-上传文件");
};