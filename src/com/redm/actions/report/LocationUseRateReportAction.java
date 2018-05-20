package com.redm.actions.report;

import java.io.IOException;
import java.io.OutputStream;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import javolution.util.FastList;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFHeader;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.ibm.icu.math.BigDecimal;
import com.jelly.help.commons.base.BaseAction;
import com.jelly.help.commons.dbutils.DBHelper;
import com.jelly.help.commons.dbutils.handlers.MapListHandler;
import com.jelly.help.commons.json.PageHelper;
import com.jelly.help.commons.util.ParamsUtils;
import com.jelly.help.commons.util.UtilValidate;
import com.opensymphony.xwork2.ActionContext;
import com.redm.actions.support.WmsCommon;
import com.redm.actions.utility.Constants;
import com.redm.service.support.WmsCommonService;

public class LocationUseRateReportAction extends BaseAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4140882765790932811L;

	//使用PageHelper的分页查询方法
	//查询列表
	@Action(value = "doQueryLocationUseRateInfoPh",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doQueryLocationUseRateInfoPh() {
		Map<String, Object> params = ParamsUtils.toParams(ActionContext.getContext().getParameters());
		HttpServletRequest request = ServletActionContext.getRequest();
		final String putawayZone= request.getParameter("putawayZone");
		final String storerKey= request.getParameter("storerKey");
		final PageHelper pageHelper = PageHelper.getInstance();
		pageHelper.initPageInfo(params);
		
		List<String> fieldNamesList = FastList.newInstance();
		
		//fieldNameList中的字段必须与sql查询出的字段完全对上
		fieldNamesList.add("id");
		fieldNamesList.add("putawayZone");
		fieldNamesList.add("height");
		fieldNamesList.add("weight");
		fieldNamesList.add("leng");
		fieldNamesList.add("palletQty");

		JSONArray data = pageHelper.getJSONObject(fieldNamesList, pageHelper.new CallBack() {
			@Override    
			public void onQuery(StringBuffer sql) {
				sql.append("SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY PUTAWAY_ZONE ASC) AS ROWNUM,"+Constants.ROWNUMBER+" OVER(ORDER BY PUTAWAY_ZONE ) AS ID,PUTAWAY_ZONE,LP.STORER_KEY,sum (coalesce (LO.PALLET_QTY,0))  AS PALLET_QTY, ");
				sql.append(" sum (coalesce ( LP.WEIGHT,0)) as WEIGHT,");
				
				sql.append(" CASE ");
				sql.append(" WHEN max(LO.PALLET_QTY)>max(LP.WEIGHT)");
				sql.append(" THEN  sum(coalesce (LO.PALLET_QTY,0)) ");
				sql.append(" ELSE  sum(coalesce (LP.WEIGHT,0)) ");
				sql.append(" end HEIGHT,");
				
				sql.append(" CASE ");
				sql.append(" WHEN (CASE ");
				sql.append(" WHEN max(LO.PALLET_QTY)>max(LP.WEIGHT) ");
				sql.append(" THEN  sum(coalesce (LO.PALLET_QTY,0)) ");
				sql.append(" ELSE  sum(coalesce (LP.WEIGHT,0)) ");
				sql.append(" end) =0 THEN 0 ");
				sql.append(" ELSE  sum (coalesce ( LP.WEIGHT,0))/ (CASE  ");
				sql.append(" WHEN max(LO.PALLET_QTY)>max(LP.WEIGHT)");
				sql.append(" THEN  sum(coalesce (LO.PALLET_QTY,0)) ");
				sql.append(" ELSE  sum(coalesce (LP.WEIGHT,0)) ");
				sql.append(" end) *100");
				sql.append(" end LENG ");
				
				sql.append("FROM LOCATION LO ");
				sql.append("LEFT JOIN ");
				sql.append("(SELECT  LLIA.LOC,LLIA.QTY,LLIA.STORER_KEY, LLIA.LOT,LLIA.LOTTABLE11, coalesce (PACK.PALLET_QTY,0) AS PALLET_QTY, ceiling(LLIA.QTY/PALLET_QTY) AS WEIGHT ");
				sql.append("FROM ");
				sql.append("(SELECT LOC,qty,LLI.STORER_KEY, LLI.LOT,LA.LOTTABLE11 FROM LOTXLOCXID LLI LEFT JOIN LOTTABLE LA ON LLI.LOT =LA.LOT)LLIA  ");
				sql.append("LEFT JOIN PACK ON LLIA.LOTTABLE11=PACK.PACK_KEY WHERE PALLET_QTY>0) LP ON LO.loc=LP.loc WHERE 1=1");
				if(UtilValidate.isNotEmpty(putawayZone)){
					sql.append(" AND LO.PUTAWAY_ZONE = '"+putawayZone+"' ");
				}
				if(UtilValidate.isNotEmpty(storerKey)){
					sql.append(" AND LP.STORER_KEY= '"+storerKey+"' ");
				}
				sql.append(" GROUP BY PUTAWAY_ZONE,STORER_KEY");
			}
		});
		
		json.put("data", data);
		json.put("totalCount", pageHelper.getTotalCount());
		return Constants.SUCCESS;
	}
	
	@Action(value = "doQueryLocationUseRateInfo",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doQueryLocationUseRateInfo() {
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		DBHelper dbHelper = DBHelper.getInstance();
		Connection conn=dbHelper.getConnection();
		final String sort= request.getParameter("sort");//要排序的列名--无需定义，ext自动后传
	    final String dir= request.getParameter("dir");//要排序的方式--无需定义，ext自动后传
		final String putawayZone= request.getParameter("putawayZone");
		final String storerKey= request.getParameter("storerKey");

		ResultSet rs = null;  
		Integer count=0;
		JSONArray data = new JSONArray();

		//sql 查询语句
		StringBuffer sql=new StringBuffer();
		
		if(UtilValidate.isNotEmpty(sort)){
			String columnName=WmsCommonService.entityToDbColumn(sort);
			sql.append("SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY "+columnName+" "+dir+") AS ROWNUM,");
			
		}else{
			sql.append("SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY PUTAWAY_ZONE ASC) AS ROWNUM,");
		}
		sql.append(" "+Constants.ROWNUMBER+" OVER(ORDER BY PUTAWAY_ZONE ) AS ID,PUTAWAY_ZONE,LP.STORER_KEY,sum (coalesce (LO.PALLET_QTY,0))  AS PALLET_QTY, ");
		sql.append(" sum (coalesce ( LP.WEIGHT,0)) as WEIGHT,");
		
		sql.append(" CASE ");
		sql.append(" WHEN max(LO.PALLET_QTY)>max(LP.WEIGHT)");
		sql.append(" THEN  sum(coalesce (LO.PALLET_QTY,0)) ");
		sql.append(" ELSE  sum(coalesce (LP.WEIGHT,0)) ");
		sql.append(" end HEIGHT,");
		
		sql.append(" CASE ");
		sql.append(" WHEN (CASE ");
		sql.append(" WHEN max(LO.PALLET_QTY)>max(LP.WEIGHT) ");
		sql.append(" THEN  sum(coalesce (LO.PALLET_QTY,0)) ");
		sql.append(" ELSE  sum(coalesce (LP.WEIGHT,0)) ");
		sql.append(" end) =0 THEN 0 ");
		sql.append(" ELSE  sum (coalesce ( LP.WEIGHT,0))/ (CASE  ");
		sql.append(" WHEN max(LO.PALLET_QTY)>max(LP.WEIGHT)");
		sql.append(" THEN  sum(coalesce (LO.PALLET_QTY,0)) ");
		sql.append(" ELSE  sum(coalesce (LP.WEIGHT,0)) ");
		sql.append(" end) *100");
		sql.append(" end LENG ");
		
		sql.append("FROM LOCATION LO ");
		sql.append("LEFT JOIN ");
		sql.append("(SELECT  LLIA.LOC,LLIA.QTY,LLIA.STORER_KEY, LLIA.LOT,LLIA.LOTTABLE11, coalesce (PACK.PALLET_QTY,0) AS PALLET_QTY, ceiling(LLIA.QTY/PALLET_QTY) AS WEIGHT ");
		sql.append("FROM ");
		sql.append("(SELECT LOC,qty,LLI.STORER_KEY, LLI.LOT,LA.LOTTABLE11 FROM LOTXLOCXID LLI LEFT JOIN LOTTABLE LA ON LLI.LOT =LA.LOT)LLIA  ");
		sql.append("LEFT JOIN PACK ON LLIA.LOTTABLE11=PACK.PACK_KEY WHERE PALLET_QTY>0) LP ON LO.loc=LP.loc WHERE 1=1");
		if(UtilValidate.isNotEmpty(putawayZone)){
			sql.append(" AND LO.PUTAWAY_ZONE = '"+putawayZone+"' ");
		}
		if(UtilValidate.isNotEmpty(storerKey)){
			sql.append(" AND LP.STORER_KEY= '"+storerKey+"' ");
		}else{
			sql.append(" AND LP.STORER_KEY= '' ");
		}
		sql.append(" GROUP BY PUTAWAY_ZONE,STORER_KEY");
		//以下为通用的查询分页方法代码
		String osql=sql.toString();
		String sizeSql="SELECT COUNT(*) FROM ( "+osql+" ) AS TEMP WHERE 1 = 1 ";
		String withSql="";
		String querysql="SELECT * FROM ( "+osql+" ) AS NEW_TABLE WHERE 1 = 1";
		Integer currentPageIx =pageIndex;
		try 
		{
			CallableStatement cstmt = conn.prepareCall("{call COMMONALITY_PAGE_SELECT_LIST_03(?,?,?,?,?,?,?,?,?,?,?,?)}");
            cstmt.setString(1, sizeSql);  
            cstmt.setString(2, withSql);  
            cstmt.setString(3, querysql);  
            cstmt.setInt(4, pageSize);  
            cstmt.setInt(5, currentPageIx);  
            cstmt.registerOutParameter(5, Types.INTEGER);  
            cstmt.registerOutParameter(6, Types.INTEGER);  
            cstmt.registerOutParameter(7, Types.INTEGER);  
            cstmt.registerOutParameter(8, Types.INTEGER);  
            cstmt.registerOutParameter(9, Types.INTEGER);  
            cstmt.registerOutParameter(10, Types.INTEGER);  
            cstmt.registerOutParameter(11, Types.INTEGER);  
            cstmt.registerOutParameter(12, Types.VARCHAR);   
		    
            rs = cstmt.executeQuery();
            
            data=WmsCommonService.resultSetToJson(rs);    //rs未做任何处理时调用
            
 		    count=cstmt.getInt(8);

 		    //关闭连接
 		    conn.close();
		}                                                                                            
		catch (Exception e) {
		   e.printStackTrace();
		}finally
		{
		}
		
		json.put("data", data);
		json.put("totalCount", count);
		return Constants.SUCCESS;
	}
	
	//计算总重量(注意传的参数)(Lee)
	@Action(value="doQueryLocationUseRateSum",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doQueryLocationUseRateSum(){
		HttpServletRequest request = ServletActionContext.getRequest();
		DBHelper dbHelper = DBHelper.getInstance();
		final String putawayZone= request.getParameter("putawayZone");
		final String storerKey= request.getParameter("storerKey");


		//sql 查询语句
		StringBuffer sql=new StringBuffer();
		sql.append("SELECT coalesce(sum(coalesce(a.WEIGHT,0 )),0)AS var2sum, coalesce(sum(coalesce(a.HEIGHT,0 )),0)AS var1sum");
		sql.append(" From ( Select PUTAWAY_ZONE,LP.STORER_KEY,sum (coalesce (LO.PALLET_QTY,0))  AS PALLET_QTY, ");
		sql.append(" sum (coalesce ( LP.WEIGHT,0)) as WEIGHT,");
		
		sql.append(" CASE ");
		sql.append(" WHEN max(LO.PALLET_QTY)>max(LP.WEIGHT)");
		sql.append(" THEN  sum(coalesce (LO.PALLET_QTY,0)) ");
		sql.append(" ELSE  sum(coalesce (LP.WEIGHT,0)) ");
		sql.append(" end HEIGHT,");
		
		sql.append(" CASE ");
		sql.append(" WHEN (CASE ");
		sql.append(" WHEN max(LO.PALLET_QTY)>max(LP.WEIGHT) ");
		sql.append(" THEN  sum(coalesce (LO.PALLET_QTY,0)) ");
		sql.append(" ELSE  sum(coalesce (LP.WEIGHT,0)) ");
		sql.append(" end) =0 THEN 0 ");
		sql.append(" ELSE  sum (coalesce ( LP.WEIGHT,0))/ (CASE  ");
		sql.append(" WHEN max(LO.PALLET_QTY)>max(LP.WEIGHT)");
		sql.append(" THEN  sum(coalesce (LO.PALLET_QTY,0)) ");
		sql.append(" ELSE  sum(coalesce (LP.WEIGHT,0)) ");
		sql.append(" end) *100");
		sql.append(" end LENG ");
		
		sql.append("FROM LOCATION LO ");
		sql.append("LEFT JOIN ");
		sql.append("(SELECT  LLIA.LOC,LLIA.QTY,LLIA.STORER_KEY, LLIA.LOT,LLIA.LOTTABLE11, coalesce (PACK.PALLET_QTY,0) AS PALLET_QTY, ceiling(LLIA.QTY/PALLET_QTY) AS WEIGHT ");
		sql.append("FROM ");
		sql.append("(SELECT LOC,qty,LLI.STORER_KEY, LLI.LOT,LA.LOTTABLE11 FROM LOTXLOCXID LLI LEFT JOIN LOTTABLE LA ON LLI.LOT =LA.LOT)LLIA  ");
		sql.append("LEFT JOIN PACK ON LLIA.LOTTABLE11=PACK.PACK_KEY WHERE PALLET_QTY>0) LP ON LO.loc=LP.loc WHERE 1=1");
		if(UtilValidate.isNotEmpty(putawayZone)){
			sql.append(" AND LO.PUTAWAY_ZONE = '"+putawayZone+"' ");
		}
		if(UtilValidate.isNotEmpty(storerKey)){
			sql.append(" AND LP.STORER_KEY= '"+storerKey+"' ");
		}else{
			sql.append(" AND LP.STORER_KEY= '' ");
		}
		sql.append(" GROUP BY PUTAWAY_ZONE,STORER_KEY )a ");

		List<Map<String, Object>> data=new ArrayList<Map<String,Object>>();
		try {
			data=dbHelper.select(sql.toString(), new MapListHandler());
		} catch (SQLException e) {
			e.printStackTrace();
		}
		json.put("data", data);
		return SUCCESS;
	}
	
	public static List<Map<String, Object>> doQueryLocationUseRate(String putawayZone,String storerKey){
		DBHelper dbHelper = DBHelper.getInstance();
		List<Map<String, Object>> data = new ArrayList<Map<String,Object>>();
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY PUTAWAY_ZONE ASC) AS ROWNUM,"+Constants.ROWNUMBER+" OVER(ORDER BY PUTAWAY_ZONE ) AS ID,PUTAWAY_ZONE,LP.STORER_KEY,sum (coalesce (LO.PALLET_QTY,0))  AS PALLET_QTY, ");
		sql.append(" sum (coalesce ( LP.WEIGHT,0)) as WEIGHT,");
		
		sql.append(" CASE ");
		sql.append(" WHEN max(LO.PALLET_QTY)>max(LP.WEIGHT)");
		sql.append(" THEN  sum(coalesce (LO.PALLET_QTY,0)) ");
		sql.append(" ELSE  sum(coalesce (LP.WEIGHT,0)) ");
		sql.append(" end HEIGHT,");
		
		sql.append(" CASE ");
		sql.append(" WHEN (CASE ");
		sql.append(" WHEN max(LO.PALLET_QTY)>max(LP.WEIGHT) ");
		sql.append(" THEN  sum(coalesce (LO.PALLET_QTY,0)) ");
		sql.append(" ELSE  sum(coalesce (LP.WEIGHT,0)) ");
		sql.append(" end) =0 THEN 0 ");
		sql.append(" ELSE  sum (coalesce ( LP.WEIGHT,0))/ (CASE  ");
		sql.append(" WHEN max(LO.PALLET_QTY)>max(LP.WEIGHT)");
		sql.append(" THEN  sum(coalesce (LO.PALLET_QTY,0)) ");
		sql.append(" ELSE  sum(coalesce (LP.WEIGHT,0)) ");
		sql.append(" end) *100");
		sql.append(" end LENG ");
		
		sql.append("FROM LOCATION LO ");
		sql.append("LEFT JOIN ");
		sql.append("(SELECT  LLIA.LOC,LLIA.QTY,LLIA.STORER_KEY, LLIA.LOT,LLIA.LOTTABLE11, coalesce (PACK.PALLET_QTY,0) AS PALLET_QTY, ceiling(LLIA.QTY/PALLET_QTY) AS WEIGHT ");
		sql.append("FROM ");
		sql.append("(SELECT LOC,qty,LLI.STORER_KEY, LLI.LOT,LA.LOTTABLE11 FROM LOTXLOCXID LLI LEFT JOIN LOTTABLE LA ON LLI.LOT =LA.LOT)LLIA  ");
		sql.append("LEFT JOIN PACK ON LLIA.LOTTABLE11=PACK.PACK_KEY WHERE PALLET_QTY>0) LP ON LO.loc=LP.loc WHERE 1=1");
		if(UtilValidate.isNotEmpty(putawayZone)){
			sql.append(" AND LO.PUTAWAY_ZONE = '"+putawayZone+"' ");
		}
		if(UtilValidate.isNotEmpty(storerKey)){
			sql.append(" AND LP.STORER_KEY= '"+storerKey+"' ");
		}
		sql.append(" GROUP BY PUTAWAY_ZONE,STORER_KEY");
		try {
			data = dbHelper.select(
					sql.toString(), new MapListHandler());
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return data;
	}
	
	/**
	 * 导出库位利用率
	 * 
	 * @return
	 * @throws IOException
	 */
	@Action(value = "locUseRateReportExcel", results = { @Result(name = Constants.SUCCESS, type = Constants.JSON_TYPE) })
	public String locUseRateReportExcel() throws IOException {
		HttpServletRequest request = ServletActionContext.getRequest();
		
		final String requeststr= request.getParameter("string");
		String[] strs=requeststr.split(",");
		String putawayZone="";
		String storerKey="";
		
		if(strs.length>=1){
			putawayZone = strs[0];
		}
		if(strs.length>=2){
			storerKey = strs[1];
		}
		List<Map<String, Object>> data=LocationUseRateReportAction.doQueryLocationUseRate(putawayZone,storerKey);
		HttpServletResponse response = ServletActionContext.getResponse();
		// 创建一个新的Excel
		HSSFWorkbook workBook = new HSSFWorkbook();
		// 创建sheet页
		HSSFSheet sheet = workBook.createSheet();
		// sheet页名称
		workBook.setSheetName(0, "库位利用率");
		// 创建header页
		HSSFHeader header = sheet.getHeader();
		// 设置标题居中
		header.setCenter("库位利用率");
		// 设置第一行为Header

		HSSFRow row = sheet.createRow(0);
		HSSFCell cell0 = row.createCell(0);
		HSSFCell cell1 = row.createCell(1);
		HSSFCell cell2 = row.createCell(2);
		HSSFCell cell3 = row.createCell(3);
		HSSFCell cell4 = row.createCell(4);
		
		cell0.setCellValue("行号");
		cell1.setCellValue("库区");
		cell2.setCellValue("有效托数");
		cell3.setCellValue("使用托数");
		cell4.setCellValue("库位利用率");
		
		if ((null != data) && (0 != data.size())) {
			for (int i = 0; i < data.size(); i++) {
				Map<String, Object> map = data.get(i);
				Float height=WmsCommon.doubleToFloat((Double)map.get("height"));
				Float weight=WmsCommon.doubleToFloat((Double)map.get("weight"));
				Float userate=WmsCommon.doubleToFloat((Double)map.get("leng"));
				
				BigDecimal b1 = new BigDecimal(height);  
                Float heightValue=b1.setScale(3,BigDecimal.ROUND_HALF_UP).floatValue();  

                BigDecimal b2 = new BigDecimal(weight);  
                Float weightValue=b2.setScale(3,BigDecimal.ROUND_HALF_UP).floatValue();
                
                BigDecimal b3 = new BigDecimal(userate);  
                Float userateValue=b3.setScale(3,BigDecimal.ROUND_HALF_UP).floatValue();
                
				row = sheet.createRow(i + 1);
				cell0 = row.createCell(0);
				cell1 = row.createCell(1);
				cell2 = row.createCell(2);
				cell3 = row.createCell(3);
				cell4 = row.createCell(4);
				
				cell0.setCellValue(map.get("rownum") + "");
				cell1.setCellValue(map.get("putawayZone") + "");
				cell2.setCellValue(heightValue + "");
				cell3.setCellValue(weightValue + "");
				cell4.setCellValue(userateValue + "%");
				
				sheet.setColumnWidth(0, 4000);
				sheet.setColumnWidth(1, 4000);
				sheet.setColumnWidth(2, 4000);
				sheet.setColumnWidth(3, 4000);
				sheet.setColumnWidth(4, 4000);
			}
		}
		
		// 通过Response把数据以Excel格式保存
		response.reset();
		response.setContentType("application/msexcel;charset=UTF-8");
		try {
			response.addHeader(
					"Content-Disposition",
					"attachment;filename=\""
							+ new String(("库位利用率.xls")
									.getBytes("GBK"), "ISO8859_1") + "\"");
			OutputStream out = response.getOutputStream();
			workBook.write(out);
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
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
