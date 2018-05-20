package com.redm.actions.support;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Timestamp;
import java.sql.Types;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import javolution.util.FastList;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.jelly.help.commons.base.BaseAction;
import com.jelly.help.commons.dbutils.DBHelper;
import com.jelly.help.commons.json.PageHelper;
import com.jelly.help.commons.util.EntityUtils;
import com.jelly.help.commons.util.ParamsUtils;
import com.jelly.help.commons.util.UtilDateTime;
import com.jelly.help.commons.util.UtilValidate;
import com.opensymphony.xwork2.ActionContext;
import com.redm.actions.utility.Constants;
import com.redm.entity.SubstituteSku;
import com.redm.entity.UserInfo;
import com.redm.service.support.SubstituteSkuService;
import com.redm.service.support.WmsCommonService;

public class SubstituteSkuAction extends BaseAction{

	private static final long serialVersionUID = 2404114200257275301L;
	@Autowired
	private SubstituteSkuService substituteSkuService;
	
	//使用PageHelper的分页查询方法
	@Action(value="doQuerySubstituteSkuPh",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doQuerySubstituteSkuPh(){
		HttpServletRequest request = ServletActionContext.getRequest();
		Map<String, Object> params =  ActionContext.getContext().getParameters();
		Map<String, Object> context = ParamsUtils.toParams(params);
		PageHelper pageHelper = PageHelper.getInstance();
		final String storerKey = request.getParameter("storerKey");
		final String sku = request.getParameter("sku");
		final String substituteSku = request.getParameter("substituteSku");
		pageHelper.initPageInfo(context);
		List<String> fieldNamesList = FastList.newInstance();
		fieldNamesList.add("id");
		fieldNamesList.add("storerKey");
		fieldNamesList.add("sku");
		fieldNamesList.add("substituteSku");
		fieldNamesList.add("status");
		fieldNamesList.add("sequence");
		fieldNamesList.add("packKey");
		fieldNamesList.add("uomQty");
		fieldNamesList.add("uom");
		fieldNamesList.add("qty");
		fieldNamesList.add("subpackKey");
		fieldNamesList.add("subuomQty");
		fieldNamesList.add("subuom");
		fieldNamesList.add("subQty");
		fieldNamesList.add("addDate");
		fieldNamesList.add("addWho");			
		JSONArray data = pageHelper.getJSONObject(fieldNamesList, pageHelper.new CallBack() {
			@Override
			public void onQuery(StringBuffer sql) {
				sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY ID DESC) AS ROWNUM,");
				sql.append(" id,pack_key,qty,sequence,sku,status,storer_key,sub_qty, ");
				sql.append(" subpack_key,substitute_sku,subuom,subuom_qty,uom,uom_qty,add_date,add_who ");
				sql.append(" FROM SUBSTITUTE_SKU ");
				sql.append(" WHERE 1 = 1 ");
				if(UtilValidate.isNotEmpty(storerKey)){
					sql.append(" AND storer_key LIKE '%"+storerKey+"%'");
				}
				if(UtilValidate.isNotEmpty(sku)){
					sql.append(" AND sku LIKE '%"+sku+"%'");
				}
				if(UtilValidate.isNotEmpty(substituteSku)){
					sql.append(" AND substitute_sku LIKE '%"+substituteSku+"%'");
				}
			}
			@Override
			public void onStorage(Map<String, Object> data, String key, String value) {
				if(UtilValidate.isNotEmpty(value)){
					
				}else{
					value = "";
				}
				super.onStorage(data, key, value);
			}
		});
		json.put("data", data);
		json.put("totalCount", pageHelper.getTotalCount());
		return SUCCESS;
	}
	
	//不用pageHelper的分页查询方法
	@Action(value="doQuerySubstituteSku",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doQuerySubstituteSku(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		DBHelper dbHelper = DBHelper.getInstance();
		Connection conn=dbHelper.getConnection();
		final String sort= request.getParameter("sort");//要排序的列名--无需定义，ext自动后传
	    final String dir= request.getParameter("dir");//要排序的方式--无需定义，ext自动后传

		final String storerKey = request.getParameter("storerKey");
		final String sku = request.getParameter("sku");
		final String substituteSku = request.getParameter("substituteSku");
		
		ResultSet rs = null;  
		Integer count=0;
		JSONArray data = new JSONArray();

		//sql 查询语句
		StringBuffer sql=new StringBuffer();
		if(UtilValidate.isNotEmpty(sort)){
			String columnName=WmsCommonService.entityToDbColumn(sort);
			sql.append("SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY "+columnName+" "+dir+") AS ROWNUM,");
		}else{
			sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY ID DESC) AS ROWNUM,");
		}	
		sql.append(" id,pack_key,qty,sequence,sku,status,storer_key,sub_qty, ");
		sql.append(" subpack_key,substitute_sku,subuom,subuom_qty,uom,uom_qty,add_date,add_who ");
		sql.append(" FROM SUBSTITUTE_SKU ");
		sql.append(" WHERE 1 = 1 ");
		if(UtilValidate.isNotEmpty(storerKey)){
			sql.append(" AND storer_key LIKE '%"+storerKey+"%'");
		}
		if(UtilValidate.isNotEmpty(sku)){
			sql.append(" AND sku LIKE '%"+sku+"%'");
		}
		if(UtilValidate.isNotEmpty(substituteSku)){
			sql.append(" AND substitute_sku LIKE '%"+substituteSku+"%'");
		}
		
		String osql=sql.toString();
		String sizeSql="SELECT COUNT(*) FROM ( "+osql+" ) AS TEMP WHERE 1 = 1 ";
		String withSql="";
		String querysql="SELECT * FROM ( "+osql+" ) AS NEW_TABLE WHERE 1 = 1";
		Integer currentPageIx =pageIndex;
		//System.out.println("sizeSql:"+sizeSql);
		//System.out.println("sql:"+querysql);
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
		    //cstmt.execute();    //返回结果集时不能用这个方法
            
            data=WmsCommonService.resultSetToJson(rs);    //rs未做任何处理时调用
//            data=resultSetToJson1(rs);    //rs未做任何处理时调用
            
// 		    System.out.println("@IOCURRENTPAGEIX: " + cstmt.getInt(5));  
// 		    System.out.println("@OPAGESTARTROW: " + cstmt.getInt(6));  
// 		    System.out.println("@OPAGEENDROW: " + cstmt.getInt(7));  
// 		    System.out.println("@OTOTALROWS: " + cstmt.getInt(8));
// 		    System.out.println("@OHASPREVIOUSPAGE: " + cstmt.getInt(9));  
// 		    System.out.println("@OHASNEXTPAGE: " + cstmt.getInt(10));
// 		    System.out.println("@OTOTALPAGES: " + cstmt.getInt(11));  
// 		    System.out.println("@OERROR: " + cstmt.getString(12));
 		    count=cstmt.getInt(8);
// 		    System.out.println("count:"+count);
 		    
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

	
	@Action(value="doSaveSubstituteSku",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doSaveSubstituteSku(){
		HttpServletRequest request = ServletActionContext.getRequest();
		Map<String, Object> params =  ActionContext.getContext().getParameters();
		JSONObject entity = ParamsUtils.toJSONParams(params, true, (String[])null);
		try {
			Timestamp dateTime = UtilDateTime.nowTimestamp();
			UserInfo user = (UserInfo) request.getSession().getAttribute(Constants.USER_LOGIN);
			SubstituteSku substituteSku =  EntityUtils.toEntity(SubstituteSku.class,entity,null,null,true);
			if(UtilValidate.isNotEmpty(substituteSku.getId())){
				substituteSku.setEditDate(dateTime);
				substituteSku.setEditWho(user.getRealname());
				substituteSkuService.updateSubstituteSku(substituteSku);
				json.put("msg", "修改成功！");
			}else{
				substituteSku.setAddDate(dateTime);
				substituteSku.setAddWho(user.getRealname());
				substituteSku.setEditDate(dateTime);
				substituteSku.setEditWho(user.getRealname());
				substituteSkuService.saveSubstituteSku(substituteSku);
				json.put("msg", "保存成功！");
			}
		} catch (Exception e) {
			e.printStackTrace();
			setSuccess(false);
			json.put("msg", "保存失败！");
		}
		return Constants.SUCCESS;
		
	}
	
	@Action(value="doDeleteSubstituteSku",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doDeleteSubstituteSku(){
		HttpServletRequest request = ServletActionContext.getRequest();
		DBHelper dbHelper = DBHelper.getInstance();
		try {
			String id = request.getParameter("id");
			boolean bool = dbHelper.delete(" DELETE SUBSTITUTE_SKU WHERE ID ="+id);
			if(bool){
				json.put("msg", "删除成功！");
			}else{
				throw new Exception();
			}
		} catch (Exception e) {
			e.printStackTrace();
			setSuccess(false);
			json.put("msg", "删除失败！");
		}finally{
			dbHelper.freeConnection();
		}
		return SUCCESS;
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
