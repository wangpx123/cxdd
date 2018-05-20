package com.redm.service.support;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.redm.dao.support.CountyDao;
import com.redm.entity.County;
import com.redm.entity.Nation;

@Service
public class CountyService {

	@Autowired
	private CountyDao countyDao;
	
	@Transactional
	public void saveCounty(County county){
		countyDao.saveCounty(county);
	}
	@Transactional
	public void updateCounty(County county){
		countyDao.updateCounty(county);
	}	
	
}
