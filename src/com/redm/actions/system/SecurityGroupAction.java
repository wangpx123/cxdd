package com.redm.actions.system;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import javolution.util.FastList;
import javolution.util.FastMap;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;

import com.jelly.help.commons.dbutils.DBHelper;
import com.jelly.help.commons.dbutils.generate.EntityModel;
import com.jelly.help.commons.dbutils.generate.GenerateValue.CommandTypes;
import com.jelly.help.commons.dbutils.generate.GenerateValue.SQLValues;
import com.jelly.help.commons.dbutils.handlers.BeanListHandler;
import com.jelly.help.commons.dbutils.handlers.ColumnListHandler;
import com.jelly.help.commons.json.PageHelper;
import com.jelly.help.commons.util.ParamsUtils;
import com.jelly.help.commons.util.UtilValidate;
import com.opensymphony.xwork2.ActionContext;
import com.redm.actions.utility.Constants;
import com.redm.base.AbstractAction;
import com.redm.entity.SecurityGroup;
import com.redm.entity.SystemPermission;
import com.redm.entity.UserInfo;

public class SecurityGroupAction extends AbstractAction {
	private static final long serialVersionUID = -8934057253552521155L;
	
	/**
	 * 查询系统中所有的权限，供用户选择、分配权限组的权限。
	 * @return
	 */
	@Action(value="doQueryAllPermissions")
	public String doQueryAllPermissions(){
		Map<String, Object> session = ActionContext.getContext().getSession();
		UserInfo userLogin = (UserInfo) session.get(Constants.USER_LOGIN);
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpServletResponse response = ServletActionContext.getResponse();
		String groupId = request.getParameter("groupId");
		JSONArray data = new JSONArray();
		DBHelper dbHelper = DBHelper.getInstance(false);
		try {
			List<Object> assignPermissions = getAssignPermissionsByGroupId(dbHelper, groupId);
			StringBuffer sql = new StringBuffer();
			sql.append(" SELECT * FROM SYSTEM_PERMISSION");
			sql.append(" WHERE PARENT_ID = ?");
			sql.append(" AND PARENT_ID = ?");
			if(!userLogin.getId().equals("admin")){
				sql.append(" AND ");
				sql.append(" id IN ");
				sql.append(" ( ");
				sql.append(" SELECT permission_id FROM SECURITY_GROUP_PERMISSION ");
				sql.append(" WHERE  security_group_id IN ( ");
				sql.append(" SELECT security_group_id FROM USER_SECURITY_GROUP  WHERE user_id='"+userLogin.getUsername()+"'  ");
				sql.append(" ) ");
				sql.append(" ) ");
			}
			if(UtilValidate.isNotEmpty(userLogin.getCompanyId())){
				sql.append(" AND COMPANY_PERMISSION = 'Y'");
			}
			sql.append(" ORDER BY MENU_SORT ASC");
			data = getPermissions(sql,dbHelper, 0, 0, assignPermissions);
			dbHelper.close();
		} catch (Exception e) {
			e.printStackTrace();
		} finally{
			dbHelper.freeConnection();
		}
		try {
			response.setContentType("text/javascript");
			PrintWriter out = response.getWriter();
			out.println(data);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return NONE;
	}
	
	private JSONArray getPermissions(StringBuffer sql,DBHelper dbHelper,int parentId, Object groupId,List<Object> assignPermissions)
			throws SQLException {
		JSONArray data = new JSONArray();
		List<SystemPermission> systemPermissions = 
			dbHelper.select(sql.toString(), new BeanListHandler<SystemPermission>(SystemPermission.class),parentId,groupId);
		
		if(UtilValidate.isNotEmpty(systemPermissions)){
			for (SystemPermission permission : systemPermissions) {
				JSONObject o = new JSONObject();
				o.put("id", permission.getId());
				o.put("remark", permission.getRemark());
				o.put("text", permission.getMenuName());
				o.put("parentId", permission.getParentId());
				if(permission.getId() != 0 && groupId instanceof Integer)
					groupId = permission.getId();
				JSONArray childData = getPermissions(sql, dbHelper, permission.getId(),groupId,assignPermissions);
				boolean hasChild = false;
				if(UtilValidate.isNotEmpty(childData)){
					hasChild = true;
					o.put("children", childData);
				}
				o.put("leaf", !hasChild);
				o.put("expanded", true);
				if(assignPermissions != null)
					o.put("checked", assignPermissions.contains(permission.getId()));
				data.add(o);
			}
		}
		return data;
	}
	public List<Object> getAssignPermissionsByGroupId(DBHelper dbHelper, String groupId) throws SQLException {
		StringBuffer sql = new StringBuffer();
		sql.append(" SELECT PERMISSION_ID FROM SECURITY_GROUP_PERMISSION ");
		sql.append(" WHERE SECURITY_GROUP_ID = ?");
		return dbHelper.select(sql, new ColumnListHandler(),groupId);
	}
	/**
	 * 查询已分配的权限组权限。
	 * @return
	 */
	@Action(value="doQueryAssignPermissions")
	public String doQueryAssignPermissions(){
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpServletResponse response = ServletActionContext.getResponse();
		String groupId = request.getParameter("groupId");

		JSONArray data = new JSONArray();
		DBHelper dbHelper = DBHelper.getInstance(false);
		try {
			StringBuffer sql = new StringBuffer();
			sql.append(" SELECT * FROM SYSTEM_PERMISSION ");
			sql.append(" WHERE PARENT_ID = ?");
			sql.append(" AND ID IN (");
			sql.append(" 	SELECT PERMISSION_ID FROM SECURITY_GROUP_PERMISSION");
			sql.append(" 	WHERE SECURITY_GROUP_ID = ? ");
			sql.append(" )");
			data = getPermissions(sql,dbHelper, 0, groupId, null);
			dbHelper.close();
		} catch (Exception e) {
			e.printStackTrace();
		} finally{
			dbHelper.freeConnection();
		}
		try {
			response.setContentType("text/javascript");
			PrintWriter out = response.getWriter();
			out.println(data);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return NONE;
	}
	/**
	 * 查询该公司下所有的权限组
	 * @return
	 */
	//使用PageHelper的分页查询方法
	@Action(value="doQuerySecurityGroupsPh",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doQuerySecurityGroupsPh(){
		Map<String, Object> params =  ActionContext.getContext().getParameters();
		Map<String, Object> context = ParamsUtils.toParams(params);
		Map<String, Object> session = ActionContext.getContext().getSession();
		final UserInfo userLogin = (UserInfo) session.get(Constants.USER_LOGIN);
		
		PageHelper pageHelper = PageHelper.getInstance();
		pageHelper.initPageInfo(context);
		
		List<String> fieldNamesList = FastList.newInstance();
		fieldNamesList.add("id");
		fieldNamesList.add("name");
		fieldNamesList.add("remark");
		fieldNamesList.add("state");
		
		JSONArray data = pageHelper.getJSONObject(fieldNamesList, pageHelper.new CallBack() {
			@Override
			public void onQuery(StringBuffer sql) {
				sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY ID) AS ROWNUM, ID, NAME, REMARK, STATE");
				sql.append(" FROM SECURITY_GROUP");
				sql.append(" WHERE 1 = 1");
				if(UtilValidate.isNotEmpty(userLogin.getCompanyId())){
					//查询公司权限
					sql.append(" AND COMPANY_ID = '" + userLogin.getCompanyId() + "'");
				}else{
					//查询系统权限
					sql.append(" AND COMPANY_ID IS NULL");
				}
			}
		});
		json.put("data", data);
		json.put("totalCount", pageHelper.getTotalCount());
		return Constants.SUCCESS;
	}
	
	@Action(value="doQuerySecurityGroups",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doQuerySecurityGroups(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		final String sort= request.getParameter("sort");//要排序的列名--无需定义，ext自动后传
	    final String dir= request.getParameter("dir");//要排序的方式--无需定义，ext自动后传
		Map<String,Object > session = ActionContext.getContext().getSession();
		final UserInfo userInfo = (UserInfo) session.get(Constants.USER_LOGIN);
		final String userInfoId = userInfo.getId();

		StringBuffer sql=new StringBuffer();
		sql.append(" SELECT ID, NAME, REMARK, STATE");
		sql.append(" FROM SECURITY_GROUP");
		sql.append(" WHERE 1 = 1");
		if(UtilValidate.isNotEmpty(userInfo.getCompanyId())){
			//查询公司权限
			sql.append(" AND COMPANY_ID = '" + userInfo.getCompanyId() + "'");
		}else{
			//查询系统权限
			sql.append(" AND COMPANY_ID IS NULL");
		}
		if(!userInfoId.equals("admin")){
			sql.append(" AND name <>'admin' ");
		}
		json.put("totalCount", getCountForQueryPage(sql));
		json.put("data", getListForQueryPage(sql, pageIndex, pageSize,sort,dir));
		return Constants.SUCCESS;
	}

	
	/**
	 * 保存用户选择的权限组权限。
	 * @return
	 */
	@Action(value="doSaveSecurityGroupPermissions",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doSaveSecurityGroupPermissions(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String groupId = request.getParameter("groupId");
		String[] permissionIds = request.getParameterValues("permissionIds");
		
		DBHelper dbHelper = DBHelper.getInstance(false,false);
		List<List<Object>> paramsList = FastList.newInstance();
		if(UtilValidate.isNotEmpty(permissionIds)){
			for (String permissionId : permissionIds) {
				List<Object> l = FastList.newInstance();
				l.add(dbHelper.getRandomUUId());
				l.add(groupId);
				l.add(permissionId);
				paramsList.add(l);
			}
		}
		boolean bool = false;
		try {
			//删除之前的权限组权限
			dbHelper.delete("DELETE FROM SECURITY_GROUP_PERMISSION WHERE SECURITY_GROUP_ID = '"+groupId+"'");
			if(UtilValidate.isNotEmpty(paramsList)){
				//添加新的权限组权限
				String sql = "INSERT INTO SECURITY_GROUP_PERMISSION (ID, SECURITY_GROUP_ID, PERMISSION_ID) VALUES (?, ?, ?)";
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
			json.put("msg", "保存权限组权限信息成功！");
		}else{
			setSuccess(false);
			json.put("msg", "保存权限组权限信息失败！");
		}
		return Constants.SUCCESS;
	}
	/**
	 * 保存权限组信息，可以是新增或修改操作。
	 * @return
	 */
	//这是原始的权限组保存修改方法，新建正常使用，但修改在sqlserver下使用出错 qxue
	//后续再研究DB2下与sqlserver下的差异
	@Action(value="doSaveSecurityGroup0",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doSaveSecurityGroup0(){
		Map<String, Object> session = ActionContext.getContext().getSession();
		UserInfo userLogin = (UserInfo) session.get(Constants.USER_LOGIN);
		Map<String, Object> params =  ActionContext.getContext().getParameters();
		Map<String, Object> context = ParamsUtils.toParams(params);
		DBHelper dbHelper = DBHelper.getInstance();
		boolean bool = false;
		try {
			Object id = context.get("id");
			if(UtilValidate.isNotEmpty(id)){
				context.put("id", null);
				EntityModel entity = dbHelper.buildEntityModel(context, SecurityGroup.class, null);
				Map<String, Object> where = FastMap.newInstance();
				where.put("id", id);
				SQLValues<Object> sqlvalues =  dbHelper.buildSQLValues(CommandTypes.UPDATE, entity, where);
				bool = dbHelper.update(sqlvalues.getSql(),sqlvalues.getParams());
			}else{
				context.put("id", dbHelper.getRandomUUId());
				context.put("companyId", userLogin.getCompanyId());
				EntityModel entity = dbHelper.buildEntityModel(context, SecurityGroup.class, null);
				SQLValues<Object> sqlvalues =  dbHelper.buildSQLValues(CommandTypes.INSERT, entity);
				bool = dbHelper.insert(sqlvalues.getSql(),sqlvalues.getParams());
			}
			if(bool){
				json.put("msg", "添加权限组信息成功！");
			} else {
				throw new Exception();
			}
		} catch (Exception e) {
			e.printStackTrace();
			setSuccess(false);
			json.put("msg", "添加权限组信息失败！");
		} finally{
			dbHelper.freeConnection();
		}
		return Constants.SUCCESS;
	}

	//修改后的权限组保存修改方法，对update流程做了改动 qxue
	@Action(value="doSaveSecurityGroup",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doSaveSecurityGroup(){
		Map<String, Object> session = ActionContext.getContext().getSession();
		UserInfo userLogin = (UserInfo) session.get(Constants.USER_LOGIN);
		Map<String, Object> params =  ActionContext.getContext().getParameters();
		Map<String, Object> context = ParamsUtils.toParams(params);
		DBHelper dbHelper = DBHelper.getInstance();
		boolean bool = false;
		try {
			Object id = context.get("id");
			Object name = context.get("name");
			
			Object remark = context.get("remark");
			Object state = context.get("state");
			
			if(UtilValidate.isNotEmpty(id)){
				context.put("id", null);
				//此处做了特殊处理  qxue
                StringBuffer sqlUp = new StringBuffer();
                sqlUp.append(" UPDATE  SECURITY_GROUP SET NAME = '"+name + "',STATE ='"+ state +"',REMARK= '"+remark+"'  WHERE ID = ? ");
                bool = dbHelper.update(sqlUp.toString(), id);
			}else{
				context.put("id", dbHelper.getRandomUUId());
				context.put("companyId", userLogin.getCompanyId());
				EntityModel entity = dbHelper.buildEntityModel(context, SecurityGroup.class, null);
				SQLValues<Object> sqlvalues =  dbHelper.buildSQLValues(CommandTypes.INSERT, entity);
				bool = dbHelper.insert(sqlvalues.getSql(),sqlvalues.getParams());
			}
			if(bool){
				json.put("msg", "添加权限组信息成功！");
			} else {
				throw new Exception();
			}
		} catch (Exception e) {
			e.printStackTrace();
			setSuccess(false);
			json.put("msg", "添加权限组信息失败！");
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
