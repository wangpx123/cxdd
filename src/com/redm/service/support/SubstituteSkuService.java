package com.redm.service.support;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.redm.dao.support.SubstituteSkuDao;
import com.redm.entity.SubstituteSku;
@Service
public class SubstituteSkuService {
	@Autowired
	private SubstituteSkuDao substituteSkuDao;
	
	@Transactional
	public void saveSubstituteSku(SubstituteSku substituteSku){
		substituteSkuDao.saveSubstituteSku(substituteSku);
	}
	@Transactional
	public void updateSubstituteSku(SubstituteSku substituteSku){
		substituteSkuDao.updateSubstituteSku(substituteSku);
	}	
	

}
