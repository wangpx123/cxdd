package com.redm.service.support;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import net.sf.json.JSONArray;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;

import com.jelly.help.commons.dbutils.DBHelper;
import com.jelly.help.commons.dbutils.handlers.MapHandler;
import com.jelly.help.commons.dbutils.handlers.MapListHandler;
import com.jelly.help.commons.util.UtilValidate;
import com.redm.actions.support.WmsCommon;

public class WmsCommonService {

	//判断某个值在某个表中是否存在，存在返回true，不存在则返回false。
	public static boolean baseDataDeleteCheck(String tableName,String columnName,String columnValue){
		DBHelper dbHelper = DBHelper.getInstance();
		List<Map<String, Object>> data = new ArrayList<Map<String,Object>>();
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT ID FROM "+tableName+" WHERE 1=1");
		if(UtilValidate.isNotEmpty(columnValue)){
			sql.append(" AND "+columnName+"= '"+columnValue+"' ");
		}
		try {
			data = dbHelper.select(sql.toString(), new MapListHandler());
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(data.isEmpty() && data.size()==0){
			return false;
		}else{
			return true;
		}
	}
	
	//通过ID查出在某张表中的某个字段的值
	public static Map<String, Object> baseDataGetValue(String tableName,String columnName,String id ){
		DBHelper dbHelper = DBHelper.getInstance();
		Map<String, Object> data = new HashMap<String, Object>();
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT "+columnName+" FROM "+tableName+" WHERE 1=1");
		if(UtilValidate.isNotEmpty(id)){
			sql.append(" AND ID= '"+id+"' ");
		}
		try {
			data = dbHelper.select(sql.toString(), new MapHandler());
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return data;
	}
	
	
	/*
	 * tableName：表名
	 * columnName:列名
	 * value：要查的列名值
	 * 
	 * retrun：类型是map集合
	 */
	public static Map<String, Object> getColumnValue(String tableName,String columnName,String value ){
		DBHelper dbHelper = DBHelper.getInstance();
		Map<String, Object> data = new HashMap<String, Object>();
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT * FROM "+tableName+" WHERE 1=1");
		if(UtilValidate.isNotEmpty(value)){
			sql.append(" AND "+columnName+" = '"+value+"' ");
		}else{
			sql.append(" AND "+columnName+" = '' ");
		}
		try {
			data = dbHelper.select(sql.toString(), new MapHandler());
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return data;
	}
	
	//判断字符串是否包含大写，有则在大写字母前面加下划线
	public static String entityToDbColumn(String str){
		StringBuffer strb=new StringBuffer();
		char[] ch=str.toCharArray();
		for(int i=0;i<str.length();i++){
			char c=ch[i];
			//判断A---Z
			if(c>=65&&c<=90){
				strb.append("_");
			}
			strb.append(c);
		}
		String newStr=strb.toString();
		newStr=newStr.toUpperCase();
		return newStr;
	}
	
	//判断字符串是否下划线，有则去掉下划线，并且把下划线后的一个字母变大写
	public static String dbColumnToEntity(String str){
		str=str.toUpperCase();
		StringBuffer strb=new StringBuffer();
		char[] ch=str.toCharArray();
		for(int i=0;i<str.length();i++){
			char c=ch[i];
			//判断A---Z
			if(c>=65&&c<=90){
				c+=32;
				strb.append(c);
			}
			//判断0--9
			if(c>=48&&c<=57){
				strb.append(c);
			}
			//判断_
			if(c==95){
				strb.append(ch[i+1]);
				++i;
			}
		}
		String newStr=strb.toString();
		return newStr;
	}
	
	//存储过程结果集 resultset转json的方法， qxue	
	public static JSONArray ListToJson(List<Map<String, Object>> rs) throws Exception{  
	   // json数组  
	   JSONArray array = new JSONArray();  
	   // 获取列数  
	   for(int i=0;i<rs.size();i++){
		   JSONObject jsonObj = new JSONObject();
		   Map<String, Object> map = rs.get(i);
		   Set<String> set = map.keySet();
		   for (String key : set) {
			   jsonObj.put(key, map.get(key));  
		   }
		   array.add(jsonObj);   
	   }
	   return array;  
	}  
	
	//存储过程结果集 resultset转json的方法， qxue	
	public static JSONArray resultSetToJson(ResultSet rs) throws SQLException,JSONException  
	{  
	   // json数组  
	   JSONArray array = new JSONArray();  
	    
	   // 获取列数  
	   ResultSetMetaData metaData = rs.getMetaData();  
	   int columnCount = metaData.getColumnCount();  
	    
	   // 遍历ResultSet中的每条数据  
	    while (rs.next()) {  
	        JSONObject jsonObj = new JSONObject();  
	        // 遍历每一列  
	        for (int i = 1; i <= columnCount; i++) {    
	            String columnName =metaData.getColumnLabel(i);   
	            String value = rs.getString(columnName);  
	            String newColumnName=dbColumnToEntity(columnName);   //查询的是数据库表字段，转换为实体字段
	            jsonObj.put(newColumnName, value);  
	        }   
	        array.add(jsonObj);   
	    }  
	    
	   return array;  
	}  
	
	//存储过程结果集 resultset转json的方法
	public static JSONArray SumResultSetToJson(ResultSet rs) throws SQLException,JSONException  
	{  
	   // json数组  
	   JSONArray array = new JSONArray();  
	    
	   // 获取列数  
	   ResultSetMetaData metaData = rs.getMetaData();  
	   int columnCount = metaData.getColumnCount();  
	    
	   // 遍历ResultSet中的每条数据  
	    while (rs.next()) {  
	        JSONObject jsonObj = new JSONObject();  
	        String value =null;
	        String columnName=null;
	        // //遍历每一个结果集，将pos中的商品总成交价（i==5）,获取其值，并作抹零处理；
	        for (int i = 1; i <= columnCount; i++) {    
	        	if(i==5){
	        		columnName =metaData.getColumnLabel(i);   
	   	            value = (WmsCommon.SumAcruateFloat(WmsCommon.doubleToFloat(Double.parseDouble(rs.getString(columnName))))).toString();  
	        	}else{
	                columnName =metaData.getColumnLabel(i);   
	                value = rs.getString(columnName);  
	        	}
	            String newColumnName=dbColumnToEntity(columnName);   //查询的是数据库表字段，转换为实体字段
	            jsonObj.put(newColumnName, value);  
	        }   
	        array.add(jsonObj);   
	    }  
	    
	   return array;  
	}  
	
}
