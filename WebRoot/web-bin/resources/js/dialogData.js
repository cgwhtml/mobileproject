//职业
var jobData='<p><input type="radio" name="radio" value="农、牧、渔"/><span>农、牧、渔</span></p>'+
			'<p><input type="radio" name="radio" value="干部、职员"/><span>干部、职员</span></p>'+
			'<p><input type="radio" name="radio" value="商业、服务"/><span>商业、服务</span></p>'+
			'<p><input type="radio" name="radio" value="文、教、体"/><span>文、教、体</span></p>'+
			'<p><input type="radio" name="radio" value="医药、科技"/><span>医药、科技</span></p>'+
			'<p><input type="radio" name="radio" value="工人"/><span>工人</span></p>'+
			'<p><input type="radio" name="radio" value="军人"/><span>军人</span></p>'+
			'<p><input type="radio" name="radio" value="个体"/><span>个体</span></p>'+
			'<p><input type="radio" name="radio" value="家务"/><span>家务</span></p>'+
			'<p><input type="radio" name="radio" value="其他"/><span>其他</span></p>';
//民族
var nationData='<p><input type="radio" name="radio" value="1"><span>汉族</span></p>' +
				'<p><input type="radio" name="radio" value="2"><span>蒙古族</span></p>' +
				'<p><input type="radio" name="radio" value="3"><span>回族</span></p>' +
				'<p><input type="radio" name="radio" value="4"><span>藏族</span></p>' +
				'<p><input type="radio" name="radio" value="5"><span>维吾尔族</span></p>' +
				'<p><input type="radio" name="radio" value="6"><span>苗族</span></p>' +
				'<p><input type="radio" name="radio" value="7"><span>彝族</span></p>' +
				'<p><input type="radio" name="radio" value="8"><span>壮族</span></p>' +
				'<p><input type="radio" name="radio" value="9"><span>布依族</span></p>' +
				'<p><input type="radio" name="radio" value="10"><span>朝鲜族</span></p>' +
				'<p><input type="radio" name="radio" value="11"><span>满族</span></p>' +
				'<p><input type="radio" name="radio" value="12"><span>侗族</span></p>' +
				'<p><input type="radio" name="radio" value="13"><span>瑶族</span></p>' +
				'<p><input type="radio" name="radio" value="14"><span>白族</span></p>' +
				'<p><input type="radio" name="radio" value="15"><span>土家族</span></p>' +
				'<p><input type="radio" name="radio" value="16"><span>哈尼族</span></p>' +
				'<p><input type="radio" name="radio" value="17"><span>哈萨克族</span></p>' +
				'<p><input type="radio" name="radio" value="18"><span>傣族</span></p>' +
				'<p><input type="radio" name="radio" value="19"><span>黎族</span></p>' +
				'<p><input type="radio" name="radio" value="20"><span>傈僳族</span></p>' +
				'<p><input type="radio" name="radio" value="21"><span>佤族</span></p>' +
				'<p><input type="radio" name="radio" value="22"><span>畲族</span></p>' +
				'<p><input type="radio" name="radio" value="23"><span>高山族</span></p>' +
				'<p><input type="radio" name="radio" value="24"><span>拉祜族</span></p>' +
				'<p><input type="radio" name="radio" value="25"><span>水族</span></p>' +
				'<p><input type="radio" name="radio" value="26"><span>东乡族</span></p>' +
				'<p><input type="radio" name="radio" value="27"><span>纳西族</span></p>' +
				'<p><input type="radio" name="radio" value="28"><span>景颇族</span></p>' +
				'<p><input type="radio" name="radio" value="29"><span>柯尔克孜族</span></p>' +
				'<p><input type="radio" name="radio" value="30"><span>土族</span></p>' +
				'<p><input type="radio" name="radio" value="31"><span>达斡尔族</span></p>' +
				'<p><input type="radio" name="radio" value="32"><span>仫佬族</span></p>' +
				'<p><input type="radio" name="radio" value="33"><span>羌族</span></p>' +
				'<p><input type="radio" name="radio" value="34"><span>布朗族</span></p>' +
				'<p><input type="radio" name="radio" value="35"><span>撒拉族</span></p>' +
				'<p><input type="radio" name="radio" value="36"><span>毛南族</span></p>' +
				'<p><input type="radio" name="radio" value="37"><span>仡佬族</span></p>' +
				'<p><input type="radio" name="radio" value="38"><span>锡伯族</span></p>' +
				'<p><input type="radio" name="radio" value="39"><span>阿昌族</span></p>' +
				'<p><input type="radio" name="radio" value="40"><span>普米族</span></p>' +
				'<p><input type="radio" name="radio" value="41"><span>塔吉克族</span></p>' +
				'<p><input type="radio" name="radio" value="42"><span>怒族</span></p>' +
				'<p><input type="radio" name="radio" value="43"><span>乌孜别克族</span></p>' +
				'<p><input type="radio" name="radio" value="44"><span>俄罗斯族</span></p>' +
				'<p><input type="radio" name="radio" value="45"><span>鄂温克族</span></p>' +
				'<p><input type="radio" name="radio" value="46"><span>德昂族</span></p>' +
				'<p><input type="radio" name="radio" value="47"><span>保安族</span></p>' +
				'<p><input type="radio" name="radio" value="48"><span>裕固族</span></p>' +
				'<p><input type="radio" name="radio" value="49"><span>京族</span></p>' +
				'<p><input type="radio" name="radio" value="50"><span>塔塔尔族</span></p>' +
				'<p><input type="radio" name="radio" value="51"><span>独龙族</span></p>' +
				'<p><input type="radio" name="radio" value="52"><span>鄂伦春族</span></p>' +
				'<p><input type="radio" name="radio" value="53"><span>赫哲族</span></p>' +
				'<p><input type="radio" name="radio" value="54"><span>门巴族</span></p>' +
				'<p><input type="radio" name="radio" value="55"><span>珞巴族</span></p>' +
				'<p><input type="radio" name="radio" value="56"><span>基诺族</span></p>';
//文化程度
var educationData='<p><input type="radio" name="radio" value="大学及以上"><span>大学及以上</span></p>' +
					'<p><input type="radio" name="radio" value="高中"><span>高中</span></p>' +
					'<p><input type="radio" name="radio" value="初中"><span>初中</span></p>' +
					'<p><input type="radio" name="radio" value="小学"><span>小学</span></p>' +
					'<p><input type="radio" name="radio" value="文盲"><span>文盲</span></p>' +
					'<p><input type="radio" name="radio" value="不详"><span>不详</span></p>';
//文化程度带编码
var educationDataType='<p><input type="radio" name="radio" value="378"><span>小学</span></p>' +
    '<p><input type="radio" name="radio" value="375"><span>初中</span></p>' +
    '<p><input type="radio" name="radio" value="372"><span>高中</span></p>' +
    '<p><input type="radio" name="radio" value="376"><span>中专</span></p>' +
    '<p><input type="radio" name="radio" value="373"><span>大专</span></p>' +
    '<p><input type="radio" name="radio" value="374"><span>本科</span></p>'+
    '<p><input type="radio" name="radio" value="379"><span>研究生</span></p>'+
    '<p><input type="radio" name="radio" value="1735"><span>博士</span></p>'+
    '<p><input type="radio" name="radio" value="377"><span>其他</span></p>';
//婚姻状况&编码
var marriageDataType='<p><input type="radio" name="radio" value="1"><span>未说明婚姻状况</span></p>' +
				'<p><input type="radio" name="radio" value="2"><span>已婚</span></p>' +
				'<p><input type="radio" name="radio" value="3"><span>未婚</span></p>' +
				'<p><input type="radio" name="radio" value="4"><span>离婚</span></p>' +
				'<p><input type="radio" name="radio" value="5"><span>丧偶</span></p>';
//婚姻状况
var marriageData='<p><input type="radio" name="radio" value="未说明婚姻状况"><span>未说明婚姻状况</span></p>' +
				'<p><input type="radio" name="radio" value="已婚"><span>已婚</span></p>' +
				'<p><input type="radio" name="radio" value="未婚"><span>未婚</span></p>' +
				'<p><input type="radio" name="radio" value="离婚"><span>离婚</span></p>' +
				'<p><input type="radio" name="radio" value="丧偶"><span>丧偶</span></p>';
//本次怀孕方式
var thisPregWayNameData='<p><input type="radio" name="radio" value="自然受精"><span>自然受精</span></p>' +
						'<p><input type="radio" name="radio" value="人工受精"><span>人工受精</span></p>' +
						'<p><input type="radio" name="radio" value="试管婴儿"><span>试管婴儿</span></p>';
//本次怀孕方式加code
var thisPregWayNameDataType='<p><input type="radio" name="radio" value="1"><span>自然受精</span></p>' +
    '<p><input type="radio" name="radio" value="2"><span>人工受精</span></p>' +
    '<p><input type="radio" name="radio" value="3"><span>试管婴儿</span></p>';
//早孕反应
var earlyPregReactionNameData='<p><input type="radio" name="radio" value="无"><span>无</span></p>' +
								'<p><input type="radio" name="radio" value="轻微"><span>轻微</span></p>' +
								'<p><input type="radio" name="radio" value="严重"><span>严重</span></p>' +
								'<p><input type="radio" name="radio" value="严重需住院治疗"><span>严重需住院治疗</span></p>';
//早孕反应加code
var earlyPregReactionNameDataType='<p><input type="radio" name="radio" value="1"><span>无</span></p>' +
                                    '<p><input type="radio" name="radio" value="2"><span>轻微</span></p>' +
                                    '<p><input type="radio" name="radio" value="3"><span>严重</span></p>' +
                                    '<p><input type="radio" name="radio" value="4"><span>严重需住院治疗</span></p>';
//一般症状
var generalSymptomsNameData='<p><input type="checkbox" name="checkbox" value="无"><span>无</span></p>' +
							'<p><input type="checkbox" name="checkbox" value="头晕"><span>头晕</span></p>' +
							'<p><input type="checkbox" name="checkbox" value="胸闷"><span>胸闷</span></p>' +
							'<p><input type="checkbox" name="checkbox" value="头痛"><span>头痛</span></p>' +
							'<p><input type="checkbox" name="checkbox" value="腰酸"><span>腰酸</span></p>' +
							'<p><input type="checkbox" name="checkbox" value="肚疼"><span>肚疼</span></p>' +
							'<p><input type="checkbox" name="checkbox" value="浮肿"><span>浮肿</span></p>' +
							'<p><input type="checkbox" name="checkbox" value="抽筋"><span>抽筋</span></p>' +
							'<p><input type="checkbox" name="checkbox" value="便秘"><span>便秘</span></p>' +
							'<p><input type="checkbox" name="checkbox" value="白带"><span>白带</span></p>' +
							'<p><input type="checkbox" name="checkbox" value="流血"><span>流血</span></p>' +
							'<p><input type="checkbox" name="checkbox" value="其他"><span>其他</span></p>';
//发病情况
var onsetStatusNameData='<p><input type="checkbox" name="checkbox" value="无"><span>无</span></p>' +
							'<p><input type="checkbox" name="checkbox" value="肝炎"><span>肝炎</span></p>' +
							'<p><input type="checkbox" name="checkbox" value="风疹"><span>风疹</span></p>' +
							'<p><input type="checkbox" name="checkbox" value="流感"><span>流感</span></p>' +
							'<p><input type="checkbox" name="checkbox" value="发烧"><span>发烧</span></p>' +
							'<p><input type="checkbox" name="checkbox" value="慢性呼吸"><span>慢性呼吸</span></p>' +
							'<p><input type="checkbox" name="checkbox" value="精神病（已控制）"><span>精神病（已控制）</span></p>' +
							'<p><input type="checkbox" name="checkbox" value="精神病（未控制）"><span>精神病（未控制）</span></p>' +
							'<p><input type="checkbox" name="checkbox" value="急性阑尾炎"><span>急性阑尾炎</span></p>' +
							'<p><input type="checkbox" name="checkbox" value="其他"><span>其他</span></p>';
//ABO血型
var aboData='<p><input type="radio" name="radio" value="A"><span>A型</span></p>' +
					'<p><input type="radio" name="radio" value="B"><span>B型</span></p>' +
					'<p><input type="radio" name="radio" value="AB"><span>AB型</span></p>' +
					'<p><input type="radio" name="radio" value="O"><span>O型</span></p>' +
					'<p><input type="radio" name="radio" value="不详"><span>不详</span></p>';
//ABO血型
var aboBloodTypeDate='<p><input type="radio" name="radio" value="A型"/><span>A型</span></p>'+
    '<p><input type="radio" name="radio" value="B型"/><span>B型</span></p>'+
    '<p><input type="radio" name="radio" value="O型"/><span>O型</span></p>'+
    '<p><input type="radio" name="radio" value="AB型"/><span>AB型</span></p>';
//ABO血型&编码
var aboBloodTypeDateType='<p><input type="radio" name="radio" value="1"/><span>不详</span></p>'+
    '<p><input type="radio" name="radio" value="2"/><span>A型</span></p>'+
    '<p><input type="radio" name="radio" value="3"/><span>B型</span></p>'+
    '<p><input type="radio" name="radio" value="4"/><span>AB型</span></p>'+
    '<p><input type="radio" name="radio" value="5"/><span>O型</span></p>';
//RH血型
var rhBloodTypeDate= '<p><input type="radio" name="radio" value="阴性"/><span>阴性</span></p>'+
    '<p><input type="radio" name="radio" value="阳性"/><span>阳性</span></p>';
//RH血型&编码
var rhBloodTypeDateType= '<p><input type="radio" name="radio" value="1"/><span>不详</span></p>'+
    '<p><input type="radio" name="radio" value="2"/><span>阴性</span></p>'+
    '<p><input type="radio" name="radio" value="3"/><span>阳性</span></p>';
//Rh血型
var rhData='<p><input type="radio" name="radio" value="Rh阴性"><span>Rh阴性</span></p>' +
						'<p><input type="radio" name="radio" value="Rh阳性"><span>Rh阳性</span></p>' +
						'<p><input type="radio" name="radio" value="不详"><span>不详</span></p>';
//月经量
var menstruationLevelNameData='<p><input type="radio" name="radio" value="多"><span>多</span></p>' +
						'<p><input type="radio" name="radio" value="中"><span>中</span></p>' +
						'<p><input type="radio" name="radio" value="少"><span>少</span></p>';
//月经量加code
var menstruationLevelNameDataType='<p><input type="radio" name="radio" value="1"><span>多</span></p>' +
    '<p><input type="radio" name="radio" value="2"><span>中</span></p>' +
    '<p><input type="radio" name="radio" value="3"><span>少</span></p>';
//痛经程度
var dysmenorrheaLevelNameData='<p><input type="radio" name="radio" value="无"><span>无</span></p>' +
						'<p><input type="radio" name="radio" value="轻"><span>轻</span></p>' +
						'<p><input type="radio" name="radio" value="重"><span>重</span></p>';
//痛经程度加code
var dysmenorrheaLevelNameDataType='<p><input type="radio" name="radio" value="1"><span>无</span></p>' +
    '<p><input type="radio" name="radio" value="2"><span>轻</span></p>' +
    '<p><input type="radio" name="radio" value="3"><span>重</span></p>';
//疾病史
var inllnessHisData='<p><input type="checkbox" name="checkbox" value="无疾病史"><span>无疾病史</span></p>' +
							'<p><input type="checkbox" name="checkbox" value="心脏病"><span>心脏病</span></p>' +
							'<p><input type="checkbox" name="checkbox" value="肾脏疾病"><span>肾脏疾病</span></p>' +
							'<p><input type="checkbox" name="checkbox" value="肝脏疾病"><span>肝脏疾病</span></p>' +
							'<p><input type="checkbox" name="checkbox" value="高血压"><span>高血压</span></p>' +
							'<p><input type="checkbox" name="checkbox" value="贫血"><span>贫血</span></p>' +
							'<p><input type="checkbox" name="checkbox" value="糖尿病"><span>糖尿病</span></p>' +
							'<p><input type="checkbox" name="checkbox" value="结核病"><span>结核病</span></p>' +
							'<p><input type="checkbox" name="checkbox" value="甲状腺疾病"><span>甲状腺疾病</span></p>' +
							'<p><input type="checkbox" name="checkbox" value="免疫系统疾病"><span>免疫系统疾病</span></p>' +
							'<p><input type="checkbox" name="checkbox" value="哮喘"><span>哮喘</span></p>' +
							'<p><input type="checkbox" name="checkbox" value="其他"><span>其他</span></p>';
//疾病史加code
var inllnessHisDataType='<p><input type="checkbox" name="checkbox" value="1"><span>无疾病史</span></p>' +
    '<p><input type="checkbox" name="checkbox" value="2"><span>心脏病</span></p>' +
    '<p><input type="checkbox" name="checkbox" value="3"><span>肾脏疾病</span></p>' +
    '<p><input type="checkbox" name="checkbox" value="4"><span>肝脏疾病</span></p>' +
    '<p><input type="checkbox" name="checkbox" value="5"><span>高血压</span></p>' +
    '<p><input type="checkbox" name="checkbox" value="6"><span>贫血</span></p>' +
    '<p><input type="checkbox" name="checkbox" value="7"><span>糖尿病</span></p>' +
    '<p><input type="checkbox" name="checkbox" value="8"><span>结核病</span></p>' +
    '<p><input type="checkbox" name="checkbox" value="9"><span>甲状腺疾病</span></p>' +
    '<p><input type="checkbox" name="checkbox" value="10"><span>免疫系统疾病</span></p>' +
    '<p><input type="checkbox" name="checkbox" value="11"><span>哮喘</span></p>' +
    '<p><input type="checkbox" name="checkbox" value="12"><span>其他</span></p>';
//过敏史
var allergyHisNameData='<p><input type="checkbox" name="checkbox" value="无过敏史"><span>无过敏史</span></p>' +
			'<p><input type="checkbox" name="checkbox" value="青霉素"><span>青霉素</span></p>' +
			'<p><input type="checkbox" name="checkbox" value="磺胺"><span>磺胺</span></p>' +
			'<p><input type="checkbox" name="checkbox" value="链霉素"><span>链霉素</span></p>' +
			'<p><input type="checkbox" name="checkbox" value="其他"><span>其他</span></p>';
//过敏史加code
var allergyHisNameDataType='<p><input type="checkbox" name="checkbox" value="1"><span>无过敏史</span></p>' +
    '<p><input type="checkbox" name="checkbox" value="2"><span>青霉素</span></p>' +
    '<p><input type="checkbox" name="checkbox" value="3"><span>磺胺</span></p>' +
    '<p><input type="checkbox" name="checkbox" value="4"><span>链霉素</span></p>' +
    '<p><input type="checkbox" name="checkbox" value="5"><span>其他</span></p>';
//妊娠并发史
var pregComplicatedHisNameData='<p><input type="checkbox" name="checkbox" value="无"><span>无</span></p>' +
						'<p><input type="checkbox" name="checkbox" value="产前出血"><span>产前出血</span></p>' +
						'<p><input type="checkbox" name="checkbox" value="母子血型不合"><span>母子血型不合</span></p>' +
						'<p><input type="checkbox" name="checkbox" value="妊娠期高血压"><span>妊娠期高血压</span></p>' +
						'<p><input type="checkbox" name="checkbox" value="双胎巨大儿"><span>双胎巨大儿</span></p>' +
						'<p><input type="checkbox" name="checkbox" value="胎动"><span>胎动</span></p>' +
						'<p><input type="checkbox" name="checkbox" value="胎儿宫内生长受限"><span>胎儿宫内生长受限</span></p>' +
						'<p><input type="checkbox" name="checkbox" value="胎膜早破"><span>胎膜早破</span></p>' +
						'<p><input type="checkbox" name="checkbox" value="胎位不正"><span>胎位不正</span></p>' +
						'<p><input type="checkbox" name="checkbox" value="胎心"><span>胎心</span></p>' +
						'<p><input type="checkbox" name="checkbox" value="先兆早产"><span>先兆早产</span></p>' +
						'<p><input type="checkbox" name="checkbox" value="延期、过期妊娠"><span>延期、过期妊娠</span></p>' +
						'<p><input type="checkbox" name="checkbox" value="羊水量异常"><span>羊水量异常</span></p>' +
						'<p><input type="checkbox" name="checkbox" value="先兆流产"><span>先兆流产</span></p>';
//妊娠并发史加code
var pregComplicatedHisNameDataType='<p><input type="checkbox" name="checkbox" value="1"><span>无</span></p>' +
    '<p><input type="checkbox" name="checkbox" value="2"><span>产前出血</span></p>' +
    '<p><input type="checkbox" name="checkbox" value="3"><span>母子血型不合</span></p>' +
    '<p><input type="checkbox" name="checkbox" value="4"><span>妊娠期高血压</span></p>' +
    '<p><input type="checkbox" name="checkbox" value="5"><span>双胎巨大儿</span></p>' +
    '<p><input type="checkbox" name="checkbox" value="6"><span>胎动</span></p>' +
    '<p><input type="checkbox" name="checkbox" value="7"><span>胎儿宫内生长受限</span></p>' +
    '<p><input type="checkbox" name="checkbox" value="8"><span>胎膜早破</span></p>' +
    '<p><input type="checkbox" name="checkbox" value="9"><span>胎位不正</span></p>' +
    '<p><input type="checkbox" name="checkbox" value="10"><span>胎心</span></p>' +
    '<p><input type="checkbox" name="checkbox" value="11"><span>先兆早产</span></p>' +
    '<p><input type="checkbox" name="checkbox" value="12"><span>延期、过期妊娠</span></p>' +
    '<p><input type="checkbox" name="checkbox" value="13"><span>羊水量异常</span></p>' +
    '<p><input type="checkbox" name="checkbox" value="14"><span>先兆流产</span></p>';
//孕产状况
var maternityStatusData='<p><input type="radio" name="radio" value="足月产-健"><span>足月产-健</span></p>' +
						'<p><input type="radio" name="radio" value="巨大胎"><span>巨大胎</span></p>' +
						'<p><input type="radio" name="radio" value="足月产-亡"><span>足月产-亡</span></p>' +
						'<p><input type="radio" name="radio" value="早产-健"><span>早产-健</span></p>' +
						'<p><input type="radio" name="radio" value="畸形-亡"><span>畸形-亡</span></p>' +
						'<p><input type="radio" name="radio" value="双胎"><span>双胎</span></p>' +
						'<p><input type="radio" name="radio" value="死胎"><span>死胎</span></p>' +
						'<p><input type="radio" name="radio" value="死产"><span>死产</span></p>' +
						'<p><input type="radio" name="radio" value="胎位异常"><span>胎位异常</span></p>' +
						'<p><input type="radio" name="radio" value="妊娠症"><span>妊娠症</span></p>' +
						'<p><input type="radio" name="radio" value="前置胎盘"><span>前置胎盘</span></p>' +
						'<p><input type="radio" name="radio" value="胎盘早剥"><span>胎盘早剥</span></p>' +
						'<p><input type="radio" name="radio" value="阴道手术"><span>阴道手术</span></p>' +
						'<p><input type="radio" name="radio" value="剖宫产"><span>剖宫产</span></p>' +
						'<p><input type="radio" name="radio" value="人流"><span>人流</span></p>' +
						'<p><input type="radio" name="radio" value="自然流产"><span>自然流产</span></p>' +
						'<p><input type="radio" name="radio" value="引产"><span>引产</span></p>' +
						'<p><input type="radio" name="radio" value="药流"><span>药流</span></p>' +
						'<p><input type="radio" name="radio" value="胎停"><span>胎停</span></p>' +
						'<p><input type="radio" name="radio" value="宫外孕"><span>宫外孕</span></p>' +
						'<p><input type="radio" name="radio" value="其他"><span>其他</span></p>';
//孕产状况&编码
var maternityStatusDataType='<p><input type="radio" name="radio" value="1"><span>足月产-健</span></p>' +
    '<p><input type="radio" name="radio" value="2"><span>巨大胎</span></p>' +
    '<p><input type="radio" name="radio" value="3"><span>足月产-亡</span></p>' +
    '<p><input type="radio" name="radio" value="4"><span>早产-健</span></p>' +
    '<p><input type="radio" name="radio" value="5"><span>畸形-亡</span></p>' +
    '<p><input type="radio" name="radio" value="6"><span>双胎</span></p>' +
    '<p><input type="radio" name="radio" value="7"><span>死胎</span></p>' +
    '<p><input type="radio" name="radio" value="8"><span>死产</span></p>' +
    '<p><input type="radio" name="radio" value="9"><span>胎位异常</span></p>' +
    '<p><input type="radio" name="radio" value="10"><span>妊娠症</span></p>' +
    '<p><input type="radio" name="radio" value="11"><span>前置胎盘</span></p>' +
    '<p><input type="radio" name="radio" value="12"><span>胎盘早剥</span></p>' +
    '<p><input type="radio" name="radio" value="13"><span>阴道手术</span></p>' +
    '<p><input type="radio" name="radio" value="14"><span>剖宫产</span></p>' +
    '<p><input type="radio" name="radio" value="15"><span>人流</span></p>' +
    '<p><input type="radio" name="radio" value="16"><span>自然流产</span></p>' +
    '<p><input type="radio" name="radio" value="17"><span>引产</span></p>' +
    '<p><input type="radio" name="radio" value="18"><span>药流</span></p>' +
    '<p><input type="radio" name="radio" value="19"><span>胎停</span></p>' +
    '<p><input type="radio" name="radio" value="20"><span>宫外孕</span></p>' +
    '<p><input type="radio" name="radio" value="21"><span>其他</span></p>';
//小孩性别
var childSexData='<p><input type="radio" name="radio" value="1"><span>男</span></p>' +
					'<p><input type="radio" name="radio" value="2"><span>女</span></p>' +
					'<p><input type="radio" name="radio" value="9"><span>未知性别</span></p>';
//孕妇医疗保障类型
var pregnantInsurance='<p><input type="radio" name="radio" value="自费"/><span>自费</span></p>'+
    '<p><input type="radio" name="radio" value="医疗保险"/><span>医疗保险</span></p>'+
    '<p><input type="radio" name="radio" value="公费医疗"/><span>公费医疗</span></p>'+
    '<p><input type="radio" name="radio" value="生育保险"/><span>生育保险</span></p>'+
    '<p><input type="radio" name="radio" value="新农合"/><span>新农合</span></p>'+
    '<p><input type="radio" name="radio" value="商业保险"/><span>商业保险</span></p>';
//尿糖，尿蛋白，尿酮体类型
var ureterData='<p><input type="radio" name="radio" value="无"/><span>无</span></p>'+
    '<p><input type="radio" name="radio" value="±"/><span>±</span></p>'+
    '<p><input type="radio" name="radio" value="+"/><span>+</span></p>'+
    '<p><input type="radio" name="radio" value="++"/><span>++</span></p>'+
    '<p><input type="radio" name="radio" value="+++"/><span>+++</span></p>'+
    '<p><input type="radio" name="radio" value="++++"/><span>++++</span></p>';
//胎位
var fetusPositionData='<p><input type="radio" name="radio" value="左枕前（LOA）"/><span>左枕前（LOA）</span></p>'+
    '<p><input type="radio" name="radio" value="枕左横（LOT）"/><span>枕左横（LOT）</span></p>'+
    '<p><input type="radio" name="radio" value="枕左后（LOP）"/><span>枕左后（LOP）</span></p>'+
    '<p><input type="radio" name="radio" value="枕右前（ROA）"/><span>枕右前（ROA）</span></p>'+
    '<p><input type="radio" name="radio" value="枕右横（ROT）"/><span>枕右横（ROT）</span></p>'+
    '<p><input type="radio" name="radio" value="枕右后（ROP）"/><span>枕右后（ROP）</span></p>'+
    '<p><input type="radio" name="radio" value="左骶前（LSA）"/><span>左骶前（LSA）</span></p>'+
    '<p><input type="radio" name="radio" value="骶左横（LST）"/><span>骶左横（LST）</span></p>'+
    '<p><input type="radio" name="radio" value="骶左后（LSP）"/><span>骶左后（LSP）</span></p>'+
    '<p><input type="radio" name="radio" value="右骶前（RSA）"/><span>右骶前（RSA）</span></p>'+
    '<p><input type="radio" name="radio" value="骶右横（RST）"/><span>骶右横（RST）</span></p>'+
    '<p><input type="radio" name="radio" value="骶右后（RSP）"/><span>骶右后（RSP）</span></p>'+
    '<p><input type="radio" name="radio" value="左颏前（LMA）"/><span>左颏前（LMA）</span></p>'+
    '<p><input type="radio" name="radio" value="颏左横（LMT）"/><span>颏左横（LMT）</span></p>'+
    '<p><input type="radio" name="radio" value="颏左后（LMP）"/><span>颏左后（LMP）</span></p>'+
    '<p><input type="radio" name="radio" value="颏右前（RMA）"/><span>颏右前（RMA）</span></p>'+
    '<p><input type="radio" name="radio" value="颏右横（RMT）"/><span>颏右横（RMT）</span></p>'+
    '<p><input type="radio" name="radio" value="颏右后（RMP）"/><span>颏右后（RMP）</span></p>'+
    '<p><input type="radio" name="radio" value="肩左前（LScA）"/><span>肩左前（LScA）</span></p>'+
    '<p><input type="radio" name="radio" value="肩左后（LScP）"/><span>肩左后（LScP）</span></p>'+
    '<p><input type="radio" name="radio" value="肩右前（RScA）"/><span>肩右前（RScA）</span></p>'+
    '<p><input type="radio" name="radio" value="肩右后（RScP）"/><span>肩右后（RScP）</span></p>';
var fetusPositionDataCode={
	"LOA":"左枕前（LOA）",
	"LOT":"枕左横（LOT）",
	"LOP":"枕左后（LOP）",
	"ROA":"枕右前（ROA）",
	"ROT":"枕右横（ROT）",
	"ROP":"枕右后（ROP）",
	"LSA":"左骶前（LSA）",
	"LST":"骶左横（LST）",
	"LSP":"骶左后（LSP）",
	"RSA":"右骶前（RSA）",
	"RST":"骶右横（RST）",
	"RSP":"骶右后（RSP）",
	"LMA":"左颏前（LMA）",
	"LMT":"颏左横（LMT）",
	"LMP":"颏左后（LMP）",
	"RMA":"颏右前（RMA）",
	"RMT":"颏右横（RMT）",
	"RMP":"颏右后（RMP）",
	"LScA":"肩左前（LScA）",
	"LScP":"肩左后（LScP）",
	"RScA":"肩右前（RScA）",
	"RScP":"肩右后（RScP）"
}
var deliveryWayData='<p><input type="radio" name="radio" value="顺产"/><span>顺产</span></p>'+
    '<p><input type="radio" name="radio" value="剖宫产"/><span>剖宫产</span></p>'+
    '<p><input type="radio" name="radio" value="阴道助产（产钳）"/><span>阴道助产（产钳）</span></p>'+
    '<p><input type="radio" name="radio" value="阴道助产（胎头吸引）"/><span>阴道助产（胎头吸引）</span></p>';
//流动人口
// var floatPopulationData='<p><input type="radio" name="radio" value="0"/><span>本地常住</span></p>'+
//     '<p><input type="radio" name="radio" value="1"/><span>省内常住</span></p>'+
//     '<p><input type="radio" name="radio" value="2"/><span>省外常住</span></p>'+
//     '<p><input type="radio" name="radio" value="3"/><span>省内流动</span></p>'+
//     '<p><input type="radio" name="radio" value="4"/><span>省外流动</span></p>';
//户口类型
// var householdsType='<p><input type="radio" name="radio" value="0"/><span>城市</span></p>'+
//     '<p><input type="radio" name="radio" value="1"/><span>农村</span></p>';
//是否是高危孕妇&是否单独2胎
// var isDengerPreg='<p><input type="radio" name="radio" value="0"/><span>否</span></p>'+
//     '<p><input type="radio" name="radio" value="1"/><span>是</span></p>';
//血常规
// var routineBloodTestData='<p><input type="radio" name="radio" value="0"/><span>未做</span></p>'+
//     '<p><input type="radio" name="radio" value="1"/><span>已做</span></p>';
//患者职业编码
var jobDataType= '<p><input type="radio" name="radio" value="1"/><span>农、牧、渔</span></p>'+
'<p><input type="radio" name="radio" value="2"/><span>干部、职员</span></p>'+
'<p><input type="radio" name="radio" value="3"/><span>商业、服务</span></p>'+
'<p><input type="radio" name="radio" value="4"/><span>文、教、体</span></p>'+
'<p><input type="radio" name="radio" value="5"/><span>医药、科技</span></p>'+
'<p><input type="radio" name="radio" value="6"/><span>工人</span></p>'+
'<p><input type="radio" name="radio" value="7"/><span>军人</span></p>'+
'<p><input type="radio" name="radio" value="8"/><span>个体</span></p>'+
'<p><input type="radio" name="radio" value="9"/><span>家务</span></p>'+
'<p><input type="radio" name="radio" value="10"/><span>其他</span></p>';
//用户角色
var userStatusData='<p><input type="radio" name="radio" value="1"><span>待孕妇女</span></p>' +
    '<p><input type="radio" name="radio" value="2"><span>孕妇</span></p>' +
    '<p><input type="radio" name="radio" value="3"><span>儿童</span></p>';









