//控件的html代码段
define("form/tplutil",
function(p, s, u) {
    u.exports = {
    	text:'<div></div><div id="form_text" class="field field_js"><div class="widget_title"><span class="widget_title_js">文本输入框</span><span class="required widget_required_js"></span></div><div class="widget_content"><input type="text" class="text_control field_value_js check_js"/><div class="widget_tip widget_tip_js hide"></div></div></div>',
    	textarea:'<div></div><div id="form_textarea" class="field field_js"><div class="widget_title"><span class="widget_title_js">多行输入框</span><span class="required widget_required_js"></span></div><div class="widget_content"><textarea class="text_control field_value_js check_js"></textarea><div class="widget_tip widget_tip_js hide"></div></div></div>',
    	radiobox:'<div></div><div id="form_radiobox" class="field field_js"><div class="widget_title"><span class="widget_title_js">单选题</span><span class="required widget_required_js"></span></div><div class="widget_content"><ul class="choicelist choicelist_js check_js"></ul></div></div>',
    	checkbox:'<div></div><div id="form_checkbox" class="field field_js"><div class="widget_title"><span class="widget_title_js">多选题</span><span class="required widget_required_js"></span></div><div class="widget_content"><ul class="choicelist choicelist_js check_js"></ul></div></div>',
    	select:'<div></div><div id="form_select" class="field field_js"><div class="widget_title"><span class="widget_title_js">下拉菜单</span><span class="required widget_required_js"></span></div><div class="widget_content"><select class="chosen_select_deselect choicelist_js check_js"></select><div class="widget_tip"></div></div></div>',
    	scoreradiobox:'<div></div><div id="form_scoreradiobox" class="field field_js"><div class="widget_title"><span class="widget_title_js">分值单选题</span><span class="required widget_required_js"></span></div><div class="widget_content"><ul class="choicelist choicelist_js check_js"></ul></div></div>',
    	matrixraty:'<div></div><div id="form_matrixraty" class="field field_js"><div class="widget_title"><span class="widget_title_js">矩阵评级框</span><span class="required widget_required_js"></span></div><div class="widget_content"><ul class="choicelist choicelist_js matrixRatylist check_js"></ul><div class="widget_tip hide">提示：</div></div></div>',
    	datecomponent:'<div></div><div id="form_datecomponent" class="field field_js"><div class="widget_title"><span class="widget_title_js">日期框</span><span class="required widget_required_js"></span></div><div class="widget_content"><input type="text" placeholder="" class="text_control field_value_js check_js"/><div class="widget_tip"></div></div></div>',
    	mobile:'<div></div><div id="form_mobile" class="field field_js"><div class="widget_title"><span class="widget_title_js">手机框</span><span class="required widget_required_js"></span></div><div class="widget_content"><input type="text" placeholder="请输入手机号码" class="text_control field_value_js check_js"/><div class="widget_tip"></div></div></div>',
    	multipleTextArea:'<div></div><div id="form_multipleTextArea" class="field field_js"><div class="widget_title"><span class="widget_title_js">多选多行输入框</span><span class="required widget_required_js"></span></div><div class="widget_content"><ul class="choicelist choicelist_js multipleTextList check_js"></ul></div></div>',
		option:'<div></div><div id="form_option"><li class="MultipleTextArea_js"><p class="option_title"></p><textarea class="text_control"></textarea><div class="widget_tip"></div></li><li class="ScoreRadioBox_js"><input type="radio"/><input type="hidden"class="scoreValue_js"/><div class="option_title"></div><div class="widget_tip"></div></li><li class="Select_js"><option value=""></option></li><li class="MatrixRaty_js"></li><li class="RadioBox_js"><input type="radio"/><div class="option_title"></div><div class="widget_tip"></div></li><li class="CheckBox_js"><input type="checkbox"/><div class="option_title"></div><div class="widget_tip"></div></li><li class="ImageRadioBox_js image_radiobox"><div class="box"><img src=""/><div class="content"><label><input type="radio"name="form_radioImageBox"disabled="disabled"/><div class="option_title"></div><div class="widget_tip"></div></label></div></div></li><li class="ImageCheckBox_js image_checkbox"><div class="box"><img src=""/><div class="content"><label><input type="checkbox"/><div class="option_title"></div><div class="widget_tip"></div></label></div></div></li></div>',
		imageradiobox:'<div id="form_imageradiobox" class="field field_js"><div class="widget_title"><span class="widget_title_js">图文选择框</span><span class="required widget_required_js"></span></div><div class="widget_content"><ul class="imageslist choicelist_js check_js"></ul></div></div><div id="editor_imageradiobox"><div class="form_edit_content"></div></div>',
		imagecheckbox:'<div id="form_imagecheckbox" class="field field_js"><div class="widget_title"><span class="widget_title_js">图文选择框</span><span class="required widget_required_js"></span></div><div class="widget_content"><ul class="imageslist choicelist_js check_js"></ul></div></div><div id="editor_imagecheckbox"><div class="form_edit_content"></div></div>',
        imagecomponent:'<div id="form_imagecomponent" class="field field_js"><div class="widget_title"><span class="widget_title_js">图片</span><span class="required widget_required_js"></span></div><div class="widget_content"><ul class="imageslist imagescomponentlist_js choicelist_inline check_js"><div class="ImageComponent_js"><div class="form_img_upload"><div class="img_add">选择图片</div></div></div></ul></div></div><div id="editor_imagecomponent"></div>',
		secondOption:'<div id="form_secondOption"></div><div id="editor_secondOption"><li class="MatrixRatyStar_js"><label title="异常"><input type="checkbox" name="error_secondOption"/><i class="design_icon sc_checkbox_icon sc_unchecked"></i></label><input type="text" class="text_control secondOptionError_js"/></li></div>',
    	scoretable:'<div class="score_standard_container"><div class="score_standard"><div class="score_nav"><div class="standard_desc"><p>评分标准</p><p class="desc_content">(标准：1.第一个分值下限必须填0；2.最后一个分值上限必须等于问卷所有选项最高分相加；3.每一个分值区间的上限必须比下一个分值区间的下限小1)</p></div><div><table cellspacing="0" cellpadding="0" class="standard_table"><tr><td style="width:13%">分段下限<span class="must"> *</span></td><td style="width:13%">分段上限<span class="must"> *</span></td><td style="width:21%">分段名称<span class="must"> *</span>(如优秀)</td><td style="width:21%">分段说明</td><td style="width:13%" class="five_td">是否异常</td><td style="text-align:center;">操作</td></tr><tr><td><input type="text" class="score t_score_js lowerLimit"/><span class="scoreTip"></span></td><td><input type="text" class="score t_score_js upperLimit"/><span class="scoreTip"></span></td><td><input type="text" class="judgName"/><span class="scoreTip"></span></td><td><input type="text" class="judgDesc"/></td><td class="five_td"><label><input type="checkbox"/><i class="design_icon sc_checkbox_icon sc_unchecked"></i></label></td><td style="text-align:center;"><span class="opt_oper_btn f_design_icon minus_btn design_minus_js" title="删除当前选项（最少保留2个选项）"></span><span class="opt_oper_btn f_design_icon plus_btn design_add_js" title="在此选项下面插入一个新的选项"></span><span class="opt_oper_btn f_design_icon down_btn design_down_js" title="将当前选项下移一个位置"></span><span class="opt_oper_btn f_design_icon up_btn design_up_js" title="将当前选项上移一个位置"></span></td></tr><tr><td><input type="text" class="score t_score_js lowerLimit"/><span class="scoreTip"></span></td><td><input type="text" class="score t_score_js upperLimit"/><span class="scoreTip"></span></td><td><input type="text" class="judgName"/><span class="scoreTip"></span></td><td><input type="text" class="judgDesc"/></td><td class="five_td"><label><input type="checkbox"/><i class="design_icon sc_checkbox_icon sc_unchecked"></i></label></td><td style="text-align:center;"><span class="opt_oper_btn f_design_icon minus_btn design_minus_js" title="删除当前选项（最少保留2个选项）"></span><span class="opt_oper_btn f_design_icon plus_btn design_add_js" title="在此选项下面插入一个新的选项"></span><span class="opt_oper_btn f_design_icon down_btn design_down_js" title="将当前选项下移一个位置"></span><span class="opt_oper_btn f_design_icon up_btn design_up_js" title="将当前选项上移一个位置"></span></td></tr></table></div></div></div></div>',
    	columnpanel:'<div id="layout_columnPanel_2" class="form_layout form_layout_js"><div class="column_layout two_columns columns_js"><div class="cell cell_js"></div><div class="cell cell_js"></div></div><div class="form_layout_toolbar"><div class="pull_left"><span class="f_design_icon layoutDrag_btn"></span><span>拖拽</span></div><div class="pull_left layoutDel_js j_cancel_drag"><span class="f_design_icon layoutDel_btn"></span><span>删除</span></div></div></div><div id="layout_columnPanel_3" class="form_layout form_layout_js"><div class="column_layout three_columns columns_js"><div class="cell cell_js"></div><div class="cell cell_js"></div><div class="cell cell_js"></div></div><div class="form_layout_toolbar"><div class="pull_left"><span class="f_design_icon layoutDrag_btn"></span><span>拖拽</span></div><div class="pull_left layoutDel_js j_cancel_drag"><span class="f_design_icon layoutDel_btn"></span><span>删除</span></div></div></div>',
        tablelayout: '<div id="table_layout" class="table_layout table_layout_js"><div class="form_tablelayout_wrap"><div class="form_layout_toolbar"><div class="pull_left"><span class="f_design_icon layoutDrag_btn"></span><span>拖拽</span></div><div class="pull_left layoutDel_js j_cancel_drag"><span class="f_design_icon layoutDel_btn"></span><span>删除</span></div></div><div class="form_tablelayout form_tablelayout_div j_table j_cancel_drag"></div></div><div id="context-menu" calss="j_cancel_drag right-click-menu"><ul class="dropdown-menu j_cancel_drag" role="menu"><li><a  href="#" class="j_layout_menu" type="merge">合并</a></li><li><a  href="#" class="j_layout_menu" type="clearMerge">拆分</a></li><li class="divider"></li><li><a  href="#" class="j_layout_menu" type="deleteRow">删除行</a></li><li><a  href="#" class="j_layout_menu" type="deleteCol">删除列</a></li><li class="divider"></li><li><a  href="#" class="j_layout_menu" type="addRow">添加行</a></li><li><a  href="#" class="j_layout_menu" type="addCol">添加列</a></li><li class="divider"></li><li><a  href="#" class="j_layout_menu" type="clearSelect">清空选择</a></li></ul></div></div><div class="table_layout table_layout_js" id="preview_tablelayout" componentKey="TableLayout"><div class="form_tablelayout_wrap"><div class="form_tablelayout j_tablelayout"></div></div></div>',
    	get: function(h) {
            return this[h];
        }
    };
});