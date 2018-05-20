package com.redm.service.system;

import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.jelly.help.commons.dbutils.DBHelper;
import com.jelly.help.commons.dbutils.handlers.MapListHandler;
import com.jelly.help.commons.util.UtilValidate;
import com.redm.actions.utility.Constants;

@Service
public class ViewCreate {

	//创建所有视图,都创建成功则返回true，一个失败则返回false
	public static boolean creatAllView(){
		boolean isSuccess=true;
		//判断包装视图是否存在，存在则删除再创建
		boolean vpackdescriptionExist=ViewCreate.existView("vpackdescription");
		if(vpackdescriptionExist){
			ViewCreate.dropView("vpackdescription");
		}
		//包装视图是否创建成功，成功返回true
		vpackdescriptionExist=ViewCreate.creatPackDescriptionView();
		if(!vpackdescriptionExist){
			isSuccess=false;
		}
		//****************************************************
		//判断盘点差异视图是否存在，存在则删除再创建
		boolean vcountdifExist=ViewCreate.existView("vcountdif");
		if(vcountdifExist){
			ViewCreate.dropView("vcountdif");
		}
		//盘点差异视图是否创建成功，成功返回true
		vcountdifExist=ViewCreate.createCountView();
		if(!vcountdifExist){
			isSuccess=false;
		}
		//****************************************************
		//判断出库视图是否存在，存在则删除再创建
		boolean vordersExist=ViewCreate.existView("vorders");
		if(vordersExist){
			ViewCreate.dropView("vorders");
		}
		//出库视图是否创建成功，成功返回true
		vordersExist=ViewCreate.creatOrdersView();
		if(!vordersExist){
			isSuccess=false;
		}
		//****************************************************
		//判断入库视图是否存在，存在则删除再创建
		boolean vreceiptExist=ViewCreate.existView("vreceipt");
		if(vreceiptExist){
			ViewCreate.dropView("vreceipt");
		}
		//入库视图是否创建成功，成功返回true
		vreceiptExist=ViewCreate.creatReceiptView();
		if(!vreceiptExist){
			isSuccess=false;
		}
		//****************************************************
		//判断盘点结果视图是否存在，存在则删除再创建
		boolean vcountresultExist=ViewCreate.existView("vCountResult");
		if(vcountresultExist){
			ViewCreate.dropView("vCountResult");
		}
		//入库视图是否创建成功，成功返回true
		vcountresultExist=ViewCreate.creatCountResultView();
		if(!vcountresultExist){
			isSuccess=false;
		}		
		return isSuccess;
	}
	
	//创建盘点差异视图
	public static boolean createCountView() {
		boolean isSuccess=true;
		DBHelper dbHelper = DBHelper.getInstance(false);
		try {
			java.sql.Connection conn = dbHelper.getConnection();
			StringBuffer sql = new StringBuffer();

//			sql.append("CREATE VIEW vCountDif AS");
//			sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY COUNT_KEY) AS ROWNUM,"+Constants.ROWNUMBER+" OVER(ORDER BY COUNT_KEY) AS ID,bb.*,p.desea FROM ");
//			sql.append(" (");
//			sql.append(" SELECT b.count_key,b.storer_key,b.sku,b.name,b.lottable11,sum(qty) AS qty,sum(countqty) AS countqty,sum(qtydiff) AS qtydiff");
//			sql.append(" FROM");
//			sql.append(" (");
//			sql.append(" SELECT a.count_key,a.storer_key,a.sku,a.name,a.lottable11,first_qty,second_qty,qty,");
//			sql.append(" CASE");
//			sql.append(" WHEN dstatus='1' THEN first_qty");
//			sql.append(" ELSE second_qty");
//			sql.append(" END countqty,");
//			sql.append(" CASE");
//			sql.append(" WHEN dstatus='1' THEN (qty-first_qty)");
//			sql.append(" ELSE (qty-second_qty)");
//			sql.append(" END qtydiff");
//			sql.append(" FROM");
//			sql.append(" (");
//			sql.append(" (");
//			sql.append(" SELECT cd.count_key,cd.storer_key,cd.sku,cd.name,cd.loc,cd.lottable04,cd.lottable11,cd.dstatus,first_qty,second_qty,coalesce(qty,0) AS qty");
//			sql.append(" FROM");
//			sql.append(" (");
//			sql.append(" SELECT count_key,c.storer_Key,c.sku,s.name,LOC,LOTTABLE04,LOTTABLE11,dstatus,");
//			sql.append(" coalesce(first_qty,0) AS first_qty, coalesce(second_qty,0) AS second_qty");
//			sql.append(" FROM Count_DETAIL c");
//			sql.append(" INNER JOIN SKU s");
//			sql.append(" ON c.STORER_KEY=s.STORER_KEY AND c.sku =s.sku");
//			sql.append(" ) cd");
//			sql.append(" LEFT JOIN");
//			sql.append(" (");
//			sql.append(" SELECT count_key,storer_key,sku,LOC,LOTTABLE04,LOTTABLE11,sum(coalesce(qty,0)) AS qty");
//			sql.append(" FROM CountInv");
//			sql.append(" GROUP BY count_key,sku,LOC,LOTTABLE04,LOTTABLE11,storer_key");
//			sql.append(" ) ci");
//			sql.append(" ON cd.count_key=ci.count_key AND cd.SKU=ci.SKU AND cd.loc=ci.loc AND cd.lottable04=ci.lottable04 AND cd.lottable11=ci.lottable11");
//			sql.append(" )");
//			sql.append(" UNION");
//			sql.append(" (");
//			sql.append(" SELECT count_key,storer_key,sku,name,loc,lottable04,lottable11,");
//			sql.append(" CASE");
//			sql.append(" WHEN dstatus='Z' THEN '1'");
//			sql.append(" END dstatus,");
//			sql.append(" coalesce(first_qty,0) AS first_qty,coalesce(second_qty,0) AS second_qty, qty ");
//			sql.append(" FROM");
//			sql.append(" (");
//			sql.append(" SELECT ci.count_key,ci.storer_key,ci.sku,ci.name,ci.loc,ci.lottable04,ci.lottable11,coalesce(cd.dstatus,'Z') AS dstatus,first_qty,second_qty, coalesce(qty,0) AS qty");
//			sql.append(" FROM");
//			sql.append(" (");
//			sql.append(" SELECT count_key,storer_Key,sku,LOC,LOTTABLE04,LOTTABLE11,dstatus,");
//			sql.append(" coalesce(first_qty,0) AS first_qty,coalesce(second_qty,0) AS second_qty");
//			sql.append(" FROM Count_DETAIL");
//			sql.append(" ) cd");
//			sql.append(" RIGHT JOIN");
//			sql.append(" (");
//			sql.append(" SELECT count_key,c.storer_key,c.sku,s.name,LOC,LOTTABLE04, LOTTABLE11,sum(coalesce(qty,0)) AS qty");
//			sql.append(" FROM CountInv c");
//			sql.append(" INNER JOIN SKU s");
//			sql.append(" ON c.STORER_KEY=s.STORER_KEY AND c.sku=s.sku");
//			sql.append(" GROUP BY count_key,c.sku,LOC,LOTTABLE04,LOTTABLE11,c.storer_key,s.NAME");
//			sql.append(" ) ci");
//			sql.append(" ON cd.count_key=ci.count_key AND cd.SKU=ci.SKU AND cd.loc=ci.loc AND cd.lottable04=ci.lottable04 AND cd.lottable11=ci.lottable11");
//			sql.append(" ) zz");
//			sql.append(" WHERE  dstatus ='Z'");
//			sql.append(" )");
//			sql.append(" ) a");
//			sql.append(" ) b");
//			sql.append(" GROUP BY b.count_key,b.storer_key,b.sku,b.name,b.lottable11");
//			sql.append(" )bb");
//			sql.append(" LEFT JOIN VPACKDESCRIPTION p ");
//			sql.append(" ON bb.lottable11=p.pack_key");

			sql.append("CREATE VIEW vCountDif AS");
			sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY COUNT_KEY) AS ROWNUM,"+Constants.ROWNUMBER+" OVER(ORDER BY COUNT_KEY) AS ID,bb.* FROM ");
			sql.append(" ( ");
			sql.append(" SELECT b.count_key,b.storer_key,b.sku,b.name,sum(qty) AS qty,sum(countqty) AS countqty,sum(qtydiff) AS qtydiff "); 
			sql.append(" FROM "); 
			sql.append(" ( "); 
			sql.append(" SELECT a.count_key,a.storer_key,a.sku,a.name,first_qty,second_qty,qty, "); 
			sql.append(" CASE "); 
			sql.append(" WHEN dstatus='1' THEN first_qty "); 
			sql.append(" ELSE second_qty "); 
			sql.append(" END countqty, "); 
			sql.append(" CASE "); 
			sql.append(" WHEN dstatus='1' THEN (qty-first_qty) ");
			sql.append(" ELSE (qty-second_qty) "); 
			sql.append(" END qtydiff "); 
			sql.append(" FROM "); 
			sql.append(" ( "); 
			sql.append(" ( "); 
			sql.append(" SELECT cd.count_key,cd.storer_key,cd.sku,cd.name,cd.loc,cd.udf1,cd.udf2,cd.udf3,cd.udf4,cd.udf5,cd.dstatus,first_qty,second_qty,coalesce(qty,0) AS qty "); 
			sql.append(" FROM "); 
			sql.append(" ( "); 
			sql.append(" SELECT count_key,c.storer_Key,c.sku,s.name,LOC,UDF1,UDF2,UDF3,UDF4,UDF5,dstatus, "); 
			sql.append(" coalesce(first_qty,0) AS first_qty, coalesce(second_qty,0) AS second_qty "); 
			sql.append(" FROM Count_DETAIL c "); 
			sql.append(" INNER JOIN SKU s "); 
			sql.append(" ON c.STORER_KEY=s.STORER_KEY AND c.sku =s.sku "); 
			sql.append(" ) cd "); 
			sql.append(" LEFT JOIN "); 
			sql.append(" ( "); 
			sql.append(" SELECT count_key,storer_key,sku,LOC,UDF1,UDF2,UDF3,UDF4,UDF5,sum(coalesce(qty,0)) AS qty "); 
			sql.append(" FROM CountInv "); 
			sql.append(" GROUP BY count_key,sku,LOC,UDF1,UDF2,UDF3,UDF4,UDF5,storer_key "); 
			sql.append(" ) ci "); 
			sql.append(" ON cd.count_key=ci.count_key AND cd.SKU=ci.SKU AND cd.loc=ci.loc AND cd.udf1=ci.udf1 "); 
			sql.append(" AND cd.udf2=ci.udf2 AND cd.udf3=ci.udf3 AND cd.udf4=ci.udf4 AND cd.udf5=ci.udf5 "); 
			sql.append(" ) "); 
			sql.append(" UNION "); 
			sql.append(" ( "); 
			sql.append(" SELECT count_key,storer_key,sku,name,loc,UDF1,UDF2,UDF3,UDF4,UDF5, ");
			sql.append(" CASE "); 
			sql.append(" WHEN dstatus='Z' THEN '1' "); 
			sql.append(" END dstatus, "); 
			sql.append(" coalesce(first_qty,0) AS first_qty,coalesce(second_qty,0) AS second_qty, qty ");  
			sql.append(" FROM "); 
			sql.append(" ( "); 
			sql.append(" SELECT ci.count_key,ci.storer_key,ci.sku,ci.name,ci.loc,ci.udf1,ci.udf2,ci.udf3,ci.udf4,ci.udf5,coalesce(cd.dstatus,'Z') AS dstatus,first_qty,second_qty, coalesce(qty,0) AS qty "); 
			sql.append(" FROM "); 
			sql.append(" ( "); 
			sql.append(" SELECT count_key,storer_Key,sku,LOC,UDF1,UDF2,UDF3,UDF4,UDF5,dstatus, "); 
			sql.append(" coalesce(first_qty,0) AS first_qty,coalesce(second_qty,0) AS second_qty "); 
			sql.append(" FROM Count_DETAIL "); 
			sql.append(" ) cd "); 
			sql.append(" RIGHT JOIN "); 
			sql.append(" ( "); 
			sql.append(" SELECT count_key,c.storer_key,c.sku,s.name,LOC,UDF1,UDF2,UDF3,UDF4,UDF5,sum(coalesce(qty,0)) AS qty "); 
			sql.append(" FROM CountInv c "); 
			sql.append(" INNER JOIN SKU s "); 
			sql.append(" ON c.STORER_KEY=s.STORER_KEY AND c.sku=s.sku "); 
			sql.append(" GROUP BY count_key,c.sku,LOC,UDF1,UDF2,UDF3,UDF4,UDF5,lottable11,c.storer_key,s.NAME "); 
			sql.append(" ) ci "); 
			sql.append(" ON cd.count_key=ci.count_key AND cd.SKU=ci.SKU AND cd.loc=ci.loc AND cd.udf1=ci.udf1 "); 
			sql.append(" AND cd.udf2=ci.udf2 AND cd.udf3=ci.udf3 AND cd.udf4=ci.udf4 AND cd.udf5=ci.udf5 "); 
			sql.append(" ) zz "); 
			sql.append(" WHERE  dstatus ='Z' "); 
			sql.append(" ) "); 
			sql.append(" ) a "); 
			sql.append(" ) b "); 
			sql.append(" GROUP BY b.count_key,b.storer_key,b.sku,b.name ");
			sql.append(" ) bb "); 
			
			Statement st = conn.createStatement();
			//这条语句始终返回的是false (该语句可能返回多个结果,如果第一个结果为 ResultSet 对象，则返回 true；如果其为更新计数或者不存在任何结果，则返回 false)
			st.execute(sql.toString());
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			dbHelper.freeConnection();
		}
		//判断盘点差异视图是否存在，不存在返回false
		boolean vcountdifExist=ViewCreate.existView("vcountdif");
		if(!vcountdifExist){
			isSuccess=false;
		}
		return isSuccess;
	}
	
	//创建出库视图
	public static boolean creatOrdersView(){
		boolean isSuccess=true;
		DBHelper dbHelper = DBHelper.getInstance(false);
		try {
			java.sql.Connection conn = dbHelper.getConnection();
			StringBuffer sql = new StringBuffer();

			sql.append("CREATE VIEW vOrders AS");
			sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY ORDER_KEY) AS ROWNUM,ods.*,vp.DESCRIPTION,vp.DESEA,vp.UOM_QTY,QTY_SHIPPED/ UOM_QTY AS QTY_UOM_SHIPPED  " +
					" FROM " +
					" (SELECT od.ORDER_KEY,od.LINE_NUMBER, od.PACK_KEY, od.UOM, od.QTY_ORDERED,od.QTY_SHIPPED,od.SKU,od.NAME,od.STORER_KEY, " +
					" od.LOTTABLE01, od.LOTTABLE02,od.LOTTABLE03,od.LOTTABLE04,od.LOTTABLE05, od.LOTTABLE06,od.LOTTABLE07," +
					" od.LOTTABLE08,od.LOTTABLE09,od.LOTTABLE10,od.LOTTABLE11,od.LOTTABLE12,od.LOTTABLE13,od.LOTTABLE14,od.LOTTABLE15,os.ORDER_NUMBER,os.TYPE,os.STATUS,os.ACTUALSHIPDATE " +
					" FROM ORDER_DETAIL od " +
	    			" LEFT JOIN ORDERS os  " +
	    			" ON od.ORDER_KEY=os.ORDER_KEY " +
	    			" )ods" +
	    			" LEFT JOIN VPACKDESCRIPTION vp " +
	    			" ON ods.PACK_KEY=vp.PACK_KEY AND ods.UOM=vp.UOM_CODE");

			Statement st = conn.createStatement();
			//这条语句始终返回的是false (该语句可能返回多个结果,如果第一个结果为 ResultSet 对象，则返回 true；如果其为更新计数或者不存在任何结果，则返回 false)
			st.execute(sql.toString());
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			dbHelper.freeConnection();
		}
		//判断出库视图是否存在，不存在则返回false
		boolean vordersExist=ViewCreate.existView("vorders");
		if(!vordersExist){
			isSuccess=false;
		}
		return isSuccess;
	}

	//创建包装描述视图
	public static boolean creatPackDescriptionView(){
		boolean isSuccess=true;
		DBHelper dbHelper = DBHelper.getInstance(false);
		try {
			java.sql.Connection conn = dbHelper.getConnection();
			StringBuffer sql = new StringBuffer();

			sql.append("CREATE VIEW vPackDescription AS ");
			sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY pa.PACK_KEY) AS ROWNUM,pa.*,vp.DESCRIPTION AS desea FROM " +
					"(SELECT p.PACK_KEY,p.UOM_DESCR ,p.UOM_CODE,p.UOM_QTY,cd.DESCRIPTION  " +
					"FROM PACK p LEFT JOIN (SELECT * FROM CODE_DETAIL WHERE CODE_TYPE = 'PACKUOM') cd " +
					" ON p.UOM_DESCR=cd.CODE_VALUE   WHERE coalesce(p.UOM_QTY,0)>0 UNION ALL " +
					" SELECT p.PACK_KEY,p.INNER_DESCR ,p.INNER_CODE,p.INNER_QTY,cd.DESCRIPTION  FROM PACK p " +
					" LEFT JOIN (SELECT * FROM CODE_DETAIL WHERE CODE_TYPE = 'PACKUOM') cd  " +
	    			" ON p.INNER_DESCR=cd.CODE_VALUE  WHERE coalesce(p.INNER_QTY,0)>0  " +
	    			" UNION ALL " +
	    			" SELECT p.PACK_KEY,p.CASE_DESCR ,p.CASE_CODE,p.CASE_QTY,cd.DESCRIPTION " +
	    			" FROM PACK p LEFT JOIN (SELECT * FROM CODE_DETAIL WHERE CODE_TYPE = 'PACKUOM') cd  " +
	    			" ON p.CASE_DESCR=cd.CODE_VALUE  WHERE coalesce(p.CASE_QTY,0)>0  " +
	    			" UNION ALL " +
	    			" SELECT p.PACK_KEY,p.PALLET_DESCR ,p.PALLET_CODE,p.PALLET_QTY,cd.DESCRIPTION  FROM PACK p  " +
	    			" LEFT JOIN (SELECT * FROM CODE_DETAIL WHERE CODE_TYPE = 'PACKUOM') cd  " +
	    			" ON p.PALLET_DESCR=cd.CODE_VALUE  WHERE coalesce(p.PALLET_QTY,0)>0 " +
	    			" UNION ALL  SELECT p.PACK_KEY,p.OTHER_DESCR ,p.OTHER_CODE,p.OTHER_QTY,cd.DESCRIPTION "+
	    			" FROM PACK p LEFT JOIN (SELECT * FROM CODE_DETAIL WHERE CODE_TYPE = 'PACKUOM') cd " +
	    			
	    			" ON p.OTHER_DESCR=cd.CODE_VALUE  WHERE coalesce(p.OTHER_QTY,0)>0   " +
	    			" )pa" +
	    			" LEFT JOIN " +
	    			" (SELECT p.PACK_KEY,p.UOM_DESCR ,p.UOM_CODE,p.UOM_QTY,cd.DESCRIPTION   " +
	    			" FROM PACK p LEFT JOIN (SELECT * FROM CODE_DETAIL WHERE CODE_TYPE = 'PACKUOM') cd " +
	    			" ON p.UOM_DESCR=cd.CODE_VALUE   WHERE coalesce(p.UOM_QTY,0)>0 " +
	    			" )vp " +
	    			" ON pa.PACK_KEY=vp.PACK_KEY"); 

			Statement st = conn.createStatement();
			//这条语句始终返回的是false (该语句可能返回多个结果,如果第一个结果为 ResultSet 对象，则返回 true；如果其为更新计数或者不存在任何结果，则返回 false)
			st.execute(sql.toString());
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			dbHelper.freeConnection();
		}
		//判断包装视图是否存在，不存在则创建
		boolean vpackdescriptionExist=ViewCreate.existView("vpackdescription");
		if(!vpackdescriptionExist){
			isSuccess=false;
		}
		return isSuccess;
	}

	//创建入库视图
	public static boolean creatReceiptView(){
		boolean isSuccess=true;
		DBHelper dbHelper = DBHelper.getInstance(false);
		try {
			java.sql.Connection conn = dbHelper.getConnection();
			StringBuffer sql = new StringBuffer();

			sql.append("CREATE VIEW vReceipt AS ");
			sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY RECEIPT_KEY) AS ROWNUM,rr.*,vp.DESCRIPTION,vp.desea FROM  " +
					" (SELECT  rd.udf1,rd.receipt_key,rt.PO_KEY, SKU ,NAME,rd.LINE_NUMBER,rd.TOLOC,rd.PACK_KEY,rd.QTY_EXPECTED , " +
					"  rd.QTY_RECEIVED,rd.QTY_UOM_RECEIVED,rd.UOM,rd.LOTTABLE01,rd.LOTTABLE02,rd.LOTTABLE03,rd.LOTTABLE04,rd.LOTTABLE05,  " +
					" rd.LOTTABLE06,rd.LOTTABLE07,rd.LOTTABLE08,rd.LOTTABLE09,rd.LOTTABLE10,rd.LOTTABLE11,rd.LOTTABLE12,rd.LOTTABLE13,rd.LOTTABLE14,rd.LOTTABLE15," +
					" rt.STORER_KEY,rt.STATUS,rt.TYPE,rt.DATE_RECEIPTED,rt.DATE_RECEIVED  " +
					"  FROM  RECEIPT_DETAIL rd  " +
	    			" LEFT JOIN RECEIPT rt  " +
	    			" ON rt.RECEIPT_KEY =rd.RECEIPT_KEY  " +
	    			" )  rr " +
	    			" LEFT JOIN VPACKDESCRIPTION vp " +
	    			" ON rr.PACK_KEY=vp.PACK_KEY AND rr.UOM=vp.UOM_CODE");

			Statement st = conn.createStatement();
			//这条语句始终返回的是false (该语句可能返回多个结果,如果第一个结果为 ResultSet 对象，则返回 true；如果其为更新计数或者不存在任何结果，则返回 false)
			st.execute(sql.toString());
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			dbHelper.freeConnection();
		}
		//判断入库视图是否存在，不存在则返回false
		boolean vreceiptExist=ViewCreate.existView("vreceipt");
		if(!vreceiptExist){
			isSuccess=false;
		}
		return isSuccess;
	}
	
	
	//创建盘点结果视图
	public static boolean creatCountResultView(){
		boolean isSuccess=true;
		DBHelper dbHelper = DBHelper.getInstance(false);
		try {
			java.sql.Connection conn = dbHelper.getConnection();
			StringBuffer sql = new StringBuffer();

			sql.append("CREATE VIEW vCountResult AS ");
 			sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY a.count_key) AS ROWNUM,"+Constants.ROWNUMBER+" OVER(ORDER BY a.count_key) AS ID,a.count_key,a.storer_key,a.sku,a.dstatus,a.loc,s.name,a.udf1,a.udf2,a.udf3,a.udf4,a.udf5, ");
 			sql.append(" coalesce(qty,0) AS qty,coalesce(first_Qty,0) AS first_Qty, coalesce(second_Qty,0) AS second_Qty, (coalesce(qty,0)- coalesce(first_Qty,0)) AS first_qty_dif,");
 			sql.append(" (coalesce(qty,0)- coalesce(second_Qty,0)) AS second_qty_dif ");
 			sql.append(" FROM ");
 			sql.append(" ( ");
 			sql.append(" ( ");
 			sql.append(" SELECT cd.count_key,cd.storer_key,cd.sku,cd.dstatus,cd.loc,cd.udf1,cd.udf2,cd.udf3,cd.udf4,cd.udf5,ci.qty,cd.first_qty,cd.second_qty ");
 			sql.append(" FROM ");
 			sql.append(" ( ");
 			sql.append(" SELECT storer_key,COUNT_KEY,loc,SKU,dstatus,coalesce(UDF1,'') AS UDF1,coalesce(UDF2,'') AS UDF2,coalesce(UDF3,'') AS UDF3,coalesce(UDF4,'') AS UDF4,coalesce(UDF5,'') AS UDF5,sum(coalesce(first_Qty,0)) AS first_Qty, sum(coalesce(second_Qty,0)) AS second_Qty ");
 			sql.append(" FROM Count_DETAIL ");
 			sql.append(" GROUP BY storer_key,COUNT_KEY,loc,SKU,dstatus,UDF1,UDF2,UDF3,UDF4,UDF5 ");
 			sql.append(" ) cd ");
 			sql.append(" left JOIN ");
 			sql.append(" ( ");
 			sql.append(" SELECT STORER_KEY,COUNT_KEY,SKU,loc,coalesce(UDF1,'') AS UDF1,coalesce(UDF2,'') AS UDF2,coalesce(UDF3,'') AS UDF3,coalesce(UDF4,'') AS UDF4,coalesce(UDF5,'') AS UDF5,sum(coalesce(qty,0)) AS qty ");
 			sql.append(" FROM COUNTINV ");
 			sql.append(" GROUP BY STORER_KEY,COUNT_KEY,SKU,LOC ,UDF1,UDF2,UDF3,UDF4,UDF5 ");
 			sql.append(" ) ci ");
 			sql.append(" ON ci.storer_key=cd.storer_key AND ci.loc=cd.loc  AND ci.sku=cd.sku AND ci.udf1=cd.udf1 AND ci.udf2=cd.udf2 AND ci.udf3=cd.udf3 AND ci.udf4=cd.udf4 AND ci.udf5=cd.udf5 AND ci.COUNT_KEY=cd.COUNT_KEY ");
 			sql.append(" ) ");
 			sql.append(" UNION "); 
 			sql.append(" ( ");
 			sql.append(" SELECT cd.count_key,cd.storer_key,cd.sku,cd.dstatus,cd.loc,cd.udf1,cd.udf2,cd.udf3,cd.udf4,cd.udf5,ci.qty,cd.first_qty,cd.second_qty ");
 			sql.append(" FROM ");
 			sql.append(" ( ");
 			sql.append(" SELECT storer_key,COUNT_KEY,loc,SKU,dstatus,coalesce(UDF1,'') AS UDF1,coalesce(UDF2,'') AS UDF2,coalesce(UDF3,'') AS UDF3,coalesce(UDF4,'') AS UDF4,coalesce(UDF5,'') AS UDF5,sum(coalesce(first_Qty,0)) AS first_Qty, sum(coalesce(second_Qty,0)) AS second_Qty ");
 			sql.append(" FROM Count_DETAIL ");
 			sql.append(" GROUP BY storer_key,COUNT_KEY,loc,SKU,dstatus,UDF1,UDF2,UDF3,UDF4,UDF5 ");
 			sql.append(" ) cd ");
 			sql.append(" right JOIN ");
 			sql.append(" ( ");
 			sql.append(" SELECT STORER_KEY,COUNT_KEY,SKU,loc,coalesce(UDF1,'') AS UDF1,coalesce(UDF2,'') AS UDF2,coalesce(UDF3,'') AS UDF3,coalesce(UDF4,'') AS UDF4,coalesce(UDF5,'') AS UDF5,sum(coalesce(qty,0)) AS qty ");
 			sql.append(" FROM COUNTINV ");
 			sql.append(" GROUP BY STORER_KEY,COUNT_KEY,SKU,LOC,UDF1,UDF2,UDF3,UDF4,UDF5 ");
 			sql.append(" ) ci ");
 			sql.append(" ON ci.storer_key=cd.storer_key AND ci.loc=cd.loc AND ci.sku=cd.sku AND ci.udf1=cd.udf1 AND ci.udf2=cd.udf2 AND ci.udf3=cd.udf3 AND ci.udf4=cd.udf4 AND ci.udf5=cd.udf5 AND ci.COUNT_KEY=cd.COUNT_KEY ");
 			sql.append(" ) ");
 			sql.append(" ) a ");
 			sql.append(" left JOIN SKU s ON a.storer_key=s.STORER_KEY AND a.sku=s.sku ");

			Statement st = conn.createStatement();
			//这条语句始终返回的是false (该语句可能返回多个结果,如果第一个结果为 ResultSet 对象，则返回 true；如果其为更新计数或者不存在任何结果，则返回 false)
			st.execute(sql.toString());
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			dbHelper.freeConnection();
		}
		//判断入库视图是否存在，不存在则返回false
		boolean vreceiptExist=ViewCreate.existView("vCountResult");
		if(!vreceiptExist){
			isSuccess=false;
		}
		return isSuccess;
	}
		
	
	

	//判断视图是否存在，存在返回true，否则返回false
	public static boolean existView(String viewName){
		boolean isSuccess=true;
		DBHelper dbHelper = DBHelper.getInstance(false);
		List<Map<String, Object>> data=new ArrayList<Map<String,Object>>();
		StringBuffer sql=new StringBuffer();
		//不同数据库的特殊处理 qxue 
		sql.append(Constants.DB2_VIEWCREATE);
		sql.append(Constants.SQLSERVER_VIEWCREATE);
		if(UtilValidate.isNotEmpty(viewName)){
			sql.append("where name = upper('"+viewName+"')");
		}
		try {
			data=dbHelper.select(sql.toString(), new MapListHandler());
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(data.size()==0){
			isSuccess=false;
		}
		return isSuccess;
	}

	//删除视图
	public static void dropView(String viewName){
		DBHelper dbHelper = DBHelper.getInstance(false);
		try {
			java.sql.Connection conn = dbHelper.getConnection();
			StringBuffer sql = new StringBuffer();

			sql.append("DROP VIEW "+viewName);
			Statement st = conn.createStatement();
			//这条语句始终返回的是false (该语句可能返回多个结果,如果第一个结果为 ResultSet 对象，则返回 true；如果其为更新计数或者不存在任何结果，则返回 false)
			st.execute(sql.toString());
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			dbHelper.freeConnection();
		}
	}
}
