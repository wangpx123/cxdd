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

public class InventoryAgeReportAction extends BaseAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2169175976724584945L;

	//使用PageHelper的分页查询方法
	//查询列表
	@Action(value = "doQueryInventoryAgeInfoPh", results = { @Result(name = Constants.SUCCESS, type = Constants.JSON_TYPE) })
	public String doQueryInventoryAgeInfoPh() {
		Map<String, Object> params = ParamsUtils.toParams(ActionContext.getContext().getParameters());
		HttpServletRequest request = ServletActionContext.getRequest();
		final String sku= request.getParameter("sku");
		final String storerKey= request.getParameter("storerKey");
		
		final PageHelper pageHelper = PageHelper.getInstance();
		pageHelper.initPageInfo(params);
		
		List<String> fieldNamesList = FastList.newInstance();
		
		//fieldNameList中的字段必须与sql查询出的字段完全对上
		fieldNamesList.add("id");
		fieldNamesList.add("storerKey");
		fieldNamesList.add("sku");
		fieldNamesList.add("name");
		fieldNamesList.add("qty");
		fieldNamesList.add("qtyallocated");
		fieldNamesList.add("inventoryAge");
		fieldNamesList.add("lottable01");
		fieldNamesList.add("lottable02");
		fieldNamesList.add("lottable03");
		fieldNamesList.add("lottable04");
		fieldNamesList.add("lottable05");
		fieldNamesList.add("lottable06");
		fieldNamesList.add("lottable07");
		fieldNamesList.add("lottable08");
		fieldNamesList.add("lottable09");
		fieldNamesList.add("lottable10");
		fieldNamesList.add("lottable11");
		fieldNamesList.add("lottable12");
		fieldNamesList.add("lottable13");
		fieldNamesList.add("lottable14");
		fieldNamesList.add("lottable15");

		JSONArray data = pageHelper.getJSONObject(fieldNamesList, pageHelper.new CallBack() {
			@Override    
			public void onQuery(StringBuffer sql) {
				sql.append("SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY LP.ID ASC) AS ROWNUM," +
							" LP.*,SKU.NAME,"+Constants.SQLSERVER_dateDiff+Constants.DB2_dateDiff +" AS INVENTORY_AGE"+ 
							" FROM " +
							" (" +
							" SELECT LLI.ID,LLI.STORER_KEY,LLI.SKU,LLI.QTY,LLI.QTYALLOCATED,L.LOTTABLE01,L.LOTTABLE02,L.LOTTABLE03," +
							" L.LOTTABLE04,L.LOTTABLE05,L.LOTTABLE06,L.LOTTABLE07,L.LOTTABLE08,L.LOTTABLE09,L.LOTTABLE10," +
							" L.LOTTABLE11,L.LOTTABLE12,L.LOTTABLE13,L.LOTTABLE14,L.LOTTABLE15 FROM LOTXLOCXID LLI " +
							" LEFT JOIN LOTTABLE L " +
							" ON LLI.LOT=L.LOT WHERE 1=1 AND LLI.QTY>0 ");
				if(UtilValidate.isNotEmpty(storerKey)){
					sql.append(" AND LLI.STORER_KEY= '"+storerKey+"' ");
				}
				if(UtilValidate.isNotEmpty(sku)){
					sql.append(" AND LLI.SKU='"+sku+"' ");
				}
				sql.append(")LP" +
						" LEFT JOIN SKU" +
						" ON LP.SKU=SKU.SKU AND LP.STORER_KEY=SKU.STORER_KEY");
			}
		});
		
		json.put("data", data);
		json.put("totalCount", pageHelper.getTotalCount());
		return Constants.SUCCESS;
	}
	
	//不使用PageHelper的分页查询方法
	@Action(value = "doQueryInventoryAgeInfo", results = { @Result(name = Constants.SUCCESS, type = Constants.JSON_TYPE) })
	public String doQueryInventoryAgeInfo() {
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

		ResultSet rs = null;  
		Integer count=0;
		JSONArray data = new JSONArray();

		//sql 查询语句
		StringBuffer sql=new StringBuffer();
		if(UtilValidate.isNotEmpty(sort)){
			String columnName=WmsCommonService.entityToDbColumn(sort);
			sql.append("SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY "+columnName+" "+dir+") AS ROWNUM,");
		}else{
			sql.append("SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY LP.ID ASC) AS ROWNUM,");
		}
		sql.append(" LP.*,SKU.NAME,"+Constants.SQLSERVER_dateDiff+Constants.DB2_dateDiff +" AS INVENTORY_AGE"+ 
				" FROM " +
				" (" +
				" SELECT LLI.ID,LLI.STORER_KEY,LLI.SKU,LLI.QTY,LLI.QTYALLOCATED,L.LOTTABLE01,L.LOTTABLE02,L.LOTTABLE03," +
				" L.LOTTABLE04,L.LOTTABLE05,L.LOTTABLE06,L.LOTTABLE07,L.LOTTABLE08,L.LOTTABLE09,L.LOTTABLE10," +
				" L.LOTTABLE11,L.LOTTABLE12,L.LOTTABLE13,L.LOTTABLE14,L.LOTTABLE15 FROM LOTXLOCXID LLI " +
				" LEFT JOIN LOTTABLE L " +
				" ON LLI.LOT=L.LOT WHERE 1=1 AND LLI.QTY>0 ");
		if(UtilValidate.isNotEmpty(storerKey)){
			sql.append(" AND LLI.STORER_KEY= '"+storerKey+"' ");
		}else{
			sql.append(" AND LLI.STORER_KEY= '' ");
		}
		if(UtilValidate.isNotEmpty(sku)){
			sql.append(" AND LLI.SKU='"+sku+"' ");
		}
		sql.append(")LP" +
				" LEFT JOIN SKU" +
				" ON LP.SKU=SKU.SKU AND LP.STORER_KEY=SKU.STORER_KEY");

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
	@Action(value="doQueryInventoryAgeReportInfoSum",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doQueryInventoryAgeReportInfoSum(){
		HttpServletRequest request = ServletActionContext.getRequest();
		DBHelper dbHelper = DBHelper.getInstance();
		final String sku= request.getParameter("sku");
		final String storerKey= request.getParameter("storerKey");


		//sql 查询语句
		StringBuffer sql=new StringBuffer();
		sql.append("SELECT coalesce(sum(coalesce(CONVERT(FLOAT , a.INVENTORY_AGE),0 )),0)AS var1sum,coalesce(sum(coalesce(CONVERT(FLOAT , a.qty),0 )),0)AS var2sum,coalesce(sum(coalesce(CONVERT(FLOAT , a.QTYALLOCATED),0 )),0)AS var3sum,coalesce(sum(coalesce(CONVERT(FLOAT , a.LOTTABLE15),0 )),0)AS var4sum");
		sql.append(" from( select LP.*,SKU.NAME,"+Constants.SQLSERVER_dateDiff+Constants.DB2_dateDiff +" AS INVENTORY_AGE"+ 
				" FROM " +
				" (" +
				" SELECT LLI.ID,LLI.STORER_KEY,LLI.SKU,LLI.QTY,LLI.QTYALLOCATED,L.LOTTABLE01,L.LOTTABLE02,L.LOTTABLE03," +
				" L.LOTTABLE04,L.LOTTABLE05,L.LOTTABLE06,L.LOTTABLE07,L.LOTTABLE08,L.LOTTABLE09,L.LOTTABLE10," +
				" L.LOTTABLE11,L.LOTTABLE12,L.LOTTABLE13,L.LOTTABLE14,L.LOTTABLE15 FROM LOTXLOCXID LLI " +
				" LEFT JOIN LOTTABLE L " +
				" ON LLI.LOT=L.LOT WHERE 1=1 AND LLI.QTY>0 ");
		if(UtilValidate.isNotEmpty(storerKey)){
			sql.append(" AND LLI.STORER_KEY= '"+storerKey+"' ");
		}else{
			sql.append(" AND LLI.STORER_KEY= '' ");
		}
		if(UtilValidate.isNotEmpty(sku)){
			sql.append(" AND LLI.SKU='"+sku+"' ");
		}
		sql.append(")LP" +
				" LEFT JOIN SKU" +
				" ON LP.SKU=SKU.SKU AND LP.STORER_KEY=SKU.STORER_KEY ) a");

		List<Map<String, Object>> data=new ArrayList<Map<String,Object>>();
		try {
			data=dbHelper.select(sql.toString(), new MapListHandler());
		} catch (SQLException e) {
			e.printStackTrace();
		}
		json.put("data", data);
		return SUCCESS;
	}
	
	
	public static List<Map<String, Object>> doQueryInventoryAge(String sku,String storerKey){
		DBHelper dbHelper = DBHelper.getInstance();
		List<Map<String, Object>> data = new ArrayList<Map<String,Object>>();
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY LP.ID ASC) AS ROWNUM," +
				" LP.*,SKU.NAME,"+Constants.SQLSERVER_dateDiff+Constants.DB2_dateDiff +" AS INVENTORY_AGE"+ 
				" FROM " +
				" (" +
				" SELECT LLI.ID,LLI.STORER_KEY,LLI.SKU,LLI.QTY,LLI.QTYALLOCATED,L.LOTTABLE01,L.LOTTABLE02,L.LOTTABLE03," +
				" L.LOTTABLE04,L.LOTTABLE05,L.LOTTABLE06,L.LOTTABLE07,L.LOTTABLE08,L.LOTTABLE09,L.LOTTABLE10," +
				" L.LOTTABLE11,L.LOTTABLE12,L.LOTTABLE13,L.LOTTABLE14,L.LOTTABLE15 FROM LOTXLOCXID LLI " +
				" LEFT JOIN LOTTABLE L " +
				" ON LLI.LOT=L.LOT WHERE 1=1 AND LLI.QTY>0 ");
		if(UtilValidate.isNotEmpty(storerKey)){
			sql.append(" AND LLI.STORER_KEY= '"+storerKey+"' ");
		}
		if(UtilValidate.isNotEmpty(sku)){
			sql.append(" AND LLI.SKU='"+sku+"' ");
		}
		sql.append(")LP" +
				" LEFT JOIN SKU" +
				" ON LP.SKU=SKU.SKU AND LP.STORER_KEY=SKU.STORER_KEY");
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
	 * 导出库龄分析报表
	 * 
	 * @return
	 * @throws IOException
	 */
	@Action(value = "inventoryAgePOIExcel", results = { @Result(name = Constants.SUCCESS, type = Constants.JSON_TYPE) })
	public String inventoryAgePOIExcel() throws IOException {
		HttpServletRequest request = ServletActionContext.getRequest();
		final String requeststr= request.getParameter("string");
		String[] strs=requeststr.split(",");
		String sku="";
		String storerKey="";
		
		if(strs.length>=1){
			sku = strs[0];
		}
		if(strs.length>=2){
			storerKey = strs[1];
		}
		List<Map<String, Object>> data=InventoryAgeReportAction.doQueryInventoryAge(sku,storerKey);
		HttpServletResponse response = ServletActionContext.getResponse();
		// 创建一个新的Excel
		HSSFWorkbook workBook = new HSSFWorkbook();
		// 创建sheet页
		HSSFSheet sheet = workBook.createSheet();
		// sheet页名称
		workBook.setSheetName(0, "库龄分析报表");
		// 创建header页
		HSSFHeader header = sheet.getHeader();
		// 设置标题居中
		header.setCenter("库龄分析报表");
		// 设置第一行为Header

		HSSFRow row = sheet.createRow(0);
		HSSFCell cell0 = row.createCell(0);
		HSSFCell cell1 = row.createCell(1);
		HSSFCell cell2 = row.createCell(2);
		HSSFCell cell3 = row.createCell(3);
		HSSFCell cell4 = row.createCell(4);
		HSSFCell cell5 = row.createCell(5);
		HSSFCell cell6 = row.createCell(6);
		HSSFCell cell7 = row.createCell(7);
		HSSFCell cell8 = row.createCell(8);
		HSSFCell cell9 = row.createCell(9);
		HSSFCell cell10 = row.createCell(10);
		HSSFCell cell11 = row.createCell(11);
		HSSFCell cell12 = row.createCell(12);
		HSSFCell cell13 = row.createCell(13);
		HSSFCell cell14 = row.createCell(14);
		HSSFCell cell15 = row.createCell(15);
		HSSFCell cell16 = row.createCell(16);
		HSSFCell cell17 = row.createCell(17);
		HSSFCell cell18 = row.createCell(18);
		HSSFCell cell19 = row.createCell(19);
		HSSFCell cell20 = row.createCell(20);
		HSSFCell cell21 = row.createCell(21);
		
		cell0.setCellValue("行号");
		cell1.setCellValue("货主");
		cell2.setCellValue("商品");
		cell3.setCellValue("库龄(天数)");
		cell4.setCellValue("名称");
		cell5.setCellValue("数量");
		cell6.setCellValue("已分配数量");
		cell7.setCellValue("收货日期");
		cell8.setCellValue("生产日期");
		cell9.setCellValue("失效日期");
		cell10.setCellValue("生产批号");
		cell11.setCellValue("托盘号");
		cell12.setCellValue("成品卷号");
		cell13.setCellValue("等级");
		cell14.setCellValue("外观代码");
		cell15.setCellValue("表面处理");
		cell16.setCellValue("规格");
		cell17.setCellValue("包装形式");
		cell18.setCellValue("ASN号");
		cell19.setCellValue("反射率");
		cell20.setCellValue("极差");
		cell21.setCellValue("重量");
		
		if ((null != data) && (0 != data.size())) {
			for (int i = 0; i < data.size(); i++) {
				Map<String, Object> map = data.get(i);
				
				Float qty=WmsCommon.acruateFloat(WmsCommon.doubleToFloat((Double)map.get("qty")));
				Float qtyallocated=WmsCommon.acruateFloat(WmsCommon.doubleToFloat((Double)map.get("qtyallocated")));
				Float inventoryAge=WmsCommon.acruateFloat(Float.parseFloat(map.get("inventoryAge")+""));
				
				row = sheet.createRow(i + 1);
				cell0 = row.createCell(0);
				cell1 = row.createCell(1);
				cell2 = row.createCell(2);
				cell3 = row.createCell(3);
				cell4 = row.createCell(4);
				cell5 = row.createCell(5);
				cell6 = row.createCell(6);
				cell7 = row.createCell(7);
				cell8 = row.createCell(8);
				cell9 = row.createCell(9);
				cell10 = row.createCell(10);
				cell11 = row.createCell(11);
				cell12 = row.createCell(12);
				cell13 = row.createCell(13);
				cell14 = row.createCell(14);
				cell15 = row.createCell(15);
				cell16 = row.createCell(16);
				cell17 = row.createCell(17);
				cell18 = row.createCell(18);
				cell19 = row.createCell(19);
				cell20 = row.createCell(20);
				cell21 = row.createCell(21);
				
				cell0.setCellValue(map.get("rownum") + "");
				cell1.setCellValue(map.get("storerKey") + "");
				cell2.setCellValue(map.get("sku") + "");
				cell3.setCellValue(inventoryAge + "");
				cell4.setCellValue(map.get("name") + "");
				cell5.setCellValue(qty + "");
				cell6.setCellValue(qtyallocated + "");
				cell7.setCellValue(map.get("lottable01") + "");
				cell8.setCellValue(map.get("lottable02") + "");
				cell9.setCellValue(map.get("lottable03") + "");
				cell10.setCellValue(map.get("lottable04") + "");
				cell11.setCellValue(map.get("lottable05") + "");
				cell12.setCellValue(map.get("lottable06") + "");
				cell13.setCellValue(map.get("lottable07") + "");
				cell14.setCellValue(map.get("lottable08") + "");
				cell15.setCellValue(map.get("lottable09") + "");
				cell16.setCellValue(map.get("lottable10") + "");
				cell17.setCellValue(map.get("lottable11") + "");
				cell18.setCellValue(map.get("lottable12") + "");
				cell19.setCellValue(map.get("lottable13") + "");
				cell20.setCellValue(map.get("lottable14") + "");
				cell21.setCellValue(map.get("lottable15") + "");
				
				sheet.setColumnWidth(0, 4000);
				sheet.setColumnWidth(1, 4000);
				sheet.setColumnWidth(2, 4000);
				sheet.setColumnWidth(3, 4000);
				sheet.setColumnWidth(4, 4000);
				sheet.setColumnWidth(5, 4000);
				sheet.setColumnWidth(6, 4000);
				sheet.setColumnWidth(7, 4000);
				sheet.setColumnWidth(8, 4000);
				sheet.setColumnWidth(9, 4000);
				sheet.setColumnWidth(10, 4000);
				sheet.setColumnWidth(11, 4000);
				sheet.setColumnWidth(12, 4000);
				sheet.setColumnWidth(13, 4000);
				sheet.setColumnWidth(14, 4000);
				sheet.setColumnWidth(15, 4000);
				sheet.setColumnWidth(16, 4000);
				sheet.setColumnWidth(17, 4000);
				sheet.setColumnWidth(18, 4000);
				sheet.setColumnWidth(19, 4000);
				sheet.setColumnWidth(20, 4000);
				sheet.setColumnWidth(21, 4000);
			}
		}
		
		// 通过Response把数据以Excel格式保存
		response.reset();
		response.setContentType("application/msexcel;charset=UTF-8");
		try {
			response.addHeader(
					"Content-Disposition",
					"attachment;filename=\""
							+ new String(("库龄分析报表.xls")
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
