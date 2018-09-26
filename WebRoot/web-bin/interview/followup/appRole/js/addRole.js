var s_flag = true;//防止重复提交的状态判断参数
var zTree;//树对象
var num = 0;
$(function () {
    initResource();
    //表单验证提示信息加载
    formTips();
    //表单提交返回
    $('#myForm').ajaxForm({
        dataType: 'json',
        success: function (data) {
            if (data.result.resultCode == 0) {
                parent.art.dialog({content: '添加成功！', icon: 'succeed', time: 1.5});
                //刷新角色列表
                parent.flushList();
                //树节点的选中状态清空
                zTree.checkAllNodes(false);
            } else if (data.result.resultCode == 1) {
                parent.art.dialog({content: '角色名称已经存在！', icon: 'warning', time: 1.5});
            } else {
                parent.art.dialog({content: '添加失败！', icon: 'error', time: 1.5});
            }
            s_flag = true;
        },
        error: function () {
            parent.art.dialog({content: '添加失败！', icon: 'error', time: 1.5});
            s_flag = true;
        },
        resetForm: true //清空表单
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
    if (s_flag) {
        s_flag = false;
        $('#myForm').submit();
    }
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
function initCheckNode() {
    if (num == 0) {
        num ++;
        zTree = $.fn.zTree.getZTreeObj("catalogTree");
        var node2 = zTree.getNodeByTId("catalogTree_2");
        var node20 = zTree.getNodeByTId("catalogTree_20");
        var node14 = zTree.getNodeByTId("catalogTree_14");
        zTree.expandNode(node2, true);
        try {
            zTree.checkNode(node2, true, true);
            zTree.checkNode(node20, true, true);
            zTree.checkNode(node14, true, true);
        } catch (e) {}
    }
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