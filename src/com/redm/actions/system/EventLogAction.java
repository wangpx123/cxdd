package com.redm.actions.system;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;

import com.jelly.help.commons.util.ParamsUtils;
import com.jelly.help.commons.util.UtilValidate;
import com.redm.actions.utility.Constants;
import com.redm.base.AbstractAction;

public class EventLogAction extends AbstractAction {

	private static final long serialVersionUID = -1895838178274382971L;
	
	//不使用PageHelper的分页查询方法
	@Action(value="doQueryEventLog",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doQueryReceipt(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		final String sort= request.getParameter("sort");//要排序的列名--无需定义，ext自动后传
        final String dir= request.getParameter("dir");//要排序的方式--无需定义，ext自动后传
		
        final String udf1 = request.getParameter("udf1");
		final String udf2 = request.getParameter("udf2");
		final String udf3 = request.getParameter("udf3");
		final String editWho = request.getParameter("editWho");
		final String dStart = request.getParameter("dStart");
		final String dEnd = request.getParameter("dEnd");
		
		StringBuffer sql=new StringBuffer();
		sql.append(" SELECT ID,UDF1,UDF2,UDF3,");
		sql.append(" ADD_DATE,ADD_WHO,EDIT_DATE,EDIT_WHO ");
		sql.append(" FROM EMAILLOG ");
		sql.append(" WHERE 1 = 1 ");
		
		if(UtilValidate.isNotEmpty(udf1)){
			sql.append(" AND UDF1 like '%"+udf1+"%' ");
		}
		if(UtilValidate.isNotEmpty(udf2)){
			sql.append(" AND UDF2 like '%"+udf2+"%' ");
		}
		if(UtilValidate.isNotEmpty(udf3)){
			sql.append(" AND UDF3 like '%"+udf3+"%' ");
		}
		if(UtilValidate.isNotEmpty(editWho)){
			sql.append(" AND EDIT_WHO like '%"+editWho+"%' ");
		}
		if(UtilValidate.isNotEmpty(dStart) && UtilValidate.isNotEmpty(dStart)){
			sql.append(" AND EDIT_DATE >= '"+dStart+"' ");        
			sql.append(" AND EDIT_DATE <= '"+dEnd+"' ");    
		}

		json.put("totalCount", getCountForQueryPage(sql));
		json.put("data", getListForQueryPage(sql, pageIndex, pageSize,sort,dir));
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
