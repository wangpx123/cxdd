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
import com.jelly.help.commons.util.ParamsUtils;
import com.jelly.help.commons.util.UtilValidate;
import com.redm.actions.support.WmsCommon;
import com.redm.actions.utility.Constants;
import com.redm.service.support.WmsCommonService;

public class AllocateReportAction extends BaseAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2169175976724584945L;

	
	//计算总重量(注意传的参数)(Lee)
	@Action(value="doQueryAllocateReportInfoSum",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doQueryAllocateReportInfoSum(){
		HttpServletRequest request = ServletActionContext.getRequest();
		DBHelper dbHelper = DBHelper.getInstance();
	    
		final String sku= request.getParameter("sku");
		final String storerKey= request.getParameter("storerKey");
		final String orderKey= request.getParameter("orderKey");
		final String status= request.getParameter("status");
		final String type= request.getParameter("type");
		final String editDataStart= request.getParameter("editDataStart");
		final String editDataEnd= request.getParameter("editDataEnd");

		final String retailReference= request.getParameter("retailReference");
		final String buyerpo= request.getParameter("buyerpo");
		final String carrierReference= request.getParameter("carrierReference");
		final String consigneeCompany= request.getParameter("consigneeCompany");
		final String carrierKey= request.getParameter("carrierKey");
		final String carrierCompany= request.getParameter("carrierCompany");
		final String model= request.getParameter("model");
		final String consigneeKey= request.getParameter("consigneeKey");
		
		final String lottable01 = request.getParameter("lottable01");
		final String lottable01Over = request.getParameter("lottable01Over");
		final String lottable02 = request.getParameter("lottable02");
		final String lottable02Over = request.getParameter("lottable02Over");
		final String lottable03 = request.getParameter("lottable03");
		final String lottable03Over = request.getParameter("lottable03Over");
		
		final String lottable04= request.getParameter("lottable04");
		final String lottable05= request.getParameter("lottable05");
		final String lottable06= request.getParameter("lottable06");
		final String lottable07= request.getParameter("lottable07");
		final String lottable08= request.getParameter("lottable08");
		final String lottable09= request.getParameter("lottable09");
		final String lottable10= request.getParameter("lottable10");
		final String lottable11= request.getParameter("lottable11");
		final String lottable12= request.getParameter("lottable12");
		final String lottable13= request.getParameter("lottable13");
		final String lottable14= request.getParameter("lottable14");
		final String lottable15= request.getParameter("lottable15");
		final String lottable16= request.getParameter("lottable16");
		final String externorderkey= request.getParameter("externorderkey");
		

		//sql 查询语句
		StringBuffer sql=new StringBuffer();
    	
		sql.append("SELECT ");
		sql.append(" coalesce(sum(coalesce(CONVERT(FLOAT , b.QTY),0 )),0)AS var1sum,coalesce(sum(coalesce(CONVERT(FLOAT , b.LOTTABLE15),0 )),0)AS var2sum,coalesce(sum(coalesce(CONVERT(FLOAT , rd.udf1),0 )),0)AS var3sum FROM ( ");
		sql.append(" SELECT  ");
		sql.append(" op.name,op.model,OP.ID,OP.EDIT_DATE,OP.ORDER_KEY,OP.LINE_NUMBER,OP.STORER_KEY,OP.SKU,OP.LOT,OP.LOC,OP.QTY,OP.STATUS,OP.TYPE,OP.EXTERNORDERKEY, ");
		sql.append(" OP.retail_Reference,OP.buyerpo,OP.carrier_Reference,OP.consignee_Company,OP.carrier_key,");
		sql.append(" OP.consignee_Key,OP.carrier_Company,");
		sql.append(" L.LOTTABLE01,L.LOTTABLE02,L.LOTTABLE03,L.LOTTABLE04,L.LOTTABLE05,L.LOTTABLE06,L.LOTTABLE07,L.LOTTABLE08, L.LOTTABLE09,L.LOTTABLE10,L.LOTTABLE11, ");
		sql.append(" L.LOTTABLE12,L.LOTTABLE13,L.LOTTABLE14,L.LOTTABLE15,L.LOTTABLE16,L.LOTTABLE17,L.LOTTABLE18,L.LOTTABLE19,L.LOTTABLE20 ");
		sql.append(" FROM  (	SELECT s.name,s.model,P.ID, P.EDIT_DATE, P.ORDER_KEY, P.LINE_NUMBER, P.STORER_KEY, P.SKU, P.LOT, P.LOC, P.QTY,O.STATUS, O.TYPE ,O.EXTERNORDERKEY, ");
		sql.append(" coalesce(o.retail_Reference,'') AS retail_Reference,coalesce(o.buyerpo,'') AS buyerpo,");
		sql.append(" coalesce(o.carrier_Reference,'') AS carrier_Reference, ");
		sql.append(" coalesce(o.consignee_Company,'') AS consignee_Company, ");
		sql.append(" coalesce(o.carrier_key,'') AS carrier_key ,coalesce(o.carrier_Company,'') AS carrier_Company,  ");
		sql.append(" coalesce(o.consignee_Key,'') AS consignee_Key");
		sql.append(" FROM PICK_DETAIL P LEFT JOIN  ORDERS O  ON P.ORDER_KEY=O.ORDER_KEY ");
		sql.append(" LEFT JOIN SKU s ON s.sku = p.sku AND s.storer_key = p.storer_key ");
		sql.append(" )OP LEFT JOIN LOTTABLE L  ON OP.LOT=L.LOT   ");
		sql.append(" )b LEFT JOIN  ");
		sql.append(" (SELECT DISTINCT LOTTABLE06,RECEIPT_key,udf1 FROM  RECEIPT_DETAIL) rd ON ");
		sql.append(" b.LOTTABLE12 = rd.receipt_key AND rd.lottable06 = b.LOTTABLE06 ");
		if(UtilValidate.isNotEmpty(storerKey)){
			sql.append(" WHERE 1=1 AND b.STORER_KEY= '"+storerKey+"' ");
		}else{
			sql.append(" AND b.STORER_KEY='' ");
		}
		if(UtilValidate.isNotEmpty(orderKey)){
			sql.append(" AND b.ORDER_KEY='"+orderKey+"' ");
		}
		if(UtilValidate.isNotEmpty(sku)){
			sql.append(" AND b.SKU= '"+sku+"' ");
		}
		if(UtilValidate.isNotEmpty(retailReference)){
 			sql.append(" AND b.retail_Reference='"+retailReference+"'");
 		}
 		if(UtilValidate.isNotEmpty(buyerpo)){
 			sql.append(" AND b.buyerpo='"+buyerpo+"'");
 		}
 		if(UtilValidate.isNotEmpty(carrierReference)){
 			sql.append(" AND b.carrier_Reference='"+carrierReference+"'");
 		}
 		if(UtilValidate.isNotEmpty(consigneeCompany)){
 			sql.append(" AND b.consignee_Company='"+consigneeCompany+"'");
 		}
 		if(UtilValidate.isNotEmpty(consigneeKey)){
 			sql.append(" AND b.consignee_key='"+consigneeKey+"'");
 		}
 		if(UtilValidate.isNotEmpty(carrierKey)){
 			sql.append(" AND b.carrier_Key='"+carrierKey+"'");
 		}
 		if(UtilValidate.isNotEmpty(carrierCompany)){
 			sql.append(" AND b.carrier_Company='"+carrierCompany+"'");
 		}
 		if(UtilValidate.isNotEmpty(model)){
 			sql.append(" AND b.model='"+model+"'");
 		}
		if(UtilValidate.isNotEmpty(status)){
			sql.append(" AND b.STATUS='"+status+"' ");
		}
		if(UtilValidate.isNotEmpty(type)){
			sql.append(" AND b.TYPE= '"+type+"' ");
		}
		if(UtilValidate.isNotEmpty(editDataStart)){
			sql.append(" AND b.EDIT_DATE>='"+editDataStart+"' ");
		}
		if(UtilValidate.isNotEmpty(editDataEnd)){
			sql.append(" AND b.EDIT_DATE<='"+editDataEnd+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable01) && UtilValidate.isNotEmpty(lottable01Over)){
			sql.append(" AND b.LOTTABLE01 >= '"+lottable01+"' ");        
			sql.append(" AND b.LOTTABLE01 <= '"+lottable01Over+"' ");    
		}
		if(UtilValidate.isNotEmpty(lottable02) && UtilValidate.isNotEmpty(lottable02Over)){
			sql.append(" AND b.LOTTABLE02 >= '"+lottable02+"' ");        
			sql.append(" AND b.LOTTABLE02 <= '"+lottable02Over+"' ");    
		}
		if(UtilValidate.isNotEmpty(lottable03) && UtilValidate.isNotEmpty(lottable03Over)){
			sql.append(" AND b.LOTTABLE03 >= '"+lottable03+"' ");        
			sql.append(" AND b.LOTTABLE03 <= '"+lottable03Over+"' ");    
		}
		if(UtilValidate.isNotEmpty(lottable04)){
			sql.append(" AND b.LOTTABLE04='"+lottable04+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable05)){
			sql.append(" AND b.LOTTABLE05='"+lottable05+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable06)){
			sql.append(" AND b.LOTTABLE06='"+lottable06+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable07)){
			sql.append(" AND b.LOTTABLE07='"+lottable07+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable08)){
			sql.append(" AND b.LOTTABLE08='"+lottable08+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable09)){
			sql.append(" AND b.LOTTABLE09='"+lottable09+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable10)){
			sql.append(" AND b.LOTTABLE10='"+lottable10+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable11)){
			sql.append(" AND b.LOTTABLE11='"+lottable11+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable12)){
			sql.append(" AND b.LOTTABLE12='"+lottable12+"' ");
		}if(UtilValidate.isNotEmpty(lottable13)){
			sql.append(" AND b.LOTTABLE13='"+lottable13+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable14)){
			sql.append(" AND b.LOTTABLE14='"+lottable14+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable15)){
			sql.append(" AND b.LOTTABLE15='"+lottable15+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable16)){
			sql.append(" AND b.LOTTABLE16='"+lottable16+"' ");
		}
		if(UtilValidate.isNotEmpty(externorderkey)){
			sql.append(" AND b.EXTERNORDERKEY='"+externorderkey+"' ");
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
	
	//查询列表	
	//不使用PageHelper的分页查询方法
	//增加面积udf1,sql语句修改(Lee)
	@Action(value = "doQueryAllocateReportInfo", results = { @Result(name = Constants.SUCCESS, type = Constants.JSON_TYPE) })
	public String doQueryAllocateReportInfo() {
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		DBHelper dbHelper = DBHelper.getInstance();
		Connection conn=dbHelper.getConnection();
		final String sort= request.getParameter("sort");//要排序的列名--无需定义，ext自动后传
	    final String dir= request.getParameter("dir");//要排序的方式--无需定义，ext自动后传
	    
		final String retailReference= request.getParameter("retailReference");
		final String buyerpo= request.getParameter("buyerpo");
		final String carrierReference= request.getParameter("carrierReference");
		final String consigneeCompany= request.getParameter("consigneeCompany");
		final String carrierKey= request.getParameter("carrierKey");
		final String carrierCompany= request.getParameter("carrierCompany");
		final String model= request.getParameter("model");
		final String consigneeKey= request.getParameter("consigneeKey");
		
	    final String sku= request.getParameter("sku");
		final String storerKey= request.getParameter("storerKey");
		final String orderKey= request.getParameter("orderKey");
		final String status= request.getParameter("status");
		final String type= request.getParameter("type");
		final String editDataStart= request.getParameter("editDataStart");
		final String editDataEnd= request.getParameter("editDataEnd");

		final String lottable01 = request.getParameter("lottable01");
		final String lottable01Over = request.getParameter("lottable01Over");
		final String lottable02 = request.getParameter("lottable02");
		final String lottable02Over = request.getParameter("lottable02Over");
		final String lottable03 = request.getParameter("lottable03");
		final String lottable03Over = request.getParameter("lottable03Over");
		
		final String lottable04= request.getParameter("lottable04");
		final String lottable05= request.getParameter("lottable05");
		final String lottable06= request.getParameter("lottable06");
		final String lottable07= request.getParameter("lottable07");
		final String lottable08= request.getParameter("lottable08");
		final String lottable09= request.getParameter("lottable09");
		final String lottable10= request.getParameter("lottable10");
		final String lottable11= request.getParameter("lottable11");
		final String lottable12= request.getParameter("lottable12");
		final String lottable13= request.getParameter("lottable13");
		final String lottable14= request.getParameter("lottable14");
		final String lottable15= request.getParameter("lottable15");
		final String lottable16= request.getParameter("lottable16");
		final String lottable17= request.getParameter("lottable17");
		final String lottable18= request.getParameter("lottable18");
		final String lottable19= request.getParameter("lottable19");
		final String lottable20= request.getParameter("lottable20");
		final String externorderkey= request.getParameter("externorderkey");
		
		ResultSet rs = null;  
		Integer count=0;
		JSONArray data = new JSONArray();

		//sql 查询语句
		StringBuffer sql=new StringBuffer();
    	
		if(UtilValidate.isNotEmpty(sort)){
			String columnName=WmsCommonService.entityToDbColumn(sort);
			if(columnName.equals("UDF1")){
				sql.append("SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY rd."+columnName+" "+dir+") AS ROWNUM,");
			}else{
				sql.append("SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY b."+columnName+" "+dir+") AS ROWNUM,");
			}
		}else{
			sql.append("SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY b.LINE_NUMBER ASC) AS ROWNUM,");
		}
		sql.append(" b.*,rd.udf1 FROM ( ");
		sql.append(" SELECT  ");
		sql.append(" op.name,op.model,OP.ID,OP.EDIT_DATE,OP.ORDER_KEY,OP.LINE_NUMBER,OP.STORER_KEY,OP.SKU,OP.LOT,OP.LOC,OP.QTY,OP.STATUS,OP.TYPE,OP.EXTERNORDERKEY, ");
		sql.append(" OP.retail_Reference,OP.buyerpo,OP.carrier_Reference,OP.consignee_Company,OP.carrier_key,");
		sql.append(" OP.consignee_Key,OP.carrier_Company,");
		sql.append(" L.LOTTABLE01,L.LOTTABLE02,L.LOTTABLE03,L.LOTTABLE04,L.LOTTABLE05,L.LOTTABLE06,L.LOTTABLE07,L.LOTTABLE08, L.LOTTABLE09,L.LOTTABLE10,L.LOTTABLE11, ");
		sql.append(" L.LOTTABLE12,coalesce(L.LOTTABLE13,'') as LOTTABLE13,L.LOTTABLE14,L.LOTTABLE15,L.LOTTABLE16,L.LOTTABLE17,L.LOTTABLE18,L.LOTTABLE19,L.LOTTABLE20 ");
		sql.append(" FROM  (	SELECT s.name,s.model,P.ID, P.EDIT_DATE, P.ORDER_KEY, P.LINE_NUMBER, P.STORER_KEY, P.SKU, P.LOT, P.LOC, P.QTY,O.STATUS, O.TYPE ,O.EXTERNORDERKEY, ");
		sql.append(" coalesce(o.retail_Reference,'') AS retail_Reference,coalesce(o.buyerpo,'') AS buyerpo,");
		sql.append(" coalesce(o.carrier_Reference,'') AS carrier_Reference, ");
		sql.append(" coalesce(o.consignee_Company,'') AS consignee_Company, ");
		sql.append(" coalesce(o.carrier_key,'') AS carrier_key ,coalesce(o.carrier_Company,'') AS carrier_Company,  ");
		sql.append(" coalesce(o.consignee_Key,'') AS consignee_Key");
		sql.append(" FROM PICK_DETAIL P LEFT JOIN  ORDERS O  ON P.ORDER_KEY=O.ORDER_KEY ");
		sql.append(" LEFT JOIN SKU s ON s.sku = p.sku AND s.storer_key = p.storer_key ");
		sql.append(" )OP LEFT JOIN LOTTABLE L  ON OP.LOT=L.LOT   ");
		sql.append(" )b LEFT JOIN  ");
		sql.append(" (SELECT DISTINCT LOTTABLE06,RECEIPT_key,udf1 FROM  RECEIPT_DETAIL) rd ON ");
		sql.append(" b.LOTTABLE12 = rd.receipt_key AND rd.lottable06 = b.LOTTABLE06 ");
		if(UtilValidate.isNotEmpty(storerKey)){
			sql.append(" WHERE 1=1 AND b.STORER_KEY= '"+storerKey+"' ");
		}else{
			sql.append(" AND b.STORER_KEY='' ");
		}
		if(UtilValidate.isNotEmpty(orderKey)){
			sql.append(" AND b.ORDER_KEY='"+orderKey+"' ");
		}
		if(UtilValidate.isNotEmpty(sku)){
			sql.append(" AND b.SKU= '"+sku+"' ");
		}
		if(UtilValidate.isNotEmpty(retailReference)){
 			sql.append(" AND b.retail_Reference='"+retailReference+"'");
 		}
 		if(UtilValidate.isNotEmpty(buyerpo)){
 			sql.append(" AND b.buyerpo='"+buyerpo+"'");
 		}
 		if(UtilValidate.isNotEmpty(carrierReference)){
 			sql.append(" AND b.carrier_Reference='"+carrierReference+"'");
 		}
 		if(UtilValidate.isNotEmpty(consigneeCompany)){
 			sql.append(" AND b.consignee_Company='"+consigneeCompany+"'");
 		}
 		if(UtilValidate.isNotEmpty(consigneeKey)){
 			sql.append(" AND b.consignee_key='"+consigneeKey+"'");
 		}
 		if(UtilValidate.isNotEmpty(carrierKey)){
 			sql.append(" AND b.carrier_Key='"+carrierKey+"'");
 		}
 		if(UtilValidate.isNotEmpty(carrierCompany)){
 			sql.append(" AND b.carrier_Company='"+carrierCompany+"'");
 		}
 		if(UtilValidate.isNotEmpty(model)){
 			sql.append(" AND b.model='"+model+"'");
 		}
		if(UtilValidate.isNotEmpty(status)){
			sql.append(" AND b.STATUS='"+status+"' ");
		}
		if(UtilValidate.isNotEmpty(type)){
			sql.append(" AND b.TYPE= '"+type+"' ");
		}
		if(UtilValidate.isNotEmpty(editDataStart)){
			sql.append(" AND b.EDIT_DATE>='"+editDataStart+"' ");
		}
		if(UtilValidate.isNotEmpty(editDataEnd)){
			sql.append(" AND b.EDIT_DATE<='"+editDataEnd+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable01) && UtilValidate.isNotEmpty(lottable01Over)){
			sql.append(" AND b.LOTTABLE01 >= '"+lottable01+"' ");        
			sql.append(" AND b.LOTTABLE01 <= '"+lottable01Over+"' ");    
		}
		if(UtilValidate.isNotEmpty(lottable02) && UtilValidate.isNotEmpty(lottable02Over)){
			sql.append(" AND b.LOTTABLE02 >= '"+lottable02+"' ");        
			sql.append(" AND b.LOTTABLE02 <= '"+lottable02Over+"' ");    
		}
		if(UtilValidate.isNotEmpty(lottable03) && UtilValidate.isNotEmpty(lottable03Over)){
			sql.append(" AND b.LOTTABLE03 >= '"+lottable03+"' ");        
			sql.append(" AND b.LOTTABLE03 <= '"+lottable03Over+"' ");    
		}
		if(UtilValidate.isNotEmpty(lottable04)){
			sql.append(" AND b.LOTTABLE04='"+lottable04+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable05)){
			sql.append(" AND b.LOTTABLE05='"+lottable05+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable06)){
			sql.append(" AND b.LOTTABLE06='"+lottable06+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable07)){
			sql.append(" AND b.LOTTABLE07='"+lottable07+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable08)){
			sql.append(" AND b.LOTTABLE08='"+lottable08+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable09)){
			sql.append(" AND b.LOTTABLE09='"+lottable09+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable10)){
			sql.append(" AND b.LOTTABLE10='"+lottable10+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable11)){
			sql.append(" AND b.LOTTABLE11='"+lottable11+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable12)){
			sql.append(" AND b.LOTTABLE12='"+lottable12+"' ");
		}if(UtilValidate.isNotEmpty(lottable13)){
			sql.append(" AND b.LOTTABLE13='"+lottable13+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable14)){
			sql.append(" AND b.LOTTABLE14='"+lottable14+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable15)){
			sql.append(" AND b.LOTTABLE15='"+lottable15+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable16)){
			sql.append(" AND b.LOTTABLE16='"+lottable16+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable17)){
			sql.append(" AND b.LOTTABLE17='"+lottable17+"' ");
		}if(UtilValidate.isNotEmpty(lottable18)){
			sql.append(" AND b.LOTTABLE18='"+lottable18+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable19)){
			sql.append(" AND b.LOTTABLE19='"+lottable19+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable20)){
			sql.append(" AND b.LOTTABLE20='"+lottable20+"' ");
		}
		if(UtilValidate.isNotEmpty(externorderkey)){
			sql.append(" AND b.EXTERNORDERKEY='"+externorderkey+"' ");
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
	
	public static List<Map<String, Object>> doQueryAllocateReport(String storerKey,String orderKey,String sku,String status,String type,String editDataStart,String editDataEnd,
			String lottable01,String lottable02,String lottable03,String lottable04,String lottable05,String lottable06,String lottable07,String lottable08,
			String lottable09,String lottable10,String lottable11,
			String lottable12,String lottable13,String lottable14,
			String lottable15,String lottable16,String externorderkey,String lottable01Over,String lottable02Over,String lottable03Over,
			String retailReference,String buyerpo,String carrierReference,String consigneeCompany,
			String carrierKey,String carrierCompany,String consigneeKey,String model){
		DBHelper dbHelper = DBHelper.getInstance();
		List<Map<String, Object>> data = new ArrayList<Map<String,Object>>();
		StringBuffer sql = new StringBuffer();
		sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY b.LINE_NUMBER ASC) AS ROWNUM,");
		sql.append(" b.*,rd.udf1 FROM ( ");
		sql.append(" SELECT  ");
		sql.append(" op.name,op.model,OP.ID,OP.EDIT_DATE,OP.ORDER_KEY,OP.LINE_NUMBER,OP.STORER_KEY,OP.SKU,OP.LOT,OP.LOC,OP.QTY,OP.STATUS,OP.TYPE,OP.EXTERNORDERKEY, ");
		sql.append(" OP.retail_Reference,OP.buyerpo,OP.carrier_Reference,OP.consignee_Company,OP.carrier_key,");
		sql.append(" OP.consignee_Key,OP.carrier_Company,");
		sql.append(" L.LOTTABLE01,L.LOTTABLE02,L.LOTTABLE03,L.LOTTABLE04,L.LOTTABLE05,L.LOTTABLE06,L.LOTTABLE07,L.LOTTABLE08, L.LOTTABLE09,L.LOTTABLE10,L.LOTTABLE11, ");
		sql.append(" L.LOTTABLE12,coalesce(L.LOTTABLE13,'') as LOTTABLE13,L.LOTTABLE14,L.LOTTABLE15,L.LOTTABLE16,L.LOTTABLE17,L.LOTTABLE18,L.LOTTABLE19,L.LOTTABLE20 ");
		sql.append(" FROM  (	SELECT s.name,s.model,P.ID, P.EDIT_DATE, P.ORDER_KEY, P.LINE_NUMBER, P.STORER_KEY, P.SKU, P.LOT, P.LOC, P.QTY,O.STATUS, O.TYPE ,O.EXTERNORDERKEY, ");
		sql.append(" coalesce(o.retail_Reference,'') AS retail_Reference,coalesce(o.buyerpo,'') AS buyerpo,");
		sql.append(" coalesce(o.carrier_Reference,'') AS carrier_Reference, ");
		sql.append(" coalesce(o.consignee_Company,'') AS consignee_Company, ");
		sql.append(" coalesce(o.carrier_key,'') AS carrier_key ,coalesce(o.carrier_Company,'') AS carrier_Company,  ");
		sql.append(" coalesce(o.consignee_Key,'') AS consignee_Key");
		sql.append(" FROM PICK_DETAIL P LEFT JOIN  ORDERS O  ON P.ORDER_KEY=O.ORDER_KEY ");
		sql.append(" LEFT JOIN SKU s ON s.sku = p.sku AND s.storer_key = p.storer_key ");
		sql.append(" )OP LEFT JOIN LOTTABLE L  ON OP.LOT=L.LOT   ");
		sql.append(" )b LEFT JOIN  ");
		sql.append(" (SELECT DISTINCT LOTTABLE06,RECEIPT_key,udf1 FROM  RECEIPT_DETAIL) rd ON ");
		sql.append(" b.LOTTABLE12 = rd.receipt_key AND rd.lottable06 = b.LOTTABLE06 ");
		if(UtilValidate.isNotEmpty(storerKey)){
			sql.append(" WHERE 1=1 AND b.STORER_KEY= '"+storerKey+"' ");
		}else{
			sql.append(" AND b.STORER_KEY='' ");
		}
		if(UtilValidate.isNotEmpty(orderKey)){
			sql.append(" AND b.ORDER_KEY='"+orderKey+"' ");
		}
		if(UtilValidate.isNotEmpty(sku)){
			sql.append(" AND b.SKU= '"+sku+"' ");
		}
		if(UtilValidate.isNotEmpty(retailReference)){
 			sql.append(" AND b.retail_Reference='"+retailReference+"'");
 		}
 		if(UtilValidate.isNotEmpty(buyerpo)){
 			sql.append(" AND b.buyerpo='"+buyerpo+"'");
 		}
 		if(UtilValidate.isNotEmpty(carrierReference)){
 			sql.append(" AND b.carrier_Reference='"+carrierReference+"'");
 		}
 		if(UtilValidate.isNotEmpty(consigneeCompany)){
 			sql.append(" AND b.consignee_Company='"+consigneeCompany+"'");
 		}
 		if(UtilValidate.isNotEmpty(consigneeKey)){
 			sql.append(" AND b.consignee_key='"+consigneeKey+"'");
 		}
 		if(UtilValidate.isNotEmpty(carrierKey)){
 			sql.append(" AND b.carrier_Key='"+carrierKey+"'");
 		}
 		if(UtilValidate.isNotEmpty(carrierCompany)){
 			sql.append(" AND b.carrier_Company='"+carrierCompany+"'");
 		}
 		if(UtilValidate.isNotEmpty(model)){
 			sql.append(" AND b.model='"+model+"'");
 		}
		if(UtilValidate.isNotEmpty(status)){
			sql.append(" AND b.STATUS='"+status+"' ");
		}
		if(UtilValidate.isNotEmpty(type)){
			sql.append(" AND b.TYPE= '"+type+"' ");
		}
		if(UtilValidate.isNotEmpty(editDataStart)){
			sql.append(" AND b.EDIT_DATE>='"+editDataStart+"' ");
		}
		if(UtilValidate.isNotEmpty(editDataEnd)){
			sql.append(" AND b.EDIT_DATE<='"+editDataEnd+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable01) && UtilValidate.isNotEmpty(lottable01Over)){
			sql.append(" AND b.LOTTABLE01 >= '"+lottable01+"' ");        
			sql.append(" AND b.LOTTABLE01 <= '"+lottable01Over+"' ");    
		}
		if(UtilValidate.isNotEmpty(lottable02) && UtilValidate.isNotEmpty(lottable02Over)){
			sql.append(" AND b.LOTTABLE02 >= '"+lottable02+"' ");        
			sql.append(" AND b.LOTTABLE02 <= '"+lottable02Over+"' ");    
		}
		if(UtilValidate.isNotEmpty(lottable03) && UtilValidate.isNotEmpty(lottable03Over)){
			sql.append(" AND b.LOTTABLE03 >= '"+lottable03+"' ");        
			sql.append(" AND b.LOTTABLE03 <= '"+lottable03Over+"' ");    
		}
		if(UtilValidate.isNotEmpty(lottable04)){
			sql.append(" AND b.LOTTABLE04='"+lottable04+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable05)){
			sql.append(" AND b.LOTTABLE05='"+lottable05+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable06)){
			sql.append(" AND b.LOTTABLE06='"+lottable06+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable07)){
			sql.append(" AND b.LOTTABLE07='"+lottable07+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable08)){
			sql.append(" AND b.LOTTABLE08='"+lottable08+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable09)){
			sql.append(" AND b.LOTTABLE09='"+lottable09+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable10)){
			sql.append(" AND b.LOTTABLE10='"+lottable10+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable11)){
			sql.append(" AND b.LOTTABLE11='"+lottable11+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable12)){
			sql.append(" AND b.LOTTABLE12='"+lottable12+"' ");
		}if(UtilValidate.isNotEmpty(lottable13)){
			sql.append(" AND b.LOTTABLE13='"+lottable13+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable14)){
			sql.append(" AND b.LOTTABLE14='"+lottable14+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable15)){
			sql.append(" AND b.LOTTABLE15='"+lottable15+"' ");
		}
		if(UtilValidate.isNotEmpty(lottable16)){
			sql.append(" AND b.LOTTABLE16='"+lottable16+"' ");
		}
		if(UtilValidate.isNotEmpty(externorderkey)){
			sql.append(" AND b.EXTERNORDERKEY='"+externorderkey+"' ");
		}		try {
			data = dbHelper.select(
					sql.toString(), new MapListHandler());
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return data;
	}
	
	
	/**
	 * 导出分配清单报表
	 * 
	 * @return
	 * @throws IOException
	 */
	@Action(value = "allocateReportPOIExcel", results = { @Result(name = Constants.SUCCESS, type = Constants.JSON_TYPE) })
	public String allocateReportPOIExcel() throws IOException {
		HttpServletRequest request = ServletActionContext.getRequest();
		final String requeststr= request.getParameter("string");
		String[] strs=requeststr.split(",");
		String storerKey="";
		String orderKey="";
		String sku="";
		String status="";
		String type="";
		String editDataStart="";
		String editDataEnd="";
		String lottable01="";
		String lottable02="";
		String lottable03="";
		String lottable04="";
		String lottable05="";
		String lottable06="";
		String lottable07="";
		String lottable08="";
		String lottable09="";
		String lottable10="";
		String lottable11="";
		String lottable12="";
		String lottable13="";
		String lottable14="";
		String lottable15="";
		String lottable16="";
		String externorderkey="";
		String lottable01Over="";
		String lottable02Over="";
		String lottable03Over="";
		
		String retailReference="";
		String buyerpo="";
		String carrierReference="";
		String consigneeCompany="";
		String carrierKey="";
		String carrierCompany="";
		String model="";
		String consigneeKey="";
		
		if(strs.length>=1){
			storerKey = strs[0];
		}
		if(strs.length>=2){
			orderKey = strs[1];
		}
		if(strs.length>=3){
			type = strs[2];
			if(type.equals("null")){
				type="";
			}
		}
		if(strs.length>=4){
			status = strs[3];
			if(status.equals("null")){
				status="";
			}
		}
		if(strs.length>=5){
			sku = strs[4];
		}
		if(strs.length>=6){
			editDataStart = strs[5];
			if(editDataStart.equals("undefined")){
				editDataStart="";
			}
		}
		if(strs.length>=7){
			editDataEnd = strs[6];
			if(editDataEnd.equals("undefined")){
				editDataEnd="";
			}
		}
		if(strs.length>=8){
			lottable01 = strs[7];
		}
		if(strs.length>=9){
			lottable02 = strs[8];
		}
		if(strs.length>=10){
			lottable03 = strs[9];
		}
		if(strs.length>=11){
			lottable04 = strs[10];
		}
		if(strs.length>=12){
			lottable05 = strs[11];
		}
		if(strs.length>=13){
			lottable06 = strs[12];
		}
		if(strs.length>=14){
			lottable07 = strs[13];
		}
		if(strs.length>=15){
			lottable08 = strs[14];
		}
		if(strs.length>=16){
			lottable09 = strs[15];
		}
		if(strs.length>=17){
			lottable10 = strs[16];
		}
		if(strs.length>=18){
			lottable11 = strs[17];
		}
		if(strs.length>=19){
			lottable12 = strs[18];
		}
		if(strs.length>=20){
			lottable13 = strs[19];
		}
		if(strs.length>=21){
			lottable14 = strs[20];
		}
		if(strs.length>=22){
			lottable15 = strs[21];
		}
		if(strs.length>=23){
			lottable16 = strs[22];
			if(lottable16.equals("undefined")){
				lottable16="";
			}
		}
		if(strs.length>=24){
			externorderkey = strs[23];
		}
		
		if(strs.length>=25){
			if(strs[24].equals("null")){
				lottable01Over = "";
			}else{
				lottable01Over = strs[24];
			}
		}
		if(strs.length>=26){
			if(strs[25].equals("null")){
				 lottable02Over = "";
			}else{
				 lottable02Over = strs[25];
			}
		}
		if(strs.length>=27){
			if(strs[26].equals("null")){
				 lottable03Over = "";
			}else{
				 lottable03Over = strs[26];
			}
		}
		if(strs.length>=28){
			if(strs[27].equals("null")){
				retailReference = "";
			}else{
				retailReference=strs[27];
			}
		}
		if(strs.length>=29){
			if(strs[28].equals("null")){
				buyerpo = "";
			}else{
				buyerpo=strs[28];
			}
		}
		if(strs.length>=30){
			if(strs[29].equals("null")){
				carrierReference = "";
			}else{
				carrierReference = strs[29];
			}
		}
		if(strs.length>=31){
			if(strs[30].equals("null")){
				consigneeCompany = "";
			}else{
				consigneeCompany = strs[30];
			}
		}
		if(strs.length>=32){
			if(strs[31].equals("null")){
				carrierKey = "";
			}else{
				carrierKey = strs[31];
			}
		}
		if(strs.length>=33){
			if(strs[32].equals("null")){
				carrierCompany = "";
			}else{
				carrierCompany=strs[32];
			}
		}
		if(strs.length>=34){
			if(strs[33].equals("null")){
				consigneeKey = "";
			}else{
				consigneeKey=strs[33];
			}
		}
		if(strs.length>=35){
			if(strs[34].equals("null")){
				model = "";
			}else{
				model=strs[34];
			}
		}
		List<Map<String, Object>> data=AllocateReportAction.doQueryAllocateReport(storerKey,orderKey,sku,status,type,editDataStart,editDataEnd,lottable01,lottable02,lottable03,lottable04,lottable05,lottable06,lottable07,lottable08,lottable09,lottable10,lottable11,lottable12,lottable13,lottable14,lottable15,lottable16,externorderkey,
				lottable01Over,lottable02Over,lottable03Over,
				 retailReference,buyerpo,carrierReference,consigneeCompany,
                 carrierKey,carrierCompany,consigneeKey,model);
		HttpServletResponse response = ServletActionContext.getResponse();
		// 创建一个新的Excel
		HSSFWorkbook workBook = new HSSFWorkbook();
		// 创建sheet页
		HSSFSheet sheet = workBook.createSheet();
		// sheet页名称
		workBook.setSheetName(0, "分配清单");
		// 创建header页
		HSSFHeader header = sheet.getHeader();
		// 设置标题居中
		header.setCenter("分配清单");
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
		HSSFCell cell27 = row.createCell(27);
		HSSFCell cell28 = row.createCell(28);
		HSSFCell cell29 = row.createCell(29);
		HSSFCell cell30 = row.createCell(30);
		HSSFCell cell31 = row.createCell(31);
		
		cell0.setCellValue("行号");
		cell1.setCellValue("客户订单号");
		cell2.setCellValue("SO单号");
		cell3.setCellValue("分销商参考号");
		cell4.setCellValue("采购商PO号");
		cell5.setCellValue("承运商参考号");
		cell6.setCellValue("收货方");
		cell7.setCellValue("收货方名称");
		cell8.setCellValue("承运商");
		cell9.setCellValue("承运商名称");
		cell10.setCellValue("商品");
		cell11.setCellValue("中文名称");
		cell12.setCellValue("型号");
		cell13.setCellValue("批次");
		cell14.setCellValue("库位");
		cell15.setCellValue("已分配数量");
		cell16.setCellValue("收货日期");
		cell17.setCellValue("生产日期");
		cell18.setCellValue("失效日期");
		cell19.setCellValue("生产批号");
		cell20.setCellValue("托盘号");
		cell21.setCellValue("成品卷号");
		cell22.setCellValue("等级");
		cell23.setCellValue("外观代码");
		cell24.setCellValue("表面处理");
		cell25.setCellValue("规格");
		cell26.setCellValue("包装形式");
		cell27.setCellValue("ASN号");
		cell28.setCellValue("反射率");
		cell29.setCellValue("极差");
		cell30.setCellValue("重量");
		cell31.setCellValue("面积");
		
		Float udf1sum=0F;
		Float lottable15sum=0F;
		Float allocatedsum=0F;
		if ((null != data) && (0 != data.size())) {
			for (int i = 0; i < data.size(); i++) {
				Map<String, Object> map = data.get(i);
				
				Float qty=WmsCommon.acruateFloat(WmsCommon.doubleToFloat((Double)map.get("qty")));
				Float udf1=WmsCommon.acruateFloat(Float.parseFloat(UtilValidate.isEmpty((String)map.get("udf1"))?"0":(String)map.get("udf1")));
				Float lot15=WmsCommon.acruateFloat(Float.parseFloat(UtilValidate.isEmpty((String)map.get("lottable15"))?"0":(String)map.get("lottable15")));
				udf1sum +=udf1;
				lottable15sum+=lot15;
				allocatedsum+=qty;
				
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
				cell27 = row.createCell(27);
				cell28 = row.createCell(28);
				cell29 = row.createCell(29);
				cell30 = row.createCell(30);
				cell31 = row.createCell(31);
			
				cell0.setCellValue(map.get("lineNumber") + "");
				cell1.setCellValue(map.get("externorderkey") + "");
				cell2.setCellValue(map.get("orderKey") + "");
				
				cell3.setCellValue(map.get("retailReference") + "");
				cell4.setCellValue(map.get("buyerpo") + "");
				cell5.setCellValue(map.get("carrierReference") + "");
				cell6.setCellValue(map.get("consigneeKey") + "");
				cell7.setCellValue(map.get("consigneeCompany") + "");
				cell8.setCellValue(map.get("carrierKey") + "");
				cell9.setCellValue(map.get("carrierCompany") + "");
		
				cell10.setCellValue(map.get("sku") + "");
				cell11.setCellValue(map.get("name") + "");
				cell12.setCellValue(map.get("model") + "");
				cell13.setCellValue(map.get("lot") + "");
				cell14.setCellValue(map.get("loc") + "");
				cell15.setCellValue(qty+ "");
				cell16.setCellValue(map.get("lottable01") + "");
				cell17.setCellValue(map.get("lottable02") + "");
				cell18.setCellValue(map.get("lottable03") + "");
				cell19.setCellValue(map.get("lottable04") + "");
				cell20.setCellValue(map.get("lottable05") + "");
				cell21.setCellValue(map.get("lottable06") + "");
				cell22.setCellValue(map.get("lottable07") + "");
				cell23.setCellValue(map.get("lottable08") + "");
				cell24.setCellValue(map.get("lottable09") + "");
				cell25.setCellValue(map.get("lottable10") + "");
				cell26.setCellValue(map.get("lottable11") + "");
				cell27.setCellValue(map.get("lottable12") + "");
				cell28.setCellValue(map.get("lottable13") + "");
				cell29.setCellValue(map.get("lottable14") + "");
				cell30.setCellValue(map.get("lottable15") + "");
				cell31.setCellValue(udf1 + "");
				
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
				sheet.setColumnWidth(27, 4000);
				sheet.setColumnWidth(28, 4000);
				sheet.setColumnWidth(29, 4000);
				sheet.setColumnWidth(30, 4000);
				sheet.setColumnWidth(31, 4000);
			}
		}
		
		// 汇总部分
		allocatedsum=WmsCommon.acruateFloat(allocatedsum);
		udf1sum=WmsCommon.acruateFloat(udf1sum);
		lottable15sum=WmsCommon.acruateFloat(lottable15sum);
		
		// 最后打印合计
		row = sheet.createRow(data.size() + 1);
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
		cell27 = row.createCell(27);
		cell28 = row.createCell(28);
		cell29 = row.createCell(29);
		cell30 = row.createCell(30);
		cell31 = row.createCell(31);
		
		cell0.setCellValue("");
		cell1.setCellValue("");
		cell2.setCellValue("总计：");
		cell3.setCellValue("");
		cell4.setCellValue("");
		cell5.setCellValue("");
		cell6.setCellValue("");
		cell7.setCellValue("");
		cell8.setCellValue("");
		cell9.setCellValue("");
		cell10.setCellValue("");
		cell11.setCellValue("");
		cell12.setCellValue("");
		cell13.setCellValue("");
		cell14.setCellValue("");
		cell15.setCellValue(allocatedsum+"");
		cell16.setCellValue("");
		cell17.setCellValue("");
		cell18.setCellValue("");
		cell19.setCellValue("");
		cell20.setCellValue("");
		cell21.setCellValue("");
		cell22.setCellValue("");
		cell23.setCellValue("");
		cell24.setCellValue("");
		cell25.setCellValue("");
		cell26.setCellValue("");
		cell27.setCellValue("");
		cell28.setCellValue("");
		cell29.setCellValue("");
		cell30.setCellValue(lottable15sum+"");
		cell31.setCellValue(udf1sum+"");

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
		sheet.setColumnWidth(27, 4000);
		sheet.setColumnWidth(28, 4000);
		sheet.setColumnWidth(29, 4000);
		sheet.setColumnWidth(30, 4000);
		sheet.setColumnWidth(31, 4000);
		
		// 通过Response把数据以Excel格式保存
		response.reset();
		response.setContentType("application/msexcel;charset=UTF-8");
		try {
			response.addHeader(
					"Content-Disposition",
					"attachment;filename=\""
							+ new String(("分配清单.xls")
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
