package com.redm.service.support;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.redm.dao.support.CityDao;
import com.redm.entity.City;
import com.redm.entity.Nation;

@Service
public class CityService {

	@Autowired
	private CityDao cityDao;
	
	@Transactional
	public void saveCity(City city){
		cityDao.saveCity(city);
	}
	@Transactional
	public void updateCity(City city){
		cityDao.updateCity(city);
	}	
	
}
