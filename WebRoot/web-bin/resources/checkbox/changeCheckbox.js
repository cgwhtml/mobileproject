//将checkbox替换成想到的样式，Range：范围，CheckedClass，选中的样式，UnCheckedClass，没选中的样式
//by:allen
(function ($) {
    $.fn.changeCheckbox = function (opions) {
        var defaluts = { Range: "body", CheckedClass: "checked", UnCheckedClass: "unchecked",myfunction:function(obj){} };
        var Opions = $.extend(defaluts, opions);
        $(this).each(function () {
            $("input[type='checkbox'][name='"+Opions.name+"']").each(function () {
                var state = $(this).attr("checked") ? Opions.CheckedClass : Opions.UnCheckedClass;
                var check = $("<span class=" + state + " ></span>").click(function () {
                    if ($(this).hasClass(Opions.CheckedClass)) {
                        $(this).attr("class", Opions.UnCheckedClass)
                        $(this).prev().attr("checked", false);
                    }
                    else {
                        $(this).attr("class", Opions.CheckedClass)
                        $(this).prev().attr("checked", true);
                    }

					var thisCheckBox = $(this).prev();
					var id = thisCheckBox.attr("id");
					var name = thisCheckBox.attr("name");
					var checked = thisCheckBox.attr("checked");
					Opions.myfunction({id:id,name:name,checked:checked});
                });
                $(this).hide();
                $(this).after(check);
            })
        })
    }

	$.fn.selectAll = function (opions) {
        var defaluts = { Range: "body", CheckedClass: "checked", UnCheckedClass: "unchecked",selectAll:true };
        var Opions = $.extend(defaluts, opions);
        $(this).each(function () {
            $("input[type='checkbox'][name='"+Opions.name+"']").each(function () {
                if(Opions.selectAll){
					 $(this).attr("checked",true);
					 $(this).next().attr("class",Opions.CheckedClass);
				}else{
					 $(this).attr("checked",false);
					 $(this).next().attr("class",Opions.UnCheckedClass);
				}
            })
        })
    }
})(jQuery)

//id 全选框id name 所有单选框的统一name isSelectAll 是否全选
function deal(name,isSelectAll){
	
}