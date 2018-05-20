package com.redm.dao.system;

import org.springframework.stereotype.Repository;
import com.jelly.help.commons.base.HibernateDao;
import com.redm.entity.SystemCode;

@Repository
public class SystemCodeDao extends HibernateDao<SystemCode>{
	
	public void saveSystemCode(SystemCode systemCode){
		super.save(systemCode);
	}
	public void updateSystemCode(SystemCode systemCode){
		super.update(systemCode);
	}	

}
