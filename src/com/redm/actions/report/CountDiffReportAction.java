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

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFHeader;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
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

public class CountDiffReportAction extends BaseAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3514980611129518416L;

	//查询列表//使用PageHelper的分页查询方法
	//重新开发了报表查询grid  qxue
	@Action(value = "doQueryCountDiffInfoPh", results = { @Result(name = Constants.SUCCESS, type = Constants.JSON_TYPE) })
	public String doQueryCountDiffInfoPh() {
		Map<String, Object> params = ParamsUtils.toParams(ActionContext.getContext().getParameters());
		HttpServletRequest request = ServletActionContext.getRequest();
		final String sku= request.getParameter("sku");
		final String countKey= request.getParameter("countKey");
		final String storerKey= request.getParameter("storerKey");
		final PageHelper pageHelper = PageHelper.getInstance();
		pageHelper.initPageInfo(params);
		
		List<String> fieldNamesList = FastList.newInstance();
		
		//fieldNameList中的字段必须与sql查询出的字段完全对上
		fieldNamesList.add("id");
		fieldNamesList.add("countKey");
		fieldNamesList.add("storerKey");
		fieldNamesList.add("sku");
		fieldNamesList.add("name");
		fieldNamesList.add("lottable11");
		fieldNamesList.add("qty");
		fieldNamesList.add("countqty");
		fieldNamesList.add("qtydiff");
		fieldNamesList.add("desea");

		JSONArray data = pageHelper.getJSONObject(fieldNamesList, pageHelper.new CallBack() {
			@Override    
			public void onQuery(StringBuffer sql) {
				sql.append("SELECT "+Constants.ROWNUMBER+" OVER() AS ROWNUM,"+Constants.ROWNUMBER+" OVER() AS ID, COUNT_KEY, STORER_KEY, SKU, NAME, LOTTABLE11, QTY, COUNTQTY, QTYDIFF,DESEA");
				sql.append(" FROM VCOUNTDIF WHERE 1=1");
				if(UtilValidate.isNotEmpty(sku)){
					sql.append(" AND SKU='"+sku+"'");
				}
				if(UtilValidate.isNotEmpty(countKey)){
					sql.append(" AND count_key='"+countKey+"'");
				}
				if(UtilValidate.isNotEmpty(storerKey)){
					sql.append(" AND storer_key='"+storerKey+"'");
				}
			}
		});
		
		json.put("data", data);
		json.put("totalCount", pageHelper.getTotalCount());
		return Constants.SUCCESS;
	}

	//不使用PageHelper的分页查询方法
	@Action(value = "doQueryCountDiffInfo", results = { @Result(name = Constants.SUCCESS, type = Constants.JSON_TYPE) })
	public String doQueryCountDiffInfo() {
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
		final String countKey= request.getParameter("countKey");
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
			sql.append("SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY COUNT_KEY) AS ROWNUM,");
		}
		sql.append(""+Constants.ROWNUMBER+" OVER(ORDER BY COUNT_KEY) AS ID, COUNT_KEY, STORER_KEY, SKU, NAME, QTY, COUNTQTY, QTYDIFF ");
		sql.append(" FROM VCOUNTDIF WHERE 1=1");
		if(UtilValidate.isNotEmpty(sku)){
			sql.append(" AND SKU='"+sku+"'");
		}
		if(UtilValidate.isNotEmpty(countKey)){
			sql.append(" AND count_key='"+countKey+"'");
		}
		if(UtilValidate.isNotEmpty(storerKey)){
			sql.append(" AND storer_key='"+storerKey+"'");
		}else{
			sql.append(" AND storer_key=''");
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
	//计算总重量;
	//计算每条receiptKey的预期数量和实收数量的总和
	@Action(value="doQueryCountDiffInfoSum",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doQueryReceiptDetailSum(){
		HttpServletRequest request = ServletActionContext.getRequest();
		DBHelper dbHelper = DBHelper.getInstance();
		
		final String storerKey = request.getParameter("storerKey");//这里的参数和doQueryReceiptDetail的参数必须相同
		final String countKey = request.getParameter("countKey");
		final String sku = request.getParameter("sku");

		//sql 查询语句
		StringBuffer sql=new StringBuffer();
		sql.append(" SELECT coalesce(sum(QTY),0) AS qtysum,coalesce(sum(COUNTQTY),0) AS countqtysum,coalesce(sum(QTYDIFF),0) AS qtydiffsum FROM VCOUNTDIF ");
		sql.append(" WHERE 1 = 1 ");
		if(UtilValidate.isNotEmpty(storerKey)){
			sql.append(" AND storer_Key = '"+storerKey+"'");
		}else{
			sql.append(" AND storer_key=''");
		}
		
		if(UtilValidate.isNotEmpty(countKey)){
			sql.append(" AND count_Key = '"+countKey+"'");
		}
		
		if(UtilValidate.isNotEmpty(sku)){
			sql.append(" AND sku = '"+sku+"'");
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
	//盘点 查询和报表输出的action qxue
	@Action(value = "countDiffReportExcel", results = { @Result(name = Constants.SUCCESS, type = Constants.JSON_TYPE) })
	public String countDiffReportExcel() throws IOException {
		HttpServletRequest request = ServletActionContext.getRequest();
		final String requeststr= request.getParameter("string");
		String[] strs=requeststr.split(",");
		String storerKey="";
		String countKey="";
		String sku="";
		
		if(strs.length>=1){
			storerKey = strs[0];
		}
		if(strs.length>=2){
			countKey = strs[1];
		}
		if(strs.length>=3){
			sku = strs[2];
		}
		
		List<Map<String, Object>> data=null;
		
		DBHelper dbHelper = DBHelper.getInstance(false);

		try
	        {	
				StringBuffer sql=new StringBuffer();
				sql.append("SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY COUNT_KEY) AS ROWNUM,"+Constants.ROWNUMBER+" OVER(ORDER BY COUNT_KEY) AS ID, COUNT_KEY, STORER_KEY, SKU, NAME, QTY, COUNTQTY, QTYDIFF ");
				sql.append(" FROM VCOUNTDIF WHERE 1=1");
				if(UtilValidate.isNotEmpty(sku)){
					sql.append(" AND SKU='"+sku+"'");
				}
				if(UtilValidate.isNotEmpty(countKey)){
					sql.append(" AND count_key='"+countKey+"'");
				}
				if(UtilValidate.isNotEmpty(storerKey)){
					sql.append(" AND storer_key='"+storerKey+"'");
				}
	            data = dbHelper.select(sql.toString(), new MapListHandler());
	            
	        } catch (Exception e) {
	            e.printStackTrace();
	        } finally {
	            dbHelper.freeConnection();
	        }
		
		HttpServletResponse response = ServletActionContext.getResponse();
		// 创建一个新的Excel
		HSSFWorkbook workBook = new HSSFWorkbook();
		// 创建sheet页
		HSSFSheet sheet = workBook.createSheet();
		// sheet页名称
		workBook.setSheetName(0, "盘点差异报表");
		// 创建header页
		HSSFHeader header = sheet.getHeader();
		// 设置标题居中
		header.setCenter("盘点差异报表");
		// 设置第一行为Header

		HSSFRow row = sheet.createRow(0);
		HSSFCell cell0 = row.createCell(0);
		HSSFCell cell1 = row.createCell(1);
		HSSFCell cell2 = row.createCell(2);
		HSSFCell cell3 = row.createCell(3);
		HSSFCell cell4 = row.createCell(4);
		HSSFCell cell5 = row.createCell(5);
		HSSFCell cell6 = row.createCell(6);
//		HSSFCell cell7 = row.createCell(7);
//		HSSFCell cell8 = row.createCell(8);
		
		cell0.setCellValue("行号");
		cell1.setCellValue("商品");
		cell2.setCellValue("名称");
//		cell3.setCellValue("包装代码");
//		cell4.setCellValue("单位");
		cell3.setCellValue("库存数KG");
		cell4.setCellValue("盘点数KG");
		cell5.setCellValue("差异KG");
		cell6.setCellValue("差异原因");
		
		Float qtysum=0F;
		Float countQtysum=0F;
		Float qtydiffsum=0F;
		if ((null != data) && (0 != data.size())) {
			for (int i = 0; i < data.size(); i++) {
				Map<String, Object> map = data.get(i);
						
				Float qty=WmsCommon.acruateFloat(WmsCommon.doubleToFloat((Double)map.get("qty")));
				Float countQty=WmsCommon.acruateFloat(WmsCommon.doubleToFloat((Double)map.get("countQty")));
				Float qtydiff=WmsCommon.acruateFloat(WmsCommon.doubleToFloat((Double)map.get("qtydiff")));
                
				//计算总和
				qtysum+=qty;
				countQtysum+=countQty;
				qtydiffsum+=qtydiff;
				
				row = sheet.createRow(i + 1);
				cell0 = row.createCell(0);
				cell1 = row.createCell(1);
				cell2 = row.createCell(2);
				cell3 = row.createCell(3);
				cell4 = row.createCell(4);
				cell5 = row.createCell(5);
				cell6 = row.createCell(6);
//				cell7 = row.createCell(7);
//				cell8 = row.createCell(8);
				
				cell0.setCellValue(map.get("rownum") + "");
				cell1.setCellValue(map.get("sku") + "");
				cell2.setCellValue(map.get("name") + "");
//				cell3.setCellValue(map.get("packKey")+ "");
//				cell4.setCellValue(map.get("desea")+"");
				cell3.setCellValue(qty + "");
				cell4.setCellValue(countQty + "");
				cell5.setCellValue(qtydiff + "");
				cell6.setCellValue("");
				
				sheet.setColumnWidth(0, 4000);
				sheet.setColumnWidth(1, 4000);
				sheet.setColumnWidth(2, 4000);
				sheet.setColumnWidth(3, 4000);
				sheet.setColumnWidth(4, 4000);
				sheet.setColumnWidth(5, 4000);
				sheet.setColumnWidth(6, 4000);
//				sheet.setColumnWidth(7, 4000);
//				sheet.setColumnWidth(8, 4000);
			}
		}
		
	
		qtysum=WmsCommon.acruateFloat(qtysum);
		countQtysum=WmsCommon.acruateFloat(countQtysum);
		qtydiffsum=WmsCommon.acruateFloat(qtydiffsum);
		// 最后打印合计
		row = sheet.createRow(data.size() + 1);
		cell0 = row.createCell(0);
		cell1 = row.createCell(1);
		cell2 = row.createCell(2);
		cell3 = row.createCell(3);
		cell4 = row.createCell(4);
		cell5 = row.createCell(5);
		cell6 = row.createCell(6);
//		cell7 = row.createCell(7);
//		cell8 = row.createCell(8);

		cell0.setCellValue("");
		cell1.setCellValue("");
//		cell2.setCellValue("");
//		cell3.setCellValue("");
		cell2.setCellValue("总计：");
		cell3.setCellValue(qtysum+"");
		cell4.setCellValue(countQtysum+"");
		cell5.setCellValue(qtydiffsum+"");
		cell6.setCellValue("");

		sheet.setColumnWidth(0, 4000);
		sheet.setColumnWidth(1, 4000);
		sheet.setColumnWidth(2, 4000);
		sheet.setColumnWidth(3, 4000);
		sheet.setColumnWidth(4, 4000);
		sheet.setColumnWidth(5, 4000);
		sheet.setColumnWidth(6, 4000);
//		sheet.setColumnWidth(7, 4000);
//		sheet.setColumnWidth(8, 4000);
		
		// 通过Response把数据以Excel格式保存
		response.reset();
		response.setContentType("application/msexcel;charset=UTF-8");
		try {
			response.addHeader(
					"Content-Disposition",
					"attachment;filename=\""
							+ new String(("盘点差异报表.xls")
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
