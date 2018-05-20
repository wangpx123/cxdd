package com.redm.service;

import java.util.List;
import java.util.Map;
import java.util.Set;

import javolution.util.FastList;
import javolution.util.FastMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jelly.help.commons.callback.CriteriaCallBack;
import com.jelly.help.commons.dbutils.DBHelper;
import com.jelly.help.commons.dbutils.generate.EntityModel;
import com.jelly.help.commons.dbutils.generate.GenerateValue.CommandTypes;
import com.jelly.help.commons.dbutils.generate.GenerateValue.SQLValues;
import com.jelly.help.commons.dbutils.handlers.BeanHandler;
import com.jelly.help.commons.dbutils.handlers.BeanListHandler;
import com.jelly.help.commons.dbutils.handlers.MapHandler;
import com.jelly.help.commons.dbutils.handlers.MapListHandler;
import com.jelly.help.commons.util.UtilDateTime;
import com.jelly.help.commons.util.UtilValidate;
import com.jelly.help.entity.PageInfo;
import com.redm.dao.UserInfoDao;
import com.redm.entity.SystemPermission;
import com.redm.entity.UserInfo;

@Service
public class UserInfoManager {
	@Autowired
	private UserInfoDao userInfoDao;
	
	public UserInfo login(String userName,String password,String ip,String logId,String previousId){
		UserInfo userInfo = null;
		DBHelper dbHelper = DBHelper.getInstance(false);
		try {
			if(UtilValidate.isNotEmpty(previousId)){
				if(logout(dbHelper, previousId)){
					previousId = "LOGOUTED";//清空ID数据，引用传参，当返回值使用
				}
			}
			StringBuffer sql = new StringBuffer();
			sql.append(" SELECT * FROM USER_INFO");
			sql.append(" WHERE 1 = 1");
			sql.append(" AND USERNAME = ?");
			UserInfo user = dbHelper.select(sql.toString(), new BeanHandler<UserInfo>(UserInfo.class),userName);
			if(user != null){
				if(password.equals(user.getPassword())){
					userInfo = user;
					//记录登陆日志
					EntityModel model = new EntityModel("LoginLog");
					model.setField("id",logId);
					model.setField("ip",ip);
					model.setField("userName",userInfo.getUsername());
					model.setField("loginTime",UtilDateTime.nowTimestamp());
					model.setField("userType",userInfo.getUserType());
					model.setField("status","登陆");
					model.setField("onlineTime",0);
					model.setField("remark","用户从平台系统登陆。");
					saveLoginLog(dbHelper,model);
				}else{
					//用户输入的密码不正确 
					
					//如果密码错误3次，禁用用户5分钟
				}
			}
			//关闭数据库连接
			dbHelper.close();
		} catch (Exception e) {
			dbHelper.close();
			e.printStackTrace();
		} finally{
			dbHelper.freeConnection();
		}
		return userInfo;
	}
	public boolean logout(DBHelper dbHelper,String previousId){
		boolean bool = false;
		try {
			StringBuffer sql = new StringBuffer();
			sql.append(" UPDATE LOGIN_LOG SET STATUS = '注销', ");
			sql.append(" LOGOUT_TIME = ?, ");
			sql.append(" REMARK = '重新登陆系统旧会话自动注销。'");
			sql.append(" WHERE ID = ?");
			bool = dbHelper.update(sql.toString(),UtilDateTime.nowTimestamp().toString(),previousId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return bool;
	}
	public boolean saveLoginLog(DBHelper dbHelper,EntityModel model){
		boolean bool = false;
		try {
			SQLValues<Object> sqlValues = dbHelper.buildSQLValues(CommandTypes.INSERT, model);
			bool = dbHelper.insert(sqlValues.getSql(), sqlValues.getParams());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return bool;
	}
	/**
	 * 查询所有的用户信息
	 * @param pageIndex 
	 * @param pageSize 每页大小
	 * @param orderBy 排序字段
	 * @param desc 排序规则
	 * @param clazz 
	 * @param callback
	 * @return
	 */
	public PageInfo queryUserInfos(int pageIndex, int pageSize, String orderBy,
			String desc, final Class<?> clazz, CriteriaCallBack callback) {
		return userInfoDao.findPageByCriteria(
				pageIndex, 
				pageSize, 
				orderBy, 
				desc,
				clazz, 
				callback);
	}
	
	public static Map<SystemPermission, List<SystemPermission>> getPermissions(String userId){
		Map<SystemPermission, List<SystemPermission>> permissions = FastMap.newInstance();
		Map<Integer,SystemPermission> parentPermissions = FastMap.newInstance();
		List<SystemPermission> sps = getSystemPermissions(userId);
		for (SystemPermission permsssion : sps) {
			int parentId = permsssion.getParentId();
			if(parentId == 0){
				parentPermissions.put(permsssion.getId(),permsssion);
			}
		}
		Set<Integer> keySets = parentPermissions.keySet();
		for (Integer id : keySets) {
			List<SystemPermission> l = FastList.newInstance();
			for (SystemPermission permission : sps) {
				if(permission.getParentId() == id)
					l.add(permission);
			}
			permissions.put(parentPermissions.get(id), l);
		}
		return permissions;
	}
	
	public static List<SystemPermission> getSystemPermissions(String userId){
		List<SystemPermission> permissions = FastList.newInstance();
		//查询用户的权限组信息，根据权限组查询权限
		StringBuffer sql = new StringBuffer();
		sql.append(" SELECT * FROM SYSTEM_PERMISSION sp");
		sql.append(" WHERE EXISTS (");
		sql.append(" 	SELECT PERMISSION_ID FROM SECURITY_GROUP_PERMISSION sgp");
		sql.append(" 	WHERE sgp.PERMISSION_ID = sp.ID");
		sql.append(" 	AND EXISTS (");
		sql.append("        SELECT SECURITY_GROUP_ID FROM USER_SECURITY_GROUP usg");
		sql.append(" 		WHERE 1 = 1 ");
		sql.append(" 		AND USER_ID = '" + userId + "'");
		sql.append(" 		AND usg.SECURITY_GROUP_ID = sgp.SECURITY_GROUP_ID");
		sql.append(" 	)");
		sql.append(" )");
		sql.append(" ORDER BY MENU_SORT ASC");
		DBHelper dbHelper = DBHelper.getInstance();
		try {
			List<SystemPermission> data = dbHelper.select(sql.toString(), 
					new BeanListHandler<SystemPermission>(SystemPermission.class));
			if(UtilValidate.isNotEmpty(data)){
				permissions = data;
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally{
			dbHelper.freeConnection();
		}
		return permissions;
	}
	
	//根据ID获取UserIno信息
	
	public static UserInfo getUserInfo(String userId)
	{
		UserInfo user = new UserInfo();
		String realname="";
		DBHelper dbHelper = DBHelper.getInstance();
		
		try
		{
			
			StringBuffer sql=new StringBuffer();
			sql.append(" SELECT * FROM USER_INFO ");
			sql.append(" WHERE 1=1 ");
			sql.append(" AND ID='"+ userId +"' ");
			Map<String, Object> data = dbHelper.select(sql.toString(), new MapHandler());	
			
			if(UtilValidate.isNotEmpty(data))
			{
				realname=(String)data.get("realname");
				user.setId(userId);
				user.setRealname(realname);
	
			}
		}catch (Exception e){
		   e.printStackTrace();
		}   
		
		return user;
	}
	
}
