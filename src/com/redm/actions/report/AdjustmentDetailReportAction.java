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

public class AdjustmentDetailReportAction extends BaseAction  {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8591652715001584885L;

	//使用PageHelper的分页查询方法
	//查询列表
	@Action(value = "doQueryAdjustmentDetailInfoPh", results = { @Result(name = Constants.SUCCESS, type = Constants.JSON_TYPE) })
	public String doQueryAdjustmentDetailInfoPh() {
		Map<String, Object> params = ParamsUtils.toParams(ActionContext.getContext().getParameters());
		HttpServletRequest request = ServletActionContext.getRequest();
		final String sku= request.getParameter("sku");
		final String storerKey= request.getParameter("storerKey");
		final String lot= request.getParameter("lot");
		final String addDate= request.getParameter("addDate");
		final String addDate1= request.getParameter("addDate1");
		final PageHelper pageHelper = PageHelper.getInstance();
		pageHelper.initPageInfo(params);
		
		List<String> fieldNamesList = FastList.newInstance();
		
		//fieldNameList中的字段必须与sql查询出的字段完全对上
		fieldNamesList.add("id");
		fieldNamesList.add("lineNumber");
		fieldNamesList.add("sku");
		fieldNamesList.add("name");
		fieldNamesList.add("lot");
		fieldNamesList.add("qty");
		fieldNamesList.add("targetQty");
		fieldNamesList.add("reasonCode");
		fieldNamesList.add("addDate");

		JSONArray data = pageHelper.getJSONObject(fieldNamesList, pageHelper.new CallBack() {
			@Override    
			public void onQuery(StringBuffer sql) {
				sql.append("SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY aa.line_number ASC) AS ROWNUM,"+Constants.ROWNUMBER+" OVER(ORDER BY aa.line_number ASC) AS id," +
						"  aa.line_number,aa.sku,aa.QTY,aa.TARGET_QTY,aa.REASON_CODE,aa.STORER_KEY,aa.ADD_DATE,aa.lottable04 AS lot,s.name FROM "+
						"  (SELECT a.*,lo.lottable04 FROM " +
						"  (SELECT a.SKU, a.LOT,a.QTY,a.TARGET_QTY,a.REASON_CODE,a.ADD_DATE,l.STORER_KEY,a.line_number " +
						"  FROM ADJUSTMENT_DETAIL a left JOIN LOT l ON a.LOT=l.LOT)a " +
						"  LEFT JOIN LOTTABLE lo " +
						"  ON a.LOT=lo.LOT)aa "+
						"  LEFT JOIN SKU s ON s.SKU =aa.SKU AND s.STORER_KEY =aa.STORER_KEY WHERE 1=1 ");
				if(UtilValidate.isNotEmpty(sku)){
					sql.append(" AND AA.SKU= '"+sku+"' ");
				}
				if(UtilValidate.isNotEmpty(storerKey)){
					sql.append("  AND AA.STORER_KEY='"+storerKey+"' ");
				}
				if(UtilValidate.isNotEmpty(lot)){
					sql.append("  AND lottable04='"+lot+"' ");
				}
				if(UtilValidate.isNotEmpty(addDate)){
					sql.append("   AND '"+addDate+"'<=aa.ADD_DATE");
				}
				if(UtilValidate.isNotEmpty(addDate1)){
					sql.append("   AND aa.ADD_DATE<='"+addDate1+"'");
				}
		}
	});
		
		json.put("data", data);
		json.put("totalCount", pageHelper.getTotalCount());
		return Constants.SUCCESS;
}
	
	//计算总重量(注意传的参数)(Lee)
	@Action(value="doQueryAdjustmentDetailSum",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doQueryAdjustmentDetailSum(){
		HttpServletRequest request = ServletActionContext.getRequest();
		DBHelper dbHelper = DBHelper.getInstance();
		final String sku= request.getParameter("sku");
		final String storerKey= request.getParameter("storerKey");
		final String lot= request.getParameter("lot");
		final String addDate= request.getParameter("addDate");
		final String addDate1= request.getParameter("addDate1");

		//sql 查询语句
		StringBuffer sql=new StringBuffer();
		sql.append("SELECT ");
		sql.append("coalesce(sum(coalesce(aa.QTY,0 )),0)AS var1sum,coalesce(sum(coalesce(aa.TARGET_QTY,0 )),0)AS var2sum FROM "+
				"  (SELECT a.*,lo.lottable04 FROM " +
				"  (SELECT a.SKU, a.LOT,a.QTY,a.TARGET_QTY,a.REASON_CODE,a.ADD_DATE,l.STORER_KEY,a.line_number " +
				"  FROM ADJUSTMENT_DETAIL a left JOIN LOT l ON a.LOT=l.LOT)a " +
				"  LEFT JOIN LOTTABLE lo " +
				"  ON a.LOT=lo.LOT)aa "+
				"  LEFT JOIN SKU s ON s.SKU =aa.SKU AND s.STORER_KEY =aa.STORER_KEY WHERE 1=1 ");		
		if(UtilValidate.isNotEmpty(sku)){
			sql.append(" AND AA.SKU= '"+sku+"' ");
		}
		if(UtilValidate.isNotEmpty(storerKey)){
			sql.append("  AND AA.STORER_KEY='"+storerKey+"' ");
		}else{
			sql.append("  AND AA.STORER_KEY='' ");
		}
		if(UtilValidate.isNotEmpty(lot)){
			sql.append("  AND lottable04='"+lot+"' ");
		}
		if(UtilValidate.isNotEmpty(addDate)){
			sql.append("   AND '"+addDate+"'<=aa.ADD_DATE");
		}
		if(UtilValidate.isNotEmpty(addDate1)){
			sql.append("   AND aa.ADD_DATE<='"+addDate1+"'");
		}

		List<Map<String, Object>> data=new ArrayList<Map<String,Object>>();
		try {
			data=dbHelper.select(sql.toString(), new MapListHandler());
		} catch (SQLException e) {
			e.printStackTrace();
		}
		json.put("data", data);
		return SUCCESS;
	}
	
	
	//不使用PageHelper的分页查询方法
	@Action(value = "doQueryAdjustmentDetailInfo", results = { @Result(name = Constants.SUCCESS, type = Constants.JSON_TYPE) })
	public String doQueryAdjustmentDetailInfo() {
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		DBHelper dbHelper = DBHelper.getInstance();
		Connection conn=dbHelper.getConnection();
		final String sort= request.getParameter("sort");//要排序的列名--无需定义，ext自动后传
	    final String dir= request.getParameter("dir");//要排序的方式--无需定义，ext自动后传
		final String sku= request.getParameter("sku");
		final String storerKey= request.getParameter("storerKey");
		final String lot= request.getParameter("lot");
		final String addDate= request.getParameter("addDate");
		final String addDate1= request.getParameter("addDate1");

		ResultSet rs = null;  
		Integer count=0;
		JSONArray data = new JSONArray();

		//sql 查询语句
		StringBuffer sql=new StringBuffer();
        if(UtilValidate.isNotEmpty(sort)){
			String columnName=WmsCommonService.entityToDbColumn(sort);
			sql.append("SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY "+columnName+" "+dir+") AS ROWNUM,");
		}else{
			sql.append("SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY aa.line_number ASC) AS ROWNUM,");
		}
		sql.append(" "+Constants.ROWNUMBER+" OVER(ORDER BY aa.line_number ASC) AS id," +
				"  aa.line_number,aa.sku,aa.QTY,aa.TARGET_QTY,aa.REASON_CODE,aa.STORER_KEY,aa.ADD_DATE,aa.lottable04 AS lot,s.name FROM "+
				"  (SELECT a.*,lo.lottable04 FROM " +
				"  (SELECT a.SKU, a.LOT,a.QTY,a.TARGET_QTY,a.REASON_CODE,a.ADD_DATE,l.STORER_KEY,a.line_number " +
				"  FROM ADJUSTMENT_DETAIL a left JOIN LOT l ON a.LOT=l.LOT)a " +
				"  LEFT JOIN LOTTABLE lo " +
				"  ON a.LOT=lo.LOT)aa "+
				"  LEFT JOIN SKU s ON s.SKU =aa.SKU AND s.STORER_KEY =aa.STORER_KEY WHERE 1=1 ");		
		if(UtilValidate.isNotEmpty(sku)){
			sql.append(" AND AA.SKU= '"+sku+"' ");
		}
		if(UtilValidate.isNotEmpty(storerKey)){
			sql.append("  AND AA.STORER_KEY='"+storerKey+"' ");
		}else{
			sql.append("  AND AA.STORER_KEY='' ");
		}
		if(UtilValidate.isNotEmpty(lot)){
			sql.append("  AND lottable04='"+lot+"' ");
		}
		if(UtilValidate.isNotEmpty(addDate)){
			sql.append("   AND '"+addDate+"'<=aa.ADD_DATE");
		}
		if(UtilValidate.isNotEmpty(addDate1)){
			sql.append("   AND aa.ADD_DATE<='"+addDate1+"'");
		}
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
	
	public static List<Map<String, Object>> doQueryAdjustmentDetail(String sku,String storerKey,String lot,String addDate,String addDate1){
		DBHelper dbHelper = DBHelper.getInstance();
		
		List<Map<String, Object>> data = new ArrayList<Map<String,Object>>();
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY aa.line_number ASC) AS ROWNUM,"+Constants.ROWNUMBER+" OVER(ORDER BY aa.line_number ASC) AS id," +
				"  aa.line_number,aa.sku,aa.QTY,aa.TARGET_QTY,aa.REASON_CODE,aa.STORER_KEY,aa.ADD_DATE,aa.lottable04 AS lot,s.name FROM "+
				"  (SELECT a.*,lo.lottable04 FROM " +
				"  (SELECT a.SKU, a.LOT,a.QTY,a.TARGET_QTY,a.REASON_CODE,a.ADD_DATE,l.STORER_KEY,a.line_number " +
				"  FROM ADJUSTMENT_DETAIL a left JOIN LOT l ON a.LOT=l.LOT)a " +
				"  LEFT JOIN LOTTABLE lo " +
				"  ON a.LOT=lo.LOT)aa "+
				"  LEFT JOIN SKU s ON s.SKU =aa.SKU AND s.STORER_KEY =aa.STORER_KEY WHERE 1=1 ");
		if(UtilValidate.isNotEmpty(sku)){
			sql.append(" AND AA.SKU= '"+sku+"' ");
		}
		if(UtilValidate.isNotEmpty(storerKey)){
			sql.append("  AND AA.STORER_KEY='"+storerKey+"' ");
		}
		if(UtilValidate.isNotEmpty(lot)){
			sql.append("  AND lottable04='"+lot+"' ");
		}
		if(UtilValidate.isNotEmpty(addDate)){
			sql.append("   AND '"+addDate+"'<=aa.ADD_DATE");
		}
		if(UtilValidate.isNotEmpty(addDate1)){
			sql.append("   AND aa.ADD_DATE<='"+addDate1+"'");
		}
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
	 * 导出调整明细报表
	 * 
	 * @return
	 * @throws IOException
	 */
	@Action(value = "adjustmentDetailPOIExcel", results = { @Result(name = Constants.SUCCESS, type = Constants.JSON_TYPE ) })
	public String adjustmentDetailPOIExcel() throws IOException {
		HttpServletRequest request = ServletActionContext.getRequest();
		final String requeststr= request.getParameter("string");
		String[] strs=requeststr.split(",");
		String sku="";
		String storerKey="";
		String lot="";
		String addDate="";
		String addDate1="";
		
		if(strs.length>=1){
			sku = strs[0];
		}
		if(strs.length>=2){
			storerKey = strs[1];
		}
		if(strs.length>=3){
			lot = strs[2];
		}
		if(strs.length>=4){
			addDate = strs[3];
		}
		if(strs.length>=5){
			addDate1 = strs[4];
		}
		List<Map<String, Object>> data=AdjustmentDetailReportAction.doQueryAdjustmentDetail(sku,storerKey,lot,addDate,addDate1);
		HttpServletResponse response = ServletActionContext.getResponse();
		// 创建一个新的Excel
		HSSFWorkbook workBook = new HSSFWorkbook();
		// 创建sheet页
		HSSFSheet sheet = workBook.createSheet();
		// sheet页名称
		workBook.setSheetName(0, "调整明细报表");
		// 创建header页
		HSSFHeader header = sheet.getHeader();
		// 设置标题居中
		header.setCenter("调整明细报表");
		// 设置第一行为Header

		HSSFRow row = sheet.createRow(0);
		HSSFCell cell0 = row.createCell(0);
		HSSFCell cell1 = row.createCell(1);
		HSSFCell cell2 = row.createCell(2);
		HSSFCell cell3 = row.createCell(3);
		HSSFCell cell4 = row.createCell(4);
		HSSFCell cell5 = row.createCell(5);
		HSSFCell cell6 = row.createCell(6);
		
		cell0.setCellValue("行号");
		cell1.setCellValue("商品");
		cell2.setCellValue("名称");
		cell3.setCellValue("Batch");
		cell4.setCellValue("调整前数量KG");
		cell5.setCellValue("调整后数量KG");
		cell6.setCellValue("调整原因");
		
		if ((null != data) && (0 != data.size())) {
			for (int i = 0; i < data.size(); i++) {
				Map<String, Object> map = data.get(i);
				Float qty=WmsCommon.doubleToFloat((Double)map.get("qty"));
				Float targetQty=WmsCommon.doubleToFloat((Double)map.get("targetQty"));
			
				BigDecimal b1 = new BigDecimal(qty);  
				Float qtyValue=b1.setScale(3,BigDecimal.ROUND_HALF_UP).floatValue();  

				BigDecimal b2 = new BigDecimal(targetQty);  
				Float targetQtyValue=b2.setScale(3,BigDecimal.ROUND_HALF_UP).floatValue();
				
				row = sheet.createRow(i + 1);
				cell0 = row.createCell(0);
				cell1 = row.createCell(1);
				cell2 = row.createCell(2);
				cell3 = row.createCell(3);
				cell4 = row.createCell(4);
				cell5 = row.createCell(5);
				cell6 = row.createCell(6);
				
				cell0.setCellValue(map.get("lineNumber") + "");
				cell1.setCellValue(map.get("sku") + "");
				cell2.setCellValue(map.get("name") + "");
				cell3.setCellValue(map.get("lot") + "");
				cell4.setCellValue(qtyValue + "");
				cell5.setCellValue(targetQtyValue + "");
				cell6.setCellValue(map.get("reasonCode") + "");
				
				sheet.setColumnWidth(0, 4000);
				sheet.setColumnWidth(1, 4000);
				sheet.setColumnWidth(2, 4000);
				sheet.setColumnWidth(3, 4000);
				sheet.setColumnWidth(4, 4000);
				sheet.setColumnWidth(5, 4000);
				sheet.setColumnWidth(6, 4000);
			}
		}
		
		// 通过Response把数据以Excel格式保存
		response.reset();
		response.setContentType("application/msexcel;charset=UTF-8");
		try {
			response.addHeader(
					"Content-Disposition",
					"attachment;filename=\""
							+ new String(("调整明细报表.xls")
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
