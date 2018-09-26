/*
 * @author xyz
 * @date 20170727
 */
var qs = require('querystring'),
    url=require('url');
exports.query_dictHosp_data=function(){
    var query = url.parse(this.req.url).query;
    query=qs.parse(query);
    query =JSON.stringify(query);
    this.postAjax("/hug-web/r/hos/1008","根据医院组织机构代码获取医院字典信息",query);
};