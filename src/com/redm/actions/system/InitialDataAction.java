package com.redm.actions.system;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import javolution.util.FastList;
import jxl.Cell;
import jxl.Sheet;
import jxl.Workbook;
import jxl.read.biff.BiffException;
import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;

import com.jelly.help.commons.base.BaseAction;
import com.jelly.help.commons.dbutils.DBHelper;
import com.jelly.help.commons.dbutils.generate.EntityModel;
import com.jelly.help.commons.dbutils.generate.GenerateValue.CommandTypes;
import com.jelly.help.commons.dbutils.generate.GenerateValue.SQLValues;
import com.jelly.help.commons.util.UtilDateTime;
import com.jelly.help.commons.util.UtilValidate;
import com.redm.actions.support.WmsCommon;
import com.redm.actions.utility.Constants;
import com.redm.entity.UserInfo;

public class InitialDataAction extends BaseAction {

	private static final long serialVersionUID = 1734659832684038200L;

	private File filedata;
	private String filedataFileName;

	public static Integer exErrLineNum = 0; // 导入时出错行号
	public static Integer exErrRowNum = 0; // 导入时出错列号
	public static Integer exErrSheetNum = 0; // 导入时出错列号

	/*
	 * 导入系统初始化数据Action
	 */
	@Action(value = "doImportInitialSystemData")
	public String doImportInitialSystemData() {
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpServletResponse response = ServletActionContext.getResponse();
		String msg = "上传文件失败！";
		setSuccess(false);
		Timestamp dateTime = UtilDateTime.nowTimestamp();
		UserInfo user = (UserInfo) request.getSession().getAttribute(
				Constants.USER_LOGIN);
		boolean bool1 = false;

		try {
			if(filedataFileName.indexOf(".xls") == -1){
				json.put("msg", "上传文件名后缀必须为.xls文件！");
			}else{
				StringBuffer exitsBarcode = new StringBuffer();
				List<List<List<Object>>> dataList =readExcel(filedata, exitsBarcode);
				List<List<Object>> data0 = dataList.get(0);
				List<List<Object>> data1 = dataList.get(1);
				List<List<Object>> data2 = dataList.get(2);
				List<List<Object>> data3 = dataList.get(3);
				List<List<Object>> data4 = dataList.get(4);
				List<List<Object>> data5 = dataList.get(5);
				List<List<Object>> data6 = dataList.get(6);
				List<List<Object>> data7 = dataList.get(7);
				List<List<Object>> data8 = dataList.get(8);
				List<List<Object>> data9 = dataList.get(9);
				List<List<Object>> data10 = dataList.get(10);
				List<List<Object>> data11 = dataList.get(11);
				List<List<Object>> data12 = dataList.get(12);
				List<List<Object>> data13 = dataList.get(13);
				
				if(data0 == null){
					response.setContentType("text/html");
                    PrintWriter out = response.getWriter();                    
					json.put("success", success);
					//msg =  "导入时第"+exErrLineNum+"行第"+exErrRowNum+"列出错,请检查！";
					json.put("msg","导入时第"+exErrSheetNum+"个Sheet第"+exErrLineNum+"行第"+exErrRowNum+"列出错,请检查！");
					out.println(json);
                    return null;
				}else{
					if(UtilValidate.isNotEmpty(data0)){
				bool1 = this.doInsertSystemPermission(data0,dateTime,user);
				bool1 = this.doInsertSystemCode(data1,dateTime,user);
				bool1 = this.doInsertCodeDetail(data2,dateTime,user);
				bool1 = this.doInsertParaSetting(data3,dateTime,user);
				bool1 = this.doInsertAllocationStrategy(data4,dateTime,user);
				bool1 = this.doInsertAllocationStrategyDetail(data5,dateTime,user);
				bool1 = this.doInsertPutawayStrategy(data6,dateTime,user);
				bool1 = this.doInsertPutawayStrategyDetail(data7,dateTime,user);
				bool1 = this.doInsertRotationStrategy(data8,dateTime,user);
				bool1 = this.doInsertRotationStrategyDetail(data9,dateTime,user);
				bool1 = this.doInsertPreAllocationStrategy(data10, dateTime, user);
				bool1 = this.doInsertPreAllocationStrategyDetail(data11,dateTime,user);
				bool1 = this.doInsertReplenishmentStrategy(data12,dateTime,user);
				bool1 = this.doInsertReplenishmentStrategyDetail(data13,dateTime,user);
					if (bool1) {
						setSuccess(true);
						msg = "数据上传成功！";
					}
					}else{
						throw new Exception();
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			json.put("msg", "数据上传出现异常！");
		}finally{
		}
		try {
			response.setContentType("text/html");
			PrintWriter out = response.getWriter();
			json.put("success", success);
			json.put("msg", msg);
			out.println(json);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return NONE;
	}

	/**
	 * 读取Excel文件内容并验证单元格内容是否有效。
	 * @return DBHelper批量存储类所使用的参数数据集合。
	 * @throws SQLException 
	 * @throws BiffException 
	 */
	@SuppressWarnings("unused")
	public static List<List<List<Object>>> readExcel(File file,StringBuffer exitsBarcode) throws SQLException, BiffException{
		List<List<Object>> data= new ArrayList<List<Object>>();
		DBHelper dbHelper = DBHelper.getInstance(false,true);
		List<List<List<Object>>> sheetsLists = new ArrayList<List<List<Object>>>();
		int i = 0;
		int j = 0;
		int k = 0;
		try {
			// 获取读取文件的工作簿对象
			Workbook workBook = Workbook.getWorkbook(file);
			Sheet[] sheets = workBook.getSheets();
			// 得到第1个工作表
			for ( k = 0; k < sheets.length; k++) {
				Sheet sheet1 = workBook.getSheet(k);
				
				// 读取文件中数据的行数
				int rows = sheet1.getRows();
				// 读取文件中数据的行数
				int columns = sheet1.getColumns();
				
				// 循环行数据，读取单元格数据并验证
				
				for (i = 1; i < rows; i++) {
					List<Object> l = FastList.newInstance();
					Cell[] cells = sheet1.getRow(i);
					
					if(null==cells[0].getContents() || cells[0].getContents().equals("")){//判断cells【0】是否为空，为空时退出。
						continue;
					}
					
					for (j = 0; j <cells.length; j++) {
						Cell cell = cells[j];
						String contents = cell.getContents();
						//添加到数据集合
						l.add(contents);
					}
					data.add(l);
				}
				sheetsLists.add(data);
				data = new ArrayList<List<Object>>();
			}
			
			workBook.close();
			dbHelper.close();
		} catch (Exception e) {
			System.out.println("第"+(k+1)+"个sheet第"+(i+1)+"行第"+(j+1)+"列出错，请修改！");//提示哪一行那一列出错 程序中有第0行，第0列，为了界面提示方便，统一加1
			exErrSheetNum=(k+1); 
			exErrLineNum=(i+1); 
            exErrRowNum=(j+1);  
            data=null;  //出错，强制赋值为null
            e.printStackTrace();
		}finally {
			dbHelper.freeConnection();
		}
		return sheetsLists;
	}
	//插入System_Permission表中的数据
	public  boolean doInsertSystemPermission(List<List<Object>> data,Timestamp dateTime,UserInfo user){
		boolean bool = false;
		DBHelper dbHelper = DBHelper.getInstance(false);
		for (List<Object> list2 : data) {
			//插入处理主表的数据
				if (UtilValidate.isNotEmpty(list2)) {
					EntityModel model2 = new EntityModel("SystemPermission");
					model2.setField("id",null==(String)list2.get(0)||""==(String)list2.get(0)?null:Integer.parseInt((String)list2.get(0)));
					model2.setField("companyPermission",(String)list2.get(1));
					model2.setField("images",(String)list2.get(2));
					model2.setField("menuName",(String)list2.get(3));
					model2.setField("remark",(String)list2.get(4));
					model2.setField("menuType",(String)list2.get(5));
					model2.setField("menuUrl",(String)list2.get(6));
					model2.setField("parentId",null==(String)list2.get(7)||""==(String)list2.get(7)?null:Integer.parseInt((String)list2.get(7)));
					model2.setField("menuSort",null==(String)list2.get(8)||""==(String)list2.get(8)?null:Integer.parseInt((String)list2.get(8)));
					SQLValues<Object> sqlValues = dbHelper.buildSQLValues(CommandTypes.INSERT, model2);
					try {
						 bool = dbHelper.insert(sqlValues.getSql(),sqlValues.getParams());
					} catch (SQLException e) {
						dbHelper.close();
						e.printStackTrace();
					}finally{
					}
		}
	}   dbHelper.close();
		return bool;
	}
	//插入System_Code表中的数据
	public  boolean doInsertSystemCode(List<List<Object>> data,Timestamp dateTime,UserInfo user){
		boolean bool = false;
		DBHelper dbHelper = DBHelper.getInstance(false);
		for (List<Object> list2 : data) {
			//插入处理主表的数据
				if (UtilValidate.isNotEmpty(list2)) {
					EntityModel model2 = new EntityModel("SystemCode");
					model2.setField("codeType",(String)list2.get(0));
					model2.setField("mark",(String)list2.get(1));
					model2.setField("descrip",(String)list2.get(2));
					model2.setField("addDate",dateTime);
					model2.setField("addWho",user.getRealname());
					model2.setField("editDate",dateTime);
					model2.setField("editWho",user.getRealname());
					SQLValues<Object> sqlValues = dbHelper.buildSQLValues(CommandTypes.INSERT, model2);
					try {
						 bool = dbHelper.insert(sqlValues.getSql(),sqlValues.getParams());
					} catch (SQLException e) {
						e.printStackTrace();
					}
		}
	}	dbHelper.close();
		return bool;
	}
	
	//插入Code_Detail表中的数据
	public  boolean doInsertCodeDetail(List<List<Object>> data0,Timestamp dateTime,UserInfo user){
		boolean bool = false;
		DBHelper dbHelper = DBHelper.getInstance(false);
		for (List<Object> list2 : data0) {
			//插入处理主表的数据
				if (UtilValidate.isNotEmpty(list2)) {
					EntityModel model2 = new EntityModel("CodeDetail");
					model2.setField("codeType",(String)list2.get(0));
					model2.setField("codeValue",(String)list2.get(1));
					model2.setField("codedef1",(String)list2.get(2));
					model2.setField("codedef2",(String)list2.get(3));
					model2.setField("codedef3",(String)list2.get(4));
					model2.setField("description",(String)list2.get(5));
					model2.setField("notes",(String)list2.get(6));
					model2.setField("sort",null==(String)list2.get(7)||""==(String)list2.get(7)?null:Integer.parseInt((String)list2.get(7)));
					model2.setField("addDate",dateTime);
					model2.setField("addWho",user.getRealname());
					model2.setField("editDate",dateTime);
					model2.setField("editWho",user.getRealname());
					SQLValues<Object> sqlValues = dbHelper.buildSQLValues(CommandTypes.INSERT, model2);
					try {
						 bool = dbHelper.insert(sqlValues.getSql(),sqlValues.getParams());
					} catch (SQLException e) {
						
						e.printStackTrace();
					}
		}
	} dbHelper.close();
		return bool;
	}
	
	//插入ParaSetting表中的数据
	public  boolean doInsertParaSetting(List<List<Object>> data0,Timestamp dateTime,UserInfo user){
		boolean bool = false;
		DBHelper dbHelper = DBHelper.getInstance(false);
		for (List<Object> list2 : data0) {
			//插入处理主表的数据
				if (UtilValidate.isNotEmpty(list2)) {
					EntityModel model2 = new EntityModel("Parasetting");
					model2.setField("content",(String)list2.get(0));
					model2.setField("paraKey",(String)list2.get(1));
					model2.setField("addDate",dateTime);
					model2.setField("addWho",user.getRealname());
					model2.setField("editDate",dateTime);
					model2.setField("editWho",user.getRealname());
					SQLValues<Object> sqlValues = dbHelper.buildSQLValues(CommandTypes.INSERT, model2);
					try {
						 bool = dbHelper.insert(sqlValues.getSql(),sqlValues.getParams());
					} catch (SQLException e) {
						e.printStackTrace();
					}
		}
	}
		dbHelper.close();
		return bool;
	}
	
	//插入Allocation_Strategy表中的数据
	public  boolean doInsertAllocationStrategy(List<List<Object>> data0,Timestamp dateTime,UserInfo user){
		boolean bool = false;
		DBHelper dbHelper = DBHelper.getInstance(false);
		for (List<Object> list2 : data0) {
			//插入处理主表的数据
				if (UtilValidate.isNotEmpty(list2)) {
					EntityModel model2 = new EntityModel("AllocationStrategy");
					model2.setField("allocationStrategyKey",(String)list2.get(0));
					model2.setField("mark",(String)list2.get(1));
					model2.setField("descr",(String)list2.get(2));
					model2.setField("addDate",dateTime);
					model2.setField("addWho",user.getRealname());
					model2.setField("editDate",dateTime);
					model2.setField("editWho",user.getRealname());
					SQLValues<Object> sqlValues = dbHelper.buildSQLValues(CommandTypes.INSERT, model2);
					try {
						 bool = dbHelper.insert(sqlValues.getSql(),sqlValues.getParams());
					} catch (SQLException e) {
						e.printStackTrace();
					}
		}
	}	dbHelper.close();
		return bool;
	}
	
	//插入Allocation_Strategy_Detail表中的数据
	public  boolean doInsertAllocationStrategyDetail(List<List<Object>> data0,Timestamp dateTime,UserInfo user){
		boolean bool = false;
		DBHelper dbHelper = DBHelper.getInstance(false);
		for (List<Object> list2 : data0) {
			//插入处理主表的数据
				if (UtilValidate.isNotEmpty(list2)) {
					EntityModel model2 = new EntityModel("AllocationStrategyDetail");
					model2.setField("allocationStrategyKey",(String)list2.get(0));
					model2.setField("excessPickloc",null==(String)list2.get(1)||""==(String)list2.get(1)?null:Integer.parseInt((String)list2.get(1)));
					model2.setField("openstock",null==(String)list2.get(2)||""==(String)list2.get(2)?null:Integer.parseInt((String)list2.get(2)));
					model2.setField("pickManner",null==(String)list2.get(3)||""==(String)list2.get(3)?null:Integer.parseInt((String)list2.get(3)));
					model2.setField("stockManner",null==(String)list2.get(4)||""==(String)list2.get(4)?null:Integer.parseInt((String)list2.get(4)));
					model2.setField("stepNumber",null==(String)list2.get(5)||""==(String)list2.get(5)?null:Integer.parseInt((String)list2.get(5)));
					model2.setField("status",null==(String)list2.get(6)||""==(String)list2.get(6)?null:Integer.parseInt((String)list2.get(6)));
					model2.setField("addDate",dateTime);
					model2.setField("addWho",user.getRealname());
					model2.setField("editDate",dateTime);
					model2.setField("editWho",user.getRealname());
					SQLValues<Object> sqlValues = dbHelper.buildSQLValues(CommandTypes.INSERT, model2);
					try {
						 bool = dbHelper.insert(sqlValues.getSql(),sqlValues.getParams());
					} catch (SQLException e) {
						e.printStackTrace();
					}
		}
	}     
		dbHelper.close();
		return bool;
	}
	
	//插入Putaway_Strategy表中的数据
	public  boolean doInsertPutawayStrategy(List<List<Object>> data0,Timestamp dateTime,UserInfo user){
		boolean bool = false;
		DBHelper dbHelper = DBHelper.getInstance(false);
		for (List<Object> list2 : data0) {
			//插入处理主表的数据
				if (UtilValidate.isNotEmpty(list2)) {
					EntityModel model2 = new EntityModel("PutawayStrategy");
					model2.setField("descr",(String)list2.get(0));
					model2.setField("mark",(String)list2.get(1));
					model2.setField("putawayStrategyKey",(String)list2.get(2));
					model2.setField("addDate",dateTime);
					model2.setField("addWho",user.getRealname());
					model2.setField("editDate",dateTime);
					model2.setField("editWho",user.getRealname());
					SQLValues<Object> sqlValues = dbHelper.buildSQLValues(CommandTypes.INSERT, model2);
					try {
						 bool = dbHelper.insert(sqlValues.getSql(),sqlValues.getParams());
					} catch (SQLException e) {
						
						e.printStackTrace();
					}finally{
					}
				
		}
	}	dbHelper.close();
		return bool;
	}
	
	//插入Putaway_Strategy_Detail表中的数据
	public  boolean doInsertPutawayStrategyDetail(List<List<Object>> data0,Timestamp dateTime,UserInfo user) throws ParseException{
		boolean bool = false;
		DBHelper dbHelper = DBHelper.getInstance(false);
		DateFormat to_type = new SimpleDateFormat("yy-MM-dd");   //改为YY后就正确了，如果是YYYY，反倒有问题，原因待进一步分析
		for (List<Object> list2 : data0) {
			//插入处理主表的数据
				if (UtilValidate.isNotEmpty(list2)) {
					EntityModel model2 = new EntityModel("PutawayStrategyDetail");
					model2.setField("putawayStrategyKey",(String)list2.get(0));
					model2.setField("exAbc02",(String)list2.get(1));
					model2.setField("exAbc03",(String)list2.get(2));
					model2.setField("exLocCategory01",(String)list2.get(3));
					model2.setField("exLocCategory02",(String)list2.get(4));
					model2.setField("exLocCategory03",(String)list2.get(5));
					model2.setField("exLocationFlag01",(String)list2.get(6));
					model2.setField("exLocationFlag02",(String)list2.get(7));
					model2.setField("exLocationFlag03",(String)list2.get(8));
					model2.setField("exLocationHandle01",(String)list2.get(9));
					model2.setField("exLocationHandle02",(String)list2.get(10));
					model2.setField("exLocationHandle03",(String)list2.get(11));
					model2.setField("exLocationType01",(String)list2.get(12));
					model2.setField("exLocationType02",(String)list2.get(13));
					model2.setField("exLocationType03",(String)list2.get(14));
					model2.setField("inAbc01",(String)list2.get(15));
					model2.setField("inAbc02",(String)list2.get(16));
					model2.setField("inAbc03",(String)list2.get(17));
					model2.setField("inLocationCategory01",(String)list2.get(18));
					model2.setField("inLocationCategory02",(String)list2.get(19));
					model2.setField("inLocationCategory03",(String)list2.get(20));
					model2.setField("inLocationFlag01",(String)list2.get(21));
					model2.setField("inLocationFlag02",(String)list2.get(22));
					model2.setField("inLocationFlag03",(String)list2.get(23));
					model2.setField("inLocationHandle01",(String)list2.get(24));
					model2.setField("inLocationHandle02",(String)list2.get(25));
					model2.setField("inLocationHandle03",(String)list2.get(26));
					model2.setField("inLocationType01",(String)list2.get(27));
					model2.setField("inLocationType02",(String)list2.get(28));
					model2.setField("inLocationType03",(String)list2.get(29));
					model2.setField("locLimit01",(String)list2.get(30));
					model2.setField("locLimit02",(String)list2.get(31));
					model2.setField("locLimit03",(String)list2.get(32));
					model2.setField("locLimit04",(String)list2.get(33));
					model2.setField("lottable01",null==(String)list2.get(34)||""==(String)list2.get(34)?null:WmsCommon.uToTsDate(to_type.parse((String)list2.get(34))));
					model2.setField("lottable02",null==(String)list2.get(35)||""==(String)list2.get(34)?null:WmsCommon.uToTsDate(to_type.parse((String)list2.get(35))));
					model2.setField("lottable03",null==(String)list2.get(36)||""==(String)list2.get(34)?null:WmsCommon.uToTsDate(to_type.parse((String)list2.get(36))));
					model2.setField("lottable04",(String)list2.get(37));
					model2.setField("lottable05",(String)list2.get(38));
					model2.setField("lottable06",(String)list2.get(39));
					model2.setField("lottable07",(String)list2.get(40));
					model2.setField("lottable08",(String)list2.get(41));
					model2.setField("lottable09",(String)list2.get(42));
					model2.setField("lottable10",(String)list2.get(43));
					model2.setField("lottable11",(String)list2.get(44));
					model2.setField("lottable12",(String)list2.get(45));
					model2.setField("maxLotQty",null==(String)list2.get(46)||""==(String)list2.get(46)?null:Integer.parseInt((String)list2.get(46)));
					model2.setField("maxSkuQty",null==(String)list2.get(47)||""==(String)list2.get(47)?null:Integer.parseInt((String)list2.get(47)));
					model2.setField("nextStepAfterFailure",null==(String)list2.get(48)||""==(String)list2.get(48)?null:Integer.parseInt((String)list2.get(48)));
					model2.setField("nextStepAfterSuccess",null==(String)list2.get(49)||""==(String)list2.get(49)?null:Integer.parseInt((String)list2.get(49)));
					model2.setField("orderLimit01",(String)list2.get(50));
					model2.setField("orderLimit02",(String)list2.get(51));
					model2.setField("orderLimit03",(String)list2.get(52));
					model2.setField("orderLimit04",(String)list2.get(53));
					model2.setField("putawayCode",(String)list2.get(54));
					model2.setField("putawayLoc",(String)list2.get(55));
					model2.setField("exAbc01",(String)list2.get(56));
					model2.setField("putawayZone",(String)list2.get(57));
					model2.setField("sourceLoc",(String)list2.get(58));
					model2.setField("spaceLimit01",(String)list2.get(59));
					model2.setField("spaceLimit02",(String)list2.get(60));
					model2.setField("spaceLimit03",(String)list2.get(61));
					model2.setField("spaceLimit04",(String)list2.get(62));
					model2.setField("lottable15",(String)list2.get(63));
					model2.setField("stepNumber",null==(String)list2.get(64)||""==(String)list2.get(64)?null:Integer.parseInt((String)list2.get(64)));
					model2.setField("lottable13",(String)list2.get(65));
					model2.setField("lottable14",(String)list2.get(66));
					model2.setField("status",null==(String)list2.get(67)||""==(String)list2.get(67)?null:Integer.parseInt((String)list2.get(67)));
					model2.setField("addDate",dateTime);
					model2.setField("addWho",user.getRealname());
					model2.setField("editDate",dateTime);
					model2.setField("editWho",user.getRealname());
					SQLValues<Object> sqlValues = dbHelper.buildSQLValues(CommandTypes.INSERT, model2);
					try {
						 bool = dbHelper.insert(sqlValues.getSql(),sqlValues.getParams());
					} catch (SQLException e) {
						e.printStackTrace();
					}
		}
	}	dbHelper.close();
		return bool;
	}
	
	//插入Rotation_Strategy表中的数据
	public  boolean doInsertRotationStrategy(List<List<Object>> data0,Timestamp dateTime,UserInfo user){
		boolean bool = false;
		DBHelper dbHelper = DBHelper.getInstance(false);
		for (List<Object> list2 : data0) {
			//插入处理主表的数据
				if (UtilValidate.isNotEmpty(list2)) {
					EntityModel model2 = new EntityModel("RotationStrategy");
					model2.setField("descr",(String)list2.get(0));
					model2.setField("mark",(String)list2.get(1));
					model2.setField("rotationStrategyKey",(String)list2.get(2));
					model2.setField("addWho",user.getRealname());
					model2.setField("addDate",dateTime);
					model2.setField("editWho",user.getRealname());
					model2.setField("editDate",dateTime);
					SQLValues<Object> sqlValues = dbHelper.buildSQLValues(CommandTypes.INSERT, model2);
					try {
						 bool = dbHelper.insert(sqlValues.getSql(),sqlValues.getParams());
					} catch (SQLException e) {
						e.printStackTrace();
					}
		}
	}	
		dbHelper.close();
		return bool;
	}
	
	
	//插入Rotation_Strategy_Detail表中的数据
	public  boolean doInsertRotationStrategyDetail(List<List<Object>> data0,Timestamp dateTime,UserInfo user){
		boolean bool = false;
		DBHelper dbHelper = DBHelper.getInstance(false);
		for (List<Object> list2 : data0) {
			//插入处理主表的数据
				if (UtilValidate.isNotEmpty(list2)) {
					EntityModel model2 = new EntityModel("RotationStrategyDetail");
					model2.setField("matchType",null==(String)list2.get(0)||""==(String)list2.get(0)?null:Integer.parseInt((String)list2.get(0)));
					model2.setField("rotation",(String)list2.get(1));
					model2.setField("rotationStrategyKey",(String)list2.get(2));
					model2.setField("sortType",(String)list2.get(3));
					model2.setField("status",null==(String)list2.get(4)||""==(String)list2.get(4)?null:Integer.parseInt((String)list2.get(4)));
					model2.setField("stepNumber",null==(String)list2.get(5)||""==(String)list2.get(5)?null:Integer.parseInt((String)list2.get(5)));
					model2.setField("addDate",dateTime);
					model2.setField("addWho",user.getRealname());
					model2.setField("editDate",dateTime);
					model2.setField("editWho",user.getRealname());
					SQLValues<Object> sqlValues = dbHelper.buildSQLValues(CommandTypes.INSERT, model2);
					try {
						 bool = dbHelper.insert(sqlValues.getSql(),sqlValues.getParams());
					} catch (SQLException e) {
						e.printStackTrace();
					}
		}
	}	dbHelper.close();
		return bool;
	}
	
	//插入Pre_Allocation_Strategy表中的数据
	public  boolean doInsertPreAllocationStrategy(List<List<Object>> data0,Timestamp dateTime,UserInfo user){
		boolean bool = false;
		DBHelper dbHelper = DBHelper.getInstance(false);
		for (List<Object> list2 : data0) {
			//插入处理主表的数据
				if (UtilValidate.isNotEmpty(list2)) {
					EntityModel model2 = new EntityModel("PreAllocateStrategy");
					model2.setField("descr",(String)list2.get(0));
					model2.setField("excess",(String)list2.get(1));
					model2.setField("mark",(String)list2.get(2));
					model2.setField("preAllocationRule",(String)list2.get(3));
					model2.setField("preAllocationStrategyKey",(String)list2.get(4));
					model2.setField("preAllocationType",(String)list2.get(5));
					model2.setField("addDate",dateTime);
					model2.setField("addWho",user.getRealname());
					model2.setField("editDate",dateTime);
					model2.setField("editWho",user.getRealname());
					SQLValues<Object> sqlValues = dbHelper.buildSQLValues(CommandTypes.INSERT, model2);
					try {
						 bool = dbHelper.insert(sqlValues.getSql(),sqlValues.getParams());
					} catch (SQLException e) {
						
						e.printStackTrace();
					}
		}
	}
		dbHelper.close();
		return bool;
	}
	
	//插入Pre_Allocation_Strategy_Detail表中的数据
	public  boolean doInsertPreAllocationStrategyDetail(List<List<Object>> data0,Timestamp dateTime,UserInfo user){
		boolean bool = false;
		DBHelper dbHelper = DBHelper.getInstance(false);
		for (List<Object> list2 : data0) {
			//插入处理主表的数据
				if (UtilValidate.isNotEmpty(list2)) {
					EntityModel model2 = new EntityModel("PreAllocateStrategyDetail");
					model2.setField("engine",(String)list2.get(0));
					model2.setField("preAllocationStrategyKey",(String)list2.get(1));
					model2.setField("status",null==(String)list2.get(2)||""==(String)list2.get(2)?null:Integer.parseInt((String)list2.get(2)));
					model2.setField("stepNumber",null==(String)list2.get(3)||""==(String)list2.get(3)?null:Integer.parseInt((String)list2.get(3)));
					model2.setField("uom",(String)list2.get(4));
					model2.setField("uomDescr",(String)list2.get(5));
					model2.setField("addDate",dateTime);
					model2.setField("addWho",user.getRealname());
					model2.setField("editDate",dateTime);
					model2.setField("editWho",user.getRealname());
					SQLValues<Object> sqlValues = dbHelper.buildSQLValues(CommandTypes.INSERT, model2);
					try {
						 bool = dbHelper.insert(sqlValues.getSql(),sqlValues.getParams());
					} catch (SQLException e) {
						e.printStackTrace();
					}
		}
	}
		dbHelper.close();
		return bool;
	}
	
	//插入Replenishment_Strategy表中的数据
	public  boolean doInsertReplenishmentStrategy(List<List<Object>> data0,Timestamp dateTime,UserInfo user){
		boolean bool = false;
		DBHelper dbHelper = DBHelper.getInstance(false);
		for (List<Object> list2 : data0) {
			//插入处理主表的数据
				if (UtilValidate.isNotEmpty(list2)) {
					EntityModel model2 = new EntityModel("ReplenishmentStrategy");
					model2.setField("descr",(String)list2.get(0));
					model2.setField("mark",(String)list2.get(1));
					model2.setField("replenishmentStrategyKey",(String)list2.get(2));
					model2.setField("addDate",dateTime);
					model2.setField("addWho",user.getRealname());
					model2.setField("editDate",dateTime);
					model2.setField("editWho",user.getRealname());
					SQLValues<Object> sqlValues = dbHelper.buildSQLValues(CommandTypes.INSERT, model2);
					try {
						 bool = dbHelper.insert(sqlValues.getSql(),sqlValues.getParams());
					} catch (SQLException e) {
						e.printStackTrace();
					}
		}
	}
		dbHelper.close();
		return bool;
	}
	
	//插入Replenishment_Strategy_Detail表中的数据
	public  boolean doInsertReplenishmentStrategyDetail(List<List<Object>> data0,Timestamp dateTime,UserInfo user){
		boolean bool = false;
		DBHelper dbHelper = DBHelper.getInstance(false);
		for (List<Object> list2 : data0) {
			//插入处理主表的数据
				if (UtilValidate.isNotEmpty(list2)) {
					EntityModel model2 = new EntityModel("ReplenishmentStrategyDeatil");
					model2.setField("fromLoc",(String)list2.get(0));
					model2.setField("fromZone",(String)list2.get(1));
					model2.setField("replenishmentRule",(String)list2.get(2));
					model2.setField("replenishmentStrategyKey",(String)list2.get(3));
					model2.setField("toZone",(String)list2.get(4));
					model2.setField("stepNumber",null==(String)list2.get(5)||""==(String)list2.get(5)?null:Integer.parseInt((String)list2.get(5)));
					model2.setField("toLoc",(String)list2.get(6));
					model2.setField("status",null==(String)list2.get(7)||""==(String)list2.get(7)?null:Integer.parseInt((String)list2.get(7)));
					model2.setField("addDate",dateTime);
					model2.setField("addWho",user.getRealname());
					model2.setField("editDate",dateTime);
					model2.setField("editWho",user.getRealname());
					SQLValues<Object> sqlValues = dbHelper.buildSQLValues(CommandTypes.INSERT, model2);
					try {
						 bool = dbHelper.insert(sqlValues.getSql(),sqlValues.getParams());
					} catch (SQLException e) {
						e.printStackTrace();
					}
		}
	}
		dbHelper.close();
		return bool;
	}
	
	
	public File getFiledata() {
		return filedata;
	}

	public void setFiledata(File filedata) {
		this.filedata = filedata;
	}

	public String getFiledataFileName() {
		return filedataFileName;
	}

	public void setFiledataFileName(String filedataFileName) {
		this.filedataFileName = filedataFileName;
	}
	
	@Override
	public JSONObject getJson() {
		return super.json;
	}

	@Override
	public boolean getSuccess() {
		return super.success;
	}

}
