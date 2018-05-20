package com.redm.actions.support;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Timestamp;
import java.sql.Types;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;

import com.jelly.help.commons.base.BaseAction;
import com.jelly.help.commons.dbutils.DBHelper;
import com.jelly.help.commons.util.EntityUtils;
import com.jelly.help.commons.util.ParamsUtils;
import com.jelly.help.commons.util.UtilDateTime;
import com.jelly.help.commons.util.UtilValidate;
import com.opensymphony.xwork2.ActionContext;
import com.redm.actions.utility.Constants;
import com.redm.entity.City;
import com.redm.entity.County;
import com.redm.entity.Nation;
import com.redm.entity.Province;
import com.redm.entity.UserInfo;
import com.redm.service.support.CityService;
import com.redm.service.support.CountyService;
import com.redm.service.support.NationService;
import com.redm.service.support.ProvinceService;
import com.redm.service.support.WmsCommonService;

public class AdministrationRegionAction extends BaseAction{

	private static final long serialVersionUID = 1734659832684038200L;
	
	@Autowired
	private NationService nationService;
	
	@Autowired
	private ProvinceService provinceService;
	
	@Autowired
	private CityService cityService;
	
	@Autowired
	private CountyService countyService;
	
	//不使用PageHelper的分页查询方法
	@Action(value="doQueryNation",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doQueryNation(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		DBHelper dbHelper = DBHelper.getInstance();
		final String sort= request.getParameter("sort");//要排序的列名--无需定义，ext自动后传
	    final String dir= request.getParameter("dir");//要排序的方式--无需定义，ext自动后传
		Connection conn=dbHelper.getConnection();
		
		final String nationKey = request.getParameter("nationKey");
		final String descr = request.getParameter("descr");
		final String endescr = request.getParameter("endescr");

		ResultSet rs = null;  
		Integer count=0;
		JSONArray data = new JSONArray();

		//sql 查询语句
		StringBuffer sql=new StringBuffer();
		if(UtilValidate.isNotEmpty(sort)){
			String columnName=WmsCommonService.entityToDbColumn(sort);
			sql.append("SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY "+columnName+" "+dir+") AS ROWNUM,");
		}else{
			sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY NATION_KEY ASC) AS ROWNUM,");
		}	
		sql.append(" ID,ADD_DATE,ADD_WHO,DESCR,EDIT_DATE,EDIT_WHO,ENDESCR,NATION_KEY,USER_DEFINE1,USER_DEFINE2,USER_DEFINE3 ");
		sql.append(" FROM NATION ");
		sql.append(" WHERE 1 = 1 ");
		if(UtilValidate.isNotEmpty(nationKey)){
			sql.append(" AND NATION_KEY LIKE '%"+nationKey+"%'");
		}
		if(UtilValidate.isNotEmpty(descr)){
			sql.append(" AND descr LIKE '%"+descr+"%'");
		}
		if(UtilValidate.isNotEmpty(endescr)){
			sql.append(" AND endescr LIKE '%"+endescr+"%'");
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
            count = cstmt.getInt(8);
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
	
	//不使用PageHelper的分页查询方法
	@Action(value="doQueryProvince",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doQueryProvince(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		DBHelper dbHelper = DBHelper.getInstance();
		Connection conn=dbHelper.getConnection();
		
		final String nationKey = request.getParameter("descr");
		
		ResultSet rs = null;  
		Integer count=0;
		JSONArray data = new JSONArray();

		//sql 查询语句
		StringBuffer sql=new StringBuffer();
		sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY NATION.NATION_KEY ASC) AS ROWNUM,");
		sql.append(" NATION.NATION_KEY AS NATION_key,PROVINCE.PROVINCE_KEY AS province_KEy ,NATION.DESCR AS ndescr,PROVINCE.DESCR AS pdescr ");
		sql.append(" FROM NATION LEFT JOIN ");
		sql.append(" PROVINCE ON NATION.NATION_KEY = PROVINCE.NATION_KEY ");
		sql.append(" WHERE 1 = 1 ");
		if(UtilValidate.isNotEmpty(nationKey)){
			sql.append(" AND NATION.DESCR = '"+nationKey+"'");
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
            count = cstmt.getInt(8);
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
	
	//不使用PageHelper的分页查询方法
	@Action(value="doQueryCity",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doQueryCity(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		DBHelper dbHelper = DBHelper.getInstance();
		final String sort= request.getParameter("sort");//要排序的列名--无需定义，ext自动后传
	    final String dir= request.getParameter("dir");//要排序的方式--无需定义，ext自动后传
		Connection conn=dbHelper.getConnection();
		
		final String provinceKey = request.getParameter("provinceKey");
		final String cityKey = request.getParameter("cityKey");
		final String descr = request.getParameter("descr");
		final String endescr = request.getParameter("endescr");

		ResultSet rs = null;  
		Integer count=0;
		JSONArray data = new JSONArray();

		//sql 查询语句
		StringBuffer sql=new StringBuffer();
		sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY PROVINCE.PROVINCE_KEY ASC) AS ");
		sql.append(" ROWNUM, PROVINCE.PROVINCE_KEY AS PROVINCE_KEY,city.city_KEY AS city_KEy ,province.DESCR AS ");
		sql.append(" pdescr,city.DESCR AS cdescr  ");
		sql.append(" FROM PROVINCE LEFT JOIN  city ON PROVINCE.province_KEY = city.province_KEY  ");
		sql.append(" WHERE 1 = 1 ");
		if(UtilValidate.isNotEmpty(provinceKey)){
			sql.append(" AND province.DESCR = '"+provinceKey+"'");
		}else{
			sql.append(" AND province.DESCR = ''");
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
            count = cstmt.getInt(8);
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
	
	//不使用PageHelper的分页查询方法
	@Action(value="doQueryCounty",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doQueryCounty(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		DBHelper dbHelper = DBHelper.getInstance();
		Connection conn=dbHelper.getConnection();
		
		final String cityKey = request.getParameter("cityKey");
		final String countyKey = request.getParameter("countyKey");
		final String descr = request.getParameter("descr");
		final String endescr = request.getParameter("endescr");

		ResultSet rs = null;  
		Integer count=0;
		JSONArray data = new JSONArray();

		//sql 查询语句
		StringBuffer sql=new StringBuffer();
		sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY city.city_KEY ASC) AS  ");
		sql.append(" ROWNUM, county.county_KEY AS county_KEY,city.city_KEY AS city_KEy ,city.DESCR AS ");
		sql.append(" cdescr,county.DESCR AS codescr  ");
		sql.append(" FROM City LEFT JOIN  county ON city.city_KEY = county.city_KEY   ");
		sql.append(" WHERE 1 = 1 ");
		if(UtilValidate.isNotEmpty(cityKey)){
			sql.append(" AND city.DESCR = '"+cityKey+"'");
		}else{
			sql.append(" AND city.DESCR = ''");
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
            count = cstmt.getInt(8);
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
	
	//不使用PageHelper的分页查询方法
	@Action(value="doQueryStorerNation",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doQueryStorerNation(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		DBHelper dbHelper = DBHelper.getInstance();
		final String sort= request.getParameter("sort");//要排序的列名--无需定义，ext自动后传
	    final String dir= request.getParameter("dir");//要排序的方式--无需定义，ext自动后传
		Connection conn=dbHelper.getConnection();
		
		final String nationKey = request.getParameter("nationKey");
		final String descr = request.getParameter("descr");
		final String endescr = request.getParameter("endescr");

		ResultSet rs = null;  
		Integer count=0;
		JSONArray data = new JSONArray();

		//sql 查询语句
		StringBuffer sql=new StringBuffer();
		if(UtilValidate.isNotEmpty(sort)){
			String columnName=WmsCommonService.entityToDbColumn(sort);
			sql.append("SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY "+columnName+" "+dir+") AS ROWNUM,");
		}else{
			sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY NATION_KEY ASC) AS ROWNUM,");
		}	
		sql.append(" ID,ADD_DATE,ADD_WHO,DESCR,EDIT_DATE,EDIT_WHO,ENDESCR,NATION_KEY,USER_DEFINE1,USER_DEFINE2,USER_DEFINE3 ");
		sql.append(" FROM NATION ");
		sql.append(" WHERE 1 = 1 ");
		if(UtilValidate.isNotEmpty(nationKey)){
			sql.append(" AND NATION_KEY = '"+nationKey+"'");
		}
		if(UtilValidate.isNotEmpty(descr)){
			sql.append(" AND descr LIKE '%"+descr+"%'");
		}
		if(UtilValidate.isNotEmpty(endescr)){
			sql.append(" AND endescr LIKE '%"+endescr+"%'");
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
            count = cstmt.getInt(8);
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
	
	//不使用PageHelper的分页查询方法
	@Action(value="doQueryStorerProvince",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doQueryStorerProvince(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		DBHelper dbHelper = DBHelper.getInstance();
		Connection conn=dbHelper.getConnection();
		
		final String nationKey = request.getParameter("nationKey");
		final String provinceKey = request.getParameter("provinceKey");
		final String descr = request.getParameter("descr");
		final String endescr = request.getParameter("endescr");
		
		ResultSet rs = null;  
		Integer count=0;
		JSONArray data = new JSONArray();

		//sql 查询语句
		StringBuffer sql=new StringBuffer();
		sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY NATION.NATION_KEY ASC) AS ROWNUM,");
		sql.append(" NATION.NATION_KEY AS NATION_key,PROVINCE.PROVINCE_KEY AS province_KEy ,NATION.DESCR AS ndescr,PROVINCE.DESCR AS pdescr ");
		sql.append(" FROM NATION LEFT JOIN ");
		sql.append(" PROVINCE ON NATION.NATION_KEY = PROVINCE.NATION_KEY ");
		sql.append(" WHERE 1 = 1 ");
		if(UtilValidate.isNotEmpty(nationKey)){
			sql.append(" AND NATION.DESCR = '"+nationKey+"'");
		}else{
			sql.append(" AND NATION.DESCR = ''");
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
            count = cstmt.getInt(8);
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
	
	//不使用PageHelper的分页查询方法
	@Action(value="doQueryStorerCity",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doQueryStorerCity(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		DBHelper dbHelper = DBHelper.getInstance();
		final String sort= request.getParameter("sort");//要排序的列名--无需定义，ext自动后传
	    final String dir= request.getParameter("dir");//要排序的方式--无需定义，ext自动后传
		Connection conn=dbHelper.getConnection();
		
		final String provinceKey = request.getParameter("provinceKey");
		final String cityKey = request.getParameter("cityKey");
		final String descr = request.getParameter("descr");
		final String endescr = request.getParameter("endescr");

		ResultSet rs = null;  
		Integer count=0;
		JSONArray data = new JSONArray();

		//sql 查询语句
		StringBuffer sql=new StringBuffer();
		sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY PROVINCE.PROVINCE_KEY ASC) AS ");
		sql.append(" ROWNUM, PROVINCE.PROVINCE_KEY AS PROVINCE_KEY,city.city_KEY AS city_KEy ,province.DESCR AS ");
		sql.append(" pdescr,city.DESCR AS cdescr  ");
		sql.append(" FROM PROVINCE LEFT JOIN  city ON PROVINCE.province_KEY = city.province_KEY  ");
		sql.append(" WHERE 1 = 1 ");
		if(UtilValidate.isNotEmpty(provinceKey)){
			sql.append(" AND province.DESCR = '"+provinceKey+"'");
		}else{
			sql.append(" AND province.DESCR = ''");
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
            count = cstmt.getInt(8);
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
	
	//不使用PageHelper的分页查询方法
	@Action(value="doQueryStorerCounty",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doQueryStorerCounty(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		DBHelper dbHelper = DBHelper.getInstance();
		final String sort= request.getParameter("sort");//要排序的列名--无需定义，ext自动后传
	    final String dir= request.getParameter("dir");//要排序的方式--无需定义，ext自动后传
		Connection conn=dbHelper.getConnection();
		
		final String cityKey = request.getParameter("cityKey");
		final String countyKey = request.getParameter("countyKey");
		final String descr = request.getParameter("descr");
		final String endescr = request.getParameter("endescr");

		ResultSet rs = null;  
		Integer count=0;
		JSONArray data = new JSONArray();

		//sql 查询语句
		StringBuffer sql=new StringBuffer();
		sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY city.city_KEY ASC) AS  ");
		sql.append(" ROWNUM, county.county_KEY AS county_KEY,city.city_KEY AS city_KEy ,city.DESCR AS ");
		sql.append(" cdescr,county.DESCR AS codescr  ");
		sql.append(" FROM City LEFT JOIN  county ON city.city_KEY = county.city_KEY   ");
		sql.append(" WHERE 1 = 1 ");
		if(UtilValidate.isNotEmpty(cityKey)){
			sql.append(" AND city.DESCR = '"+cityKey+"'");
		}else{
			sql.append(" AND city.DESCR = ''");
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
            count = cstmt.getInt(8);
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
	
	
	@Action(value="doSaveNation",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doSaveNation(){
		HttpServletRequest request = ServletActionContext.getRequest();
		Map<String, Object> params =  ActionContext.getContext().getParameters();
		JSONObject entity = ParamsUtils.toJSONParams(params, true, (String[])null);
		try {
			Timestamp dateTime = UtilDateTime.nowTimestamp();
			UserInfo user = (UserInfo) request.getSession().getAttribute(Constants.USER_LOGIN);
			Nation nation =  EntityUtils.toEntity(Nation.class,entity,null,null,true);
			if(UtilValidate.isNotEmpty(nation.getId())){
				nation.setEditDate(dateTime);
				nation.setEditWho(user.getRealname());
				nationService.updateNation(nation);
				json.put("msg", "修改成功！");
			}else{
				nation.setAddDate(dateTime);
				nation.setAddWho(user.getRealname());
				nation.setEditDate(dateTime);
				nation.setEditWho(user.getRealname());
				nationService.saveNation(nation);
				json.put("msg", "保存成功！");
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			setSuccess(false);
			json.put("msg", "保存失败！");
		}
		return SUCCESS;
	}
	
	@Action(value="doSaveProvince",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doSaveProvince(){
		HttpServletRequest request = ServletActionContext.getRequest();
		Map<String, Object> params =  ActionContext.getContext().getParameters();
		JSONObject entity = ParamsUtils.toJSONParams(params, true, (String[])null);
		try {
			Timestamp dateTime = UtilDateTime.nowTimestamp();
			UserInfo user = (UserInfo) request.getSession().getAttribute(Constants.USER_LOGIN);
			Province province =  EntityUtils.toEntity(Province.class,entity,null,null,true);
			if(UtilValidate.isNotEmpty(province.getId())){
				province.setEditDate(dateTime);
				province.setEditWho(user.getRealname());
				provinceService.updateProvince(province);
				json.put("msg", "修改成功！");
			}else{
				province.setAddDate(dateTime);
				province.setAddWho(user.getRealname());
				province.setEditDate(dateTime);
				province.setEditWho(user.getRealname());
				provinceService.saveProvince(province);
				json.put("msg", "保存成功！");
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			setSuccess(false);
			json.put("msg", "保存失败！");
		}
		return SUCCESS;
	}
	
	@Action(value="doSaveCity",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doSaveCity(){
		HttpServletRequest request = ServletActionContext.getRequest();
		Map<String, Object> params =  ActionContext.getContext().getParameters();
		JSONObject entity = ParamsUtils.toJSONParams(params, true, (String[])null);
		try {
			Timestamp dateTime = UtilDateTime.nowTimestamp();
			UserInfo user = (UserInfo) request.getSession().getAttribute(Constants.USER_LOGIN);
			City city =  EntityUtils.toEntity(City.class,entity,null,null,true);
			if(UtilValidate.isNotEmpty(city.getId())){
				city.setEditDate(dateTime);
				city.setEditWho(user.getRealname());
				cityService.updateCity(city);
				json.put("msg", "修改成功！");
			}else{
				city.setAddDate(dateTime);
				city.setAddWho(user.getRealname());
				city.setEditDate(dateTime);
				city.setEditWho(user.getRealname());
				cityService.saveCity(city);
				json.put("msg", "保存成功！");
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			setSuccess(false);
			json.put("msg", "保存失败！");
		}
		return SUCCESS;
	}
	
	@Action(value="doSaveCounty",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doSaveCounty(){
		HttpServletRequest request = ServletActionContext.getRequest();
		Map<String, Object> params =  ActionContext.getContext().getParameters();
		JSONObject entity = ParamsUtils.toJSONParams(params, true, (String[])null);
		try {
			Timestamp dateTime = UtilDateTime.nowTimestamp();
			UserInfo user = (UserInfo) request.getSession().getAttribute(Constants.USER_LOGIN);
			County county =  EntityUtils.toEntity(County.class,entity,null,null,true);
			if(UtilValidate.isNotEmpty(county.getId())){
				county.setEditDate(dateTime);
				county.setEditWho(user.getRealname());
				countyService.updateCounty(county);
				json.put("msg", "修改成功！");
			}else{
				county.setAddDate(dateTime);
				county.setAddWho(user.getRealname());
				county.setEditDate(dateTime);
				county.setEditWho(user.getRealname());
				countyService.saveCounty(county);
				json.put("msg", "保存成功！");
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			setSuccess(false);
			json.put("msg", "保存失败！");
		}
		return SUCCESS;
	}
	
	//校验参数类型是否存在--不使用PageHelper的分页查询方法
	@Action(value="doValidateNation",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doValidateNation(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		DBHelper dbHelper = DBHelper.getInstance();
		Connection conn=dbHelper.getConnection();
		
		final String nationKey = request.getParameter("nationKey");

		ResultSet rs = null;  
		Integer count=0;
		JSONArray data = new JSONArray();

		//sql 查询语句
		StringBuffer sql=new StringBuffer();
		sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY nation_Key) AS ROWNUM,");
		sql.append(" ID,ADD_DATE,ADD_WHO,DESCR,EDIT_DATE,EDIT_WHO,ENDESCR,NATION_KEY,USER_DEFINE1,USER_DEFINE2,USER_DEFINE3 ");
		sql.append(" FROM NATION ");
		sql.append(" WHERE 1 = 1 ");
		if(UtilValidate.isNotEmpty(nationKey)){
			sql.append(" AND nation_Key = '"+nationKey+"'");
		}
		else
		{
            sql.append(" AND nation_Key = ''");
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
	
	//校验参数类型是否存在--不使用PageHelper的分页查询方法
	@Action(value="doValidateProvince",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doValidateProvince(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		DBHelper dbHelper = DBHelper.getInstance();
		Connection conn=dbHelper.getConnection();
		
		final String provinceKey = request.getParameter("provinceKey");

		ResultSet rs = null;  
		Integer count=0;
		JSONArray data = new JSONArray();

		//sql 查询语句
		StringBuffer sql=new StringBuffer();
		sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY province_Key) AS ROWNUM,");
		sql.append(" ID,ADD_DATE,ADD_WHO,DESCR,EDIT_DATE,EDIT_WHO,ENDESCR,NATION_KEY,PROVINCE_KEY,USER_DEFINE1,USER_DEFINE2,USER_DEFINE3 ");
		sql.append(" FROM PROVINCE ");
		sql.append(" WHERE 1 = 1 ");
		if(UtilValidate.isNotEmpty(provinceKey)){
			sql.append(" AND province_Key = '"+provinceKey+"'");
		}
		else
		{
            sql.append(" AND province_Key = ''");
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
	
	//校验参数类型是否存在--不使用PageHelper的分页查询方法
	@Action(value="doValidateCity",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doValidateCity(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		DBHelper dbHelper = DBHelper.getInstance();
		Connection conn=dbHelper.getConnection();
		
		final String cityKey = request.getParameter("cityKey");

		ResultSet rs = null;  
		Integer count=0;
		JSONArray data = new JSONArray();

		//sql 查询语句
		StringBuffer sql=new StringBuffer();
		sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY city_Key) AS ROWNUM,");
		sql.append(" ID,ADD_DATE,ADD_WHO,DESCR,EDIT_DATE,EDIT_WHO,ENDESCR,CITY_KEY,PROVINCE_KEY,USER_DEFINE1,USER_DEFINE2,USER_DEFINE3 ");
		sql.append(" FROM CITY ");
		sql.append(" WHERE 1 = 1 ");
		if(UtilValidate.isNotEmpty(cityKey)){
			sql.append(" AND city_Key = '"+cityKey+"'");
		}
		else
		{
            sql.append(" AND city_Key = ''");
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
	
	//校验参数类型是否存在--不使用PageHelper的分页查询方法
	@Action(value="doValidateCounty",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doValidateCounty(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		DBHelper dbHelper = DBHelper.getInstance();
		Connection conn=dbHelper.getConnection();
		
		final String countyKey = request.getParameter("countyKey");

		ResultSet rs = null;  
		Integer count=0;
		JSONArray data = new JSONArray();

		//sql 查询语句
		StringBuffer sql=new StringBuffer();
		sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY county_Key) AS ROWNUM,");
		sql.append(" ID,ADD_DATE,ADD_WHO,DESCR,EDIT_DATE,EDIT_WHO,ENDESCR,CITY_KEY,COUNTY_KEY,USER_DEFINE1,USER_DEFINE2,USER_DEFINE3 ");
		sql.append(" FROM COUNTY ");
		sql.append(" WHERE 1 = 1 ");
		if(UtilValidate.isNotEmpty(countyKey)){
			sql.append(" AND county_Key = '"+countyKey+"'");
		}
		else
		{
            sql.append(" AND county_Key = ''");
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
	//删除县区
	@Action(value="doDeleteCounty",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doDeleteCounty(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String countyKey = request.getParameter("countyKey");
	
		DBHelper dbHelper = DBHelper.getInstance(false);
		try {
			boolean bool = dbHelper.delete(" DELETE COUNTY WHERE COUNTY_KEY = '"+countyKey+"' ");
			if(bool){
				json.put("msg", "删除成功！");
				dbHelper.close();
			}else{
				throw new Exception();
			}
		} catch (Exception e) {
			setSuccess(false);
			e.printStackTrace();
			json.put("msg", "删除失败！");
		}finally{
			dbHelper.freeConnection();
		}
		return SUCCESS;
	}
	
	//删除城市
	@Action(value="doDeleteCity",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doDeleteCity(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String cityKey = request.getParameter("cityKey");
	
		DBHelper dbHelper = DBHelper.getInstance(false,false);
		// 删除会员之前先到SHOP_ORDERS表中检测有无购买信息，若有则无法删除；
		boolean isExist=WmsCommonService.baseDataDeleteCheck("County", "city_key", cityKey);
		//如果返回true则不能删除。
		if(isExist){
			setSuccess(false);
			json.put("msg", "该记录被使用，不可删除");
			return SUCCESS;
		}
		try {
			boolean bool = dbHelper.delete(" DELETE CITY WHERE CITY_KEY = '"+cityKey+"' ");
			if(bool){
				dbHelper.commitAndClose();
				json.put("msg", "删除成功！");
			}else{
				throw new Exception();
			}
		} catch (Exception e) {
			setSuccess(false);
			e.printStackTrace();
			json.put("msg", "删除失败！");
		}finally{
			dbHelper.freeConnection();
		}
		return SUCCESS;
	}
	
	//删除省份
	@Action(value="doDeleteProvince",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doDeleteProvince(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String provinceKey = request.getParameter("provinceKey");
	
		DBHelper dbHelper = DBHelper.getInstance(false,false);
		// 删除会员之前先到SHOP_ORDERS表中检测有无购买信息，若有则无法删除；
		boolean isExist=WmsCommonService.baseDataDeleteCheck("City", "province_Key", provinceKey);
		//如果返回true则不能删除。
		if(isExist){
			setSuccess(false);
			json.put("msg", "该记录被使用，不可删除");
			return SUCCESS;
		}
		try {
			boolean bool = dbHelper.delete(" DELETE PROVINCE WHERE PROVINCE_KEY= '"+provinceKey+"' ");
			if(bool){
				dbHelper.commitAndClose();
				json.put("msg", "删除成功！");
			}else{
				throw new Exception();
			}
		} catch (Exception e) {
			setSuccess(false);
			e.printStackTrace();
			json.put("msg", "删除失败！");
		}finally{
			dbHelper.freeConnection();
		}
		return SUCCESS;
	}
	
	//删除国家
	@Action(value="doDeleteNation",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doDeleteNation(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String nationKey = request.getParameter("nationKey");
	
		DBHelper dbHelper = DBHelper.getInstance(false,false);
		// 删除会员之前先到SHOP_ORDERS表中检测有无购买信息，若有则无法删除；
		boolean isExist=WmsCommonService.baseDataDeleteCheck("Province", "nation_Key", nationKey);
		//如果返回true则不能删除。
		if(isExist){
			setSuccess(false);
			json.put("msg", "该记录被使用，不可删除");
			return SUCCESS;
		}
		try {
			boolean bool = dbHelper.delete(" DELETE NATION WHERE NATION_KEY = '"+nationKey+"' ");
			if(bool){
				dbHelper.commitAndClose();
				json.put("msg", "删除成功！");
			}else{
				throw new Exception();
			}
		} catch (Exception e) {
			setSuccess(false);
			e.printStackTrace();
			json.put("msg", "删除失败！");
		}finally{
			dbHelper.freeConnection();
		}
		return SUCCESS;
	}
	//不使用PageHelper的分页查询方法
	@Action(value="doQueryNation1",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doQueryNation1(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		DBHelper dbHelper = DBHelper.getInstance();
		final String sort= request.getParameter("sort");//要排序的列名--无需定义，ext自动后传
	    final String dir= request.getParameter("dir");//要排序的方式--无需定义，ext自动后传
		Connection conn=dbHelper.getConnection();
		
		final String nationKey = request.getParameter("nationKey");
		final String descr = request.getParameter("descr");
		final String endescr = request.getParameter("endescr");

		ResultSet rs = null;  
		Integer count=0;
		JSONArray data = new JSONArray();

		//sql 查询语句
		StringBuffer sql=new StringBuffer();
		if(UtilValidate.isNotEmpty(sort)){
			String columnName=WmsCommonService.entityToDbColumn(sort);
			sql.append("SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY "+columnName+" "+dir+") AS ROWNUM,");
		}else{
			sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY NATION_KEY ASC) AS ROWNUM,");
		}	
		sql.append(" ID,ADD_DATE,ADD_WHO,DESCR,EDIT_DATE,EDIT_WHO,ENDESCR,NATION_KEY,USER_DEFINE1,USER_DEFINE2,USER_DEFINE3 ");
		sql.append(" FROM NATION ");
		sql.append(" WHERE 1 = 1 ");
		if(UtilValidate.isNotEmpty(nationKey)){
			sql.append(" AND NATION_KEY LIKE '%"+nationKey+"%'");
		}
		if(UtilValidate.isNotEmpty(descr)){
			sql.append(" AND descr LIKE '%"+descr+"%'");
		}
		if(UtilValidate.isNotEmpty(endescr)){
			sql.append(" AND endescr LIKE '%"+endescr+"%'");
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
            count = cstmt.getInt(8);
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
	
	//不使用PageHelper的分页查询方法
	@Action(value="doQueryProvince1",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doQueryProvince1(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		DBHelper dbHelper = DBHelper.getInstance();
		final String sort= request.getParameter("sort");//要排序的列名--无需定义，ext自动后传
	    final String dir= request.getParameter("dir");//要排序的方式--无需定义，ext自动后传
		Connection conn=dbHelper.getConnection();
		
		final String nationKey = request.getParameter("nationKey");
		final String provinceKey = request.getParameter("provinceKey");
		final String descr = request.getParameter("descr");
		final String endescr = request.getParameter("endescr");
		
		ResultSet rs = null;  
		Integer count=0;
		JSONArray data = new JSONArray();

		//sql 查询语句
		StringBuffer sql=new StringBuffer();
		if(UtilValidate.isNotEmpty(sort)){
			String columnName=WmsCommonService.entityToDbColumn(sort);
			sql.append("SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY "+columnName+" "+dir+") AS ROWNUM,");
		}else{
			sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY PROVINCE_KEY ASC) AS ROWNUM,");
		}	
		sql.append(" ID,ADD_DATE,ADD_WHO,DESCR,EDIT_DATE,EDIT_WHO,ENDESCR,NATION_KEY,PROVINCE_KEY,USER_DEFINE1,USER_DEFINE2,USER_DEFINE3 ");
		sql.append(" FROM PROVINCE ");
		sql.append(" WHERE 1 = 1 ");
		if(UtilValidate.isNotEmpty(nationKey)){
			sql.append(" AND NATION_KEY LIKE '%"+nationKey+"%'");
		}
		if(UtilValidate.isNotEmpty(provinceKey)){
			sql.append(" AND PROVINCE_KEY LIKE '%"+provinceKey+"%'");
		}
		if(UtilValidate.isNotEmpty(descr)){
			sql.append(" AND descr LIKE '%"+descr+"%'");
		}
		if(UtilValidate.isNotEmpty(endescr)){
			sql.append(" AND endescr LIKE '%"+endescr+"%'");
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
            count = cstmt.getInt(8);
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
	
	//不使用PageHelper的分页查询方法
	@Action(value="doQueryCity1",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doQueryCity1(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		DBHelper dbHelper = DBHelper.getInstance();
		final String sort= request.getParameter("sort");//要排序的列名--无需定义，ext自动后传
	    final String dir= request.getParameter("dir");//要排序的方式--无需定义，ext自动后传
		Connection conn=dbHelper.getConnection();
		
		final String provinceKey = request.getParameter("provinceKey");
		final String cityKey = request.getParameter("cityKey");
		final String descr = request.getParameter("descr");
		final String endescr = request.getParameter("endescr");

		ResultSet rs = null;  
		Integer count=0;
		JSONArray data = new JSONArray();

		//sql 查询语句
		StringBuffer sql=new StringBuffer();
		if(UtilValidate.isNotEmpty(sort)){
			String columnName=WmsCommonService.entityToDbColumn(sort);
			sql.append("SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY "+columnName+" "+dir+") AS ROWNUM,");
		}else{
			sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY CITY_KEY ASC) AS ROWNUM,");
		}	
		sql.append(" ID,ADD_DATE,ADD_WHO,DESCR,EDIT_DATE,EDIT_WHO,ENDESCR,CITY_KEY,PROVINCE_KEY,USER_DEFINE1,USER_DEFINE2,USER_DEFINE3 ");
		sql.append(" FROM CITY ");
		sql.append(" WHERE 1 = 1 ");
		if(UtilValidate.isNotEmpty(provinceKey)){
			sql.append(" AND PROVINCE_KEY LIKE '%"+provinceKey+"%'");
		}
		if(UtilValidate.isNotEmpty(cityKey)){
			sql.append(" AND CITY_KEY LIKE '%"+cityKey+"%'");
		}
		if(UtilValidate.isNotEmpty(descr)){
			sql.append(" AND descr LIKE '%"+descr+"%'");
		}
		if(UtilValidate.isNotEmpty(endescr)){
			sql.append(" AND endescr LIKE '%"+endescr+"%'");
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
            count = cstmt.getInt(8);
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
	
	//不使用PageHelper的分页查询方法
	@Action(value="doQueryCounty1",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doQueryCounty1(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		DBHelper dbHelper = DBHelper.getInstance();
		final String sort= request.getParameter("sort");//要排序的列名--无需定义，ext自动后传
	    final String dir= request.getParameter("dir");//要排序的方式--无需定义，ext自动后传
		Connection conn=dbHelper.getConnection();
		
		final String cityKey = request.getParameter("cityKey");
		final String countyKey = request.getParameter("countyKey");
		final String descr = request.getParameter("descr");
		final String endescr = request.getParameter("endescr");

		ResultSet rs = null;  
		Integer count=0;
		JSONArray data = new JSONArray();

		//sql 查询语句
		StringBuffer sql=new StringBuffer();
		if(UtilValidate.isNotEmpty(sort)){
			String columnName=WmsCommonService.entityToDbColumn(sort);
			sql.append("SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY "+columnName+" "+dir+") AS ROWNUM,");
		}else{
			sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY COUNTY_KEY ASC) AS ROWNUM,");
		}	
		sql.append(" ID,ADD_DATE,ADD_WHO,DESCR,EDIT_DATE,EDIT_WHO,ENDESCR,CITY_KEY,COUNTY_KEY,USER_DEFINE1,USER_DEFINE2,USER_DEFINE3 ");
		sql.append(" FROM COUNTY ");
		sql.append(" WHERE 1 = 1 ");
		if(UtilValidate.isNotEmpty(cityKey)){
			sql.append(" AND CITY_KEY LIKE '%"+cityKey+"%'");
		}
		if(UtilValidate.isNotEmpty(countyKey)){
			sql.append(" AND COUNTY_KEY LIKE '%"+countyKey+"%'");
		}
		if(UtilValidate.isNotEmpty(descr)){
			sql.append(" AND descr LIKE '%"+descr+"%'");
		}
		if(UtilValidate.isNotEmpty(endescr)){
			sql.append(" AND endescr LIKE '%"+endescr+"%'");
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
            count = cstmt.getInt(8);
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
	@Override
	public JSONObject getJson() {
		return super.json;
	}

	@Override
	public boolean getSuccess() {
		return super.success;
	}

}
