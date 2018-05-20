package com.redm.service.system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jelly.help.commons.callback.CriteriaCallBack;
import com.jelly.help.entity.PageInfo;
import com.redm.dao.system.LoginLogDao;
import com.redm.entity.LoginLog;

@Service
public class LoginLogManager {
	@Autowired
	private LoginLogDao loginLogDao;
	
	@Transactional
	public void saveLoginLog(LoginLog entity){
		loginLogDao.save(entity);
	}
	
	@Transactional
	public void updateLoginLog(LoginLog entity){
		loginLogDao.update(entity);
	}
	
	@Transactional
	public void deleteLoginLog(String id){
		loginLogDao.delete(id);
	}
	
	public PageInfo queryByPage(int start, int pageSize,String orderBy, String desc,final Class<?> clazz,CriteriaCallBack callback){
		return loginLogDao.findPageByCriteria(start, pageSize, orderBy, desc, clazz, callback);
	}
	
	public LoginLog getLoginLog(String id){
		return loginLogDao.get(id);
	}
}
