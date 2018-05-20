package com.redm.base;

import java.io.File;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;

import org.apache.struts2.ServletActionContext;

import com.jelly.help.commons.base.BaseAction;
import com.jelly.help.commons.dbutils.DBHelper;
import com.jelly.help.commons.dbutils.handlers.MapListHandler;
import com.jelly.help.commons.util.UtilValidate;
import com.redm.actions.support.WmsCommon;
import com.redm.actions.utility.Constants;
import com.redm.entity.UserInfo;
import com.redm.service.support.WmsCommonService;

public abstract class AbstractAction extends BaseAction{

	private static final long serialVersionUID = 1L;
	
	public Integer count=0;
	
	public HttpServletRequest request = ServletActionContext.getRequest();  
	
	public UserInfo userInfo = (UserInfo) request.getSession().getAttribute(Constants.USER_LOGIN);
	
	public File filedata;
	public String filedataFileName;
	
	public String txtfiledata;
	public String txtfiledataFileName;
	
	public String XMLfiledata;
	public String XMLfiledataFileName;
	
	public File getFiledata() {
		return filedata;
	}

	public void setFiledata(File filedata) {
		this.filedata = filedata;
	}

	public String getFiledataFileName() {
		return filedataFileName;
	}

	public void setFiledataFileName(String filedataFileName) {
		this.filedataFileName = filedataFileName;
	}

	public String getTxtfiledata() {
		return txtfiledata;
	}

	public void setTxtfiledata(String txtfiledata) {
		this.txtfiledata = txtfiledata;
	}

	public String getTxtfiledataFileName() {
		return txtfiledataFileName;
	}

	public void setTxtfiledataFileName(String txtfiledataFileName) {
		this.txtfiledataFileName = txtfiledataFileName;
	}

	public String getXMLfiledata() {
		return XMLfiledata;
	}

	public void setXMLfiledata(String xMLfiledata) {
		XMLfiledata = xMLfiledata;
	}

	public String getXMLfiledataFileName() {
		return XMLfiledataFileName;
	}

	public void setXMLfiledataFileName(String xMLfiledataFileName) {
		XMLfiledataFileName = xMLfiledataFileName;
	}

	//keys:表的字段名;
	//values:数据字典对应的配置值;
	public StringBuffer wrappedSqlForTranslateIntoCodeDetail(StringBuffer midSql,String [] keys,String[] values){
		StringBuffer preSql1 = new StringBuffer();
		preSql1.append(" select a.* ");
		for (int i = 0; i < values.length; i++) {
			preSql1.append(" ,cd"+i+".description as "+WmsCommonService.entityToDbColumn(keys[i])+"_DESCRIPTION");
		}
		preSql1.append(" from ( ");
		preSql1.append(midSql);
		StringBuffer sql = new StringBuffer();
		sql.append(" )a ");
		for (int i = 0; i < values.length; i++) {
			sql.append(" LEFT JOIN  CODE_DETAIL  cd"+i);
			sql.append(" ON a."+WmsCommonService.entityToDbColumn(keys[i])+"=cd"+i+".CODE_VALUE  AND cd"+i+".CODE_TYPE ='"+values[i]+"' "); 
			sql.append(" AND a.org_id = cd"+i+".org_id ");
		}
		preSql1.append(sql);
		return preSql1;
	}

	//分页查询;
	public JSONArray getListForQueryPage(StringBuffer sql,int pageIndex,int pageSize,String sort,String dir){
		JSONArray array = new JSONArray(); 
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		StringBuffer sqlstr=new StringBuffer();
		sqlstr.append(sql);
		if(UtilValidate.isNotEmpty(sort)){
			sqlstr.append(" order by "+WmsCommonService.entityToDbColumn(sort)+" "+dir+" ");
		}
//		else{
//			sqlstr.append(" order by id asc ");
//		}
		sqlstr.append(" limit "+pageSize+" offset "+ (pageIndex-1)*pageSize +" ");
		DBHelper dbHelper = DBHelper.getInstance();
		try {
			list = dbHelper.select(sqlstr.toString(), new MapListHandler());
			array = WmsCommonService.ListToJson(list);
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			dbHelper.close();
		}
		return array;
	}
	
	//分页查询总数量;
	public int getCountForQueryPage(StringBuffer sql){
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		DBHelper dbHelper = DBHelper.getInstance();
		try {
			list = dbHelper.select(sql.toString(), new MapListHandler());
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			dbHelper.close();
		}
		return list.size();
	}
	
	public String isStrEmpty(String oldStr){
		if (oldStr.equals("null")||oldStr.equals("")||oldStr.equals("undefined")||oldStr.equals("false")) {
			oldStr = "";
		} else {
			oldStr = WmsCommon.ajaxParaEncoding(oldStr);
		}
		return oldStr;
	}
}
