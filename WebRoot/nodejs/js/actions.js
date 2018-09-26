/**
 * @author xyz
 * @date 20161024
 */

var route = require('./route');

/**************共用的各种方法*************/
//医院相关
route.map({
    pathUrl:/^\/web-bin\/c\/nosen\/common\/hosp?/i,
    type:'common',
    url: '/common/hosp/',
    controller: 'hosp',
    action:['query_dictHosp_data']
});
route.map({
    pathUrl:/^\/web-bin\/c\/nosen\/common\/file?/i,
    type:'common',
    url: '/common/file/',
    controller: 'file',
    action:['file_upload','file_upload_materChild','file_upload_praise','file_upload_send']
});
//手机验证码相关
route.map({
    pathUrl:/^\/web-bin\/c\/nosen\/common\/messageCode?/i,
    type:'common',
    url: '/common/messageCode/',
    controller: 'messageCode',
    action:['send_messageCode_data','test_messageCode_data']
});
/**************随访端pc*************/
//体检预约
route.map({
    pathUrl:/^\/web-bin\/p\/followup\/physical\/?/i,//用来匹配,判断使用哪个map
    type:'pc',//表示PC端
	url: '/interview/followup/physical/',//controller js的路径
    controller: 'physical',
    action:['to_physicalExamList_page','query_physicalExamList_data','to_physicalHandle_page','submit_physicalHandle_data']
});
//健康监测
route.map({
    pathUrl:/^\/web-bin\/p\/followup\/healthMonitor\/?/i,
    type:'pc',
	url: '/interview/followup/healthMonitor/',
    controller: 'healthMonitor',
    action:['to_healthMonitorErrorList_page','query_healthMonitorErrorList_data','query_host_ip','to_errorHandle_page','submit_errorHandle_data',
            'to_healthMonitorFinishList_page','to_healthMonitorAllList_page','query_healthMonitorAllList_data','to_fetalHeartHandleList_page',
            'query_fetalHeartHandleList_data','to_fetalHeartHandle_page','to_checkReport_page','query_oneHealth_data','query_fetalHeart_configure_data',
            'submit_fetalHeart_report','to_fetalHeart_page','to_bloodPressure_page','to_bloodGlucose_page','to_temperature_page','to_heartRate_page',
            'to_weight_page','query_health_data_by_type','query_report_data','to_showHandle_page','to_setFrequency_page','submit_fetalHeart_configure_data',
            'to_fetalHeartHandleList2_page','to_fetalHeartUserList_page','query_fetalHeartUserList_data','query_healthReportList_data',
            'to_addFetalUser_page']
});
//健康监测2.0
route.map({
    pathUrl:/^\/web-bin\/p\/followup\/two\/healthMonitor\/?/i,
    type:'pc',
    url: '/interview/followup/healthMonitor2/',
    controller: 'healthMonitor2',
    action:['to_healthMonitorTitle_page','query_healthMonitorSum_data','to_healthMonitorErrorList_page','to_healthMonitorFinishList_page',
            'query_healthMonitorErrorList_data','to_healthMonitorAllList_page','query_healthMonitorAllList_data',
            'to_fetalHeart_page','to_bloodPressure_page','to_bloodGlucose_page','to_temperature_page','to_heartRate_page',
            'to_weight_page','to_electrocardio_page','query_health_data_by_type']
});
//医患聊天以及医医聊天
route.map({
    pathUrl:/^\/web-bin\/p\/followup\/chat\/?/i,
    type:'pc',
	url: '/interview/followup/chat/',
    controller: 'chat',
    action:['to_chatClass_page','to_doctorPatient_page','query_patient_data','to_doctorDoc_page','to_patientChat_page','to_doctorChat_page','query_friend_data',
            'query_userData_data','query_sendText_data','query_sendPatient_data','to_addFriend_page','query_person_data','query_newFriend_data','query_yesFriend_data',
            'query_noFriend_data','to_friendRequest_page','query_agree_data','query_refuse_data','query_deleteFriend_data','query_fans_data','to_revise_page','query_reviseName_data',
            'query_sendImg_data','query_applyFriend_data','query_searchFans_data','to_question_page','to_questionDetail_page','query_question_data','query_questionContain_data',
            'submit_question_data','query_educate_data','query_educateContain_data','submit_educate_data','query_sourceId_data','query_list_data','query_msg_data','query_doing_data']
});
//app角色权限
route.map({
    pathUrl:/^\/web-bin\/p\/followup\/appRole\/?/i,
    type:'pc',
    url: '/interview/followup/appRole/',
    controller: 'appRole',
    action:['to_appRoleList_page','query_allRole_data']
});
//随访意见反馈
route.map({
    pathUrl:/^\/web-bin\/p\/followup\/suggestBack\/?/i,
    type:'pc',
    url: '/interview/followup/suggestBack/',
    controller: 'suggestBack',
    action:['to_suggestList_page','query_suggestList_data','query_suggestSolve_data']
});
//健康本
route.map({
    pathUrl:/^\/web-bin\/p\/followup\/patientArchive\/?/i,
    type:'pc',
    url: '/interview/followup/patientArchive/',
    controller: 'patientArchive',
    action:['to_hospitalmessList_page','query_hospitalmessList_data',
            'to_patientHosp_page','query_patientHosp_data',
            'to_patientVisit_page','query_patientVisit_data',
            'to_patientTest_page','query_patientTest_data',
            'query_visitOrder_data','query_inspection_data',
            'query_examination_data','to_patientSelf_page',
            'query_patientSelf_data']
});
/**************手机端*************/
//健康监测
route.map({
    pathUrl:/^\/web-bin\/m\/followup\/healthMonitor\/?/i,
    type:'mobile',
	url: '/mobile/followup/healthMonitor/',
    controller: 'healthMonitor',
    action:['to_fetalHeart_page','query_oneHealth_data']
});
//问卷列表
route.map({
    pathUrl:/^\/web-bin\/m\/followup\/chat\/?/i,
    type:'mobile',
	url: '/mobile/followup/chat/',
    controller: 'question',
    action:['to_question_page',
            'query_question_data',
            'submit_question_data']
});
//表单
route.map({
	pathUrl:[/^\/web-bin\/m\/nosen\/followup\/form\/?/i,/^\/web-bin\/m\/nosen\/oneparam\/followup\/form\/?/i],
	type:'mobile',
	url: '/mobile/followup/form/',
	controller: 'form',
	action:['to_replyForm_page','query_form_data','submit_form_data','to_checkForm_page','query_checkForm_data','query_form_data_satisfaction',"submit_form_data_satisfaction","upload_img"]
});
//宣教
route.map({
	pathUrl:[/^\/web-bin\/m\/nosen\/followup\/education\/?/i,/^\/web-bin\/m\/nosen\/oneparam\/followup\/education\/?/i],
	type:'mobile',
	url: '/mobile/followup/education/',
	controller: 'education',
	action:['to_checkEducation_page','query_education_data','to_noSendEducation_page','query_noSendEducation_data']
});
//妇幼专科系统
route.map({
	pathUrl:[/^\/web-bin\/m\/nosen\/followup\/maternalChild\/system\/?/i,/^\/web-bin\/m\/nosen\/oneparam\/followup\/maternalChild\/system\/?/i],
	type:'mobile',
	url: '/mobile/followup/maternalChild/system/',
	controller: 'maternalChild',
	action:['to_referralRemind_page','query_referralRemind_data','to_maternityPlan_page','query_maternityPlan_data','to_maternityFiling_page','submit_maternityFiling_data']
});
//母子健康手册
route.map({
	pathUrl:[/^\/web-bin\/m\/nosen\/followup\/maternalChild\/handBook\/?/i],
	type:'mobile',
	url: '/mobile/followup/maternalChild/handBook/',
	controller: 'handBook',
	action:['to_menu_page','to_readWrap_page','to_read_index_page','to_read_basicInfo_page','to_read_bm1_page','to_read_bm2_page','to_read_beforeMater0_page',
	        'to_read_beforeMater1_page','to_read_beforeMater2_page','to_read_beforeMater3_page','to_read_beforeMater4_page','to_read_beforeMater5_page',
	        'to_read_beforeMater6_page','to_read_beforeMater7_page','to_read_beforeMater8_page','to_read_beforeMater9_page','to_read_beforeMater10_page',
	        'to_read_beforeMater11_page','to_read_beforeMater12_page','to_read_maternity0_page','to_read_maternity1_page','to_read_maternity2_page',
	        'to_read_maternity3_page','to_read_maternity4_page','to_read_maternity5_page','to_read_maternity6_page','to_read_maternity7_page','to_read_maternity8_page',
            'to_read_maternity9_page', 'to_read_maternity10_page','to_read_maternity11_page','to_read_maternity12_page','to_read_maternity13_page','to_read_maternity14_page',
            'to_read_maternity15_page','to_read_maternity16_page','to_read_maternity17_page','to_read_maternity18_page','to_read_maternity19_page','to_read_maternity20_page',
	        'to_read_maternity21_page','to_read_maternity22_page','to_read_maternity23_page','to_read_maternity24_page','to_read_maternity25_page','to_read_maternity26_page',
            'to_read_maternity27_page','to_read_maternity28_page','to_read_maternity29_page','to_read_maternity30_page','to_read_maternity31_page','to_read_maternity32_page',
            'to_read_maternity33_page','to_read_maternity34_page','to_read_maternity35_page','to_read_maternity36_page','to_read_child0_page','to_read_child1_page',
            'to_read_child2_page','to_read_child3_page','to_read_child4_page','to_read_child5_page','to_read_child6_page','to_read_child7_page','to_read_child8_page',
            'to_read_child9_page','to_read_child10_page','to_read_child12_page','to_read_child13_page','to_read_child14_page','to_read_child15_page','to_read_child16_page',
            'to_read_child17_page','to_read_child18_page','to_read_child19_page','to_read_child20_page','to_read_child21_page','to_read_child22_page','to_read_child23_page',
            'to_read_child24_page','to_read_child25_page','to_read_child26_page','to_read_child27_page','to_read_child28_page','to_read_child29_page','to_read_child30_page',
            'to_read_child31_page','to_read_child32_page','to_read_child33_page','to_read_child34_page','to_read_child35_page','to_read_child36_page','to_read_child37_page',
            'to_read_child38_page','to_read_child39_page','to_read_child40_page','to_read_child41_page','to_read_child42_page','to_read_child43_page','to_read_child44_page',
            'to_read_child45_page','to_read_child46_page','to_read_child47_page','to_read_child48_page','to_read_child49_page','to_read_child50_page','to_read_child51_page',
            'to_read_prevent0_page','to_read_prevent1_page','to_read_prevent2_page','to_read_prevent3_page','to_read_prevent4_page','to_read_prevent5_page',
            'query_readIndex_data','query_basicInfo_data','query_readEightMonthRecord_data','query_readBabyTeethRecord_data','query_readOneYearRecord_data',
            'query_readOneYearSixMonthRecord_data','query_readTwoYearRecord_data','query_readTwoYearSixMonthRecord_data','query_readThreeYearRecord_data','query_readFourYearRecord_data',
            'query_readFiveYearRecord_data','query_readSixYearRecord_data','query_readHealthRecord_data','query_readAfter42DoctorResearch_data','query_readOneMonthRecord_data',
            'query_readThreeMonthRecord_data','query_readSixMonthRecord_data','query_readBabyBirthRecord_data','query_readNewBabyEarlyRearingRecord_data','query_readNewBabyEarlyVaccinum_data',
            'query_readNewBabyEarlyHealthRecord_data','query_readBabyBrand_data','to_sixQuestion_page','to_sixQuestion1_page', 'to_siChuanPlicy_page', 'to_siChuanPlicy1_page','to_siChuanPlicy2_page',

            'to_start_route','query_handBookList_data','to_addBook_page','to_whetherLink_page','query_isCertify_data','to_addCertify_page','to_fastIdentification_page','submit_fastIdentification_data',
            'query_userInfoByHugId_data','to_linkHosp_page','query_hospConfig_data','to_pBasicInfo_page','to_chooseHos_page','query_chooseHos_data','submit_hospInfo_data',
            'submit_parentMsg_data','update_parentMsg_data','query_parentMsg_data','to_beforeMater_page','query_beforeMaterPercent_data','query_maternityStatus_data','to_sweetTime_page','submit_sweetTime_data',
            'update_sweetTime_data','query_sweetTime_data','to_matherMsg_page','submit_mather_data','query_mather_data','update_mather_data','to_oneThreePregnantRecord_page','submit_oneThreePregnantRecord_data',
            'query_oneThreePregnantRecord_data','query_maternityPercent_data','update_oneThreePregnantRecord_data','to_weightSelfTest_page','query_weightSelfTest_data','to_addWeightSelfTest_page','submit_addWeightSelfTest_data',
            'query_count_data','query_simplyWeight_record_data','update_simplyWeight_record_data','to_quickening_page','query_quickening_data','to_addQuickening_page','submit_simplyQuickening_data',
             'update_simplyQuickening_data','query_simplyQuickening_data','to_classRecord_page','query_classRecord_data','to_addClassRecord_page','submit_addClassRecord_data','update_addClassRecord_data','query_simplyClassRecord_data',
            'to_oneThreePregnantHealthRecord_page','query_oneThreePregnantHealthRecord_data','submit_oneThreePregnantHealthRecord_data','update_oneThreePregnantHealthRecord_data','to_fourSevenSelfRecord_page',
            'submit_fourSevenSelfRecord_data','query_fourSevenSelfRecord_data','update_fourSevenSelfRecord_data','to_fourTenHealthRecord_page','to_addFourTenHealthRecord_page','query_fourTenHealthRecord_data',
            'query_simplyFourTenHealthRecord_data','submit_simplyFourTenHealthRecord_data','update_simplyFourTenHealthRecord_data','query_pregnancyWeek_data','to_eightTenSelfRecord_page','submit_eightTenSelfRecord_data',
            'update_eightTenSelfRecord_data','query_eightTenSelfRecord_data','to_deliverSelfRecord_page','submit_deliverSelfRecord_data','update_deliverSelfRecord_data','query_deliverSelfRecord_data','to_deliverDoctorRecord_page',
            'submit_deliverDoctorRecord_data','update_deliverDoctorRecord_data','query_deliverDoctorRecord_data','to_materSelfRecord_page','submit_materSelfRecord_data','update_materSelfRecord_data','query_materSelfRecord_data',
            'to_afterMaterDoctorRecord_page','submit_afterMaterDoctorRecord_data','update_afterMaterDoctorRecord_data','query_afterMaterDoctorRecord_data','to_afterMaterFortyTwoDoctorTest_page','query_afterMaterFortyTwoDoctorTest_data',
            'to_addAfterMaterFortyTwoDoctorTest_page','submit_simplyAfterMaterFortyTwoDoctorTest_data','update_simplyAfterMaterFortyTwoDoctorTest_data','query_simplyAfterMaterFortyTwoDoctorTest_data','to_baby_page',
            'query_babyBasicMsg_data','to_addBabyBasicMsg_page','submit_babyBasicMsg_data','update_babyBasicMsg_data','query_simplyBabyBasicMsg_data','to_parentSelfRecord_page','to_beforeMaterEugenincsTest_page','to_addEugenincsRecord_page',
            'to_babyBirthRecord_page','to_updateBabyBirthRecord_page','to_hasTeethRecord_page','to_addHasTeethRecord_page','to_babyBrand_page','to_addBabyBrand_page','to_homeTree_page','to_newBabyRecord_page','to_addNewBabyRecord_page',
            'to_bacterinAndScreen_page','to_newBabyHealthRecord_page','to_addNewBabyHealthRecord_page','to_oneMonthRecord_page','to_threeMonthRecord_page','to_sixMonthRecord_page','to_eightMonthRecord_page','to_oneYearRecord_page',
            'to_oneYearSixMonthRecord_page','to_twoYearRecord_page','to_twoYearSixMonthRecord_page','to_threeYearRecord_page','to_fourYearRecord_page','to_fiveYearRecord_page','to_sixYearRecord_page','query_parentSelfRecord_data',
            'submit_parentSelfRecord_data','query_beforeMaterEugenicsHealthTestList_data','query_beforeMaterEugenicsHealthTest_data','submit_beforeMaterEugenicsHealthTest_data','query_babyBirthRecordList_data','query_babyBirthRecord_data',
            'submit_babyBirthRecord_data','query_babyTeethRecordList_data','query_babyTeethRecord_data','submit_babyTeethRecord_data','query_babyBrand_data','submit_babyBrand_data','query_childRearingRecordVaccine_data','submit_childRearingRecordVaccine_data',
            'query_newBabyEarlyChildRearingRecord_data','query_simplyNewBabyEarlyChildRearingRecord_data','submit_simplyNewBabyEarlyChildRearingRecord_data','query_newBabyEarlyHealthRecord_data','query_simplyNewBabyEarlyHealthRecord_data',
            'submit_simplyNewBabyEarlyHealthRecord_data','query_oneMonthRecord_data','submit_oneMonthRecord_data','query_threeMonthRecord_data','submit_threeMonthRecord_data','query_sixMonthRecord_data','submit_sixMonthRecord_data',
            'query_eightMonthRecord_data','submit_eightMonthRecord_data','query_oneYearRecord_data','submit_oneYearRecord_data','query_oneYearSixMonthRecord_data','submit_oneYearSixMonthRecord_data','query_twoYearRecord_data',
            'submit_twoYearRecord_data','query_twoYearSixMouthRecord_data','submit_twoYearSixMouthRecord_data','query_threeYearRecord_data','submit_threeYearRecord_data','query_fourYearRecord_data','submit_fourYearRecord_data',
            'query_fiveYearRecord_data','submit_fiveYearRecord_data','query_sixYearRecord_data','submit_sixYearRecord_data','query_babyBrandImg_data','query_homeTree_data','submit_homeTree_data','to_choseCity_page',
            'query_useOrganiztion_data','query_statistics_data']
});

//patient医疗列表
route.map({
    pathUrl:/^\/web-bin\/m\/medical\/patient\/?/i,
    type:'mobile',
	url: '/mobile/medical/patient/',
    controller: 'patient',
    action:['to_medicalRecordList_page',
            'query_medicalRecordList_data',
            'to_refresh_page',
            'to_visit_case_page',
            'to_hosp_case_page',
            'to_test_case_page',
            'query_refresh_data',
            'query_startRefresh_data',
            'query_visitList_data',
            'query_visitOrder_data',
            'to_cost_page',
            'to_visit_medicine_page',
            'to_examination_page',
            'to_inspection_page',
            'query_hospList_data',
            'to_hosp_medicine_page',
            'to_hosp_operation_page',
            'query_visit_cost_data',
            'query_hosp_cost_data',
            'query_hosp_cost_detail_data',
            'to_cost_detail_page',
            'query_examination_data',
            'query_inspection_data',
            'query_barcode_data',
            'query_testList_data',
            'to_test_examination_page',
            'to_test_inspection_page',
            'to_barcode_detail_page',
            "query_patient_data"]
});

//doctor医疗列表
route.map({
    pathUrl:/^\/web-bin\/m\/medical\/doctor\/?/i,
    type:'mobile',
	url: '/mobile/medical/doctor/',
    controller: 'doctor',
    action:['to_medicalRecordList_page',
            'query_medicalRecordList_data',
            'to_refresh_page',
            'to_visit_case_page',
            'to_hosp_case_page',
            'query_refresh_data',
            'query_startRefresh_data',
            'query_visitList_data',
            'query_visitOrder_data',
            'to_cost_page',
            'to_visit_medicine_page',
            'to_examination_page',
            'to_inspection_page',
            'query_hospList_data',
            'to_hosp_medicine_page',
            'to_hosp_operation_page',
            'query_visit_cost_data',
            'query_hosp_cost_data',
            'query_hosp_cost_detail_data',
            'to_cost_detail_page',
            'query_examination_data',
            'query_inspection_data',
            "query_patient_data"]
});

//hospital医疗列表
route.map({
    pathUrl:/^\/web-bin\/m\/medical\/hospital\/?/i,
    type:'mobile',
	url: '/mobile/medical/hospital/',
    controller: 'hospital',
    action:['to_medicalRecordList_page',
            'query_medicalRecordList_data',
            'to_refresh_page',
            'to_visit_case_page',
            'to_hosp_case_page',
            'query_refresh_data',
            'query_startRefresh_data',
            'query_visitList_data',
            'query_visitOrder_data',
            'to_cost_page',
            'to_visit_medicine_page',
            'to_examination_page',
            'to_inspection_page',
            'query_hospList_data',
            'to_hosp_medicine_page',
            'to_hosp_operation_page',
            'query_visit_cost_data',
            'query_hosp_cost_data',
            'query_hosp_cost_detail_data',
            'to_cost_detail_page',
            'query_examination_data',
            'query_inspection_data',
            "query_patient_data"]
});

//angel医疗列表
route.map({
    pathUrl:/^\/web-bin\/m\/medical\/angel\/?/i,
    type:'mobile',
	url: '/mobile/medical/angel/',
    controller: 'angel',
    action:['to_medicalRecordList_page',
            'query_medicalRecordList_data',
            'to_refresh_page',
            'to_visit_case_page',
            'to_hosp_case_page',
            'query_refresh_data',
            'query_startRefresh_data',
            'query_visitList_data',
            'query_visitOrder_data',
            'to_cost_page',
            'to_visit_medicine_page',
            'to_examination_page',
            'to_inspection_page',
            'query_hospList_data',
            'to_hosp_medicine_page',
            'to_hosp_operation_page',
            'query_visit_cost_data',
            'query_hosp_cost_data',
            'query_hosp_cost_detail_data',
            'to_cost_detail_page',
            'query_examination_data',
            'query_inspection_data',
            "query_patient_data"]
});

//浙二医院随访
route.map({
    pathUrl:[/^\/web-bin\/m\/followup\/followupTask\/?/i,/^\/web-bin\/m\/oneparam\/followup\/followupTask\/?/i],
    type:'mobile',
    url: '/mobile/followup/followupTask/',
    controller: 'followupTask',
    action:['to_followUp_page',
            'to_finishFollow_page',
            'query_followUp_data',
            'to_education_page',
            'to_educationDetail_page',
            'to_processingFollowupTask_page',
            'query_doctor_power',
            'query_inHosp_data',
            'to_medicalRecordList_page',
            'get_medicalRecordList_data',
            'get_educationDetail_data',
            'query_formExcpStatus_data',
            'send_form_data',
            'submit_followup_task',
            'to_checkFollowupTask_page',
            'query_followupTask_data',
            'to_followupPlanDetail_page',
            'query_questionNaire_data',
            'to_closeCase_page',
            'submit_closeCase_data',
            'get_patientPhone_data',
            'to_educationSelect_page',
            'get_educationList_data',
            'post_educationList_data',
            'get_message_info',
            'get_ddAcess_info',
            'get_ddBind_info',
            'post_ddCreate_data',
            'get_user_info',
            'get_ddLogin_info',
            'get_ddConfig_info',
            'to_phoneTest_page',
            'to_skipFirst_page',
            'to_bindAccount_page',
            'post_bindFollowUp_data',
            'post_unbindFollowUp_data',
            'query_userInfo_data',
            'post_ddUnbind_data',
            'query_beginLog_info',
            'query_followupLog_info',
            'query_educationLog_info'
        ]
});

//通用医院随访
route.map({
    pathUrl:[/^\/web-bin\/m\/followup\/followupCommon\/?/i,/^\/web-bin\/m\/oneparam\/followup\/followupCommon\/?/i],
    type:'mobile',
    url: '/mobile/followup/followupCommon/',
    controller: 'followupCommon',
    action:['to_followUp_page',
        'to_finishFollow_page',
        'query_followUp_data',
        'to_education_page',
        'to_educationDetail_page',
        'to_processingFollowupCommon_page',
        'query_doctor_power',
        'query_inHosp_data',
        'to_medicalRecordList_page',
        'get_medicalRecordList_data',
        'get_educationDetail_data',
        'query_formExcpStatus_data',
        'send_form_data',
        'submit_followup_task',
        'to_checkFollowupCommon_page',
        'query_followupCommon_data',
        'to_followupPlanDetail_page',
        'query_questionNaire_data',
        'to_closeCase_page',
        'submit_closeCase_data',
        'get_patientPhone_data',
        'to_educationSelect_page',
        'get_educationList_data',
        'post_educationList_data',
        'get_message_info',
        'get_ddAcess_info',
        'get_ddBind_info',
        'post_ddCreate_data',
        'get_user_info',
        'get_ddLogin_info',
        'get_ddConfig_info',
        'to_phoneTest_page',
        'to_skipFirst_page',
        'to_bindAccount_page',
        'post_bindFollowUp_data',
        'post_unbindFollowUp_data',
        'query_userInfo_data',
        'post_ddUnbind_data'
    ]
});

//微信页面
route.map({
    pathUrl:/^\/web-bin\/m\/weChat\/chat\/?/i,
    type:'mobile',
	url: '/weChat/chat/',
    controller: 'chat',
    action:['to_index_page',
            'to_information_page',
            'to_content_page',
            'next_step_data',
            'get_code_data',
            'submit_information_data',
            'query_education_data',
            'query_information_data',
            'to_healthEdu_page',
            'to_followupQues_page',
            'query_education_newdata'
    ]
});
// 微信页面
route.map({
    pathUrl:[/^\/web-bin\/m\/weChat\/weChatPublic\/?/i,/^\/web-bin\/m\/oneparam\/weChat\/weChatPublic\/?/i],
    type:'mobile',
    url: '/weChat/weChatPublic/',
    controller: 'weChatPublic',
    action:['to_departList_page',
            'get_departList_data',
            'to_doctorList_page',
            'get_doctorList_data',
            'to_appointment_page',
            'get_appointList_data',
            'get_appointDetail_data',
            'to_appointConfirm_page',
            'get_user_data',
            'get_appointConfirm_data',
            'get_myAppointList_data',
            'to_myAppointment_page',
            'to_userBind_page',
            'post_user_data',
            'get_message_info',
            'to_userInfoImprove_page',
            'post_userInfoImprove_data',
            'to_userInfo_page',
            'get_userInfo_data',
            'to_addHospCard_page',
            'post_addHospCard_data',
            'to_medicalRecordList_page',
            'query_medicalRecordList_data',
            'to_visit_case_page',
            'to_hosp_case_page',
            'to_userHospCardList_page',
            'post_appointCancel_data',
            'query_hospName_data',
            'post_unbindWeChat_data',
            'to_memberList_page',
            'query_familyList_data',
            'post_addFamilyMember_data',
            'post_deleteFamilyMember_data',
            'to_memberInfo_page',
            'to_memberSwitch_page',
            'to_myMedic_page',
            'query_list_data',
            'query_doctor_data',
            'to_chat_page',
            'query_userMsg_data',
            'query_doing_data',
            'query_sendText_data',
            'query_msg_data',
            'to_findDoctor_page',
            'query_doctorList_data',
            'to_doctorMain_page',
            'query_doctorMain_data',
            'query_followDoc_data',
            'query_nofollowDoc_data',
            'query_sendPatient_data',
            'query_chatPay_data',
            'query_payPage_data',
            'to_buyWexin_page',
            'get_userCard_data',
            'query_isCardRequired_data',
            'to_hospCardSwitch_page',
            'to_importantDept_page',
            'query_importantDept_data',
            'query_flowDocClick_data',
            'to_deptDsc_page',
            'to_selectPat_page',
            'to_patientQuery_page',
            'to_diagnoseMsg_page',
            'to_feeVisit_page',
            'to_feeHosp_page',
            'get_feeVisit_data',
            'get_feeHosp_data',
            'get_feeVisitDetail_data',
            'get_feeHospDetail_data',
            'to_dayDetail_page',
            'to_medicMsg_page',
            'to_medicDetail_page',
            'get_inHosQuery_data',
            'get_medicList_data',
            'get_medicDetail_data',
            'to_checkList_page',
            'to_checkDetail_page',
            'get_checkDetail_data',
            'get_checkList_data',
            'to_testList_page',
            'get_testList_data',
            'to_testDetail_page',
            'get_testDetail_data',
            'to_sanCode_page',
            'to_doctorMainQ_page',
            'query_docData_data',
            'query_docGroup_data',
            'query_collectGroup_data',
            'to_selfPayList_page',
            'to_selfPayMain_page',
            'query_selfPayList_data',
            'query_selfPayMain_data',
            'query_qaList_data',
            'to_qaList_page',
            'query_selfPayMain_data',
            'to_feedBack_page',
            'query_suggestType_data',
            'query_suggestSubmit_data',
            'to_complaintsPraise_page',
            'to_addComplaintsPraise_page',
            'query_complaintsPraise_data',
            'query_caseNoMedicalRecordList_data',
            'query_fileDownloadPraise_data',
            'query_addComplaintsPraise_data',
            'to_qaList_page',
            'to_chronicDiseaseRecruit_page'
            ]
});
//投诉表扬
route.map({
    pathUrl:/^\/web-bin\/m\/followup\/feedBack\/?/i,
    type:'mobile',
    url: '/mobile/followup/feedBack/',
    controller: 'feedBack',
    action:[
        'to_departSelect_page',
        'to_feedBackInput_page',
        'to_feedBackList_page',
        'query_feedBackList_data',
        'to_feedBackDetail_page',
        'query_feedBackDetail_data',
        'get_departList_data',
        'get_slideDown_data',
        'post_userLogin_data',
        'post_formInfo_data',
        'query_userInfo_data'
    ]
});
//满意度调查
route.map({
    pathUrl:/^\/web-bin\/m\/followup\/satisSurvey\/?/i,
    type:'mobile',
    url: '/mobile/followup/satisSurvey/',
    controller: 'satisSurvey',
    action:[
        'to_patientList_page',
        'to_questionList_page',
        'query_doctor_power',
        'get_patientList_data',
        'post_userLogin_data',
        'get_questionList_data',
        'get_urlBuild_data',
        'to_patientListNew_page'
    ]
});
//药品知识库相关
route.map({
    pathUrl:/^\/web-bin\/m\/nosen\/repository\/drug\/?/i,
    type:'mobile',
	url: '/mobile/repository/drug/',
    controller: 'drug',
    action:['to_drugList_page','query_drugTypeList_data','query_drugNameList_data','query_drugMsg_data','to_drugMsg_page','query_searchDrug_data']
});
//疾病知识库相关
route.map({
    pathUrl:/^\/web-bin\/m\/nosen\/repository\/disease\/?/i,
    type:'mobile',
	url: '/mobile/repository/disease/',
    controller: 'disease',
    action:['to_diseaseList_page','query_diseaseTypeList1_data','query_diseaseNameList1_data','query_diseaseTypeList2_data','query_diseaseNameList2_data','query_diseaseMsg_data','to_diseaseMsg_page','query_searchDisease_data']
});
//急救知识库相关
route.map({
    pathUrl:/^\/web-bin\/m\/nosen\/repository\/aid\/?/i,
    type:'mobile',
	url: '/mobile/repository/aid/',
    controller: 'aid',
    action:['to_aidList_page','query_aidTypeList_data','query_aidNameList_data','query_aidMsg_data','to_emergencyMsg_page','query_searchAid_data']
});
//医院专科排名
route.map({
    pathUrl:/^\/web-bin\/m\/nosen\/repository\/hospital\/?/i,
    type:'mobile',
	url: '/mobile/repository/hospital/',
    controller: 'hospital',
    action:['to_hosList_page','query_hosTypeList_data','query_hosNameList_data','query_hosMsg_data','to_hosMsg_page','query_hosMsgCode_data']
});
//other分享页面
route.map({
    pathUrl:/^\/web-bin\/m\/nosen\/medical\/other\/?/i,
    type:'mobile',
	url: '/mobile/medical/other/',
    controller: 'other',
    action:['to_share_page',
            'query_shareList_data']
});
//医护H5
route.map({
    pathUrl:[/^\/web-bin\/m\/followup\/healthCare\/?/i,/^\/web-bin\/m\/oneparam\/followup\/healthCare\/?/i],
    type:'mobile',
    url: '/mobile/followup/healthCare/',
    controller: 'followupCommon',
    action:['to_followUp_page',
        'to_finishFollow_page',
        'query_followUp_data',
        'to_education_page',
        'to_educationDetail_page',
        'to_processingFollowupCommon_page',
        'query_doctor_power',
        'query_inHosp_data',
        'to_medicalRecordList_page',
        'get_medicalRecordList_data',
        'get_educationDetail_data',
        'query_formExcpStatus_data',
        'send_form_data',
        'submit_followup_task',
        'to_checkFollowupCommon_page',
        'query_followupCommon_data',
        'to_followupPlanDetail_page',
        'query_questionNaire_data',
        'to_closeCase_page',
        'submit_closeCase_data',
        'get_patientPhone_data',
        'to_educationSelect_page',
        'get_educationList_data',
        'post_educationList_data',
        'get_message_info',
        'get_ddAcess_info',
        'get_ddBind_info',
        'post_ddCreate_data',
        'get_user_info',
        'get_ddLogin_info',
        'get_ddConfig_info',
        'to_phoneTest_page',
        'to_skipFirst_page',
        'to_bindAccount_page',
        'post_bindFollowUp_data',
        'post_unbindFollowUp_data',
        'query_userInfo_data',
        'post_ddUnbind_data',
        'to_hosFollowup_page',
        'to_hosFollowDetail_page',
        'to_hosFollowSelect_page',
        'get_hosFollowDetail_data',
        'post_hosQuestList_data',
        'get_openForm_data',
        'to_wardDept_page',
        'to_hospPatientNew_page',
        'to_hospFollowupNew_page'
    ]
});
//慢病随访自助建档
route.map({
    pathUrl:/^\/web-bin\/m\/nosen\/chronicDiseases\/selfFiling\/?/i,
    type:'mobile',
    url: '/mobile/chronicDiseases/selfFiling/',
    controller: 'selfFiling',
    action:['to_filingEntrance_page','submit_basic_data','to_archivesList_page','query_archivesList_data',
        'query_checkForm_data','submit_replyForm_data']
});