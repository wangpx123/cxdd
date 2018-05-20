package com.redm.actions.system;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import javolution.util.FastMap;
import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;

import com.jelly.help.commons.base.BaseAction;
import com.jelly.help.commons.dbutils.DBHelper;
import com.jelly.help.commons.dbutils.generate.EntityModel;
import com.jelly.help.commons.dbutils.generate.GenerateValue.CommandTypes;
import com.jelly.help.commons.dbutils.generate.GenerateValue.SQLValues;
import com.jelly.help.commons.util.ParamsUtils;
import com.jelly.help.commons.util.UtilDateTime;
import com.jelly.help.commons.util.UtilValidate;
import com.opensymphony.xwork2.ActionContext;
import com.redm.actions.utility.Constants;
import com.redm.base.AbstractAction;
import com.redm.entity.UserInfo;

public class LoginLogAction extends AbstractAction {
	private static final long serialVersionUID = -4325332418638995632L;
	private static final String ON = "ON";
	private static final String OFF = "OFF";
	
	@Action(value="doEnforceOffline",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doEnforceOffline(){
		HttpServletRequest request = ServletActionContext.getRequest();
		Map<String, Object> session = ActionContext.getContext().getSession();
		final UserInfo userLogin = (UserInfo) session.get(Constants.USER_LOGIN);
		String currentUserName = userLogin.getUsername();
		String id = request.getParameter("id");
		String userName = request.getParameter("userName");
		if(userName.equals(currentUserName)){
			setSuccess(false);
			json.put("msg", "强制下线的对象不能是自己！");
		}else{
			//移除会话ID，客户端在检测时会自动注销会员拥有者的会话
			String sessionId = ONLINE.get(userName);
			if(sessionId != null && BaseAction.SESSIONS.containsKey(sessionId)){
				BaseAction.SESSIONS.remove(sessionId);
				json.put("msg", "强制用户下线成功！");
				DBHelper dbHelper = DBHelper.getInstance();
				try {
					EntityModel model = new EntityModel("LoginLog");
					model.setField("logoutTime",UtilDateTime.nowTimestamp());
					model.setField("status","注销");
					model.setField("remark","用户被[ "+userLogin.getRealname()+" ]强制从系统注销。");
					Map<String, Object> where = FastMap.newInstance();
					where.put("id", id);
					SQLValues<Object> sqlValues = dbHelper.buildSQLValues(CommandTypes.UPDATE, model, where);
					dbHelper.update(sqlValues.getSql(), sqlValues.getParams());
				} catch (Exception e) {
					e.printStackTrace();
				}finally{
					BaseAction.ONLINE.remove(userName);
					BaseAction.LOGINIDS.remove(userName);
					dbHelper.freeConnection();
				}
				
			}else{
				setSuccess(false);
				json.put("msg", "用户会话不存在或已过期！");
			}
		}
		return SUCCESS;
	}
	
	//不使用PageHelper的分页查询方法
	@Action(value="queryLoginLogs",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String queryLoginLogs(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		final String sort= request.getParameter("sort");//要排序的列名--无需定义，ext自动后传
	    final String dir= request.getParameter("dir");//要排序的方式--无需定义，ext自动后传
		
		Map<String, Object> params = ActionContext.getContext().getParameters();
		Map<String, Object> context = ParamsUtils.toParams(params);
		final String query = (String)context.get("query");
		final String status = (String)context.get("status");

		//sql 查询语句
		StringBuffer sql=new StringBuffer();
		sql.append(" SELECT l.ID,l.IP,l.LOGIN_TIME,l.LOGOUT_TIME,l.USER_NAME,l.REMARK,l.STATUS,");
		sql.append(" u.USER_TYPE,u.REALNAME");
		sql.append(" FROM LOGIN_LOG l");
		sql.append(" LEFT JOIN USER_INFO u ON u.USERNAME = l.USER_NAME");
		sql.append(" WHERE 1 = 1");
		if(UtilValidate.isNotEmpty(query)){
			sql.append(" AND ( u.USERNAME LIKE '%" + query + "%'");
			sql.append(" OR u.REALNAME LIKE '%" + query + "%' ");
			sql.append(" OR u.CARD_ID LIKE '%" + query + "%' )");
		}
		if(!"ADMIN_SYSTEM".equals(userInfo.getUserType())){
			//sql.append(" AND u.COMPANY_ID like '"+userLogin.getCompanyId()+"%'");
		}
		if(UtilValidate.isNotEmpty(status)){
			if(status.equals(ON)){
				//注销时间为空，并且登陆时间是今天
				String nowDate = UtilDateTime.nowDateString(UtilDateTime.FORMAT_DATE);
				sql.append(" AND (l.LOGOUT_TIME IS NULL");
				sql.append(" AND l.LOGIN_TIME >= '" + nowDate + " 00:00:00' )");
			}else if(status.equals(OFF)){
				sql.append(" AND l.LOGOUT_TIME IS NOT NULL");
			}
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
