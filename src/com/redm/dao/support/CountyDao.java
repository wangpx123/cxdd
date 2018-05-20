package com.redm.dao.support;

import org.springframework.stereotype.Repository;

import com.jelly.help.commons.base.HibernateDao;
import com.redm.entity.County;

@Repository
public class CountyDao extends HibernateDao<County>{
	
	public void saveCounty(County county){
		super.save(county);
	}
	public void updateCounty(County county){
		super.update(county);
	}	

}
