package com.redm.dao.support;

import org.springframework.stereotype.Repository;
import com.jelly.help.commons.base.HibernateDao;
import com.redm.entity.SubstituteSku;

@Repository
public class SubstituteSkuDao extends HibernateDao<SubstituteSku>{
	
	public void saveSubstituteSku(SubstituteSku substituteSku){
		super.save(substituteSku);
	}
	public void updateSubstituteSku(SubstituteSku substituteSku){
		super.update(substituteSku);
	}	

}
