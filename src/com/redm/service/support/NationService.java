package com.redm.service.support;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.redm.dao.support.NationDao;
import com.redm.entity.Nation;

@Service
public class NationService {

	@Autowired
	private NationDao nationDao;
	
	@Transactional
	public void saveNation(Nation nation){
		nationDao.saveNation(nation);
	}
	@Transactional
	public void updateNation(Nation nation){
		nationDao.updateNation(nation);
	}	
	
}
