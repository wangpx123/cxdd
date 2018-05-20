package com.redm.dao.support;

import org.springframework.stereotype.Repository;
import com.jelly.help.commons.base.HibernateDao;
import com.redm.entity.Sku;

@Repository
public class SkuDao extends HibernateDao<Sku>{
	
	public void saveSku(Sku sku){
		super.save(sku);
	}
	public void updateSku(Sku sku){
		super.update(sku);
	}	

}
