package com.redm.service.system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.redm.dao.system.SystemCodeDao;
import com.redm.entity.SystemCode;
@Service
public class SystemCodeService {
	@Autowired
	private SystemCodeDao systemCodeDao;
	
	@Transactional
	public void saveArea(SystemCode systemCode){
		systemCodeDao.saveSystemCode(systemCode);
		
	}
	@Transactional
	public void updateArea(SystemCode systemCode){
		systemCodeDao.updateSystemCode(systemCode);
	}	
	

}
