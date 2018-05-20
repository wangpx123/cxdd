package com.redm.service.system;

import java.util.Date;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jelly.help.commons.dbutils.DBHelper;
import com.jelly.help.commons.dbutils.handlers.MapHandler;
import com.jelly.help.commons.util.UtilDateTime;
import com.jelly.help.commons.util.UtilValidate;
import com.redm.actions.support.WmsCommon;
import com.redm.actions.utility.Constants;

@Service
public class InitialData {
	//创建所有视图
	public static boolean doCreateAllView(){
		boolean isSuccess=ViewCreate.creatAllView();
		if(isSuccess){
			System.out.println("all view creat success!");
		}else{
			System.out.println("view creat fail!");
		}
		return isSuccess;	
	}

	//初始化选中的数据
	public static boolean doInitialData(String[] box){
		boolean isSuccess=true;
		for(int i=0;i<box.length;i++){
			//创建数据词典
			if(box[i].equals("codeManage")){
				isSuccess = doCreateCodeManage();
				if (isSuccess) {
					System.out.println("数据词典创建成功！");
				}
			}
			//创建上架策略
			if(box[i].equals("putawayStrategy")){
				System.out.println(box[i]);
			}
			//创建分配策略
			if(box[i].equals("allocatedStrategy")){
				System.out.println(box[i]);
			}
			//创建系统管理
			if(box[i].equals("systemManager")){
				isSuccess = doSystemManager();
				if (isSuccess) {
					System.out.println(box[i]);
				}
			}
		}
		return isSuccess;
	}

	// 创建数据词典
	public static boolean doCreateCodeManage() {
		boolean isSuccess = true;
		String rules1[][] = {
				{ "ALOCLIMIT", "库位限制" },
				{ "ASNDSTATUS", "ASN明细状态" },
				{ "ASNSTATUS", "ASN状态" },
				{ "ASNTYPE", "ASN类型" }, 
				{ "BASESTATUS", "基础信息状态" },
				{ "INCOTERMS", "交货方式" },
				{ "ITRNTYPE", "交易类型" },
				{ "LOCABC", "周转速度" }, 
				{ "LOCCATEGRY", "货架种类" },
				{ "LOCFLAG", "库位标识" },
				{ "LOCHDLING", "处理方式 " },
				{ "LOCTYPE", "库位类型" },
				{ "LOTCONTENT", "内容" },
				{ "LOTCTR", "输入显示控制" },
				{ "LOTFORMAT", "内容格式" },
				{ "PACKMAT", "包装材料" },
				{ "PACKUOM", "包装单位等级" },
				{ "PALOCLIMIT", "库位限制" },
				{ "PASORDERLIMIT", "订单类型" },
				{ "PASPACELIMIT", "空间限制" },
				{ "PATYPE", "上架代码" },
				{ "PMTTERM", "支付方式" }, 
				{ "POSTATUS", "订单状态" },
				{ "POTYPE", "采购订单类型" },
				{ "PREALLCATERULE", "预分配规则" },
				{ "PREALLCATETYPE", "预分配类型" },
				{ "PREALLCATEUOM", "单位" },
				{ "REPLENISHRULE", "补货规则" }, 
				{ "ROTATEBY", "用X循环" },
				{ "ROTATION", "循环方式" },
				{ "SHELFLIFE", "保质期类型" },
				{ "SKUABC", "周转速度" }, 
				{ "SODSTATUS", "SO明细表状态" },
				{ "SOSTATUS", "SO表状态" }, 
				{ "SOTYPE", "SO类型" },
				{ "STORERTYPE", "货主类型" }, 
				{ "TOLOTTABLE", "周转属性" },
				{ "TOSORTTYPE", "排序方式" },
				{ "TRANSPMODE", "运输方式" },
				{ "YESNO", "只做部件" }, 
				{ "COUNTTYPE", "盘点类型" },
				{ "COUNTMODE", "盘点方式" }, 
				{ "COUNTSTATUS", "盘点状态" },
				{ "TRTYPE", "库存转移类型" }, 
				{ "ADJREASON", "库存调整原因" },
				{ "TRANTYPE", "库存交易日志类型" }
				};

		String rules2[][] = {
				{ "ADJREASON", "1", "库存调整原因1","库存调整原因1", "1" },
				{ "ADJREASON", "2", "库存调整原因2", "库存调整原因2","2" },
				{ "ALOCLIMIT", "1", "库位限制01","", "0" },
				{ "ALOCLIMIT", "2", "库位限制2", "","0" },
				{ "ASNDSTATUS", "0", "新建", "","0" },
				{ "ASNDSTATUS", "5", "收货完成","", "5" },
				{ "ASNSTATUS", "0", "新建", "","0" },
				{ "ASNSTATUS", "1", "部分收货","", "1" },
				{ "ASNSTATUS", "2", "全部收货","", "2" },
				{ "ASNSTATUS", "5", "部分收货部分上架","", "5" },
				{ "ASNSTATUS", "8", "全部收货全部上架", "","8" },
				{ "ASNSTATUS", "9", "关闭", "","9" },
				{ "ASNSTATUS", "6", "部分收货全部上架","", "6" },
				{ "ASNSTATUS", "7", "全部收货部分上架", "","7" },
				{ "ASNSTATUS", "3", "部分收货上架中","", "3" },
				{ "ASNSTATUS", "4", "全部收货上架中", "","4" },
				{ "ASNTYPE", "0", "正常","正常", "0" },
				{ "BASESTATUS", "0", "可用", "","0" },
				{ "BASESTATUS", "1", "禁用","", "0" },
				{ "COUNTMODE", "1", "盲盘","", "1" },
				{ "COUNTMODE", "2", "明盘","", "2" },
				{ "COUNTSTATUS", "1", "初盘","", "1" },
				{ "COUNTSTATUS", "2", "复盘", "","2" },
				{ "COUNTTYPE", "1", "静态盘点","", "1" },
				{ "COUNTTYPE", "2", "循环盘点","", "2" },
				{ "COUNTTYPE", "3", "动态盘点","", "3" },
				{ "INCOTERMS", "1", "FOB","", "0" },
				{ "INCOTERMS", "2", "CFR", "","0" },
				{ "INCOTERMS", "3", "CIF", "","0" },
				{ "ITRNTYPE", "AJ", "Adjustment（调整)","", "0" },
				{ "ITRNTYPE", "DP", "Deposit(收库)", "","0" },
				{ "ITRNTYPE", "MV", "Move（移库）","", "0" },
				{ "ITRNTYPE", "WD", "Withdrawal（出库）","", "0" },
				{ "LOCABC", "1", "快速", "","0" },
				{ "LOCABC", "2", "一般","", "0" },
				{ "LOCABC", "3", "慢速", "","0" },
				{ "LOCCATEGRY", "DOUBLE", "双伸位货架", "","0" },
				{ "LOCCATEGRY", "DRIVEIN", "驶入式货架Drive In Rack", "","0" },
				{ "LOCCATEGRY", "DRIVETH", "驶出式料架Drive Through Rack","", "0" },
				{ "LOCCATEGRY", "HCAROUSEL", "水平旋转式货架Horizontal Carousel","", "0" },
				{ "LOCCATEGRY", "OTHER", "其它OTHER","", "0" },
				{ "LOCCATEGRY", "PALLETFLOW", "托流式Pallet Flow","", "0" },
				{ "LOCCATEGRY", "PCAROUSEL", "托盘旋转式Pallet Carousel", "","0" },
				{ "LOCCATEGRY", "PUSHBACK", "后推式Push Back Rack","", "0" },
				{ "LOCCATEGRY", "SELECTIVE", "标准Standard Selective", "","0" },
				{ "LOCCATEGRY", "SHELVING", "轻量型支架式Shelving", "","0" },
				{ "LOCCATEGRY", "WCLOC", "Work Center Loc","", "0" },
				{ "LOCCATEGRY", "DENSE", "密集式DENSE","", "0" },
				{ "LOCCATEGRY", "CARTONFLOW", "箱流式Carton Flow", "","0" },
				{ "LOCCATEGRY", "CANTILEVER", "悬臂式货架Cantilever Rack","", "0" },
				{ "LOCCATEGRY", "ASRS", "自动立体式ASRS", "","0" },
				{ "LOCCATEGRY", "LIVEPALLET", "流动式货架Live Pallet Rack", "","0" },
				{ "LOCCATEGRY", "MOBILE", "移动式货架 （ Mobile Rack ）","", "0" },
				{ "LOCCATEGRY", "MEZZANINE", "阁楼式货架（Mezzanine Rack）","", "0" },
				{ "LOCFLAG", "DAMAGE", "损坏","", "0" },
				{ "LOCFLAG", "HOLD", "冻结","", "0" },
				{ "LOCFLAG", "NONE", "正常","", "0" },
				{ "LOCHDLING", "1", "仅限于托", "","0" },
				{ "LOCHDLING", "2", "仅限于箱","", "0" },
				{ "LOCHDLING", "9", "其他","", "0" },
				{ "LOCTYPE", "CASE", "CASE（箱）", "","0" },
				{ "LOCTYPE", "IDZ", "Intermediate Drop Zone","", "0" },
				{ "LOCTYPE", "FLOW", "FLOW Thru Lane", "","0" },
				{ "LOCTYPE", "OTHER", "其它","", "0" },
				{ "LOCTYPE", "PICK", "PICK - Piece（件拣）","", "0" },
				{ "LOCTYPE", "PND", "Pick and Drop","", "0" },
				{ "LOTCONTENT", "1", "内容1", "","0" },
				{ "LOTCONTENT", "2", "内容2","", "0" },
				{ "LOTCTR", "1", "必输字段", "","0" },
				{ "LOTCTR", "2", "非必输字段","", "0" },
				{ "LOTCTR", "3", "不显示", "","0" },
				{ "LOTFORMAT", "2", "日期","", "0" },
				{ "LOTFORMAT", "3", "长日期", "","0" },
				{ "LOTFORMAT", "4", "数字","", "0" },
				{ "LOTFORMAT", "1", "字符", "","0" },
				{ "PACKMAT", "2", "塑料", "","0" },
				{ "PACKMAT", "3", "铁","", "0" }, 
				{ "PACKMAT", "4", "纸", "","0" },
				{ "PACKMAT", "1", "铝","", "0" }, 
				{ "PACKMAT", "0", "STD","", "0" },
				{ "PACKUOM", "5", "纸箱","", "6" }, 
				{ "PACKUOM", "0", "公斤","", "0" },
				{ "PACKUOM", "1", "桶", "","1" },
				{ "PACKUOM", "2", "箱", "","2" },
				{ "PACKUOM", "3", "袋", "","3" }, 
				{ "PACKUOM", "4", "罐","", "4" },
				{ "PACKUOM", "PL", "托","", "5" },
				{ "PALOCLIMIT", "1", "库位限制01", "","0" },
				{ "PALOCLIMIT", "2", "库位限制02", "","0" },
				{ "PASORDERLIMIT", "1", "订单类型1","", "0" },
				{ "PASORDERLIMIT", "2", "订单类型2","", "0" },
				{ "PASPACELIMIT", "1", "空间限制1", "","0" },
				{ "PASPACELIMIT", "2", "空间限制02","", "0" },
				{ "PATYPE", "1", "上架01", "","0" },
				{ "PATYPE", "2", "上架2","", "0" },
				{ "PMTTERM", "1", "货到付款", "","0" },
				{ "PMTTERM", "2", "信用卡支付","", "0" },
				{ "PMTTERM", "3", "银行电汇","", "0" },
				{ "PMTTERM", "4", "邮政汇款","", "0" },
				{ "PMTTERM", "5", "PayPal支付", "","0" },
				{ "PMTTERM", "6", "在线支付", "","0" },
				{ "POSTATUS", "1", "新建订单","", "0" },
				{ "POSTATUS", "2", "部分收货","", "0" },
				{ "POSTATUS", "3", "全收", "","0" },
				{ "POSTATUS", "4", "取消订单", "","0" },
				{ "POSTATUS", "5", "订单完成","", "0" },
				{ "POTYPE", "1", "一般采购","", "0" },
				{ "POTYPE", "2", "终点采购","", "0" },
				{ "PREALLCATERULE", "1", "预分配规则","", "0" },
				{ "PREALLCATERULE", "2", "预分配规则2","", "0" },
				{ "PREALLCATETYPE", "1", "批次","", "0" },
				{ "PREALLCATETYPE", "2", "商品", "","0" },
				{ "PREALLCATEUOM", "1", "件", "","0" },
				{ "PREALLCATEUOM", "2", "重量","", "0" },
				{ "REPLENISHRULE", "1", "补货规则1","", "0" },
				{ "REPLENISHRULE", "2", "补货规则2", "","0" },
				{ "ROTATEBY", "LOT", "批次","", "0" },
				{ "ROTATEBY", "LOTTABLE01", "收货日期","", "0" },
				{ "ROTATEBY", "LOTTABLE02", "生产日期","", "0" },
				{ "ROTATEBY", "LOTTABLE03", "失效日期", "","0" },
				{ "ROTATION", "FIFO", "先进先出","", "0" },
				{ "ROTATION", "LIFO", "后进先出","", "0" },
				{ "SHELFLIFE", "1", "保质期类型1", "","0" },
				{ "SHELFLIFE", "2", "保质期类型2","", "0" },
				{ "SKUABC", "1", "快速周转", "","0" },
				{ "SKUABC", "2", "正常速度周转","", "0" },
				{ "SKUABC", "3", "慢速周转","", "0" },
				{ "SODSTATUS", "0", "新建","", "0" },
				{ "SODSTATUS", "1", "部分分配完成	","", "1" },
				{ "SODSTATUS", "2", "全部分配完成	","", "2" },
				{ "SOSTATUS", "0", "新建", "","0" },
				{ "SOSTATUS", "1", "部分分配","", "1" },
				{ "SOSTATUS", "2", "全部分配","", "2" },
				{ "SOSTATUS", "5", "部分分配部分发货", "","5" },
				{ "SOSTATUS", "6", "部分分配全部发货", "","6" },
				{ "SOSTATUS", "7", "全部分配部分发货", "","7" },
				{ "SOSTATUS", "8", "全部分配全部发货","", "8" },
				{ "SOSTATUS", "9", "关闭","", "9" }, 
				{ "SOTYPE", "0", "正常","正常", "0" },
				{ "STORERTYPE", "1", "货主","", "0" },
				{ "STORERTYPE", "2", "供应商","", "0" },
				{ "STORERTYPE", "3", "承运人","", "0" },
				{ "STORERTYPE", "4", "收货人","", "0" },
				{ "STORERTYPE", "5", "结算人","", "0" },
				{ "STORERTYPE", "6", "下单方","", "0" },
				{ "TOLOTTABLE", "1", "周转属性1","", "0" },
				{ "TOLOTTABLE", "2", "周转属性2","", "0" },
				{ "TOSORTTYPE", "1", "升序", "","0" },
				{ "TOSORTTYPE", "2", "降序","", "0" },
				{ "TRANSPMODE", "1", "铁路","", "0" },
				{ "TRANSPMODE", "2", "公路","", "0" },
				{ "TRANSPMODE", "3", "内河","", "0" },
				{ "TRANSPMODE", "4", "海运","", "0" },
				{ "TRANSPMODE", "5", "航空","", "0" },
				{ "TRANSPMODE", "6", "管道", "","0" },
				{ "TRANTYPE", "DP", "收货", "","0" },
				{ "TRANTYPE", "WD", "发货", "","1" },
				{ "TRANTYPE", "MV", "移库", "","2" },
				{ "TRANTYPE", "AJ", "调整","", "3" },
				{ "TRANTYPE", "TR", "转移","", "4" },
				{ "TRTYPE", "0", "库存转移","", "0" }, 
				{ "YESNO", "1", "是", "","0" },
				{ "YESNO", "2", "否","", "0" },
				{ "SKUSTATUS", "0", "可用","", "0" },
				{ "SKUSTATUS", "1", "禁用","", "1" }
				};

		for (int loop = 0; loop < rules1.length; loop++) {
			isSuccess = doInsertCodeManage1(rules1[loop][0],
					rules1[loop][1]);
			if(!isSuccess){
				break;	
			}
		}
		if(isSuccess){
			for (int loop = 0; loop < rules2.length; loop++) {
				boolean isHave = true;
				isHave=doQuerySystemCode(rules2[loop][0]);
			    if(isHave){
			    	isSuccess =doInsertCodeManage2(rules2[loop][0],
							rules2[loop][1], rules2[loop][2],rules2[loop][3],rules2[loop][4]);
			    }
			
	        }
		}
		return isSuccess;
	}
//	
//	//创建系统管理
	public static boolean doSystemManager(){
	 boolean isSuccess=true;
		 String systemPermissionRules[][]={
				 {"99", 	"Y", "", "系统管理",	"99","","","0",""},
				 {"9901",	"Y", "", "用户管理","1","","page/UserInfoManager.jsp","99",""},	
				 {"9905",	"Y", "", "权限组管理","5","","page/SecurityGroupManager.jsp","99",""},
				 {"9910",	"Y", "", "登陆日志","10","","page/LoginLogManager.jsp","99",""},
				 {"9915",	"Y", "", "密码修改","15","","page/PasswordManager.jsp","99",""},
				 {"9920",	"Y", "", "数据初始化","20","","page/InitialSystemData.jsp","99",""}
		 };
		 for(int loop = 0; loop< systemPermissionRules.length; loop++){
			 isSuccess=doInsertSystemPermission(systemPermissionRules[loop][0], systemPermissionRules[loop][1], systemPermissionRules[loop][2], systemPermissionRules[loop][3], systemPermissionRules[loop][4],
					 systemPermissionRules[loop][5] , systemPermissionRules[loop][6], systemPermissionRules[loop][7], systemPermissionRules[loop][8]);
         }
		 
		 String securityGroupRules[][]={
				 {"4a8848fab13441b69e9d7f3671e3069e",	"SHJJ",	"admin",	"系统管理员",	"Y"}
		 };
		 for(int loop = 0; loop< securityGroupRules.length; loop++){
			 isSuccess=doInsertSecurityGroup(securityGroupRules[loop][0], securityGroupRules[loop][1], securityGroupRules[loop][2], securityGroupRules[loop][3], securityGroupRules[loop][4]);
         }
		 
		 String securityGroupPermissionRules[][]={
				 {"7a77cacd0c6c4ad4b780a4a1ee30eb71",	"4a8848fab13441b69e9d7f3671e3069e",	"99"},
				 {"870c1dbd77c14324bbb9e450406cba2f",	"4a8848fab13441b69e9d7f3671e3069e",	"9901"},
				 {"7d1597b3e9ea46b9bfd550d5cca03797",	"4a8848fab13441b69e9d7f3671e3069e",	"9905"},
				 {"9569e8d6c7874dd8a463541f81012cfa",	"4a8848fab13441b69e9d7f3671e3069e",	"9910"},
				 {"afe37ccdb0004718bb705d95cda9aefd",	"4a8848fab13441b69e9d7f3671e3069e",	"9915"},
				 {"7c45b0d902aa4cab97385eac6abfe9b6",	"4a8848fab13441b69e9d7f3671e3069e",	"9920"}
				 
		 };
		 for(int loop = 0; loop< securityGroupPermissionRules.length; loop++){
			 isSuccess=doInsertSecurityGroupPermission(securityGroupPermissionRules[loop][0], securityGroupPermissionRules[loop][1], securityGroupPermissionRules[loop][2]);
         }
		 
		 String userInfoRules[][]={
				 {"admin",	"24",	"",	"000000000000000000","SHJJ",	"系统","","Y","E10ADC3949BA59ABBE56E057F20F883E","管理员","男","管理员","","","admin"}
		 };
		 for(int loop = 0; loop< userInfoRules.length; loop++){
			 isSuccess=doInsertUserInfo(userInfoRules[loop][0], userInfoRules[loop][1], userInfoRules[loop][2], userInfoRules[loop][3], userInfoRules[loop][4],
					 userInfoRules[loop][5] , userInfoRules[loop][6], userInfoRules[loop][7], userInfoRules[loop][8],userInfoRules[loop][9],userInfoRules[loop][10],userInfoRules[loop][11],
					 userInfoRules[loop][12],userInfoRules[loop][13],userInfoRules[loop][14]);
         }
		 
		 String userSecurityGroupRules[][]={
				 {"b65a42b3349a43f5a1649dbfdfe0cf75",	"4a8848fab13441b69e9d7f3671e3069e",	"admin"}
		 };
		 for(int loop = 0; loop< userSecurityGroupRules.length; loop++){
			 isSuccess=doInsertUserSecurityGroup(userSecurityGroupRules[loop][0], userSecurityGroupRules[loop][1], userSecurityGroupRules[loop][2]);
         }
		 
         return isSuccess;
	}
	
	//以下是初始化的数据库操作方法
	// 工程实施用的插入基础数据的方法，向NUMBER_RULES表插入记录

	@Transactional
	public static boolean doInsertNumberRule(String documentType, String name,
			String number, int numberLength, String rules) {
		boolean retValue = true;

		DBHelper dbHelper = DBHelper.getInstance(false);
		int num = number.length();
		try {

			StringBuffer sql = new StringBuffer();

			sql.append(" SELECT " + Constants.ROWNUMBER
					+ " OVER(ORDER BY ID DESC) AS ROWNUM,");
			sql.append(" DOCUMENTTYPE,NAME,NUMBER,NUMBER_LENGTH,RULES  ");
			sql.append(" FROM NUMBER_RULES ");
			sql.append(" WHERE 1 = 1 ");

			if (UtilValidate.isNotEmpty(documentType)) {
				sql.append(" AND DOCUMENTTYPE = '" + documentType + "' ");
			}
			if (UtilValidate.isNotEmpty(name)) {
				sql.append(" AND NAME = '" + name + "' ");
			}

			Map<String, Object> m = dbHelper.select(sql.toString(),
					new MapHandler());

			if (UtilValidate.isEmpty(m)) {
				// 记录不存在，插入一条新的记录
				StringBuffer sqlInsert = new StringBuffer();
				sqlInsert.append(" INSERT INTO NUMBER_RULES ");
				sqlInsert
						.append(" (DOCUMENTTYPE, NAME, NUMBER, NUMBER_LENGTH,RULES) ");
				sqlInsert.append(" VALUES (?, ?, ?, ?, ?)");
				boolean bool = dbHelper.insert(sqlInsert.toString(),
						documentType, name, number, num, rules);

				if (bool) {
					System.out.println("NUMBER_RULES insert success");
				} else {
					System.out.println("NUMBER_RULES insert fail");
					retValue = false;
				}
			}

		} catch (Exception e) {
			dbHelper.close();
			e.printStackTrace();
		} finally {
			dbHelper.freeConnection();
		}

		return retValue;
	}

	// 工程实施用的插入基础数据的方法，向SYSTEM_CODE表插入记录
	@Transactional
	public static boolean doInsertCodeManage1(String codeType, String descrip) {
		boolean retValue = true;

		DBHelper dbHelper = DBHelper.getInstance(false);
		try {

			StringBuffer sql = new StringBuffer();

			sql.append(" SELECT " + Constants.ROWNUMBER
					+ " OVER(ORDER BY ID DESC) AS ROWNUM,");
			sql.append(" CODE_TYPE,DESCRIP");
			sql.append(" FROM SYSTEM_CODE ");
			sql.append(" WHERE 1 = 1 ");

			if (UtilValidate.isNotEmpty(codeType)) {
				sql.append(" AND CODE_TYPE = '" + codeType + "' ");
			}
			if (UtilValidate.isNotEmpty(descrip)) {
				sql.append(" AND DESCRIP = '" + descrip + "' ");
			}

			Map<String, Object> m = dbHelper.select(sql.toString(),
					new MapHandler());

			if (UtilValidate.isEmpty(m)) {
				// 记录不存在，插入一条新的记录
				StringBuffer sqlInsert = new StringBuffer();
				sqlInsert.append(" INSERT INTO SYSTEM_CODE ");
				sqlInsert.append(" (ADD_DATE,ADD_WHO,CODE_TYPE, DESCRIP,EDIT_DATE,EDIT_WHO) ");
				sqlInsert.append(" VALUES (?,?,?,?,?,?)");
				boolean bool = dbHelper.insert(sqlInsert.toString(),UtilDateTime.nowTimestamp(),"admin", codeType,
						descrip,UtilDateTime.nowTimestamp(),"admin");

				if (bool) {
					System.out.println("SYSTEM_CODE insert success");
				} else {
					System.out.println("SYSTEM_CODE insert fail");
					retValue = false;
				}
			}
		} catch (Exception e) {
			dbHelper.close();
			e.printStackTrace();
		} finally {
			dbHelper.freeConnection();
		}

		return retValue;
	}

	// 工程实施用的插入基础数据的方法，向CODE_DETAIL表插入记录

	@Transactional
	public static boolean doInsertCodeManage2(String codeType,
			String codeValue, String description, String notes, String sort) {
		boolean retValue = true;

		DBHelper dbHelper = DBHelper.getInstance(false);
		try {

			StringBuffer sql = new StringBuffer();

			sql.append(" SELECT " + Constants.ROWNUMBER
					+ " OVER(ORDER BY ID DESC) AS ROWNUM,");
			sql.append(" CODE_TYPE,CODE_VALUE,DESCRIPTION,NOTES,SORT");
			sql.append(" FROM CODE_DETAIL ");
			sql.append(" WHERE 1 = 1 ");

			if (UtilValidate.isNotEmpty(codeType)) {
				sql.append(" AND CODE_TYPE = '" + codeType + "' ");
			}
			if (UtilValidate.isNotEmpty(codeValue)) {
				sql.append(" AND CODE_VALUE = '" + codeValue + "' ");
			}

			Map<String, Object> m = dbHelper.select(sql.toString(),
					new MapHandler());

			if (UtilValidate.isEmpty(m)) {
				// 记录不存在，插入一条新的记录
				StringBuffer sqlInsert = new StringBuffer();
				sqlInsert.append(" INSERT INTO CODE_DETAIL ");
				sqlInsert
						.append(" (ADD_DATE,ADD_WHO,CODE_TYPE,CODE_VALUE,DESCRIPTION,NOTES,SORT,EDIT_DATE,EDIT_WHO) ");
				sqlInsert.append(" VALUES (?,?,?,?,?,?,?,?,?)");
				boolean bool = dbHelper.insert(sqlInsert.toString(), UtilDateTime.nowTimestamp(),"admin",codeType,
						codeValue, description, notes, sort,UtilDateTime.nowTimestamp(),"admin");
				
				if (bool) {
					System.out.println("CODE_DETAIL insert success");
				} else {
					System.out.println("CODE_DETAIL insert fail");
					retValue = false;
				}
			}
		} catch (Exception e) {
			dbHelper.close();
			e.printStackTrace();
		} finally {
			dbHelper.freeConnection();
		}

		return retValue;
	}

	// 插入明细表之前需要检查主表是否存在；

	@Transactional
	public static boolean doQuerySystemCode(String codeType) {
		boolean retValue = true;

		DBHelper dbHelper = DBHelper.getInstance(false);
		try {

			StringBuffer sql = new StringBuffer();

			sql.append(" SELECT " + Constants.ROWNUMBER
					+ " OVER(ORDER BY ID DESC) AS ROWNUM,");
			sql.append(" CODE_TYPE,DESCRIP");
			sql.append(" FROM SYSTEM_CODE ");
			sql.append(" WHERE 1 = 1 ");

			if (UtilValidate.isNotEmpty(codeType)) {
				sql.append(" AND CODE_TYPE = '" + codeType + "' ");
			}

			Map<String, Object> m = dbHelper.select(sql.toString(),
					new MapHandler());
			retValue = UtilValidate.isNotEmpty(m);
		} catch (Exception e) {
			dbHelper.close();
			e.printStackTrace();
		} finally {
			dbHelper.freeConnection();
		}

		return retValue;
	}
    
	//插入systemPermission数据；

	@Transactional
	public static boolean doInsertSystemPermission(String id,
			String companyPermission, String images, String menuName, String menuSort,String menuType,String menuUrl,String parentId,String remark) {
		boolean retValue = true;

		DBHelper dbHelper = DBHelper.getInstance(false);
		try {

			StringBuffer sql = new StringBuffer();

			sql.append(" SELECT " + Constants.ROWNUMBER
					+ " OVER(ORDER BY ID DESC) AS ROWNUM,");
			sql.append(" ID,COMPANY_PERMISSION,IMAGES,MENU_NAME,MENU_SORT,MENU_TYPE,MENU_URL,PARENT_ID,REMARK");
			sql.append(" FROM SYSTEM_PERMISSION ");
			sql.append(" WHERE 1 = 1 ");

			if (UtilValidate.isNotEmpty(id)) {
				sql.append(" AND ID = '" + id + "' ");
			}

			Map<String, Object> m = dbHelper.select(sql.toString(),
					new MapHandler());

			if (UtilValidate.isEmpty(m)) {
				// 记录不存在，插入一条新的记录
				StringBuffer sqlInsert = new StringBuffer();
				sqlInsert.append(" INSERT INTO SYSTEM_PERMISSION ");
				sqlInsert
						.append(" (ID,COMPANY_PERMISSION,IMAGES,MENU_NAME,MENU_SORT,MENU_TYPE,MENU_URL,PARENT_ID,REMARK) ");
				sqlInsert.append(" VALUES (?,?,?,?,?,?,?,?,?)");
				boolean bool = dbHelper.insert(sqlInsert.toString(), id,
						companyPermission, images,menuName,menuSort, menuType, menuUrl, parentId, remark);
				
				if (bool) {
					System.out.println("SYSTEM_PERMISSION insert success");
				} else {
					System.out.println("SYSTEM_PERMISSION insert fail");
					retValue = false;
				}
			}
		} catch (Exception e) {
			dbHelper.close();
			e.printStackTrace();
		} finally {
			dbHelper.freeConnection();
		}

		return retValue;
	}
	
	//插入securityGroup数据；
	@Transactional
	public static boolean doInsertSecurityGroup(String id, String companyId,
			String name, String remark, String state) {
		boolean retValue = true;

		DBHelper dbHelper = DBHelper.getInstance(false);
		try {

			StringBuffer sql = new StringBuffer();

			sql.append(" SELECT " + Constants.ROWNUMBER
					+ " OVER(ORDER BY ID DESC) AS ROWNUM,");
			sql.append(" ID, COMPANY_ID, NAME, REMARK, STATE");
			sql.append(" FROM SECURITY_GROUP ");
			sql.append(" WHERE 1 = 1 ");

			if (UtilValidate.isNotEmpty(id)) {
				sql.append(" AND ID = '" + id + "' ");
			}

			Map<String, Object> m = dbHelper.select(sql.toString(),
					new MapHandler());

			if (UtilValidate.isEmpty(m)) {
				// 记录不存在，插入一条新的记录
				StringBuffer sqlInsert = new StringBuffer();
				sqlInsert.append(" INSERT INTO SECURITY_GROUP ");
				sqlInsert
						.append(" (ID, COMPANY_ID, NAME, REMARK, STATE) ");
				sqlInsert.append(" VALUES (?,?,?,?,?)");
				boolean bool = dbHelper.insert(sqlInsert.toString(),id,companyId,name,remark,state);
				
				if (bool) {
					System.out.println("SECURITY_GROUP insert success");
				} else {
					System.out.println("SECURITY_GROUP insert fail");
					retValue = false;
				}
			}
		} catch (Exception e) {
			dbHelper.close();
			e.printStackTrace();
		} finally {
			dbHelper.freeConnection();
		}

		return retValue;
	}

	//插入SecurityGroupPermission数据；
	@Transactional
	public static boolean doInsertSecurityGroupPermission(String id,
			String securityGroupId, String permissionId) {
		boolean retValue = true;

		DBHelper dbHelper = DBHelper.getInstance(false);
		try {

			StringBuffer sql = new StringBuffer();

			sql.append(" SELECT " + Constants.ROWNUMBER
					+ " OVER(ORDER BY ID DESC) AS ROWNUM,");
			sql.append(" ID, SECURITY_GROUP_ID, PERMISSION_ID");
			sql.append(" FROM SECURITY_GROUP_PERMISSION ");
			sql.append(" WHERE 1 = 1 ");

			if (UtilValidate.isNotEmpty(id)) {
				sql.append(" AND ID = '" + id + "' ");
			}

			Map<String, Object> m = dbHelper.select(sql.toString(),
					new MapHandler());

			if (UtilValidate.isEmpty(m)) {
				// 记录不存在，插入一条新的记录
				StringBuffer sqlInsert = new StringBuffer();
				sqlInsert.append(" INSERT INTO SECURITY_GROUP_PERMISSION ");
				sqlInsert
						.append(" (ID, SECURITY_GROUP_ID, PERMISSION_ID) ");
				sqlInsert.append(" VALUES (?,?,?)");
				boolean bool = dbHelper.insert(sqlInsert.toString(),id,securityGroupId,permissionId);
				
				if (bool) {
					System.out.println("SECURITY_GROUP_PERMISSION insert success");
				} else {
					System.out.println("SECURITY_GROUP_PERMISSION insert fail");
					retValue = false;
				}
			}
		} catch (Exception e) {
			dbHelper.close();
			e.printStackTrace();
		} finally {
			dbHelper.freeConnection();
		}

		return retValue;
	}
	
	//插入userInfo数据；
	@Transactional
	public static boolean doInsertUserInfo(String id, String age,
			String birthday, String cardId, String companyId, String createMan,
			String createTime, String enable, String password, String realname,
			String sex, String updateMan, String updateTime, String userType,
			String username) {
		boolean retValue = true;
		DBHelper dbHelper = DBHelper.getInstance(false);
		try {
			StringBuffer sql = new StringBuffer();
			sql.append(" SELECT " + Constants.ROWNUMBER
					+ " OVER(ORDER BY ID DESC) AS ROWNUM,");
			sql.append(" ID, AGE, BIRTHDAY, CARD_ID, COMPANY_ID, CREATE_MAN, CREATE_TIME, ENABLE, PASSWORD, REALNAME, SEX, UPDATE_MAN, UPDATE_TIME, USER_TYPE, USERNAME");
			sql.append(" FROM USER_INFO ");
			sql.append(" WHERE 1 = 1 ");

			if (UtilValidate.isNotEmpty(id)) {
				sql.append(" AND ID = '" + id + "' ");
			}

			Map<String, Object> m = dbHelper.select(sql.toString(),
					new MapHandler());

			if (UtilValidate.isEmpty(m)) {
				Date date = new Date();
				// 记录不存在，插入一条新的记录
				StringBuffer sqlInsert = new StringBuffer();
				sqlInsert.append(" INSERT INTO USER_INFO ");
				sqlInsert
						.append(" (ID, AGE, BIRTHDAY, CARD_ID, COMPANY_ID, CREATE_MAN, CREATE_TIME, ENABLE, PASSWORD, REALNAME, SEX, UPDATE_MAN, UPDATE_TIME, USER_TYPE, USERNAME) ");
				sqlInsert.append(" VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
				boolean bool = dbHelper.insert(sqlInsert.toString(),id, age, WmsCommon.uToTsDate(new Date()),cardId,companyId,createMan, WmsCommon.uToTsDate(date), enable, password, realname,
						sex,updateMan,WmsCommon.uToTsDate(date),userType,username);
				
				if (bool) {
					System.out.println("USER_INFO insert success");
				} else {
					System.out.println("USER_INFO insert fail");
					retValue = false;
				}
			}
		} catch (Exception e) {
			dbHelper.close();
			e.printStackTrace();
		} finally {
			dbHelper.freeConnection();
		}

		return retValue;
	}
	
	//插入UserSecurityGroup数据；
	@Transactional
	public static boolean doInsertUserSecurityGroup(String id,
			String securityGroupId, String userId) {
		boolean retValue = true;

		DBHelper dbHelper = DBHelper.getInstance(false);
		try {

			StringBuffer sql = new StringBuffer();

			sql.append(" SELECT " + Constants.ROWNUMBER
					+ " OVER(ORDER BY ID DESC) AS ROWNUM,");
			sql.append(" ID, SECURITY_GROUP_ID, USER_ID");
			sql.append(" FROM USER_SECURITY_GROUP ");
			sql.append(" WHERE 1 = 1 ");

			if (UtilValidate.isNotEmpty(id)) {
				sql.append(" AND ID = '" + id + "' ");
			}

			Map<String, Object> m = dbHelper.select(sql.toString(),
					new MapHandler());

			if (UtilValidate.isEmpty(m)) {
				// 记录不存在，插入一条新的记录
				StringBuffer sqlInsert = new StringBuffer();
				sqlInsert.append(" INSERT INTO USER_SECURITY_GROUP ");
				sqlInsert
						.append(" (ID, SECURITY_GROUP_ID, USER_ID) ");
				sqlInsert.append(" VALUES (?,?,?)");
				boolean bool = dbHelper.insert(sqlInsert.toString(),id,securityGroupId,userId);
				
				if (bool) {
					System.out.println("USER_SECURITY_GROUP insert success");
				} else {
					System.out.println("USER_SECURITY_GROUP insert fail");
					retValue = false;
				}
			}
		} catch (Exception e) {
			dbHelper.close();
			e.printStackTrace();
		} finally {
			dbHelper.freeConnection();
		}

		return retValue;
	}
}
