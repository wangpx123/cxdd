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
import com.redm.actions.utility.Constants;
import com.redm.service.support.WmsCommonService;

public class OutPickFreqReportAction extends BaseAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = 968901288401498342L;

	//使用PageHelper的分页查询方法
	//查询列表
	@Action(value = "doQueryOutPickFreqInfoPh", results = { @Result(name = Constants.SUCCESS, type = Constants.JSON_TYPE) })
	public String doQueryOutPickFreqInfoPh() {
		Map<String, Object> params = ParamsUtils.toParams(ActionContext.getContext().getParameters());
		HttpServletRequest request = ServletActionContext.getRequest();
		final String storerKey= request.getParameter("storerKey");
		final String putawayZone= request.getParameter("putawayZone");
		final String loc= request.getParameter("loc");
		final String startDate= request.getParameter("startDate");
		final String endDate= request.getParameter("endDate");
		final PageHelper pageHelper = PageHelper.getInstance();
		pageHelper.initPageInfo(params);
		
		List<String> fieldNamesList = FastList.newInstance();
		
		//fieldNameList中的字段必须与sql查询出的字段完全对上
		fieldNamesList.add("id");
		fieldNamesList.add("putawayZone");
		fieldNamesList.add("loc");
		fieldNamesList.add("qty");

		JSONArray data = pageHelper.getJSONObject(fieldNamesList, pageHelper.new CallBack() {
			@Override    
			public void onQuery(StringBuffer sql) {
				sql.append("SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY loc ASC) AS ROWNUM,"+Constants.ROWNUMBER+" OVER(ORDER BY loc ASC) AS id, a.* FROM "+
						"(SELECT count(p.LOC) AS qty,p.LOC,l.PUTAWAY_ZONE,p.STORER_KEY FROM PICK_DETAIL p JOIN LOCATION l " +
						"ON p.LOC=l.LOC WHERE 1=1 ");
				if(UtilValidate.isNotEmpty(storerKey)){
					sql.append(" AND p.STORER_KEY= '"+storerKey+"' ");
				}
				if(UtilValidate.isNotEmpty(loc)){
					sql.append(" AND p.LOC= '"+loc+"' ");
				}
				if(UtilValidate.isNotEmpty(putawayZone)){
					sql.append("  AND l.PUTAWAY_ZONE='"+putawayZone+"' ");
				}
				if(UtilValidate.isNotEmpty(startDate)){
					sql.append("  AND p.EDIT_DATE>='"+startDate+"' ");
				}
				if(UtilValidate.isNotEmpty(endDate)){
					sql.append("  AND p.EDIT_DATE<='"+endDate+"' ");
				}
				sql.append(" GROUP BY p.LOC,l.PUTAWAY_ZONE,p.STORER_KEY) AS a");
			}
		});
		
		json.put("data", data);
		json.put("totalCount", pageHelper.getTotalCount());
		return Constants.SUCCESS;
	}
	
	//不使用PageHelper的分页查询方法
	@Action(value = "doQueryOutPickFreqInfo", results = { @Result(name = Constants.SUCCESS, type = Constants.JSON_TYPE) })
	public String doQueryOutPickFreqInfo() {
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		DBHelper dbHelper = DBHelper.getInstance();
		Connection conn=dbHelper.getConnection();
		final String sort= request.getParameter("sort");//要排序的列名--无需定义，ext自动后传
	    final String dir= request.getParameter("dir");//要排序的方式--无需定义，ext自动后传
		final String storerKey= request.getParameter("storerKey");
		final String putawayZone= request.getParameter("putawayZone");
		final String loc= request.getParameter("loc");
		final String startDate= request.getParameter("startDate");
		final String endDate= request.getParameter("endDate");

		ResultSet rs = null;  
		Integer count=0;
		JSONArray data = new JSONArray();

		//sql 查询语句
		StringBuffer sql=new StringBuffer();
        if(UtilValidate.isNotEmpty(sort)){
			String columnName=WmsCommonService.entityToDbColumn(sort);
			sql.append("SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY "+columnName+" "+dir+") AS ROWNUM,");
		}else{
			sql.append("SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY loc ASC) AS ROWNUM,");
		}
		sql.append(" "+Constants.ROWNUMBER+" OVER(ORDER BY loc ASC) AS id, a.* FROM "+
				"(SELECT count(p.LOC) AS qty,p.LOC,l.PUTAWAY_ZONE,p.STORER_KEY FROM PICK_DETAIL p JOIN LOCATION l " +
				"ON p.LOC=l.LOC WHERE 1=1 ");
		if(UtilValidate.isNotEmpty(storerKey)){
			sql.append(" AND p.STORER_KEY= '"+storerKey+"' ");
		}else{
			sql.append(" AND p.STORER_KEY= '' ");
		}
		if(UtilValidate.isNotEmpty(loc)){
			sql.append(" AND p.LOC= '"+loc+"' ");
		}
		if(UtilValidate.isNotEmpty(putawayZone)){
			sql.append("  AND l.PUTAWAY_ZONE='"+putawayZone+"' ");
		}
		if(UtilValidate.isNotEmpty(startDate)){
			sql.append("  AND p.EDIT_DATE>='"+startDate+"' ");
		}
		if(UtilValidate.isNotEmpty(endDate)){
			sql.append("  AND p.EDIT_DATE<='"+endDate+"' ");
		}
		sql.append(" GROUP BY p.LOC,l.PUTAWAY_ZONE,p.STORER_KEY) AS a");

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
	@Action(value="doQueryOutPickFreqSum",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doQueryOutPickFreqSum(){
		HttpServletRequest request = ServletActionContext.getRequest();
		DBHelper dbHelper = DBHelper.getInstance();
		final String storerKey= request.getParameter("storerKey");
		final String putawayZone= request.getParameter("putawayZone");
		final String loc= request.getParameter("loc");
		final String startDate= request.getParameter("startDate");
		final String endDate= request.getParameter("endDate");


		//sql 查询语句
		StringBuffer sql=new StringBuffer();
		sql.append("SELECT coalesce(sum(coalesce(a.qty,0)),0)AS var1sum FROM "+
				"(SELECT count(p.LOC) AS qty,p.LOC,l.PUTAWAY_ZONE,p.STORER_KEY FROM PICK_DETAIL p JOIN LOCATION l " +
				"ON p.LOC=l.LOC WHERE 1=1 ");
		if(UtilValidate.isNotEmpty(storerKey)){
			sql.append(" AND p.STORER_KEY= '"+storerKey+"' ");
		}else{
			sql.append(" AND p.STORER_KEY= '' ");
		}
		if(UtilValidate.isNotEmpty(loc)){
			sql.append(" AND p.LOC= '"+loc+"' ");
		}
		if(UtilValidate.isNotEmpty(putawayZone)){
			sql.append("  AND l.PUTAWAY_ZONE='"+putawayZone+"' ");
		}
		if(UtilValidate.isNotEmpty(startDate)){
			sql.append("  AND p.EDIT_DATE>='"+startDate+"' ");
		}
		if(UtilValidate.isNotEmpty(endDate)){
			sql.append("  AND p.EDIT_DATE<='"+endDate+"' ");
		}
		sql.append(" GROUP BY p.LOC,l.PUTAWAY_ZONE,p.STORER_KEY) AS a");

		List<Map<String, Object>> data=new ArrayList<Map<String,Object>>();
		try {
			data=dbHelper.select(sql.toString(), new MapListHandler());
		} catch (SQLException e) {
			e.printStackTrace();
		}
		json.put("data", data);
		return SUCCESS;
	}
	
	
	public static List<Map<String, Object>> doQueryOutPickFreq(String storerKey,String loc,String putawayZone,String startDate,String endDate){
		DBHelper dbHelper = DBHelper.getInstance();
		List<Map<String, Object>> data = new ArrayList<Map<String,Object>>();
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY loc ASC) AS ROWNUM,"+Constants.ROWNUMBER+" OVER(ORDER BY loc ASC) AS id, a.* FROM "+
				"(SELECT count(p.LOC) AS qty,p.LOC,l.PUTAWAY_ZONE,p.STORER_KEY FROM PICK_DETAIL p JOIN LOCATION l " +
				"ON p.LOC=l.LOC WHERE 1=1 ");
			if(UtilValidate.isNotEmpty(storerKey)){
				sql.append(" AND p.STORER_KEY= '"+storerKey+"' ");
			}
			if(UtilValidate.isNotEmpty(loc)){
				sql.append(" AND p.LOC= '"+loc+"' ");
			}
			if(UtilValidate.isNotEmpty(putawayZone)){
				sql.append("  AND l.PUTAWAY_ZONE='"+putawayZone+"' ");
			}
			if(UtilValidate.isNotEmpty(startDate)){
				sql.append("  AND p.EDIT_DATE>='"+startDate+"' ");
			}
			if(UtilValidate.isNotEmpty(endDate)){
				sql.append("  AND p.EDIT_DATE<='"+endDate+"' ");
			}
			sql.append(" GROUP BY p.LOC,l.PUTAWAY_ZONE,p.STORER_KEY) AS a");
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
	 * 导出出库拣货频率报表
	 * 
	 * @return
	 * @throws IOException
	 */
	@Action(value = "outPickFreqPOIExcel", results = { @Result(name = Constants.SUCCESS, type = Constants.JSON_TYPE) })
	public String outPickFreqPOIExcel() throws IOException {
		HttpServletRequest request = ServletActionContext.getRequest();
		final String requeststr= request.getParameter("string");
		String[] strs=requeststr.split(",");
		String storerKey="";
		String putawayZone="";
		String loc="";
		String startDate="";
		String endDate="";
		
		if(strs.length>=1){
			storerKey = strs[0];
		}
		if(strs.length>=2){
			putawayZone = strs[1];
		}
		if(strs.length>=3){
			loc = strs[2];
		}
		if(strs.length>=4){
			startDate = strs[3];
		}
		if(strs.length>=5){
			endDate = strs[4];
		}
		
		List<Map<String, Object>> data=OutPickFreqReportAction.doQueryOutPickFreq(storerKey,loc,putawayZone,startDate,endDate);
		HttpServletResponse response = ServletActionContext.getResponse();
		// 创建一个新的Excel
		HSSFWorkbook workBook = new HSSFWorkbook();
		// 创建sheet页
		HSSFSheet sheet = workBook.createSheet();
		// sheet页名称
		workBook.setSheetName(0, "出库拣货频率报表");
		// 创建header页
		HSSFHeader header = sheet.getHeader();
		// 设置标题居中
		header.setCenter("出库拣货频率报表");
		// 设置第一行为Header

		HSSFRow row = sheet.createRow(0);
		HSSFCell cell0 = row.createCell(0);
		HSSFCell cell1 = row.createCell(1);
		HSSFCell cell2 = row.createCell(2);
		HSSFCell cell3 = row.createCell(3);
		HSSFCell cell4 = row.createCell(4);
		
		cell0.setCellValue("行号");
		cell1.setCellValue("库区");
		cell2.setCellValue("库位");
		cell3.setCellValue("拣货次数");
		cell4.setCellValue("备注");
		
		if ((null != data) && (0 != data.size())) {
			for (int i = 0; i < data.size(); i++) {
				Map<String, Object> map = data.get(i);
				
				row = sheet.createRow(i + 1);
				cell0 = row.createCell(0);
				cell1 = row.createCell(1);
				cell2 = row.createCell(2);
				cell3 = row.createCell(3);
				cell4 = row.createCell(4);
				
				cell0.setCellValue(map.get("rownum") + "");
				cell1.setCellValue(map.get("putawayZone") + "");
				cell2.setCellValue(map.get("loc") + "");
				cell3.setCellValue(map.get("qty") + "");
				cell4.setCellValue("");
				
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
							+ new String(("出库拣货频率报表.xls")
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
