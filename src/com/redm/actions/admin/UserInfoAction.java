package com.redm.actions.admin;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import javolution.util.FastList;
import javolution.util.FastMap;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;

import com.jelly.help.commons.callback.CriteriaCallBack;
import com.jelly.help.commons.dbutils.DBHelper;
import com.jelly.help.commons.dbutils.generate.EntityModel;
import com.jelly.help.commons.dbutils.generate.GenerateValue.CommandTypes;
import com.jelly.help.commons.dbutils.generate.GenerateValue.SQLValues;
import com.jelly.help.commons.dbutils.handlers.ColumnListHandler;
import com.jelly.help.commons.util.EntityUtils;
import com.jelly.help.commons.util.ParamsUtils;
import com.jelly.help.commons.util.UtilDateTime;
import com.jelly.help.commons.util.UtilValidate;
import com.jelly.help.entity.PageInfo;
import com.opensymphony.xwork2.ActionContext;
import com.redm.actions.support.WmsCommon;
import com.redm.actions.system.Password;
import com.redm.actions.utility.Constants;
import com.redm.base.AbstractAction;
import com.redm.entity.SecurityGroup;
import com.redm.entity.UserInfo;
import com.redm.service.UserInfoManager;

public class UserInfoAction extends AbstractAction {
	private static final long serialVersionUID = 4789531447708318097L;
	private final Logger logger = LogManager.getLogger(UserInfoAction.class);
	@Autowired
	private UserInfoManager userInfoManager;
	/**
	 * 创建分公司的管理员用户
	 * @return
	 */
	//这是原始的用户信息保存修改方法，新建正常使用，但修改在sqlserver下使用出错 qxue
	//后续再研究DB2下与sqlserver下的差异
	@Action(value="doSaveUserManager0",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doSaveUserManager0(){
		Map<String, Object> params = ActionContext.getContext().getParameters();
		Map<String, Object> context = ParamsUtils.toParams(params);
		Map<String, Object> session = ActionContext.getContext().getSession();
		UserInfo userLogin = (UserInfo) session.get(Constants.USER_LOGIN);
		Date nowDate = new Date();
		String actionMan = userLogin.getRealname();
		
		DBHelper dbHelper = DBHelper.getInstance(false,false);
		try {
			String id = (String)context.get("id");
			context.put("updateMan", actionMan);
			context.put("updateTime", nowDate);
			boolean saveUserSuccess = false;
			String uuid = dbHelper.getRandomUUId();
			if(UtilValidate.isEmpty(id)){
				//添加操作
				context.put("createMan", actionMan);
				context.put("createTime", nowDate);
				context.put("cardId", uuid.subSequence(0, 18));
				context.put("id", context.get("username"));
				EntityModel userModel = dbHelper.buildEntityModel(context, UserInfo.class,null);
				SQLValues<Object> userValues = dbHelper.buildSQLValues(CommandTypes.INSERT, userModel);
				saveUserSuccess = dbHelper.insert(userValues.getSql(),userValues.getParams());
			}else{
				context.put("createMan", null);
				context.put("createTime", null);
				context.put("cardId", null);
				context.put("id", null);
				EntityModel userModel = dbHelper.buildEntityModel(context, UserInfo.class,null);
				Map<String, Object> where = FastMap.newInstance();
				where.put("id", id);
				SQLValues<Object> userValues = dbHelper.buildSQLValues(CommandTypes.UPDATE, userModel,where);
				saveUserSuccess = dbHelper.update(userValues.getSql(),userValues.getParams());
			}
			
			if(saveUserSuccess){
				dbHelper.commitAndClose();
				json.put("msg", "保存用户信息成功！");
			}else{
				throw new Exception();
			}
		} catch (Exception e) {
			dbHelper.rollbackAndClose();
			logger.error(e.getMessage(), e);
			setSuccess(false);
			json.put("msg", "保存用户信息失败！");
		} finally{
			dbHelper.freeConnection();
		}
		return Constants.SUCCESS;
	}
	
	//修改后的用户信息保存修改方法，对update流程做了改动 qxue
	@Action(value="doSaveUserManager",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doSaveUserManager(){
		Map<String, Object> params = ActionContext.getContext().getParameters();
		Map<String, Object> context = ParamsUtils.toParams(params);
		Map<String, Object> session = ActionContext.getContext().getSession();
		UserInfo userInfo = (UserInfo) session.get(Constants.USER_LOGIN);
		Date nowDate = new Date();
		String actionMan = userInfo.getRealname();
		
		DBHelper dbHelper = DBHelper.getInstance(false,false);
		try {
			String id = (String)context.get("id");
			context.put("updateMan", actionMan);
			context.put("updateTime", nowDate);
			
			// 修改方法添加  qxue
			Object username = context.get("username");
			Object realname = context.get("realname");
			Object password0 = context.get("password");
			Object password = Password.getPassMD5(password0);//为了方便转换  qxue 
			
			Object age = context.get("age");
			Object sex = context.get("sex");
			Object birthday = context.get("birthday");
//			Date birthday1 = (Date)birthday;   //为了方便转换  qxue 
			
			Object enable = context.get("enable");
//			Date dateTime =new Date();

			Date updateTime = new Date();
			Object updateMan = context.get("updateMan");
			Object companyId = userInfo.getCompanyId();
			Object udf1 = context.get("udf1");
			Object udf2 = context.get("udf2");
			
			boolean bool = false;
			String uuid = dbHelper.getRandomUUId();
			if(UtilValidate.isEmpty(id)){
				//添加操作
				context.put("createMan", actionMan);
				context.put("createTime", nowDate);
				context.put("cardId", uuid.subSequence(0, 18));
				context.put("id", context.get("username"));
				context.put("password", password);
				context.put("companyId", companyId);
				context.put("udf1", udf1);
				context.put("udf2", udf2);

				EntityModel userModel = dbHelper.buildEntityModel(context, UserInfo.class,null);
				SQLValues<Object> userValues = dbHelper.buildSQLValues(CommandTypes.INSERT, userModel);
				bool = dbHelper.insert(userValues.getSql(),userValues.getParams());
				
			}else{
                StringBuffer sqlUp = new StringBuffer();
                sqlUp.append(" UPDATE USER_INFO SET USERNAME =  '"+username + "',REALNAME ='"+realname + "',AGE ='"+age + "',SEX = '"+sex
                        + "',BIRTHDAY =  '"+birthday + "',ENABLE =  '"+enable + "',UPDATE_TIME = '"+WmsCommon.uToTsDate(updateTime) 
                        + "',UPDATE_MAN = '"+updateMan + "',COMPANY_ID ='"+companyId + "',UDF1 = '"+udf1 + "',UDF2 = '"+udf2 + "' WHERE 1 = 1  AND ID = ? " );
                bool = dbHelper.update(sqlUp.toString(), id);

			}
			if(bool){
				dbHelper.commitAndClose();
				json.put("msg", "保存用户信息成功！");
			}else{
				throw new Exception();
			}
		} catch (Exception e) {
			dbHelper.rollbackAndClose();
			logger.error(e.getMessage(), e);
			setSuccess(false);
			json.put("msg", "保存用户信息失败！");
		} finally{
			dbHelper.freeConnection();
		}
		return Constants.SUCCESS;
	}
	
	
	@Action(value = "doSaveUserSecurityGroup", results = { @Result(name = Constants.SUCCESS, type = Constants.JSON_TYPE) })
	public String doSaveUserSecurityGroup() {
		HttpServletRequest request = ServletActionContext.getRequest();
		String userId = request.getParameter("userId");
		String[] groupIds = request.getParameterValues("groupIds");
		
		DBHelper dbHelper = DBHelper.getInstance(false,false);
		List<List<Object>> paramsList = FastList.newInstance();
		if(UtilValidate.isNotEmpty(groupIds)){
			for (String groupId : groupIds) {
				List<Object> l = FastList.newInstance();
				l.add(dbHelper.getRandomUUId());
				l.add(groupId);
				l.add(userId);
				paramsList.add(l);
			}
		}
		boolean bool = false;
		try {
			//删除用户之前的权限组
			dbHelper.delete("DELETE FROM USER_SECURITY_GROUP WHERE USER_ID = ?", userId);
			if(UtilValidate.isNotEmpty(paramsList)){
				//添加新的权限组
				String sql = "INSERT INTO USER_SECURITY_GROUP (ID, SECURITY_GROUP_ID, USER_ID) VALUES (?, ?, ?)";
				dbHelper.batch(sql, paramsList);
			}
			dbHelper.commitAndClose();
			bool = true;
		} catch (Exception e) {
			dbHelper.rollbackAndClose();
			e.printStackTrace();
		} finally{
			dbHelper.freeConnection();
		}
		
		if(bool){
			json.put("msg", "保存用户权限组信息成功！");
		}else{
			setSuccess(false);
			json.put("msg", "修改用户权限组信息失败！");
		}
		return SUCCESS;
	}
	
	//不使用PageHelper的分页查询方法
	@Action(value = "doQueryAllSecurityGroups", results = { @Result(name = Constants.SUCCESS, type = Constants.JSON_TYPE) })
	public String doQueryAllSecurityGroups() {
		logger.info("do query all security groups .");
		Map<String, Object> params =  ActionContext.getContext().getParameters();
		Map<String, Object> context = ParamsUtils.toParams(params);
		Map<String, Object> session = ActionContext.getContext().getSession();
		final UserInfo userLogin = (UserInfo) session.get(Constants.USER_LOGIN);
		List<Object> userSecurityGroups = null;
		DBHelper dbHelper = DBHelper.getInstance();
		try {
			StringBuffer sql = new StringBuffer();
			sql.append(" SELECT SECURITY_GROUP_ID FROM USER_SECURITY_GROUP");
			sql.append(" WHERE USER_ID = ?");
			userSecurityGroups = dbHelper.select(sql, new ColumnListHandler(),context.get("userId"));
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			dbHelper.freeConnection();
		}
		
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		final String sort= request.getParameter("sort");//要排序的列名--无需定义，ext自动后传
	    final String dir= request.getParameter("dir");//要排序的方式--无需定义，ext自动后传
		
	    StringBuffer sql=new StringBuffer();
		sql.append(" SELECT ID, NAME, REMARK, STATE");
		sql.append(" FROM SECURITY_GROUP");
		sql.append(" WHERE 1 = 1");
		//查询所属公司下的权限组
		if(UtilValidate.isNotEmpty(userLogin.getCompanyId())){
			sql.append(" AND COMPANY_ID LIKE '" + userLogin.getCompanyId() + "'");
		}else{
			sql.append(" AND COMPANY_ID IS NULL");
		}

		json.put("totalCount", getCountForQueryPage(sql));
		json.put("data", getListForQueryPage(sql, pageIndex, pageSize,sort,dir));
		return Constants.SUCCESS;
	}
	
	//使用pageInfo的分页查询方法
	@Action(value = "doQueryAssignSecurityGroupsPi", results = { @Result(name = Constants.SUCCESS, type = Constants.JSON_TYPE) })
	public String doQueryAssignSecurityGroupsPi() {
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		final String userId = request.getParameter("userId");
		int pageIndex = ParamsUtils.toInteger(page, 1);
		int pageSize = ParamsUtils.toInteger(limit, 200);

		PageInfo pageInfo = userInfoManager.queryUserInfos(pageIndex, pageSize, null, null,
				SecurityGroup.class, 
				new CriteriaCallBack() {
					@Override
					public void callback(Criteria c) {
						//查询用户已分配的权限组
						StringBuffer sql = new StringBuffer();
						sql.append(" EXISTS (");
						sql.append(" 	SELECT SECURITY_GROUP_ID FROM USER_SECURITY_GROUP usg");
						sql.append(" 	WHERE USER_ID = '" + userId + "'");
						sql.append(" 	AND usg.SECURITY_GROUP_ID = this_.ID");
						sql.append(" )");
						c.add(Restrictions.sqlRestriction(sql.toString()));
					}
				});
		List<?> results = pageInfo.getResult();
		JSONArray data = new JSONArray();
		if(UtilValidate.isNotEmpty(results)){
			JsonConfig config = EntityUtils.getDateJsonConfig(UtilDateTime.FORMAT_DATE);
			config.setExcludes(new String[]{"userSecurityGroups","securityGroupPermissions"});
			data = JSONArray.fromObject(pageInfo.getResult(),config);
		}
		json.put("data", data);
		json.put("totalCount", pageInfo.getTotalCount());
		return SUCCESS;
	}
	
	//不使用pageInfo的分页查询方法
	@Action(value = "doQueryAssignSecurityGroups", results = { @Result(name = Constants.SUCCESS, type = Constants.JSON_TYPE) })
	public String doQueryAssignSecurityGroups() {
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		
		final String userId = request.getParameter("userId");
		
		StringBuffer sql=new StringBuffer();
		sql.append(" SELECT s.id,");
		sql.append(" s.company_id, s.name, s.remark, s.state  FROM SECURITY_GROUP s ");
		sql.append(" WHERE");
		sql.append(" EXISTS (");
		sql.append(" 	SELECT SECURITY_GROUP_ID FROM USER_SECURITY_GROUP usg");
		sql.append(" 	WHERE USER_ID = '" + userId + "'");
		sql.append(" 	AND usg.SECURITY_GROUP_ID = s.id");
		sql.append(" )");
		
		json.put("totalCount", getCountForQueryPage(sql));
		json.put("data", getListForQueryPage(sql, pageIndex, pageSize,null,null));
		return Constants.SUCCESS;
	}
	
	//不使用pageInfo的分页查询方法
	@Action(value = "doQueryUserInfos", results = { @Result(name = Constants.SUCCESS, type = Constants.JSON_TYPE) })
	public String doQueryUserInfos() {
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		final String sort= request.getParameter("sort");//要排序的列名--无需定义，ext自动后传
	    final String dir= request.getParameter("dir");//要排序的方式--无需定义，ext自动后传
		final String companyId = userInfo.getCompanyId();
		final String userInfoId = userInfo.getId();

		//sql 查询语句
		StringBuffer sql=new StringBuffer();
		sql.append(" SELECT ID, AGE, BIRTHDAY, CARD_ID, COMPANY_ID,UDF1,UDF2, CREATE_MAN, CREATE_TIME, ENABLE, REALNAME, SEX, UPDATE_MAN, UPDATE_TIME, USER_TYPE, USERNAME ");
		sql.append(" FROM USER_INFO");
		sql.append(" WHERE 1=1 ");
		if(!userInfoId.equals("admin")){
			if(UtilValidate.isNotEmpty(companyId)){
				sql.append(" AND CREATE_MAN = '"+userInfo.getRealname()+"'");
			}
		}
		json.put("totalCount", getCountForQueryPage(sql));
		json.put("data", getListForQueryPage(sql, pageIndex, pageSize,sort,dir));
		return Constants.SUCCESS;
	}
	
	
	/**
	 * 启用和作废用户
	 * @return
	 */
	@Action(value = "changeEnable", results = { @Result(name = Constants.SUCCESS, type = Constants.JSON_TYPE) })
	public String changeEnable(){
		Map<String, Object> params = ActionContext.getContext().getParameters();
		Map<String, Object> context = ParamsUtils.toParams(params);
		DBHelper dbHelper = DBHelper.getInstance();
		try {
			EntityModel model = new EntityModel("UserInfo");
			String enable = (String)context.get("enable");
			model.setField("enable", enable.equals("Y") ? "N" : "Y");
			Map<String, Object> where = FastMap.newInstance();
			where.put("id", context.get("id"));
			SQLValues<Object> sqlValues = dbHelper.buildSQLValues(CommandTypes.UPDATE, model,where);
			dbHelper.update(sqlValues.getSql(),sqlValues.getParams());
			json.put("msg", "更改用户状态成功！");
		} catch (Exception e) {
			json.put("msg", "更改用户状态失败！");
			e.printStackTrace();
		} finally{
			dbHelper.freeConnection();
		}
		return SUCCESS;
	}
	
	//重置密码为000000  qxue
	@Action(value="resetMemberPwd",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String resetMemberPwd(){
		Map<String, Object> params = ActionContext.getContext().getParameters();
		Map<String, Object> context = ParamsUtils.toParams(params);
		Map<String, Object> session = ActionContext.getContext().getSession();
		UserInfo userLogin = (UserInfo) session.get(Constants.USER_LOGIN);
		String actionMan = userLogin.getRealname();
		
		DBHelper dbHelper = DBHelper.getInstance(false,false);
		try {
			String id = (String)context.get("id");
			context.put("updateMan", actionMan);

			String password0 = "000000"; 
			String password =Password.getPassMD5(password0);
			
			Date updateTime = new Date();
			Object updateMan = context.get("updateMan");
			
			boolean bool = false;

			StringBuffer sqlUp = new StringBuffer();
            sqlUp.append(" UPDATE USER_INFO SET PASSWORD = '"+password + "' ,UPDATE_TIME = '"+WmsCommon.uToTsDate(updateTime) 
                        + "',UPDATE_MAN = '"+updateMan+ "' WHERE 1 = 1  AND ID = ? " );
            bool = dbHelper.update(sqlUp.toString(), id);

			if(bool){
				dbHelper.commitAndClose();
				json.put("msg", "重置密码成功！");
			}else{
				throw new Exception();
			}
		} catch (Exception e) {
			dbHelper.rollbackAndClose();
			logger.error(e.getMessage(), e);
			setSuccess(false);
			json.put("msg", "重置密码失败！");
		} finally{
			dbHelper.freeConnection();
		}
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
