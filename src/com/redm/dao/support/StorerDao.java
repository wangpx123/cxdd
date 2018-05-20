package com.redm.dao.support;

import org.springframework.stereotype.Repository;
import com.jelly.help.commons.base.HibernateDao;
import com.redm.entity.Storer;

@Repository
public class StorerDao extends HibernateDao<Storer>{
	
	public void saveStorer(Storer storer){
		super.save(storer);
	}
	public void updateStorer(Storer storer){
		super.update(storer);
	}	

}
