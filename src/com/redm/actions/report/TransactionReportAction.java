package com.redm.actions.report;

import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFHeader;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;

import net.sf.json.JSONObject;

import com.ibm.icu.math.BigDecimal;
import com.jelly.help.commons.base.BaseAction;
import com.jelly.help.commons.dbutils.DBHelper;
import com.jelly.help.commons.dbutils.handlers.MapListHandler;
import com.jelly.help.commons.util.UtilValidate;
import com.redm.actions.support.WmsCommon;
import com.redm.actions.utility.Constants;

public class TransactionReportAction  extends BaseAction {


	/**
	 * 
	 */
	private static final long serialVersionUID = -1324945883298235745L;

	//打印按照货主查询的报表的方法
	@Action(value="printTransactionDetailStorer",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String printTransactionDetailStorer(){
		HttpServletRequest request = ServletActionContext.getRequest();
   		final String str = request.getParameter("string");
   		String[] strs=str.split(",");
   		
   		String zeroValues=strs[0];
   		if(strs[0].equals("undefined")){
   			zeroValues = "";
   		}
   		
		final String storerKey = strs[1];
		final String storerKeyOver = strs[2];
		
		DBHelper dbHelper = DBHelper.getInstance(false);
		
		List<Map<String, Object>> data=new ArrayList<Map<String,Object>>();
		try{
			StringBuffer sql = new StringBuffer();
		
			sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY STORER_KEY ASC) AS ROWNUM, ");
			sql.append(" STORER_KEY,SUM(coalesce (QTY,0)) AS QTY,SUM(coalesce (QTYALLOCATED,0)) AS QTYALLOCATED,    ");
			sql.append(" SUM(coalesce (QTYONHOLD,0)) AS QTYONHOLD,   ");
			sql.append(" SUM(coalesce (QTY,0)-coalesce (QTYALLOCATED,0)-coalesce (QTYONHOLD,0)) AS QTYAVAILABLE   ");
			sql.append(" FROM LOT LT   ");
			sql.append(" WHERE 1=1  ");
			if(UtilValidate.isEmpty(zeroValues)){
				sql.append(" AND QTY > 0 ");        
			}        
			if(UtilValidate.isNotEmpty(storerKey) && UtilValidate.isNotEmpty(storerKeyOver)){
				sql.append(" AND STORER_KEY >= '"+storerKey+"' ");        
				sql.append(" AND STORER_KEY <= '"+storerKeyOver+"' ");    
			}
			sql.append(" GROUP BY STORER_KEY   ");		
			data = dbHelper.select(sql.toString(), new MapListHandler());		
		}catch (Exception e) {
			e.printStackTrace();
			dbHelper.close();
		}finally{
			dbHelper.freeConnection();
		}
		
		
		HttpServletResponse response = ServletActionContext.getResponse();
		// 创建一个新的Excel
		HSSFWorkbook workBook = new HSSFWorkbook();
		// 创建sheet页
		HSSFSheet sheet = workBook.createSheet();
		// sheet页名称
		workBook.setSheetName(0, "按货主查询的库存余量报表");
		// 创建header页
		HSSFHeader header = sheet.getHeader();
		// 设置标题居中
		header.setCenter("按货主查询的库存余量报表");
		// 设置第一行为Header

		HSSFRow row = sheet.createRow(0);
		HSSFCell cell0 = row.createCell(0);
		HSSFCell cell1 = row.createCell(1);
		HSSFCell cell2 = row.createCell(2);
		HSSFCell cell3 = row.createCell(3);
		HSSFCell cell4 = row.createCell(4);
		
		cell0.setCellValue("货主");
		cell1.setCellValue("数量");
		cell2.setCellValue("已分配数量");
		cell3.setCellValue("冻结数量");
		cell4.setCellValue("可用数量");
		
		if ((null != data) && (0 != data.size())) {
			for (int i = 0; i < data.size(); i++) {
				Map<String, Object> map = data.get(i);
				Float qty=WmsCommon.doubleToFloat((Double)map.get("qty"));
				Float qtyallocated=WmsCommon.doubleToFloat((Double)map.get("qtyallocated"));
				Float qtyonhold=WmsCommon.doubleToFloat((Double)map.get("qtyonhold"));
				Float qtyavailable=WmsCommon.doubleToFloat((Double)map.get("qtyavailable"));
			
				BigDecimal b1 = new BigDecimal(qty);  
				Float qtyValue=b1.setScale(3,BigDecimal.ROUND_HALF_UP).floatValue();  

				BigDecimal b2 = new BigDecimal(qtyallocated);  
				Float qtyallocatedValue=b2.setScale(3,BigDecimal.ROUND_HALF_UP).floatValue();
				
				BigDecimal b3 = new BigDecimal(qtyonhold);  
				Float qtyonholdValue=b3.setScale(3,BigDecimal.ROUND_HALF_UP).floatValue();
				
				BigDecimal b4 = new BigDecimal(qtyavailable);  
				Float qtyavailableValue=b4.setScale(3,BigDecimal.ROUND_HALF_UP).floatValue();
				
				row = sheet.createRow(i + 1);
				cell0 = row.createCell(0);
				cell1 = row.createCell(1);
				cell2 = row.createCell(2);
				cell3 = row.createCell(3);
				cell4 = row.createCell(4);
				
				cell0.setCellValue(map.get("storerKey") + "");
				cell1.setCellValue(qtyValue + "");
				cell2.setCellValue(qtyallocatedValue + "");
				cell3.setCellValue(qtyonholdValue + "");
				cell4.setCellValue(qtyavailableValue + "");
				
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
							+ new String(("按货主查询的库存余量报表.xls")
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
	
	//打印按照商品查询的报表的方法
	@Action(value="printTransactionDetailSku",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String printTransactionDetailSku(){
		HttpServletRequest request = ServletActionContext.getRequest();
	    try {
			request.setCharacterEncoding("gbk");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		String requeststr= request.getParameter("string");
		String[] strs=requeststr.split(",");
		
		String zeroValues=strs[0];
   		if(strs[0].equals("undefined")){
   			zeroValues = "";
   		}
   		String storerKey = "";
		String storerKeyOver = "";
		if(strs.length>1){
			storerKey = strs[1];
			storerKeyOver = strs[2];
		}
		String sku = "";
		String skuOver = "";
		if(strs.length>3){
			sku = strs[3];
			skuOver = strs[4];
		}
		
		List<Map<String, Object>> data=new ArrayList<Map<String,Object>>();
		DBHelper dbHelper = DBHelper.getInstance(false);
		try
		{
            StringBuffer sql = new StringBuffer();
			sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY ST.SKU ASC) AS ROWNUM,  ST.STORER_KEY, ST.SKU,ST.NAME,ST.QTY,ST.QTYALLOCATED,ST.QTYONHOLD,ST.QTYAVAILABLE   ");
			sql.append(" from   ");
			sql.append(" (   ");
			sql.append(" SELECT LT.STORER_KEY, LT.SKU,S.NAME,SUM(coalesce (QTY,0)) AS QTY,SUM(coalesce (QTYALLOCATED,0)) AS QTYALLOCATED,    ");
			sql.append(" SUM(coalesce (QTYONHOLD,0)) AS QTYONHOLD,   ");
			sql.append(" SUM(coalesce (QTY,0)-coalesce (QTYALLOCATED,0)-coalesce (QTYONHOLD,0)) AS QTYAVAILABLE   ");
			sql.append(" FROM LOT LT   ");
			sql.append(" INNER JOIN SKU S ON (S.SKU=LT.SKU AND S.STORER_KEY=LT.STORER_KEY)    ");
			sql.append(" WHERE 1=1  AND LT.QTY>0   ");
			if(UtilValidate.isEmpty(zeroValues)){
				sql.append(" AND LT.QTY > 0 ");        
			}	            
			if(UtilValidate.isNotEmpty(storerKey) && UtilValidate.isNotEmpty(storerKeyOver)){
				sql.append(" AND LT.STORER_KEY >= '"+storerKey+"' ");        
				sql.append(" AND LT.STORER_KEY <= '"+storerKeyOver+"' ");    
			}				
			if(UtilValidate.isNotEmpty(sku)&& UtilValidate.isNotEmpty(skuOver)){
					sql.append(" AND LT.SKU >= '"+sku+"' ");        
					sql.append(" AND LT.SKU <= '"+skuOver+"' ");    
			}
			sql.append(" GROUP BY LT.STORER_KEY, LT.SKU,S.NAME ");
			sql.append(" ) ST   ");
                
			data = dbHelper.select(sql.toString(), new MapListHandler());	
		}catch (Exception e) {
			e.printStackTrace();
			dbHelper.close();
		}finally{
			dbHelper.freeConnection();
		}
		
		
		HttpServletResponse response = ServletActionContext.getResponse();
		// 创建一个新的Excel
		HSSFWorkbook workBook = new HSSFWorkbook();
		// 创建sheet页
		HSSFSheet sheet = workBook.createSheet();
		// sheet页名称
		workBook.setSheetName(0, "按SKU查询的库存余量报表");
		// 创建header页
		HSSFHeader header = sheet.getHeader();
		// 设置标题居中
		header.setCenter("按SKU查询的库存余量报表");
		// 设置第一行为Header

		HSSFRow row = sheet.createRow(0);
		HSSFCell cell0 = row.createCell(0);
		HSSFCell cell1 = row.createCell(1);
		HSSFCell cell2 = row.createCell(2);
		HSSFCell cell3 = row.createCell(3);
		HSSFCell cell4 = row.createCell(4);
		HSSFCell cell5 = row.createCell(5);
		HSSFCell cell6 = row.createCell(6);
		
		cell0.setCellValue("货主");
		cell1.setCellValue("SKU");
		cell2.setCellValue("名称");
		cell3.setCellValue("数量");
		cell4.setCellValue("已分配数量");
		cell5.setCellValue("冻结数量");
		cell6.setCellValue("可用数量");
		
		if ((null != data) && (0 != data.size())) {
			for (int i = 0; i < data.size(); i++) {
				Map<String, Object> map = data.get(i);
				Float qty=WmsCommon.doubleToFloat((Double)map.get("qty"));
				Float qtyallocated=WmsCommon.doubleToFloat((Double)map.get("qtyallocated"));
				Float qtyonhold=WmsCommon.doubleToFloat((Double)map.get("qtyonhold"));
				Float qtyavailable=WmsCommon.doubleToFloat((Double)map.get("qtyavailable"));
			
				BigDecimal b1 = new BigDecimal(qty);  
				Float qtyValue=b1.setScale(3,BigDecimal.ROUND_HALF_UP).floatValue();  

				BigDecimal b2 = new BigDecimal(qtyallocated);  
				Float qtyallocatedValue=b2.setScale(3,BigDecimal.ROUND_HALF_UP).floatValue();
				
				BigDecimal b3 = new BigDecimal(qtyonhold);  
				Float qtyonholdValue=b3.setScale(3,BigDecimal.ROUND_HALF_UP).floatValue();
				
				BigDecimal b4 = new BigDecimal(qtyavailable);  
				Float qtyavailableValue=b4.setScale(3,BigDecimal.ROUND_HALF_UP).floatValue();
				
				row = sheet.createRow(i + 1);
				cell0 = row.createCell(0);
				cell1 = row.createCell(1);
				cell2 = row.createCell(2);
				cell3 = row.createCell(3);
				cell4 = row.createCell(4);
				cell5 = row.createCell(5);
				cell6 = row.createCell(6);
				
				cell0.setCellValue(map.get("storerKey") + "");
				cell1.setCellValue(map.get("sku") + "");
				cell2.setCellValue(map.get("name") + "");
				cell3.setCellValue(qtyValue + "");
				cell4.setCellValue(qtyallocatedValue + "");
				cell5.setCellValue(qtyonholdValue + "");
				cell6.setCellValue(qtyavailableValue + "");
				
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
							+ new String(("按SKU查询的库存余量报表.xls")
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
	
	//打印按照批次生成的报表的方法
	@Action(value="printTransactionDetailLot",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String printTransactionDetailLot(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String requeststr= request.getParameter("string");
		String[] strs=requeststr.split(",");
		
		String zeroValues=strs[0];
   		if(strs[0].equals("undefined")){
   			zeroValues = "";
   		}
   		String storerKey = "";
		String storerKeyOver = "";
		if(strs.length>1){
			storerKey = strs[1];
			storerKeyOver = strs[2];
		}
		String sku = "";
		String skuOver = "";
		if(strs.length>3){
			sku = strs[3];
			skuOver = strs[4];
		}
		String lot = "";
		String lotOver = "";
		if(strs.length>5){
			lot = strs[5];
			lotOver = strs[6];
		}
		String lottable01 = "";
		String lottable01Over = "";
		if(strs.length>7){
			lottable01 = strs[7];
			lottable01Over = strs[8];
		}
		String lottable02 = "";
		String lottable02Over = "";
		if(strs.length>9){
			lottable02 = strs[9];
			lottable02Over = strs[10];
		}
		String lottable03 = "";
		String lottable03Over = "";
		if(strs.length>11){
			lottable03 = strs[11];
			lottable03Over = strs[12];
		}
		String lottable04 = "";
		String lottable04Over = "";
		if(strs.length>13){
			lottable04 = strs[13];
			lottable04Over = strs[14];
		}	
		String lottable05 = "";
		String lottable05Over = "";
		if(strs.length>15){
			lottable05 = strs[15];
			lottable05Over = strs[16];
		}	
		String lottable06 = "";
		String lottable06Over = "";
		if(strs.length>17){
			lottable06 = strs[17];
			lottable06Over = strs[18];
		}
		String lottable07 = "";
		String lottable07Over = "";
		if(strs.length>19){
			lottable07 = strs[19];
			lottable07Over = strs[20];
		}
		String lottable08 = "";
		String lottable08Over = "";
		if(strs.length>21){
			lottable08 = strs[21];
			lottable08Over = strs[22];
		}
		String lottable09 = "";
		String lottable09Over = "";
		if(strs.length>23){
			lottable09 = strs[23];
			lottable09Over = strs[24];
		}
		String lottable10 = "";
		String lottable10Over = "";
		if(strs.length>25){
			lottable10 = strs[25];
			lottable10Over = strs[26];
		}
		String lottable11 = "";
		String lottable11Over = "";
		if(strs.length>27){
			lottable11 = strs[27];
			lottable11Over = strs[28];
		}
		String lottable12 = "";
		String lottable12Over = "";
		if(strs.length>29){
			lottable12 = strs[29];
			lottable12Over = strs[30];
		}
		String lottable13 = "";
		String lottable13Over = "";
		if(strs.length>31){
			lottable13 = strs[31];
			lottable13Over = strs[32];
		}
		String lottable14 = "";
		String lottable14Over = "";
		if(strs.length>33){
			lottable14 = strs[33];
			lottable14Over = strs[34];
		}
		String lottable15 = "";
		String lottable15Over = "";
		if(strs.length>35){
			lottable15 = strs[35];
			lottable15Over = strs[36];
		}
		String lottable16 = "";
		String lottable16Over = "";
		if(strs.length>37){
			lottable16 = strs[37];
			lottable16Over = strs[38];
		}
		String lottable17 = "";
		String lottable17Over = "";
		if(strs.length>39){
			lottable17 = strs[39];
			lottable17Over = strs[40];
		}
		String lottable18 = "";
		String lottable18Over = "";
		if(strs.length>41){
			lottable18 = strs[41];
			lottable18Over = strs[42];
		}
		String lottable19 = "";
		String lottable19Over = "";
		if(strs.length>43){
			lottable19 = strs[43];
			lottable19Over = strs[44];
		}
		String lottable20 = "";
		String lottable20Over = "";
		if(strs.length>45){
			lottable20 = strs[45];
			lottable20Over = strs[46];
		}
		
		DBHelper dbHelper = DBHelper.getInstance(false);
		List<Map<String, Object>> data =new ArrayList<Map<String,Object>>();
		try
        {
            StringBuffer sql = new StringBuffer();

			sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY ST.LOT ASC) AS ROWNUM,  ST.LOT,ST.STORER_KEY,ST.SKU,ST.NAME,ST.QTY,ST.QTYALLOCATED,ST.QTYONHOLD,ST.QTYAVAILABLE, ");
			sql.append(" LA.LOTTABLE01,LA.LOTTABLE02,LA.LOTTABLE03,LA.LOTTABLE04,LA.LOTTABLE05,LA.LOTTABLE06, ");
			sql.append(" LA.LOTTABLE07,LA.LOTTABLE08,LA.LOTTABLE09,LA.LOTTABLE10,LA.LOTTABLE11,LA.LOTTABLE12,LA.LOTTABLE13,LA.LOTTABLE14,LA.LOTTABLE15,");
			sql.append(" LA.LOTTABLE16,LA.LOTTABLE17,LA.LOTTABLE18,LA.LOTTABLE19,LA.LOTTABLE20 ");
			sql.append(" from   ");
			sql.append(" (   ");  //st与lottable表内部连接生成的表开始
			sql.append(" (   ");   //ST表开始
			sql.append(" SELECT LT.STORER_KEY,LT.LOT,LT.SKU,S.NAME,");
               sql.append(" SUM(coalesce (QTY,0)) AS QTY,SUM(coalesce (QTYALLOCATED,0)) AS QTYALLOCATED,    ");
			sql.append(" SUM(coalesce (QTYONHOLD,0)) AS QTYONHOLD,   ");
			sql.append(" SUM(coalesce (QTY,0)-coalesce (QTYALLOCATED,0)-coalesce (QTYONHOLD,0)) AS QTYAVAILABLE   ");
			sql.append(" FROM LOT LT   ");
			sql.append(" INNER JOIN SKU S ON (S.SKU=LT.SKU AND S.STORER_KEY=LT.STORER_KEY)    ");
			sql.append(" WHERE 1=1 ");
			
			if(UtilValidate.isEmpty(zeroValues)){
				sql.append(" AND LT.QTY > 0 ");        
			}               
			if(UtilValidate.isNotEmpty(storerKey) && UtilValidate.isNotEmpty(storerKeyOver)){
				sql.append(" AND LT.STORER_KEY >= '"+storerKey+"' ");        
				sql.append(" AND LT.STORER_KEY <= '"+storerKeyOver+"' ");    
			}
			if(UtilValidate.isNotEmpty(sku)&& UtilValidate.isNotEmpty(skuOver)){
				sql.append(" AND LT.SKU >= '"+sku+"' ");        
				sql.append(" AND LT.SKU <= '"+skuOver+"' ");    
			}
			if(UtilValidate.isNotEmpty(lot)&& UtilValidate.isNotEmpty(lotOver)){
				sql.append(" AND LT.LOT >= '"+lot+"' ");        
				sql.append(" AND LT.LOT <= '"+lotOver+"' ");    
			}
			sql.append(" GROUP BY LT.LOT,LT.STORER_KEY,LT.SKU,S.NAME ");
			sql.append(" ) ST   ");   //ST表结束
               sql.append(" INNER JOIN LOTTABLE LA ON LA.LOT=ST.LOT   ");
               sql.append(" )   ");//st与lottable表内部连接生成的表开始
               
			if(UtilValidate.isNotEmpty(lottable01) && UtilValidate.isNotEmpty(lottable01Over)){
				sql.append(" AND LA.LOTTABLE01 >= '"+lottable01+"' ");        
				sql.append(" AND LA.LOTTABLE01 <= '"+lottable01Over+"' ");    
			}
			if(UtilValidate.isNotEmpty(lottable02) && UtilValidate.isNotEmpty(lottable02Over)){
				sql.append(" AND LA.LOTTABLE02 >= '"+lottable02+"' ");        
				sql.append(" AND LA.LOTTABLE02 <= '"+lottable02Over+"' ");    
			}
			if(UtilValidate.isNotEmpty(lottable03) && UtilValidate.isNotEmpty(lottable03Over)){
				sql.append(" AND LA.LOTTABLE03 >= '"+lottable03+"' ");        
				sql.append(" AND LA.LOTTABLE03 <= '"+lottable03Over+"' ");    
			}
			if(UtilValidate.isNotEmpty(lottable04) && UtilValidate.isNotEmpty(lottable04Over)){
				sql.append(" AND LA.LOTTABLE04 >= '"+lottable04+"' ");        
				sql.append(" AND LA.LOTTABLE04 <= '"+lottable04Over+"' ");    
			}
			if(UtilValidate.isNotEmpty(lottable05) && UtilValidate.isNotEmpty(lottable05Over)){
				sql.append(" AND LA.LOTTABLE05 >= '"+lottable05+"' ");        
				sql.append(" AND LA.LOTTABLE05 <= '"+lottable05Over+"' ");    
			}
			if(UtilValidate.isNotEmpty(lottable06) && UtilValidate.isNotEmpty(lottable06Over)){
				sql.append(" AND LA.LOTTABLE06 >= '"+lottable06+"' ");        
				sql.append(" AND LA.LOTTABLE06 <= '"+lottable06Over+"' ");    
			}
			if(UtilValidate.isNotEmpty(lottable07) && UtilValidate.isNotEmpty(lottable07Over)){
				sql.append(" AND LA.LOTTABLE07 >= '"+lottable07+"' ");        
				sql.append(" AND LA.LOTTABLE07 <= '"+lottable07Over+"' ");    
			}
			if(UtilValidate.isNotEmpty(lottable08) && UtilValidate.isNotEmpty(lottable08Over)){
				sql.append(" AND LA.LOTTABLE08 >= '"+lottable08+"' ");        
				sql.append(" AND LA.LOTTABLE08 <= '"+lottable08Over+"' ");    
			}
			if(UtilValidate.isNotEmpty(lottable09) && UtilValidate.isNotEmpty(lottable09Over)){
				sql.append(" AND LA.LOTTABLE09 >= '"+lottable09+"' ");        
				sql.append(" AND LA.LOTTABLE09 <= '"+lottable09Over+"' ");    
			}
			if(UtilValidate.isNotEmpty(lottable10) && UtilValidate.isNotEmpty(lottable10Over)){
				sql.append(" AND LA.LOTTABLE10 >= '"+lottable10+"' ");        
				sql.append(" AND LA.LOTTABLE10 <= '"+lottable10Over+"' ");    
			}
			if(UtilValidate.isNotEmpty(lottable11) && UtilValidate.isNotEmpty(lottable11Over)){
				sql.append(" AND LA.LOTTABLE11 >= '"+lottable11+"' ");        
				sql.append(" AND LA.LOTTABLE11 <= '"+lottable11Over+"' ");    
			}
			if(UtilValidate.isNotEmpty(lottable12) && UtilValidate.isNotEmpty(lottable12Over)){
				sql.append(" AND LA.LOTTABLE12 >= '"+lottable12+"' ");        
				sql.append(" AND LA.LOTTABLE12 <= '"+lottable12Over+"' ");    
			} 
			if(UtilValidate.isNotEmpty(lottable13) && UtilValidate.isNotEmpty(lottable13Over)){
				sql.append(" AND LA.LOTTABLE13 >= '"+lottable13+"' ");        
				sql.append(" AND LA.LOTTABLE13 <= '"+lottable13Over+"' ");    
			}
			if(UtilValidate.isNotEmpty(lottable14) && UtilValidate.isNotEmpty(lottable14Over)){
				sql.append(" AND LA.LOTTABLE14 >= '"+lottable14+"' ");        
				sql.append(" AND LA.LOTTABLE14 <= '"+lottable14Over+"' ");    
			}
			if(UtilValidate.isNotEmpty(lottable15) && UtilValidate.isNotEmpty(lottable15Over)){
				sql.append(" AND LA.LOTTABLE15 >= '"+lottable15+"' ");        
				sql.append(" AND LA.LOTTABLE15 <= '"+lottable15Over+"' ");    
			} 
			if(UtilValidate.isNotEmpty(lottable16) && UtilValidate.isNotEmpty(lottable16Over)){
				sql.append(" AND LA.LOTTABLE16 >= '"+lottable16+"' ");        
				sql.append(" AND LA.LOTTABLE16 <= '"+lottable16Over+"' ");    
			}
			if(UtilValidate.isNotEmpty(lottable17) && UtilValidate.isNotEmpty(lottable17Over)){
				sql.append(" AND LA.LOTTABLE17 >= '"+lottable17+"' ");        
				sql.append(" AND LA.LOTTABLE17 <= '"+lottable17Over+"' ");    
			} 
			if(UtilValidate.isNotEmpty(lottable18) && UtilValidate.isNotEmpty(lottable18Over)){
				sql.append(" AND LA.LOTTABLE18 >= '"+lottable18+"' ");        
				sql.append(" AND LA.LOTTABLE18 <= '"+lottable18Over+"' ");    
			}
			if(UtilValidate.isNotEmpty(lottable19) && UtilValidate.isNotEmpty(lottable19Over)){
				sql.append(" AND LA.LOTTABLE19 >= '"+lottable19+"' ");        
				sql.append(" AND LA.LOTTABLE19 <= '"+lottable19Over+"' ");    
			}
			if(UtilValidate.isNotEmpty(lottable20) && UtilValidate.isNotEmpty(lottable20Over)){
				sql.append(" AND LA.LOTTABLE20 >= '"+lottable20+"' ");        
				sql.append(" AND LA.LOTTABLE20 <= '"+lottable20Over+"' ");    
			} 
       
			data = dbHelper.select(sql.toString(), new MapListHandler());			
			
		}catch (Exception e) {
			e.printStackTrace();
			dbHelper.close();
		}finally{
			dbHelper.freeConnection();
		}
		
		
		HttpServletResponse response = ServletActionContext.getResponse();
		// 创建一个新的Excel
		HSSFWorkbook workBook = new HSSFWorkbook();
		// 创建sheet页
		HSSFSheet sheet = workBook.createSheet();
		// sheet页名称
		workBook.setSheetName(0, "按批次查询的库存余量报表");
		// 创建header页
		HSSFHeader header = sheet.getHeader();
		// 设置标题居中
		header.setCenter("按批次查询的库存余量报表");
		// 设置第一行为Header

		HSSFRow row = sheet.createRow(0);
		HSSFCell cell0 = row.createCell(0);
		HSSFCell cell1 = row.createCell(1);
		HSSFCell cell2 = row.createCell(2);
		HSSFCell cell3 = row.createCell(3);
		HSSFCell cell4 = row.createCell(4);
		HSSFCell cell5 = row.createCell(5);
		
		cell0.setCellValue("货主");
		cell1.setCellValue("批次");
		cell2.setCellValue("数量");
		cell3.setCellValue("已分配数量");
		cell4.setCellValue("冻结数量");
		cell5.setCellValue("可用数量");
		
		if ((null != data) && (0 != data.size())) {
			for (int i = 0; i < data.size(); i++) {
				Map<String, Object> map = data.get(i);
				Float qty=WmsCommon.doubleToFloat((Double)map.get("qty"));
				Float qtyallocated=WmsCommon.doubleToFloat((Double)map.get("qtyallocated"));
				Float qtyonhold=WmsCommon.doubleToFloat((Double)map.get("qtyonhold"));
				Float qtyavailable=WmsCommon.doubleToFloat((Double)map.get("qtyavailable"));
			
				BigDecimal b1 = new BigDecimal(qty);  
				Float qtyValue=b1.setScale(3,BigDecimal.ROUND_HALF_UP).floatValue();  

				BigDecimal b2 = new BigDecimal(qtyallocated);  
				Float qtyallocatedValue=b2.setScale(3,BigDecimal.ROUND_HALF_UP).floatValue();
				
				BigDecimal b3 = new BigDecimal(qtyonhold);  
				Float qtyonholdValue=b3.setScale(3,BigDecimal.ROUND_HALF_UP).floatValue();
				
				BigDecimal b4 = new BigDecimal(qtyavailable);  
				Float qtyavailableValue=b4.setScale(3,BigDecimal.ROUND_HALF_UP).floatValue();
				
				row = sheet.createRow(i + 1);
				cell0 = row.createCell(0);
				cell1 = row.createCell(1);
				cell2 = row.createCell(2);
				cell3 = row.createCell(3);
				cell4 = row.createCell(4);
				cell5 = row.createCell(5);
				
				cell0.setCellValue(map.get("storerKey") + "");
				cell1.setCellValue(map.get("lot") + "");
				cell2.setCellValue(qtyValue + "");
				cell3.setCellValue(qtyallocatedValue + "");
				cell4.setCellValue(qtyonholdValue + "");
				cell5.setCellValue(qtyavailableValue + "");
				
				sheet.setColumnWidth(0, 4000);
				sheet.setColumnWidth(1, 4000);
				sheet.setColumnWidth(2, 4000);
				sheet.setColumnWidth(3, 4000);
				sheet.setColumnWidth(4, 4000);
				sheet.setColumnWidth(5, 4000);
			}
		}
		
		// 通过Response把数据以Excel格式保存
		response.reset();
		response.setContentType("application/msexcel;charset=UTF-8");
		try {
			response.addHeader(
					"Content-Disposition",
					"attachment;filename=\""
							+ new String(("按批次查询的库存余量报表.xls")
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
	
	//打印按照库位生成的报表的方法
	@Action(value="printTransactionDetailLoc",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String printTransactionDetailLoc(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String requeststr= request.getParameter("string");
		String[] strs=requeststr.split(",");
		
		String zeroValues=strs[0];
   		if(strs[0].equals("undefined")){
   			zeroValues = "";
   		}
   		String storerKey = "";
		String storerKeyOver = "";
		if(strs.length>1){
			storerKey = strs[1];
			storerKeyOver = strs[2];
		}
		String loc = "";
		String locOver = "";
		if(strs.length>3){
			loc = strs[3];
			locOver = strs[4];
		}

		DBHelper dbHelper = DBHelper.getInstance(false);
		List<Map<String, Object>> data = new ArrayList<Map<String,Object>>();
		try
        {
            StringBuffer sql = new StringBuffer();
			sql.append("SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY LOC ASC) AS ROWNUM, ");
			sql.append("storer_key, LOC , sum (coalesce (qty,0) ) AS qty, sum (coalesce (qtyallocated,0) ) AS qtyallocated ");
			sql.append(" FROM SKUXLOC  ");
			sql.append(" WHERE 1=1 "); 
			if(UtilValidate.isEmpty(zeroValues)){
				sql.append(" AND qty > 0 ");        
			}              
			if(UtilValidate.isNotEmpty(storerKey) && UtilValidate.isNotEmpty(storerKeyOver)){
				sql.append(" AND  STORER_KEY >= '"+storerKey+"' ");        
				sql.append(" AND  STORER_KEY <= '"+storerKeyOver+"' ");    
			}
			if(UtilValidate.isNotEmpty(loc) && UtilValidate.isNotEmpty(locOver)){
				sql.append(" AND LOC >= '"+loc+"' ");        
				sql.append(" AND LOC <= '"+locOver+"' ");    
			}
			sql.append(" GROUP BY STORER_KEY,LOC ");
            
			data = dbHelper.select(sql.toString(), new MapListHandler());
		}catch (Exception e) {
			e.printStackTrace();
			dbHelper.close();
		}finally{
			dbHelper.freeConnection();
		}
		
		
		HttpServletResponse response = ServletActionContext.getResponse();
		// 创建一个新的Excel
		HSSFWorkbook workBook = new HSSFWorkbook();
		// 创建sheet页
		HSSFSheet sheet = workBook.createSheet();
		// sheet页名称
		workBook.setSheetName(0, "按库位查询的库存余量报表");
		// 创建header页
		HSSFHeader header = sheet.getHeader();
		// 设置标题居中
		header.setCenter("按库位查询的库存余量报表");
		// 设置第一行为Header

		HSSFRow row = sheet.createRow(0);
		HSSFCell cell0 = row.createCell(0);
		HSSFCell cell1 = row.createCell(1);
		HSSFCell cell2 = row.createCell(2);
		HSSFCell cell3 = row.createCell(3);
		
		cell0.setCellValue("库位");
		cell1.setCellValue("货主");
		cell2.setCellValue("数量");
		cell3.setCellValue("已分配数量");
		
		if ((null != data) && (0 != data.size())) {
			for (int i = 0; i < data.size(); i++) {
				Map<String, Object> map = data.get(i);
				Float qty=WmsCommon.doubleToFloat((Double)map.get("qty"));
				Float qtyallocated=WmsCommon.doubleToFloat((Double)map.get("qtyallocated"));
			
				BigDecimal b1 = new BigDecimal(qty);  
				Float qtyValue=b1.setScale(3,BigDecimal.ROUND_HALF_UP).floatValue();  

				BigDecimal b2 = new BigDecimal(qtyallocated);  
				Float qtyallocatedValue=b2.setScale(3,BigDecimal.ROUND_HALF_UP).floatValue();
				
				row = sheet.createRow(i + 1);
				cell0 = row.createCell(0);
				cell1 = row.createCell(1);
				cell2 = row.createCell(2);
				cell3 = row.createCell(3);
				
				cell0.setCellValue(map.get("loc") + "");
				cell1.setCellValue(map.get("storerKey") + "");
				cell2.setCellValue(qtyValue + "");
				cell3.setCellValue(qtyallocatedValue + "");
				
				sheet.setColumnWidth(0, 4000);
				sheet.setColumnWidth(1, 4000);
				sheet.setColumnWidth(2, 4000);
				sheet.setColumnWidth(3, 4000);
			}
		}
		
		// 通过Response把数据以Excel格式保存
		response.reset();
		response.setContentType("application/msexcel;charset=UTF-8");
		try {
			response.addHeader(
					"Content-Disposition",
					"attachment;filename=\""
							+ new String(("按库位查询的库存余量报表.xls")
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

	//打印按照LLI生成的报表的方法
	@Action(value="printTransactionDetailLLI",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String printTransactionDetailLLI(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String requeststr= request.getParameter("string");
		String[] strs=requeststr.split(",");
		
		String zeroValues=strs[0];
   		if(strs[0].equals("undefined")){
   			zeroValues = "";
   		}
   		String storerKey = "";
		String storerKeyOver = "";
		if(strs.length>1){
			storerKey = strs[1];
			storerKeyOver = strs[2];
		}
		String sku = "";
		String skuOver = "";
		if(strs.length>3){
			sku = strs[3];
			skuOver = strs[4];
		}
		String lot = "";
		String lotOver = "";
		if(strs.length>5){
			lot = strs[5];
			lotOver = strs[6];
		}
		String lottable01 = "";
		String lottable01Over = "";
		if(strs.length>7){
			lottable01 = strs[7];
			lottable01Over = strs[8];
		}
		String lottable02 = "";
		String lottable02Over = "";
		if(strs.length>9){
			lottable02 = strs[9];
			lottable02Over = strs[10];
		}
		String lottable03 = "";
		String lottable03Over = "";
		if(strs.length>11){
			lottable03 = strs[11];
			lottable03Over = strs[12];
		}
		String lottable04 = "";
		String lottable04Over = "";
		if(strs.length>13){
			lottable04 = strs[13];
			lottable04=WmsCommon.ajaxParaEncoding(lottable04);
			lottable04Over = strs[14];
			lottable04Over=WmsCommon.ajaxParaEncoding(lottable04Over);
		}	
		String lottable05 = "";
		String lottable05Over = "";
		if(strs.length>15){
			lottable05 = strs[15];
			lottable05=WmsCommon.ajaxParaEncoding(lottable05);
			lottable05Over = strs[16];
			lottable05Over=WmsCommon.ajaxParaEncoding(lottable05Over);
		}	
		String lottable06 = "";
		String lottable06Over = "";
		if(strs.length>17){
			lottable06 = strs[17];
			lottable06=WmsCommon.ajaxParaEncoding(lottable06);
			lottable06Over = strs[18];
			lottable06Over=WmsCommon.ajaxParaEncoding(lottable06Over);
		}
		String lottable07 = "";
		String lottable07Over = "";
		if(strs.length>19){
			lottable07 = strs[19];
			lottable07=WmsCommon.ajaxParaEncoding(lottable07);
			lottable07Over = strs[20];
			lottable07Over=WmsCommon.ajaxParaEncoding(lottable07Over);
		}
		String lottable08 = "";
		String lottable08Over = "";
		if(strs.length>21){
			lottable08 = strs[21];
			lottable08=WmsCommon.ajaxParaEncoding(lottable08);
			lottable08Over = strs[22];
			lottable08Over=WmsCommon.ajaxParaEncoding(lottable08Over);
		}
		String lottable09 = "";
		String lottable09Over = "";
		if(strs.length>23){
			lottable09 = strs[23];
			lottable09=WmsCommon.ajaxParaEncoding(lottable09);
			lottable09Over = strs[24];
			lottable09Over=WmsCommon.ajaxParaEncoding(lottable09Over);
		}
		String lottable10 = "";
		String lottable10Over = "";
		if(strs.length>25){
			lottable10 = strs[25];
			lottable10=WmsCommon.ajaxParaEncoding(lottable10);
			lottable10Over = strs[26];
			lottable10Over=WmsCommon.ajaxParaEncoding(lottable10Over);
		}
		String lottable11 = "";
		String lottable11Over = "";
		if(strs.length>27){
			lottable11 = strs[27];
			lottable11Over = strs[28];
		}
		String lottable12 = "";
		String lottable12Over = "";
		if(strs.length>29){
			lottable11 = strs[29];
			lottable11Over = strs[30];
		}
		String lottable13 = "";
		String lottable13Over = "";
		if(strs.length>31){
			lottable13 = strs[31];
			lottable13=WmsCommon.ajaxParaEncoding(lottable13);
			lottable13Over = strs[32];
			lottable13Over=WmsCommon.ajaxParaEncoding(lottable13Over);
		}
		String lottable14 = "";
		String lottable14Over = "";
		if(strs.length>33){
			lottable14 = strs[33];
			lottable14=WmsCommon.ajaxParaEncoding(lottable14);
			lottable14Over = strs[34];
			lottable14Over=WmsCommon.ajaxParaEncoding(lottable14Over);
		}
		String lottable15 = "";
		String lottable15Over = "";
		if(strs.length>35){
			lottable15 = strs[35];
			lottable15=WmsCommon.ajaxParaEncoding(lottable15);
			lottable15Over = strs[36];
			lottable15Over=WmsCommon.ajaxParaEncoding(lottable15Over);
		}
		
		String lottable16 = "";
		String lottable16Over = "";
		if(strs.length>37){
			lottable16 = strs[37];
			lottable16Over = strs[38];
		}
		String lottable17 = "";
		String lottable17Over = "";
		if(strs.length>39){
			lottable17 = strs[39];
			lottable17Over = strs[40];
		}
		String lottable18 = "";
		String lottable18Over = "";
		if(strs.length>41){
			lottable18 = strs[41];
			lottable18Over = strs[42];
		}
		String lottable19 = "";
		String lottable19Over = "";
		if(strs.length>43){
			lottable19 = strs[43];
			lottable19Over = strs[44];
		}
		String lottable20 = "";
		String lottable20Over = "";
		if(strs.length>45){
			lottable20 = strs[45];
			lottable20Over = strs[46];
		}
		
		
		String loc = "";
		String locOver = "";
		if(strs.length>47){
			loc = strs[47];
			locOver = strs[48];
		}
		String model = "";
		String modelOver = "";
		if(strs.length>49){
			model = strs[49];
			modelOver = strs[50];
		}
		String specification = "";
		String specificationOver = "";
		if(strs.length>51){
			specification = strs[51];
			specificationOver = strs[52];
		}
		
		DBHelper dbHelper = DBHelper.getInstance(false);
		List<Map<String, Object>> data =new ArrayList<Map<String,Object>>();
		try
		{
       		StringBuffer sql = new StringBuffer();
       		sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY LLL.LOC ASC) AS ROWNUM, ");
    		sql.append(" LLL.STORER_KEY,LLL.SKU,LLL.NAME,LLL.MODEL,LLL.SPECIFICATION,LLL.LOT,LLL.LOC,LLL.GID,LLL.QTY,LLL.QTYALLOCATED,LLL.STATUS, ");
    		sql.append(" LLL.LOTTABLE01,LLL.LOTTABLE02,LLL.LOTTABLE03,LLL.LOTTABLE04,LLL.LOTTABLE05,LLL.LOTTABLE06,");
    		sql.append(" LLL.LOTTABLE07,LLL.LOTTABLE08,LLL.LOTTABLE09,LLL.LOTTABLE10,LLL.LOTTABLE11,LLL.LOTTABLE12,LLL.LOTTABLE13,LLL.LOTTABLE14,LLL.LOTTABLE15, ");
    		sql.append(" LLL.LOTTABLE16,LLL.LOTTABLE17,LLL.LOTTABLE18,LLL.LOTTABLE19,LLL.LOTTABLE20,rd.udf1 ");
    		sql.append(" FROM ( ");
    		sql.append(" SELECT ");
    		sql.append(" LL.STORER_KEY,LL.SKU,S.NAME,S.MODEL,S.SPECIFICATION,LL.LOT,LL.LOC,LL.GID,LL.QTY,LL.QTYALLOCATED,LL.STATUS, ");
    		sql.append(" LL.LOTTABLE01,LL.LOTTABLE02,LL.LOTTABLE03,LL.LOTTABLE04,LL.LOTTABLE05,LL.LOTTABLE06, ");
    		sql.append(" LL.LOTTABLE07,LL.LOTTABLE08,LL.LOTTABLE09,LL.LOTTABLE10,LL.LOTTABLE11,LL.LOTTABLE12,LL.LOTTABLE13,LL.LOTTABLE14,LL.LOTTABLE15,");
    		sql.append(" LL.LOTTABLE16,LL.LOTTABLE17,LL.LOTTABLE18,LL.LOTTABLE19,LL.LOTTABLE20 ");
    		sql.append(" FROM ");
    		sql.append(" (  ");
    		sql.append(" SELECT ");
    		sql.append(" LLI.ID,LLI.STORER_KEY,LLI.SKU,LLI.LOT,LLI.LOC,LLI.GID,");
    		sql.append(" coalesce (LLI.QTY,0) AS QTY, coalesce (LLI.QTYALLOCATED,0) AS QTYALLOCATED,  LLI.STATUS,");
    		sql.append(" LA.LOTTABLE01,LA.LOTTABLE02,LA.LOTTABLE03,LA.LOTTABLE04,LA.LOTTABLE05,LA.LOTTABLE06, ");
    		sql.append(" LA.LOTTABLE07,LA.LOTTABLE08,LA.LOTTABLE09,LA.LOTTABLE10,LA.LOTTABLE11,LA.LOTTABLE12,LA.LOTTABLE13,LA.LOTTABLE14,LA.LOTTABLE15,");
    		sql.append(" LA.LOTTABLE16,LA.LOTTABLE17,LA.LOTTABLE18,LA.LOTTABLE19,LA.LOTTABLE20 ");
    		sql.append(" FROM LOTTABLE LA INNER JOIN LOTXLOCXID LLI ");
    		sql.append(" ON LA.LOT=LLI.LOT  ");
    		sql.append(" ) LL ");
    		sql.append(" INNER JOIN SKU S ");
    		sql.append(" ON  LL.STORER_KEY=S.STORER_KEY AND LL.SKU =S.SKU ");
    		sql.append(" )LLL  ");
    		sql.append(" LEFT JOIN ");
    		sql.append(" ( ");
    		sql.append(" SELECT DISTINCT LOTTABLE06,RECEIPT_key,udf1 FROM  RECEIPT_DETAIL ");
    		sql.append(" ) rd ON  LLL.lottable12 = rd.receipt_key AND rd.lottable06 = lll.lottable06 ");
    		sql.append(" WHERE 1 = 1  ");
    		if(UtilValidate.isEmpty(zeroValues)){
    			sql.append(" AND LLL.QTY > 0 ");        
    		}  
    		if(UtilValidate.isNotEmpty(storerKey) && UtilValidate.isNotEmpty(storerKeyOver)){
    			sql.append(" AND LLL.STORER_KEY >= '"+storerKey+"' ");        
    			sql.append(" AND LLL.STORER_KEY <= '"+storerKeyOver+"' ");    
    		}else{
    			sql.append(" AND LLL.STORER_KEY = '' ");        
    			sql.append(" AND LLL.STORER_KEY = '' ");  
    		}
    		if(UtilValidate.isNotEmpty(sku)&& UtilValidate.isNotEmpty(skuOver)){
    			sql.append(" AND LLL.SKU >= '"+sku+"' ");        
    			sql.append(" AND LLL.SKU <= '"+skuOver+"' ");    
    		}
    		if(UtilValidate.isNotEmpty(lot) && UtilValidate.isNotEmpty(lotOver)){
    			sql.append(" AND LLL.LOT >= '"+lot+"' ");        
    			sql.append(" AND LLL.LOT <= '"+lotOver+"' ");    
    		}
    		if(UtilValidate.isNotEmpty(loc) && UtilValidate.isNotEmpty(locOver)){
    			sql.append(" AND LLL.LOC >= '"+loc+"' ");        
    			sql.append(" AND LLL.LOC <= '"+locOver+"' ");    
    		}
    		if(UtilValidate.isNotEmpty(lottable01) && UtilValidate.isNotEmpty(lottable01Over)){
    			sql.append(" AND LLL.LOTTABLE01 >= '"+lottable01+"' ");        
    			sql.append(" AND LLL.LOTTABLE01 <= '"+lottable01Over+"' ");    
    		}
    		if(UtilValidate.isNotEmpty(lottable02) && UtilValidate.isNotEmpty(lottable02Over)){
    			sql.append(" AND LLL.LOTTABLE02 >= '"+lottable02+"' ");        
    			sql.append(" AND LLL.LOTTABLE02 <= '"+lottable02Over+"' ");    
    		}
    		if(UtilValidate.isNotEmpty(lottable03) && UtilValidate.isNotEmpty(lottable03Over)){
    			sql.append(" AND LLL.LOTTABLE03 >= '"+lottable03+"' ");        
    			sql.append(" AND LLL.LOTTABLE03 <= '"+lottable03Over+"' ");    
    		}
    		if(UtilValidate.isNotEmpty(lottable04) && UtilValidate.isNotEmpty(lottable04Over)){
    			sql.append(" AND LLL.LOTTABLE04 >= '"+lottable04+"' ");        
    			sql.append(" AND LLL.LOTTABLE04 <= '"+lottable04Over+"' ");    
    		}
    		if(UtilValidate.isNotEmpty(lottable05) && UtilValidate.isNotEmpty(lottable05Over)){
    			sql.append(" AND LLL.LOTTABLE05 >= '"+lottable05+"' ");        
    			sql.append(" AND LLL.LOTTABLE05 <= '"+lottable05Over+"' ");    
    		}
    		if(UtilValidate.isNotEmpty(lottable06) && UtilValidate.isNotEmpty(lottable06Over)){
    			sql.append(" AND LLL.LOTTABLE06 >= '"+lottable06+"' ");        
    			sql.append(" AND LLL.LOTTABLE06 <= '"+lottable06Over+"' ");    
    		}
    		if(UtilValidate.isNotEmpty(lottable07) && UtilValidate.isNotEmpty(lottable07Over)){
    			sql.append(" AND LLL.LOTTABLE07 >= '"+lottable07+"' ");        
    			sql.append(" AND LLL.LOTTABLE07 <= '"+lottable07Over+"' ");    
    		}
    		if(UtilValidate.isNotEmpty(lottable08) && UtilValidate.isNotEmpty(lottable08Over)){
    			sql.append(" AND LLL.LOTTABLE08 >= '"+lottable08+"' ");        
    			sql.append(" AND LLL.LOTTABLE08 <= '"+lottable08Over+"' ");    
    		}
    		if(UtilValidate.isNotEmpty(lottable09) && UtilValidate.isNotEmpty(lottable09Over)){
    			sql.append(" AND LLL.LOTTABLE09 >= '"+lottable09+"' ");        
    			sql.append(" AND LLL.LOTTABLE09 <= '"+lottable09Over+"' ");    
    		}
    		if(UtilValidate.isNotEmpty(lottable10) && UtilValidate.isNotEmpty(lottable10Over)){
    			sql.append(" AND LLL.LOTTABLE10 >= '"+lottable10+"' ");        
    			sql.append(" AND LLL.LOTTABLE10 <= '"+lottable10Over+"' ");    
    		}
    		if(UtilValidate.isNotEmpty(lottable11) && UtilValidate.isNotEmpty(lottable11Over)){
    			sql.append(" AND LLL.LOTTABLE11 >= '"+lottable11+"' ");        
    			sql.append(" AND LLL.LOTTABLE11 <= '"+lottable11Over+"' ");    
    		}
    		if(UtilValidate.isNotEmpty(lottable12) && UtilValidate.isNotEmpty(lottable12Over)){
    			sql.append(" AND LLL.LOTTABLE12 >= '"+lottable12+"' ");        
    			sql.append(" AND LLL.LOTTABLE12 <= '"+lottable12Over+"' ");    
    		} 
    		if(UtilValidate.isNotEmpty(lottable13) && UtilValidate.isNotEmpty(lottable13Over)){
    			sql.append(" AND LLL.LOTTABLE13 >= '"+lottable13+"' ");        
    			sql.append(" AND LLL.LOTTABLE13 <= '"+lottable13Over+"' ");    
    		}
    		if(UtilValidate.isNotEmpty(lottable14) && UtilValidate.isNotEmpty(lottable14Over)){
    			sql.append(" AND LLL.LOTTABLE14 >= '"+lottable14+"' ");        
    			sql.append(" AND LLL.LOTTABLE14 <= '"+lottable14Over+"' ");    
    		}
    		if(UtilValidate.isNotEmpty(lottable15) && UtilValidate.isNotEmpty(lottable15Over)){
    			sql.append(" AND LLL.LOTTABLE15 >= '"+lottable15+"' ");        
    			sql.append(" AND LLL.LOTTABLE15 <= '"+lottable15Over+"' ");    
    		} 
    		if(UtilValidate.isNotEmpty(lottable16) && UtilValidate.isNotEmpty(lottable16Over)){
    			sql.append(" AND LLL.LOTTABLE16 >= '"+lottable16+"' ");        
    			sql.append(" AND LLL.LOTTABLE16 <= '"+lottable16Over+"' ");    
    		}
    		if(UtilValidate.isNotEmpty(lottable17) && UtilValidate.isNotEmpty(lottable17Over)){
    			sql.append(" AND LLL.LOTTABLE17 >= '"+lottable17+"' ");        
    			sql.append(" AND LLL.LOTTABLE17 <= '"+lottable17Over+"' ");    
    		} 
    		if(UtilValidate.isNotEmpty(lottable18) && UtilValidate.isNotEmpty(lottable18Over)){
    			sql.append(" AND LLL.LOTTABLE18 >= '"+lottable18+"' ");        
    			sql.append(" AND LLL.LOTTABLE18 <= '"+lottable18Over+"' ");    
    		}
    		if(UtilValidate.isNotEmpty(lottable19) && UtilValidate.isNotEmpty(lottable19Over)){
    			sql.append(" AND LLL.LOTTABLE19 >= '"+lottable19+"' ");        
    			sql.append(" AND LLL.LOTTABLE19 <= '"+lottable19Over+"' ");    
    		}
    		if(UtilValidate.isNotEmpty(lottable20) && UtilValidate.isNotEmpty(lottable20Over)){
    			sql.append(" AND LLL.LOTTABLE20 >= '"+lottable20+"' ");        
    			sql.append(" AND LLL.LOTTABLE20 <= '"+lottable20Over+"' ");    
    		}     	
    		if(UtilValidate.isNotEmpty(model) && UtilValidate.isNotEmpty(modelOver)){
				sql.append(" AND LLL.MODEL >= '"+model+"' ");        
				sql.append(" AND LLL.MODEL <= '"+modelOver+"' ");    
    		}
			data = dbHelper.select(sql.toString(), new MapListHandler());
		}catch (Exception e) {
			e.printStackTrace();
			dbHelper.close();
		}finally{
			dbHelper.freeConnection();
		}
		
		
		HttpServletResponse response = ServletActionContext.getResponse();
		// 创建一个新的Excel
		HSSFWorkbook workBook = new HSSFWorkbook();
		// 创建sheet页
		HSSFSheet sheet = workBook.createSheet();
		// sheet页名称
		workBook.setSheetName(0, "按LLI查询的库存余量报表");
		// 创建header页
		HSSFHeader header = sheet.getHeader();
		// 设置标题居中
		header.setCenter("按LLI查询的库存余量报表");
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
		HSSFCell cell22 = row.createCell(22);
		HSSFCell cell23 = row.createCell(23);
		HSSFCell cell24 = row.createCell(24);
		HSSFCell cell25 = row.createCell(25);
		HSSFCell cell26 = row.createCell(26);
		
		cell0.setCellValue("货主");
		cell1.setCellValue("SKU");
		cell2.setCellValue("型号");
		cell3.setCellValue("名称");
		cell4.setCellValue("批次");
		cell5.setCellValue("库位");
		cell6.setCellValue("ID");
		cell7.setCellValue("状态");
		cell8.setCellValue("数量");
		cell9.setCellValue("已分配数量");
		cell10.setCellValue("收货日期");
		cell11.setCellValue("生产日期");
		cell12.setCellValue("失效日期");
		cell13.setCellValue("生产批号");
		cell14.setCellValue("托盘号");
		cell15.setCellValue("成品卷号");
		cell16.setCellValue("等级");
		cell17.setCellValue("外观代码");
		cell18.setCellValue("表面处理");
		cell19.setCellValue("规格");
		cell20.setCellValue("包装形式");
		cell21.setCellValue("ASN号");
		cell22.setCellValue("反射率");
		cell23.setCellValue("极差");
		cell24.setCellValue("重量");
		cell25.setCellValue("扣帐状态");
		cell26.setCellValue("面积");
		
		if ((null != data) && (0 != data.size())) {
			for (int i = 0; i < data.size(); i++) {
				Map<String, Object> map = data.get(i);
				Float qty=WmsCommon.doubleToFloat((Double)map.get("qty"));
				Float qtyallocated=WmsCommon.doubleToFloat((Double)map.get("qtyallocated"));
			
				BigDecimal b1 = new BigDecimal(qty);  
				Float qtyValue=b1.setScale(3,BigDecimal.ROUND_HALF_UP).floatValue();  

				BigDecimal b2 = new BigDecimal(qtyallocated);  
				Float qtyallocatedValue=b2.setScale(3,BigDecimal.ROUND_HALF_UP).floatValue();
				
				int status=Integer.parseInt(map.get("status").toString());
				String statusValue="";
				if(status==0){
					statusValue="正常";
				}else{
					statusValue="冻结";
				}
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
				cell22 = row.createCell(22);
				cell23 = row.createCell(23);
				cell24 = row.createCell(24);
				cell25 = row.createCell(25);
				cell26 = row.createCell(26);
				
				cell0.setCellValue(map.get("storerKey") + "");
				cell1.setCellValue(map.get("sku") + "");
				cell2.setCellValue(map.get("model") + "");
				cell3.setCellValue(map.get("name") + "");
				cell4.setCellValue(map.get("lot") + "");
				
				cell5.setCellValue(map.get("loc") + "");
				cell6.setCellValue(map.get("gid") + "");
				cell7.setCellValue(statusValue);
				cell8.setCellValue(qtyValue + "");
				cell9.setCellValue(qtyallocatedValue+ "");
				cell10.setCellValue(map.get("lottable01") + "");
				cell11.setCellValue(map.get("lottable02") + "");
				cell12.setCellValue(map.get("lottable03") + "");
				cell13.setCellValue(map.get("lottable04") + "");
				cell14.setCellValue(map.get("lottable05") + "");
				cell15.setCellValue(map.get("lottable06") + "");
				cell16.setCellValue(map.get("lottable07") + "");
				cell17.setCellValue(map.get("lottable08") + "");
				cell18.setCellValue(map.get("lottable09") + "");
				cell19.setCellValue(map.get("lottable10") + "");
				cell20.setCellValue(map.get("lottable11") + "");
				cell21.setCellValue(map.get("lottable12") + "");
				cell22.setCellValue(map.get("lottable13") + "");
				cell23.setCellValue(map.get("lottable14") + "");
				cell24.setCellValue(map.get("lottable15") + "");
				cell25.setCellValue(map.get("lottable16") + "");
				cell26.setCellValue(map.get("udf1") + "");
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
				sheet.setColumnWidth(22, 4000);
				sheet.setColumnWidth(23, 4000);
				sheet.setColumnWidth(24, 4000);
				sheet.setColumnWidth(25, 4000);
				sheet.setColumnWidth(26, 4000);
			}
		}
		
		// 通过Response把数据以Excel格式保存
		response.reset();
		response.setContentType("application/msexcel;charset=UTF-8");
		try {
			response.addHeader(
					"Content-Disposition",
					"attachment;filename=\""
							+ new String(("按LLI查询的库存余量报表.xls")
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
		// TODO Auto-generated method stub
		return super.json;
	}

	@Override
	public boolean getSuccess() {
		// TODO Auto-generated method stub
		return super.success;
	}

}
