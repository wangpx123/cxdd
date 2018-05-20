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

public class OutboundCountReportAction extends BaseAction {

	private static final long serialVersionUID = 5396671451944222567L;

	//计算总重量;
	//计算每条receiptKey的预期数量和实收数量的总和
	@Action(value="doQueryOutboundCountReportInfoSum",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doQueryOutboundCountReportInfoSum(){
		HttpServletRequest request = ServletActionContext.getRequest();
		DBHelper dbHelper = DBHelper.getInstance();
		
		final String orderKey= request.getParameter("orderKey");
		final String storerKey= request.getParameter("storerKey");
		final String type= request.getParameter("type");
		final String status= request.getParameter("status");
		final String orderNumber= request.getParameter("orderNumber");
		final String sku= request.getParameter("sku");
	
		final String retailReference= request.getParameter("retailReference");
		final String buyerpo= request.getParameter("buyerpo");
		final String carrierReference= request.getParameter("carrierReference");
		final String consigneeCompany= request.getParameter("consigneeCompany");
		final String carrierKey= request.getParameter("carrierKey");
		final String carrierCompany= request.getParameter("carrierCompany");
		final String model= request.getParameter("model");
		
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
		final String dStart= request.getParameter("dStart");
		final String dEnd= request.getParameter("dEnd");
		final String consigneeKey= request.getParameter("consigneeKey");
		

		//sql 查询语句
		StringBuffer sql=new StringBuffer();
		sql.append(" SELECT sum(qty) AS var1sum,sum(udf1) AS var2sum,sum(lottable15) AS var3sum "); 
		sql.append(" FROM ");
		sql.append("(");
		sql.append("	SELECT pd.order_key,pd.storer_key,od.sku,od.line_number,s.name,s.specification,s.model,sum(coalesce(pd.qty,0)) AS qty,");
		sql.append("		sum(convert(FLOAT,coalesce (rd.udf1,''))) AS udf1,convert(FLOAT,coalesce (od.udf2,'')) AS udf2,");
		sql.append("		sum(convert(FLOAT,coalesce (od.udf3,''))) AS udf3,");
		sql.append("		l.lottable01,l.lottable02,l.lottable03,l.lottable04,l.lottable07,l.lottable08,l.lottable09,l.lottable10,");
		sql.append("		l.lottable11,l.lottable12,l.lottable13,l.lottable14,");
		sql.append("		l.lottable06,l.lottable05,sum(convert(FLOAT,coalesce (l.lottable15,''))) AS lottable15");
		sql.append("		FROM PICK_DETAIL pd   ");
		sql.append("		LEFT JOIN ORDER_DETAIL od ON od.order_key = pd.order_key AND od.line_number = pd.line_number ");
		sql.append("		LEFT JOIN SKU s ON od.storer_key=s.storer_key AND pd.sku=s.sku");
		sql.append("		LEFT JOIN LOTTABLE l ON pd.lot=l.lot");
		sql.append("		LEFT JOIN RECEIPT_DETAIL rd ON l.lottable12=rd.lottable12 AND l.lottable06=rd.lottable06");
		sql.append("		GROUP BY pd.storer_key,pd.ORDER_KEY,od.sku,od.udf2,s.name,s.specification,s.model,l.lottable06,l.lottable05,od.line_number,");
		sql.append("		l.lottable01,l.lottable02,l.lottable03,l.lottable04,l.lottable07,l.lottable08,l.lottable09,l.lottable10,");
		sql.append("		l.lottable11,l.lottable12,l.lottable13,l.lottable14");
		sql.append(") a LEFT JOIN ");
		sql.append("(");
		sql.append("	SELECT  ");
		sql.append("	order_key,ORDER_NUMBER,type,status,actualshipdate,	coalesce(other_reference4,'') AS other_reference4 ,");
		sql.append("	coalesce(retail_Reference,'') AS retail_Reference,coalesce(buyerpo,'') AS buyerpo,");
		sql.append("	 coalesce(carrier_Reference,'') AS carrier_Reference,");
		sql.append("	  coalesce(consignee_Company,'') AS consignee_Company,coalesce(consignee_Key,'') AS consignee_Key, ");
		sql.append("	   coalesce(carrier_key,'') AS carrier_key ,coalesce(carrier_Company,'') AS carrier_Company ");
		sql.append("	 FROM ORDERS ");
		sql.append(" )b ON a.order_key = b.order_key ");
		sql.append(" WHERE 1=1 ");
		if(UtilValidate.isNotEmpty(orderKey)){
 			sql.append(" AND a.order_key='"+orderKey+"'");
 		}
 		if(UtilValidate.isNotEmpty(storerKey)){
 			sql.append(" AND a.STORER_KEY='"+storerKey+"'");
 		}else{
 			sql.append(" AND a.STORER_KEY=''");
 		}
 		if(UtilValidate.isNotEmpty(type)){
 			sql.append(" AND b.TYPE='"+type+"'");
 		}
 		if(UtilValidate.isNotEmpty(status)){
 			sql.append(" AND b.STATUS='"+status+"'");
 		}
 		if(UtilValidate.isNotEmpty(orderNumber)){
 			sql.append(" AND b.ORDER_NUMBER='"+orderNumber+"'");
 		}
 		if(UtilValidate.isNotEmpty(sku)){
 			sql.append(" AND a.SKU='"+sku+"'");
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
 		if(UtilValidate.isNotEmpty(carrierKey)){
 			sql.append(" AND b.carrier_Key='"+carrierKey+"'");
 		}
 		if(UtilValidate.isNotEmpty(carrierCompany)){
 			sql.append(" AND b.carrier_Company='"+carrierCompany+"'");
 		}
 		if(UtilValidate.isNotEmpty(model)){
 			sql.append(" AND a.model='"+model+"'");
 		}
 		if(UtilValidate.isNotEmpty(lottable01) && UtilValidate.isNotEmpty(lottable01Over)){
 			sql.append(" AND LOTTABLE01 >= '"+lottable01+"' ");        
 			sql.append(" AND LOTTABLE01 <= '"+lottable01Over+"' ");    
 		}
 		if(UtilValidate.isNotEmpty(lottable02) && UtilValidate.isNotEmpty(lottable02Over)){
 			sql.append(" AND LOTTABLE02 >= '"+lottable02+"' ");        
 			sql.append(" AND LOTTABLE02 <= '"+lottable02Over+"' ");    
 		}
 		if(UtilValidate.isNotEmpty(lottable03) && UtilValidate.isNotEmpty(lottable03Over)){
 			sql.append(" AND LOTTABLE03 >= '"+lottable03+"' ");        
 			sql.append(" AND LOTTABLE03 <= '"+lottable03Over+"' ");    
 		}
 		if(UtilValidate.isNotEmpty(lottable04)){
 			sql.append(" AND a.lottable04='"+lottable04+"'");
 		}
 		if(UtilValidate.isNotEmpty(lottable05)){
 			sql.append(" AND a.lottable05='"+lottable05+"'");
 		}
 		if(UtilValidate.isNotEmpty(lottable06)){
 			sql.append(" AND a.lottable06='"+lottable06+"'");
 		}
 		if(UtilValidate.isNotEmpty(lottable07)){
 			sql.append(" AND a.lottable07='"+lottable07+"'");
 		}
 		if(UtilValidate.isNotEmpty(lottable08)){
 			sql.append(" AND a.lottable08='"+lottable08+"'");
 		}
 		if(UtilValidate.isNotEmpty(lottable09)){
 			sql.append(" AND a.lottable09='"+lottable09+"'");
 		}
 		if(UtilValidate.isNotEmpty(lottable10)){
 			sql.append(" AND a.lottable10='"+lottable10+"'");
 		}
 		if(UtilValidate.isNotEmpty(lottable11)){
 			sql.append(" AND a.lottable11='"+lottable11+"'");
 		}
 		if(UtilValidate.isNotEmpty(lottable12)){
 			sql.append(" AND a.lottable12='"+lottable12+"'");
 		}
 		if(UtilValidate.isNotEmpty(lottable13)){
 			sql.append(" AND a.lottable13='"+lottable13+"'");
 		}
 		if(UtilValidate.isNotEmpty(lottable14)){
 			sql.append(" AND a.lottable14='"+lottable14+"'");
 		}
 		if(UtilValidate.isNotEmpty(lottable15)){
 			sql.append(" AND a.lottable15='"+lottable15+"'");
 		}
 		if(UtilValidate.isNotEmpty(consigneeKey)){
 			sql.append(" AND b.consignee_Key='"+consigneeKey+"'");
 		}
		//使用发货日期
		if(UtilValidate.isNotEmpty(dStart) && UtilValidate.isNotEmpty(dEnd)){
			sql.append(" AND b.ACTUALSHIPDATE >= '"+dStart+"' ");        
			sql.append(" AND b.ACTUALSHIPDATE <= '"+dEnd+"' ");    
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
	@Action(value = "doQueryOutboundCount",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doQueryOutboundCount() {
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		DBHelper dbHelper = DBHelper.getInstance();
		Connection conn=dbHelper.getConnection();
		final String sort= request.getParameter("sort");//要排序的列名--无需定义，ext自动后传
	    final String dir= request.getParameter("dir");//要排序的方式--无需定义，ext自动后传
		final String orderKey= request.getParameter("orderKey");
		final String storerKey= request.getParameter("storerKey");
		final String type= request.getParameter("type");
		final String status= request.getParameter("status");
		final String orderNumber= request.getParameter("orderNumber");
		final String sku= request.getParameter("sku");
		
		final String retailReference= request.getParameter("retailReference");
		final String buyerpo= request.getParameter("buyerpo");
		final String carrierReference= request.getParameter("carrierReference");
		final String consigneeCompany= request.getParameter("consigneeCompany");
		final String carrierKey= request.getParameter("carrierKey");
		final String carrierCompany= request.getParameter("carrierCompany");
		final String model= request.getParameter("model");
		
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
		final String dStart= request.getParameter("dStart");
		final String dEnd= request.getParameter("dEnd");
		final String consigneeKey= request.getParameter("consigneeKey");
		
		ResultSet rs = null;  
		Integer count=0;
		JSONArray data = new JSONArray();

		//sql 查询语句
		StringBuffer sql=new StringBuffer();

		sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY a.line_number ASC) AS ROWNUM,"); 
		sql.append("  a.name,a.sku,b.type,a.line_number,b.consignee_Key,");
		sql.append("     b.ORDER_NUMBER,b.status,b.buyerpo,b.consignee_Company,b.actualshipdate ,a.order_key,a.model,a.specification,qty,udf1,udf2,udf3, lottable15,");
		sql.append("	lottable01,lottable02,lottable03,lottable04,lottable05,lottable06,lottable07,lottable08,");
		sql.append("	a.lottable09,a.lottable10,lottable11,lottable12,lottable13,lottable14,");
		sql.append("   b.carrier_Company,b.carrier_Reference,other_reference4");
		sql.append(" FROM ");
		sql.append("(");
		sql.append("	SELECT pd.order_key,pd.storer_key,od.sku,od.line_number,s.name,s.specification,s.model,sum(coalesce(pd.qty,0)) AS qty,");
		sql.append("		sum(convert(FLOAT,coalesce (rd.udf1,''))) AS udf1,convert(FLOAT,coalesce (od.udf2,'')) AS udf2,");
		sql.append("		sum(convert(FLOAT,coalesce (od.udf3,''))) AS udf3,");
		sql.append("		l.lottable01,l.lottable02,l.lottable03,l.lottable04,l.lottable07,l.lottable08,l.lottable09,l.lottable10,");
		sql.append("		l.lottable11,l.lottable12,l.lottable13,l.lottable14,");
		sql.append("		l.lottable06,l.lottable05,sum(convert(FLOAT,coalesce (l.lottable15,''))) AS lottable15");
		sql.append("		FROM PICK_DETAIL pd   ");
		sql.append("		LEFT JOIN ORDER_DETAIL od ON od.order_key = pd.order_key AND od.line_number = pd.line_number ");
		sql.append("		LEFT JOIN SKU s ON od.storer_key=s.storer_key AND pd.sku=s.sku");
		sql.append("		LEFT JOIN LOTTABLE l ON pd.lot=l.lot");
		sql.append("		LEFT JOIN RECEIPT_DETAIL rd ON l.lottable12=rd.lottable12 AND l.lottable06=rd.lottable06");
		sql.append("		GROUP BY pd.storer_key,pd.ORDER_KEY,od.sku,od.udf2,s.name,s.specification,s.model,l.lottable06,l.lottable05,od.line_number,");
		sql.append("		l.lottable01,l.lottable02,l.lottable03,l.lottable04,l.lottable07,l.lottable08,l.lottable09,l.lottable10,");
		sql.append("		l.lottable11,l.lottable12,l.lottable13,l.lottable14");
		sql.append(") a LEFT JOIN ");
		sql.append("(");
		sql.append("	SELECT  ");
		sql.append("	order_key,ORDER_NUMBER,type,status,actualshipdate,	coalesce(other_reference4,'') AS other_reference4 ,");
		sql.append("	coalesce(retail_Reference,'') AS retail_Reference,coalesce(buyerpo,'') AS buyerpo,");
		sql.append("	 coalesce(carrier_Reference,'') AS carrier_Reference,");
		sql.append("	  coalesce(consignee_Company,'') AS consignee_Company,coalesce(consignee_Key,'') AS consignee_Key, ");
		sql.append("	   coalesce(carrier_key,'') AS carrier_key ,coalesce(carrier_Company,'') AS carrier_Company ");
		sql.append("	 FROM ORDERS ");
		sql.append(" )b ON a.order_key = b.order_key ");
		sql.append(" WHERE 1=1 ");
 		if(UtilValidate.isNotEmpty(orderKey)){
 			sql.append(" AND a.order_key='"+orderKey+"'");
 		}
 		if(UtilValidate.isNotEmpty(storerKey)){
 			sql.append(" AND a.STORER_KEY='"+storerKey+"'");
 		}else{
 			sql.append(" AND a.STORER_KEY=''");
 		}
 		if(UtilValidate.isNotEmpty(type)){
 			sql.append(" AND b.TYPE='"+type+"'");
 		}
 		if(UtilValidate.isNotEmpty(status)){
 			sql.append(" AND b.STATUS='"+status+"'");
 		}
 		if(UtilValidate.isNotEmpty(orderNumber)){
 			sql.append(" AND b.ORDER_NUMBER='"+orderNumber+"'");
 		}
 		if(UtilValidate.isNotEmpty(sku)){
 			sql.append(" AND a.SKU='"+sku+"'");
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
 		if(UtilValidate.isNotEmpty(carrierKey)){
 			sql.append(" AND b.carrier_Key='"+carrierKey+"'");
 		}
 		if(UtilValidate.isNotEmpty(carrierCompany)){
 			sql.append(" AND b.carrier_Company='"+carrierCompany+"'");
 		}
 		if(UtilValidate.isNotEmpty(model)){
 			sql.append(" AND a.model='"+model+"'");
 		}
 		if(UtilValidate.isNotEmpty(lottable01) && UtilValidate.isNotEmpty(lottable01Over)){
 			sql.append(" AND LOTTABLE01 >= '"+lottable01+"' ");        
 			sql.append(" AND LOTTABLE01 <= '"+lottable01Over+"' ");    
 		}
 		if(UtilValidate.isNotEmpty(lottable02) && UtilValidate.isNotEmpty(lottable02Over)){
 			sql.append(" AND LOTTABLE02 >= '"+lottable02+"' ");        
 			sql.append(" AND LOTTABLE02 <= '"+lottable02Over+"' ");    
 		}
 		if(UtilValidate.isNotEmpty(lottable03) && UtilValidate.isNotEmpty(lottable03Over)){
 			sql.append(" AND LOTTABLE03 >= '"+lottable03+"' ");        
 			sql.append(" AND LOTTABLE03 <= '"+lottable03Over+"' ");    
 		}
 		if(UtilValidate.isNotEmpty(lottable04)){
 			sql.append(" AND a.lottable04='"+lottable04+"'");
 		}
 		if(UtilValidate.isNotEmpty(lottable05)){
 			sql.append(" AND a.lottable05='"+lottable05+"'");
 		}
 		if(UtilValidate.isNotEmpty(lottable06)){
 			sql.append(" AND a.lottable06='"+lottable06+"'");
 		}
 		if(UtilValidate.isNotEmpty(lottable07)){
 			sql.append(" AND a.lottable07='"+lottable07+"'");
 		}
 		if(UtilValidate.isNotEmpty(lottable08)){
 			sql.append(" AND a.lottable08='"+lottable08+"'");
 		}
 		if(UtilValidate.isNotEmpty(lottable09)){
 			sql.append(" AND a.lottable09='"+lottable09+"'");
 		}
 		if(UtilValidate.isNotEmpty(lottable10)){
 			sql.append(" AND a.lottable10='"+lottable10+"'");
 		}
 		if(UtilValidate.isNotEmpty(lottable11)){
 			sql.append(" AND a.lottable11='"+lottable11+"'");
 		}
 		if(UtilValidate.isNotEmpty(lottable12)){
 			sql.append(" AND a.lottable12='"+lottable12+"'");
 		}if(UtilValidate.isNotEmpty(lottable13)){
 			sql.append(" AND a.lottable13='"+lottable13+"'");
 		}
 		if(UtilValidate.isNotEmpty(lottable14)){
 			sql.append(" AND a.lottable14='"+lottable14+"'");
 		}
 		if(UtilValidate.isNotEmpty(lottable15)){
 			sql.append(" AND a.lottable15='"+lottable15+"'");
 		}
 		if(UtilValidate.isNotEmpty(consigneeKey)){
 			sql.append(" AND b.consignee_Key='"+consigneeKey+"'");
 		}
 		//使用发货日期
		if(UtilValidate.isNotEmpty(dStart) && UtilValidate.isNotEmpty(dEnd)){
			sql.append(" AND b.ACTUALSHIPDATE >= '"+dStart+"' ");        
			sql.append(" AND b.ACTUALSHIPDATE <= '"+dEnd+"' ");    
		}  
// 		sql.append(" order by v.ORDER_KEY desc,v.LINE_NUMBER");
 		
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
	//报表用到的查询
	public List<Map<String, Object>> doQueryOrderDetail(String storerKey,String orderKey,String type,String status,String orderNumber,String lottable01,
																String lottable02,String lottable03,String lottable04,String lottable05,String lottable06,
				String lottable07,String lottable08,String lottable09,String lottable10,String lottable11,String lottable12,String lottable13,String lottable14,
				String lottable15,String dStart,String dEnd,String sku,String consigneeKey,String lottable01Over,String lottable02Over,String lottable03Over,
				String retailReference,String buyerpo,String carrierReference,String consigneeCompany,
				String carrierKey,String carrierCompany,String model){
    	DBHelper dbHelper = DBHelper.getInstance(false);
    	List<Map<String, Object>> data=new ArrayList<Map<String,Object>>();
        try{
        	StringBuffer sql = new StringBuffer();
        	sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY a.line_number ASC) AS ROWNUM,"); 
    		sql.append("  a.name,a.sku,b.type,a.line_number,b.consignee_Key,");
    		sql.append("     b.ORDER_NUMBER,b.status,b.buyerpo,b.consignee_Company,b.actualshipdate ,a.order_key,a.model,a.specification,qty,udf1,udf2,udf3,udf4, lottable15,");
    		sql.append("	lottable01,lottable02,lottable03,lottable04,lottable05,lottable06,lottable07,lottable08,");
    		sql.append("	a.lottable09,a.lottable10,lottable11,lottable12,lottable13,lottable14,");
    		sql.append("   b.carrier_Company,b.carrier_Reference,other_reference4");
    		sql.append(" FROM ");
    		sql.append("(");
    		sql.append("	SELECT pd.order_key,pd.storer_key,od.sku,od.line_number,s.name,s.specification,s.model,sum(coalesce(pd.qty,0)) AS qty,");
    		sql.append("		sum(convert(FLOAT,coalesce (rd.udf1,''))) AS udf1,convert(FLOAT,coalesce (od.udf2,'')) AS udf2,");
    		sql.append("		sum(convert(FLOAT,coalesce (od.udf3,''))) AS udf3,coalesce (od.udf4,'') AS udf4,");
    		sql.append("		l.lottable01,l.lottable02,l.lottable03,l.lottable04,l.lottable07,l.lottable08,l.lottable09,l.lottable10,");
    		sql.append("		l.lottable11,l.lottable12,l.lottable13,l.lottable14,");
    		sql.append("		l.lottable06,l.lottable05,sum(convert(FLOAT,coalesce (l.lottable15,''))) AS lottable15");
    		sql.append("		FROM PICK_DETAIL pd   ");
    		sql.append("		LEFT JOIN ORDER_DETAIL od ON od.order_key = pd.order_key AND od.line_number = pd.line_number ");
    		sql.append("		LEFT JOIN SKU s ON od.storer_key=s.storer_key AND pd.sku=s.sku");
    		sql.append("		LEFT JOIN LOTTABLE l ON pd.lot=l.lot");
    		sql.append("		LEFT JOIN RECEIPT_DETAIL rd ON l.lottable12=rd.lottable12 AND l.lottable06=rd.lottable06");
    		sql.append("		GROUP BY pd.storer_key,pd.ORDER_KEY,od.sku,od.udf2,s.name,s.specification,s.model,l.lottable06,l.lottable05,od.line_number,");
    		sql.append("		l.lottable01,l.lottable02,l.lottable03,l.lottable04,l.lottable07,l.lottable08,l.lottable09,l.lottable10,");
    		sql.append("		l.lottable11,l.lottable12,l.lottable13,l.lottable14,od.udf4");
    		sql.append(") a LEFT JOIN ");
    		sql.append("(");
    		sql.append("	SELECT  ");
    		sql.append("	order_key,ORDER_NUMBER,type,status,actualshipdate,	coalesce(other_reference4,'') AS other_reference4 ,");
    		sql.append("	coalesce(retail_Reference,'') AS retail_Reference,coalesce(buyerpo,'') AS buyerpo,");
    		sql.append("	 coalesce(carrier_Reference,'') AS carrier_Reference,");
    		sql.append("	  coalesce(consignee_Company,'') AS consignee_Company,coalesce(consignee_Key,'') AS consignee_Key, ");
    		sql.append("	   coalesce(carrier_key,'') AS carrier_key ,coalesce(carrier_Company,'') AS carrier_Company ");
    		sql.append("	 FROM ORDERS ");
    		sql.append(" )b ON a.order_key = b.order_key ");
    		sql.append(" WHERE 1=1 ");
     		if(UtilValidate.isNotEmpty(orderKey)){
     			sql.append(" AND a.order_key='"+orderKey+"'");
     		}
     		if(UtilValidate.isNotEmpty(storerKey)){
     			sql.append(" AND a.STORER_KEY='"+storerKey+"'");
     		}else{
     			sql.append(" AND a.STORER_KEY=''");
     		}
     		if(UtilValidate.isNotEmpty(type)){
     			sql.append(" AND b.TYPE='"+type+"'");
     		}
     		if(UtilValidate.isNotEmpty(status)){
     			sql.append(" AND b.STATUS='"+status+"'");
     		}
     		if(UtilValidate.isNotEmpty(orderNumber)){
     			sql.append(" AND b.ORDER_NUMBER='"+orderNumber+"'");
     		}
     		if(UtilValidate.isNotEmpty(sku)){
     			sql.append(" AND a.SKU='"+sku+"'");
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
     		if(UtilValidate.isNotEmpty(carrierKey)){
     			sql.append(" AND b.carrier_Key='"+carrierKey+"'");
     		}
     		if(UtilValidate.isNotEmpty(carrierCompany)){
     			sql.append(" AND b.carrier_Company='"+carrierCompany+"'");
     		}
     		if(UtilValidate.isNotEmpty(model)){
     			sql.append(" AND a.model='"+model+"'");
     		}
     		if(UtilValidate.isNotEmpty(lottable01) && UtilValidate.isNotEmpty(lottable01Over)){
     			sql.append(" AND LOTTABLE01 >= '"+lottable01+"' ");        
     			sql.append(" AND LOTTABLE01 <= '"+lottable01Over+"' ");    
     		}
     		if(UtilValidate.isNotEmpty(lottable02) && UtilValidate.isNotEmpty(lottable02Over)){
     			sql.append(" AND LOTTABLE02 >= '"+lottable02+"' ");        
     			sql.append(" AND LOTTABLE02 <= '"+lottable02Over+"' ");    
     		}
     		if(UtilValidate.isNotEmpty(lottable03) && UtilValidate.isNotEmpty(lottable03Over)){
     			sql.append(" AND LOTTABLE03 >= '"+lottable03+"' ");        
     			sql.append(" AND LOTTABLE03 <= '"+lottable03Over+"' ");    
     		}
     		if(UtilValidate.isNotEmpty(lottable04)){
     			sql.append(" AND a.lottable04='"+lottable04+"'");
     		}
     		if(UtilValidate.isNotEmpty(lottable05)){
     			sql.append(" AND a.lottable05='"+lottable05+"'");
     		}
     		if(UtilValidate.isNotEmpty(lottable06)){
     			sql.append(" AND a.lottable06='"+lottable06+"'");
     		}
     		if(UtilValidate.isNotEmpty(lottable07)){
     			sql.append(" AND a.lottable07='"+lottable07+"'");
     		}
     		if(UtilValidate.isNotEmpty(lottable08)){
     			sql.append(" AND a.lottable08='"+lottable08+"'");
     		}
     		if(UtilValidate.isNotEmpty(lottable09)){
     			sql.append(" AND a.lottable09='"+lottable09+"'");
     		}
     		if(UtilValidate.isNotEmpty(lottable10)){
     			sql.append(" AND a.lottable10='"+lottable10+"'");
     		}
     		if(UtilValidate.isNotEmpty(lottable11)){
     			sql.append(" AND a.lottable11='"+lottable11+"'");
     		}
     		if(UtilValidate.isNotEmpty(lottable12)){
     			sql.append(" AND a.lottable12='"+lottable12+"'");
     		}if(UtilValidate.isNotEmpty(lottable13)){
     			sql.append(" AND a.lottable13='"+lottable13+"'");
     		}
     		if(UtilValidate.isNotEmpty(lottable14)){
     			sql.append(" AND a.lottable14='"+lottable14+"'");
     		}
     		if(UtilValidate.isNotEmpty(lottable15)){
     			sql.append(" AND a.lottable15='"+lottable15+"'");
     		}
     		if(UtilValidate.isNotEmpty(consigneeKey)){
     			sql.append(" AND b.consignee_Key='"+consigneeKey+"'");
     		}
     		//使用发货日期
    		if(UtilValidate.isNotEmpty(dStart) && UtilValidate.isNotEmpty(dEnd)){
    			sql.append(" AND b.ACTUALSHIPDATE >= '"+dStart+"' ");        
    			sql.append(" AND b.ACTUALSHIPDATE <= '"+dEnd+"' ");    
    		}  
    		sql.append(" order by a.ORDER_KEY desc,a.LINE_NUMBER");
        	data=dbHelper.select(sql.toString(), new MapListHandler());
        }catch (Exception e) {
            e.printStackTrace();
            dbHelper.close();
        }finally{
            dbHelper.freeConnection();
        }
        return data;
    }
	
	
	/**
	 * 导出报表
	 * 
	 * @return
	 * @throws IOException
	 */
	@Action(value = "printOuntboundcountReport", results = { @Result(name = Constants.SUCCESS, type = Constants.JSON_TYPE) })
	public String printOuntboundcountReport() throws IOException {
		HttpServletRequest request = ServletActionContext.getRequest();
		final String requeststr= request.getParameter("string");
		
		String[] strs=requeststr.split(",");
		String storerKey="";
		String orderKey="";
		String type="";
		String status="";
		String orderNumber="";
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
		String dStart="";
		String dEnd="";
		String sku="";
		String consigneeKey="";
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
		
		if(strs.length>=1){
			storerKey = strs[0];
		}
		if(strs.length>=2){
			if(strs[1].equals("null")){
				consigneeKey = "";
			}else{
				consigneeKey=strs[1];
			}
		}
		if(strs.length>=3){    //下拉框不填是null，需要做特殊处理
			orderKey = strs[2];
		}
		if(strs.length>=4){    //下拉框不填是null，需要做特殊处理
			if(strs[3].equals("null")){
				type = "";
			}else{
				type=strs[3];
			}
		}
		if(strs.length>=5){
			if(strs[4].equals("null")){
				status = "";
			}else{
				status=strs[4];
			}
		}
		if(strs.length>=6){
			if(strs[5].equals("null")){
				orderNumber = "";
			}else{
				orderNumber = strs[5];
			}
		}
		if(strs.length>=7){
			if(strs[6].equals("null")){
				lottable01 = "";
			}else{
				lottable01 = strs[6];
			}
		}
		if(strs.length>=8){
			if(strs[7].equals("null")){
				lottable02 = "";
			}else{
				lottable02 = strs[7];
			}
		}
		if(strs.length>=9){
			if(strs[8].equals("null")){
				lottable03 = "";
			}else{
				lottable03 = strs[8];
			}
		}
		if(strs.length>=10){
			lottable04 = strs[9];
			lottable04 = WmsCommon.ajaxParaEncoding(lottable04);
		}
		if(strs.length>=11){
			lottable05 = strs[10];
			lottable05 = WmsCommon.ajaxParaEncoding(lottable05);
		}
		if(strs.length>=12){
			lottable06 = strs[11];
			lottable06 = WmsCommon.ajaxParaEncoding(lottable06);
		}
		if(strs.length>=13){
			lottable07 = strs[13];
			lottable07 = WmsCommon.ajaxParaEncoding(lottable07);
		}
		if(strs.length>=14){
			lottable08 = strs[14];
			lottable08 = WmsCommon.ajaxParaEncoding(lottable08);
		}
		if(strs.length>=15){
			lottable09 = strs[14];
			lottable09 = WmsCommon.ajaxParaEncoding(lottable09);
		}
		if(strs.length>=16){
			lottable10 = strs[15];
			lottable10 = WmsCommon.ajaxParaEncoding(lottable10);
		}
		if(strs.length>=17){
			lottable11 = strs[16];
			lottable11 = WmsCommon.ajaxParaEncoding(lottable11);
		}
		if(strs.length>=18){
			lottable12 = strs[17];
			lottable12 = WmsCommon.ajaxParaEncoding(lottable12);
		}
		if(strs.length>=19){
			lottable13 = strs[18];
			lottable13 = WmsCommon.ajaxParaEncoding(lottable13);
		}
		if(strs.length>=20){
			lottable14 = strs[19];
			lottable14 = WmsCommon.ajaxParaEncoding(lottable14);
		}
		
		if(strs.length>=21){
			lottable15 = strs[20];
			lottable15 = WmsCommon.ajaxParaEncoding(lottable15);
		}
		if(strs.length>=22){
			System.out.println(strs[21]);
			if(strs[21].equals("null")){
				dStart = "";
			}else{
				dStart = strs[21];
			}
		}
		if(strs.length>=23){
			System.out.println(strs[22]);
			if(strs[22].equals("null")){
				dEnd = "";
			}else{
				dEnd = strs[22];
			}
		}
		if(strs.length>=24){
			sku = strs[23];
			sku = WmsCommon.ajaxParaEncoding(sku);//对中文字符进行转码
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
				model = "";
			}else{
				model=strs[33];
			}
		}
	 
		List<Map<String, Object>> pickDetaildata=doQueryOrderDetail(storerKey,orderKey,type,status,orderNumber,lottable01,
                                lottable02,lottable03,lottable04,lottable05,lottable06,
                                lottable07,lottable08,lottable09,lottable10,lottable11,
                                lottable12,lottable13,lottable14,lottable15,dStart,dEnd,sku,consigneeKey,lottable01Over,lottable02Over,lottable03Over,
                                retailReference,buyerpo,carrierReference,consigneeCompany,
                                carrierKey,carrierCompany,model);
		
		HttpServletResponse response = ServletActionContext.getResponse();
		// 创建一个新的Excel
		HSSFWorkbook workBook = new HSSFWorkbook();
		// 创建sheet页
		HSSFSheet sheet = workBook.createSheet();
		// sheet页名称
		workBook.setSheetName(0, "出库统计报表");
		// 创建header页
		HSSFHeader header = sheet.getHeader();
		// 设置标题居中
		header.setCenter("出库统计报表");
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

		cell0.setCellValue("合同参考号");
		cell1.setCellValue("购货单位");
		cell2.setCellValue("出货日期");
		cell3.setCellValue("送货单单据编号");
		cell4.setCellValue("型号");
		cell5.setCellValue("厚度(μm)");
		cell6.setCellValue("出货宽幅(mm)");
		cell7.setCellValue("长度(m)");
		cell8.setCellValue("结算宽幅(mm)");
		cell9.setCellValue("结算面积(㎡)");
		cell10.setCellValue("重量");
		cell11.setCellValue("面积");
		cell12.setCellValue("成品卷号");
		cell13.setCellValue("托盘号");
		cell14.setCellValue("物流公司");
		cell15.setCellValue("提单号");
		cell16.setCellValue("ERP单据编号");
		cell17.setCellValue("备注");

	    Float qtySum = 0F; // 汇总
		Float lot15Sum = 0F; // 汇总
		Float udf1Sum = 0F; // 汇总
           
		if ((null != pickDetaildata) && (0 != pickDetaildata.size())) {
			for (int i = 0; i < pickDetaildata.size(); i++) {
				//正常打印数据
                Map<String, Object> map =pickDetaildata.get(i);
                Float qty = WmsCommon.acruateFloatByOne(WmsCommon.doubleToFloat((Double) map.get("qty")));
                Float udf1=WmsCommon.acruateFloatByOne(WmsCommon.doubleToFloat((Double)map.get("udf1")));
//            	System.out.println("##################################"+i);
                Float lot15=WmsCommon.acruateFloatByOne(WmsCommon.doubleToFloat((Double) map.get("lottable15")));
                
                qtySum += qty;
				lot15Sum+= lot15;
				udf1Sum += udf1; // 汇总
                
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

				cell0.setCellValue(map.get("buyerpo") + "");
				cell1.setCellValue(map.get("consigneeCompany") + "");

				if(UtilValidate.isEmpty(map.get("actualshipdate"))){
					cell2.setCellValue("");
				}else{
					cell2.setCellValue(map.get("actualshipdate") + "");
				}
				cell3.setCellValue(map.get("orderKey") + "");
                String udf4 = (String)map.get("udf4");
                String modelStr =(String)map.get("model");
                if(UtilValidate.isNotEmpty(udf4)){
                	modelStr = udf4;
                }
				cell4.setCellValue(modelStr);
                String specification =(String)map.get("specification");
                String strs1="";
                String strs2="";
                if(UtilValidate.isNotEmpty(specification)){
                	strs1=specification.substring(0, specification.indexOf("*"));
                    strs2=specification.substring(specification.indexOf("*")+1, specification.length());
                }
                cell5.setCellValue(strs1 + "");
				cell6.setCellValue(strs2 + "");
				cell7.setCellValue(qty + "");
				cell8.setCellValue(map.get("udf2") + "");
				
				cell9.setCellValue(map.get("udf3") + "");
				String skuStr =(String)map.get("sku");
                //此处长阳作特殊处理,主、辅数量的单位不一样;
                String beginSku = skuStr.substring(0,2);
                udf1=WmsCommon.acruateFloat(udf1); //float类型数字处理，保留三位小数
                String udf1Str = ""+udf1;
                udf1=WmsCommon.acruateFloat(lot15); //float类型数字处理，保留三位小数
                String lot15Str = udf1+"";
                if(beginSku.equals("13")){
                	lot15Str = lot15Str+"pcs";
                	udf1Str = udf1Str+"kg";
                }else if(beginSku.equals("16")||beginSku.equals("15")||beginSku.equals("18")){
                	lot15Str = lot15Str+"㎡";
                	udf1Str = udf1Str+"kg";
                }else{
                	lot15Str = lot15Str+"kg";
                	udf1Str = udf1Str+"㎡";
                }
				cell10.setCellValue(lot15Str);
				cell11.setCellValue(udf1Str);
				cell12.setCellValue(map.get("lottable06") + "");
				cell13.setCellValue(map.get("lottable05") + "");
				
				cell14.setCellValue(map.get("carrierCompany") + "");
				cell15.setCellValue(map.get("carrierReference") + "");
				cell16.setCellValue(map.get("otherReference4") + "");
				cell17.setCellValue("");

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
			}
		}
		
		// 汇总部分
		qtySum=WmsCommon.acruateFloat(qtySum);
		lot15Sum=WmsCommon.acruateFloat(lot15Sum);
		udf1Sum = WmsCommon.acruateFloat(udf1Sum);
		
		
		// 最后打印合计
		row = sheet.createRow(pickDetaildata.size() + 1);
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

		cell0.setCellValue("");
		cell1.setCellValue("");
		cell2.setCellValue("");
		cell3.setCellValue("");
		cell4.setCellValue("总计：");
		cell5.setCellValue("");
		cell6.setCellValue("");
		cell7.setCellValue(qtySum + "");
		cell8.setCellValue("");
		cell9.setCellValue("");
		cell10.setCellValue(lot15Sum + "");
		cell11.setCellValue(udf1Sum + "");
		cell12.setCellValue("");
		cell13.setCellValue("");
		cell14.setCellValue("");
		cell15.setCellValue("");
		cell16.setCellValue("");
		cell17.setCellValue("");

		sheet.setColumnWidth(0, 4000);
		sheet.setColumnWidth(1, 6000);
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
		
		// 通过Response把数据以Excel格式保存
		response.reset();
		response.setContentType("application/msexcel;charset=UTF-8");
		try {
			response.addHeader(
					"Content-Disposition",
					"attachment;filename=\""
							+ new String(("出库统计报表.xls")
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

	/**
	 * 导出发货报表;
	 * 
	 * @return
	 * @throws IOException
	 */
	@Action(value = "exportShipmentOrderSimpleReport", results = { @Result(name = Constants.SUCCESS, type = Constants.JSON_TYPE) })
	public String exportShipmentOrderSimpleReport() throws IOException {
		HttpServletRequest request = ServletActionContext.getRequest();
		final String requeststr= request.getParameter("string");
		
		String[] strs=requeststr.split(",");
		String storerKey="";
		String dStart="";
		String dEnd="";
		
		if(strs.length>=1){
			storerKey = strs[0];
		}
		 
		if(strs.length>=2){
			if(strs[1].equals("null")){
				dStart = "";
			}else{
				dStart = strs[1];
			}
		}
		if(strs.length>=3){
			if(strs[2].equals("null")){
				dEnd = "";
			}else{
				dEnd = strs[2];
			}
		}
		 
		List<Map<String, Object>> pickDetaildata=doQueryShipmentOrderSimpleReport(storerKey,dStart,dEnd);
		
		HttpServletResponse response = ServletActionContext.getResponse();
		// 创建一个新的Excel
		HSSFWorkbook workBook = new HSSFWorkbook();
		// 创建sheet页
		HSSFSheet sheet = workBook.createSheet();
		// sheet页名称
		workBook.setSheetName(0, "发货简报");
		// 创建header页
		HSSFHeader header = sheet.getHeader();
		// 设置标题居中
		header.setCenter("发货简报");
		// 设置第一行为Header

		HSSFRow row = sheet.createRow(0);
		HSSFCell cell0 = row.createCell(0);
		HSSFCell cell1 = row.createCell(1);
		HSSFCell cell2 = row.createCell(2);
		HSSFCell cell3 = row.createCell(3);
		HSSFCell cell4 = row.createCell(4);
		
		cell0.setCellValue("客户名称");
		cell1.setCellValue("型号");
		cell2.setCellValue("规格");
		cell3.setCellValue("结算宽幅");
		cell4.setCellValue("卷数");

	    Integer lotSum = 0; // 汇总
           
		if ((null != pickDetaildata) && (0 != pickDetaildata.size())) {
			for (int i = 0; i < pickDetaildata.size(); i++) {
				//正常打印数据
                Map<String, Object> map =pickDetaildata.get(i);
                Integer lotcount = (Integer)map.get("lotcount");
                lotSum += lotcount;
                
				row = sheet.createRow(i + 1);
				cell0 = row.createCell(0);
				cell1 = row.createCell(1);
				cell2 = row.createCell(2);
				cell3 = row.createCell(3);
				cell4 = row.createCell(4);

				cell0.setCellValue(map.get("consigneeCompany") + "");
				cell1.setCellValue(map.get("model") + "");
				cell2.setCellValue(map.get("specification") + "");
                cell3.setCellValue(map.get("udf2") + "");
				cell4.setCellValue(map.get("lotcount") + "");

				sheet.setColumnWidth(0, 8000);
				sheet.setColumnWidth(1, 4000);
				sheet.setColumnWidth(2, 4000);
				sheet.setColumnWidth(3, 4000);
				sheet.setColumnWidth(4, 4000);
			}
		}
		
		// 汇总部分
		
		// 最后打印合计
		row = sheet.createRow(pickDetaildata.size() + 1);
		cell0 = row.createCell(0);
		cell1 = row.createCell(1);
		cell2 = row.createCell(2);
		cell3 = row.createCell(3);
		cell4 = row.createCell(4);

		cell0.setCellValue("总计：");
		cell1.setCellValue("");
		cell2.setCellValue("");
		cell3.setCellValue("");
		cell4.setCellValue(""+lotSum);

		sheet.setColumnWidth(0, 8000);
		sheet.setColumnWidth(1, 4000);
		sheet.setColumnWidth(2, 4000);
		sheet.setColumnWidth(3, 4000);
		sheet.setColumnWidth(4, 4000);
		
		// 通过Response把数据以Excel格式保存
		response.reset();
		response.setContentType("application/msexcel;charset=UTF-8");
		try {
			response.addHeader(
					"Content-Disposition",
					"attachment;filename=\""
							+ new String(("发货简报.xls")
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

	//报表用到的查询
	public List<Map<String, Object>> doQueryShipmentOrderSimpleReport(String storerKey,String dStart,String dEnd){
    	DBHelper dbHelper = DBHelper.getInstance(false);
    	List<Map<String, Object>> data=new ArrayList<Map<String,Object>>();
        try{
        	StringBuffer sql = new StringBuffer();
        	sql.append(" SELECT "); 
    		sql.append(" o.storer_key,o.consignee_company,s.model,s.specification,coalesce(od.udf2,'') AS udf2,count(od.lottable06) AS lotcount FROM ");
    		sql.append(" ( ");
    		sql.append(" SELECT order_key,sku,lottable06,coalesce(udf2,'') AS udf2 FROM ");
    		sql.append(" ORDER_DETAIL ");
    		sql.append(" ) od ");
    		sql.append(" LEFT JOIN ");
    		sql.append(" ORDERS o ON o.order_key = od.order_key ");
    		sql.append(" LEFT JOIN ");
    		sql.append(" SKU s ON od.sku = s.sku	");
    		sql.append(" WHERE 1=1");
     		if(UtilValidate.isNotEmpty(storerKey)){
     			sql.append(" AND o.STORER_KEY='"+storerKey+"'");
     		}else{
     			sql.append(" AND o.STORER_KEY=''");
     		}
     		//使用发货日期
    		if(UtilValidate.isNotEmpty(dStart) && UtilValidate.isNotEmpty(dEnd)){
    			sql.append(" AND o.ACTUALSHIPDATE >= '"+dStart+"' ");        
    			sql.append(" AND o.ACTUALSHIPDATE <= '"+dEnd+"' ");    
    		}  
    		sql.append(" GROUP BY o.storer_key,o.consignee_company,s.model,s.specification,od.udf2 ");
    		sql.append(" order by o.consignee_company DESC ");
        	data=dbHelper.select(sql.toString(), new MapListHandler());
        }catch (Exception e) {
            e.printStackTrace();
            dbHelper.close();
        }finally{
            dbHelper.freeConnection();
        }
        return data;
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
