package com.redm.dao.support;

import org.springframework.stereotype.Repository;

import com.jelly.help.commons.base.HibernateDao;
import com.redm.entity.City;

@Repository
public class CityDao extends HibernateDao<City>{
	
	public void saveCity(City city){
		super.save(city);
	}
	public void updateCity(City city){
		super.update(city);
	}	

}
