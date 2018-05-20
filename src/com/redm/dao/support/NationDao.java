package com.redm.dao.support;

import org.springframework.stereotype.Repository;

import com.jelly.help.commons.base.HibernateDao;
import com.redm.entity.Nation;

@Repository
public class NationDao extends HibernateDao<Nation>{
	
	public void saveNation(Nation nation){
		super.save(nation);
	}
	public void updateNation(Nation nation){
		super.update(nation);
	}	

}
