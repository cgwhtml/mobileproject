var zTree;//树对象
var idArray = $.trim($("#perIds").val()).split(",");
$(function () {
    initResource();
    //表单验证提示信息加载
    formTips();
    //表单提交返回
    $('#myForm').ajaxForm({
        dataType: 'json',
        success: function (data) {
            if (data.result.resultCode == 0) {
                parent.art.dialog({content: '保存成功！', icon: 'succeed', time: 1.5});
                //保存成功不刷新列表，静态修改
                var roleName = $("#roleName").val();
                parent.$(".chosen .name div").attr("title", roleName).text(roleName);
            } else if (data.result.resultCode == 1) {
                parent.art.dialog({content: '角色名称已经存在！', icon: 'warning', time: 1.5});
            } else {
                parent.art.dialog({content: '保存失败！', icon: 'error', time: 1.5});
            }
        },
        error: function () {
            parent.art.dialog({content: '保存失败！', icon: 'error', time: 1.5});
        }
    });
});
//表单提交验证
function checkForm() {
    $('#roleName').poshytip('hide');
    var roleName = $("#roleName").val();
    if ($.trim(roleName) == "" || roleName.length > 25) {
        $('#roleName').poshytip('show');
        $("#roleName").focus();
        return false;
    }
    $("#perIds").val(getCheckNodeIds());
    $('#myForm').submit();
}
function initResource() {//目前全部载入树
    var initRoot = [{"id": "1", "isParent": true, "name": "云随访", "pId": "0", "sortOrder": 1}];
    var setting = {
        async: {
            enable: true,
            url: "loadPermissionTree.htm",
            autoParam: ["id=roleDTO.id", "pId=roleDTO.pId"]
        },
        check: {
            enable: true,
            chkboxType: {"Y": "p", "N": "s"}
        },
        data: {
            key: {
                name: "name",
                title: "name"
            },
            simpleData: {
                enable: true,
                idKey: "roleDTO.id",
                pIdKey: "roleDTO.pId",
                rootPId: '0'
            }
        },
        callback: {
            onAsyncSuccess: initCheckNode
        }
    };
    $.fn.zTree.init($("#catalogTree"), setting, initRoot);
    zTree = $.fn.zTree.getZTreeObj("catalogTree");
    var rootNode = zTree.getNodesByParam("id", "1", null)[0];
    zTree.expandNode(rootNode, true);//默认展开第一层
}
//获取所有树选中的节点id
function getCheckNodeIds() {
    var sns = new Array();
    var nodes = zTree.getCheckedNodes(true),
        checkCount = nodes.length;
    for (var i = 0; i < checkCount; i++) {
        sns.push(nodes[i].id);
    }
    return sns.toString();
}
//初始化加载完的节点的选中
function initCheckNode() {
    if (idArray.length > 0) {
        zTree = $.fn.zTree.getZTreeObj("catalogTree");
        var nodes = zTree.transformToArray(zTree.getNodes());
        for (var i = 0; i < nodes.length; i++) {
            for (var j = 0; j < idArray.length; j++) {
                if (idArray[j] == nodes[i].id) {
                    zTree.checkNode(nodes[i], true, true);
                    //展开被选中的节点
                    var rootNode1 = zTree.getNodesByParam("id", nodes[i].id, null)[0];
                    zTree.expandNode(rootNode1, true);
                    idArray.splice(j, 1);
                }
            }
        }
    }
}
//表单提交验证提示信息
function formTips() {
    $('#roleName').poshytip({
        content: '角色名称不能为空,且长度不能超过25个字符！',
        showOn: 'none',
        alignTo: 'target',
        alignX: 'inner-left',
        offsetX: 0,
        offsetY: 6
    });
    $('#roleName').blur(function () {
        var roleName = $("#roleName").val();
        if ($.trim(roleName) != '' && roleName.length <= 25) {
            $('#roleName').poshytip('hide');
        }
    });
}