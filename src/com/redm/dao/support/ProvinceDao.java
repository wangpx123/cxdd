package com.redm.dao.support;

import org.springframework.stereotype.Repository;

import com.jelly.help.commons.base.HibernateDao;
import com.redm.entity.Province;

@Repository
public class ProvinceDao extends HibernateDao<Province>{
	
	public void saveProvince(Province province){
		super.save(province);
	}
	public void updateProvince(Province province){
		super.update(province);
	}	

}
